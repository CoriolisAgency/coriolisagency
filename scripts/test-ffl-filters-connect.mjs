// CA-FFLF-LEAD-RECEIVER: /ffl-filters/connect contract tests.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

const ENV_KEYS = [
  "LEAD_FORM_SITE",
  "LEAD_FORM_HOST",
  "CORIOLIS_OS_URL",
  "FORM_INTAKE_SECRET",
  "LEAD_FORM_RATE_MAX",
  "LEAD_FORM_RATE_WINDOW_MS",
  "MAILGUN_API_KEY",
  "MAILGUN_DOMAIN",
  "MAILGUN_API_BASE",
  "CONTACT_TO",
  "CONTACT_FROM",
  "CONTACT_SUBJECT_PREFIX",
];

const SECRET = "test-secret-do-not-log";
const CONNECT = "https://www.coriolisagency.com/ffl-filters/connect";

function saveEnv(extra = {}) {
  const prev = new Map(ENV_KEYS.map((key) => [key, process.env[key]]));
  for (const key of ENV_KEYS) delete process.env[key];
  Object.assign(process.env, {
    LEAD_FORM_SITE: "coriolisagency",
    CORIOLIS_OS_URL: "https://ops.example.test/",
    FORM_INTAKE_SECRET: SECRET,
    LEAD_FORM_RATE_MAX: "1000",
    LEAD_FORM_HOST: "www.coriolisagency.com",
    ...extra,
  });
  return () => {
    for (const [key, value] of prev) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  };
}

const {
  CONNECT_PATH,
  CANONICAL,
  DELETE_MAILBOX,
  MAX_BODY_BYTES,
  HANDOFF_COOKIE,
  SENT_COOKIE,
  handleConnect,
  validateHandoff,
  buildLeadMessage,
  parseForm,
  escapeHtml,
  isHttpUrl,
  resetConnectRateLimit,
  SLIM_CONSENT_VERSION,
} = await import("../api/ffl-filters-connect-lib.ts");

function validHandoff(over = {}) {
  return {
    name: "Ada Lovelace",
    email: "ada@example.com",
    store_name: "Analytical Arms",
    store_url: "https://analytical.example",
    topic: "setup",
    message: "Need help with the filters.",
    phone: "555-0100",
    consent: "1",
    consent_v: "1",
    ...over,
  };
}

function encodeBody(fields) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null) params.set(key, String(value));
  }
  return params.toString();
}

function connectRequest(method, { body, headers = {}, url = CONNECT } = {}) {
  const init = {
    method,
    headers: {
      "x-forwarded-host": "www.coriolisagency.com",
      "x-forwarded-for": "203.0.113.10",
      ...headers,
    },
  };
  if (body !== undefined) {
    init.headers["content-type"] =
      init.headers["content-type"] ?? "application/x-www-form-urlencoded";
    init.body = body;
  }
  return new Request(url, init);
}

function setCookieMap(res) {
  const raw = typeof res.headers.getSetCookie === "function"
    ? res.headers.getSetCookie()
    : (res.headers.get("set-cookie") ? [res.headers.get("set-cookie")] : []);
  const map = new Map();
  for (const line of raw) {
    const [pair, ...attrs] = line.split(";");
    const eq = pair.indexOf("=");
    const name = pair.slice(0, eq).trim();
    const value = pair.slice(eq + 1).trim();
    map.set(name, { value, line, attrs: attrs.map((a) => a.trim()) });
  }
  return map;
}

function cookieHeaderFrom(map, name) {
  const row = map.get(name);
  return row && row.value ? `${name}=${row.value}` : "";
}

function installFetch(handler) {
  const calls = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return handler(url, init, calls);
  };
  return {
    calls,
    restore: () => {
      globalThis.fetch = original;
    },
  };
}

function opsOk() {
  return installFetch(async (url) => {
    if (String(url).includes("/api/forms/lead")) {
      return new Response(JSON.stringify({ ok: true, id: "lead-1" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response("unexpected", { status: 500 });
  });
}

async function postHandoff(fields, headers = {}) {
  return handleConnect(
    connectRequest("POST", { body: encodeBody(fields), headers }),
  );
}

async function followConfirm(handoffRes, over = {}, headers = {}) {
  const cookies = setCookieMap(handoffRes);
  assert.equal(handoffRes.status, 303, "handoff should 303 to confirmation");
  const cookie = cookieHeaderFrom(cookies, HANDOFF_COOKIE);
  assert.ok(cookie, "handoff cookie missing");
  const getRes = await handleConnect(
    connectRequest("GET", { headers: { cookie } }),
  );
  assert.equal(getRes.status, 200);
  const html = await getRes.text();
  const csrf = html.match(/name="csrf" value="([^"]+)"/)?.[1];
  assert.ok(csrf, "csrf missing on confirmation page");
  const body = encodeBody({ confirm: "1", csrf, ...over });
  return handleConnect(
    connectRequest("POST", {
      body,
      headers: {
        cookie,
        origin: "https://www.coriolisagency.com",
        "sec-fetch-site": "same-origin",
        ...headers,
      },
    }),
  );
}

// --- static site wiring ---
assert.equal(CONNECT_PATH, "/ffl-filters/connect");
assert.equal(CANONICAL, "https://www.coriolisagency.com/ffl-filters/connect");

const vercel = JSON.parse(read("vercel.json"));
assert.ok(
  vercel.rewrites.some(
    (r) =>
      r.source === "/ffl-filters/connect" &&
      r.destination === "/api/ffl-filters-connect",
  ),
  "vercel.json missing connect rewrite",
);

const nav = read("src/lib/nav.ts");
assert.doesNotMatch(nav, /ffl-filters\/connect/, "connect path must stay out of nav");

const astro = read("astro.config.mjs");
assert.match(astro, /\/ffl-filters\/connect/, "sitemap filter must exclude connect");

const robots = read("public/robots.txt");
assert.match(robots, /Disallow:\s*\/ffl-filters\//);

const pkg = JSON.parse(read("package.json"));
assert.match(pkg.scripts["test:ci"], /test-ffl-filters-connect\.mjs/);

assert.ok(fs.existsSync(path.join(root, "api/ffl-filters-connect.ts")));
const connectSrc = read("api/ffl-filters-connect.ts") + read("api/ffl-filters-connect-lib.ts");
assert.doesNotMatch(connectSrc, /gtag|googletagmanager|klaviyo|mailchimp|instantly/i);
assert.match(connectSrc, /TODO\(Brandy\)/);
assert.match(
  read("api/ffl-filters-connect.ts"),
  /from \"\.\/ffl-filters-connect-lib\.js\"/,
  "api entry must use an explicit .js import so Vercel can resolve the module",
);
assert.doesNotMatch(
  read("api/ffl-filters-connect.ts"),
  /from \"\.\.\/src\/lib\//,
);

assert.doesNotMatch(connectSrc, /console\.(log|info|error|warn)\([^)]*process\.env/);

// --- helpers ---
assert.equal(escapeHtml(`<img src="x" onerror="alert(1)">`), "&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot;&gt;");
assert.equal(isHttpUrl("https://shop.example"), true);
assert.equal(isHttpUrl("http://shop.example/path"), true);
assert.equal(isHttpUrl("javascript:alert(1)"), false);
assert.equal(isHttpUrl("not a url"), false);
assert.deepEqual(parseForm("a=1&b=2&a=3"), { a: "1", b: "2" });

const valid = validateHandoff(validHandoff());
assert.equal(valid.ok, true);
const missing = validateHandoff(validHandoff({ consent: "" }));
assert.equal(missing.ok, false);
assert.ok("consent" in missing.errors);

const envDropped = validateHandoff(
  validHandoff({
    include_env: "",
    plugin_version: "0.0.1",
    wp_version: "6.7",
    product_count_bucket: "80k+",
  }),
);
assert.equal(envDropped.ok, true);
assert.equal(envDropped.fields.include_env, false);
assert.equal(envDropped.fields.plugin_version, undefined);

const envKept = validateHandoff(
  validHandoff({
    include_env: "1",
    plugin_version: "0.0.1",
    wp_version: "6.7",
    woo_version: "9.2.0",
    product_count_bucket: "80k+",
  }),
);
assert.equal(envKept.ok, true);
assert.equal(envKept.fields.plugin_version, "0.0.1");
assert.match(buildLeadMessage(envKept.fields), /product_count_bucket=80k\+/);
assert.doesNotMatch(
  buildLeadMessage(envDropped.fields),
  /plugin_version/,
);

const envMissing = validateHandoff(validHandoff({ include_env: "1" }));
assert.equal(envMissing.ok, false);

// --- consent_v=2 slim handoff (FFL Filters 1.1.0) ---
assert.equal(SLIM_CONSENT_VERSION, "2");
function slimHandoff(over = {}) {
  return {
    name: "Ada Lovelace",
    email: "ada@example.com",
    message: "Need help with the filters.",
    consent: "1",
    consent_v: "2",
    ...over,
  };
}
const slimOk = validateHandoff(slimHandoff());
assert.equal(slimOk.ok, true, JSON.stringify(slimOk.errors));
assert.equal(slimOk.fields.store_name, "");
assert.equal(slimOk.fields.store_url, "");
assert.equal(slimOk.fields.topic, "");
assert.doesNotMatch(buildLeadMessage(slimOk.fields), /topic=/);
assert.match(buildLeadMessage(slimOk.fields), /consent_v=2/);
assert.equal(validateHandoff(slimHandoff({ message: "" })).ok, true, "message stays optional");
for (const field of ["name", "email", "consent"]) {
  const r = validateHandoff(slimHandoff({ [field]: "" }));
  assert.equal(r.ok, false, `v2 still requires ${field}`);
  assert.ok(field in r.errors, `v2 error for ${field}`);
}
assert.equal(validateHandoff(slimHandoff({ consent: "0" })).ok, false);
assert.equal(validateHandoff(slimHandoff({ email: "nope" })).ok, false);
// Optional on v2, but still checked when sent.
assert.ok("store_url" in validateHandoff(slimHandoff({ store_url: "javascript:alert(1)" })).errors);
assert.ok("topic" in validateHandoff(slimHandoff({ topic: "bogus" })).errors);
assert.ok("store_name" in validateHandoff(slimHandoff({ store_name: "s".repeat(201) })).errors);
const slimFull = validateHandoff(slimHandoff({ store_name: "Analytical Arms", store_url: "https://analytical.example", topic: "speed" }));
assert.equal(slimFull.ok, true);
assert.match(buildLeadMessage(slimFull.fields), /topic=speed/);

// --- v1 rules unchanged ---
for (const field of ["store_name", "store_url", "topic", "name", "email", "consent_v"]) {
  const r = validateHandoff(validHandoff({ [field]: "" }));
  assert.equal(r.ok, false, `v1 requires ${field}`);
  assert.ok(field in r.errors, `v1 error for ${field}`);
}
for (const v of ["1", "3", "v2", "20"]) {
  const r = validateHandoff(validHandoff({ consent_v: v, store_name: "", topic: "" }));
  assert.equal(r.ok, false, `consent_v=${v} keeps the v1 rules`);
  assert.ok("store_name" in r.errors && "topic" in r.errors);
}
assert.match(buildLeadMessage(valid.fields), /^FFL Filters handoff\ntopic=setup\nconsent=1\nconsent_v=1/);

// --- HTTP ---
let restoreEnv = saveEnv();
resetConnectRateLimit();
const fetchCtl = opsOk();

try {
  const getRes = await handleConnect(
    connectRequest("GET", {
      url: `${CONNECT}?name=Hacker&email=hacker@example.com&consent=1&consent_v=1&store_name=X&store_url=https://x.example&topic=setup`,
    }),
  );
  assert.equal(getRes.status, 200);
  assert.equal(getRes.headers.get("x-robots-tag"), "noindex, nofollow");
  assert.equal(getRes.headers.get("cache-control"), "no-store");
  assert.equal(getRes.headers.get("referrer-policy"), "same-origin");
  const getHtml = await getRes.text();
  assert.match(getHtml, /id="delete"/);
  assert.match(getHtml, new RegExp(DELETE_MAILBOX));
  assert.match(getHtml, /<meta name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(getHtml, /gtag|googletagmanager|Hacker|hacker@example/i);
  assert.equal(fetchCtl.calls.length, 0, "GET must not create a lead");

  const headRes = await handleConnect(connectRequest("HEAD"));
  assert.equal(headRes.status, 200);
  assert.equal(await headRes.text(), "");

  const noConsent = await postHandoff(validHandoff({ consent: "0" }));
  assert.equal(noConsent.status, 400);
  assert.match(await noConsent.text(), /consent box wasn&#39;t ticked/);
  assert.equal(fetchCtl.calls.length, 0);

  const missingFields = await postHandoff(validHandoff({ name: "", email: "" }));
  assert.equal(missingFields.status, 400);
  assert.match(await missingFields.text(), /A required detail was missing/);
  assert.equal(fetchCtl.calls.length, 0);

  const tooLongMsg = await postHandoff(
    validHandoff({ message: "m".repeat(1001) }),
  );
  assert.equal(tooLongMsg.status, 400);
  assert.equal(fetchCtl.calls.length, 0);

  const multipart = await handleConnect(
    connectRequest("POST", {
      body: "--bndry\r\nContent-Disposition: form-data; name=\"name\"; filename=\"x.txt\"\r\n\r\nhi\r\n--bndry--",
      headers: { "content-type": "multipart/form-data; boundary=bndry" },
    }),
  );
  assert.equal(multipart.status, 400);
  assert.match(await multipart.text(), /doesn&#39;t take file uploads/);

  const huge = await handleConnect(
    connectRequest("POST", {
      body: "name=" + "a".repeat(MAX_BODY_BYTES + 10),
    }),
  );
  assert.equal(huge.status, 413);

  const xss = await postHandoff(
    validHandoff({ store_name: `<script>alert(1)</script>` }),
  );
  const xssCookies = setCookieMap(xss);
  const xssGet = await handleConnect(
    connectRequest("GET", {
      headers: { cookie: cookieHeaderFrom(xssCookies, HANDOFF_COOKIE) },
    }),
  );
  const xssHtml = await xssGet.text();
  assert.doesNotMatch(xssHtml, /<script>alert\(1\)<\/script>/);
  assert.match(xssHtml, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);

  const ignored = await postHandoff(
    validHandoff({
      extra_secret: "should-not-persist",
      plugin_version: "9.9.9",
    }),
  );
  assert.equal(ignored.status, 303);
  const ignoredGet = await handleConnect(
    connectRequest("GET", {
      headers: { cookie: cookieHeaderFrom(setCookieMap(ignored), HANDOFF_COOKIE) },
    }),
  );
  const ignoredHtml = await ignoredGet.text();
  assert.doesNotMatch(ignoredHtml, /should-not-persist/);
  assert.doesNotMatch(ignoredHtml, /9\.9\.9/);

  const withEnv = await postHandoff(
    validHandoff({
      include_env: "1",
      plugin_version: "0.0.1",
      wp_version: "6.7.1",
      woo_version: "9.2.0",
      product_count_bucket: "50k-80k",
    }),
  );
  const confirmRes = await followConfirm(withEnv);
  assert.equal(confirmRes.status, 303, await confirmRes.text());
  assert.equal(fetchCtl.calls.length, 1, "confirm must mint exactly one Ops lead");
  const opsUrl = fetchCtl.calls[0].url;
  assert.equal(opsUrl, "https://ops.example.test/api/forms/lead");
  const opsInit = fetchCtl.calls[0].init;
  const auth = opsInit.headers.Authorization || opsInit.headers.authorization;
  assert.equal(auth, `Bearer ${SECRET}`);
  const opsBody = JSON.parse(opsInit.body);
  assert.equal(opsBody.email, "ada@example.com");
  assert.equal(opsBody.name, "Ada Lovelace");
  assert.equal(opsBody.companyName, "Analytical Arms");
  assert.equal(opsBody.website, "https://analytical.example");
  assert.equal(opsBody.phone, "555-0100");
  assert.equal(opsBody.intent, "sell");
  assert.match(opsBody.notes, /topic=setup/);
  assert.match(opsBody.notes, /consent=1/);
  assert.match(opsBody.notes, /consent_v=1/);
  assert.match(opsBody.notes, /plugin_version=0\.0\.1/);
  assert.match(opsBody.notes, /product_count_bucket=50k-80k/);
  assert.doesNotMatch(opsBody.notes, /extra_secret/);
  assert.equal(opsBody.source.page, "/ffl-filters/connect");
  assert.equal(opsBody.source.door, "coriolisagency");

  const sentCookies = setCookieMap(confirmRes);
  assert.equal(sentCookies.get(HANDOFF_COOKIE)?.value, "");
  const thanks = await handleConnect(
    connectRequest("GET", {
      headers: { cookie: cookieHeaderFrom(sentCookies, SENT_COOKIE) },
    }),
  );
  assert.equal(thanks.status, 200);
  assert.match(await thanks.text(), /We have your request/);

  // Confirm from a cross-site origin must not persist.
  const before = fetchCtl.calls.length;
  const foreignHandoff = await postHandoff(validHandoff({ topic: "website" }));
  const foreign = await followConfirm(
    foreignHandoff,
    {},
    { origin: "https://evil.example", "sec-fetch-site": "cross-site" },
  );
  assert.equal(foreign.status, 403);
  assert.equal(fetchCtl.calls.length, before);

  // Same-site confirm without cookie/csrf fails and does not mint.
  const noCsrf = await handleConnect(
    connectRequest("POST", {
      body: encodeBody({ confirm: "1", csrf: "nope" }),
      headers: {
        origin: "https://www.coriolisagency.com",
        "sec-fetch-site": "same-origin",
      },
    }),
  );
  assert.equal(noCsrf.status, 400);
  assert.equal(fetchCtl.calls.length, before);

  // Origin gate (CA-FFLF-SETUP-FORM). Chrome sends `Origin: null` on the
  // confirm page's own same-origin POST when the page is no-referrer; the
  // gate must trust Sec-Fetch-Site: same-origin and nothing weaker.
  async function confirmExact(exactHeaders) {
    const handoff = await postHandoff(slimHandoff());
    assert.equal(handoff.status, 303);
    const cookie = cookieHeaderFrom(setCookieMap(handoff), HANDOFF_COOKIE);
    const page = await handleConnect(connectRequest("GET", { headers: { cookie } }));
    const csrf = (await page.text()).match(/name="csrf" value="([^"]+)"/)?.[1];
    assert.ok(csrf, "csrf missing on confirmation page");
    return handleConnect(
      connectRequest("POST", {
        body: encodeBody({ confirm: "1", csrf }),
        headers: { cookie, ...exactHeaders },
      }),
    );
  }
  const gateBefore = fetchCtl.calls.length;
  const nullSameOrigin = await confirmExact({ origin: "null", "sec-fetch-site": "same-origin" });
  assert.equal(nullSameOrigin.status, 303, "Origin null + same-origin must pass the origin gate");
  assert.equal(fetchCtl.calls.length, gateBefore + 1, "Origin null + same-origin mints one lead");
  const nullCrossSite = await confirmExact({ origin: "null", "sec-fetch-site": "cross-site" });
  assert.equal(nullCrossSite.status, 403, "Origin null + cross-site must 403");
  const nullNoFetchSite = await confirmExact({ origin: "null" });
  assert.equal(nullNoFetchSite.status, 403, "Origin null without Sec-Fetch-Site must 403");
  const foreignOrigin = await confirmExact({ origin: "https://evil.example" });
  assert.equal(foreignOrigin.status, 403, "a foreign Origin must 403");
  const foreignSameSite = await confirmExact({ origin: "https://evil.example", "sec-fetch-site": "same-site" });
  assert.equal(foreignSameSite.status, 403, "a foreign Origin with same-site must 403");
  assert.equal(fetchCtl.calls.length, gateBefore + 1, "rejected confirms mint nothing");
  // Slim v2 handoff: confirm page shows only what was sent, and the lead gets a company fallback.
  const slimBefore = fetchCtl.calls.length;
  const slimRes = await postHandoff(slimHandoff());
  assert.equal(slimRes.status, 303);
  const slimGet = await handleConnect(
    connectRequest("GET", {
      headers: { cookie: cookieHeaderFrom(setCookieMap(slimRes), HANDOFF_COOKIE) },
    }),
  );
  const slimHtml = await slimGet.text();
  assert.match(slimHtml, /Check your details and send/);
  assert.doesNotMatch(slimHtml, /<dt>Store name<\/dt>|<dt>Store URL<\/dt>|<dt>Topic<\/dt>/);
  const slimConfirm = await followConfirm(await postHandoff(slimHandoff()));
  assert.equal(slimConfirm.status, 303, await slimConfirm.text());
  assert.equal(fetchCtl.calls.length, slimBefore + 1, "slim confirm mints exactly one lead");
  const slimOps = JSON.parse(fetchCtl.calls[fetchCtl.calls.length - 1].init.body);
  assert.equal(slimOps.companyName, "Not given (FFL Filters)");
  assert.match(slimOps.notes, /consent_v=2/);
  assert.doesNotMatch(slimOps.notes, /topic=/);

  // v1 over HTTP still rejects a missing store name or topic.
  const v1NoStore = await postHandoff(validHandoff({ store_name: "" }));
  assert.equal(v1NoStore.status, 400);
  const v1NoTopic = await postHandoff(validHandoff({ topic: "" }));
  assert.equal(v1NoTopic.status, 400);
  assert.equal(fetchCtl.calls.length, slimBefore + 1);

  // Rate limit
  resetConnectRateLimit();
  restoreEnv();
  restoreEnv = saveEnv({ LEAD_FORM_RATE_MAX: "1", LEAD_FORM_RATE_WINDOW_MS: "600000" });
  const first = await postHandoff(validHandoff({ topic: "other" }));
  assert.equal(first.status, 303);
  const limited = await postHandoff(validHandoff({ topic: "other" }));
  assert.equal(limited.status, 429);
  assert.match(await limited.text(), /a lot of requests from your connection/);
} finally {
  fetchCtl.restore();
  restoreEnv();
  resetConnectRateLimit();
}

console.log("test-ffl-filters-connect: ok");
