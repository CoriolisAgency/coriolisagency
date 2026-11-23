#!/usr/bin/env node
/**
 * FFLFW-LANDING / FFLF-FIREWALL-V1-S3B-BUY guard: /ffl-firewall is a noindex
 * buy page. Checks Brandy's copy and art, the live Stripe buy buttons, that the
 * early-access lead form is gone, launch noindex + nav order, sitemap/lastmod/
 * IndexNow/vercel exclusions, published terms, and banned words. If dist/
 * exists (after `npm run build`), also checks the built page, sitemap, OG/hero
 * bytes, and header nav order.
 */
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { FFLFW_V1_LIVE, FFLFW_ZIP_CURRENT, FFLFW_ZIP_V1, FFLFW_ZIP_V1_SHA256, fflfwZip, fflfwLandingNoindex } from "../src/lib/ffl-firewall-release.mjs";
import { PENDING_COPY } from "../src/lib/ffl-firewall-pending-copy.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

const pageRel = "src/pages/ffl-firewall/index.astro";
const termsRel = "src/pages/ffl-firewall/terms.astro";
const page = read(pageRel);
const terms = read(termsRel);

const banned = /Orchid|eState/i;
assert.doesNotMatch(page, banned, `${pageRel} has a banned word`);
assert.doesNotMatch(terms, banned, `${termsRel} has a banned word`);

// 1. Page: noindex, title, meta, path, buy CTAs, contact, no download/file.
assert.match(page, /^\s*noindex=\{fflfwLandingNoindex\(\)\}\s*$/m, "page noindex follows the FFLFW_V1_LIVE switch");
assert.equal(FFLFW_V1_LIVE, false, "FFLFW_V1_LIVE stays false until Paul's S4 purchase passes (Paul 9:15 AM ET Nov 23)");
assert.match(
  page,
  /title="FFL Firewall: state shipping checks and managed security for WooCommerce FFL dealers \| Coriolis"/,
);
assert.match(
  page,
  /description="FFL Firewall is a \$79\/month WooCommerce plugin for FFL dealers that helps you catch items at checkout that can't ship to the buyer's ZIP, with always-on bot and scraper control and weekly store reports included."/,
);
assert.match(page, /path="\/ffl-firewall"/);
assert.match(page, /withBase\("contact"\)/);
assert.doesNotMatch(page, /const buyLabel/, "pricing card has no buy label (Paul 12:45 PM ET)");
assert.match(page, /const getLabel = "Get FFL Firewall";/);
assert.match(page, /const contactLabel = "Talk to Coriolis";/);
assert.match(page, /const buyHref = "https:\/\/checkout\.coriolisagency\.com\/b\/6oU7sM3obb7c5phf2o1440s";/);
assert.doesNotMatch(page, /data-buy=/, "no Buy a license button on the pricing card (Paul 12:45 PM ET)");
const pricingSec = page.slice(page.indexOf('data-section="pricing"'), page.indexOf('data-section="faq"'));
assert.doesNotMatch(pricingSec, /Buy a license|buyHref|buyLabel/, "pricing card has no Buy a license");
assert.doesNotMatch(page, /data-file=/);
assert.deepEqual([...page.matchAll(/data-download="(hero|pricing|footer)"/g)].map((m) => m[1]), ["hero", "pricing", "footer"], "Get FFL Firewall buttons open the gate");
assert.match(page, /const download = withBase\(fflfwZip\(\)\);/, "zip slot follows the FFLFW_V1_LIVE switch");
assert.doesNotMatch(page, /github\.com\/CoriolisAgency\/ffl-firewall-releases/, "no GitHub release link");
assert.doesNotMatch(page, /href="[^"]*ffl-filters"/, "no body link to the FFL Filters page (CA-NAV-FFLF)");
assert.doesNotMatch(page, /free/i, "no FFL Firewall string on the page may contain free (Paul 10:39 AM ET)");
assert.match(page, /import FflFiltersDownloadGate from "\.\.\/\.\.\/components\/FflFiltersDownloadGate\.astro";/);
assert.match(page, /<FflFiltersDownloadGate[\s\S]*?href=\{download\}[\s\S]*?buyHref=\{buyHref\}[\s\S]*?\/>/);
for (const s of ["Download FFL Firewall", "Download", "That email doesn't look valid.", "FFL Firewall download", "Buy a license"]) assert.ok(page.includes(s), `gate string missing: ${s}`);
assert.ok(page.includes("FFL Firewall is a paid plugin, and anyone can download and install it with no purchase needed; it checks carts once you add a license. Enter your company name, website URL, and email, and your download starts."));
assert.ok(page.includes("Your download has started, and you can install FFL Firewall without buying anything. Unlicensed installs don't check carts, so your orders are left alone until you add a license key, which costs $79 a month for unlimited transactions. The built-in demo in WooCommerce > FFL Firewall gives you 10 test runs to see each result first. Buy a license whenever you're ready, and we'll email your key. If you need help, "));
assert.doesNotMatch(page, /FflFirewallLeadGate/);
assert.doesNotMatch(page, /data-early-access/);
assert.doesNotMatch(page, /#early-access/);
assert.match(page, /withBase\("ffl-firewall\/terms"\)/);
assert.ok(page.includes("Read the FFL Firewall terms"));
assert.match(read("src/layouts/BaseLayout.astro"), /noindex && <meta name="robots" content="noindex, nofollow" \/>/);

// OVERWATCH-LEAD: Brandy's v3 landing copy, verbatim (service names render through FflFwName as "FFL Firewall · NAME").
for (const section of ["hero", "services", "activation", "pricing", "faq", "download"]) {
  assert.match(page, new RegExp(`data-section="${section}"`), `missing data-section=${section}`);
}
assert.match(page, /<h1>Managed Ecommerce Security for FFLs<\/h1>/);
for (const n of ["ACTIVE DEFENSE", "OVERWATCH", "RECON"]) assert.ok(page.includes(`<FflFwName n="${n}" />`), `service name ${n}`);
{
  const fwn = read("src/components/FflFwName.astro");
  assert.ok(fwn.includes("<b>FFL</b>&nbsp;Firewall") && fwn.includes("&nbsp;·&nbsp;"), "name lockup uses non-breaking spaces (OVERWATCH-LEAD)");
  assert.ok(fwn.includes('n.replace(/ /g, "\\u00A0")') && /\.fwn \{ white-space: nowrap; \}/.test(fwn), "service name never wraps");
}
// PLATES-INLINE (Paul 10:07 AM ET Nov 21): the three console plates show the bare feature name inline to the right of the icon, on one line; every other use keeps "FFL Firewall ? NAME".
{
  const plates = page.slice(page.indexOf('<div class="console"'), page.indexOf('<p class="cap">'));
  for (const [k, n] of [["overwatch", "OVERWATCH"], ["active-defense", "ACTIVE DEFENSE"], ["recon", "RECON"]]) {
    assert.ok(plates.includes(`<div class="hd"><FflFwGlyph kind="${k}" /><div class="nm">${n}</div></div>`), `plate ${n} shows the bare name inline with its icon`);
  }
  assert.ok(!plates.includes("FflFwName"), "plates carry no FFL Firewall prefix");
  assert.ok(/\.cc \.hd \{ display: flex; align-items: center;/.test(page) && /\.cc \.nm \{[^}]*white-space: nowrap;/.test(page), "plate name sits inline and never wraps");
}
// OVERWATCH-LEAD: OVERWATCH leads the hero console, the services and the pricing list (Paul 1:33 PM ET).
{
  assert.ok(page.indexOf('data-section="services"') < page.indexOf('<h3><FflFwName n="OVERWATCH" /></h3>') && page.indexOf('<h3><FflFwName n="OVERWATCH" /></h3>') < page.indexOf('<h3><FflFwName n="ACTIVE DEFENSE" /></h3>') && page.indexOf('<h3><FflFwName n="ACTIVE DEFENSE" /></h3>') < page.indexOf('<h3><FflFwName n="RECON" /></h3>'), "services order OVERWATCH, ACTIVE DEFENSE, RECON");
  assert.ok(page.includes('<span class="bonus-tag">Included bonus</span>'), "RECON carries the Included bonus tag");
}
const copyStrings = [
  "A $79/month managed security service, delivered as a plugin, that adds new features over time.",
  "checks each cart item's UPC against the shipping ZIP at checkout and helps you catch the ones that can't go there.",
  "is the always-on layer behind it, so once you switch it on, it stays on and keeps watching for bots and scrapers.",
  "comes included as a bonus, with weekly and on-demand reports on your store's setup.",
  "For FFL dealers running WooCommerce. The price is a flat $79 a month, whether or not you turn on",
  "The three FFL Firewall services, shown with their badges.",
  "Always-on bot and scraper control",
  "Store hardening report",
  "Included bonus",
  "What's in the plugin",
  "Shipping checks first, with a security layer and a bonus report behind them",
  "State shipping checks",
  "On both the classic and Blocks checkout, it matches each item's UPC to the shipping ZIP to help you catch items that can't ship there. Those items come out of the cart with a note to the shopper, items that need a permit or age check get a required acknowledgement checkbox, and orders that need a second look get an order note and a Flagged label.",
  "If the check can't run, checkout carries on and the order is flagged for you to review.",
  "It spots bots and scrapers and blocks or throttles them before they reach checkout, using rate limits, user agent and header checks, honeypot form fields that only bots fill in, checkout velocity and card-testing checks, and an optional datacenter IP list.",
  "Each check runs on your own site, where a request it catches is blocked or slowed down. The shared reputation feed adds what other FFL Firewall stores have seen: your store reports the bots its checks catch as salted hashes, never shopper details, and receives a list of bots those stores have reported. A new install is in the feed by default while <FflFwName n=\"ACTIVE DEFENSE\" /> is on and the license is active; a store that already had FFL Firewall keeps its saved choice, and if it never made one, the feed stays off until the store switches it on. You can switch the feed on or off at any time. The feed never touches checkout, login, the cart, My Account or wp-admin, and major search engines and link previewers are never blocked from your pages. The feed works only while <FflFwName n=\"ACTIVE DEFENSE\" /> is on, and the service needs an FFL Firewall license.",
  "It's a bonus that comes with your plan. Every week, and whenever you press Run scan, it compares the versions of your plugins, themes and WordPress core with the current releases on WordPress.org, flags configuration gaps in your setup and lists what to fix first.",
  "It reports only and makes no automatic fixes, so every change stays in your hands.",
  "You're still responsible for what you ship, and this is not legal advice.",
  "starts working",
  "Turn it on in the plugin",
  "In WooCommerce, go to FFL Firewall, open the tab for bot and scraper control and switch the service on.",
  "The plugin adds the dealer embed",
  "Once the key is saved, the plugin adds the dealer embed to your store's pages for you, and the countermeasures start once it has been seen.",
  "Your plugin dashboard shows the service as active only while the dealer embed has been seen in the last 24 hours. If a day goes by without the plugin seeing it, the dashboard says so, which tells you to check your site key and settings. Your bill doesn't change either way, because the plan costs $79 a month whether the service is on or off.",
  "One flat price of $79 a month",
  ", always on once you switch it on",
  " transactions</li>",
  "Every future feature we add",
  " weekly and on-demand reports, included as a bonus</li>",
  "Billing runs monthly in advance through Stripe Checkout, and you can cancel at any time.",
  "The questions dealers ask about FFL Firewall",
  "What do I get for $79 a month?",
  "whenever you switch it on and",
  "reports as a bonus. Every feature we add later is included at the same price.",
  "After that it stays on, and your plugin dashboard marks it active while the dealer embed has been seen within the past day.",
  "The request is blocked or slowed down, whether it was caught by a rate limit, a honeypot form field or one of the other checks. Those checks run on your own site; while your store is in the shared reputation feed, it also reports the bots it catches as salted hashes, never shopper details. Checkout, login, the cart, My Account and wp-admin are never touched by the feed.",
  "It looks at items that carry a UPC when the shopper reaches checkout. Items with no UPC pass through, and when the check can't finish, the order goes through with a Flagged label so you can review it yourself.",
  "is a bonus store hardening report that runs weekly and on demand. It checks your plugins, themes and WordPress core against the current WordPress.org releases and flags configuration gaps, then leaves every change to you, since it never fixes anything on its own.",
  "Is FFL Firewall legal advice?",
  "No. FFL Firewall is a tool that helps you catch restricted items at checkout, and every shipping decision stays with you and your own counsel.",
  "Put FFL Firewall on your WooCommerce store",
  "This is a Coriolis plugin for FFL dealers who already run WooCommerce, and one $79 monthly plan covers every service in it. If you'd like a hand with your store first, talk to Coriolis.",
  "FFL Firewall helps you protect your store and catch restricted items at checkout. You're still responsible for what you ship, and this is not legal advice.",
  "support@coriolisagency.com",
];
for (const s of copyStrings) assert.ok(page.includes(s), `Brandy v3 copy missing: ${s}`);
// FFLFW-TERMS-DEFAULT-SHARE-LANDING: the feed is default-on for new installs only; the old opt-in line is gone.
assert.doesNotMatch(page, /off by default|separate opt-in|datacenter IP block list/, "old feed and datacenter lines are gone");
// Locks: no vulnerability, compliance or vendor claims (Paul 11:16 AM ET, Chief 12:20 PM ET).
assert.doesNotMatch(page, /known plugin issues|vulnerab|compliant|compliance|guarantee|GunSearch|\bGSE\b|Wordfence|Patchstack|WPScan/i, "no vulnerability, compliance or vendor claims");
assert.doesNotMatch(page, /free/i, "no free (also asserted above)");
// RECON is live (Paul 12:42 PM ET): no planned / ships wording anywhere on the page.
assert.doesNotMatch(page, /reputation feed is coming later|isn't part of this version/i, "the shared feed is not described as coming later");
assert.doesNotMatch(page, /Planned|when it ships|planning|isn't built|not built/i, "RECON is presented as live");
assert.doesNotMatch(page, /class="sv plan"|cc dim/, "no planned-tag markup left");

// FFLFW-LANDING-1-0: Brandy placeholders come only from src/lib/ffl-firewall-pending-copy.mjs (checked in 6b; none may remain
// once FFLFW_V1_LIVE flips); no other PENDING marker may appear.
assert.doesNotMatch(page.replace('import { PENDING_COPY as P } from "../../lib/ffl-firewall-pending-copy.mjs";', ""), /PENDING/, "no placeholders left outside the Brandy placeholder list");
assert.ok(page.includes("You're still responsible for what you ship, and this is not legal advice."));
assert.doesNotMatch(page, /California|Colorado|Illinois|Massachusetts|New York|Washington,?\s*D\.?C/i);

// 2. OG image: Brandy's PNG (12:46 PM ET), page-only props, alt verbatim.
const ogRel = "public/og/ffl-firewall-og.png";
const ogBuf = fs.readFileSync(path.join(root, ogRel));
assert.equal(ogBuf.length, 209702, "og image size");
assert.equal(
  crypto.createHash("sha256").update(ogBuf).digest("hex"),
  "854e2f74f9f46241cb18623dc012af3df6323a251fa4d19a2a23aa796274574c",
  "og image sha256",
);
assert.equal(ogBuf.subarray(0, 4).toString("hex"), "89504e47", "png magic");
assert.equal(ogBuf.readUInt32BE(16), 1200, "og image width");
assert.equal(ogBuf.readUInt32BE(20), 630, "og image height");
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

const ogAbs = "https://www.coriolisagency.com/og/ffl-firewall-og.png";
const ogAlt =
  "FFL Firewall: OVERWATCH, ACTIVE DEFENSE and RECON in one WooCommerce plugin for FFL dealers, $79/month.";
assert.match(page, /const ogImage = "og\/ffl-firewall-og\.png";/);
assert.match(page, /ogImagePath=\{ogImage\}/);
assert.match(page, /ogImageWidth=\{1200\}/);
assert.match(page, /ogImageHeight=\{630\}/);
assert.match(page, /ogImageAlt=\{ogImageAlt\}/);
assert.ok(page.includes(ogAlt), "page ships Brandy OG alt verbatim");

// 3. Hero art + lockup.
const heroAlt =
  "Stop selling guns and ammo into states and ZIP codes where they can't ship";
const heroFiles = [
  { rel: "public/brand/ffl-firewall/hero/ffl-firewall-hero-desktop-1440x1152.webp", sha: "a679ce800e5695add5f11e1fa4ded012003ab830ae160fc24940351a4cb4da0d", w: 1440, h: 1152, magic: "52494646", kind: "webp" },
  { rel: "public/brand/ffl-firewall/hero/ffl-firewall-hero-desktop-1440x1152.jpg", sha: "5926bff3b0e77cffa36458ab6c9ff9ca60ac0e7dcc27a06dd229006e740c3d22", w: 1440, h: 1152, magic: "ffd8ff", kind: "jpeg" },
  { rel: "public/brand/ffl-firewall/hero/ffl-firewall-hero-mobile-750x1200.webp", sha: "590ae2f6a20bd849dffbca8299d2fbfb7cefdcf732549a041a1ec5f216e04d2f", w: 750, h: 1200, magic: "52494646", kind: "webp" },
  { rel: "public/brand/ffl-firewall/hero/ffl-firewall-hero-mobile-750x1200.jpg", sha: "d2d148f33bb7c180af825734094428dae146c217ea858c827ced8af41bb5b463", w: 750, h: 1200, magic: "ffd8ff", kind: "jpeg" },
];
function webpSize(buf) {
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") throw new Error("not webp");
  if (buf.toString("ascii", 12, 16) === "VP8X") return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
  if (buf.toString("ascii", 12, 16) === "VP8L") {
    const bits = buf.readUInt32LE(21);
    return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (buf.toString("ascii", 12, 16) === "VP8 ") {
    return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
  }
  throw new Error("no webp size");
}
for (const f of heroFiles) {
  const buf = fs.readFileSync(path.join(root, f.rel));
  assert.equal(crypto.createHash("sha256").update(buf).digest("hex"), f.sha, f.rel + " sha256");
  assert.equal(buf.subarray(0, f.magic.length / 2).toString("hex"), f.magic, f.rel + " magic");
  const dim = f.kind === "jpeg" ? jpegSize(buf) : webpSize(buf);
  assert.equal(dim.w, f.w, f.rel + " width");
  assert.equal(dim.h, f.h, f.rel + " height");
}
const lockupDark = fs.readFileSync(path.join(root, "public/brand/ffl-firewall/ffl-firewall-lockup-on-dark.svg"));
assert.equal(
  crypto.createHash("sha256").update(lockupDark).digest("hex"),
  "0ec20cc813d46eb74c9444c42553e87aa25dfe239890e169f813243b025e41dc",
  "lockup-on-dark sha256",
);
assert.ok(fs.existsSync(path.join(root, "public/brand/ffl-firewall/ffl-firewall-lockup-on-light.svg")));
assert.ok(fs.existsSync(path.join(root, "public/brand/ffl-firewall/icon/ffl-firewall-icon.svg")));
assert.ok(fs.existsSync(path.join(root, "public/brand/ffl-firewall/icon/ffl-firewall-icon-512.png")));
assert.ok(fs.existsSync(path.join(root, "public/brand/ffl-firewall/icon/ffl-firewall-icon-small.svg")));
assert.ok(fs.existsSync(path.join(root, "public/brand/ffl-firewall/icon/ffl-firewall-icon-32.png")));
assert.match(page, /width="278"/);
assert.match(page, /height="80"/);
assert.match(page, /withBase\("brand\/ffl-firewall\/ffl-firewall-lockup-on-dark\.svg"\)/);
assert.doesNotMatch(page, /<picture>/, "S5F: hero picture replaced by the three-service panel");

// 4. Terms page: Brandy's final terms verbatim, published, not noindex.
assert.match(terms, /path="\/ffl-firewall\/terms"/);
assert.doesNotMatch(terms, /^\s*noindex\s*$/m, "terms page must not pass noindex");
assert.ok(terms.includes("FFL Firewall terms"));
assert.ok(terms.includes("Effective the day FFL Firewall billing launches."));
assert.ok(terms.includes("Who provides FFL Firewall"));
assert.ok(terms.includes("FFL Firewall is a managed security service for FFL dealers, provided by Coriolis, LLC and delivered as a WooCommerce plugin. It includes three services: FFL Firewall · ACTIVE DEFENSE, FFL Firewall · OVERWATCH and FFL Firewall · RECON. If you have a question about these terms or about the plugin, write to Coriolis support at support@coriolisagency.com."));
assert.ok(terms.includes("a managed security service for FFL dealers, provided by Coriolis, LLC and delivered as a WooCommerce plugin. It includes three services:"), "terms carry the locked positioning");
for (const n of ["ACTIVE DEFENSE", "OVERWATCH", "RECON"]) assert.ok(terms.includes("FFL Firewall \u00b7 " + n), "terms name " + n);
assert.doesNotMatch(terms, /checkout plugin/i, "terms do not call it a checkout plugin");
assert.doesNotMatch(terms, /forever|compliance|compliant/i, "terms positioning has no forever/compliance");
assert.ok(terms.includes("FFL Firewall costs $79 a month, and your first month is charged the day you sign up, with no trial period."));
assert.doesNotMatch(terms, /no free trial/, "the no-trial line never says free (FFLFW-TERMS-DEFAULT-SHARE)");
assert.ok(terms.includes("These terms are governed by the laws of the State of South Carolina, and any dispute will be heard in Greenville County, South Carolina."));
assert.match(read("public/robots.txt"), /^Allow: \/ffl-firewall\/terms$/m);

// 4b. FFLF-FIREWALL-V1-S6-REPUTATION-FEED (S6E): Brandy's shared reputation feed terms lines, verbatim,
// in their own section right after "What the plugin sends to Coriolis", whose last line stays as it is.
{
  const feedParas = [
      "Stores that install FFL Firewall from now on are in the shared reputation feed by default while FFL Firewall · ACTIVE DEFENSE is switched on and their license is active; stores that already had FFL Firewall installed keep the feed setting they had, and if you never made a choice, the feed stays off until you switch it on. Either way, you can switch the feed on or off at any time. One switch covers both directions, so being in the feed means your store reports the bots its checks catch and receives a list of bots that other FFL Firewall stores have reported. The feed only works while FFL Firewall · ACTIVE DEFENSE is on, and it needs an active FFL Firewall license.",
      "While your store is in the feed, the plugin sends Coriolis, LLC signals about the bots your store catches, and nothing about your shoppers. The signals are salted hashes of the IP addresses and IPv6 networks the bots came from, the bot's user agent when a request fails the user agent check, and the type of pattern caught, such as a honeypot form field or a run of failed payments. Raw IP addresses stay on your store, because the plugin hashes them before anything is sent. Rate-limit hits stay on your store too and are never sent to the feed. Shoppers are never named or identified, and the plugin sends no names, emails, addresses, orders, cart contents or payment details.",
      "Coriolis, LLC uses feed signals only for the shared list, and your store's reports are deleted after 30 days. To leave the feed, untick &quot;Join the shared reputation feed&quot; in the Shared reputation feed section of the FFL Firewall · ACTIVE DEFENSE tab and click &quot;Save feed setting&quot;; once the feed is off, your store stops sending signals and stops using the shared list.",
      "If the feed stops a real visitor on your store, you can mark that visitor as Not a bot from the plugin. The visitor is unblocked on your store right away, and Coriolis reviews whether to take them off the network list. Coriolis decides the result of each review and doesn't commit to a particular result or a time for it."
  ];
  const sends = terms.indexOf("What the plugin sends to Coriolis</h2>");
  const head = terms.indexOf(">The shared reputation feed</h2>");
  const next = terms.indexOf("When the check can't run</h2>");
  assert.ok(sends !== -1 && head > sends && next > head, "feed section sits after What the plugin sends to Coriolis");
  assert.ok(terms.includes("It never sends the shopper's name.</p>"), "the sends section's original last line is unchanged");
  // FFLFW-TERMS-DEFAULT-SHARE: T0 sits right after it, still inside the sends section.
  const t0 = terms.indexOf("<p class=\"mt-2\">" + "When FFL Firewall · ACTIVE DEFENSE is on, the dealer embed script also sends anonymized, aggregate traffic signals to Coriolis, LLC, and the shared reputation feed section below covers what your store reports to the feed." + "</p>");
  assert.ok(t0 > sends && t0 < head && t0 > terms.indexOf("It never sends the shopper's name.</p>"), "T0 verbatim at the end of What the plugin sends to Coriolis");
  let at = head;
  for (const p of feedParas) {
    const i = terms.indexOf("<p class=\"mt-2\">" + p + "</p>", at);
    assert.ok(i > at && i < next, "feed terms paragraph verbatim and in order: " + p.slice(0, 40));
    at = i;
  }
  assert.doesNotMatch(terms.slice(head, next), /anonymi[sz]ed/i, "feed terms never say anonymized");
}

// 5. Nav: FFL Firewall sits in the FFL Plugins dropdown (CA-NAV-FFL-PLUGINS).
const navRel = "src/lib/nav.ts";
const nav = read(navRel);
assert.doesNotMatch(nav, /ffl-firewall/i, "FFL Firewall is hidden from the header nav (Paul 11:22 AM ET)");
assert.match(nav, /label:\s*"FFL Plugins",\s*children:\s*\[[\s\S]*?href:\s*"ffl-filters",\s*label:\s*"FFL Filters"/, "FFL Plugins dropdown must contain FFL Filters");
{
  assert.match(nav, /label:\s*"FFL Dropshipping",\s*children:\s*\[[\s\S]*?href:\s*"firearms-dropshipping",\s*label:\s*"FFL Dropshipping"[\s\S]*?href:\s*"ffl-cockpit",\s*label:\s*"FFL Cockpit"/, "FFL Dropshipping dropdown keeps firearms-dropshipping and includes FFL Cockpit");
  const drop = nav.indexOf('{ href: "firearms-dropshipping", label: "FFL Dropshipping" }');
  const plugins = nav.indexOf('label: "FFL Plugins"', drop);
  const ffl = nav.indexOf('{ href: "ffl-filters", label: "FFL Filters" }');
  const pos = nav.indexOf('href: "gun-store-pos"');
  assert.ok(drop !== -1 && plugins !== -1 && ffl !== -1 && pos !== -1, "header nav missing Dropshipping, FFL Plugins, FFL Filters, or POS");
  assert.ok(drop < plugins && plugins < ffl && ffl < pos, "nav order should be FFL Dropshipping, FFL Plugins dropdown, Gun Store POS");
}

// 6. Sitemap + lastmod + robots + vercel + IndexNow.
const cfg = read("astro.config.mjs");
assert.ok(cfg.includes("!/^\\/ffl-firewall\\/.+$/.test(new URL(page).pathname)"), "sitemap filter excludes /ffl-firewall/*");
assert.ok(cfg.includes("!(fflfwLandingNoindex() && /^\\/ffl-firewall\\/?$/.test(new URL(page).pathname))"), "sitemap filter excludes /ffl-firewall while noindex");
const lastmodSrc = read("scripts/gen-lastmod.mjs");
assert.ok(lastmodSrc.includes('...(fflfwLandingNoindex() ? ["/ffl-firewall"] : []),'), "lastmod skips /ffl-firewall while noindex");
assert.match(lastmodSrc, /"\/ffl-firewall\/terms",/);
assert.match(lastmodSrc, /"\/ffl-firewall\/setup",/);
if (fflfwLandingNoindex()) assert.equal(JSON.parse(read("lastmod.json"))["/ffl-firewall"], undefined, "not in lastmod.json");
assert.equal(JSON.parse(read("lastmod.json"))["/ffl-firewall/setup"], undefined, "setup guide not in lastmod.json");
// FFLFW-LANDING-1-0: the two static companions of FFLFW_V1_LIVE must agree with it.
assert.equal(/^Disallow: \/ffl-firewall$/m.test(read("public/robots.txt")), fflfwLandingNoindex(), "robots.txt Disallow: /ffl-firewall matches FFLFW_V1_LIVE");

const vercel = JSON.parse(read("vercel.json"));
const hdr = (src) => Object.fromEntries((vercel.headers.find((h) => h.source === src)?.headers ?? []).map((h) => [h.key, h.value]));
assert.equal(hdr("/ffl-firewall")["X-Robots-Tag"], fflfwLandingNoindex() ? "noindex, nofollow" : undefined, "vercel.json /ffl-firewall X-Robots-Tag matches FFLFW_V1_LIVE");

for (const u of [...(fflfwLandingNoindex() ? ["https://www.coriolisagency.com/ffl-firewall", "https://www.coriolisagency.com/ffl-firewall/"] : []), "https://www.coriolisagency.com/ffl-firewall/setup"]) {
  let code = 0;
  try {
    execFileSync(process.execPath, [path.join(root, "scripts/indexnow-submit.mjs"), u], { stdio: "pipe", env: { ...process.env, INDEXNOW_KEY: "test-key-not-used" } });
  } catch (e) {
    code = e.status;
  }
  assert.equal(code, 2, `indexnow refuses ${u}`);
}

// 6b. FFLFW-LANDING-1-0: launch switch, setup guide and Brandy placeholders.
assert.equal(FFLFW_ZIP_CURRENT, "downloads/ffl-firewall-0.1.3.zip", "current zip is 0.1.3 until the swap");
assert.equal(FFLFW_ZIP_V1, "downloads/ffl-firewall-1.0.0.zip");
assert.ok(fs.existsSync(path.join(root, "public", FFLFW_ZIP_CURRENT)), "current zip ships");
if (FFLFW_V1_LIVE) {
  const v1 = path.join(root, "public", FFLFW_ZIP_V1);
  assert.ok(fs.existsSync(v1), "FFLFW_V1_LIVE needs public/downloads/ffl-firewall-1.0.0.zip");
  assert.match(FFLFW_ZIP_V1_SHA256, /^[a-f0-9]{64}$/, "FFLFW_V1_LIVE needs FFLFW_ZIP_V1_SHA256");
  assert.equal(crypto.createHash("sha256").update(fs.readFileSync(v1)).digest("hex"), FFLFW_ZIP_V1_SHA256, "1.0.0 zip sha256");
  assert.equal(Object.keys(PENDING_COPY).length, 0, "no placeholders may remain at launch");
}
const setupRel = "src/pages/ffl-firewall/setup.astro";
const setupSrc = read(setupRel);
assert.match(setupSrc, /^\s*noindex\s*$/m, "setup guide is noindex");
assert.match(setupSrc, /path="\/ffl-firewall\/setup"/);
assert.doesNotMatch(setupSrc, banned, `${setupRel} has a banned word`);
assert.match(page, /<a href=\{setup\} class="lnk" data-setup-link>/, "landing links the setup guide");
// Every placeholder used is defined, every one defined is used, and each is listed for Brandy in the doc.
const used = new Set([...(page + setupSrc).matchAll(/P\.([A-Z0-9_]+)/g)].map((m) => m[1]));
const defined = Object.keys(PENDING_COPY);
for (const k of used) assert.ok(defined.includes(k), `placeholder ${k} is not defined`);
for (const k of defined) {
  assert.ok(used.has(k), `placeholder ${k} is defined but unused`);
  assert.equal(PENDING_COPY[k], `[[${k}]]`, `placeholder ${k} renders as its name`);
}
const doc = read("docs/ffl-firewall-landing-1-0.md");
for (const k of defined) assert.ok(doc.includes("`" + k + "`"), `docs/ffl-firewall-landing-1-0.md lists ${k}`);
// Facts the 1.0.0 copy must not get ahead of: no SEO-crawler exemption or past-due grace before FFLFW-CRAWLER-GRACE merges.
for (const [rel, src] of [[pageRel, page], [setupRel, setupSrc]]) {
  assert.doesNotMatch(src, /SEO crawler|Ahrefs|Semrush|7-day|seven-day|grace period|GunSearch|\bGSE\b/i, `${rel} gets ahead of what shipped`);
}
if (defined.length) console.log(`test-ffl-firewall-landing: ${defined.length} Brandy placeholders remain (not launch-ready)`);

// FFLFW-LANDING-1-0: Brandy's FINAL strings (Karp-cleared 11:58 AM ET Nov 23, 2026), verbatim. Service names on
// /ffl-firewall render through FflFwName (nbsp in the built page; compared with spaces).
const FINAL_LANDING = {
  "FFLFW_L10_AD_SERVICE_ON": "When you switch it on, the plugin connects the site key made when you bought FFL Firewall and adds the dealer embed script for you, and from then on it stays on and keeps watching the traffic coming into your store.",
  "FFLFW_L10_ACTIVATION_INTRO": "The service is opt-in, so installing the plugin doesn't switch it on. Your site key is made when you buy FFL Firewall; the first time you switch FFL Firewall · ACTIVE DEFENSE on, the plugin connects that key to your store and takes care of the dealer embed script, and the service stays on and keeps watching from there.",
  "FFLFW_L10_STEP2_TITLE": "Tick the data disclosure and save",
  "FFLFW_L10_STEP2_BODY": "On the FFL Firewall · ACTIVE DEFENSE tab, tick the data disclosure and click save; with an active license, the plugin picks up the site key made at checkout and connects it to your store, so there's nothing to copy. If you already have a site key, you can still paste it into the Site key field, and a pasted key is the one the plugin uses.",
  "FFLFW_L10_FAQ_AD_OFF_LEAD": "It only starts once you switch it on and tick the data disclosure, so you choose when bot and scraper control begins.",
  "FFLFW_L10_SETUP_LINK": "Read the setup guide"
};
const FINAL_SETUP = {
  "FFLFW_SETUP_META_TITLE": "FFL Firewall setup guide | Coriolis Agency",
  "FFLFW_SETUP_META_DESCRIPTION": "How to install FFL Firewall on a WooCommerce gun store, add your license and switch on each of its three services, step by step.",
  "FFLFW_SETUP_EYEBROW": "FFL Firewall 1.0.0",
  "FFLFW_SETUP_H1": "Set up FFL Firewall on your WooCommerce store",
  "FFLFW_SETUP_INTRO": "This guide is for FFL dealers who sell on WooCommerce. Setup is six short steps in your WordPress dashboard: install the plugin, add your license, then switch on each service and choose your settings.",
  "FFLFW_SETUP_S1_TITLE": "Install the plugin",
  "FFLFW_SETUP_S1_BODY": "Download the FFL Firewall zip from the FFL Firewall page, then in WordPress go to Plugins > Add New > Upload Plugin, choose the zip, install it and click Activate. Until you add a license the plugin doesn't check real carts, but the built-in demo lets you run 10 test checks on a UPC and zip so you can see how it works.",
  "FFLFW_SETUP_S2_TITLE": "Add your license",
  "FFLFW_SETUP_S2_BODY": "FFL Firewall is $79 a month, with unlimited FFL Firewall · OVERWATCH transactions and every service included. After you buy, your license key arrives by email; in WordPress, go to WooCommerce > FFL Firewall, open the License tab, paste the key and click Check key.",
  "FFLFW_SETUP_S3_TITLE": "Switch on FFL Firewall · OVERWATCH",
  "FFLFW_SETUP_S3_BODY": "On the FFL Firewall · OVERWATCH tab, switch the check on and choose your roster setting, which starts as allow and flag. From then on every order is checked at checkout, on both the classic checkout and the WooCommerce Blocks checkout, and the results show up in the cart and on the order.",
  "FFLFW_SETUP_S4_TITLE": "Switch on FFL Firewall · ACTIVE DEFENSE",
  "FFLFW_SETUP_S4_BODY": "On the FFL Firewall · ACTIVE DEFENSE tab, switch it on, tick the data disclosure and click save. With an active license, the plugin connects the site key made when you bought FFL Firewall to this store and adds the dealer embed script, so you don't have to copy anything (a site key you paste in yourself still works and takes priority). Click Check for script to confirm it's on your pages; the dashboard shows the service as active once the dealer embed script has been seen in the last 24 hours.",
  "FFLFW_SETUP_S5_TITLE": "Choose your shared reputation feed setting",
  "FFLFW_SETUP_S5_BODY": "The shared reputation feed lets FFL Firewall stores warn each other about bots: your store reports the bots it catches as salted hashes, never shopper details, and gets back a list of bots other stores have reported. On a new install it's on by default while FFL Firewall · ACTIVE DEFENSE is on and the license is active. A store that already had FFL Firewall keeps its saved choice, and if it never made one, the feed stays off until you switch it on. You can switch it on or off any time in the Shared reputation feed section.",
  "FFLFW_SETUP_S6_TITLE": "Run FFL Firewall · RECON",
  "FFLFW_SETUP_S6_BODY": "FFL Firewall · RECON scans your site every week, and you can click Run scan whenever you want a fresh one. It lists WordPress, plugin and theme updates that are waiting, read from WordPress's own update data, along with setup gaps such as missing https or debug output left on. It only reports what it finds and changes nothing on your site.",
  "FFLFW_SETUP_UPDATES_TITLE": "Keep it up to date",
  "FFLFW_SETUP_UPDATES_BODY": "New FFL Firewall versions show up on the WordPress Plugins screen like any other plugin update, so you can update with one click.",
  "FFLFW_SETUP_HELP_TITLE": "Help with setup",
  "FFLFW_SETUP_HELP_BODY": "If a step doesn't look the way this guide describes, or you'd like us to walk through setup with you, email support@coriolisagency.com and a person on our team will get back to you.",
  "FFLFW_SETUP_BACK_LINK": "Back to FFL Firewall"
};
assert.equal(Object.keys(FINAL_LANDING).length + Object.keys(FINAL_SETUP).length, 28, "all 28 cleared strings are tracked");
assert.equal(defined.length, 0, "no Brandy placeholders remain");
for (const [k, v] of Object.entries(FINAL_SETUP)) assert.ok(setupSrc.includes(JSON.stringify(v)) || setupSrc.includes(v), `setup guide ships ${k} verbatim`);
assert.match(FINAL_SETUP.FFLFW_SETUP_S3_BODY, /which starts as allow and flag/, "S3 keeps the roster default (Defaults.php: roster_rule => ROSTER_FLAG)");
assert.match(FINAL_SETUP.FFLFW_SETUP_S6_BODY, /every week/, "S6 keeps the weekly scan (Recon/Module.php: wp_schedule_event weekly)");

// 7. package.json test:ci includes this script.
assert.match(read("package.json"), /scripts\/test-ffl-firewall-landing\.mjs/);

// 8. Built output, when present.
const dist = path.join(root, "dist");
if (fs.existsSync(dist)) {
  const maps = fs.readdirSync(dist).filter((f) => /^sitemap-\d+\.xml$/.test(f));
  assert.ok(maps.length > 0, "built sitemap present");
  for (const m of maps) {
    const xml = fs.readFileSync(path.join(dist, m), "utf8");
    if (fflfwLandingNoindex()) assert.doesNotMatch(xml, /\/ffl-firewall</, `${m} lists /ffl-firewall`);
    assert.doesNotMatch(xml, /\/ffl-firewall\/setup</, `${m} lists /ffl-firewall/setup`);
  }
  // FFLFW-LANDING-1-0: setup guide built, noindex, no vendor names.
  const setupHtml = fs.readFileSync(path.join(dist, "ffl-firewall", "setup", "index.html"), "utf8");
  assert.match(setupHtml, /<meta name="robots" content="noindex, nofollow"/);
  const setupBody = setupHtml.slice(setupHtml.indexOf("data-fflfw-setup"), setupHtml.indexOf("</article>", setupHtml.indexOf("data-fflfw-setup")));
  assert.ok(setupBody.length > 0, "setup guide body found");
  assert.doesNotMatch(setupBody, /GunSearch|\bGSE\b|Orchid|eState/i, "setup guide body names no vendor (site chrome excluded)");
  assert.equal((fs.readFileSync(path.join(dist, "ffl-firewall", "index.html"), "utf8").match(/data-setup-link/g) ?? []).length, 1, "landing links the setup guide once");
  const html = fs.readFileSync(path.join(dist, "ffl-firewall", "index.html"), "utf8");
  if (fflfwLandingNoindex()) assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  else assert.doesNotMatch(html, /<meta name="robots"/);
  assert.match(html, /<title>FFL Firewall: state shipping checks and managed security for WooCommerce FFL dealers \| Coriolis<\/title>/);
  // Download gate (FFL Filters component, reworded) mounted once, hidden until a download button opens it.
  assert.equal((html.match(/<div[^>]*\sdata-fflf-dl-gate[\s>=]/g) ?? []).length, 1);
  assert.equal((html.match(/data-download="(hero|pricing|footer)"/g) ?? []).length, 3);
  assert.ok(html.includes(`data-file="/${fflfwZip()}"`), "gate serves the zip FFLFW_V1_LIVE picks");
  assert.doesNotMatch(html, /data-fflfw-ea-gate/);
  assert.doesNotMatch(html, /data-early-access/);
  assert.doesNotMatch(html, /free/i, "no free anywhere on the built /ffl-firewall page");
  assert.doesNotMatch(html, /github\.com\/CoriolisAgency\/ffl-firewall/);
  // The zip ships with the site, byte for byte (sha256 of ffl-firewall 0.1.3).
  const fwZip = fs.readFileSync(path.join(dist, "downloads", "ffl-firewall-0.1.3.zip"));
  assert.equal(crypto.createHash("sha256").update(fwZip).digest("hex"), "2bbd483906a76b660fe47ef1dc10712ddb8198b9cf926b59c6701c42a9641358", "ffl-firewall-0.1.3.zip sha256");
  assert.equal((html.match(/data-buy="pricing"/g) ?? []).length, 0, "no Buy a license button on the built pricing card");
  const builtPricing = html.slice(html.indexOf('data-section="pricing"'), html.indexOf('data-section="faq"'));
  assert.doesNotMatch(builtPricing, /Buy a license/, "built pricing card has no Buy a license");
  assert.doesNotMatch(html, /Planned|when it ships/, "built page has no Planned / when it ships");
  assert.match(html, /weekly and on-demand reports/);
  assert.match(html, /Shipping checks first, with a security layer and a bonus report behind them/);
  // CA-POPUP-FFL-FILTERS: after PLATES-INLINE (#225) the only "FFL Firewall · NAME" on the built page was the Firewall pop-up,
  // which is now unmounted (the FFL Filters pop-up is the active one and is suppressed here). Any that remain must use nbsp (next line).
  assert.match(html, /ACTIVE DEFENSE/, "built page still names ACTIVE DEFENSE");
  assert.doesNotMatch(html, /FFL Firewall · (ACTIVE DEFENSE|OVERWATCH|RECON)/, "no plain-space service name on the built page");
  assert.match(html, /https:\/\/checkout\.coriolisagency\.com\/b\/6oU7sM3obb7c5phf2o1440s/);
  assert.match(html, />Buy a license</);
  assert.match(html, />Get FFL Firewall</);
  const mainStart = html.indexOf('class="fwl');
  const mainEnd = html.indexOf("data-fflf-dl-gate", mainStart);
  assert.ok(mainStart !== -1 && mainEnd > mainStart, "landing body found");
  const text = html.slice(mainStart, mainEnd).replace(/<(script|style)[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&#39;|&#x27;/g, "'").replace(/\s+/g, " ");
  for (const n of ["ACTIVE DEFENSE", "OVERWATCH", "RECON"]) assert.ok(text.includes(`FFL Firewall · ${n}`), `built page names FFL Firewall · ${n}`);
  for (const [k, v] of Object.entries(FINAL_LANDING)) assert.ok(text.includes(v), `built /ffl-firewall ships ${k} verbatim`);
  const setupText = setupBody.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&#39;|&#x27;/g, "'").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/\s+/g, " ");
  for (const [k, v] of Object.entries(FINAL_SETUP)) {
    if (k === "FFLFW_SETUP_META_TITLE") assert.ok(setupHtml.includes(`<title>${v.replace(/&/g, "&amp;")}</title>`), "setup title verbatim");
    else if (k === "FFLFW_SETUP_META_DESCRIPTION") assert.ok(setupHtml.includes(`<meta name="description" content="${v}">`), "setup description verbatim");
    else assert.ok(setupText.includes(v), `built setup guide ships ${k} verbatim`);
  }
  assert.doesNotMatch(text, /known plugin issues|vulnerab|compliant|compliance|guarantee|GunSearch|\bGSE\b/i, "no vulnerability, compliance or vendor claims on the built page");
  assert.match(html, /Read the FFL Firewall terms/);
  const termsHtml = fs.readFileSync(path.join(dist, "ffl-firewall", "terms", "index.html"), "utf8");
  assert.doesNotMatch(termsHtml, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(termsHtml, /<title>FFL Firewall terms \| Coriolis, LLC<\/title>/);
  assert.match(termsHtml, /Effective the day FFL Firewall billing launches/);
  const ogAbsRe = ogAbs.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const ogAltEsc = ogAlt.replaceAll('"', "&quot;").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  assert.match(html, new RegExp(`<meta property="og:image" content="${ogAbsRe}"`));
  assert.match(html, /<meta property="og:image:width" content="1200"/);
  assert.match(html, /<meta property="og:image:height" content="630"/);
  assert.match(html, new RegExp(`<meta property="og:image:alt" content="${ogAltEsc}"`));
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"/);
  assert.match(html, new RegExp(`<meta name="twitter:image" content="${ogAbsRe}"`));
  const distOg = fs.readFileSync(path.join(dist, "og", "ffl-firewall-og.png"));
  assert.equal(
    crypto.createHash("sha256").update(distOg).digest("hex"),
    "854e2f74f9f46241cb18623dc012af3df6323a251fa4d19a2a23aa796274574c",
    "dist og image sha256",
  );
  assert.doesNotMatch(html, /<picture>/);
  for (const f of heroFiles) {
    const distHeroBuf = fs.readFileSync(path.join(dist, f.rel.replace(/^public\//, "")));
    assert.equal(crypto.createHash("sha256").update(distHeroBuf).digest("hex"), f.sha, "dist " + f.rel + " sha256");
  }
  const fwHref = /<a\b[^>]*href="\/ffl-firewall\/?"[^>]*>FFL Firewall<\/a>/;
  const fflHref = /<a\b[^>]*>FFL Filters<\/a>/;
  const pluginsHref = /<a\b[^>]*>FFL Plugins<\/a>/;
  const cockpitHref = /<a\b[^>]*>FFL Cockpit<\/a>/;
  const chromeOf = (built) => {
    const header = built.match(/<header\b[\s\S]*?<\/header>/)?.[0] ?? "";
    const drawerAt = built.indexOf('id="nav-drawer"');
    const scriptAt = drawerAt === -1 ? -1 : built.indexOf("<script>", drawerAt);
    const drawer =
      drawerAt === -1
        ? ""
        : built.slice(built.lastIndexOf("<div", drawerAt), scriptAt === -1 ? built.length : scriptAt);
    return { header, drawer };
  };
  const assertHeaderNav = (built, rel) => {
    const { header, drawer } = chromeOf(built);
    assert.ok(header, `${rel} missing <header>`);
    assert.ok(drawer.includes('id="nav-drawer"'), `${rel} missing nav-drawer`);
    assert.doesNotMatch(header, fwHref, `${rel} desktop header must not link FFL Firewall`);
    assert.doesNotMatch(drawer, fwHref, `${rel} mobile nav must not link FFL Firewall`);
    assert.match(header, pluginsHref, `${rel} desktop header missing FFL Plugins link`);
    assert.match(drawer, pluginsHref, `${rel} mobile nav missing FFL Plugins link`);
    const orderIn = (chunk, where) => {
      const drop = chunk.search(/<a\b[^>]*>FFL Dropshipping<\/a>/);
      const after = chunk.slice(drop);
      const cockpit = after.search(cockpitHref);
      const plugins = after.search(pluginsHref);
      const filters = after.search(fflHref);
      const pos = chunk.search(/<a\b[^>]*>Gun Store POS<\/a>/);
      assert.ok(drop !== -1 && cockpit !== -1 && plugins !== -1 && filters !== -1 && pos !== -1, `${rel} ${where} missing Dropshipping, FFL Cockpit, FFL Plugins, FFL Filters, or POS`);
      assert.ok(cockpit < plugins && plugins < filters && drop + filters < pos, `${rel} ${where} FFL Plugins dropdown is not between FFL Dropshipping and Gun Store POS`);
    };
    orderIn(header, "desktop header");
    orderIn(drawer, "mobile nav");
  };
  assertHeaderNav(html, "ffl-firewall/index.html");
  const home = path.join(dist, "index.html");
  if (fs.existsSync(home)) assertHeaderNav(fs.readFileSync(home, "utf8"), "index.html");
  console.log("test-ffl-firewall-landing: dist checks ok");
}
console.log("test-ffl-firewall-landing: ok");
