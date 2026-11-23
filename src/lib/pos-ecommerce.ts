/**
 * /gun-store-pos: the Gun Store POS integration pillar (SEO-U29, D-N1).
 * Copy is Brandy's FINAL plus PAUL-0901: Warlord connects any POS that works with WooCommerce,
 * with four named as examples. Two-way sync. FAQ 6 is in. No register-check line.
 */
import type { FaqItem } from "./faq";
import { LINKS } from "./links";
import { faqMd } from "./md";

export const POS_PILLAR_TITLE =
  "Gun Store POS Integration for WooCommerce | Coriolis";

export const POS_PILLAR_META =
  "Gun store POS integration on the Warlord plan, $469 a month. Keep the register you already run. Coriolis connects it to the WooCommerce website you own.";

export const POS_PILLAR_EYEBROW = "Gun Store POS";

export const POS_PILLAR_H1 =
  "Gun store POS integration: keep your register, connect your website";

// CA-VOICE-P1 batch 1 (Paul yes via Chief, 2026-11-10 12:49 PM ET): body copy from batch-1/gun-store-pos.md, as drafted.
/** Opening: first <p> after the H1. */
export const POS_PILLAR_LEDE = "Gun store POS integration means the register you already run and your WooCommerce website share one inventory. Coriolis builds the store on your domain and connects your POS through an API-based integration, so the floor and the site stay in sync, and it's on the Warlord plan at $469 a month. Warlord connects any POS that works with WooCommerce, including AIM, MicroBiz, Rapid Gun Systems and Trident 1. The POS company runs the register, and you own the website.";
export const POS_PILLAR_PROOF_LINE = "Coriolis has 100+ clients and a [5-star Google rating](https://www.trustindex.io/reviews/coriolisagency.com), and is a member of NSSF, FPC and GOA.";

/**
 * SEO-REFRESH-P1 (Brandy 2026-11-10, Paul 8:06 AM ET): "Which POS do you run?" table.
 * Cells are inline markdown. AIM and Trident 1 "comes back" cells were PENDING and are blank.
 */
export const POS_PILLAR_TABLE_TITLE = "Which POS do you run?";
export const POS_PILLAR_TABLE_INTRO = "Tell us which POS you run and we'll show you how it connects to the site.";
const POS_TABLE = [["Your POS","What goes to the website","What comes back to the POS","Plan"],["[AIM POS](/aim-pos)","Inventory syncs from AIM automatically","Not listed*","Warlord or FFL Accelerator"],["[MicroBiz POS](/microbiz-pos) (includes GunBiz POS)","New products and price changes. Sold-out items update right away. Other stock changes go up in a daily batch.","Web orders land in MicroBiz Order Management with items, taxes and payment. New buyers get a customer record.","Warlord or FFL Accelerator"],["[Rapid Gun Systems](/rapid-gun-systems-pos)","Product details, retail price and available stock","Web orders come back to Rapid for picking","Warlord or FFL Accelerator"],["[Trident 1 POS](/trident-1-pos)","Products, stock and the price field you set as the eCommerce price. Lane bookings, memberships and classes go on the site.","Not listed*","Warlord or FFL Accelerator"],["Another POS that works with WooCommerce","Depends on the POS. Tell us which one you run.","Depends on the POS","Warlord or FFL Accelerator"]];
export const POS_PILLAR_TABLE_HEAD = POS_TABLE[0];
export const POS_PILLAR_TABLE_ROWS = POS_TABLE.slice(1) as unknown as readonly (readonly [string, string, string, string])[];
export const POS_PILLAR_TABLE_FOOTNOTE = "*Not listed on the source page we read November 10, 2026.";
export const POS_PILLAR_TABLE_NOTE = "Every row comes from that POS's page on this site, and marks belong to their owners.";

export const POS_PILLAR_PROOF_TITLE = "Shops already running a Coriolis store connected to the register they already had";
export const POS_PILLAR_PROOF: readonly string[] = ["[Naples Gun Shop](/case-studies/naples-gun-shop), on AIM POS, is a full-line gun shop in Southwest Florida. Coriolis built its WooCommerce store on naplesgunshop.net and connected it to the AIM POS on the counter, so the website and the counter work from the same system; the [Naples Gun Shop case study](/case-studies/naples-gun-shop) has the full story.", "[Target Shotguns](/case-studies/target-shotguns), on MicroBiz POS, is a shotgun specialist whose store Coriolis built on targetshotguns.com and connected to MicroBiz POS, with drop ship items in their own marked area, apart from in-store stock; the [Target Shotguns case study](/case-studies/target-shotguns) has the full story.", "The September 2026 AIM announcement, including Naples Gun Shop, Down Range Chico, Lawful Defense, 2A Firearms and The Range in McKinney, is in the AIM card above and in [the release](/press/five-ffls-choose-coriolis-for-aim-pos-integration)."];

export const POS_PILLAR_PLAN_LINKS = "See [FFL ecommerce plans](/ecommerce#pos) and [what an FFL website costs](/ffl-website-cost). If you want distributor stock next to your shelf stock, add [FFL dropshipping](/firearms-dropshipping).";

export const POS_PILLAR_CLOSING = "Coriolis doesn't sell a POS. We connect the one you already run.";

export const POS_PILLAR_JUMP = "Tell us which POS you run";

export const POS_PILLAR_HERO_ALT =
  "Gun store counter with the register and online shop staying in sync";

export const POS_PILLAR_CONNECT_TITLE = "Keep the register at your counter, and connect the store we build";

export const POS_PILLAR_CONNECT_INTRO = "Keep the register at your counter, and Coriolis connects it to the WooCommerce store we build for you.";

/** Card copy as drafted: "**[Name](/slug).** body [Woo link] · [vendor link]". */
export const POS_PILLAR_CARD_COPY: readonly string[] = ["**[AIM POS](/aim-pos).** AIM uses FastBound and has a WooCommerce integration. Coriolis announced its AIM POS partnership in April 2026. In September 2026, five FFL shops (Naples Gun Shop, Down Range Chico, Lawful Defense, 2A Firearms and The Range in McKinney) announced they run AIM POS with a WooCommerce store they own, built by Coriolis on FFL Accelerator. [Read the release](/press/five-ffls-choose-coriolis-for-aim-pos-integration). [WooCommerce for AIM](/aim-pos) · [AIM-POS.com](https://aim-pos.com)","**[Rapid Gun Systems](/rapid-gun-systems-pos).** Rapid syncs products, prices and stock to the site, and web orders flow back for picking. [WooCommerce for Rapid](/rapid-gun-systems-pos) · [RapidGunSystems.com](https://rapidgunsystems.com)","**[MicroBiz POS](/microbiz-pos).** MicroBiz uses FastBound and publishes to WooCommerce. [WooCommerce for MicroBiz](/microbiz-pos) · [MicroBiz](https://www.microbiz.com)","**[Trident 1 POS](/trident-1-pos).** Trident 1 is a gun store and range register with a WooCommerce integration. Products and stock publish from Trident 1, and lane reservations, memberships and classes go on the site. [WooCommerce for Trident 1](/trident-1-pos) · [Trident1POS.com](https://trident1pos.com)"];

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
    name: "MicroBiz POS",
    slug: "microbiz-pos",
    linkLabel: "WooCommerce for MicroBiz",
    vendorHref: LINKS.microbizPos,
    vendorLabel: "MicroBiz",
    body: "A gun store POS with a fully developed, tested and supported WooCommerce integration. MicroBiz uses FastBound.",
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

export const POS_PILLAR_MARKS = "POS names and marks in this section belong to their owners, as they do in the table above.";

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

export const POS_PILLAR_HOW_TITLE = "How the register and the website share inventory on Warlord";

export const POS_PILLAR_HOW = ["Coriolis builds the WooCommerce store on your domain and connects it to your register through an API-based integration, and the register and the website sync both ways. Warlord includes unlimited API requests and webhooks, so the counter and the website share one inventory and the floor and the site stay in sync. The POS company runs the register, and you own the website.", "If you're opening a gun store, start with the register you already run, and Coriolis connects it to the WooCommerce store we build."] as const;

export const POS_PILLAR_OPENING_TITLE = "Opening a gun store?";

export const POS_PILLAR_OPENING =
  "Start with the register you already run. Coriolis connects it to the WooCommerce store we build.";

export const POS_PILLAR_PLAN_TITLE = "Which plan includes POS integration, and what you pay for it";

export const POS_PILLAR_PLAN = "Gun store POS integration is part of the Warlord plan at $469 a month. FFL Accelerator, at $569 a month, includes everything in Warlord, so it connects your register too. Setup is Basic Setup at $500 for a clean launch, or Retail Setup at $2,500 for the full custom site and email, and there's no annual contract, and if you walk, you take the website.";

export const POS_PILLAR_PLAN_BOOKS = "You pick the POS, the website and the tool that keeps the bound book, and they connect. The POS you choose runs the counter, and FastBound runs the bound book and the 4473 for the POS systems that use it, including MicroBiz, AIM and Trident 1. Coriolis builds the WooCommerce store you own and wires it to your register. Coriolis doesn't file the 4473, run NICS or keep the bound book; those stay with the systems licensed for them, and this is not legal advice.";
export const POS_PILLAR_FAQ_TITLE = "The questions dealers ask about connecting a gun store POS";

export const POS_PILLAR_WHY_TITLE = "Each piece does its own job";

export const POS_PILLAR_WHY =
  "You pick the POS, the website and the compliance tool, and they connect. The POS you choose runs the counter. FastBound keeps the bound book where the register uses it. Coriolis builds the WooCommerce store you own and wires it to your register.";

export const POS_PILLAR_FASTBOUND_TITLE = "FastBound and compliance";

export const POS_PILLAR_FASTBOUND =
  "FastBound runs the bound book and the 4473 for the POS systems that use it, including MicroBiz, AIM and Trident 1. Coriolis doesn\u2019t file the 4473, run NICS or keep the bound book. Those stay with the systems licensed for them. This is not legal advice.";

export const POS_PILLAR_FORM_HEADING = "Tell us about the website you want and we'll make it happen.";
export const POS_PILLAR_FORM_CONTACT = "You can also reach us at [(279) 258-6771](tel:+12792586771) or [support@coriolisagency.com](mailto:support@coriolisagency.com).";

export const POS_PILLAR_FORM_LINE = "We build, host, and support your open source WooCommerce website. There is no contract and you can cancel at any time.";

/** FAQ 1-6 from FINAL, in order. FAQ 6 approved by Paul 10/21. */
export const FAQ_POS_PILLAR: FaqItem[] = [
  faqMd("What is gun store POS integration?", "It's a connection between the register you already run and your WooCommerce website, built on your domain, through an API, so inventory stays in one place."),
  faqMd("Which POS systems integrate with my website?", "On the Warlord plan, Coriolis connects any POS that works with WooCommerce. AIM, Rapid Gun Systems, MicroBiz and Trident 1 each have a WooCommerce page, and all four sit on this page."),
  faqMd("Which plan includes POS integration, and what does it cost?", "Warlord includes it at $469 a month, and FFL Accelerator, at $569 a month, includes everything in Warlord. Setup is Basic Setup at $500 or Retail Setup at $2,500, and there's no annual contract."),
  faqMd("Do I have to switch POS systems to get a website?", "No. Keep the register you already run, and Coriolis connects your website to it."),
  faqMd("Does Coriolis handle the 4473, NICS or the bound book?", "No. That work stays with FastBound and the POS systems that use it, including MicroBiz, AIM and Trident 1, as described in the section above."),
  faqMd("Does inventory sync both ways?", "Yes, for any POS that works with WooCommerce, and Warlord includes unlimited API requests and webhooks."),
  faqMd("Does GunBiz POS work with my website?", "Yes. GunBiz POS is MicroBiz's gun-store product, so it connects the same way. See [WooCommerce for MicroBiz](/microbiz-pos)."),
];
