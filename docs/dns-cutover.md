# DNS cutover — coriolisagency.com

Do this **after** GitHub Pages is serving the custom domain (certificate issued) **and** the site has been reviewed. Until then, WordPress remains the public origin.

## Records

**Apex `coriolisagency.com` A** (GitHub Pages — confirm current list at GitHub docs):

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**`www` CNAME** → `CoriolisAgency.github.io`

Cloudflare orange-cloud is fine; set SSL/TLS to **Full (strict)** once GitHub has the cert.

## Before the flip

1. Push `main`, confirm Actions → Pages is green.
2. Repo → Settings → Pages → custom domain `coriolisagency.com` (matches `public/CNAME`).
3. Load `docs/redirect-map.md` v1 rules as Cloudflare Redirect Rules.
4. Keep the WordPress origin on a holding hostname for 30 days, then park it.
5. Search Console: add/verify the new property if needed; submit `https://coriolisagency.com/sitemap-index.xml`.

## After the flip

Update `C:\Dev\fflaccelerator\src\lib\links.ts` so `plans` and `contact` point at `/ecommerce` and `/contact` on this origin.
