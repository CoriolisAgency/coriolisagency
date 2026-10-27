import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const kit = path.join(root, "popup-kit");
const DASH = /[\u2013\u2014]/;
const BANNED = /GunBroker|MasterFFL/i;
const FFLM_BANNED = /parser|Enclave|vendor platform|Manhattan|Lipsey|\bPOS\b/i;

function sha256(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel));
}

function walkFiles(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walkFiles(full, acc);
    else acc.push(full);
  }
  return acc;
}

// Checksum: kit files match SHA256SUMS, served copies match kit client files.
const sums = fs.readFileSync(path.join(kit, "SHA256SUMS"), "utf8").trim().split(/\r?\n/);
assert.ok(sums.length >= 4, "SHA256SUMS missing hashes");
const seen = new Set();
for (const line of sums) {
  const m = line.match(/^([0-9a-f]{64})  (.+)$/);
  assert.ok(m, `bad SHA256SUMS line: ${line}`);
  const [, hash, rel] = m;
  assert.equal(rel === "SHA256SUMS", false, "SHA256SUMS must not hash itself");
  const buf = fs.readFileSync(path.join(kit, rel));
  assert.equal(sha256(buf), hash, `hash mismatch ${rel}`);
  seen.add(rel);
}
for (const rel of [
  "VERSION",
  "client/coriolis-popup.js",
  "client/coriolis-popup.css",
  "server/subscribe-core.ts",
]) {
  assert.ok(seen.has(rel), `SHA256SUMS missing ${rel}`);
}

const jsKit = read("popup-kit/client/coriolis-popup.js");
const cssKit = read("popup-kit/client/coriolis-popup.css");
assert.ok(jsKit.length < 12 * 1024, `client JS ${jsKit.length} >= 12KB`);
assert.deepEqual(read("public/popup/coriolis-popup.v1.js"), jsKit);
assert.deepEqual(read("public/popup/coriolis-popup.v1.css"), cssKit);
assert.equal(fs.readFileSync(path.join(kit, "VERSION"), "utf8").trim(), "1");

// Copy: no em/en dash, no competitor names; kit has none of the FFLM embargo words.
const copyTargets = [
  path.join(root, "src/lib/popup-config.ts"),
  ...walkFiles(kit).filter((f) => path.basename(f) !== "SHA256SUMS"),
];
for (const file of copyTargets) {
  const text = fs.readFileSync(file, "utf8");
  assert.doesNotMatch(text, DASH, `em/en dash in ${path.relative(root, file)}`);
  assert.doesNotMatch(text, BANNED, `banned competitor in ${path.relative(root, file)}`);
}

// Config: agency lane.
const { AGENCY_POPUP_CONFIG } = await import("../src/lib/popup-config.ts");
assert.equal(AGENCY_POPUP_CONFIG.site, "agency");
assert.equal(AGENCY_POPUP_CONFIG.lane, "agency-web");
assert.equal(AGENCY_POPUP_CONFIG.endpoint, "/api/popup");
assert.deepEqual(AGENCY_POPUP_CONFIG.denyPaths, [
  "/contact",
  "/msa",
  "/gun-store-pos-comparison",
  "/betsy-ai",
]);
assert.equal(AGENCY_POPUP_CONFIG.copy.headline, "Need a gun store website that sells?");
assert.ok(!JSON.stringify(AGENCY_POPUP_CONFIG).includes("ffl-messenger-enterprise"));
assert.doesNotMatch(JSON.stringify(AGENCY_POPUP_CONFIG.copy), FFLM_BANNED);
assert.doesNotMatch(fs.readFileSync(path.join(kit, "README.md"), "utf8"), FFLM_BANNED);
assert.doesNotMatch(jsKit.toString("utf8"), FFLM_BANNED);

const core = await import("../popup-kit/server/subscribe-core.ts");
const {
  popupStatus,
  handlePopupSubscribe,
  buildMailchimpPayload,
} = core;

function payloadFor(site, extra = {}) {
  return buildMailchimpPayload({
    site,
    email: "owner@example.com",
    fields: extra.fields || {},
    page: extra.page || "/ecommerce",
    landing: extra.landing || "/",
    utm: extra.utm || {
      source: extra.utmSource || "",
      medium: "",
      campaign: extra.utmCampaign || "",
      term: "",
      content: "",
    },
    gclid: extra.gclid || "",
    doubleOptIn: extra.doubleOptIn !== false,
  });
}

const lanes = {
  agency: "agency-web",
  gse: "gse-consumer",
  ffla: "ffla-managed",
  fflm: "fflm-early-access",
};
for (const [site, lane] of Object.entries(lanes)) {
  const p = payloadFor(site, {
    fields: { company: "Acme Guns", skip_me: "nope" },
    utmSource: "google",
    utmCampaign: "brand",
    gclid: "Cj0TEST",
  });
  assert.equal(p.member.email_address, "owner@example.com");
  assert.equal(p.member.status_if_new, "pending");
  assert.equal(p.member.merge_fields.LANE, lane);
  assert.equal(p.member.merge_fields.SOURCE, `popup:${site}`);
  assert.equal(p.member.merge_fields.SITE, site);
  assert.equal(p.member.merge_fields.PAGE, "/ecommerce");
  assert.equal(p.member.merge_fields.LANDING, "/");
  assert.equal(p.member.merge_fields.UTM_SRC, "google");
  assert.equal(p.member.merge_fields.UTM_CMP, "brand");
  assert.equal(p.member.merge_fields.GCLID, "Cj0TEST");
  assert.equal(p.member.merge_fields.COMPANY, "Acme Guns");
  assert.equal("skip_me" in p.member.merge_fields, false);
  const names = p.tags.map((t) => t.name).sort();
  assert.deepEqual(
    names,
    [`lane:${lane}`, "src:popup", `site:${site}`, "utm:google"].sort(),
  );
  for (const tag of p.tags) assert.equal(tag.status, "active");
}

const sub = payloadFor("agency", { doubleOptIn: false });
assert.equal(sub.member.status_if_new, "subscribed");

const secretEnv = {
  MAILCHIMP_API_KEY: "test-key-us6",
  MAILCHIMP_AUDIENCE_ID: "aud-123",
  CORIOLIS_OS_URL: "https://ops.example.invalid",
  FORM_INTAKE_SECRET: "form-secret",
};

function assertNoLeak(obj, env) {
  const dumped = JSON.stringify(obj);
  for (const v of Object.values(env)) {
    if (v) assert.equal(dumped.includes(v), false, "status leaked env value");
  }
}

const mc = popupStatus(secretEnv, "agency");
assert.equal(mc.backend, "mailchimp");
assert.equal(mc.enabled, true);
assertNoLeak(mc, secretEnv);

const legacyOnly = {
  CORIOLIS_OS_URL: "https://ops.example.invalid",
  FORM_INTAKE_SECRET: "form-secret",
};
const lgAgency = popupStatus(legacyOnly, "agency");
assert.equal(lgAgency.backend, "legacy");
assert.equal(lgAgency.enabled, true);
assertNoLeak(lgAgency, legacyOnly);

const lgFfla = popupStatus(legacyOnly, "ffla");
assert.equal(lgFfla.backend, "legacy");

const lgGse = popupStatus(legacyOnly, "gse");
assert.equal(lgGse.backend, "none");
assert.equal(lgGse.enabled, false);

const lgFflm = popupStatus(legacyOnly, "fflm");
assert.equal(lgFflm.backend, "none");

const none = popupStatus({}, "agency");
assert.equal(none.backend, "none");
assert.equal(none.enabled, false);
// GET /api/popup returns this enabled flag. No backend means 503 on POST.

const both = popupStatus(secretEnv, "agency");
assert.equal(both.backend, "mailchimp");

const origFetch = globalThis.fetch;
let fetchCalls = [];
globalThis.fetch = async (url, init) => {
  fetchCalls.push({ url: String(url), init });
  throw new Error("fetch should not run");
};

const honey = await handlePopupSubscribe(legacyOnly, "agency", {
  email: "a@b.com",
  website: "http://spam",
  t: 5000,
});
assert.equal(honey.status, 200);
assert.equal(honey.ok, true);
assert.equal(fetchCalls.length, 0);

const tooFast = await handlePopupSubscribe(legacyOnly, "agency", {
  email: "a@b.com",
  website: "",
  t: 1499,
});
assert.equal(tooFast.status, 200);
assert.equal(tooFast.ok, true);
assert.equal(fetchCalls.length, 0);

const badEmail = await handlePopupSubscribe(legacyOnly, "agency", {
  email: "not-an-email",
  t: 2000,
});
assert.equal(badEmail.status, 400);
assert.equal(badEmail.ok, false);
assert.equal(fetchCalls.length, 0);

const closed = await handlePopupSubscribe({}, "agency", {
  email: "a@b.com",
  t: 2000,
});
assert.equal(closed.status, 503);
assert.equal(closed.ok, false);
assert.equal(closed.error, "Sign-up is not open yet.");
assert.equal(fetchCalls.length, 0);

globalThis.fetch = async (url, init) => {
  fetchCalls.push({ url: String(url), init });
  return new Response(JSON.stringify({ needs_activation: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};
fetchCalls = [];
const legacyPost = await handlePopupSubscribe(legacyOnly, "agency", {
  email: "dealer@shop.example",
  t: 2000,
  fields: { company: "Shop" },
});
assert.equal(legacyPost.ok, true);
assert.equal(legacyPost.needs_activation, true);
assert.equal(fetchCalls.length, 1);
assert.match(fetchCalls[0].url, /\/api\/forms\/subscribe$/);
const legacyBody = JSON.parse(fetchCalls[0].init.body);
assert.equal(legacyBody.email, "dealer@shop.example");
assert.equal(legacyBody.source, "popup_coriolis");
assert.equal(String(fetchCalls[0].init.headers.authorization).startsWith("Bearer "), true);
assert.equal(String(fetchCalls[0].init.headers.authorization).includes("form-secret"), true);

fetchCalls = [];
globalThis.fetch = async (url, init) => {
  fetchCalls.push({ url: String(url), method: init.method, body: init.body });
  if (String(url).endsWith("/tags")) {
    return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
  }
  const body = JSON.parse(init.body);
  if (body.merge_fields) {
    return new Response(JSON.stringify({ title: "Invalid Resource", detail: "merge fields invalid" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  return new Response("{}", { status: 200 });
};

// Mailchimp wins when both backends are configured: only the Mailchimp API
// host is called, never the Ops URL. GET enabled follows popupStatus.
fetchCalls = [];
const bothPost = await handlePopupSubscribe(secretEnv, "agency", {
  email: "dealer@shop.example",
  t: 2500,
});
assert.equal(bothPost.ok, true);
assert.ok(fetchCalls.length >= 1, "Mailchimp path must call fetch");
for (const call of fetchCalls) {
  assert.match(call.url, /^https:\/\/us6\.api\.mailchimp\.com\//);
  assert.equal(call.url.includes("ops.example.invalid"), false);
  assert.equal(call.url.includes("/api/forms/subscribe"), false);
}

const mcEnv = {
  MAILCHIMP_API_KEY: "test-key-us6",
  MAILCHIMP_AUDIENCE_ID: "aud-123",
};
fetchCalls = [];
const mcPost = await handlePopupSubscribe(mcEnv, "agency", {
  email: "Owner@Example.com",
  t: 2500,
  page: "/ecommerce",
  landing: "/",
  utm: { source: "google", campaign: "notes" },
  fields: { company: "Acme" },
});
assert.equal(mcPost.ok, true);
assert.equal(mcPost.needs_activation, true);
assert.equal(fetchCalls.length, 3);
assert.match(fetchCalls[0].url, /us6\.api\.mailchimp\.com\/3\.0\/lists\/aud-123\/members\/[a-f0-9]{32}$/);
assert.equal(fetchCalls[0].method, "PUT");
assert.equal("merge_fields" in JSON.parse(fetchCalls[0].body), true);
assert.equal("merge_fields" in JSON.parse(fetchCalls[1].body), false);
assert.equal(fetchCalls[2].method, "POST");
assert.match(fetchCalls[2].url, /\/tags$/);

globalThis.fetch = origFetch;

console.log("test-popup: ok");
