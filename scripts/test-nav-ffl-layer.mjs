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
  "WooCommerce for AIM",
  "WooCommerce for Rapid",
  "WooCommerce for GunBiz",
  "WooCommerce for Trident 1",
  "GunSearchEngine.com",
  "AI Studio",
  "Press Room",
]);
assert.deepEqual(hrefs, [
  "ecommerce",
  "gun-store-pos",
  "aim-pos",
  "rapid-gun-systems-pos",
  "gunbiz-pos",
  "trident-1-pos",
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

function assertLandingPage(rel, { h1, campaign, notice, pro = true, gseAllowed = /\/dealers\/register/ }) {
  const src = read(rel);
  assert.match(src, new RegExp(h1.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(src, /utm_source=coriolisagency/);
  assert.match(src, new RegExp(`utm_campaign=${campaign}`));
  assert.match(src, new RegExp(notice.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  // Paul's Pro sentence, verbatim (PAUL-0901, Chief 9:24 PM ET).
  if (pro) assert.match(src, /Pro is normally \$99\/month, and it's free through Dec 31, 2027 for anyone who activates by Dec 31, 2026\./);
  assert.doesNotMatch(src, /Free through December 31, 2026/);
  // The only price allowed on these pages is the $99/month in Paul's Pro sentence.
  const priceless = src.replace("Pro is normally $99/month, and it's free through Dec 31, 2027 for anyone who activates by Dec 31, 2026.", "");
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
      gseAllowed,
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

// SEO-U32 (Brandy FINAL, Chief 10/21): rewritten from GSE's live copy; Pro block cut, one Pro line to GSE /pro.
assertLandingPage("src/pages/ffl-search-console.astro", {
  h1: "FFL Search Console: see how Google finds your gun store",
  pro: false,
  gseAllowed: /\/dealers\/register|\/dealers\/ffl-search-console$|\/pro$/,
  campaign: "ffl-search-console",
  notice:
    "Not affiliated with Google. Google Search Console is a trademark of Google LLC.",
});

const consoleSrc = read("src/pages/ffl-search-console.astro");
assert.doesNotMatch(consoleSrc, /\b(is live|now available|now live)\b/i);
assert.doesNotMatch(consoleSrc, /data-pro-plate|Coming soon|All future Pro features|being built|More Pro features are on the way|sign up by/);
assert.match(consoleSrc, /<a href="https:\/\/www\.gunsearchengine\.com\/pro" class=\{linkClass\}>Want more\? Pro is normally \$99\/month, and it's free through Dec 31, 2027 for anyone who activates by Dec 31, 2026\.<\/a>/);
assert.match(consoleSrc, /withBase\("ffl-seo"\)/);

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
// OPS-34 (2026-10-08-homepage-clients-footer): footer row is exactly "FFL Ecommerce · Gun Store POS · FFL Analytics", same tab;
// the FFL Search Console footer link is gone (the page stays live).
assert.match(chrome, /<a href=\{withBase\("gun-store-pos"\)\} class="hover:text-sky-300">Gun Store POS<\/a>/);
assert.doesNotMatch(chrome, /withBase\("ffl-search-console"\)/);
{
  const row = chrome.slice(chrome.indexOf(">FFL Ecommerce</a>") - 200, chrome.indexOf(">FFL Analytics</a>") + 20);
  assert.deepEqual([...row.matchAll(/>([^<>{}]+)<\/a>/g)].map((m) => m[1]), ["FFL Ecommerce", "Gun Store POS", "FFL Analytics"]);
  assert.doesNotMatch(row, /target=/);
}

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
assert.match(pillarsBlock, /class=\{cardLinkClass\}/);
// OPS-34: inline card links must render sky-blue even though global CSS sets `a { color: inherit }`.
assert.match(home, /const cardLinkClass = `\$\{linkClass\} !text-sky-400 relative z-10`;/);
// Ad-safe Demand Intelligence sample is hosted on this site.
assert.ok(fs.existsSync(path.join(root, "public/images/ffl-demand-intelligence-sample-august-2026.png")));

// Pro plate: black and gold card with Paul's four features. "Coming soon" and "All future Pro features" are cut (Chief 9:24 PM ET).
const PRO_FEATURES = [
  "Monthly Demand Intelligence reports",
  "Sightline embed with custom styling",
  "(the Free plan gets the standard Sightline embed)",
  "OtterText integration for Sightline alerts",
  "(uses your own OtterText account)",
  "Pro (Verified) status on GunSearchEngine.com",
];
for (const rel of ["src/pages/ffl-analytics.astro"]) {
  const src = read(rel);
  const start = src.indexOf("data-pro-plate");
  assert.ok(start !== -1, `${rel} missing Pro plate`);
  const plate = src.slice(src.lastIndexOf("<div", start), src.indexOf("</ul>", start));
  assert.match(plate, /bg-black/);
  assert.match(plate, /border-gold\/60/);
  for (const f of PRO_FEATURES) assert.ok(plate.includes(f), `${rel} Pro plate missing: ${f}`);
  assert.equal([...plate.matchAll(/<li\b/g)].length, 4, `${rel} Pro plate must list exactly 4 features`);
  assert.doesNotMatch(src, /Coming soon|All future Pro features|Sign up by/);
  assert.doesNotMatch(src, /Otter Text|More Pro features are on the way/);
  assert.match(
    plate,
    /Monthly Demand Intelligence reports\{" "\}\s*<a\s+href="\/images\/ffl-demand-intelligence-sample-august-2026\.png"\s+target="_blank"\s+rel="noopener noreferrer"\s+class="[^"]*text-gold[^"]*"\s*>\(see sample\)<\/a/,
    `${rel} missing gold "(see sample)" link`,
  );
}

// SEO-U24 PR A (Chief, 2026-10-21 7:35 PM ET).
{
  const flat = (rel) => read(rel).replace(/\s+/g, " ").replace(/\{" "\}/g, " ").replace(/\s+/g, " ");
  // Embargo: no "warehouse" on the DI page, its FAQ, or the proof cards; stale NBS date gone.
  for (const rel of ["src/pages/demand-intelligence.astro", "src/lib/faq.ts", "src/lib/factory.ts", "src/lib/stack-preview.ts"]) {
    assert.doesNotMatch(read(rel), /warehouse/i, `${rel} mentions the embargoed term`);
  }
  assert.doesNotMatch(read("src/pages/demand-intelligence.astro") + read("src/lib/faq.ts"), /NBS Fall Market|Aug(ust)? 24/);
  const di = flat("src/pages/demand-intelligence.astro");
  assert.match(di, /Tell us what you want to see, and we'll book your demo\./);
  assert.match(di, /Ready to apply now\? <a href=\{APPLY_HREF\}[^>]*>Start on GunSearchEngine\.com<\/a>\./);
  assert.match(di, /const APPLY_HREF = `\$\{GSE\}\/betsy\/enterprise-copilot#demo`;/);
  assert.match(di, /<LeadForm site="coriolisagency" defaultPillar="Demand Intelligence" \/>/);
  // Owner-term links: same tab, withBase + linkClass.
  const anchor = (rel, before, path, label, after) => {
    const src = flat(rel);
    const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(
      src,
      new RegExp(`${esc(before)} ?<a href=\\{withBase\\("${esc(path)}"\\)\\} class=\\{linkClass\\}>${esc(label)}</a> ?${esc(after)}`),
      `${rel} missing owner-term link "${label}"`,
    );
  };
  anchor("src/pages/best-ffl-ecommerce-website.astro", "See our", "ecommerce", "FFL website design and plans", ", from a branded storefront to a full custom build.");
  anchor("src/pages/ffl-cockpit.astro", "It all runs on your", "ecommerce", "FFL website design", ", so your catalog and your orders stay in one place.");
  anchor("src/pages/ffl-cockpit.astro", "Want more guns online without more on the shelf? Add", "firearms-dropshipping", "FFL dropshipping", "from your distributors.");
  anchor("src/pages/ecommerce.astro", "Use", "firearms-dropshipping", "FFL dropshipping", "to list distributor stock you don't keep on hand.");
  anchor("src/pages/ecommerce.astro", "Then bring buyers back with", "email-marketing-for-ffl-ecommerce", "FFL email marketing", "built for gun stores.");
  for (const rel of ["src/pages/ammoready-alternative.astro", "src/pages/gearfire-alternative.astro"]) {
    anchor(rel, "Want an FFL website you own, built and run by people who know the trade?", "ecommerce", "Start here", ".");
  }
  anchor("src/pages/ai-studio.astro", "Want an AI assistant that works for your shop? Start with", "grok-bot-setup", "Grok Bot setup for gun stores", ".");
  // Proof cards.
  const fx = read("src/lib/factory.ts");
  assert.match(fx, /urlLabel: "coriolisagency\.com\/demand-intelligence"/);
  assert.match(fx, /"What shoppers searched for, including what they couldn't find\. ",\s*\{ label: "Book a demo", href: LINKS\.demandDemo \},\s*"\. The dashboard and API run on GunSearchEngine\.com\."/);
  assert.match(fx, /GSE Basic is free forever\. FFL Analytics and FFL Search Console included, no Pro required\./);
  assert.doesNotMatch(fx, /Core is free forever/);
  assert.match(read("src/lib/links.ts"), /demandIntel: "\/demand-intelligence",\s*demandDemo: "\/demand-intelligence#demo",/);
}
{
  const v = JSON.parse(read("vercel.json"));
  const bySrc = Object.fromEntries((v.redirects || []).map((r) => [r.source, r]));
  assert.equal(bySrc["/gun-store-pos-for-ffls"].destination, "/gun-store-pos");
  assert.equal(bySrc["/pos-integration-for-gun-store-ecommerce"].destination, "/gun-store-pos");
  assert.equal(
    bySrc["/wisconsin-firearms-training-center-selects-coriolis-agency-for-ffl-website-design-trident-1-pos-integration-and-email-marketing"].destination,
    "/trident-1-pos",
  );
  assert.equal(bySrc["/category/aim-pos-woocommerce"].destination, "/aim-pos");
  assert.match(chrome, /id="pos-menu"/);
  assert.match(chrome, /aria-controls="pos-menu"/);
  assert.match(chrome, /aria-label="Gun Store POS pages"/);
}

console.log("test-nav-ffl-layer: ok");
