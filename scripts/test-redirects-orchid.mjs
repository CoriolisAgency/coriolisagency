// ORCHID-RM (Paul 2026-10-21): /orchid-alternative and the six Orchid comparison slugs 301 once to /ecommerce.
import assert from "node:assert/strict";
import fs from "node:fs";

const v = JSON.parse(fs.readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
const redirects = v.redirects || [];
const rewrites = v.rewrites || [];
const SOURCES = [
  "/orchid-alternative",
  "/fastbound-vs-orchid-ebound-a-comprehensive-comparison-of-ffl-software-solutions",
  "/fastbound-vs-orchid",
  "/fastbound-vs-orchid-ebound",
  "/fastbound-vs-orchid-ebound-bound-book",
  "/fastbound-vs-orchid-advisors",
  "/orchid",
];
const GONE = ["/ebound", "/orchid-gun-store-pos", "/orchid-estate", "/orchid-estate-bound-book", "/orchid-estate-breaks-new-ground-in-ffl-compliance"];
const sourceSet = new Set(redirects.map((r) => r.source));

for (const src of SOURCES) {
  const hits = redirects.filter((r) => r.source === src);
  assert.equal(hits.length, 1, `${src}: want exactly one redirect`);
  const r = hits[0];
  assert.equal(r.destination, "/ecommerce", `${src}: destination`);
  assert.equal(r.statusCode, 301, `${src}: must be a 301`);
  assert.ok(!sourceSet.has(r.destination), `${src}: /ecommerce must not redirect again (single hop)`);
  assert.ok(!rewrites.some((w) => w.source === src), `${src}: must not also be a rewrite`);
}
for (const g of GONE) {
  assert.ok(rewrites.some((w) => w.source === g && w.destination === "/api/gone"), `${g}: must stay 410 via /api/gone`);
  assert.ok(!sourceSet.has(g), `${g}: must not be redirected`);
}
assert.ok(!redirects.some((r) => r.destination === "/orchid-alternative"), "nothing may point at /orchid-alternative");
assert.ok(!fs.existsSync(new URL("../src/pages/orchid-alternative.astro", import.meta.url)), "page file must be gone");
console.log("test-redirects-orchid: ok");
