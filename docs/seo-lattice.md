# Coriolis, LLC — SEO lattice

## Role

**coriolisagency.com** is the company home for Coriolis, LLC: Ecommerce, AI Studio, Demand Intelligence.

| Intent | Ranking owner |
|--------|----------------|
| Coriolis / Coriolis Agency / Coriolis LLC | **This site** `/` |
| FFL website plans / WooCommerce hosting ladder | **This site** `/ecommerce` |
| Firearms dropshipping / FFL dropshipping | **This site** `/firearms-dropshipping` |
| FFL Cockpit + “what website do I use” | **This site** `/ffl-cockpit` |
| AmmoReady alternative / Gearfire alternative | **This site** `/ammoready-alternative` |
| Best FFL ecommerce website | **This site** `/best-ffl-ecommerce-website` |
| FFL Accelerator $569 program story | **fflaccelerator.com** |
| AI Studio / Coriolis products as capability | **This site** `/ai-studio` (`/ai-factory` → 301) |
| Betsy AI character | **2abetsy.com** |
| Demand Intelligence (enterprise VP, portal, demo, API, Co-Pilot) | **GunSearchEngine** `/demand-intelligence` — this host 301s `/demand-intelligence` there |
| How store, sensor, and demand fit | **This site** `/stack` |
| GA for FFLs / free agent | **GunSearchAgent** |
| Three numbers desk | **FFLIntel** |
| Checkout / MSA | Stripe checkout + **this site** `/msa` |
| Customer login / account | **This host** `/login` `/account` — OS portal rewrite, **noindex** |
| Operator Admin | Coriolis OS on a separate host. Never this marketing chrome. |

## Rules

1. Conversion: monthly ecommerce → `/contact`. Setup → existing Stripe links. DI → GSE demo. GSA → gunsearchagent.com.
2. First ~80 words of each commercial page answer the query.
3. FAQ JSON-LD on `/ecommerce`, `/firearms-dropshipping`, `/ffl-cockpit`, `/ammoready-alternative`, `/best-ffl-ecommerce-website`, and `/stack`.
4. Organization `sameAs`: listed in `src/lib/links.ts`.
5. Never H1 “RetailBI alternative.” Never “switch off RetailBI.” Never 4473 automation claims.
6. Frozen strings from `src/lib/frozen.ts`.
7. Pricing honesty: Minute Man $169, Militia $269, Gun Runner $369, Warlord $469, Accelerator $569. Setup $500 / $2,500. Do not invent DI plan dollars.

## Internal links

- Home → three pillars
- Ecommerce → Accelerator (external) + contact + setup checkout + dropshipping / Cockpit / AmmoReady / best-store cluster + `/stack`
- AI Studio → live product URLs (proof, not a catalog)
- Demand Intelligence lives on GunSearchEngine; this host 301s `/demand-intelligence` there. `/stack` inbound uses the GSE URL.
- About → family lattice
