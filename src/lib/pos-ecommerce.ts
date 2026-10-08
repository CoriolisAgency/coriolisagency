/**
 * /gun-store-pos: the Gun Store POS pillar (OPS-29, decision 2026-10-08-gun-store-pos-pillar).
 * Coriolis builds the website and connects your POS. It does not build or sell a POS.
 */
import type { FaqItem } from "./faq";
import { LINKS } from "./links";

export const POS_PILLAR_TITLE =
  "Gun Store POS + WooCommerce: GunBiz and AIM | Coriolis";

export const POS_PILLAR_META =
  "Gun store POS, connected to your website. Coriolis promotes GunBiz POS and AIM POS: best-in-class POS systems with tested WooCommerce integrations. Both use FastBound.";

export const POS_PILLAR_EYEBROW = "Gun Store POS";

export const POS_PILLAR_H1 = "Gun store POS, connected to your website";

/** First ~80 words answer the query (lattice rule 2). */
export const POS_PILLAR_LEDE =
  "Keep your existing POS and connect it to your new website. For gun stores, Coriolis promotes two point-of-sale systems: GunBiz POS and AIM POS. Both are best-in-class POS systems with fully developed, tested and supported WooCommerce integrations, and both use FastBound for compliance. Coriolis builds the WooCommerce store on your domain and connects the register, so the counter and the website share one inventory. The POS company runs the register. You own the website.";

export type PosPillarCard = {
  name: string;
  slug: string;
  vendorHref: string;
  vendorLabel: string;
  body: string;
};

/** Main cards near the top: the two promoted POS systems. */
export const POS_PILLAR_PROMOTED: PosPillarCard[] = [
  {
    name: "GunBiz POS",
    slug: "gunbiz-pos",
    vendorHref: LINKS.gunbizPos,
    vendorLabel: "GunBizPOS.com",
    body: "A best-in-class gun store POS with a fully developed, tested and supported WooCommerce integration. GunBiz uses FastBound.",
  },
  {
    name: "AIM POS",
    slug: "aim-pos",
    vendorHref: LINKS.aimPos,
    vendorLabel: "AIM-POS.com",
    body: "A best-in-class gun store POS with a fully developed, tested and supported WooCommerce integration. AIM uses FastBound.",
  },
];

/** Smaller row lower on the page. */
export const POS_PILLAR_ALSO = [
  { name: "Trident 1 POS", slug: "trident-1-pos" },
  { name: "Rapid Gun Systems", slug: "rapid-gun-systems-pos" },
] as const;

export const POS_PILLAR_WHY_TITLE = "Best-in-class, not all-in-one";

export const POS_PILLAR_WHY =
  "You pick the best POS, the best website and the best compliance tool, and they connect. GunBiz or AIM runs the counter. FastBound keeps the bound book. Coriolis builds the WooCommerce store you own and wires it to the register, so each piece does its own job well and the website stays yours.";

/** Paul's copy points (verbatim), each with one plain line under it. */
export const POS_PILLAR_POINTS = [
  {
    title: "Keep your existing POS and connect it to your new website.",
    body: "If you already run GunBiz or AIM, keep it. Coriolis builds the new WooCommerce site and connects it to the register you have.",
  },
  {
    title:
      "Fully integrated POS, ecommerce, and automated email marketing for new gun stores.",
    body: "Opening a store? Start on GunBiz or AIM at the counter, connected to a WooCommerce store Coriolis builds, with automated email marketing on the site.",
  },
  {
    title:
      "GunSearchEngine.com Pro included (sync inventory to GSE and FFL Analytics).",
    body: "FFL Analytics is the Analytics page in the GunSearchEngine.com Dealer Dashboard, a GunSearchEngine.com feature for dealers.",
  },
] as const;

export const POS_PILLAR_FASTBOUND_TITLE = "FastBound and compliance";

export const POS_PILLAR_FASTBOUND =
  "FastBound runs the bound book and the 4473. GunBiz and AIM both use FastBound. Coriolis does not file the 4473, run NICS, or keep the bound book. Those stay with the systems licensed for them. This is not legal advice.";

export const POS_PILLAR_PLANS =
  "POS integration is part of the Warlord and FFL Accelerator plans.";

export const FAQ_POS_PILLAR: FaqItem[] = [
  {
    q: "Do I have to replace my POS?",
    a: "No. Keep your existing POS and connect it to your new website. Coriolis builds the WooCommerce store and connects the register you already run. We build the website, not the register.",
  },
  {
    q: "Which POS systems connect to WooCommerce?",
    a: "We promote GunBiz POS and AIM POS. Both have fully developed, tested and supported WooCommerce integrations, and both use FastBound. Trident 1 POS and Rapid Gun Systems also work with WooCommerce.",
  },
  {
    q: "Why do you promote GunBiz and AIM?",
    a: "They are best-in-class POS systems with fully developed, tested and supported WooCommerce integrations, and both use FastBound. You pick the best POS, the best website and the best compliance tool, and they connect.",
  },
  {
    q: "Does Coriolis handle the 4473, NICS or the bound book?",
    a: "No. FastBound runs the bound book and the 4473. Coriolis does not file the 4473, run NICS, or keep the bound book. This is not legal advice.",
  },
  {
    q: "Which plans include POS integration?",
    a: "Warlord and FFL Accelerator include API-based POS integration. Plans and prices are on the FFL Ecommerce page.",
  },
];
