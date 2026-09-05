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
    name: "Betsy AI",
    urlLabel: "2abetsy.com",
    href: LINKS.betsy,
    job: "Shows what people searched on the dealer site — including empty searches. Not bounce rate cosplay.",
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
