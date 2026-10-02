import { withBase } from "./base";

export const BULLET_HOLE_COUNT = 20;

/** FNV-1a 32-bit. Unsigned; same string always yields the same seed. */
function fnv1a32(seed: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** mulberry32. Returns [0, 1). */
function mulberry32(state: number): () => number {
  return function next() {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleInPlace(items: number[], rand: () => number): void {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = items[i]!;
    items[i] = items[j]!;
    items[j] = tmp;
  }
}

export function bulletHoleSrc(n: number, size: 64 | 32 = 64): string {
  return withBase(
    `brand/bullet-holes/${size}/bullet-hole-${String(n).padStart(2, "0")}.png`,
  );
}

/**
 * Deterministic hole numbers in 1..20. Same seed → same output.
 * Adjacent items never repeat, including across shuffle-chunk joins.
 */
export function pickBulletHoles(seed: string, count: number): number[] {
  if (count <= 0) return [];

  const rand = mulberry32(fnv1a32(seed));
  const pool = Array.from({ length: BULLET_HOLE_COUNT }, (_, i) => i + 1);
  const out: number[] = [];

  while (out.length < count) {
    const chunk = pool.slice();
    shuffleInPlace(chunk, rand);
    if (out.length > 0 && chunk[0] === out[out.length - 1] && chunk.length > 1) {
      const tmp = chunk[0]!;
      chunk[0] = chunk[1]!;
      chunk[1] = tmp;
    }
    out.push(...chunk);
  }

  return out.slice(0, count);
}
