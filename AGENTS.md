# Coriolis, LLC — agent notes

Static company site (Astro → **Vercel**) for the three-pillar model. Not GitHub Pages.

## Product lattice

- **This site:** company home. Ecommerce ladder, AI Factory plates, enterprise DI VP.
- **fflaccelerator.com:** $569 program door. Keep it. Deep-link from `/ecommerce`.
- **gunsearchagent.com:** dealer product. Free core. Do not rebuild claim flow.
- **gunsearchengine.com:** shoppers, Betsy Live, Demand Intelligence portal/demo/API/Co-Pilot.
- **2abetsy.com:** Betsy character.
- **Coriolis OS** (`CoriolisAgency/coriolis`): operator Admin on a **separate host**. Customer portal routes (`/login`, `/account`) will rewrite here. Not a SKU. No Workspace login on this domain.

Do **not** clone checkout, GSA claim, or the DI portal here. Link out.

## Naming

- Pillar is **AI Factory** (Paul’s word).
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
