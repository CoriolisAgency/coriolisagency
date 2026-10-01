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
  assert.match(src, /Sign up by Dec 31, 2026 and get Pro free through Dec 31, 2027\. \$99\/month after that\./);
  assert.doesNotMatch(src, /Free through December 31, 2026/);
  // The only price allowed on these pages is the Pro line's "$99/month after that".
  const priceless = src.replace("$99/month after that.", "");
  assert.doesNotMatch(priceless, /\$\d/);
  assert.doesNotMatch(priceless, /\/month/);
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

// FFL pages open in a new tab from the header nav.
assert.match(navSrc, /href: "ffl-analytics", label: "FFL Analytics", newTab: true/);
assert.match(navSrc, /href: "ffl-search-console", label: "FFL Search Console", newTab: true/);
assert.equal([...chrome.matchAll(/target=\{newTab \? "_blank" : undefined\}/g)].length, 2);

// Footer: product line + exactly three family links.
assert.doesNotMatch(chrome, /2aBetsy|Betsy Live|FFL Accelerator|Demand Intelligence|AI Studio/);
const familyBlock = chrome.slice(chrome.indexOf("const family = ["), chrome.indexOf("] as const;", chrome.indexOf("const family = [")));
assert.deepEqual([...familyBlock.matchAll(/label:\s*"([^"]+)"/g)].map((m) => m[1]), ["GunSearchEngine.com", "GunStoreGame.com", "FFLIntel"]);
assert.deepEqual([...familyBlock.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]), ["https://www.gunsearchengine.com/", "https://www.gunstoregame.com/", "https://fflintel.com/"]);
assert.match(chrome, />FFL Ecommerce<\/a>/);
assert.match(chrome, /withBase\("ffl-analytics"\)[\s\S]{0,120}target="_blank"[\s\S]{0,60}>FFL Analytics<\/a/);
assert.match(chrome, /withBase\("ffl-search-console"\)[\s\S]{0,120}target="_blank"[\s\S]{0,60}>FFL Search Console<\/a/);

// "Gun Search Engine" is now "GunSearchEngine.com" everywhere in src.
function walkSrc(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkSrc(p, out);
    else if (/\.(astro|ts|mjs|js)$/.test(e.name)) out.push(p);
  }
  return out;
}
for (const f of walkSrc(path.join(root, "src"))) {
  assert.doesNotMatch(fs.readFileSync(f, "utf8"), /Gun Search Engine/i, `${f} still says Gun Search Engine`);
}

// Build step: link plain-text GunSearchEngine.com and force new tabs on GSE/FFL links.
const { transformHtml } = await import("../src/integrations/gse-links.mjs");
assert.equal(
  transformHtml("<p>Try GunSearchEngine.com today</p>"),
  '<p>Try <a href="https://gunsearchengine.com" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 hover:text-sky-300">GunSearchEngine.com</a> today</p>',
);
assert.equal(transformHtml('<a href="/x">GunSearchEngine.com</a>'), '<a href="/x">GunSearchEngine.com</a>');
assert.equal(transformHtml("<button><span>GunSearchEngine.com</span></button>"), "<button><span>GunSearchEngine.com</span></button>");
assert.equal(transformHtml('<a href="/ffl-analytics" class="c">x</a>'), '<a target="_blank" rel="noopener noreferrer" href="/ffl-analytics" class="c">x</a>');
assert.equal(transformHtml('<a href="https://www.gunsearchengine.com/for-dealers" target="_self">x</a>'), '<a target="_blank" rel="noopener noreferrer" href="https://www.gunsearchengine.com/for-dealers">x</a>');
assert.equal(transformHtml('<a href="/ecommerce">x</a>'), '<a href="/ecommerce">x</a>');

console.log("test-nav-ffl-layer: ok");
