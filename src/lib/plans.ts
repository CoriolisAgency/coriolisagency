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
    featured: true,
    includesFrom: "Militia",
    features: [
      "DNS & Email Administration",
      "SMTP Mail Server",
      "Advanced Search & Filter",
      "Google Analytics Admin",
      "VIP Support for: WordPress, WooCommerce, Custom Theme, AmmoSeek Data Feed, GunBroker Integration, All Other Plugins",
      "Free Email & Chat Support — One Hour Response Time",
    ],
  },
  {
    id: "warlord",
    name: "Warlord",
    price: 469,
    hook: "Add point-of-sale",
    includesFrom: "Gun Runner",
    features: [
      "API Based POS Integration: AIM Point of Sale, MicroBiz POS, Rapid Gun Systems, Trident 1 POS, Corestore POS",
      "Unlimited API Requests",
      "Unlimited Webhooks",
      "Concierge Onboarding",
    ],
  },
  {
    id: "ffl-accelerator",
    name: "FFL Accelerator",
    price: 569,
    hook: "Everything in the plans below it, plus",
    includesFrom: "the plans below it",
    features: [
      "GunSearchAgent.com Pro (Betsy on the shop)",
      "Page speed optimization",
      "Shopping cart optimization",
      "Advanced site monitoring",
      "Cloudflare DNS & CDN",
      "On-site technical SEO",
      "Email capture, list management, and campaign management (welcome, abandoned cart, back in stock, thank you)",
      "Unlimited hosting on WP Engine (Coriolis is a WP Engine agency partner)",
      "99.95% SLA",
      "VIP support Monday through Friday",
    ],
  },
];

export const SETUP = [
  {
    id: "basic" as const,
    name: "Basic Setup",
    price: 500,
    hook: "Branded Online Storefront",
    checkoutKey: "checkoutBasic" as const,
    features: [
      "WooCommerce Installation",
      "WooCommerce Configuration",
      "WooCommerce Custom Theme",
      "Custom Homepage Design",
      "Design Review and Revisions",
      "Advanced Search, Sort, and Filtering",
      "Pricing, Taxes, and Shipping Setup",
      "FFL Cockpit License & Configuration",
      "FFL Checkout License & Configuration",
      "Payment Gateway Installation",
      "Email Capture Implementation",
      "GunSearchAgent.com Setup (Free plan)",
      "DNS Configuration (Launch)",
      "Additional custom pages $125 each",
    ],
  },
  {
    id: "retail" as const,
    name: "Retail Setup",
    price: 2500,
    hook: "Full Custom Website",
    checkoutKey: "checkoutRetail" as const,
    features: [
      "Everything in Basic Setup",
      "Advanced Theme Customization & Content",
      "Up to ten (10) custom pages",
      "Unlimited revisions",
      "Complete Email Marketing Setup",
      "Email/CRM Platform Integration",
      "Custom Email Brand Kit",
      "Custom Email Template",
      "Welcome Email Series",
      "Abandoned Cart Series",
      "Back-In-Stock Notifications",
      "Email Deliverability Optimization",
      "Google Analytics Optimization",
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
  { name: "Freedom First Ammo", href: "https://freedomfirstammo.com/" },
  { name: "Crown Ridge Barrel Works", href: "https://crownridgebarrelworks.com/" },
  { name: "The Smoking Gun", href: "https://smokinggunstore.com/" },
  { name: "Frontline Firearms", href: "https://frontlinefirearmsco.com/" },
  { name: "First Light Guns", href: "https://firstlightguns.com/" },
  { name: "US AR Parts", href: "https://usarparts.com/" },
  { name: "EE & Arms", href: "https://eeandarms.com/" },
] as const;
