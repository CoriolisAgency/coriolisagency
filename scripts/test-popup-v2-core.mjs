/**
 * popup-kit v2 core (FFL-CLAIM-POPUP): create-only Mailchimp, Ops forward,
 * FFL normalize + lookup sanitize. Fetch is stubbed. No env values printed.
 * Shared byte-identical across coriolisagency, gunsearchengine, ffl-messenger.
 *   node scripts/test-popup-v2-core.mjs   (or: npx tsx ...)
 */
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const core = await import(pathToUrl(path.join(root, "popup-kit/server/subscribe-core.ts")));

function pathToUrl(p) {
  return new URL("file:///" + p.replace(/\\/g, "/").replace(/^\/+/, "")).href;
}

let n = 0;
async function check(name, fn) {
  await fn();
  n += 1;
  console.log("  ok  " + name);
}

const ENV = { MAILCHIMP_API_KEY: "testkey-us21", MAILCHIMP_AUDIENCE_ID: "aud1" };
const OPS = { CORIOLIS_OS_URL: "https://ops.example", FORM_INTAKE_SECRET: "sek-do-not-echo" };
const BASE = "https://us21.api.mailchimp.com/3.0/lists/aud1";

function stub(respond) {
  const calls = [];
  const orig = globalThis.fetch;
  globalThis.fetch = async (input, init = {}) => {
    const url = typeof input === "string" ? input : input.url;
    const rec = { method: String(init.method || "GET").toUpperCase(), url, body: typeof init.body === "string" ? init.body : "", headers: init.headers || {} };
    calls.push(rec);
    return respond(rec);
  };
  return { calls, restore: () => (globalThis.fetch = orig) };
}
const J = (status, obj) => new Response(obj === undefined ? null : JSON.stringify(obj), { status });

function noEdits(calls) {
  for (const c of calls) {
    assert.notEqual(c.method, "PUT", "no PUT upsert: " + c.url);
    assert.notEqual(c.method, "PATCH", "no PATCH: " + c.url);
    assert.notEqual(c.method, "DELETE", "no DELETE: " + c.url);
    assert.ok(!/\/tags$/.test(c.url), "no tag writes on members: " + c.url);
    assert.ok(!c.body.includes("status_if_new"), "no status_if_new");
    assert.ok(!/"status":"(subscribed|unsubscribed)"/.test(c.body), "never subscribed/unsubscribed");
  }
}

await check("kit is v2", () => {
  assert.equal(fs.readFileSync(path.join(root, "popup-kit/VERSION"), "utf8").trim(), "2");
  assert.equal(core.KIT_VERSION, "2");
});

await check("normalizeFflNumber + candidates", () => {
  assert.equal(core.normalizeFflNumber("1-23-456-78-9a-12345"), "1-23-456-78-9A-12345");
  assert.equal(core.normalizeFflNumber("123456789A12345"), "1-23-456-78-9A-12345");
  assert.equal(core.normalizeFflNumber("5-74-27-01-1C-2161"), "5-74-027-01-1C-02161");
  assert.equal(core.normalizeFflNumber("1-23-456"), null);
  assert.equal(core.normalizeFflNumber(""), null);
  const c = core.fflCandidates("5-74-027-01-1C-02161");
  assert.ok(c.includes("5-74-27-01-1C-2161") && c.includes("5-74-027-01-1C-02161") && c.length === 4);
});

await check("sanitizeLookup keeps only name, city, state, listed", () => {
  const s = core.sanitizeLookup({ found: true, name: "ACME GUNS LLC", city: "SAN ANTONIO", state: "tx", listed: true, premises_street: "1 Main", phone: "555" });
  assert.deepEqual(s, { found: true, name: "Acme Guns LLC", city: "San Antonio", state: "TX", listed: true });
  assert.deepEqual(core.sanitizeLookup({ found: false, name: "X" }).found, false);
  assert.deepEqual(core.sanitizeLookup(null).found, false);
});

await check("popupStatus reports names only", () => {
  const s = core.popupStatus({ ...ENV, ...OPS }, "gse");
  assert.equal(s.enabled, true);
  assert.equal(s.backend, "mailchimp");
  assert.equal(s.ops, true);
  assert.ok(!JSON.stringify(s).includes("sek-do-not-echo") && !JSON.stringify(s).includes("testkey"));
  assert.equal(core.popupStatus({}, "gse").enabled, false);
  assert.equal(core.popupStatus(OPS, "fflm").backend, "ops");
});

await check("buildMailchimpCreate tags + merge fields", () => {
  const a = core.buildMailchimpCreate({ site: "gse", email: "a@b.co", ffl: "1-23-456-78-9A-12345" });
  assert.equal(a.status, "pending");
  assert.deepEqual(a.tags, ["src:popup-claim", "site:gse", "has_ffl"]);
  assert.deepEqual(a.merge_fields, { SITE: "gse", FFL_PATH: "claimed_ffl", FFL_NUM: "1-23-456-78-9A-12345" });
  const b = core.buildMailchimpCreate({ site: "agency", email: "a@b.co", ffl: null });
  assert.deepEqual(b.tags, ["src:popup-claim", "site:agency", "no_ffl"]);
  assert.deepEqual(b.merge_fields, { SITE: "agency", FFL_PATH: "no_ffl" });
});

const email = "new@example.com";
const hash = createHash("md5").update(email).digest("hex");

await check("existing member (any status) is left untouched", async () => {
  for (const status of ["subscribed", "unsubscribed", "cleaned", "pending", "archived", "transactional"]) {
    core.resetMergeFieldCache();
    const { calls, restore } = stub((r) => (r.method === "GET" && r.url.startsWith(BASE + "/members/" + hash) ? J(200, { status }) : J(500, {})));
    try {
      const out = await core.mailchimpCreateOnly(ENV, "gse", email, null);
      assert.equal(out, "existing_untouched", status);
      assert.equal(calls.length, 1, status);
      noEdits(calls);
    } finally {
      restore();
    }
  }
});

await check("new member: merge fields created (POST only), member POSTed pending", async () => {
  core.resetMergeFieldCache();
  const { calls, restore } = stub((r) => {
    if (r.method === "GET" && r.url.includes("/members/")) return J(404, { title: "Resource Not Found" });
    if (r.method === "GET" && r.url.includes("/merge-fields")) return J(200, { merge_fields: [{ tag: "SITE" }, { tag: "FNAME" }] });
    if (r.method === "POST" && r.url === BASE + "/merge-fields") return J(200, {});
    if (r.method === "POST" && r.url === BASE + "/members") return J(200, { status: "pending" });
    return J(500, {});
  });
  try {
    const out = await core.mailchimpCreateOnly(ENV, "fflm", email, "1-23-456-78-9A-12345");
    assert.equal(out, "created");
    const mf = calls.filter((c) => c.method === "POST" && c.url.endsWith("/merge-fields")).map((c) => JSON.parse(c.body).tag);
    assert.deepEqual(mf, ["FFL_PATH", "FFL_NUM"], "only missing fields created");
    const mem = calls.find((c) => c.method === "POST" && c.url === BASE + "/members");
    const body = JSON.parse(mem.body);
    assert.equal(body.status, "pending");
    assert.deepEqual(body.tags, ["src:popup-claim", "site:fflm", "has_ffl"]);
    assert.equal(body.merge_fields.FFL_NUM, "1-23-456-78-9A-12345");
    noEdits(calls);
  } finally {
    restore();
  }
});

await check("Member Exists race and forgotten are not edited", async () => {
  for (const [title, want] of [["Member Exists", "existing_untouched"], ["Forgotten Email Not Subscribed", "skipped"]]) {
    core.resetMergeFieldCache();
    const { calls, restore } = stub((r) => {
      if (r.method === "GET" && r.url.includes("/members/")) return J(404, {});
      if (r.method === "GET" && r.url.includes("/merge-fields")) return J(200, { merge_fields: [{ tag: "SITE" }, { tag: "FFL_PATH" }, { tag: "FFL_NUM" }] });
      if (r.method === "POST" && r.url === BASE + "/members") return J(400, { title, detail: "x" });
      return J(500, {});
    });
    try {
      assert.equal(await core.mailchimpCreateOnly(ENV, "gse", email, null), want);
      assert.equal(calls.filter((c) => c.method === "POST").length, 1);
      noEdits(calls);
    } finally {
      restore();
    }
  }
});

await check("merge-field failure falls back to member POST without merge fields", async () => {
  core.resetMergeFieldCache();
  const { calls, restore } = stub((r) => {
    if (r.method === "GET" && r.url.includes("/members/")) return J(404, {});
    if (r.url.includes("/merge-fields")) return J(403, {});
    if (r.method === "POST" && r.url === BASE + "/members") return J(200, {});
    return J(500, {});
  });
  try {
    assert.equal(await core.mailchimpCreateOnly(ENV, "agency", email, null), "created");
    const mem = calls.find((c) => c.url === BASE + "/members");
    assert.equal(JSON.parse(mem.body).merge_fields, undefined);
    noEdits(calls);
  } finally {
    restore();
  }
});

await check("handlePopupSubscribe: honeypot, timing, validation", async () => {
  assert.equal((await core.handlePopupSubscribe({}, "gse", { email: "a@b.co", website: "x", t: 5000 })).ok, true);
  assert.equal((await core.handlePopupSubscribe({}, "gse", { email: "a@b.co", t: 100 })).ok, true);
  assert.equal((await core.handlePopupSubscribe(ENV, "gse", { email: "bad", ffl: "", no_ffl: true, t: 5000 })).status, 400);
  const r = await core.handlePopupSubscribe(ENV, "gse", { email: "a@b.co", ffl: "123", t: 5000 });
  assert.equal(r.status, 400);
  assert.match(r.error, /FFL number/);
  assert.equal((await core.handlePopupSubscribe({}, "gse", { email: "a@b.co", no_ffl: true, t: 5000 })).status, 503);
});

await check("claim submit: lookup, create-only Mailchimp, signed Ops forward, public result", async () => {
  core.resetMergeFieldCache();
  const { calls, restore } = stub((r) => {
    if (r.method === "GET" && r.url.includes("/members/")) return J(404, {});
    if (r.url.includes("/merge-fields")) return J(200, { merge_fields: [{ tag: "SITE" }, { tag: "FFL_PATH" }, { tag: "FFL_NUM" }] });
    if (r.method === "POST" && r.url === BASE + "/members") return J(200, {});
    if (r.method === "POST" && r.url === "https://ops.example/api/forms/claim") return J(200, { ok: true });
    return J(500, {});
  });
  try {
    const res = await core.handlePopupSubscribe({ ...ENV, ...OPS }, "agency", { email: "Dealer@Shop.com", ffl: "123456789a12345", t: 4000, page: "/x", utm: { source: "g" } }, {
      lookup: async (f) => ({ found: f === "1-23-456-78-9A-12345", name: "ACME GUNS", city: "AUSTIN", state: "TX", listed: true, premises_street: "secret st" }),
    });
    assert.equal(res.ok, true);
    assert.equal(res.mailchimp, "created");
    assert.equal(res.ops, "recorded");
    assert.deepEqual(res.welcome, { name: "Acme Guns", city: "Austin", state: "TX" });
    const ops = calls.find((c) => c.url.endsWith("/api/forms/claim"));
    assert.equal(ops.headers.authorization, "Bearer sek-do-not-echo");
    const ob = JSON.parse(ops.body);
    assert.equal(ob.email, "dealer@shop.com");
    assert.equal(ob.has_ffl, true);
    assert.equal(ob.ffl_number, "1-23-456-78-9A-12345");
    assert.equal(ob.mailchimp_status, "created");
    assert.ok(!ops.body.includes("secret st"));
    const pub = core.publicResult(res);
    assert.deepEqual(Object.keys(pub).sort(), ["listed", "ok", "path", "welcome"]);
    assert.ok(!JSON.stringify(pub).includes("sek-do-not-echo"));
    noEdits(calls);
  } finally {
    restore();
  }
});

await check("existing member still lands in Ops; both down is 502", async () => {
  const { restore } = stub((r) => {
    if (r.method === "GET" && r.url.includes("/members/")) return J(200, { status: "unsubscribed" });
    if (r.url.endsWith("/api/forms/claim")) return J(200, { ok: true });
    return J(500, {});
  });
  try {
    const res = await core.handlePopupSubscribe({ ...ENV, ...OPS }, "gse", { email: "old@x.com", no_ffl: true, t: 4000 });
    assert.equal(res.ok, true);
    assert.equal(res.mailchimp, "existing_untouched");
    assert.equal(res.ops, "recorded");
  } finally {
    restore();
  }
  const s2 = stub(() => J(500, {}));
  try {
    const res = await core.handlePopupSubscribe({ ...ENV, ...OPS }, "gse", { email: "x@x.com", no_ffl: true, t: 4000 });
    assert.equal(res.status, 502);
  } finally {
    s2.restore();
  }
});

await check("handlePopupLookup: bad shape short-circuits, proxy errors read as not found", async () => {
  const { calls, restore } = stub(() => J(500, {}));
  try {
    const a = await core.handlePopupLookup({}, "12");
    assert.equal(a.body.found, false);
    assert.equal(calls.length, 0);
    const b = await core.handlePopupLookup({}, "1-23-456-78-9A-12345");
    assert.equal(b.body.found, false);
    assert.equal(calls[0].url, "https://www.gunsearchengine.com/api/popup?ffl=1-23-456-78-9A-12345");
  } finally {
    restore();
  }
});

await check("kit files have no em/en dashes; client is small and wires data-claim-ffl", () => {
  for (const f of ["client/coriolis-popup.js", "client/coriolis-popup.css", "server/subscribe-core.ts", "README.md"]) {
    assert.ok(!/[\u2013\u2014]/.test(fs.readFileSync(path.join(root, "popup-kit", f), "utf8")), f);
  }
  const js = fs.readFileSync(path.join(root, "popup-kit/client/coriolis-popup.js"));
  assert.ok(js.length < 16 * 1024, "js < 16KB");
  const src = js.toString("utf8");
  assert.match(src, /\[data-claim-ffl\]/);
  assert.match(src, /role: "dialog"/);
  assert.match(src, /"aria-modal": "true"/);
  assert.match(src, /Escape/);
  assert.match(src, /Claim my FFL/);
  assert.match(src, /Licensed dealers only\. Claim your FFL\./);
  assert.match(src, /Free for every licensed FFL/);
  assert.match(src, /I don't have an FFL/);
  assert.doesNotMatch(src, /countdown|spots left|only \d+ left/i);
});

console.log("\npopup-kit v2 core holds (" + n + " checks)");
