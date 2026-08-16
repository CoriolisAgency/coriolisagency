# Coriolis, LLC

Company home for **Coriolis, LLC** — Ecommerce, AI Factory, and Demand Intelligence.

This repo replaces the WordPress story on [coriolisagency.com](https://www.coriolisagency.com/). It is not a second checkout, not FFL Accelerator, and not GunSearchEngine.

## Stack

- [Astro](https://astro.build) 7 (static) + Tailwind CSS v4
- Host: **GitHub Pages**
- Custom domain: `coriolisagency.com` (`public/CNAME`)

## Local

```bash
npm install
npm run dev
npm run build
```

Node `>=22.12.0`.

## What lives where

| Intent | Owner |
|---|---|
| Company home / three pillars | **This site** |
| FFL monthly ladder + setup | **This site** `/ecommerce` |
| $569 program story | [fflaccelerator.com](https://fflaccelerator.com) |
| Setup checkout | `checkout.coriolisagency.com` |
| Dealer sensor / free Betsy | [gunsearchagent.com](https://gunsearchagent.com) |
| Shoppers + DI portal / demo | [gunsearchengine.com](https://www.gunsearchengine.com) |
| Betsy character | [2abetsy.com](https://2abetsy.com) |
| Company OS (internal) | `CoriolisAgency/coriolis` — not this repo |

## Docs

- [SEO lattice](docs/seo-lattice.md)
- [WP → Astro redirect map](docs/redirect-map.md)
- [DNS cutover](docs/dns-cutover.md)
- Frozen strings: `src/lib/frozen.ts`

## Rules

- Do not clone Stripe checkout.
- Monthly plans = talk to Coriolis. Setup packages keep existing buy links.
- Demand Intelligence demo stays on GunSearchEngine.
- Never H1 “RetailBI alternative.” Never 4473 / NICS / bound-book automation.
- Coriolis OS is a capability plate, not a customer login.
