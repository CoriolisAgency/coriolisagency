/**
 * /gun-store-pos: the Gun Store POS integration pillar (SEO-U29, D-N1).
 * Copy is Brandy's FINAL plus PAUL-0901: Warlord connects any POS that works with WooCommerce,
 * with four named as examples. Two-way sync. FAQ 6 is in. No register-check line.
 */
import type { FaqItem } from "./faq";
import { LINKS } from "./links";

export const POS_PILLAR_TITLE =
  "Gun Store POS Integration for WooCommerce | Coriolis";

export const POS_PILLAR_META =
  "Gun store POS integration on the Warlord plan, $469 a month. Keep the register you already run. Coriolis connects it to the WooCommerce website you own.";

export const POS_PILLAR_EYEBROW = "Gun Store POS";

export const POS_PILLAR_H1 =
  "Gun store POS integration: keep your register, connect your website";

/** Opening: first <p> after the H1. */
export const POS_PILLAR_LEDE =
  "Gun store POS integration means the register you already run and your WooCommerce website share one inventory. On the Warlord plan, $469 a month, Coriolis builds the store on your domain and connects your POS through an API-based integration, so the floor and the site stay in sync. Warlord connects any POS that works with WooCommerce, including AIM, GunBiz, Rapid Gun Systems and Trident 1. The POS company runs the register, and you own the website.";

export const POS_PILLAR_JUMP = "Tell us which POS you run";

export const POS_PILLAR_HERO_ALT =
  "Gun store counter with the register and online shop staying in sync";

export const POS_PILLAR_CONNECT_TITLE = "Connect the POS you already run";

export const POS_PILLAR_CONNECT_INTRO =
  "Keep the register at your counter. Coriolis connects it to the WooCommerce store we build for you.";

export type PosPillarCard = {
  name: string;
  slug: string;
  linkLabel: string;
  vendorHref: string;
  vendorLabel: string;
  body: string;
  note?: string;
  noteLink?: { href: string; label: string };
};

/** Equal list of the four POS pages (Paul 10:35 AM ET 10/27). */
export const POS_PILLAR_CARDS: PosPillarCard[] = [
  {
    name: "AIM POS",
    slug: "aim-pos",
    linkLabel: "WooCommerce for AIM",
    vendorHref: LINKS.aimPos,
    vendorLabel: "AIM-POS.com",
    body: "A gun store POS with a fully developed, tested and supported WooCommerce integration. AIM uses FastBound.",
    note: "Coriolis announced its AIM POS partnership in April 2026. In September 2026, five FFL shops (Naples Gun Shop, Down Range Chico, Lawful Defense, 2A Firearms and The Range in McKinney) announced they run AIM POS with a WooCommerce store they own, built by Coriolis on FFL Accelerator.",
    noteLink: {
      href: "press/five-ffls-choose-coriolis-for-aim-pos-integration",
      label: "Read the release",
    },
  },
  {
    name: "Rapid Gun Systems",
    slug: "rapid-gun-systems-pos",
    linkLabel: "WooCommerce for Rapid",
    vendorHref: "https://rapidgunsystems.com",
    vendorLabel: "RapidGunSystems.com",
    body: "A gun store POS with a tested, supported WooCommerce integration. Rapid syncs products, prices and stock to the site, and web orders flow back for picking.",
  },
  {
    name: "GunBiz POS",
    slug: "gunbiz-pos",
    linkLabel: "WooCommerce for GunBiz",
    vendorHref: LINKS.gunbizPos,
    vendorLabel: "GunBizPOS.com",
    body: "A gun store POS with a fully developed, tested and supported WooCommerce integration. GunBiz uses FastBound.",
  },
  {
    name: "Trident 1 POS",
    slug: "trident-1-pos",
    linkLabel: "WooCommerce for Trident 1",
    vendorHref: "https://trident1pos.com",
    vendorLabel: "Trident1POS.com",
    body: "A gun store and range POS with a WooCommerce integration. Products and stock publish from Trident 1, and lane reservations, memberships and classes go on the site.",
  },
];

export const POS_PILLAR_MARKS = "Marks of their owners.";

/** ItemList of the POS systems, built from the same constants as the visible cards. */
export function posPillarItemList(home: string) {
  const items = POS_PILLAR_CARDS;
  return {
    "@type": "ItemList",
    "@id": `${home}/gun-store-pos#pos-list`,
    name: "Examples of POS systems that connect to your website on the Warlord plan",
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: items.length,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.linkLabel,
      url: `${home}/${p.slug}`,
    })),
  };
}

export const POS_PILLAR_HOW_TITLE = "How gun store POS integration works";

export const POS_PILLAR_HOW = [
  "Coriolis builds the WooCommerce store on your domain and connects it to your register through an API-based integration. The register and the website sync both ways. Warlord includes unlimited API requests and webhooks. The counter and the website share one inventory, so the floor and the site stay in sync.",
  "The POS company runs the register. You own the website.",
] as const;

export const POS_PILLAR_OPENING_TITLE = "Opening a gun store?";

export const POS_PILLAR_OPENING =
  "Start with the register you already run. Coriolis connects it to the WooCommerce store we build.";

export const POS_PILLAR_PLAN_TITLE = "Which plan includes POS integration";

export const POS_PILLAR_PLAN =
  "Gun store POS integration is part of the Warlord plan at $469 a month. FFL Accelerator, at $569 a month, includes everything in Warlord, so it connects your register too. Setup is Basic Setup at $500 for a clean launch, or Retail Setup at $2,500 for the full custom site and email. There\u2019s no annual contract, and if you walk, you take the website.";

export const POS_PILLAR_WHY_TITLE = "Each piece does its own job";

export const POS_PILLAR_WHY =
  "You pick the POS, the website and the compliance tool, and they connect. The POS you choose runs the counter. FastBound keeps the bound book where the register uses it. Coriolis builds the WooCommerce store you own and wires it to your register.";

export const POS_PILLAR_FASTBOUND_TITLE = "FastBound and compliance";

export const POS_PILLAR_FASTBOUND =
  "FastBound runs the bound book and the 4473 for the POS systems that use it, including GunBiz, AIM and Trident 1. Coriolis doesn\u2019t file the 4473, run NICS or keep the bound book. Those stay with the systems licensed for them. This is not legal advice.";

export const POS_PILLAR_FORM_HEADING = "Tell us which POS you run";

export const POS_PILLAR_FORM_LINE =
  "Tell us which POS you run, or plan to run, and what the website needs to do. No contract, and you can cancel any time. Paul answers.";

/** FAQ 1-6 from FINAL, in order. FAQ 6 approved by Paul 10/21. */
export const FAQ_POS_PILLAR: FaqItem[] = [
  {
    q: "What is gun store POS integration?",
    a: "It\u2019s a connection between the register you already run and your WooCommerce website, so the counter and the website share one inventory. Coriolis builds the store on your domain and connects the register through an API-based integration. The register and the website sync both ways.",
  },
  {
    q: "Which POS systems integrate with my website?",
    a: "On the Warlord plan, Coriolis connects any POS that works with WooCommerce. AIM, Rapid Gun Systems, GunBiz and Trident 1 each have a WooCommerce page. All four sit on Gun Store POS.",
  },
  {
    q: "Which plan includes POS integration, and what does it cost?",
    a: "Warlord includes it at $469 a month. FFL Accelerator, at $569 a month, includes everything in Warlord, so it connects your register too. Setup is Basic Setup at $500 or Retail Setup at $2,500, and there\u2019s no annual contract.",
  },
  {
    q: "Do I have to switch POS systems to get a website?",
    a: "No. Keep the register you already run, and Coriolis connects your website to it.",
  },
  {
    q: "Does Coriolis handle the 4473, NICS or the bound book?",
    a: "No. FastBound runs the bound book and the 4473 for the POS systems that use it, including GunBiz, AIM and Trident 1. Coriolis doesn\u2019t file the 4473, run NICS or keep the bound book. This is not legal advice.",
  },
  {
    q: "Does inventory sync both ways?",
    a: "Yes. The register and the website sync both ways, for any POS that works with WooCommerce. The counter and the website share one inventory, and Warlord includes unlimited API requests and webhooks.",
  },
];
