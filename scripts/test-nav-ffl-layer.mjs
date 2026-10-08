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
  "Gun Store POS",
  "GunSearchEngine.com",
  "AI Studio",
  "Press Room",
]);
assert.deepEqual(hrefs, [
  "ecommerce",
  "gun-store-pos",
  "https://gunsearchengine.com/for-dealers",
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

// On-site FFL pages open in the same tab (Paul, 1:38 PM ET).
assert.doesNotMatch(navSrc, /newTab/);
assert.doesNotMatch(chrome, /newTab/);

// Footer: product line + exactly three family links.
assert.doesNotMatch(chrome, /2aBetsy|Betsy Live|FFL Accelerator|Demand Intelligence|AI Studio/);
const familyBlock = chrome.slice(chrome.indexOf("const family = ["), chrome.indexOf("] as const;", chrome.indexOf("const family = [")));
assert.deepEqual([...familyBlock.matchAll(/label:\s*"([^"]+)"/g)].map((m) => m[1]), ["GunSearchEngine.com", "GunStoreGame.com", "FFLIntel"]);
assert.deepEqual([...familyBlock.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]), ["https://www.gunsearchengine.com/", "https://www.gunstoregame.com/", "https://fflintel.com/"]);
assert.match(chrome, />FFL Ecommerce<\/a>/);
assert.match(chrome, /<a href=\{withBase\("ffl-analytics"\)\} class="hover:text-sky-300">FFL Analytics<\/a>/);
assert.match(chrome, /<a href=\{withBase\("ffl-search-console"\)\} class="hover:text-sky-300">FFL Search Console<\/a>/);

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
assert.equal(transformHtml('<a href="/ffl-analytics" class="c">x</a>'), '<a href="/ffl-analytics" class="c">x</a>');
assert.equal(transformHtml('<a href="/ffl-search-console" target="_blank" rel="noopener noreferrer">x</a>'), '<a href="/ffl-search-console">x</a>');
for (const host of ["https://www.gunstoregame.com/", "https://fflintel.com/", "https://fflanalytics.com", "https://www.fflsearchconsole.com/x"]) {
  assert.equal(transformHtml(`<a href="${host}">x</a>`), `<a target="_blank" rel="noopener noreferrer" href="${host}">x</a>`);
}
assert.equal(transformHtml('<a href="https://example.com/">x</a>'), '<a href="https://example.com/">x</a>');
// "2A Analytics" is now "FFL Analytics" everywhere in src.
for (const f of walkSrc(path.join(root, "src"))) {
  assert.doesNotMatch(fs.readFileSync(f, "utf8"), /2\s*a[\s_-]*analytics/i, `${f} still says 2A Analytics`);
}
assert.equal(transformHtml('<a href="https://www.gunsearchengine.com/for-dealers" target="_self">x</a>'), '<a target="_blank" rel="noopener noreferrer" href="https://www.gunsearchengine.com/for-dealers">x</a>');
assert.equal(transformHtml('<a href="/ecommerce">x</a>'), '<a href="/ecommerce">x</a>');

// Homepage Grok Bot plate: a card (div) with a stretched primary link, not a link wrapping a link.
const home = read("src/pages/index.astro");
const plateStart = home.indexOf("data-grok-bot-plate");
assert.ok(plateStart !== -1, "Grok Bot plate marker missing");
const plate = home.slice(home.lastIndexOf("<section", plateStart), home.indexOf("</section>", plateStart));
assert.doesNotMatch(plate, /<section[^>]*>\s*<a\b/, "plate must not be wrapped in a link");
assert.equal([...plate.matchAll(/href=\{withBase\("grok-bot-setup"\)\}/g)].length, 1);
assert.match(plate, /after:absolute after:inset-0/);
// OPS-33 (2026-10-08-homepage-betsy-out): the plate body is Paul's locked blurb with no inner link.
assert.equal([...plate.matchAll(/<a\b/g)].length, 1, "plate has exactly one link (the stretched Grok Bot setup link)");
assert.match(
  plate.replace(/\s+/g, " "),
  /Use Grok Bot to help run your gun store\. We will help you design your AI strategy then create, configure, train, and test your bots\. One time fee\. Live the same day\./
);
assert.doesNotMatch(plate, /betsy/i);
// What we do pillars: card with a stretched title link; the inline Botopticon.com link sits above it (no link inside a link).
const pillarsStart = home.indexOf("pillars.map(");
assert.ok(pillarsStart !== -1, "pillars map missing");
const pillarsBlock = home.slice(pillarsStart, home.indexOf("</section>", pillarsStart));
assert.doesNotMatch(pillarsBlock, /return \(\s*<a\b/, "pillar card must not be a link");
assert.match(pillarsBlock, /<div class="group relative /);
assert.match(pillarsBlock, /after:absolute after:inset-0/);
assert.match(pillarsBlock, /class=\{`\$\{linkClass\} relative z-10`\}/);
// Ad-safe Demand Intelligence sample is hosted on this site.
assert.ok(fs.existsSync(path.join(root, "public/images/ffl-demand-intelligence-sample-august-2026.png")));

// Pro plate: black and gold card with Paul's exact five features.
const PRO_FEATURES = [
  "Monthly Demand Intelligence reports",
  "Sightline embed with custom styling",
  "(the Free plan gets the standard Sightline embed)",
  "OtterText integration for Sightline alerts",
  "(uses your own OtterText account)",
  "Pro (Verified) status on GunSearchEngine.com",
  "Coming soon",
  "All future Pro features",
];
for (const rel of ["src/pages/ffl-analytics.astro", "src/pages/ffl-search-console.astro"]) {
  const src = read(rel);
  const start = src.indexOf("data-pro-plate");
  assert.ok(start !== -1, `${rel} missing Pro plate`);
  const plate = src.slice(src.lastIndexOf("<div", start), src.indexOf("</ul>", start));
  assert.match(plate, /bg-black/);
  assert.match(plate, /border-gold\/60/);
  for (const f of PRO_FEATURES) assert.ok(plate.includes(f), `${rel} Pro plate missing: ${f}`);
  assert.equal([...plate.matchAll(/<li\b/g)].length, 5, `${rel} Pro plate must list exactly 5 features`);
  assert.doesNotMatch(src, /Otter Text|More Pro features are on the way/);
  assert.match(
    plate,
    /Monthly Demand Intelligence reports\{" "\}\s*<a\s+href="\/images\/ffl-demand-intelligence-sample-august-2026\.png"\s+target="_blank"\s+rel="noopener noreferrer"\s+class="[^"]*text-gold[^"]*"\s*>\(see sample\)<\/a/,
    `${rel} missing gold "(see sample)" link`,
  );
}

console.log("test-nav-ffl-layer: ok");
