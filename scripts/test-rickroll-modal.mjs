// EGGNOG-RICKROLL-MODAL: only the eggnog press page carries marked links, with a normal YouTube href, target=_blank, rel=noopener.
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pages = join(root, "src", "pages", "press");
const ok = (n) => console.log(`  ok  ${n}`);

const egg = readFileSync(join(pages, "eggnog-sales-151-million-pounds-nog-wars.astro"), "utf8");
const anchors = egg.match(/<a [^>]*data-rickroll[^>]*>/g) ?? [];
assert.equal(anchors.length, 2, "two marked lip balm links");
for (const a of anchors) {
  assert.match(a, /href="https:\/\/www\.youtube\.com\/watch\?v=dQw4w9WgXcQ"/);
  assert.match(a, /target="_blank"/);
  assert.match(a, /rel="noopener"/);
  assert.doesNotMatch(a, /#rickroll/);
}
ok("two marked links: normal YouTube href, target=_blank, rel=noopener");
assert.match(egg, /bindRickroll/);
ok("eggnog page binds the modal script");

const marked = [];
for (const f of readdirSync(pages)) {
  if (/data-rickroll|bindRickroll/.test(readFileSync(join(pages, f), "utf8"))) marked.push(f);
}
assert.deepEqual(marked, ["eggnog-sales-151-million-pounds-nog-wars.astro"]);
ok("no other press page is marked or loads the script");

const lib = readFileSync(join(root, "src", "scripts", "rickroll-modal.ts"), "utf8");
assert.match(lib, /"Close video"/);
assert.match(lib, /youtube-nocookie\.com\/embed\//);
assert.match(lib, /autoplay; encrypted-media/);
assert.match(lib, /closest\("a\[data-rickroll\]"\)/);
ok("script: close label, nocookie embed, binds only to marked links");
console.log("test-rickroll-modal: ok");
