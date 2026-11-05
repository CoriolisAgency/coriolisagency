/**
 * Side-by-side for closed firearms storefronts vs owned Woo.
 * AmmoReady / Gearfire cells are restatements of this site's published copy.
 */
export const PLATFORM_HEADERS = [
  "",
  "AmmoReady",
  "Gearfire",
  "Coriolis Woo",
] as const;

export const CLOSED_PLATFORM_ROWS = [
  [
    "What you own",
    "A login on their platform",
    "A login on their network",
    "The WooCommerce site, on your domain",
  ],
  [
    "Published price on this site",
    "Usage-priced (we do not republish their card)",
    "Network-priced (we do not republish their 2026 card)",
    "Minute Man $169 → Accelerator $569. Setup $500 or $2,500.",
  ],
  [
    "Dropshipping",
    "Manual or limited catalogs",
    "Their set",
    "FFL Cockpit: 21 distributors, automated routing (Militia+)",
  ],
  [
    "POS",
    "Their register partner",
    "The register they already run",
    "Any POS that works with WooCommerce, such as AIM or GunBiz (Warlord+)",
  ],
  [
    "SEO",
    "Their URLs, their templates",
    "Their URLs, their templates",
    "Your slugs, your content, your schema",
  ],
  [
    "Exit",
    "Export what they allow",
    "Export what they allow",
    "Take the site. It is WooCommerce.",
  ],
  [
    "AmmoSeek / GunBroker",
    "Ask them",
    "Ask them",
    "Included on Militia+",
  ],
] as const;
