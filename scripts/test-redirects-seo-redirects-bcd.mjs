// SEO-REDIRECTS-BCD: four SEO vanity slugs 301 once to /ffl-seo;
// /is-woocommerce-good-for-firearms retargeted from 308 /ecommerce to 301 /can-you-use-woocommerce-to-sell-guns.
// Trailing-slash variants are listed so Vercel trailingSlash:false does not add a 308 hop.
import assert from "node:assert/strict";
import fs from "node:fs";

const v = JSON.parse(fs.readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
const redirects = v.redirects || [];
const rewrites = v.rewrites || [];
const pathRedirects = redirects.filter((r) => !r.has);
const sourceSet = new Set(pathRedirects.map((r) => r.source));

const CASES = [
  ["/seo-is-deal-long-live-seo", "/ffl-seo"],
  ["/seo-is-deal-long-live-seo/", "/ffl-seo"],
  ["/gun-industry-seo-company-boosting-online-visibility-for-firearms-businesses", "/ffl-seo"],
  ["/gun-industry-seo-company-boosting-online-visibility-for-firearms-businesses/", "/ffl-seo"],
  ["/mastering-firearms-seo-boost-your-gun-stores-online-visibility", "/ffl-seo"],
  ["/mastering-firearms-seo-boost-your-gun-stores-online-visibility/", "/ffl-seo"],
  ["/firearms-seo", "/ffl-seo"],
  ["/firearms-seo/", "/ffl-seo"],
  ["/is-woocommerce-good-for-firearms", "/can-you-use-woocommerce-to-sell-guns"],
  ["/is-woocommerce-good-for-firearms/", "/can-you-use-woocommerce-to-sell-guns"],
];

for (const [src, dest] of CASES) {
  const hits = pathRedirects.filter((r) => r.source === src);
  assert.equal(hits.length, 1, `${src}: want exactly one redirect`);
  const r = hits[0];
  assert.equal(r.destination, dest, `${src}: destination`);
  assert.equal(r.statusCode, 301, `${src}: must be a 301`);
  assert.ok(!r.permanent, `${src}: must not use permanent (Vercel 308)`);
  assert.ok(!sourceSet.has(r.destination), `${src}: ${dest} must not redirect again (single hop)`);
  assert.ok(!rewrites.some((w) => w.source === src), `${src}: must not also be a rewrite`);
}

assert.ok(
  !pathRedirects.some((r) => /why-ffls-suck/i.test(r.source)),
  "do not add the why-ffls-suck slug",
);
assert.equal(v.trailingSlash, false, "trailingSlash must stay false");
console.log("test-redirects-seo-redirects-bcd: ok");
