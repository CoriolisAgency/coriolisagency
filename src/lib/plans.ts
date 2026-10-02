export type PlanId =
  | "minute-man"
  | "militia"
  | "gun-runner"
  | "warlord"
  | "ffl-accelerator";

export type PlanFeature = string | { label: string; items: string[] };

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  hook: string;
  featured?: boolean;
  includesFrom?: string;
  description?: string;
  bullets?: "bullet-holes";
  features: PlanFeature[];
}

/** Monthly hosting ladder. Checkout is contact / onboarding — no Stripe buy buttons. */
export const PLANS: Plan[] = [
  {
    id: "minute-man",
    name: "Minute Man",
    price: 169,
    hook: "Your inventory",
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
    hook: "Add VIP Support",
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
    hook: "Add Jet Fuel",
    includesFrom: "Warlord",
    description:
      "A single, all-in-one, managed ecommerce plan. It includes hosting, site design (Basic or Retail), VIP support, POS integration (any POS), email automation, and analytics (Google Analytics, Google Search Console, GunSearchEngine.com, and email/SMS).",
    bullets: "bullet-holes",
    features: [
      "GunSearchEngine.com Pro",
      "Page speed optimization (EverCache)",
      "Shopping cart optimization (LiveCart)",
      "Advanced site monitoring (Uptime Robot)",
      "Cloudflare Web Rules (bot mitigation)",
      "On-site email capture optimization",
      {
        label: "Automated email campaigns",
        items: [
          "Welcome",
          "Back In Stock",
          "Browse Abandonment",
          "Thank You for Purchase",
          "Abandoned Cart",
        ],
      },
      "SLA with 99.95% uptime guarantee",
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
      "GunSearchEngine.com setup (free plan)",
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
    body: "Basic setup includes free GunSearchEngine.com. Accelerator includes Betsy on the shop. Betsy lives on their site and answers search demand. This page is not an OEM product.",
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
