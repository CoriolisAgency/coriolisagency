# Coriolis, LLC — SEO lattice

> **Governed by `coriolis/docs/seo/`.** The canonical ecosystem SEO docs live in `CoriolisAgency/coriolis` under [`docs/seo/`](https://github.com/CoriolisAgency/coriolis/tree/main/docs/seo); start with [`ARCHITECTURE.md`](https://github.com/CoriolisAgency/coriolis/blob/main/docs/seo/ARCHITECTURE.md). This file keeps only this site's page table and points back there. Where they differ for agency terms, `docs/seo/PAGE-MAP.md` wins.

## Role

**coriolisagency.com** is the company home for Coriolis, LLC. Four pillars: FFL Ecommerce, Gun Store POS, AI Studio, Demand Intelligence (matches `coriolis/docs/rules.md` §5). Gun Store POS is the SEO pillar for integrations with third-party POS systems; POS copy names third-party systems only (D-N1).

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
| FFL website plans / WooCommerce hosting ladder / plan prices (Minute Man $169 → FFL Accelerator $569), "ffl website pricing", "gun store website plans" | **This site** `/ecommerce` — owns the ladder. The `#ffl-accelerator` card links once to `https://fflaccelerator.com/` (S3.1) |
| Support (OPS-3): "ffl website cost", "how much does an ffl website cost" | **This site** `/ffl-website-cost`. Support page, not an owner: links to `/ecommerce`, never takes the `/ecommerce` H1 or "plans / pricing" terms in a title or H1. Prices render from `src/lib/plans.ts`. No AmmoReady or Gearfire prices. No FAQ or HowTo JSON-LD |
| Firearms dropshipping / FFL dropshipping | **This site** `/firearms-dropshipping` |
| FFL Cockpit + “what website do I use” | **This site** `/ffl-cockpit` |
| AmmoReady alternative | **This site** `/ammoready-alternative`. Retired duplicates redirect here (OPS-2): `/ammoready-alternative-why-ffls-are-switching-to-coriolis` 301s here; the old trailing-slash blog URL `/ammoready-alternative/` 308s here (Vercel trailing-slash rule, one hop) |
| Gearfire alternative / FirearmCart / Gunpowdr compare | **This site** `/gearfire-alternative` |
| Support (OPS-3): "leave ammoready", "how to leave ammoready" | **This site** `/leave-ammoready`. Support page, not an owner: links to `/ammoready-alternative`, never repeats its H1. No FAQ or HowTo JSON-LD (the owner carries the HowTo) |
| Support (OPS-3): "leave gearfire", "how to leave gearfire" | **This site** `/leave-gearfire`. Support page, not an owner: links to `/gearfire-alternative`, never repeats its H1. No FAQ or HowTo JSON-LD (the owner carries the HowTo) |
| Orchid comparison: "orchid alternative", "orchid ebound (alternatives / pricing)", "fastbound vs orchid", "orchid ecommerce / pos spark vs" | **Retired** (ORCHID-RM, Paul 2026-10-21): `/orchid-alternative` is removed. It, the retired fastbound-vs-orchid slugs and `/orchid` 301 to `/ecommerce`. No Orchid targeting. FFLA keeps its Orchid slugs at 410 and never targets Orchid. Organic only: no paid Orchid ads |
| Bound-book how-to / A&D compliance | **None** (out of lane). Answer only inside comparison pages; no stand-alone bound-book pages |
| Best FFL ecommerce website | **This site** `/best-ffl-ecommerce-website`. Retired duplicates redirect here (OPS-2): the Dec 2025 trailing-slash post `/best-ffl-ecommerce-website/` 308s here (Vercel trailing-slash rule, one hop); `/why-woocommerce-ffl-cockpit-managed-by-coriolisagency-beats-gearfire-and-ammoready-for-ffl-dealers-in-2026` and `/gun-store-ecommerce-platforms` 301 here (slashed forms: Vercel 308, then the 301) |
| Email for FFL ecommerce | **This site** `/email-marketing-for-ffl-ecommerce` |
| WooCommerce vs Shopify (gun stores) | **This site** `/woocommerce-vs-shopify-for-gun-stores` |
| Can you use WooCommerce to sell guns | **This site** `/can-you-use-woocommerce-to-sell-guns` |
| Gun Store POS pillar: "gun store pos", "gun store pos software", "gun store pos system", "gun store point of sale", "ffl pos (software)", "point of sale software for gun shop", "pos system that integrates with ecommerce for gun store" | **This site** `/gun-store-pos` (AIM, Rapid, GunBiz and Trident 1 equally, each with a WooCommerce page). Never targets plan-price terms (`/ecommerce` owns them), "how the stack fits" (`/stack` owns it), "woocommerce firearms/guns" (`/can-you-use-woocommerce-to-sell-guns`), FastBound review or alternatives terms (bound-book evaluation, out of lane), or Axis terms. Keyword targets and GSC actuals: [`docs/gun-store-pos-keywords.md`](gun-store-pos-keywords.md) |
| Supporting: "aim pos", "aim point of sale"; "rapid gun systems pos"; "gunbiz pos"; "trident 1 pos", "trident1", "trident one" | **This site** `/aim-pos`, `/rapid-gun-systems-pos`, `/gunbiz-pos` (`/microbiz-pos` 301s here), `/trident-1-pos` |
| Gun store POS comparison | None. `/gun-store-pos-comparison` is an orphan, noindex page: owns no keywords, linked from no page, out of the sitemap. |
| FFL Accelerator $569 program story / offer name ("FFL Accelerator", "ffl accelerator", "fflaccelerator") | **fflaccelerator.com** `/` (owns the offer name; only ads destination `/lp/`). No agency page targets the offer name in a title or H1. Ads never land on coriolisagency.com |
| AI Studio / Coriolis products as capability | **This site** `/ai-studio` (`/ai-factory` → 301) |
| Betsy AI character | **None** — 2abetsy.com stays up, not a door |
| Demand Intelligence (enterprise VP, portal, demo, API, Co-Pilot) | **This site** `/demand-intelligence` (moved from GunSearchEngine, D-N16); accounts and the portal stay on GunSearchEngine |
| How store, sensor, and demand fit | **This site** `/stack` |
| Demand Intelligence vs RetailBI (what shoppers typed vs what sold) | **This site** `/demand-intelligence-vs-retailbi` — comparison page |
| FFL analytics, agency side (how Coriolis reads a dealer's site search) | **This site** `/ffl-analytics` — agency page only. The FFL Analytics product intent is not owned here; that name is a reserved satellite. FFL Analytics is the product name of the Analytics page in the GunSearchEngine.com Dealer Dashboard (a GSE feature); copy may name it as a GSE feature. The fflanalytics.com satellite still owns no intent, and nothing links there |
| Search Console for FFLs, agency side (how Coriolis puts site search next to Google Search Console) | **This site** `/ffl-search-console` — agency page only. The FFL Search Console product intent is not owned here; that name is a reserved satellite |
| Grok Bot setup ($995 session) | **This site** `/grok-bot-setup` |
| FFL SEO: "ffl dealer seo", "gun industry seo company", "gun store seo", "ffl seo", "firearms seo", "gun store marketing", "firearms marketing agency", "seo automation for gun stores" | **This site** `/ffl-seo` (new owner page, D-N15; SEO-U32). Coriolis SEO plus SEO automation through GSE's FFL Search Console features (free with a GSE Basic account). `/ffl-search-console` links here |
| FFL payment processing ("Coriolis Payments"): "ffl payment processing", "firearms payment processor", "firearm credit card processing", "gun store merchant account", "high-risk payment processing for firearms", "woocommerce payment gateway for ffl", "ecommerce firearms merchant" | **This site** `/ffl-payment-processing` (new owner page; SEO-U30). Generic Coriolis Payments copy only: no processor names, rates or approval claims unless verified. POS references name third-party systems only. `/payments` and `/ffl-payments` 308 to `/ecommerce` today |
| Websites for ranges, gunsmiths and instructors: "gun range website", "shooting range website design", "range booking website", "gunsmith website (design)", "firearms instructor website", "ccw instructor website", "firearms training website" | **This site** `/websites-for-ranges-gunsmiths-instructors` (new owner page; SEO-U31). One page with three sections (range, gunsmith, instructor), each with its own H2 and FAQ. Confirm what Coriolis builds for each segment before any claim |
| GA for FFLs / free agent | **None** — GunSearchAgent retired |
| Three numbers desk | **None** — FFLIntel reserved |
| Checkout / MSA | Stripe checkout + **this site** `/msa` |
| Press / newsroom | **This site** `/press` |
| Customer login / account | **This host** `/login` `/account` — OS portal rewrite, **noindex** |
| Operator Admin | Coriolis OS on a separate host. Never this marketing chrome. |

## Rules

1. Conversion: monthly ecommerce → `/contact`. Setup → existing Stripe links. DI → GSE demo. Ads → `fflaccelerator.com/lp/` only.
2. First ~80 words of each commercial page answer the query.
3. FAQ JSON-LD on `/ecommerce`, `/firearms-dropshipping`, `/ffl-cockpit`, `/ammoready-alternative`, `/gearfire-alternative`, `/best-ffl-ecommerce-website`, `/email-marketing-for-ffl-ecommerce`, `/woocommerce-vs-shopify-for-gun-stores`, `/can-you-use-woocommerce-to-sell-guns`, `/gun-store-pos` plus the four POS pages, and `/stack`. HowTo JSON-LD on `/ecommerce` (switch + Woo sell guns), `/can-you-use-woocommerce-to-sell-guns`, `/firearms-dropshipping`, `/ammoready-alternative`, and `/gearfire-alternative`.
4. Organization `sameAs`: listed in `src/lib/links.ts`.
5. Never H1 “RetailBI alternative.” Never “switch off RetailBI.” Never 4473 automation claims.
6. Frozen strings from `src/lib/frozen.ts`.
7. Pricing honesty: Minute Man $169, Militia $269, Gun Runner $369, Warlord $469, Accelerator $569. Setup $500 / $2,500. Do not invent DI plan dollars.
8. Cross-links: agency `/ecommerce` → `fflaccelerator.com/` (one link on the plan card). `fflaccelerator.com/` → `coriolisagency.com/about` (one link, homepage only, Paul override 2026-10-07). No other new cross-links between the two sites (the existing agency mentions of fflaccelerator.com on `/about`, `/gearfire-alternative`, `/email-marketing-for-ffl-ecommerce` and press posts predate this rule and stay). All are organic only: no UTMs, no `nofollow`. docs.coriolisagency.com is exempt: it may link to fflaccelerator.com per DOCS-2 (decision `2026-10-08-docs-ecosystem-links`: offer-name anchors only, to `/` and `/plan/`, never `/lp/`); this rule governs www.coriolisagency.com only.

## Internal links

- Home → four pillars (FFL Ecommerce, Gun Store POS, AI Studio, Demand Intelligence)
- Ecommerce → Accelerator (external) + contact + setup checkout + dropshipping / Cockpit / AmmoReady / Gearfire / best-store / email / POS cluster (Gun Store POS `/gun-store-pos`, AIM POS, GunBiz POS, Trident 1 POS, Rapid Gun Systems) + `/stack`
- Support pages (OPS-3, one per owned intent) → their owner: `/leave-ammoready` → `/ammoready-alternative`, `/leave-gearfire` → `/gearfire-alternative`, `/ffl-website-cost` → `/ecommerce`. They also link each other and `/ecommerce`. FFLA gets no comparison posts.
- Gun Store POS `/gun-store-pos` → `/aim-pos`, `/rapid-gun-systems-pos`, `/gunbiz-pos`, `/trident-1-pos` (equal cards, "WooCommerce for ..." anchors), `/contact`
- AI Studio → live product URLs (proof, not a catalog)
- Demand Intelligence lives on this site at `/demand-intelligence` (D-N16). Accounts, the portal and the API stay on GunSearchEngine.
- About → family lattice
- Press → `/press` (releases). First post: five FFL AIM POS integrations. Not a product page.

## FFLA keyword split (FFLA-L1, locked by Paul 2026-10-16)

Decision `2026-10-16-ffla-lattice-l1-l4` (coriolis repo). The full FFLA target table lives in `fflaccelerator/docs/seo-lattice.md`. Ownership rows for this site:

| Intent | Ranking owner |
|--------|----------------|
| FFL software (store software): "ffl software", "ffl dealer software", "ffl order management software", "software for ffl dealers" | **fflaccelerator.com** `/guides/gun-store-software/`. No agency page targets these in a title or H1 |
| Managed / done-for-you FFL website | **fflaccelerator.com** `/`. This site keeps the head terms ("ffl website", "ffl website design", "ffl website builder", "best") on `/ecommerce` and `/best-ffl-ecommerce-website` |
| Generic FFL website migration / redesign | **fflaccelerator.com** (planned `/ffl-website-migration/`). This site keeps the competitor-named alternatives pages |
| FFL website maintenance / webmaster / support / managed hosting | **fflaccelerator.com** (planned `/managed-ffl-website-hosting/`). This site keeps "hosting" head terms and plans on `/ecommerce` |
| Plans / pricing, ffl ecommerce, dropshipping, register integrations, email, WooCommerce explainers, FFL Cockpit, competitor names | **This site** (unchanged). FFLA may bid on some of them on `/lp/` (noindex), which does not compete with these rankings |

- **Gun-word SEO = agency only.** fflaccelerator.com's ad-copy gate bans gun, firearm and ammo words in visible copy, so every gun-word SEO target stays on this site.
