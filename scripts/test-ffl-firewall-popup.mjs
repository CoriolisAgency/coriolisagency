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

const expected = {
  eyebrow: "New from Coriolis",
  title: "Stop selling guns and ammo into states and ZIP codes where they can't ship",
  cta: "See FFL Firewall",
  later: "Not now",
  close: "Close",
  fine: "For FFL dealers running WooCommerce.",
  body: "FFL Firewall checks every item in a WooCommerce cart by UPC against the shopper's ZIP code, and takes out anything restricted there before the order goes through.",
};
for (const [k, v] of Object.entries(expected)) assert.equal(lib.FFW_POPUP_COPY[k], v, `copy ${k}`);

const all = [...Object.values(lib.FFW_POPUP_COPY), ...read("src/components/FflFirewallPopup.astro").match(/>[^<>{}]*[A-Za-z][^<>{}]*</g) ?? []];
for (const s of all) assert.doesNotMatch(s, /free/i, `no "free" in: ${s}`);
for (const f of ["src/lib/ffl-firewall-popup.ts", "src/components/FflFirewallPopup.astro", "public/popup/ffl-firewall-popup.js"]) {
  assert.doesNotMatch(read(f), /free/i, `${f} has no "free"`);
  assert.doesNotMatch(read(f), /gtag|dataLayer|fetch\(|sendBeacon|XMLHttpRequest|\banalytics\b/i, `${f} has no tracking`);
}

// Page rule: ONLY /ffl-firewall (and its slash form)
for (const p of ["/ffl-firewall", "/ffl-firewall/"]) assert.equal(lib.ffwPopupAllowed(p), true, p);
for (const p of ["/", "/ecommerce", "/pos", "/contact", "/ffl-firewall/terms", "/ffl-firewall/terms/", "/ffl-firewalls-x", "/blog/ffl-firewall"]) assert.equal(lib.ffwPopupAllowed(p), false, p);

// Script uses the key, and the CTA link is the locked target
const js = read("public/popup/ffl-firewall-popup.js");
assert.match(js, /cfg\.dismissKey/);
assert.match(js, /setItem\(cfg\.dismissKey/);
assert.match(js, /data-ffw-cta\]"\)\) \{ e\.preventDefault\(\); dismiss\(\)/, "CTA closes the pop-up");
assert.match(read("src/components/FflFirewallPopup.astro"), /withBase\("ffl-firewall"\)/);

// No stacking: rendered only when the claim pop-up is not mounted
const layout = read("src/layouts/BaseLayout.astro");
assert.match(layout, /emailCapture && !POPUPS_ENABLED \? <FflFirewallPopup \/> : null/);

// Built output: mounted on /ffl-firewall only, on no other built page
const dist = path.join(root, "dist");
if (fs.existsSync(path.join(dist, "ffl-firewall/index.html"))) {
  const fw = fs.readFileSync(path.join(dist, "ffl-firewall/index.html"), "utf8");
  assert.match(fw, /id="ffw-popup-root"/);
  assert.match(fw, /class="ffw-go" href="\/ffl-firewall"/);
  assert.match(fw, /popup\/ffl-firewall-popup\.js/);
  assert.ok(fs.existsSync(path.join(dist, "brand/ffl-firewall/popup/ffl-firewall-us-map-hero.webp")));
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  for (const f of walk(dist).filter((x) => x.endsWith(".html"))) {
    const rel = path.relative(dist, f).replace(/\\/g, "/");
    if (rel === "ffl-firewall/index.html") continue;
    assert.doesNotMatch(fs.readFileSync(f, "utf8"), /ffw-popup-root/, `${rel} must not have the pop-up`);
  }
}
// The nav carries no FFL Firewall link
assert.doesNotMatch(read("src/lib/nav.ts"), /ffl-firewall/i, "no FFL Firewall link in the nav");
console.log("test-ffl-firewall-popup: ok");
