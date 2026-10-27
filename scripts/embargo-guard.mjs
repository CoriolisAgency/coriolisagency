// Copy guard for the embargoed terms. Only SHA-256 hex digests of the
// lowercased terms live here; the words themselves never go in a repo.
// Copy text is lowercased, split into words, and each word plus each
// adjacent two-word pair is hashed and compared.
import { createHash } from "node:crypto";

export const EMBARGO_SHA256 = new Set([
  "03471f0f4f45c1485377ef949409f260d4d73845ce956ea0b0035c523b8a2e5a",
  "6579f6ec0bcaf141ad09e12b605c4453dabcbd07667fd29938d600ffc0b369a8",
  "9748358c94bed99b4329ed919659957f5b16f748322c120ef7035ea94560ec48",
  "b17d45121150928f2146af49e195eff1eef5d67325be273a733fb74acadaa342",
  "cad7c3646538c6c116f214643bba8b5a5424866f8e067b11365145f4dbeee846",
  "fdb827d1a99796cd04ee1cb9692f19ad97dc9c5dc659baffae1a378703547e5f",
]);

export function sha256Hex(s) {
  return createHash("sha256").update(s, "utf8").digest("hex");
}

export function tokenize(text) {
  return String(text)
    .toLowerCase()
    .split(/[^a-z0-9']+/)
    .map((w) => w.replace(/'s$/, "").replace(/'/g, ""))
    .filter(Boolean);
}

/** Count embargoed hits in text. `digests` defaults to the embargo set. */
export function embargoHits(text, digests = EMBARGO_SHA256) {
  const words = tokenize(text);
  let hits = 0;
  for (let i = 0; i < words.length; i++) {
    if (digests.has(sha256Hex(words[i]))) hits++;
    if (i + 1 < words.length && digests.has(sha256Hex(words[i] + " " + words[i + 1]))) hits++;
  }
  return hits;
}

/** Self-test: the matcher works on hashed fixtures without any plaintext term. */
export function selfTest(assert) {
  for (const d of EMBARGO_SHA256) assert.match(d, /^[0-9a-f]{64}$/);
  assert.ok(EMBARGO_SHA256.size >= 4);
  const single = new Set([sha256Hex("blorptest")]);
  assert.equal(embargoHits("Hello Blorptest's world", single), 1);
  assert.equal(embargoHits("Hello world", single), 0);
  const pair = new Set([sha256Hex("alpha beta")]);
  assert.equal(embargoHits("x Alpha  Beta y", pair), 1);
  assert.equal(embargoHits("alpha x beta", pair), 0);
  assert.equal(embargoHits("Secure messaging built for licensed dealers."), 0);
}
