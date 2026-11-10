import { LINKS } from "./links";
import type { FaqItem } from "./faq";
import { CANON_PATHS } from "./site";
import { faqMd } from "./md";

export type PosInline =
  | string
  | { text: string; href: string; external?: boolean };

export type PosFeature = {
  title: string;
  body: string;
};

/** CA-VOICE-P1: one drafted block on a POS page. */
export type PosBlock = { p: string } | { cards: PosFeature[] } | { links: string[] };

export type PosHeroImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type PosCaseStudy = {
  shop: string;
  href?: string;
  linkLead?: string;
  linkLabel?: string;
  status: "live" | "soon";
  placeholder: string;
  /** TODO(Paul): case-study body. Keep null until Paul provides the text. */
  body: string | null;
};

export type PosPage = {
  slug: string;
  path: string;
  name: string;
  navLabel: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  /** Optional second paragraph under the lede. */
  ledeMore?: string;
  jumpLabel: string;
  heroImage: PosHeroImage;
  featuresTitle: string;
  featuresIntro: string;
  features: PosFeature[];
  featuresMoreTitle?: string;
  featuresMore?: PosFeature[];
  docsLead?: string;
  docsHref?: string;
  docsLabel?: string;
  onlineRange?: { title: string; body: string };
  keepRegister: string;
  extra?: PosInline[];
  vendorHref?: string;
  vendorLabel?: string;
  vendorNote?: string;
  caseStudy: PosCaseStudy;
  /**
   * CA-VOICE-P1: page copy shipped as drafted. When set, the page renders these drafted
   * sections (paragraphs, cards, link lists) in place of the old feature, register,
   * case-study, other-registers and links-lead sections.
   */
  voice?: {
    sections: { title: string; blocks: PosBlock[] }[];
    faqHeading: string;
    talkHeading: string;
    talkSubline: string;
    dropshipLabel?: string;
  };
  siblingsIntro: PosInline[];
  linksLead: PosInline[];
  faq: FaqItem[];
};

const HUB_HERO: PosHeroImage = {
  src: CANON_PATHS.gunStorePosHero,
  alt: "Gun store counter with the register and online shop staying in sync",
  width: 1499,
  height: 1059,
};

export const AIM_DOCS_HREF =
  "https://docs.coriolisagency.com/pos/aim-sync?utm_source=coriolisagency&utm_medium=referral&utm_campaign=aim-pos";

/** CA-VOICE-P1: "**Title.** body" draft list item to a feature card. */
function posCard(s: string): PosFeature {
  const m = s.match(/^\*\*(.+?)\*\*\s+([\s\S]*)$/);
  if (!m) throw new Error("pos card: " + s);
  return { title: m[1].replace(/\.$/, ""), body: m[2] };
}

export const POS_PAGES: PosPage[] = [
  {
    slug: "aim-pos",
    path: "/aim-pos",
    name: "AIM POS",
    navLabel: "WooCommerce for AIM",
    title: "WooCommerce for AIM POS: Inventory Sync Online | Coriolis",
    description:
      "WooCommerce for AIM POS. Keep AIM at the counter and get a WooCommerce store you own, with inventory synced from AIM. Included on Warlord and Accelerator.",
    h1: "WooCommerce for AIM POS",
    // CA-VOICE-P1 batch 4 (Paul yes via Chief, 2026-11-10 12:49 PM ET): copy from batch-4/aim-pos.md, shipped as drafted.
    lede: "WooCommerce for AIM POS means you keep AIM at the counter, and Coriolis builds a WooCommerce store on your domain and connects it to AIM, so your online inventory syncs from the register you already run.",
    voice: {
      sections: [
        {
          title: "What AIM sends to the website, and what stays on the register",
          blocks: [
            { p: "AIM runs the counter, and your WooCommerce store works from it. AIM syncs inventory with your online store automatically, so shoppers see what you have and your staff stop entering stock twice." },
            { p: "You can put distributor items on the same site as your own stock and fill those orders by dropship. Militia and above add FFL Cockpit distributor catalogs." },
            { p: "AIM works with FastBound for A&D and the 4473, and that doesn't change. Coriolis builds the website and does not file a 4473, run NICS, or replace the bound book." },
            { p: "The setup steps are in [Sync AIM POS with WooCommerce](https://docs.coriolisagency.com/pos/aim-sync?utm_source=coriolisagency&utm_medium=referral&utm_campaign=aim-pos)." },
            { p: "AIM has its own range tools for lane time, classes and memberships, and they run on the AIM side. If you run a range, tell us how you book lanes and classes today and we'll walk through your site with you." },
          ],
        },
        {
          title: "Keep AIM at the counter, on Warlord or FFL Accelerator",
          blocks: [
            { p: "Warlord ($469/mo) and FFL Accelerator ($569/mo) include API-based AIM POS integration, with unlimited API requests and webhooks. You keep AIM, and Coriolis puts WooCommerce on your domain in place of a rented storefront." },
            { p: "Coriolis announced its AIM POS partnership in April 2026. In September 2026 we [named five FFL retailers and ranges](/press/five-ffls-choose-coriolis-for-aim-pos-integration) on AIM POS and their own WooCommerce stores: Naples Gun Shop, Down Range Chico, Lawful Defense, 2A Firearms, and The Range in McKinney. Each one is on FFL Accelerator." },
            { p: "Vendor site: [aim-pos.com](https://aim-pos.com). Marks belong to their owners. The [Naples Gun Shop case study](/case-studies/naples-gun-shop) is already published." },
          ],
        },
        {
          title: "The other registers we connect, besides AIM",
          blocks: [
            { p: "Warlord and FFL Accelerator connect any POS that works with WooCommerce. The allowed list on this site is AIM, MicroBiz, Rapid Gun Systems and Trident 1, and all of them sit under [connecting the register you already run](/gun-store-pos)." },
            { links: ["[Products, prices and stock from Rapid, with orders coming back for picking](/rapid-gun-systems-pos)","[Publishing from MicroBiz and pulling web orders back in](/microbiz-pos)","[Lane bookings, memberships and classes on a site connected to Trident 1](/trident-1-pos)"] },
            { p: "Compare the [FFL ecommerce plans](/ecommerce#pos), or see [the WooCommerce hosting we build for FFL Cockpit](/ffl-cockpit). If you're leaving a closed storefront, start with [how Coriolis compares with AmmoReady](/ammoready-alternative) or [how Coriolis compares with Gearfire](/gearfire-alternative)." },
          ],
        },
      ],
      faqHeading: "The questions shops ask about connecting AIM to a store they own",
      talkHeading: "Tell us about the website you want and we'll make it happen.",
      talkSubline: "We build, host, and support your open source WooCommerce website. There is no contract and you can cancel at any time.",
      dropshipLabel: "listing distributor catalogs on a store you own",
    },
    jumpLabel: "Tell us about your AIM setup",
    heroImage: {
      src: "brand/aim-pos-hero.jpg",
      alt: "Naples Gun Shop website, a WooCommerce store connected to AIM POS",
      width: 1440,
      height: 900,
    },
    featuresTitle: "What AIM does on your website",
    featuresIntro:
      "AIM runs the counter. Your WooCommerce store works from it. Here is what the AIM POS WooCommerce integration does for you and your shoppers.",
    features: [
      {
        title: "Inventory that matches the counter",
        body: "AIM syncs inventory with your online store automatically. Shoppers see what you have. Your staff stop entering stock twice.",
      },
      {
        title: "Sell past the shelf",
        body: "Put distributor items on the same site as your own stock and fill those orders by dropship. Militia and above add FFL Cockpit distributor catalogs.",
      },
      {
        title: "Your bound book stays put",
        body: "AIM works with FastBound for A&D and the 4473. That doesn't change. Coriolis builds the website. We don't file a 4473, run NICS, or replace the bound book.",
      },
    ],
    docsLead: "Setup steps: ",
    docsHref: AIM_DOCS_HREF,
    docsLabel: "Sync AIM POS with WooCommerce",
    onlineRange: {
      title: "Range time, classes and memberships",
      body: "AIM has its own range tools for lane time, classes and memberships, and they run on the AIM side. If you run a range, tell us how you book lanes and classes today and we'll walk through your site with you.",
    },
    keepRegister:
      "Warlord ($469/mo) and FFL Accelerator ($569/mo) include API-based AIM POS integration, with unlimited API requests and webhooks. You keep AIM. We replace the rented storefront, not the counter. Coriolis does not file a 4473, run NICS, or replace the bound book.",
    extra: [
      "Coriolis announced its AIM POS partnership in April 2026. In September 2026 we ",
      {
        text: "named five FFL retailers and ranges",
        href: "press/five-ffls-choose-coriolis-for-aim-pos-integration",
      },
      " on AIM POS and their own WooCommerce stores: Naples Gun Shop, Down Range Chico, Lawful Defense, 2A Firearms, and The Range in McKinney. Each one is on FFL Accelerator.",
    ],
    vendorHref: LINKS.aimPos,
    caseStudy: {
      shop: "Naples Gun Shop",
      href: "case-studies/naples-gun-shop",
      linkLead: "Read the ",
      linkLabel: "Naples Gun Shop case study",
      status: "live",
      placeholder: "Full case study to follow.",
      // TODO(Paul): case-study body
      body: null,
    },
    siblingsIntro: [
      "Warlord and FFL Accelerator connect any POS that works with WooCommerce. Each of these has its own page, and all of them sit under ",
      { text: "gun store POS integration", href: "gun-store-pos" },
      ".",
    ],
    linksLead: [
      "Compare ",
      { text: "FFL ecommerce plans", href: "ecommerce#pos" },
      ", or see ",
      { text: "FFL Cockpit hosting", href: "ffl-cockpit" },
      ". Leaving a closed storefront? ",
      { text: "AmmoReady", href: "ammoready-alternative" },
      " · ",
      { text: "Gearfire", href: "gearfire-alternative" },
      ".",
    ],
    faq: [
  faqMd("Does AIM POS work with WooCommerce?", "Yes. AIM integrates with WooCommerce for ecommerce, and Coriolis builds the WooCommerce store on your domain and connects it to AIM on the Warlord and FFL Accelerator plans."),
  faqMd("How does inventory stay in sync between AIM and my website?", "AIM syncs inventory with your online store automatically. You keep working in AIM, and the stock on your website follows it."),
  faqMd("Can I sell distributor items next to my AIM inventory?", "Yes. AIM supports selling distributor products by dropship, and Militia and above add FFL Cockpit distributor catalogs, so your own stock and distributor items sit on the same site."),
  faqMd("Do I have to replace AIM?", "No. Keep AIM at the counter, and Coriolis builds the website. The 4473 sentence is in the section above."),
  faqMd("Which plan includes AIM POS integration?", "Warlord ($469/mo) and FFL Accelerator ($569/mo). Both include API-based AIM POS integration with unlimited API requests and webhooks."),
],
  },
  {
    slug: "rapid-gun-systems-pos",
    path: "/rapid-gun-systems-pos",
    name: "Rapid Gun Systems",
    navLabel: "WooCommerce for Rapid",
    title: "WooCommerce for Rapid Gun Systems POS | Coriolis",
    description:
      "WooCommerce for Rapid Gun Systems. Products, prices and stock sync from Rapid to a store you own, and web orders go back into Rapid for picking.",
    h1: "WooCommerce for Rapid Gun Systems",
    // CA-VOICE-P1 batch 4 (Paul yes via Chief, 2026-11-10 12:49 PM ET): copy from batch-4/rapid-gun-systems-pos.md, shipped as drafted.
    lede: "WooCommerce for Rapid Gun Systems means you run Rapid at the counter and sell from a WooCommerce store you own. Rapid sends product details, prices and stock to the site, and web orders come back to Rapid for picking.",
    voice: {
      sections: [
        {
          title: "What Rapid sends to the site, and what comes back for picking",
          blocks: [
            { p: "Change an item's details, retail price or available stock in Rapid, and Rapid syncs it to your website automatically, so nobody edits the store by hand. You can put an item online from Rapid, or take it down, in minutes: new stock goes up fast, and pulled items come down." },
            { p: "Online orders flow back into Rapid for picking, and your floor works web orders and counter sales from the same system." },
            { p: "You can also sell items pulled from distributor catalogs alongside your own inventory. Rapid names FFL Cockpit as a supported platform, and Militia and above add FFL Cockpit distributor catalogs." },
            { p: "eBoundBook, e4473 and eNICS run in Rapid. Coriolis builds the website and does not file a 4473, run NICS, or replace the bound book." },
          ],
        },
        {
          title: "Keep Rapid at the counter, on Warlord or FFL Accelerator",
          blocks: [
            { p: "Warlord ($469/mo) and FFL Accelerator ($569/mo) include API-based Rapid Gun Systems integration, with unlimited API requests and webhooks. Keep Rapid at the counter, and Coriolis puts WooCommerce on your domain and hooks it to the register." },
            { p: "Rapid Gun Systems marks belong to their owners, and Coriolis builds the website." },
          ],
        },
        {
          title: "The other registers we connect, besides Rapid",
          blocks: [
            { p: "Rapid is one of four registers with its own page here. Warlord and FFL Accelerator connect any POS that works with WooCommerce. The allowed list on this site is AIM, MicroBiz, Rapid Gun Systems and Trident 1. See all of them on [connecting the register you already run](/gun-store-pos)." },
            { links: ["[AIM inventory sync on a store you own](/aim-pos)","[Publishing from MicroBiz and pulling web orders back in](/microbiz-pos)","[Lane bookings, memberships and classes on a site connected to Trident 1](/trident-1-pos)"] },
            { p: "Pick from the [FFL ecommerce plans](/ecommerce#pos), or read about [the WooCommerce hosting we build for FFL Cockpit](/ffl-cockpit). If you're leaving a closed storefront, start with [how Coriolis compares with AmmoReady](/ammoready-alternative) or [how Coriolis compares with Gearfire](/gearfire-alternative)." },
          ],
        },
      ],
      faqHeading: "The questions shops ask about connecting Rapid to a store they own",
      talkHeading: "Tell us about the website you want and we'll make it happen.",
      talkSubline: "We build, host, and support your open source WooCommerce website. There is no contract and you can cancel at any time.",
      dropshipLabel: "listing distributor catalogs on a store you own",
    },
    jumpLabel: "Talk to us about Rapid",
    heroImage: {
      ...HUB_HERO,
      alt: "Gun store counter where staff pick web orders and ring up walk-in sales",
    },
    featuresTitle: "What Rapid does on your website",
    featuresIntro:
      "With the Rapid Gun Systems WooCommerce integration, Rapid leads and the website follows. Orders come back the other way.",
    features: [
      {
        title: "Products, prices and stock from Rapid",
        body: "Change an item's details, retail price or available stock in Rapid, and Rapid syncs it to your website automatically. Nobody edits the store by hand.",
      },
      {
        title: "Add or pull items in minutes",
        body: "Put an item online from Rapid, or take it down, in minutes. New stock goes up fast. Pulled items come down.",
      },
      {
        title: "Web orders land in Rapid",
        body: "Online orders flow back into Rapid for picking. Your floor works web orders and counter sales from the same system.",
      },
      {
        title: "Distributor items next to store stock",
        body: "Sell items pulled from distributor catalogs alongside your own inventory. Rapid names FFL Cockpit as a supported platform, and Militia and above add FFL Cockpit distributor catalogs.",
      },
      {
        title: "Your bound book stays in Rapid",
        body: "eBoundBook, e4473 and eNICS run in Rapid. Coriolis builds the website. We don't file a 4473, run NICS, or replace the bound book.",
      },
    ],
    keepRegister:
      "Warlord ($469/mo) and FFL Accelerator ($569/mo) include API-based Rapid Gun Systems integration, with unlimited API requests and webhooks. Keep Rapid at the counter. Coriolis puts WooCommerce on your domain and hooks it to the register. Coriolis does not file a 4473, run NICS, or replace the bound book.",
    vendorNote:
      "Rapid Gun Systems marks belong to their owners. Coriolis builds the website.",
    caseStudy: {
      shop: "",
      status: "soon",
      placeholder: "",
      // ACME go-live teaser removed (CA-GUARDRAIL-FIX). Case study stays off the page until it is live.
      body: null,
    },
    siblingsIntro: [
      "Rapid is one of four registers with its own page here. Warlord and FFL Accelerator connect any POS that works with WooCommerce. See all of them on ",
      { text: "gun store POS integration", href: "gun-store-pos" },
      ".",
    ],
    linksLead: [
      "Pick from the ",
      { text: "FFL ecommerce plans", href: "ecommerce#pos" },
      ", or read about ",
      { text: "FFL Cockpit hosting", href: "ffl-cockpit" },
      ". Leaving a closed storefront? ",
      { text: "AmmoReady", href: "ammoready-alternative" },
      " · ",
      { text: "Gearfire", href: "gearfire-alternative" },
      ".",
    ],
    faq: [
  faqMd("Does Rapid Gun Systems work with WooCommerce?", "Yes. Rapid lists WooCommerce as an eCommerce connector, and Coriolis builds the WooCommerce store on your domain and connects it to Rapid on the Warlord and FFL Accelerator plans."),
  faqMd("What syncs between Rapid and my website?", "Product details, retail prices and available inventory. Rapid syncs changes to the website automatically, and you can add or remove items from the online store in minutes."),
  faqMd("Do web orders come back into Rapid?", "Yes. Web orders flow back into Rapid for picking, so your staff work them in the same system as counter sales."),
  faqMd("Can I sell distributor items online with Rapid?", "Yes. Rapid supports selling items pulled from distributor catalogs and names FFL Cockpit as a supported platform, and Militia and above add FFL Cockpit distributor catalogs."),
  faqMd("Do I have to replace Rapid?", "No. Keep Rapid at the counter. The 4473 sentence is in the section above."),
  faqMd("Which plan includes Rapid Gun Systems integration?", "Warlord ($469/mo) and FFL Accelerator ($569/mo). Both include API-based Rapid Gun Systems integration with unlimited API requests and webhooks."),
],
  },
  {
    slug: "microbiz-pos",
    path: "/microbiz-pos",
    name: "MicroBiz POS",
    navLabel: "WooCommerce for MicroBiz",
    title: "WooCommerce for MicroBiz POS | Coriolis",
    description:
      "WooCommerce for MicroBiz POS: publish products, sync prices and stock, and pull web orders and customers back into MicroBiz.",
    h1: "WooCommerce for MicroBiz POS",
    // CA-VOICE-P1 batch 4 (Paul yes via Chief, 2026-11-10 12:49 PM ET): copy from batch-4/microbiz-pos.md, shipped as drafted.
    lede: "WooCommerce for MicroBiz POS starts with this: MicroBiz has a WooCommerce integration, so you keep MicroBiz at the counter, and Coriolis builds the store on your domain. MicroBiz publishes products and prices to it and pulls web orders back in.",
    ledeMore: "GunBiz POS is MicroBiz's gun-store product. If you run GunBiz POS at the counter, this is your page, and the integration below is the one you get.",
    voice: {
      sections: [
        {
          title: "What MicroBiz publishes to the site, and what comes back into Order Management",
          blocks: [
            { p: "New products and price changes go from MicroBiz to your WooCommerce store, so nobody rebuilds listings by hand. When an item sells out in the store, MicroBiz updates WooCommerce right away, and other stock changes go up in a daily batch. When an item sells online, MicroBiz adjusts its own count." },
            { p: "Online orders land in MicroBiz Order Management with the items, taxes and payment. A first-time online buyer gets a new MicroBiz customer record, and a repeat buyer gets matched to the one you have." },
            { p: "You can publish your in-stock inventory next to new items from distributor feeds managed in the FFL Cockpit plugin. Militia and above include FFL Cockpit distributor catalogs." },
            { p: "MicroBiz connects to FastBound for A&D and the 4473. Coriolis builds the website and does not file a 4473, run NICS, or replace the bound book." },
          ],
        },
        {
          title: "Keep MicroBiz at the counter, on Warlord or FFL Accelerator",
          blocks: [
            { p: "Warlord ($469/mo) and FFL Accelerator ($569/mo) include API-based MicroBiz POS integration, with unlimited API requests and webhooks. MicroBiz stays on the counter, and WooCommerce goes on your domain." },
            { p: "Vendor site: [MicroBiz](https://www.microbiz.com). Marks belong to their owners. The [Target Shotguns case study](/case-studies/target-shotguns) is already published." },
          ],
        },
        {
          title: "The other registers we connect, besides MicroBiz",
          blocks: [
            { p: "MicroBiz isn't the only register we connect. Warlord and FFL Accelerator work with any POS that works with WooCommerce. The allowed list on this site is AIM, MicroBiz, Rapid Gun Systems and Trident 1. Start at [connecting the register you already run](/gun-store-pos), or go straight to one:" },
            { links: ["[AIM inventory sync on a store you own](/aim-pos)","[Products, prices and stock from Rapid, with orders coming back for picking](/rapid-gun-systems-pos)","[Lane bookings, memberships and classes on a site connected to Trident 1](/trident-1-pos)"] },
            { p: "See the [FFL ecommerce plans](/ecommerce#pos) and [the WooCommerce hosting we build for FFL Cockpit](/ffl-cockpit). If you're leaving a closed storefront, start with [how Coriolis compares with AmmoReady](/ammoready-alternative) or [how Coriolis compares with Gearfire](/gearfire-alternative)." },
          ],
        },
      ],
      faqHeading: "The questions shops ask about connecting MicroBiz, or GunBiz POS, to a store they own",
      talkHeading: "Tell us about the website you want and we'll make it happen.",
      talkSubline: "We build, host, and support your open source WooCommerce website. There is no contract and you can cancel at any time.",
      dropshipLabel: "listing distributor catalogs on a store you own",
    },
    jumpLabel: "Tell us about your MicroBiz store",
    heroImage: {
      src: "brand/microbiz-pos-hero.jpg",
      alt: "Target Shotguns website, a WooCommerce store connected to MicroBiz POS",
      width: 1440,
      height: 900,
    },
    featuresTitle: "What MicroBiz does on your website",
    featuresIntro:
      "The MicroBiz POS WooCommerce integration runs both directions. Products and prices go out to the site. Orders and customers come back in.",
    features: [
      {
        title: "Publish from the POS",
        body: "New products and price changes go from MicroBiz to your WooCommerce store. Nobody rebuilds listings by hand.",
      },
      {
        title: "Sell it out once",
        body: "When an item sells out in the store, MicroBiz updates WooCommerce right away. Other stock changes go up in a daily batch. When an item sells online, MicroBiz adjusts its own count.",
      },
      {
        title: "Web orders and customers in MicroBiz",
        body: "Online orders land in MicroBiz Order Management with the items, taxes and payment. A first-time online buyer gets a new MicroBiz customer record. A repeat buyer gets matched to the one you have.",
      },
      {
        title: "Store stock plus distributor items",
        body: "Publish your in-stock inventory next to new items from distributor feeds managed in the FFL Cockpit plugin. Militia and above include FFL Cockpit distributor catalogs.",
      },
      {
        title: "FastBound stays in the loop",
        body: "MicroBiz connects to FastBound for A&D and the 4473. Coriolis builds the website. We don't file a 4473, run NICS, or replace the bound book.",
      },
    ],
    keepRegister:
      "Warlord ($469/mo) and FFL Accelerator ($569/mo) include API-based MicroBiz POS integration, with unlimited API requests and webhooks. MicroBiz stays on the counter, and WooCommerce goes on your domain. Coriolis does not file a 4473, run NICS, or replace the bound book.",
    vendorHref: LINKS.microbizPos,
    vendorLabel: "MicroBiz",
    caseStudy: {
      shop: "Target Shotguns",
      href: "case-studies/target-shotguns",
      linkLead: "See the ",
      linkLabel: "Target Shotguns case study",
      status: "live",
      placeholder: "Full case study to follow.",
      // TODO(Paul): case-study body
      body: null,
    },
    siblingsIntro: [
      "MicroBiz isn't the only register we connect. Warlord and FFL Accelerator work with any POS that works with WooCommerce. Start at ",
      { text: "gun store POS integration", href: "gun-store-pos" },
      ", or go straight to one:",
    ],
    linksLead: [
      "See the ",
      { text: "FFL ecommerce plans", href: "ecommerce#pos" },
      " and ",
      { text: "FFL Cockpit hosting", href: "ffl-cockpit" },
      ". Leaving a closed storefront? ",
      { text: "AmmoReady", href: "ammoready-alternative" },
      " · ",
      { text: "Gearfire", href: "gearfire-alternative" },
      ".",
    ],
    faq: [
  faqMd("Does MicroBiz POS work with WooCommerce?", "Yes. MicroBiz has a WooCommerce integration, and Coriolis builds the WooCommerce store on your domain and connects it to MicroBiz on the Warlord and FFL Accelerator plans."),
  faqMd("What syncs between MicroBiz and my website, and how fast?", "New products, price updates and stock. When an item sells out in the store, MicroBiz updates WooCommerce right away, and other stock changes go up in a daily batch."),
  faqMd("Do web orders and customers come back into MicroBiz?", "Yes. Online orders land in MicroBiz Order Management with items, taxes and payment. A new online buyer gets a MicroBiz customer record, and a repeat buyer is matched to the existing one."),
  faqMd("Can I sell distributor items next to my MicroBiz inventory?", "Yes. Your in-stock inventory publishes next to items from distributor feeds managed in the FFL Cockpit plugin, and Militia and above include FFL Cockpit distributor catalogs."),
  faqMd("Which plan includes MicroBiz integration?", "Warlord ($469/mo) and FFL Accelerator ($569/mo). Both include API-based MicroBiz POS integration with unlimited API requests and webhooks."),
],
  },
  {
    slug: "trident-1-pos",
    path: "/trident-1-pos",
    name: "Trident 1 POS",
    navLabel: "WooCommerce for Trident 1",
    title: "WooCommerce for Trident 1 POS: Range and Shop | Coriolis",
    description:
      "WooCommerce for Trident 1 POS. Put lane reservations, memberships and classes on a site you own, and publish products and stock from Trident 1 to it.",
    h1: "WooCommerce for Trident 1 POS",
    // CA-VOICE-P1 batch 2 (Paul yes via Chief, 2026-11-10 12:49 PM ET): copy from batch-2/trident-1-pos.md, shipped as drafted.
    lede: "WooCommerce for Trident 1 POS is for ranges, training centers and gun stores already on Trident 1: keep Trident 1 at the counter, and Coriolis builds a WooCommerce site you own where shooters book lanes, buy memberships and sign up for classes.",
    jumpLabel: "Tell us about your range",
    heroImage: {
      src: "brand/trident-1-pos-hero.jpg",
      alt: "Wisconsin Firearms Training Center website, a WooCommerce store connected to Trident 1 POS",
      width: 1440,
      height: 900,
    },
    featuresTitle: "How Trident 1 range work, including lanes, memberships and classes, shows up on the site",
    featuresIntro: "Trident 1 already runs the range side as well as the register, and the Trident 1 POS WooCommerce integration carries that range business to your website.",
    features: (["**Book lane time online.** Lane settings you set up in Trident 1 carry over to your website, so shooters reserve a lane online instead of calling the counter.","**Sell memberships online.** Put your membership plans on the site, with recurring billing, and people can join without coming in.","**Fill classes online.** Your course catalog goes on the site with online registration, and students sign up and pay before they show up."] as string[]).map(posCard),
    featuresMoreTitle: "What Trident 1 does for products, stock and price on the website",
    featuresMore: (["**Publish products from Trident 1.** Add a part to WooCommerce straight from Trident 1 and pick its WooCommerce category as you go.","**Stock and price from the POS.** Your WooCommerce stock count moves up and down as inventory changes in Trident 1, and the online price comes from the Trident 1 field you assign as the eCommerce price."] as string[]).map(posCard),
    voice: {
      sections: [
        {
          title: "How Trident 1 range work, including lanes, memberships and classes, shows up on the site",
          blocks: [
            { p: "Trident 1 already runs the range side as well as the register, and the Trident 1 POS WooCommerce integration carries that range business to your website." },
            { cards: (["**Book lane time online.** Lane settings you set up in Trident 1 carry over to your website, so shooters reserve a lane online instead of calling the counter.","**Sell memberships online.** Put your membership plans on the site, with recurring billing, and people can join without coming in.","**Fill classes online.** Your course catalog goes on the site with online registration, and students sign up and pay before they show up."] as string[]).map(posCard) },
          ],
        },
        {
          title: "What Trident 1 does for products, stock and price on the website",
          blocks: [
            { cards: (["**Publish products from Trident 1.** Add a part to WooCommerce straight from Trident 1 and pick its WooCommerce category as you go.","**Stock and price from the POS.** Your WooCommerce stock count moves up and down as inventory changes in Trident 1, and the online price comes from the Trident 1 field you assign as the eCommerce price."] as string[]).map(posCard) },
            { p: "The bound book stays with Trident 1, which uses FastBound for the eBound Book and E4473, and Coriolis builds the website. Coriolis does not file a 4473, run NICS, or replace the bound book." },
          ],
        },
        {
          title: "Keep the Trident 1 register, on Warlord or FFL Accelerator",
          blocks: [
            { p: "Warlord ($469/mo) and FFL Accelerator ($569/mo) include API-based Trident 1 POS integration, with unlimited API requests and webhooks. Trident 1 keeps running the counter and the range, and you own the website." },
            { p: "Trident 1 marks belong to their owners, and Coriolis builds the website. Wisconsin Firearms Training Center is one shop already on this stack." },
            { p: "If you're running a register that isn't Trident 1, Warlord and FFL Accelerator connect any POS that works with WooCommerce, and the full list lives on [connecting the register you already run](/gun-store-pos)." },
            { links: ["[WooCommerce for AIM](/aim-pos)","[WooCommerce for Rapid](/rapid-gun-systems-pos)","[WooCommerce for MicroBiz](/microbiz-pos)"] },
            { p: "Compare the [FFL ecommerce plans](/ecommerce#pos), or see where your site runs on [the WooCommerce hosting we build for FFL Cockpit](/ffl-cockpit). If you're leaving a closed storefront, start with [AmmoReady](/ammoready-alternative) or [Gearfire](/gearfire-alternative)." },
          ],
        },
      ],
      faqHeading: "The questions ranges and shops ask about WooCommerce for Trident 1",
      talkHeading: "Tell us about the website you want and we'll make it happen.",
      talkSubline: "We build, host, and support your open source WooCommerce website. There is no contract and you can cancel at any time.",
      dropshipLabel: "listing distributor catalogs on a store you own",
    },
    keepRegister:
      "Warlord ($469/mo) and FFL Accelerator ($569/mo) include API-based Trident 1 POS integration, with unlimited API requests and webhooks. Trident 1 keeps running the counter and the range. You own the website. Coriolis does not file a 4473, run NICS, or replace the bound book.",
    vendorNote:
      "Trident 1 marks belong to their owners. Coriolis builds the website.",
    caseStudy: {
      shop: "Wisconsin Firearms Training Center",
      status: "soon",
      placeholder: "Full case study to follow.",
      // TODO(Paul): case-study body
      body: null,
    },
    siblingsIntro: [
      "Running a register that isn't Trident 1? Warlord and FFL Accelerator connect any POS that works with WooCommerce. The full list lives on ",
      { text: "gun store POS integration", href: "gun-store-pos" },
      ".",
    ],
    linksLead: [
      "Compare the ",
      { text: "FFL ecommerce plans", href: "ecommerce#pos" },
      ", or see where your site runs on ",
      { text: "FFL Cockpit hosting", href: "ffl-cockpit" },
      ". Leaving a closed storefront? ",
      { text: "AmmoReady", href: "ammoready-alternative" },
      " · ",
      { text: "Gearfire", href: "gearfire-alternative" },
      ".",
    ],
    faq: [
  faqMd("Does Trident 1 POS work with WooCommerce?", "Yes. Trident 1 integrates with WooCommerce, and Coriolis builds the WooCommerce site on your domain and connects it to Trident 1 on the Warlord and FFL Accelerator plans."),
  faqMd("Can customers book range time online with Trident 1?", "Yes. The lane settings you set up in Trident 1 carry over to your website, so shooters can reserve a lane online."),
  faqMd("Can I sell memberships and classes on my website?", "Yes. Trident 1 supports memberships with recurring billing and a course catalog with online registration, and both go on your website."),
  faqMd("How do products and stock get from Trident 1 to the site?", "You publish a product to WooCommerce from Trident 1 and pick its category. After that, the WooCommerce stock count updates as inventory goes up or down in Trident 1, and the price comes from the field you assign as the eCommerce price."),
  faqMd("Do I have to replace Trident 1?", "No. Keep Trident 1 for the counter and the range, and FastBound handles the eBound Book and E4473 on the Trident 1 side. The 4473 sentence is in the section above."),
  faqMd("Which plan includes Trident 1 integration?", "Warlord ($469/mo) and FFL Accelerator ($569/mo). Both include API-based Trident 1 POS integration with unlimited API requests and webhooks."),
],
  },
];

export function posBySlug(slug: string): PosPage | undefined {
  return POS_PAGES.find((page) => page.slug === slug);
}

export function posBreadcrumbList(home: string, page: PosPage) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: home },
      {
        "@type": "ListItem",
        position: 2,
        name: "Gun Store POS",
        item: `${home}/gun-store-pos`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.navLabel,
        item: `${home}${page.path}`,
      },
    ],
  };
}

