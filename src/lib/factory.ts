import { LINKS } from "./links";

/** A proof line part: plain text, or a same-site link. */
export type ProofPart = string | { label: string; href: string };

export interface StudioProof {
  id: string;
  name: string;
  urlLabel: string;
  href: string | null;
  job: string;
  proof?: string | ProofPart[];
  cta: string;
}

/** Shipped work we point to — not a product aisle. */
export const STUDIO_PROOF: StudioProof[] = [
  {
    id: "botopticon",
    name: "Botopticon",
    urlLabel: "botopticon.com",
    href: LINKS.botopticon,
    job: "The control room for your AI agents. See what every bot is doing and step in when it matters.",
    cta: "Visit Botopticon.com",
  },
  {
    id: "gsa",
    name: "GunSearchEngine.com",
    urlLabel: "gunsearchengine.com/for-dealers",
    href: LINKS.gsa,
    job: "Google Analytics replacement for FFL websites.",
    proof:
      "On-site demand plus optional inventory sync. GSE Basic is free forever. FFL Analytics and FFL Search Console included, no Pro required. Pro ships with FFL Accelerator.",
    cta: "For dealers",
  },
  {
    id: "di",
    name: "Demand Intelligence",
    urlLabel: "coriolisagency.com/demand-intelligence",
    href: LINKS.demandIntel,
    job: "Full-market search intent for OEMs, distributors, and brands.",
    proof: [
      "What shoppers searched for, including what they couldn't find. ",
      { label: "Book a demo", href: LINKS.demandDemo },
      ". The dashboard and API run on GunSearchEngine.com.",
    ],
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
