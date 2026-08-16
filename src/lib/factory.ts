import { LINKS } from "./links";

export interface FactoryPlate {
  id: string;
  name: string;
  urlLabel: string;
  href: string | null;
  job: string;
  proof: string;
  cta: string;
}

export const FACTORY_PLATES: FactoryPlate[] = [
  {
    id: "betsy",
    name: "Betsy AI",
    urlLabel: "2abetsy.com",
    href: LINKS.betsy,
    job: "Demand intelligence for the 2A web — what people came for, not bounce rate.",
    proof: "Purpose-built. Generic models refuse or lecture. She is not 4473 software and not a bound-book replacement.",
    cta: "Meet Betsy",
  },
  {
    id: "gse",
    name: "GunSearchEngine",
    urlLabel: "gunsearchengine.com",
    href: LINKS.gse,
    job: "Plain-English search over live multi-dealer inventory.",
    proof: "The public market where shopper language becomes a session — lists, restock alerts, and the feed OEMs read.",
    cta: "Search inventory",
  },
  {
    id: "gsa",
    name: "GunSearchAgent",
    urlLabel: "gunsearchagent.com",
    href: LINKS.gsa,
    job: "Google Analytics replacement for FFL and 2A websites.",
    proof: "On-site demand plus optional inventory sync. Core is free forever. Pro is included with FFL Accelerator.",
    cta: "Claim a free agent",
  },
  {
    id: "os",
    name: "Coriolis OS",
    urlLabel: "Company operating system",
    href: null,
    job: "The operating system we run the company on.",
    proof: "Companies, sites, Stripe, onboarding, and operator Betsy — Palantir-style ops software we built for ourselves. Not a customer login.",
    cta: "Internal — not a product SKU",
  },
  {
    id: "live",
    name: "Betsy Live",
    urlLabel: "gunsearchengine.com/betsy-live",
    href: LINKS.betsyLive,
    job: "Public, anonymized pulse of 2A search demand.",
    proof: "Map, intent cloud, and leaders. Search demand, not sell-through, and not NICS.",
    cta: "Open Betsy Live",
  },
  {
    id: "game",
    name: "Gun Store Game",
    urlLabel: "gunstoregame.com",
    href: LINKS.gunStoreGame,
    job: "A playable browser game that still has a job.",
    proof: "Runtime, intake, and an FFL board — a capability demo that funnels players to GunSearchAgent.",
    cta: "Play the shop",
  },
];

export const DI_PLANS = [
  {
    id: "insight",
    name: "Insight",
    for: "Brand managers",
    hook: "Full market · demand signals · 30 days",
    features: [
      "Full-market demand cloud, map, unmet, UPC, referrers",
      "Lookback up to 30 ET days",
      "Portal dashboard and intel API",
      "No session list or bulk export",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    for: "OEMs who need journeys",
    hook: "Full market · sessions · CSV · 60 days",
    featured: true,
    features: [
      "Everything in Insight",
      "Lookback up to 60 ET days",
      "Privacy-safe sessions list",
      "CSV session export (row-capped)",
    ],
  },
  {
    id: "platform",
    name: "Platform",
    for: "Manufacturers and distributors with analysts",
    hook: "Kitchen sink · JSON/CSV · unlimited",
    features: [
      "Everything in Growth",
      "Unlimited lookback",
      "JSON and CSV export",
      "Enterprise Co-Pilot (MCP) and linked warehouse Q&A",
    ],
  },
] as const;

export const DI_OUTCOMES = [
  "Demand forecasting and production planning with category context",
  "Assortment and pricing intelligence from real shopper language",
  "Ad and copy that matches how people search",
  "New-product validation — are they asking for this yet?",
  "Rising calibers and asked-for gaps before the register moves",
] as const;
