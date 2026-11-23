# Brand kit: bullet-hole list style

Opt-in list markers. Twenty transparent metal bullet-hole icons live in `public/brand/bullet-holes/64` (site bullets) and `public/brand/bullet-holes/32` (very small uses). Use them only when a list asks for them.

## Use

```astro
---
import BulletList from "../components/BulletList.astro";
---
<BulletList items={["First", "Second", { label: "Parent", items: ["Child A", "Child B"] }]} variant="bullet-holes" listKey="my-unique-list" class="space-y-1.5 text-sm" />
```

`variant="bullet-holes"` turns the style on. Omit it, or set `variant="default"`, to keep a plain list.

`listKey` seeds a deterministic shuffle of the 20 holes. Same key, same order across builds. Adjacent holes never repeat. Change the key to reshuffle.

Icons render at about 1.1em, aligned to the first line of text. They are decorative (`alt=""`, `aria-hidden`). Nested items get a small muted dot, not a hole.

## Plan cards

Set `bullets: "bullet-holes"` on a plan in `src/lib/plans.ts`. Currently on for the FFL Accelerator card only.
