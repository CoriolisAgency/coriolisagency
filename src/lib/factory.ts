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
    proof: "Built for this market. She is not 4473 software and not a bound-book replacement.",
    cta: "Meet Betsy",
  },
  {
    id: "gse",
    name: "GunSearchEngine",
    urlLabel: "gunsearchengine.com",
    href: LINKS.gse,
    job: "Plain-English search over live multi-dealer inventory.",
    proof: "Shoppers search in plain English. Dealers get found. Brands see the demand.",
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
    job: "The system we run Coriolis on.",
    proof: "Companies, sites, billing, and onboarding — software we built for ourselves. Not something you log into.",
    cta: "Internal — not for sale",
  },
  {
    id: "live",
    name: "Betsy Live",
    urlLabel: "gunsearchengine.com/betsy-live",
    href: LINKS.betsyLive,
    job: "Public, anonymized pulse of 2A search demand.",
    proof: "Map, trending searches, and leaders. Search demand, not sell-through, and not NICS.",
    cta: "Open Betsy Live",
  },
  {
    id: "game",
    name: "Gun Store Game",
    urlLabel: "gunstoregame.com",
    href: LINKS.gunStoreGame,
    job: "A browser game that sends players to real FFL inventory.",
    proof: "Play it. Then find a shop that actually has the gun.",
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
      "Full-market demand: map, unmet searches, UPC, referrers",
      "Up to 30 days of history",
      "Dashboard and API",
      "No session list or bulk export",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    for: "OEMs who need shopper paths",
    hook: "Full market · sessions · CSV · 60 days",
    featured: true,
    features: [
      "Everything in Insight",
      "Up to 60 days of history",
      "Anonymized session list",
      "CSV export",
    ],
  },
  {
    id: "platform",
    name: "Platform",
    for: "Manufacturers and distributors with analysts",
    hook: "Full history · export · warehouse",
    features: [
      "Everything in Growth",
      "Unlimited history",
      "JSON and CSV export",
      "Enterprise Co-Pilot, plus warehouse questions when a feed is linked",
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
