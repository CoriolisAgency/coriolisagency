# Coriolis, LLC — SEO lattice

## Role

**coriolisagency.com** is the company home for Coriolis, LLC: Ecommerce, AI Studio, Demand Intelligence.

## Standing hosts

| Host | Role |
|------|------|
| **coriolisagency.com** | The company, the plan ladder (`/ecommerce`), the comparisons (this site) |
| **fflaccelerator.com** | Owns the **FFL Accelerator** offer name ($569). The **only** ads destination: `fflaccelerator.com/lp/`. |
| **gunsearchengine.com** | Soak. Demand Intelligence lives here. No new consumer pages this cycle. |

- Ownership split: **coriolisagency.com `/ecommerce` owns the plan ladder** (Minute Man through Accelerator). **fflaccelerator.com owns the "FFL Accelerator" offer name.** Ads go only to `fflaccelerator.com/lp/`.
- Satellites are **reserved**, not doors: FFLIntel, FFLAnalytics, FFLSearchConsole. None of them owns an intent.
- GunSearchEngine consumer pages do not own an intent in this lattice.
- **2abetsy.com** stays up. It is **not** a door.
- **GunSearchAgent** (gunsearchagent.com) is **retired**. It owns nothing. Do not link it.

| Intent | Ranking owner |
|--------|----------------|
| Coriolis / Coriolis Agency / Coriolis LLC | **This site** `/` |
| FFL website plans / WooCommerce hosting ladder | **This site** `/ecommerce` |
| Firearms dropshipping / FFL dropshipping | **This site** `/firearms-dropshipping` |
| FFL Cockpit + “what website do I use” | **This site** `/ffl-cockpit` |
| AmmoReady alternative | **This site** `/ammoready-alternative` |
| Gearfire alternative / FirearmCart / Gunpowdr compare | **This site** `/gearfire-alternative` |
| Best FFL ecommerce website | **This site** `/best-ffl-ecommerce-website` |
| Email for FFL ecommerce | **This site** `/email-marketing-for-ffl-ecommerce` |
| WooCommerce vs Shopify (gun stores) | **This site** `/woocommerce-vs-shopify-for-gun-stores` |
| Can you use WooCommerce to sell guns | **This site** `/can-you-use-woocommerce-to-sell-guns` |
| AIM / MicroBiz / Trident 1 / Corestore / Rapid + Woo | **This site** `/aim-pos` `/microbiz-pos` `/trident-1-pos` `/corestore-pos` `/rapid-gun-systems-pos` |
| FFL Accelerator $569 program story / offer name | **fflaccelerator.com** (owns the offer name; only ads destination `/lp/`) |
| AI Studio / Coriolis products as capability | **This site** `/ai-studio` (`/ai-factory` → 301) |
| Betsy AI character | **None** — 2abetsy.com stays up, not a door |
| Demand Intelligence (enterprise VP, portal, demo, API, Co-Pilot) | **GunSearchEngine** `/demand-intelligence` — this host 301s `/demand-intelligence` there |
| How store, sensor, and demand fit | **This site** `/stack` |
| Demand Intelligence vs RetailBI (what shoppers typed vs what sold) | **This site** `/demand-intelligence-vs-retailbi` — comparison page; Demand Intelligence itself stays on GunSearchEngine |
| FFL analytics, agency side (how Coriolis reads a dealer's site search) | **This site** `/ffl-analytics` — agency page only. The FFL Analytics product intent is not owned here; that name is a reserved satellite |
| Search Console for FFLs, agency side (how Coriolis puts site search next to Google Search Console) | **This site** `/ffl-search-console` — agency page only. The FFL Search Console product intent is not owned here; that name is a reserved satellite |
| Grok Bot setup ($995 session) | **This site** `/grok-bot-setup` |
| GA for FFLs / free agent | **None** — GunSearchAgent retired |
| Three numbers desk | **None** — FFLIntel reserved |
| Checkout / MSA | Stripe checkout + **this site** `/msa` |
| Press / newsroom | **This site** `/press` |
| Customer login / account | **This host** `/login` `/account` — OS portal rewrite, **noindex** |
| Operator Admin | Coriolis OS on a separate host. Never this marketing chrome. |

## Rules

1. Conversion: monthly ecommerce → `/contact`. Setup → existing Stripe links. DI → GSE demo. Ads → `fflaccelerator.com/lp/` only.
2. First ~80 words of each commercial page answer the query.
3. FAQ JSON-LD on `/ecommerce`, `/firearms-dropshipping`, `/ffl-cockpit`, `/ammoready-alternative`, `/gearfire-alternative`, `/best-ffl-ecommerce-website`, `/email-marketing-for-ffl-ecommerce`, `/woocommerce-vs-shopify-for-gun-stores`, `/can-you-use-woocommerce-to-sell-guns`, the five POS pages, and `/stack`. HowTo JSON-LD on `/ecommerce` (switch + Woo sell guns), `/can-you-use-woocommerce-to-sell-guns`, `/firearms-dropshipping`, `/ammoready-alternative`, and `/gearfire-alternative`.
4. Organization `sameAs`: listed in `src/lib/links.ts`.
5. Never H1 “RetailBI alternative.” Never “switch off RetailBI.” Never 4473 automation claims.
6. Frozen strings from `src/lib/frozen.ts`.
7. Pricing honesty: Minute Man $169, Militia $269, Gun Runner $369, Warlord $469, Accelerator $569. Setup $500 / $2,500. Do not invent DI plan dollars.

## Internal links

- Home → three pillars
- Ecommerce → Accelerator (external) + contact + setup checkout + dropshipping / Cockpit / AmmoReady / Gearfire / best-store / email / POS cluster + `/stack`
- AI Studio → live product URLs (proof, not a catalog)
- Demand Intelligence lives on GunSearchEngine; this host 301s `/demand-intelligence` there. `/stack` inbound uses the GSE URL.
- About → family lattice
- Press → `/press` (releases). First post: five FFL AIM POS integrations. Not a product page.
