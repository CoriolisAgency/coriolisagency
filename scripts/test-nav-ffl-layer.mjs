import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

const navSrc = read("src/lib/nav.ts");
const labels = [...navSrc.matchAll(/label:\s*"([^"]+)"/g)].map((m) => m[1]);
const hrefs = [...navSrc.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]);

assert.deepEqual(labels, [
  "FFL Ecommerce",
  "FFL Analytics",
  "FFL Search Console",
  "AI Studio",
  "Press Room",
]);
assert.deepEqual(hrefs, [
  "ecommerce",
  "ffl-analytics",
  "ffl-search-console",
  "ai-studio",
  "press",
]);
assert.doesNotMatch(navSrc, /Gun Search Engine/);
assert.doesNotMatch(navSrc, /LINKS\.gsa/);
assert.doesNotMatch(navSrc, /_blank/);

const chrome = read("src/components/SiteChrome.astro");
assert.equal([...chrome.matchAll(/MAIN_NAV\.map\(/g)].length, 2);
assert.doesNotMatch(chrome, /const nav = \[/);

const bannedCopy =
  /Gun Runner|Warlord|\bPOS\b|Betsy|\bGSA\b|GunSearchAgent/;

function assertLandingPage(rel, { h1, campaign, notice }) {
  const src = read(rel);
  assert.match(src, new RegExp(h1.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(src, /utm_source=coriolisagency/);
  assert.match(src, new RegExp(`utm_campaign=${campaign}`));
  assert.match(src, new RegExp(notice.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(src, /Sign up by Dec 31, 2026 and get Pro free through Dec 31, 2027\./);
  assert.doesNotMatch(src, /Free through December 31, 2026/);
  assert.doesNotMatch(src, /\$\d/);
  assert.doesNotMatch(src, /\/month/);
  assert.doesNotMatch(src, bannedCopy);
  assert.doesNotMatch(src, /noindex/);
  assert.doesNotMatch(src, /<img/);
  const gseUrls = src.match(/https?:\/\/(?:www\.)?gunsearchengine\.com[^"'\s]*/g) ?? [];
  assert.ok(gseUrls.length >= 1, `${rel} missing dealer register CTA`);
  for (const url of gseUrls) {
    assert.match(
      url,
      /\/dealers\/register/,
      `${rel} unexpected gunsearchengine.com link: ${url}`,
    );
  }
}

assert.ok(fs.existsSync(path.join(root, "src/pages/ffl-analytics.astro")));
assert.ok(fs.existsSync(path.join(root, "src/pages/ffl-search-console.astro")));

assertLandingPage("src/pages/ffl-analytics.astro", {
  h1: "Understand your gun store's website",
  campaign: "ffl-analytics",
  notice:
    "Not affiliated with Google. Google Analytics is a trademark of Google LLC.",
});

assertLandingPage("src/pages/ffl-search-console.astro", {
  h1: "The 2A layer for Google Search Console users",
  campaign: "ffl-search-console",
  notice:
    "Not affiliated with Google. Google Search Console is a trademark of Google LLC.",
});

const consoleSrc = read("src/pages/ffl-search-console.astro");
assert.doesNotMatch(consoleSrc, /\b(is live|now available|now live)\b/i);

console.log("test-nav-ffl-layer: ok");
