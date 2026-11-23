// popup-kit v2 contract for coriolisagency.com (FFL-CLAIM-POPUP).
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const kit = path.join(root, "popup-kit");
const DASH = /[\u2013\u2014]/;
const read = (rel) => fs.readFileSync(path.join(root, rel));
const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");

const sums = fs.readFileSync(path.join(kit, "SHA256SUMS"), "utf8").trim().split(/\r?\n/);
const seen = new Set();
for (const line of sums) {
  const m = line.match(/^([0-9a-f]{64})  (.+)$/);
  assert.ok(m, `bad SHA256SUMS line: ${line}`);
  assert.equal(sha256(fs.readFileSync(path.join(kit, m[2]))), m[1], `hash mismatch ${m[2]}`);
  seen.add(m[2]);
}
for (const rel of ["VERSION", "README.md", "client/coriolis-popup.js", "client/coriolis-popup.css", "server/subscribe-core.ts"]) {
  assert.ok(seen.has(rel), `SHA256SUMS missing ${rel}`);
}
assert.equal(read("popup-kit/VERSION").toString().trim(), "2");
const jsKit = read("popup-kit/client/coriolis-popup.js");
assert.ok(jsKit.length < 16 * 1024, `client JS ${jsKit.length} >= 16KB`);
assert.deepEqual(read("public/popup/coriolis-popup.v2.js"), jsKit);
assert.deepEqual(read("public/popup/coriolis-popup.v2.css"), read("popup-kit/client/coriolis-popup.css"));

for (const rel of ["src/lib/popup-config.ts", "api/popup.ts", "popup-kit/README.md", "popup-kit/client/coriolis-popup.js"]) {
  assert.doesNotMatch(read(rel).toString(), DASH, `em/en dash in ${rel}`);
}

const layout = read("src/layouts/BaseLayout.astro").toString();
assert.match(layout, /popup\/coriolis-popup\.v2\.js/);
assert.match(layout, /popup\/coriolis-popup\.v2\.css/);
assert.doesNotMatch(layout, /coriolis-popup\.v1\./);

const { AGENCY_POPUP_CONFIG: C } = await import("../src/lib/popup-config.ts");
assert.equal(C.site, "agency");
assert.equal(C.endpoint, "/api/popup");
assert.equal(C.copy.headline, "Licensed dealers only. Claim your FFL.");
assert.equal(C.copy.badge, "Free for every licensed FFL");
assert.equal(C.copy.button, "Claim my FFL");
assert.equal(C.copy.noFflHeadline, "Get updates");
assert.equal(C.logos[0].alt, "Coriolis");
assert.ok(fs.existsSync(path.join(root, "public", C.logos[0].src)), "lead logo missing");
assert.ok(fs.existsSync(path.join(root, "public", C.peek.src)), "peek image missing");
const text = JSON.stringify(C).toLowerCase();
for (const bad of ["only today", "hurry", "spots left", "limited time", "act now", "expires"]) {
  assert.equal(text.includes(bad), false, `pressure copy: ${bad}`);
}

const api = read("api/popup.ts").toString();
assert.match(api, /handlePopupLookup/);
assert.match(api, /publicResult/);
assert.doesNotMatch(api, /process\.env\.[A-Z_]+/, "api must read env by name through the core only");

console.log("test-popup: ok (v2)");
