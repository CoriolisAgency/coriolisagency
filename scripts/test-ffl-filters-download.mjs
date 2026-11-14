#!/usr/bin/env node
/**
 * CA-FFLF-DOWNLOAD-PAGE guard: /ffl-filters is an unlinked, noindex download page for the exact
 * FFL Filters 1.3.5 zip. Checks the zip bytes, the page's robots/buttons, that nothing else in the
 * repo links to the page or the zip, the sitemap/lastmod exclusions, the vercel.json headers and the
 * IndexNow refusal. If dist/ exists (after `npm run build`), also checks the built sitemap and page.
 * CA-FFLF-OG-IMAGE: also asserts the 1200x630 JPEG, page-only OG/Twitter tags with absolute URLs,
 * and Brandy's alt text verbatim (quotes escaped in the built HTML).
 */
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

// 1. Exact zip.
const zip = fs.readFileSync(path.join(root, "public/downloads/ffl-filters-1.3.5.zip"));
assert.equal(zip.length, 265406, "zip size");
assert.equal(
  crypto.createHash("sha256").update(zip).digest("hex"),
  "0f572fccf5405643de8b1073785e3d269474c1103d9545203183385794529161",
  "zip sha256",
);
assert.equal(zip.subarray(0, 4).toString("hex"), "504b0304", "zip magic (not an LFS pointer)");

// 2. Page: noindex, every download button has the (beta) label and the zip href, contact goes to /contact.
const pageRel = "src/pages/ffl-filters/index.astro";
const page = read(pageRel);
assert.match(page, /^\s*noindex\s*$/m, "page passes noindex to BaseLayout");
assert.match(page, /withBase\("downloads\/ffl-filters-1\.3\.5\.zip"\)/);
assert.match(page, /const downloadLabel = "Download FFL Filters 1\.3\.5 \(beta\)";/);
const dl = [...page.matchAll(/<a href=\{download\}[^>]*>([^<]*)<\/a>/g)].map((m) => m[1]);
assert.equal(dl.length, 2, "two download buttons");
for (const label of dl) assert.equal(label, "{downloadLabel}");
assert.doesNotMatch(page.replace(/downloadLabel = "[^"]*"/, ""), /Download FFL Filters 1\.3\.5(?! zip file)/, "no unlabelled download button text");
assert.match(page, /withBase\("contact"\)/);
assert.match(read("src/layouts/BaseLayout.astro"), /noindex && <meta name="robots" content="noindex, nofollow" \/>/);


// 2b. CA-FFLF-OG-IMAGE: exact JPEG, page-only props, layout emits width/height/alt when set.
const ogRel = "public/og/ffl-filters-og.jpg";
const ogBuf = fs.readFileSync(path.join(root, ogRel));
assert.equal(ogBuf.length, 114423, "og image size");
assert.equal(
  crypto.createHash("sha256").update(ogBuf).digest("hex"),
  "c0dff4fd6092235767ee53082925407602ce6b4e881e362a638829ce07e68da2",
  "og image sha256",
);
assert.equal(ogBuf.subarray(0, 3).toString("hex"), "ffd8ff", "jpeg magic");
function jpegSize(buf) {
  let i = 2;
  while (i < buf.length - 8) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
    }
    if (marker === 0xd8 || marker === 0xd9 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2;
      continue;
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  throw new Error("no JPEG SOF");
}
const ogDim = jpegSize(ogBuf);
assert.equal(ogDim.w, 1200, "og image width");
assert.equal(ogDim.h, 630, "og image height");

const ogAbs = "https://www.coriolisagency.com/og/ffl-filters-og.jpg";
const ogAlt =
  'The FFL Filters logo and the headline "A free WooCommerce filter plugin built for FFL dealers" sit on a dark navy background. Beside them, a browser window shows a shop page filtered to Glock and 9mm Luger, with the filter panel on the left and Glock G17 V, G45 V, G19 V and G26 V pistol cards.';
assert.match(page, /const ogImage = "og\/ffl-filters-og\.jpg";/);
assert.match(page, /ogImagePath=\{ogImage\}/);
assert.match(page, /ogImageWidth=\{1200\}/);
assert.match(page, /ogImageHeight=\{630\}/);
assert.match(page, /ogImageAlt=\{ogImageAlt\}/);
assert.ok(page.includes(ogAlt), "page ships Brandy alt verbatim");

const layout = read("src/layouts/BaseLayout.astro");
assert.match(layout, /ogImageAlt\?: string;/);
assert.match(layout, /ogImageWidth\?: number;/);
assert.match(layout, /ogImageHeight\?: number;/);
assert.match(layout, /property="og:image:width"/);
assert.match(layout, /property="og:image:height"/);
assert.match(layout, /property="og:image:alt"/);
assert.match(layout, /name="twitter:card" content="summary_large_image"/);
assert.match(layout, /name="twitter:image"/);
assert.match(layout, /name="twitter:image:alt"/);
assert.match(layout, /ogImageWidth != null/);
assert.match(layout, /ogImageHeight != null/);
assert.match(layout, /ogImageAlt \? \(/);

// 3. Nothing else links to the page or the zip.
const files = execFileSync("git", ["ls-files", "-co", "--exclude-standard"], { cwd: root, encoding: "utf8" })
  .split(/\r?\n/)
  .filter((f) => f && /\.(astro|ts|tsx|js|mjs|md|mdx|json|txt|html|xml|css|yml|yaml)$/.test(f));
const allowed = new Set([
  pageRel,
  "astro.config.mjs",
  "vercel.json",
  "scripts/gen-lastmod.mjs",
  "scripts/indexnow-submit.mjs",
  "scripts/test-ffl-filters-download.mjs",
  // Pre-existing `Disallow: /ffl-filters/` (covers /ffl-filters/connect); a crawl rule, not a link.
  "public/robots.txt",
]);
const pageRef = /\/ffl-filters(?!\/connect|-connect)(?=["'`)\s/?#]|$)/m;
const zipRef = /ffl-filters-1\.3\.5\.zip|\/downloads\//;
for (const f of files) {
  if (allowed.has(f) || f === "package-lock.json") continue;
  const src = read(f);
  assert.doesNotMatch(src, pageRef, `${f} links to /ffl-filters`);
  assert.doesNotMatch(src, zipRef, `${f} links to the 1.3.5 zip`);
}
for (const f of [...allowed].filter((f) => f !== pageRel && f.startsWith("src/"))) assert.fail(`unexpected src allowance ${f}`);

// 4. Sitemap + lastmod exclusions.
const cfg = read("astro.config.mjs");
assert.match(cfg, /!\/\\\/ffl-filters\\\/\?\$\/\.test\(new URL\(page\)\.pathname\)/, "sitemap filter excludes /ffl-filters");
assert.match(read("scripts/gen-lastmod.mjs"), /"\/ffl-filters",/);
assert.equal(JSON.parse(read("lastmod.json"))["/ffl-filters"], undefined, "not in lastmod.json");

// 5. vercel.json headers.
const vercel = JSON.parse(read("vercel.json"));
const hdr = (src) => Object.fromEntries((vercel.headers.find((h) => h.source === src)?.headers ?? []).map((h) => [h.key, h.value]));
assert.equal(hdr("/ffl-filters")["X-Robots-Tag"], "noindex, nofollow");
assert.equal(hdr("/downloads/(.*)")["X-Robots-Tag"], "noindex, nofollow");
assert.equal(hdr("/downloads/(.*)\\.zip")["Content-Type"], "application/zip");
assert.ok(vercel.rewrites.some((r) => r.source === "/ffl-filters/connect" && r.destination === "/api/ffl-filters-connect"), "connect rewrite intact");

// 6. IndexNow refuses the page and the zip (exits 2 before any network call).
for (const u of ["https://www.coriolisagency.com/ffl-filters", "https://www.coriolisagency.com/ffl-filters/", "https://www.coriolisagency.com/downloads/ffl-filters-1.3.5.zip"]) {
  let code = 0;
  try {
    execFileSync(process.execPath, [path.join(root, "scripts/indexnow-submit.mjs"), u], { stdio: "pipe", env: { ...process.env, INDEXNOW_KEY: "test-key-not-used" } });
  } catch (e) {
    code = e.status;
  }
  assert.equal(code, 2, `indexnow refuses ${u}`);
}

// 7. Built output, when present.
const dist = path.join(root, "dist");
if (fs.existsSync(dist)) {
  const maps = fs.readdirSync(dist).filter((f) => /^sitemap-\d+\.xml$/.test(f));
  assert.ok(maps.length > 0, "built sitemap present");
  for (const m of maps) assert.doesNotMatch(fs.readFileSync(path.join(dist, m), "utf8"), /\/ffl-filters</, `${m} lists /ffl-filters`);
  const html = fs.readFileSync(path.join(dist, "ffl-filters", "index.html"), "utf8");
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.equal((html.match(/href="\/downloads\/ffl-filters-1\.3\.5\.zip"/g) ?? []).length, 2);
  assert.equal((html.match(/Download FFL Filters 1\.3\.5 \(beta\)/g) ?? []).length, 2);
  const ogAbsRe = ogAbs.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const ogAltEsc = ogAlt.replaceAll('"', "&quot;").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  assert.match(html, new RegExp(`<meta property="og:image" content="${ogAbsRe}"`));
  assert.match(html, /<meta property="og:image:width" content="1200"/);
  assert.match(html, /<meta property="og:image:height" content="630"/);
  assert.match(html, new RegExp(`<meta property="og:image:alt" content="${ogAltEsc}"`));
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"/);
  assert.match(html, new RegExp(`<meta name="twitter:image" content="${ogAbsRe}"`));
  assert.match(html, new RegExp(`<meta name="twitter:image:alt" content="${ogAltEsc}"`));
  const distOg = fs.readFileSync(path.join(dist, "og", "ffl-filters-og.jpg"));
  assert.equal(
    crypto.createHash("sha256").update(distOg).digest("hex"),
    "c0dff4fd6092235767ee53082925407602ce6b4e881e362a638829ce07e68da2",
    "dist og image sha256",
  );
  for (const f of fs.readdirSync(dist, { recursive: true })) {
    if (!String(f).endsWith(".html") || path.normalize(String(f)) === path.join("ffl-filters", "index.html")) continue;
    const other = fs.readFileSync(path.join(dist, String(f)), "utf8");
    assert.doesNotMatch(other, /href="(https:\/\/www\.coriolisagency\.com)?\/ffl-filters\/?"/, `${f} links to /ffl-filters`);
    assert.doesNotMatch(other, /ffl-filters-1\.3\.5\.zip/, `${f} links to the zip`);
    assert.doesNotMatch(other, /\/og\/ffl-filters-og\.jpg/, `${f} uses the FFL Filters OG image`);
  }
  console.log("test-ffl-filters-download: dist checks ok");
}
console.log("test-ffl-filters-download: ok");