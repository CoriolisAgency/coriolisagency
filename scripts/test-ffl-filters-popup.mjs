#!/usr/bin/env node
/**
 * CA-POPUP-FFL-FILTERS guard: the site-wide FFL Filters pop-up. Checks the copy against
 * Brandy's ffl-filters/popup-v1 COPY.md, the CTA target (same tab), the storage keys, the
 * deny list (/ffl-filters and /ffl-firewall plus subpaths), no tracking, that BaseLayout
 * mounts it in place of the Firewall pop-up, and (if dist/ exists) the built pages.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const lib = await import("../src/lib/ffl-filters-popup.ts");
const comp = read("src/components/FflFiltersPopup.astro");
const js = read("public/popup/ffl-filters-popup.js");

// Copy: verbatim from COPY.md (Brandy owns it)
const expected = {
  eyebrow: "Free plugin from Coriolis",
  title: "FFL Filters: help shoppers find the 9mm Glock without scrolling your whole catalog",
  body: "If your store lists 9mm, 9x19 and 9mm Luger as three separate checkboxes, FFL Filters shows them as one Caliber choice, so a shopper checks one box and sees every gun in that chambering. It also filters by brand, barrel length, capacity and cost per round, and on a phone the panel opens as a drawer.",
  body2: "It's free for any FFL running WooCommerce, on any theme.",
  sheetBody: "FFL Filters shows 9mm, 9x19 and 9mm Luger as one Caliber choice, so a shopper checks one box and sees every gun in that chambering.",
  cta: "See FFL Filters",
  later: "Not now",
  close: "Close",
  fine: "Needs WordPress 6.5 or newer and WooCommerce 9.2 or newer.",
};
assert.deepEqual({ ...lib.FFF_POPUP_COPY }, expected, "copy matches COPY.md");

// CTA: /ffl-filters, same tab, and the click is not cancelled
assert.equal(lib.FFF_POPUP_HREF, "/ffl-filters");
assert.match(comp, /const href = withBase\("ffl-filters"\)/);
assert.equal((comp.match(/class="fff-go" href=\{href\} data-fff-cta>/g) ?? []).length, 2, "both CTAs link to /ffl-filters");
assert.doesNotMatch(comp, /target=/, "CTA opens in the same tab");
assert.match(js, /data-fff-cta\]"\)\) \{ if \(ls\) \{ try \{ ls\.setItem\(cfg\.clickedKey, "1"\); \} catch \(err\) \{\} \} return; \}/, "CTA sets the clicked key and lets the link navigate");
assert.doesNotMatch(js, /data-fff-cta\]"\)\) \{ e\.preventDefault/, "CTA is not cancelled");

// Storage keys: its own fff_popup_* keys, 14 days
assert.equal(lib.FFF_POPUP_DISMISS_KEY, "fff_popup_dismissed_until");
assert.equal(lib.FFF_POPUP_CLICKED_KEY, "fff_popup_clicked");
assert.equal(lib.FFF_POPUP_SESSION_KEY, "fff_popup_session");
assert.equal(lib.FFF_POPUP_DISMISS_DAYS, 14);
assert.match(js, /setItem\(cfg\.dismissKey, String\(Date\.now\(\) \+ cfg\.days \* DAY\)\)/);
assert.doesNotMatch(js + comp, /ffw_popup|ffw-popup|data-ffw/, "no Firewall keys or ids");

// Suppression: /ffl-filters and /ffl-firewall and all their subpaths; everywhere else shows
for (const p of ["/ffl-filters", "/ffl-filters/", "/FFL-Filters", "/ffl-filters/x", "/ffl-filters/a/b/", "/ffl-firewall", "/ffl-firewall/", "/ffl-firewall/terms", "/ffl-firewall/terms/", "/FFL-Firewall/Terms"]) assert.equal(lib.fffPopupAllowed(p), false, p);
for (const p of ["/", "/press", "/pricing", "/ecommerce", "/contact", "/blog/ffl-filters", "/ffl-filtersx", "/ffl-firewalls-x"]) assert.equal(lib.fffPopupAllowed(p), true, p);
assert.deepEqual([...lib.FFF_POPUP_DENY_PATHS], ["/ffl-filters", "/ffl-firewall"]);
assert.match(js, /path === cfg\.deny\[i\] \|\| path\.indexOf\(cfg\.deny\[i\] \+ "\/"\) === 0\) return;/, "JS re-checks the deny list");

// Accessibility and motion, same as the Firewall pop-up
assert.match(comp, /role="dialog"\s+aria-modal="true"\s+aria-labelledby="fff-modal-t"/);
assert.match(comp, /role="dialog"\s+aria-modal="false"\s+aria-labelledby="fff-sheet-t"/);
assert.match(comp, /class="fff-lock" alt="FFL Filters" height="48"/);
assert.match(comp, /\.fff-lock\{display:block;height:48px;width:auto;margin:0 0 6px -6px\}/);
assert.match(comp, /class="fff-ico" alt=""/);
assert.match(comp, /prefers-reduced-motion:reduce/);
assert.match(js, /e\.key === "Escape"/);
assert.match(js, /e\.key !== "Tab" \|\| mode !== "modal"/, "focus trap on the modal");
for (const f of ["src/lib/ffl-filters-popup.ts", "src/components/FflFiltersPopup.astro", "public/popup/ffl-filters-popup.js"]) {
  assert.doesNotMatch(read(f), /gtag|dataLayer|fetch\(|sendBeacon|XMLHttpRequest|\banalytics\b/i, `${f} has no tracking`);
}
for (const a of ["ffl-filters-popup-hero-modal-1168x632.webp", "ffl-filters-popup-hero-modal-1168x632.jpg", "ffl-filters-popup-hero-sheet-1086x324.webp", "ffl-filters-popup-hero-sheet-1086x324.jpg", "ffl-filters-lockup-on-light.svg", "ffl-filters-icon-small.svg"]) {
  assert.ok(fs.existsSync(path.join(root, "public/brand/ffl-filters/popup", a)), a);
}

// BaseLayout mounts the Filters pop-up in the Firewall's slot (same no-stacking condition)
const layout = read("src/layouts/BaseLayout.astro");
assert.match(layout, /import FflFiltersPopup from "\.\.\/components\/FflFiltersPopup\.astro";/);
assert.match(layout, /emailCapture && !POPUPS_ENABLED \? <FflFiltersPopup \/> : null/);
assert.doesNotMatch(layout, /<FflFirewallPopup/);
assert.ok(fs.existsSync(path.join(root, "src/components/FflFirewallPopup.astro")), "Firewall pop-up file kept (unused)");

// Built output
const dist = path.join(root, "dist");
if (fs.existsSync(path.join(dist, "index.html"))) {
  const home = fs.readFileSync(path.join(dist, "index.html"), "utf8");
  assert.match(home, /id="fff-popup-root"/, "home has the pop-up");
  assert.match(home, /class="fff-go" href="\/ffl-filters"/);
  assert.match(home, /popup\/ffl-filters-popup\.js/);
  assert.doesNotMatch(home, /ffw-popup-root/);
  for (const inner of ["press/index.html", "pricing/index.html"]) {
    const f = path.join(dist, inner);
    if (fs.existsSync(f)) assert.match(fs.readFileSync(f, "utf8"), /id="fff-popup-root"/, `${inner} has the pop-up`);
  }
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  let denied = 0;
  for (const f of walk(dist).filter((x) => x.endsWith(".html"))) {
    const rel = path.relative(dist, f).replace(/\\/g, "/");
    if (/^ffl-(filters|firewall)(\/|$)/.test(rel)) {
      denied++;
      assert.doesNotMatch(fs.readFileSync(f, "utf8"), /fff-popup-root/, `${rel} must not have the pop-up`);
    }
  }
  assert.ok(denied >= 2, "built /ffl-filters and /ffl-firewall pages checked");
  for (const a of ["ffl-filters-popup-hero-modal-1168x632.webp", "ffl-filters-icon-small.svg"]) assert.ok(fs.existsSync(path.join(dist, "brand/ffl-filters/popup", a)), `dist ${a}`);
}
console.log("test-ffl-filters-popup: ok");
