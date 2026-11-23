#!/usr/bin/env node
/**
 * CA-FFLF-POPUP guard: the site-wide FFL Firewall pop-up. Checks the copy against
 * Brandy's popup-v2 strings, no "free", the link target, the dismissal key, no
 * tracking, path suppression, no stacking with the older claim pop-up, and (if
 * dist/ exists) the built pages.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const lib = await import("../src/lib/ffl-firewall-popup.ts");

assert.equal(lib.FFW_POPUP_HREF, "/ffl-firewall");
assert.equal(lib.FFW_POPUP_DISMISS_KEY, "ffw_popup_dismissed_until");
assert.equal(lib.FFW_POPUP_DISMISS_DAYS, 14);

const nb = (s) => s.replace(/FFL Firewall · (ACTIVE DEFENSE|OVERWATCH|RECON)/g, (m) => m.replace(/ /g, "\u00A0"));
const expected = {
  eyebrow: "New from Coriolis",
  title: "FFL Firewall: shipping checks and security for FFL dealers",
  cta: "See FFL Firewall",
  later: "Not now",
  close: "Close",
  fine: "For FFL dealers running WooCommerce.",
  body: nb("FFL Firewall · OVERWATCH helps you catch items at checkout that can't ship to the buyer's ZIP. FFL Firewall · ACTIVE DEFENSE keeps watching for bots, and FFL Firewall · RECON reports come as a bonus."),
};
for (const [k, v] of Object.entries(expected)) assert.equal(lib.FFW_POPUP_COPY[k], v, `copy ${k}`);
assert.equal(lib.FFW_POPUP_COPY.price, nb("A flat $79 a month covers every service, unlimited FFL Firewall · OVERWATCH transactions and future features. You can download it and try the demo before you buy a license."), "copy price");
// FFLF-FIREWALL-V1-OVERWATCH-LEAD: every service name uses non-breaking spaces, never a plain-space form.
for (const v of Object.values(lib.FFW_POPUP_COPY)) assert.doesNotMatch(v, /FFL Firewall · |FFL Firewall\u00A0· |· (ACTIVE DEFENSE|OVERWATCH|RECON)/, `plain-space service name in: ${v}`);
assert.equal((lib.FFW_POPUP_COPY.body.match(/FFL\u00A0Firewall\u00A0·\u00A0(OVERWATCH|ACTIVE\u00A0DEFENSE|RECON)/g) ?? []).length, 3, "body names three services with nbsp");
// FFLF-FIREWALL-V1-POPUP-COPY: none of the old cart-check wording remains.
for (const f of ["src/lib/ffl-firewall-popup.ts", "src/components/FflFirewallPopup.astro", "public/popup/ffl-firewall-popup.js"]) {
  assert.doesNotMatch(read(f), /by UPC|ZIP code|cart by|Stop selling guns|built-in demo|takes out anything restricted/i, `${f} has old cart-check wording`);
}
for (const v of Object.values(lib.FFW_POPUP_COPY)) assert.doesNotMatch(v, /\bUPC\b|\bcart\b/i, `no cart-check wording in: ${v}`);

const all = [...Object.values(lib.FFW_POPUP_COPY), ...read("src/components/FflFirewallPopup.astro").match(/>[^<>{}]*[A-Za-z][^<>{}]*</g) ?? []];
for (const s of all) assert.doesNotMatch(s, /free/i, `no "free" in: ${s}`);
for (const f of ["src/lib/ffl-firewall-popup.ts", "src/components/FflFirewallPopup.astro", "public/popup/ffl-firewall-popup.js"]) {
  assert.doesNotMatch(read(f), /free/i, `${f} has no "free"`);
  assert.doesNotMatch(read(f), /gtag|dataLayer|fetch\(|sendBeacon|XMLHttpRequest|\banalytics\b/i, `${f} has no tracking`);
}

// OVERWATCH-LEAD: the v3 body keeps each service name on one line, so the phone sheet tightens its body tracking to stay at the same height (4 body lines, 351 px at 390x844).
assert.match(read("src/components/FflFirewallPopup.astro"), /\.ffw-sheet \.ffw-p\{font-size:14px;margin-top:8px;letter-spacing:-\.02em\}/, "phone sheet body tracking keeps the sheet height");

// Page rule: ONLY /ffl-firewall (and its slash form)
for (const p of ["/ffl-firewall", "/ffl-firewall/"]) assert.equal(lib.ffwPopupAllowed(p), true, p);
for (const p of ["/", "/ecommerce", "/pos", "/contact", "/ffl-firewall/terms", "/ffl-firewall/terms/", "/ffl-firewalls-x", "/blog/ffl-firewall"]) assert.equal(lib.ffwPopupAllowed(p), false, p);

// Script uses the key, and the CTA link is the locked target
const js = read("public/popup/ffl-firewall-popup.js");
assert.match(js, /cfg\.dismissKey/);
assert.match(js, /setItem\(cfg\.dismissKey/);
assert.match(js, /data-ffw-cta\]"\)\) \{ e\.preventDefault\(\); dismiss\(\)/, "CTA closes the pop-up");
assert.match(read("src/components/FflFirewallPopup.astro"), /withBase\("ffl-firewall"\)/);

// CA-POPUP-FFL-FILTERS (Paul 10:08 AM ET Nov 21): the FFL Filters pop-up is now the active one.
// The Firewall pop-up files stay in the repo, unmounted.
const layout = read("src/layouts/BaseLayout.astro");
assert.doesNotMatch(layout, /<FflFirewallPopup/, "Firewall pop-up is no longer mounted");
assert.match(layout, /emailCapture && !POPUPS_ENABLED \? <FflFiltersPopup \/> : null/);

// Built output: no built page carries the Firewall pop-up any more
const dist = path.join(root, "dist");
if (fs.existsSync(path.join(dist, "index.html"))) {
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  for (const f of walk(dist).filter((x) => x.endsWith(".html"))) {
    const rel = path.relative(dist, f).replace(/\\/g, "/");
    assert.doesNotMatch(fs.readFileSync(f, "utf8"), /ffw-popup-root/, `${rel} must not have the Firewall pop-up`);
  }
}
// The nav carries no FFL Firewall link
assert.doesNotMatch(read("src/lib/nav.ts"), /ffl-firewall/i, "no FFL Firewall link in the nav");
console.log("test-ffl-firewall-popup: ok");
