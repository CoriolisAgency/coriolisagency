# FFLFW-LANDING-1-0: /ffl-firewall for FFL Firewall 1.0.0

Row: FFLFW-LANDING-1-0 (coriolisagency). Done when: the live download is 1.0.0 with all three services.

## The launch switch (left OFF)

`src/lib/ffl-firewall-release.mjs` exports `FFLFW_V1_LIVE = false`. Paul's hard stop (9:15 AM ET Nov 23, 2026):
the zip swap and the noindex lift wait for his $79 test purchase (FFLF-FIREWALL-V1-S4). The 1.0.0 zip is also
rebuilt after FFLFW-CRAWLER-GRACE lands (board, FFLFW-RELEASE-1-0).

While `false` (today):
- `/ffl-firewall` is `noindex, nofollow`, off the sitemap, lastmod and IndexNow.
- Every Get FFL Firewall button and the download gate serve `downloads/ffl-firewall-0.1.3.zip`.

Flipping it to `true` (in one PR, after S4 passes):
1. Set `FFLFW_V1_LIVE = true`.
2. Add `public/downloads/ffl-firewall-1.0.0.zip` (the rebuilt 1.0.0 zip) and set `FFLFW_ZIP_V1_SHA256`.
3. Delete `Disallow: /ffl-firewall` (and its comment) from `public/robots.txt`.
4. Delete the `/ffl-firewall` `X-Robots-Tag` header block from `vercel.json`.
5. Remove the `FFLFW_V1_LIVE stays false` assertion in `scripts/test-ffl-firewall-landing.mjs` (it pins the switch off until S4).
6. Run `npm run lastmod:gen`.

Steps 2 to 4 are static files that can't read the flag; `scripts/test-ffl-firewall-landing.mjs` fails test:ci
if any of them disagrees with the flag, and it refuses `FFLFW_V1_LIVE = true` while any placeholder below remains.
Only `/ffl-firewall` changes; `/ffl-firewall/terms` and `/ffl-firewall/setup` keep their current treatment.

## Setup guide

`/ffl-firewall/setup` (`src/pages/ffl-firewall/setup.astro`): noindex, off the sitemap, lastmod and IndexNow,
linked once from the landing's download section. Structure only until Brandy's copy is cleared.

## Copy owed by Brandy (named placeholders)

Copy is Brandy's; Karp checks it against the locks. Each placeholder renders as `[[NAME]]` and lives in
`src/lib/ffl-firewall-pending-copy.mjs`. No vendor names (never name GSE), no "free".

Facts the copy must match (as shipped Nov 23, 2026):
- The plugin readme is 1.0.0. Price: $79 a month, unlimited OVERWATCH transactions, every service included.
- ACTIVE DEFENSE: with an active license, switching it on with the data disclosure ticked gets the store's
  site key automatically (FFLFW-ONBOARD-SITEKEY); a dealer can still paste a key, and a pasted key wins.
  The dashboard shows it active while the dealer embed was seen in the last 24 hours.
- Shared reputation feed: on by default for new installs only (while ACTIVE DEFENSE is on and the license is
  active); an existing install keeps its saved choice, and one that never chose stays off until switched on.
- Do not claim the SEO-crawler exemption or a 7-day past-due grace until FFLFW-CRAWLER-GRACE merges.

### /ffl-firewall (replaces lines that said "paste your site key")

| Placeholder | Where | Replaces / must say |
|---|---|---|
| `FFLFW_L10_AD_SERVICE_ON` | ACTIVE DEFENSE card, first sentence | Was: "Once you switch it on with your site key, the plugin adds the dealer embed for you, and from then on it stays on and keeps watching the traffic coming into your store." Now: switching it on gets the site key and adds the embed. |
| `FFLFW_L10_ACTIVATION_INTRO` | Activation section intro | Was: "...Once you turn it on and add your site key, the plugin takes care of the dealer embed..." Opt-in stays true. |
| `FFLFW_L10_STEP2_TITLE` | Activation step 2 title | Was: "Paste your site key". |
| `FFLFW_L10_STEP2_BODY` | Activation step 2 body | Was: "Paste your site key into the Site key field and save it, which is the only setup the service needs from you." Now: tick the data disclosure and save; the key arrives with an active license; pasting one still works. |
| `FFLFW_L10_FAQ_AD_OFF_LEAD` | FAQ "Why is ACTIVE DEFENSE off when I install the plugin?", first sentence | Was: "It only starts once you switch it on and add your site key, so you choose when bot and scraper control begins." |
| `FFLFW_L10_SETUP_LINK` | Download section, link to the setup guide | New link label. |

### /ffl-firewall/setup

| Placeholder | Must cover |
|---|---|
| `FFLFW_SETUP_META_TITLE` | Page title (browser tab). |
| `FFLFW_SETUP_META_DESCRIPTION` | Meta description. |
| `FFLFW_SETUP_EYEBROW` | Eyebrow above the H1. |
| `FFLFW_SETUP_H1` | H1. |
| `FFLFW_SETUP_INTRO` | Who it's for (WooCommerce FFL dealers) and what setup takes. |
| `FFLFW_SETUP_S1_TITLE` / `FFLFW_SETUP_S1_BODY` | Install: download the zip from /ffl-firewall, WordPress Plugins > Add New > Upload Plugin, activate. Unlicensed installs don't check carts; the built-in demo gives 10 test runs. |
| `FFLFW_SETUP_S2_TITLE` / `FFLFW_SETUP_S2_BODY` | License: buy ($79 a month), the key is emailed; WooCommerce > FFL Firewall, License tab, paste it and click Check key. |
| `FFLFW_SETUP_S3_TITLE` / `FFLFW_SETUP_S3_BODY` | OVERWATCH tab: switch it on; roster-state choice; results on classic and Blocks checkout. |
| `FFLFW_SETUP_S4_TITLE` / `FFLFW_SETUP_S4_BODY` | ACTIVE DEFENSE tab: switch on, tick the data disclosure, save; the site key arrives automatically with an active license; Check for script; active once the embed is seen (24 hours). |
| `FFLFW_SETUP_S5_TITLE` / `FFLFW_SETUP_S5_BODY` | Shared reputation feed: default-on for new installs only; existing no-choice installs off; switch any time; salted hashes, never shopper details. |
| `FFLFW_SETUP_S6_TITLE` / `FFLFW_SETUP_S6_BODY` | RECON tab: weekly and Run scan; WordPress.org versions and configuration gaps; reports only. |
| `FFLFW_SETUP_UPDATES_TITLE` / `FFLFW_SETUP_UPDATES_BODY` | Updates show in the WordPress Plugins screen (FFLFW-UPDATER). |
| `FFLFW_SETUP_HELP_TITLE` / `FFLFW_SETUP_HELP_BODY` | Help; support@coriolisagency.com is already on the page. |
| `FFLFW_SETUP_BACK_LINK` | Link back to /ffl-firewall. |

### Outside this repo

- `FFLFW_STRIPE_PRODUCT_DESCRIPTION`: the Stripe product description for the $79/month FFL Firewall product
  (row scope). Brandy writes it, Karp checks it; applying it in Stripe is a separate step once cleared.
