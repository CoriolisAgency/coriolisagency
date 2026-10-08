# Coriolis, LLC — SEO lattice

## Role

**coriolisagency.com** is the company home for Coriolis, LLC. Four pillars: FFL Ecommerce, Gun Store POS, AI Studio, Demand Intelligence.

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
| Firearms dropshipping / FFL dropshipping | **This site** `/firearms-dropshipping` |
| FFL Cockpit + “what website do I use” | **This site** `/ffl-cockpit` |
| AmmoReady alternative | **This site** `/ammoready-alternative`. Retired duplicates redirect here (OPS-2): `/ammoready-alternative-why-ffls-are-switching-to-coriolis` 301s here; the old trailing-slash blog URL `/ammoready-alternative/` 308s here (Vercel trailing-slash rule, one hop) |
| Gearfire alternative / FirearmCart / Gunpowdr compare | **This site** `/gearfire-alternative` |
| Orchid comparison: "orchid alternative", "orchid ebound (alternatives / pricing)", "fastbound vs orchid", "orchid ecommerce / pos spark vs" | **This site** `/orchid-alternative` (S4). Retired fastbound-vs-orchid slugs and `/orchid` 301 here: 301 to /orchid-alternative (S4, Paul 2026-10-07). The target is a comparison page with a bound-book section, not an ecommerce sales page. FFLA keeps its Orchid slugs at 410 and never targets Orchid. Organic only: no paid Orchid ads |
| Bound-book how-to / A&D compliance | **None** (out of lane). Answer only inside comparison pages; no stand-alone bound-book pages |
| Best FFL ecommerce website | **This site** `/best-ffl-ecommerce-website`. Retired duplicates redirect here (OPS-2): the Dec 2025 trailing-slash post `/best-ffl-ecommerce-website/` 308s here (Vercel trailing-slash rule, one hop); `/why-woocommerce-ffl-cockpit-managed-by-coriolisagency-beats-gearfire-and-ammoready-for-ffl-dealers-in-2026` and `/gun-store-ecommerce-platforms` 301 here (slashed forms: Vercel 308, then the 301) |
| Email for FFL ecommerce | **This site** `/email-marketing-for-ffl-ecommerce` |
| WooCommerce vs Shopify (gun stores) | **This site** `/woocommerce-vs-shopify-for-gun-stores` |
| Can you use WooCommerce to sell guns | **This site** `/can-you-use-woocommerce-to-sell-guns` |
| Gun Store POS pillar: "gun store pos", "gun store pos software", "gun store pos system", "gun store point of sale", "ffl pos (software)", "point of sale software for gun shop", "pos system that integrates with ecommerce for gun store" | **This site** `/gun-store-pos` (promotes GunBiz and AIM + WooCommerce). Never targets plan-price terms (`/ecommerce` owns them), "how the stack fits" (`/stack` owns it), "woocommerce firearms/guns" (`/can-you-use-woocommerce-to-sell-guns`), Orchid or "fastbound vs orchid" terms (`/orchid-alternative`), FastBound review or alternatives terms (bound-book evaluation, out of lane), or Axis terms. Keyword targets and GSC actuals: [`docs/gun-store-pos-keywords.md`](gun-store-pos-keywords.md) |
| Supporting (promoted): "aim pos", "aim point of sale"; "gunbiz pos" | **This site** `/aim-pos`, `/gunbiz-pos` (`/microbiz-pos` 301s here) |
| Siblings: "trident 1 pos", "trident1", "trident one"; "rapid gun systems pos" | **This site** `/trident-1-pos`, `/rapid-gun-systems-pos` |
| Gun store POS comparison | None. `/gun-store-pos-comparison` is an orphan, noindex page: owns no keywords, linked from no page, out of the sitemap. |
| FFL Accelerator $569 program story / offer name ("FFL Accelerator", "ffl accelerator", "fflaccelerator") | **fflaccelerator.com** `/` (owns the offer name; only ads destination `/lp/`). No agency page targets the offer name in a title or H1. Ads never land on coriolisagency.com |
| AI Studio / Coriolis products as capability | **This site** `/ai-studio` (`/ai-factory` → 301) |
| Betsy AI character | **None** — 2abetsy.com stays up, not a door |
| Demand Intelligence (enterprise VP, portal, demo, API, Co-Pilot) | **GunSearchEngine** `/demand-intelligence` — this host 301s `/demand-intelligence` there |
| How store, sensor, and demand fit | **This site** `/stack` |
| Demand Intelligence vs RetailBI (what shoppers typed vs what sold) | **This site** `/demand-intelligence-vs-retailbi` — comparison page; Demand Intelligence itself stays on GunSearchEngine |
| FFL analytics, agency side (how Coriolis reads a dealer's site search) | **This site** `/ffl-analytics` — agency page only. The FFL Analytics product intent is not owned here; that name is a reserved satellite. FFL Analytics is the product name of the Analytics page in the GunSearchEngine.com Dealer Dashboard (a GSE feature); copy may name it as a GSE feature. The fflanalytics.com satellite still owns no intent, and nothing links there |
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
3. FAQ JSON-LD on `/ecommerce`, `/firearms-dropshipping`, `/ffl-cockpit`, `/ammoready-alternative`, `/gearfire-alternative`, `/orchid-alternative`, `/best-ffl-ecommerce-website`, `/email-marketing-for-ffl-ecommerce`, `/woocommerce-vs-shopify-for-gun-stores`, `/can-you-use-woocommerce-to-sell-guns`, `/gun-store-pos` plus the four POS pages, and `/stack`. HowTo JSON-LD on `/ecommerce` (switch + Woo sell guns), `/can-you-use-woocommerce-to-sell-guns`, `/firearms-dropshipping`, `/ammoready-alternative`, `/gearfire-alternative`, and `/orchid-alternative` (tier-neutral steps).
4. Organization `sameAs`: listed in `src/lib/links.ts`.
5. Never H1 “RetailBI alternative.” Never “switch off RetailBI.” Never 4473 automation claims.
6. Frozen strings from `src/lib/frozen.ts`.
7. Pricing honesty: Minute Man $169, Militia $269, Gun Runner $369, Warlord $469, Accelerator $569. Setup $500 / $2,500. Do not invent DI plan dollars.
8. Cross-links: agency `/ecommerce` → `fflaccelerator.com/` (one link on the plan card). `fflaccelerator.com/` → `coriolisagency.com/about` (one link, homepage only, Paul override 2026-10-07). No other new cross-links between the two sites (the existing agency mentions of fflaccelerator.com on `/about`, `/gearfire-alternative`, `/email-marketing-for-ffl-ecommerce` and press posts predate this rule and stay). All are organic only: no UTMs, no `nofollow`. docs.coriolisagency.com is exempt: it may link to fflaccelerator.com per DOCS-2 (decision `2026-10-08-docs-ecosystem-links`: offer-name anchors only, to `/` and `/plan/`, never `/lp/`); this rule governs www.coriolisagency.com only.

## Internal links

- Home → four pillars (FFL Ecommerce, Gun Store POS, AI Studio, Demand Intelligence)
- Ecommerce → Accelerator (external) + contact + setup checkout + dropshipping / Cockpit / AmmoReady / Gearfire / Orchid / best-store / email / POS cluster (Gun Store POS `/gun-store-pos`, AIM POS, GunBiz POS, Trident 1 POS, Rapid Gun Systems) + `/stack`
- Gun Store POS `/gun-store-pos` → `/gunbiz-pos`, `/aim-pos` (main cards), `/trident-1-pos`, `/rapid-gun-systems-pos` ("Also works with WooCommerce"), `/contact`
- AI Studio → live product URLs (proof, not a catalog)
- Demand Intelligence lives on GunSearchEngine; this host 301s `/demand-intelligence` there. `/stack` inbound uses the GSE URL.
- About → family lattice
- Press → `/press` (releases). First post: five FFL AIM POS integrations. Not a product page.
