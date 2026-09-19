# Redirect map (Vercel)

WordPress → this Astro site. **301s run on Vercel** (`vercel.json`), not Cloudflare Bulk Redirects.

Cloudflare is **DNS-only** after cutover (orange cloud off). Vercel security stays in front — do **not** proxy through Cloudflare. Bulk Redirect lists never fire in DNS-only mode; that is why old WP paths 404’d until they lived in `vercel.json`.

**Preferred host is `www`.** GSC (Domain property, last 16 months, Web): **1,426 of 1,441 clicks are on `www`**. Apex has 3 impressions and 0 clicks. Live already 308s `https://coriolisagency.com/*` → `https://www.coriolisagency.com/$1` (Vercel domains). `vercel.json` also has a host-conditioned 301 (`has.host = coriolisagency.com`). Canonicals, `LINKS.home`, sitemap, and `robots.txt` emit www. Trailing-slash variants 308 to no-slash via `"trailingSlash": false` in `vercel.json` — do not duplicate slash rows in the redirects array.

Source: `Downloads/coriolisagency.com-Performance-on-Search-2026-08-16/` (Pages + Queries). Links export not in yet.

## Runtime

| Layer | Role |
|-------|------|
| **Vercel `vercel.json` redirects** | Canonical 301 list for old WordPress paths → new Astro slugs (`permanent: true`). |
| **Vercel `vercel.json` rewrites → `/api/gone`** | HTTP **410** for retired WordPress slugs that named a locked POS vendor. Vercel redirects cannot emit 410. |
| **`scripts/cloudflare-bulk-redirects.csv`** | Reference / historical import for Cloudflare Bulk Redirects. Same map as paths; **not** the runtime after DNS-only cutover. |
| **Cloudflare** | DNS-only. Do not re-enable proxy for these 301s. |

Highest-priority rule: `/ffl-website-plans` → `/ecommerce` (also `/ffl-ecommerce` → `/ecommerce`). Keep `/ai-factory` → `/ai-studio`.

## How to read the numbers

- **1,441 page clicks / 16 months** (~3/day). This is a brand site, not a traffic engine.
- Homepage is **571 clicks (40%)**. Query `coriolis agency` alone is **337 clicks at position 1.35**.
- Query export is capped (~449 click-sum vs 1,441 on Pages). Use Pages for URL decisions; Queries for intent.
- Thresholds used here: keep slug if **≥15 clicks and still on-strategy**; 301 the rest of anything with clicks; let zero-click / off-strategy die. Do **not** 301 the blog to `/`.

## Keep the slug (recreate in Astro)

Same path, new voice, still answer the old query in the first 80 words. **Do not 301 these** — they are live Astro pages.

| Old (www) | 16-mo clicks | Impr | Why |
|-----------|-------------:|-----:|-----|
| `/` | 571 | 10,669 | Brand. New three-pillar home is fine. |
| `/firearms-dropshipping` | 55 | 9,340 | Best non-brand URL. Query `firearms dropshipping` is pos 22 with 7 clicks — this page is the absorber. |
| `/ffl-cockpit` | 33 | 2,390 | Partner product, pos ~8 for `ffl cockpit`. |
| `/ammoready-alternative` | 19 | 1,780 | Query pos 6.1, 9 clicks. **AmmoReady pillar.** |
| `/best-ffl-ecommerce-website` | 17 | 3,047 | Comparison intent still sells ecommerce. |

Also live (do not redirect): `/about`, `/ai-studio`, `/contact`, `/ecommerce`, `/privacy`, `/msa`, `/stack`, **`/gearfire-alternative`** (Gearfire pillar), `/email-marketing-for-ffl-ecommerce`, `/woocommerce-vs-shopify-for-gun-stores`, `/aim-pos`, `/microbiz-pos`, `/trident-1-pos`, `/corestore-pos`, `/rapid-gun-systems-pos`.

`/demand-intelligence` 301s to `https://www.gunsearchengine.com/demand-intelligence/` (`permanent: true` in `vercel.json`). Trailing-slash variant 308s to no-slash first. Do not leave a competing DI page on this host.

Optional keep (editorial accidents — not company juice, but real clicks). Only if you want the traffic; otherwise 301 or die:

| Old | Clicks | Impr | Call |
|-----|-------:|-----:|------|
| `/the-scar-is-dead-long-live-the-xcr-modular-tactical-rifle` | 40 | 3,098 | `xcr vs scar`. Client/editorial. Keep static **or** let die. |
| `/shadowsmith-ammo-selects-coriolis-agency-…` | 35 | 3,335 | People search the **client**. 301 → `/about` unless you want a news URL. |
| `/top-us-gun-manufacturers-complete-guide-…` | 30 | 18,031 | Vanity listicle (page 2–3). Let die unless you like the impressions. |
| `/fastbound-vs-orchid-ebound-a-comprehensive-comparison-of-ffl-software-solutions` | 28 | 16,821 | **410** via `/api/gone`. Bound-book / 4473. Do not 301. |
| `/unleash-hellfire-with-the-diablo-12-gauge-…` | 22 | 2,404 | Product editorial. Let die. |
| `/meet-the-team` | 26 | 314 | Brand. 301 → `/about` (do not rebuild). |
| `/ammoready-com-founder-launches-2a-focused-digital-marketing-agency` | 24 | 812 | Origin story. 301 → `/about`. |

## 410 (implemented)

Retired WordPress posts. Soft 404 on the Astro cutover; now rewrite to `/api/gone` (410). Do not recreate the slugs. Do not 301 bound-book comparison traffic onto ecommerce pages.

| Old WordPress | Status | Clicks | Why |
|---------------|--------|-------:|-----|
| `/orchid` | 410 | — | Short leftover. |
| `/ebound` | 410 | — | Short leftover. |
| `/orchid-gun-store-pos` | 410 | 0 | Junk POS post. |
| `/orchid-estate` | 410 | — | Short leftover. |
| `/orchid-estate-bound-book` | 410 | — | Short leftover. |
| `/orchid-estate-breaks-new-ground-in-ffl-compliance` | 410 | — | Live WP slug (soft 404). |
| `/fastbound-vs-orchid` | 410 | — | Short leftover. |
| `/fastbound-vs-orchid-advisors` | 410 | — | Short leftover. |
| `/fastbound-vs-orchid-ebound` | 410 | — | Short leftover. |
| `/fastbound-vs-orchid-ebound-bound-book` | 410 | — | Short leftover. |
| `/fastbound-vs-orchid-ebound-a-comprehensive-comparison-of-ffl-software-solutions` | 410 | 28 | Bound-book / 4473. Do not 301. |

Do **not** 410 `/estate` — that string is not unique enough. Trailing-slash variants 308 to the no-slash source, then 410.

## 301 to a new pillar (do these)

Implemented in `vercel.json` (path sources only; trailing-slash handled by Vercel).

`/demand-intelligence` → `https://www.gunsearchengine.com/demand-intelligence/` is a live-host 301 (not a WordPress leftover). `/sitemap.xml` rewrites to `/sitemap-index.xml` — same index, not a second sitemap.

| Old WordPress | New | Clicks | Why |
|---------------|-----|-------:|-----|
| `/ffl-website-plans/` | `/ecommerce` | 40 | Already planned. |
| `/ffl-ecommerce/` | `/ecommerce` | 19 | Already planned. |
| `/plans` | `/ecommerce` | — | Alias. |
| `/pricing/` and `/pricing` | `/ecommerce` | 6 | |
| `/contact-the-coriolis-agency/` | `/contact` | 7 | Already planned. |
| `/contact/` | `/contact` | 0 | Same intent, 171 impr. Trailing slash only — Vercel 308. |
| `/privacy-policy/` | `/privacy` | 0 | Already planned. |
| `/meet-the-team/` | `/about` | 26 | |
| `/ammoready-com-founder-launches-2a-focused-digital-marketing-agency/` | `/about` | 24 | |
| `/author/devopscoriolisagency-com/` | `/about` | 9 | |
| `/author/coriolisagency/` | `/about` | 0 | |
| `/partners/` | `/about` | 16 | Trust page; no partners template on Astro. |
| `/faq/` | `/ecommerce` | 5 | FAQ JSON-LD already on `/ecommerce`. |
| `/payments/` and `/ffl-payments/` | `/ecommerce` | 10+1 | Capability of ecommerce. |
| `/ammoready-alternative-why-ffls-are-switching-to-coriolis/` | `/ammoready-alternative` | 1 | AmmoReady cannibal → AmmoReady pillar. |
| `/gearfire-alternative-why-ffls-are-choosing-coriolis-instead/` | `/gearfire-alternative` | 9 | Gearfire cannibal → **Gearfire pillar** (was wrongly folded into AmmoReady). |
| `/why-woocommerce-ffl-cockpit-managed-by-coriolisagency-beats-gearfire-and-ammoready-for-ffl-dealers-in-2026/` | `/best-ffl-ecommerce-website` | 14 | Mixed both-platforms post → comparison page, not a third pillar. |
| `/ffl-dropshipping/` | `/firearms-dropshipping` | 0 | 508 impr, 0 clicks — fold into the winner. |
| `/what-is-firearms-dropshipping/` | `/firearms-dropshipping` | 4 | |
| `/firearms-dropshipping-woocommerce/` | `/firearms-dropshipping` | 5 | |
| `/dropshipping-firearms-ammunition-for-ffls-coriolis-agency/` | `/firearms-dropshipping` | 2 | |
| `/home-based-ffl-distributors-how-to-build-a-profitable-online-firearms-business-from-home-in-2026/` | `/firearms-dropshipping` | 23 | |
| `/dropshipping-for-home-based-ffls-how-to-build-a-scalable-firearms-business-without-a-storefront/` | `/firearms-dropshipping` | 12 | |
| `/home-based-ffl-dropshipping-with-woocommerce-ffl-cockpit-2026-complete-setup-guide/` | `/firearms-dropshipping` | 6 | |
| `/ffl-cockpit-distributors-complete-list-of-21-supported-firearm-distributors-for-woocommerce-2026-update/` | `/ffl-cockpit` | 11 | |
| `/coriolis-agency-announces-fully-managed-woocommerce-hosting-for-ffl-cockpit/` | `/ffl-cockpit` | 11 | Cockpit hosting capture, not plans. |
| `/ffl-cockpit-woocommerce-hosting/` | `/ffl-cockpit` | 2 | |
| `/gun-store-ecommerce/` | `/ecommerce` | 8 | |
| `/gun-store-website-builder-for-ffls/` | `/ecommerce` | 5 | |
| `/best-ffl-ecommerce-website/` | *(keep — see above)* | 17 | |
| `/distributor-program/` | `/ecommerce` | 7 | |
| `/can-you-use-woocommerce-to-sell-guns-…/` | `/ecommerce` | 4 | |
| `/is-woocommerce-good-for-firearms/` | `/ecommerce` | 1 | 1,267 impr, 1 click. Not worth a slug. |
| `/coriolis-agency-launches-betsy-ai-gun-search-engine-and-gun-search-agent/` | `/ai-studio` | 1 | Only Betsy URL with a click. (`/ai-factory` 301s to `/ai-studio`.) |

### Distributor clones → `/firearms-dropshipping`

Sum of clones with clicks is ~50, split thin. Do not keep 20 near-duplicate pages.

| Old | Clicks |
|-----|-------:|
| `/rsr-group-dropshipping-for-woocommerce-automated-firearms-sales-engine/` | 13 |
| `/zanders-sporting-goods-dropshipping-for-woocommerce/` | 11 |
| `/chattanooga-shooting-supplies-firearms-dropshipping-for-woocommerce/` | 9 |
| `/sports-south-dropshipping-for-woocommerce-automated-firearms-sales-engine/` | 8 |
| `/rsr-group-firearms-dropshipping-for-woocommerce/` | 7 |
| `/lipseys-firearms-dropshipping-for-woocommerce/` | 4 |
| `/sports-south-firearms-dropshipping-for-woocommerce/` | 3 |
| `/orion-wholesale-firearms-dropshipping-for-woocommerce/` | 3 |
| `/kinseys-firearms-dropshipping-for-woocommerce/` | 3 |
| `/lipseys-dropshipping-for-woocommerce/` | 2 |
| `/davidsons-firearms-dropshipping-for-woocommerce/` | 2 |
| `/mge-wholesale-firearms-dropshipping-for-woocommerce/` | 1 |
| `/gun-accessory-supply-firearms-dropshipping-for-woocommerce/` | 1 |
| `/camfour-firearms-dropshipping-for-woocommerce/` | 1 |
| `/iron-valley-firearms-dropshipping-for-woocommerce/` | 1 |
| All other `*-firearms-dropshipping-for-woocommerce/` | 0 |

### POS integration posts → one page per register

| Old | New | Clicks |
|-----|-----|-------:|
| `/coriolis-agency-partners-with-aim-pos-…/` | `/aim-pos` | 10 |
| `/aim-pos-integration-for-woocommerce/` | `/aim-pos` | 3 |
| `/coriolis-agency-and-microbiz-partner-…/` | `/microbiz-pos` | 3 |
| `/ecommerce-for-trident-1-pos/` | `/trident-1-pos` | 5 |
| `/coriolis-agency-announces-support-for-corestore-pos-…/` | `/corestore-pos` | 6 |
| `/rapid-gun-systems-pos-integration-…/` | `/rapid-gun-systems-pos` | 3 |
| `/axis-pos-woocommerce-a-powerful-integration-…/` | `/ecommerce` | 3 |
| `/pos-integration-for-gun-store-ecommerce/` | `/ecommerce` | 2 |
| `/gun-store-pos-for-ffls/` | `/ecommerce` | 0 (646 impr) |

### Email (was “let die”) → Accelerator page

| Old | New |
|-----|-----|
| `/email-marketing-for-ffl-ecommerce/` | **live page** (do not 301) |
| `/email-marketing-firearms/` | `/email-marketing-for-ffl-ecommerce` |
| `/the-roi-for-email-marketing-is-42-to-1/` | `/email-marketing-for-ffl-ecommerce` — do **not** repeat the 42:1 claim |

### SEO ship 2026-09 — comparison consolidation

| Intent | Canonical | 301 the rest |
|--------|-----------|--------------|
| AmmoReady alternative | `/ammoready-alternative` | `/ammoready-alternative-why-…`, `/switch`, `/switch-n-save` |
| Gearfire alternative | `/gearfire-alternative` | `/gearfire-alternative-why-…` |
| Best / beats both | `/best-ffl-ecommerce-website` | `/why-woocommerce-…-beats-gearfire-and-ammoready-…` |
| FFL ecommerce / builder / Woo sell guns | `/ecommerce` | `/ffl-website-plans`, `/gun-store-website-builder-for-ffls`, `/can-you-use-woocommerce-to-sell-guns-…`, `/is-woocommerce-good-for-firearms`, `/woocommerce-for-firearms` |
| FFL Cockpit website / hosting | `/ffl-cockpit` | hosting announcement slugs |
| Dropshipping / home-based FFL | `/firearms-dropshipping` | home-based + distributor clones (unchanged) |

## Let die (do not 301 to `/`)

Soft 404. Not worth a rule unless the Links export later shows real backlinks.

**Off-strategy with impressions, almost no clicks**

- Email ROI headline only: the **42-to-1** claim is not republished. The slug 301s to `/email-marketing-for-ffl-ecommerce` (Accelerator facts only).
- Agency/SEO vanity: `/firearms-digital-marketing-agency/` (15 clicks — only if you still want that door; else die), `/gun-industry-seo-company-…/` (10 c / 10,184 i), `/firearms-seo-marketing/` (7 c / 10,201 i). Query cluster: **6 clicks / 20k impr**.
- Compliance software: `/fastbound-vs-orchid-ebound-a-comprehensive-comparison-of-ffl-software-solutions` (28 c / 16,821 i) — **410**, do not 301. Query cluster is 1 click / 8.5k impr of bound-book noise.
- `/ammoready-login/` (2 clicks) — not your product.
- `/types-of-ffls/` (0 / 898) — still a soft 404.
- `/orchid-gun-store-pos` (0 / 826) and the short leftovers in the 410 table — **410** via `/api/gone`. Do not 301 onto `/ecommerce` or `/best-ffl-ecommerce-website`.

**Zero-click infrastructure**

- `/category/*`, `/tag/*`, `/author/*/page/*`
- Avada / Fusion / portfolio / slide-page sitemaps
- `/nothing-to-see-here/`, `/email-campaign-request-form/`, `/site-watcher️/`
- `t1.coriolisagency.com` product URLs (0 clicks, demo leakage)
- `app.coriolisagency.com` (0 clicks)
- `class.coriolisagency.com` (4 clicks total — different host, not this repo)

**Other hosts (not this cutover)**

- `trashpanda.coriolisagency.com` — **11 clicks**. Separate subdomain. Do not point the company 301 map at it; leave that DNS alone.

## Maintaining the list

1. Edit **`vercel.json`** `redirects` (paths only, `permanent: true`). Skip keep-slugs and trailing-slash duplicates. Retired named-vendor slugs go in `rewrites` → `/api/gone` (410), not `redirects`.
2. Optionally mirror path changes in `scripts/cloudflare-bulk-redirects.csv` for reference — it is not the runtime.
3. Keep-slugs already exist on this Astro site (`/`, `/firearms-dropshipping`, `/ffl-cockpit`, `/ammoready-alternative`, `/gearfire-alternative`, `/best-ffl-ecommerce-website`, `/email-marketing-for-ffl-ecommerce`, plus `/about`, `/ai-studio`, `/contact`, `/ecommerce`, `/privacy`, `/stack`, the five POS slugs, `/woocommerce-vs-shopify-for-gun-stores`). Do not 301 those. `/demand-intelligence` is the exception: 301 to GunSearchEngine.
