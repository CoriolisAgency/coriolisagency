# Launch — coriolisagency.com

Marketing flip. Portal / Log in is **not** in this launch. Origin is **Vercel**. WordPress stays on a holding host.

Cloudflare is **DNS-only** (grey cloud). Vercel security stays in front. Do **not** proxy through Cloudflare — Bulk Redirect lists do not fire in DNS-only mode.

## Path 301s (Vercel)

Old WordPress paths → new Astro slugs live in **`vercel.json`** (`permanent: true`). Source of truth for the map is still documented in `docs/redirect-map.md`; `scripts/cloudflare-bulk-redirects.csv` is a reference export only (not the runtime).

Priority check: `/ffl-website-plans` → `/ecommerce`.

## Before DNS (historical checklist)

1. Push this repo. Create / confirm the Vercel project (`CoriolisAgency/coriolisagency`, Astro preset). Confirm the preview URL looks right.
2. In Vercel → Settings → Domains, add **`www.coriolisagency.com` as the production host** and `coriolisagency.com` as a 308/301 to www. Copy the CNAME Vercel shows (often `cname.vercel-dns.com`). Live already 308s apex → www (checked 2026-09-19).
3. Cloudflare, **before** changing apex:
   - Add a holding record, e.g. `wp.coriolisagency.com` → current WordPress origin. Load it. Bookmark it.
   - **Do not** change `trashpanda`, `class`, `t1`, `app`, or `checkout` DNS.
4. **apex → www:** preferred host is `www` (GSC: 1,426 of 1,441 clicks on www). Vercel project domains should 308/301 apex → www. `vercel.json` also has a host-conditioned 301 (`has.host = coriolisagency.com`). Path 301s stay in `vercel.json` either way.
5. SSL: Vercel issues the cert for the apex. Do not leave the zone on Flexible TLS if anything is still proxied.

## Flip (5 minutes)

1. Cloudflare DNS, apex `coriolisagency.com`: CNAME to the Vercel target, **DNS-only** (grey cloud — not proxied).
2. `www`: CNAME to the Vercel target, DNS-only; ensure apex 301s/308s to www.
3. Wait for Vercel → Domains to show the cert as valid.

## Immediately after

Incognito checks (expect **301/308 then 200**, no slash, **www**):

| Hit | Land |
|-----|------|
| `https://coriolisagency.com/` | `https://www.coriolisagency.com/` |
| `https://www.coriolisagency.com/ffl-website-plans/` | `/ecommerce` |
| `https://coriolisagency.com/ffl-website-plans` | www `/ecommerce` |
| `https://www.coriolisagency.com/firearms-dropshipping/` | same path, www |
| `https://www.coriolisagency.com/ffl-cockpit/` | same path |
| `https://www.coriolisagency.com/ammoready-alternative/` | same path |
| `https://www.coriolisagency.com/gearfire-alternative/` | 200 (pillar) |
| `https://www.coriolisagency.com/contact-the-coriolis-agency/` | `/contact` |
| `https://www.coriolisagency.com/ecommerce` | 200, plans visible |
| Contact form | opens `mailto:paul@coriolisagency.com` |
| `https://wp.coriolisagency.com/` | old WordPress still up |

Then:

1. Search Console (Domain property) → Sitemaps → `https://www.coriolisagency.com/sitemap-index.xml` (`/sitemap.xml` is a rewrite alias of that same index).
2. Deploy fflaccelerator if you have not: `plans` → `/ecommerce`, AmmoReady switch → `/ammoready-alternative`, Gearfire switch → `/gearfire-alternative`.

## Do not

- Point the zone at GitHub Pages.
- Proxy the apex through Cloudflare (orange cloud) for this cutover.
- 301 leftover blog URLs to `/`.
- Touch `trashpanda.coriolisagency.com`.
- Block launch on customer login. Header has no Log in on purpose.

## Rollback

Point apex CNAME back at the WordPress origin (or at `wp`). Path 301s in `vercel.json` only apply while the site is on Vercel.
