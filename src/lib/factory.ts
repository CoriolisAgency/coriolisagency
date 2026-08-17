import { LINKS } from "./links";

export interface StudioProof {
  id: string;
  name: string;
  urlLabel: string;
  href: string | null;
  job: string;
  proof: string;
  cta: string;
}

/** Shipped work we point to — not a product aisle. */
export const STUDIO_PROOF: StudioProof[] = [
  {
    id: "betsy",
    name: "Betsy",
    urlLabel: "2abetsy.com",
    href: LINKS.betsy,
    job: "Demand intelligence for dealer sites — what people came for, not bounce rate.",
    proof:
      "Built for this market. Live on GunSearchEngine embeds and dealer sites. Not 4473 software.",
    cta: "Meet Betsy",
  },
  {
    id: "gsa",
    name: "GunSearchAgent",
    urlLabel: "gunsearchagent.com",
    href: LINKS.gsa,
    job: "Google Analytics replacement for FFL websites.",
    proof:
      "On-site demand plus optional inventory sync. Core is free forever. Pro ships with FFL Accelerator.",
    cta: "Claim a free agent",
  },
  {
    id: "di",
    name: "Demand Intelligence",
    urlLabel: "gunsearchengine.com",
    href: LINKS.demandIntel,
    job: "Full-market search intent for OEMs, distributors, and brands.",
    proof:
      "What the market asked for — including what it could not find. Portal, demo, API, and Co-Pilot on GunSearchEngine.",
    cta: "See Demand Intelligence",
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
