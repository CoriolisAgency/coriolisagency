export type PlanId =
  | "minute-man"
  | "militia"
  | "gun-runner"
  | "warlord"
  | "ffl-accelerator";

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  hook: string;
  featured?: boolean;
  includesFrom?: string;
  features: string[];
}

/** Monthly hosting ladder. Checkout is contact / onboarding — no Stripe buy buttons. */
export const PLANS: Plan[] = [
  {
    id: "minute-man",
    name: "Minute Man",
    price: 169,
    hook: "Sell your inventory",
    features: [
      "Custom website design",
      "Your custom domain",
      "Unlimited hosting, storage, and bandwidth",
      "Unlimited products and orders",
      "24×7 uptime monitoring",
      "On-demand paid support ($125 per incident)",
    ],
  },
  {
    id: "militia",
    name: "Militia",
    price: 269,
    hook: "Add dropshipping",
    includesFrom: "Minute Man",
    features: [
      "FFL Cockpit license",
      "FFL Checkout license",
      "21 distributor catalogs",
      "20-minute inventory updates",
      "Automated dropshipping",
      "AmmoSeek product feed",
      "GunBroker listing automation",
      "Free email support (24-hour response)",
    ],
  },
  {
    id: "gun-runner",
    name: "Gun Runner",
    price: 369,
    hook: "Add VIP support",
    includesFrom: "Militia",
    features: [
      "DNS and email hosting",
      "Advanced search and filter",
      "Analytics setup",
      "VIP support for WordPress, WooCommerce, theme, feeds, and plugins",
      "Email and chat support (one-hour response)",
    ],
  },
  {
    id: "warlord",
    name: "Warlord",
    price: 469,
    hook: "Add point-of-sale",
    includesFrom: "Gun Runner",
    features: [
      "Connect the register you already run. We wire AIM, MicroBiz, Rapid, Trident 1, or Corestore when that is the register on the floor.",
    ],
  },
  {
    id: "ffl-accelerator",
    name: "FFL Accelerator",
    price: 569,
    hook: "Add the full program",
    featured: true,
    includesFrom: "Warlord",
    features: [
      "Everything in Warlord, plus GunSearchAgent Pro. That is Betsy on their site. She answers search demand on the store. She is not a sell-through pitch and this page does not sell Demand Intelligence to OEMs.",
    ],
  },
];

export const SETUP = [
  {
    id: "basic" as const,
    name: "Basic Setup",
    price: 500,
    hook: "Branded online storefront",
    checkoutKey: "checkoutBasic" as const,
    features: [
      "WooCommerce install and configuration",
      "Custom theme and homepage design",
      "Design review and revisions",
      "Advanced search, sort, and filtering",
      "Pricing, taxes, and shipping setup",
      "FFL Cockpit and FFL Checkout configuration",
      "Payment gateway installation",
      "Email capture",
      "GunSearchAgent free setup",
      "DNS configuration at launch",
      "Additional custom pages $125 each",
    ],
  },
  {
    id: "retail" as const,
    name: "Retail Setup",
    price: 2500,
    hook: "Full custom website + email",
    checkoutKey: "checkoutRetail" as const,
    features: [
      "Everything in Basic Setup",
      "Advanced theme customization and content",
      "Up to ten custom pages",
      "Unlimited revisions",
      "Complete email marketing setup",
      "CRM integration, brand kit, and templates",
      "Welcome, abandoned-cart, and back-in-stock series",
      "Email deliverability optimization",
      "Google Analytics optimization",
    ],
  },
];

export const CAPABILITIES = [
  {
    title: "Own inventory or dropship",
    body: "Sell what you stock, stream up to 21 distributor catalogs, or run both. Automated lowest-cost fulfillment on Militia and above.",
  },
  {
    title: "POS when you need it",
    body: "Warlord and Accelerator connect the register you already run so the floor and the site stay in sync.",
  },
  {
    title: "Feeds that sell",
    body: "AmmoSeek product feed and GunBroker listing automation are included on Militia. They are not a separate project.",
  },
  {
    title: "Betsy on the domain",
    body: "Basic setup includes free GunSearchAgent. Accelerator includes Pro. Betsy lives on their site and answers search demand. This page is not an OEM product.",
  },
] as const;

export const CLIENTS = [
  { name: "The Range in McKinney", href: "https://store.therangeinmckinney.com/" },
  { name: "Robinson Armament", href: "https://robinsonarmament.com/" },
  { name: "Down Range Chico", href: "https://downrangechico.com/" },
  { name: "Reynolds Ranch & Farm", href: "https://reynoldsranchandfarm.com/" },
  { name: "Gun Pro", href: "https://www.gunpro.com/" },
  { name: "Freedom First Ammo", href: "https://freedomfirstammo.com/" },
  { name: "Crown Ridge Barrel Works", href: "https://crownridgebarrelworks.com/" },
  { name: "The Smoking Gun", href: "https://smokinggunstore.com/" },
  { name: "Frontline Firearms", href: "https://frontlinefirearmsco.com/" },
  { name: "First Light Guns", href: "https://firstlightguns.com/" },
  { name: "US AR Parts", href: "https://usarparts.com/" },
  { name: "EE & Arms", href: "https://eeandarms.com/" },
] as const;
