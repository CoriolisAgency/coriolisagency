// POPUP-PARK: the agency claim pop-up is parked (code kept, not mounted).
// Decision POPUP-PARK, Paul 2026-11-04 5:21/5:23 PM ET via Chief.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

const { POPUPS_ENABLED } = await import("../src/lib/popup-config.ts");
assert.equal(POPUPS_ENABLED, false, "POPUPS_ENABLED must stay false while parked");

const layout = read("src/layouts/BaseLayout.astro");
assert.match(layout, /const showPopup = POPUPS_ENABLED && emailCapture;/);
assert.equal((layout.match(/showPopup \? \(/g) || []).length, 2, "both mount blocks gate on showPopup");
assert.doesNotMatch(layout, /\{\s*emailCapture \? \(/, "no mount gates on emailCapture alone");

const api = read("api/popup.ts");
assert.match(api, /const POPUPS_ENABLED = false;/);
assert.match(api, /enabled: POPUPS_ENABLED && status\.enabled/);

for (const f of ["public/popup/coriolis-popup.v2.js", "public/popup/coriolis-popup.v2.css", "popup-kit/client/coriolis-popup.js", "api/popup.ts"]) {
  assert.ok(fs.existsSync(path.join(root, f)), `${f} kept`);
}
console.log("test-popup-park: ok");
