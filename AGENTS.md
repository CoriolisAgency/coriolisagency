<!-- BEGIN Coriolis process pointer (keep at top) -->
# Read the process first

This repo follows the Coriolis AI Studio process. At the start of every session, read these on `main` in `CoriolisAgency/coriolis` (local `C:\dev\coriolis` or `/coriolis`; `git pull` first). Read the live copy each time; don't work from a pasted or remembered copy.

1. `docs/process/coriolis-ai-studio-process.md` (and the short `docs/process/coriolis-ai-studio-quickstart.md`)
2. `docs/rules.md`: standing rules (page ownership, prices, where ads land, what we don't claim, security)
3. `docs/decisions/`: one file per decision; don't work against a `locked` one
4. `docs/board.md`: the work list

Then:
- Use the six moves: decide, lock, park, unlock, queue, ship. Only Paul locks, unlocks, queues or parks.
- Build only a board line that is `queued` or `shipping`. One item in shipping, plus one urgent fix if production is broken. If there's no line for the work, you're deciding, not building.
- Code goes on a branch and through a PR that names the decision and the board line. Never push code to `main`. Paul merges unless he says "merge N".
- Done means merged. Then set the board line to `shipped` on coriolis main and push.
- Hard stops need Paul's explicit OK: migrations or prod data writes, sends of any kind, anything that costs money, secrets or env changes, force-push, prod flag flips.

This block wins over anything below it, including any "push it" or work-on-main instructions. `BATTLEPLAN.md` and `BATTLEPLAN-ARCHIVE.md` in coriolis are a read-only archive now.
Lane for this repo: Ops / Coriolis (board prefix OPS).
<!-- END Coriolis process pointer -->

# Coriolis, LLC — agent notes

Static company site (Astro → **Vercel**) for the three-pillar model. Not GitHub Pages.

## Product lattice

- **This site:** company home. Ecommerce ladder, AI Studio plates, enterprise DI VP.
- **fflaccelerator.com:** $569 program door. Keep it. Deep-link from `/ecommerce`.
- **gunsearchagent.com:** dealer product. Free core. Do not rebuild claim flow.
- **gunsearchengine.com:** shoppers, Betsy Live, Demand Intelligence portal/demo/API/Co-Pilot.
- **2abetsy.com:** Betsy character.
- **Coriolis OS** (`CoriolisAgency/coriolis`): operator Admin on a **separate host**. Customer portal routes (`/login`, `/account`) will rewrite here. Not a SKU. No Workspace login on this domain.

Do **not** clone checkout, GSA claim, or the DI portal here. Link out.

## Naming

- Pillar is **AI Studio** (public name; was AI Factory).
- Do not call this site “Intelligence Factory” (GSE DI hero).
- Do not call Coriolis OS “the factory” or “a Vercel factory.”

## Frozen strings

Copy from `src/lib/frozen.ts`. Do not rewrite the RetailBI doctrine line or FFL Accelerator definition.

## Hard no

- 4473 / NICS / bound-book automation claims
- H1 “RetailBI alternative” / “switch off RetailBI”
- Inventing Insight/Growth/Platform dollar amounts
- Public login for Coriolis OS Admin (Workspace). Do not put **Log in** in the header until the OS portal rewrite exists.

## Dev

```bash
npm install
npm run dev
npm run build
```

## Deploy

Vercel project, domain `coriolisagency.com`. DNS cutover is a later, explicit step — see `docs/dns-cutover.md`. Do not flip to GitHub Pages.
