# Redirect map (Cloudflare)

WordPress → this Astro site. Implement as **301** at Cloudflare (or origin) **at DNS cutover**, not before. Trailing-slash variants should also 301 to the no-slash URL (`trailingSlash: never`).

## v1 (do these)

| Old WordPress | New |
|---------------|-----|
| `/ffl-website-plans/` | `/ecommerce` |
| `/plans` | `/ecommerce` |
| `/ffl-ecommerce/` | `/ecommerce` |
| `/contact-the-coriolis-agency/` | `/contact` |
| `/privacy-policy/` | `/privacy` |

## Keep on WordPress until a second pass

High-traffic or long-tail SEO URLs stay on the WP host (or 404) until we decide to rewrite them:

- `/ffl-dropshipping/`
- `/firearms-dropshipping/`
- `/gun-store-pos-for-ffls/`
- `/ammoready-alternative/`
- `/gearfire-alternative-why-ffls-are-choosing-coriolis-instead/`
- `/news/` and all posts
- `/ffl-ecommerce-news/`
- `/is-woocommerce-good-for-firearms/`
- author archives

Do not 301 the whole blog to `/`. Expand from Search Console after cutover.

## Cloudflare Bulk Redirects (sketch)

```
coriolisagency.com/ffl-website-plans/              → https://coriolisagency.com/ecommerce
coriolisagency.com/plans                           → https://coriolisagency.com/ecommerce
coriolisagency.com/ffl-ecommerce/                  → https://coriolisagency.com/ecommerce
coriolisagency.com/contact-the-coriolis-agency/    → https://coriolisagency.com/contact
coriolisagency.com/privacy-policy/                 → https://coriolisagency.com/privacy
```

Also 301 `www.coriolisagency.com/*` → apex `https://coriolisagency.com/$1` (or the reverse — pick one canonical host). This repo’s `public/CNAME` is **coriolisagency.com** (apex).
