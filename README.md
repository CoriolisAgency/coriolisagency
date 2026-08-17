# Coriolis, LLC

Company home for **Coriolis, LLC** — Ecommerce, AI Studio, and Demand Intelligence.

This repo is the company site on [coriolisagency.com](https://www.coriolisagency.com/). It is not a second checkout, not FFL Accelerator, and not GunSearchEngine.

## Stack

- [Astro](https://astro.build) 7 (static) + Tailwind CSS v4
- Host: **Vercel** (Astro static)
- Custom domain: `coriolisagency.com`
- Customer login (`/login`, `/account`): rewrite to Coriolis OS portal — not this repo
- Operator Admin: Coriolis OS on a separate host — not this domain

## Local

```bash
npm install
npm run dev
npm run build
```

Node `>=22.12.0`.

## Contact form (Mailgun + Coriolis OS Lead)

`POST /api/contact` emails `CONTACT_TO` (default `paul@coriolisagency.com`) and, when OS env is set, mints a Lead on Coriolis OS via signed `POST /api/forms/lead`. Set these on the Vercel project (and in `.env.local` for local `vercel dev`):

```
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
MAILGUN_API_BASE=https://api.mailgun.net
CONTACT_TO=paul@coriolisagency.com
CONTACT_FROM=Coriolis <forms@YOUR_MAILGUN_DOMAIN>
CORIOLIS_OS_URL=https://<os-host>
FORM_INTAKE_SECRET=<same as the coriolis Vercel project>
```

US API base is the default. Do not commit keys. `FORM_INTAKE_SECRET` must match the OS project. Missing OS env skips the Lead and still sends mail.

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
- Coriolis OS Admin is not a customer login. Header **Log in** is the customer portal.
