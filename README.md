# Coriolis, LLC

Company home for **Coriolis, LLC** — Ecommerce, AI Studio, and Demand Intelligence.

This repo is the company site on [www.coriolisagency.com](https://www.coriolisagency.com/) (apex 308s to www). It is not a second checkout, not FFL Accelerator, and not GunSearchEngine.

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

## Contact form (`@coriolis/lead-form` v0.1.0)

`/contact` renders the shared form from `@coriolis/lead-form` v0.1.0 (`github:CoriolisAgency/lead-form#v0.1.0`). The browser posts to `/api/lead`. `/api/contact` is a legacy alias that stamps `started_at` (and `page=/contact` when missing) so old callers are not silently dropped.

The handler forwards to Ops `POST /api/forms/lead` in the same request. A successful Ops response is the only confirmation path. Ops failure returns **502** and does not email as a fallback.

Set these on the Vercel project (and in `.env.local` for local `vercel dev`). They are server-only. Do not prefix them with `PUBLIC_`.

Required:

```
LEAD_FORM_SITE=coriolisagency
CORIOLIS_OS_URL=https://<os-host>
FORM_INTAKE_SECRET=<same as the coriolis Vercel project>
```

Optional Mailgun copy, sent only after Ops accepts the lead. All three of `MAILGUN_API_KEY`, `MAILGUN_DOMAIN`, and `CONTACT_TO` are required or mail is skipped. There is no default recipient.

```
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
CONTACT_TO=
CONTACT_FROM=Coriolis <forms@YOUR_MAILGUN_DOMAIN>
CONTACT_SUBJECT_PREFIX=Coriolis
MAILGUN_API_BASE=https://api.mailgun.net
```

US API base is the default. Do not commit keys. `FORM_INTAKE_SECRET` must match the OS project.

The Vercel GitHub App needs access to the private `CoriolisAgency/lead-form` repo so `npm install` can fetch the tag. The v0.1.0 tag commits `dist/`; its `prepare` script runs `tsc` without `@types/node` and fails, so this repo sets `ignore-scripts=true` in `.npmrc`.

Vercel `api/` functions 500 if they import **local** modules. Importing `@coriolis/lead-form` is fine.

## Agency intel popup

`POST /api/subscribe` asks Coriolis OS to send a confirmation email (`POST /api/forms/subscribe`). The Lead is minted only after they click the link (`GET /api/forms/confirm-email` → `/confirmed`). Does **not** write GunSearchEngine users. Same `CORIOLIS_OS_URL` + `FORM_INTAKE_SECRET` as contact. Keep this function self-contained — Vercel `api/` functions 500 if they import local modules. Localhost posts straight to `http://localhost:3000/api/forms/subscribe`. Unsub: `/unsubscribe`.

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
