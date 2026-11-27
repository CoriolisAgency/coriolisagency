// CA-ECOMMERCE-INCLUDED-FREE (Paul's copy, 2026-11-24 11:42 AM ET via Chief): on /ecommerce the FFL Accelerator list
// shows GunSearchEngine.com Pro and FFL Firewall as included free, with only the "$99/month" and "$79/month" struck
// through (parentheses outside the strike), and only the words "FFL Firewall" linking to https://www.fflfirewall.com/ in a new tab (CA-ECOM-FFLFW-LINK, Paul 4:47 PM ET).
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ok = (n) => console.log(`  ok  ${n}`);

const plans = readFileSync(join(root, "src", "lib", "plans.ts"), "utf8");
const accel = plans.slice(plans.indexOf('id: "ffl-accelerator"'), plans.indexOf("export const SETUP"));
assert.ok(accel.length > 0, "FFL Accelerator plan block found");
assert.ok(!/"GunSearchEngine\.com Pro",/.test(accel), "bare GunSearchEngine.com Pro bullet replaced");
assert.ok(accel.includes('html: "GunSearchEngine.com Pro Included Free (<s>$99/month</s>)"'), "GSE Pro bullet, only the price struck");
assert.ok(accel.includes('text: "GunSearchEngine.com Pro Included Free ($99/month)"'), "GSE Pro plain text");
assert.ok(accel.includes('html: `${md("[FFL Firewall](https://www.fflfirewall.com/)")} Included Free (<s>$79/month</s>)`'), "FFL Firewall bullet, linked name, only the price struck");
assert.ok(accel.includes('text: "FFL Firewall Included Free ($79/month)"'), "FFL Firewall plain text");
assert.ok(accel.indexOf("GunSearchEngine.com Pro Included Free") < accel.indexOf("FFL Firewall Included Free"), "FFL Firewall is the new bullet after GSE Pro");
ok("plans.ts: FFL Accelerator list carries both included-free bullets");

const bl = readFileSync(join(root, "src", "components", "BulletList.astro"), "utf8");
assert.ok(bl.includes("<Fragment set:html={html} />") && bl.includes("<li set:html={item.html} />"), "BulletList renders html items in both variants");
ok("BulletList renders html items");

// Built HTML (after `npm run build`): the two strings, the strike around only the prices, and the link.
const built = [join(root, "dist", "ecommerce", "index.html"), join(root, "dist", "ecommerce.html")].find(existsSync);
if (built) {
  const html = readFileSync(built, "utf8");
  // The gse-links build integration links the GunSearchEngine.com name site-wide, so allow its closing </a>.
  assert.match(html, /GunSearchEngine\.com(?:<\/a>)? Pro Included Free \(<s>\$99\/month<\/s>\)/, "built: GSE Pro included free");
  assert.match(html, /<a href="https:\/\/www\.fflfirewall\.com\/" class="[^"]*!text-sky-400[^"]*" target="_blank" rel="noopener noreferrer">FFL Firewall<\/a> Included Free \(<s>\$79\/month<\/s>\)/, "built: FFL Firewall link (new tab) + struck price");
  assert.equal((html.match(/<s>/g) ?? []).length, 2, "built: exactly two struck spans on /ecommerce");
  ok(`built ${built.slice(root.length + 1)}: strings, strike and link present`);
} else {
  console.log("  skip built-HTML check (no dist/ecommerce build)");
}
console.log("test-ecommerce-included-free: ok");
