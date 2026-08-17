# Launch — coriolisagency.com (tomorrow)

Marketing flip only. Portal / Log in is **not** in this launch. Origin is **Vercel**. WordPress stays on a holding host.

## Tonight (before anyone touches DNS)

1. Push this repo. Create / confirm the Vercel project (`CoriolisAgency/coriolisagency`, Astro preset). Confirm the preview URL looks right.
2. In Vercel → Settings → Domains, add `coriolisagency.com`. Do **not** add `www` as a second production host. Copy the CNAME Vercel shows (often `cname.vercel-dns.com`).
3. Cloudflare, **before** changing apex:
   - Add a holding record, e.g. `wp.coriolisagency.com` → current WordPress origin. Load it. Bookmark it.
   - **Do not** change `trashpanda`, `class`, `t1`, `app`, or `checkout` DNS.
4. Import 301s (can be live now — destinations are full apex URLs, they only matter after the flip):
   - **Redirect Rule (Dynamic), first:**  
     If hostname equals `www.coriolisagency.com`  
     Then 301 to `concat("https://coriolisagency.com", http.request.uri.path)`  
     Preserve query string.
   - **Bulk Redirects:** import `scripts/cloudflare-bulk-redirects.csv` (apex paths only; www is the rule above). Status 301. List name e.g. `coriolis-wp-to-astro`.
5. SSL/TLS: **Full (strict)** after Vercel has issued the cert. If you flip while it is Flexible, you get a loop.

## Flip (5 minutes)

1. Cloudflare DNS, apex `coriolisagency.com`: CNAME to the Vercel target, **proxied** (orange).
2. `www`: CNAME to `coriolisagency.com`, proxied (the Redirect Rule sends it to apex).
3. Wait for Vercel → Domains to show the cert as valid.

## Immediately after

Incognito checks (expect **301 then 200**, no slash, apex):

| Hit | Land |
|-----|------|
| `https://www.coriolisagency.com/` | `https://coriolisagency.com/` |
| `https://www.coriolisagency.com/ffl-website-plans/` | `/ecommerce` |
| `https://www.coriolisagency.com/firearms-dropshipping/` | same path, apex |
| `https://www.coriolisagency.com/ffl-cockpit/` | same path |
| `https://www.coriolisagency.com/ammoready-alternative/` | same path |
| `https://www.coriolisagency.com/contact-the-coriolis-agency/` | `/contact` |
| `https://coriolisagency.com/ecommerce` | 200, plans visible |
| Contact form | opens `mailto:paul@coriolisagency.com` |
| `https://wp.coriolisagency.com/` | old WordPress still up |

Then:

1. Search Console (Domain property) → Sitemaps → `https://coriolisagency.com/sitemap-index.xml`
2. Deploy fflaccelerator if you have not: `plans` → `/ecommerce`, `coriolisSwitch` → `/ammoready-alternative` (already changed in `C:\Dev\fflaccelerator\src\lib\links.ts`).

## Do not

- Point the zone at GitHub Pages.
- 301 leftover blog URLs to `/`.
- Touch `trashpanda.coriolisagency.com`.
- Block launch on customer login. Header has no Log in on purpose.

## Rollback

Point apex CNAME back at the WordPress origin (or at `wp`). Bulk Redirects can stay; they will 301 into WP paths that 404 until you disable the list. Disable the Bulk Redirects list if you roll back for more than a few minutes.
