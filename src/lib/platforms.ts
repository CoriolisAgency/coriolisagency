/**
 * Side-by-side for closed firearms storefronts vs owned Woo.
 * AmmoReady / Gearfire cells are restatements of this site's published copy.
 * FirearmCart: named because dealers compare it — we do not republish its fee
 * card or invent catalog / POS internals.
 */
export const PLATFORM_HEADERS = [
  "",
  "AmmoReady",
  "Gearfire",
  "FirearmCart",
  "Coriolis Woo",
] as const;

export const CLOSED_PLATFORM_ROWS = [
  [
    "What you own",
    "A login on their platform",
    "A login on their network",
    "Their storefront (their contract)",
    "The WooCommerce site, on your domain",
  ],
  [
    "Published price on this site",
    "Usage-priced (we do not republish their card)",
    "Network-priced (we do not republish their 2026 card)",
    "Not published here. Ask them.",
    "Minute Man $169 → Accelerator $569. Setup $500 or $2,500.",
  ],
  [
    "Dropshipping",
    "Manual or limited catalogs",
    "Their set",
    "Their terms, not republished here",
    "FFL Cockpit: 21 distributors, automated routing (Militia+)",
  ],
  [
    "POS",
    "Their register partner",
    "The register they already run",
    "Their pairing, not republished here",
    "Any POS that works with WooCommerce, such as AIM or GunBiz (Warlord+)",
  ],
  [
    "SEO",
    "Their URLs, their templates",
    "Their URLs, their templates",
    "Their chrome, not republished here",
    "Your slugs, your content, your schema",
  ],
  [
    "Exit",
    "Export what they allow",
    "Export what they allow",
    "Their export rules, not republished here",
    "Take the site. It is WooCommerce.",
  ],
  [
    "AmmoSeek / GunBroker",
    "Ask them",
    "Ask them",
    "Ask them",
    "Included on Militia+",
  ],
] as const;
