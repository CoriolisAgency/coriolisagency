// SEO-TECH-WEEK1: /gunbiz-pos and six legacy 404s 301 once to canonical targets.
// Trailing-slash variants are listed so Vercel trailingSlash:false does not add a 308 hop.
import assert from "node:assert/strict";
import fs from "node:fs";

const v = JSON.parse(fs.readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
const redirects = v.redirects || [];
const rewrites = v.rewrites || [];
const pathRedirects = redirects.filter((r) => !r.has);
const sourceSet = new Set(pathRedirects.map((r) => r.source));

const CASES = [
  ["/gunbiz-pos", "/microbiz-pos"],
  ["/gunbiz-pos/", "/microbiz-pos"],
  ["/custom-gun-store-websites-branding-matters-firearms-ecommerce", "/ecommerce"],
  ["/custom-gun-store-websites-branding-matters-firearms-ecommerce/", "/ecommerce"],
  ["/seo-for-firearms-retailers-get-found-sell-more-guns-online", "/ffl-seo"],
  ["/seo-for-firearms-retailers-get-found-sell-more-guns-online/", "/ffl-seo"],
  ["/category/firearms-seo", "/ffl-seo"],
  ["/category/firearms-seo/", "/ffl-seo"],
  ["/firearms-digital-marketing-agency", "/"],
  ["/firearms-digital-marketing-agency/", "/"],
  ["/ammoseek-automation-for-gun-stores", "/ecommerce"],
  ["/ammoseek-automation-for-gun-stores/", "/ecommerce"],
  ["/wekickbrass-com-switches-to-coriolis-for-firearms-dropshipping", "/press"],
  ["/wekickbrass-com-switches-to-coriolis-for-firearms-dropshipping/", "/press"],
];

for (const [src, dest] of CASES) {
  const hits = pathRedirects.filter((r) => r.source === src);
  assert.equal(hits.length, 1, `${src}: want exactly one redirect`);
  const r = hits[0];
  assert.equal(r.destination, dest, `${src}: destination`);
  assert.equal(r.statusCode, 301, `${src}: must be a 301`);
  assert.ok(!sourceSet.has(r.destination), `${src}: ${dest} must not redirect again (single hop)`);
  assert.ok(!rewrites.some((w) => w.source === src), `${src}: must not also be a rewrite`);
}

assert.equal(v.trailingSlash, false, "trailingSlash must stay false");
console.log("test-redirects-seo-tech-week1: ok");
