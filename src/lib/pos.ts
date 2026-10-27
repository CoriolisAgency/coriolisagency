import { LINKS } from "./links";
import type { FaqItem } from "./faq";
import { CANON_PATHS } from "./site";

export type PosInline =
  | string
  | { text: string; href: string; external?: boolean };

export type PosFeature = {
  title: string;
  body: string;
};

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
  vendorNote?: string;
  caseStudy: PosCaseStudy;
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
    lede: "Keep AIM POS at the counter. Coriolis builds a WooCommerce store on your domain and connects it to AIM, so your online inventory syncs from the register you already run.",
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
      placeholder: "Full case study coming soon.",
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
      {
        q: "Does AIM POS work with WooCommerce?",
        a: "Yes. AIM integrates with WooCommerce for ecommerce. Coriolis builds the WooCommerce store on your domain and connects it to AIM on the Warlord and FFL Accelerator plans.",
      },
      {
        q: "How does inventory stay in sync between AIM and my website?",
        a: "AIM syncs inventory with your online store automatically. You keep working in AIM, and the stock on your website follows it.",
      },
      {
        q: "Can I sell distributor items next to my AIM inventory?",
        a: "Yes. AIM supports selling distributor products by dropship, and Militia and above add FFL Cockpit distributor catalogs. Your own stock and distributor items sit on the same site.",
      },
      {
        q: "Do I have to replace AIM?",
        a: "No. Keep AIM at the counter. Coriolis builds the website. AIM and FastBound keep the A&D and 4473 work, and Coriolis does not file a 4473, run NICS, or replace the bound book.",
      },
      {
        q: "Which plan includes AIM POS integration?",
        a: "Warlord ($469/mo) and FFL Accelerator ($569/mo). Both include API-based AIM POS integration with unlimited API requests and webhooks.",
      },
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
    lede: "Run Rapid Gun Systems at the counter and sell from a WooCommerce store you own. Rapid sends product details, prices and stock to the site, and web orders come back to Rapid for picking.",
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
      shop: "ACME",
      status: "soon",
      placeholder:
        "ACME's WooCommerce store will go live with Rapid Gun Systems at the counter. It isn't live yet. This story gets told once it is.",
      // TODO(Paul): case-study body
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
      {
        q: "Does Rapid Gun Systems work with WooCommerce?",
        a: "Yes. Rapid lists WooCommerce as an eCommerce connector. Coriolis builds the WooCommerce store on your domain and connects it to Rapid on the Warlord and FFL Accelerator plans.",
      },
      {
        q: "What syncs between Rapid and my website?",
        a: "Product details, retail prices and available inventory. Rapid syncs changes to the website automatically, and you can add or remove items from the online store in minutes.",
      },
      {
        q: "Do web orders come back into Rapid?",
        a: "Yes. Web orders flow back into Rapid for picking, so your staff work them in the same system as counter sales.",
      },
      {
        q: "Can I sell distributor items online with Rapid?",
        a: "Yes. Rapid supports selling items pulled from distributor catalogs and names FFL Cockpit as a supported platform. Militia and above add FFL Cockpit distributor catalogs.",
      },
      {
        q: "Do I have to replace Rapid?",
        a: "No. Keep Rapid at the counter. eBoundBook, e4473 and eNICS stay in Rapid. Coriolis builds the website and does not file a 4473, run NICS, or replace the bound book.",
      },
      {
        q: "Which plan includes Rapid Gun Systems integration?",
        a: "Warlord ($469/mo) and FFL Accelerator ($569/mo). Both include API-based Rapid Gun Systems integration with unlimited API requests and webhooks.",
      },
    ],
  },
  {
    slug: "gunbiz-pos",
    path: "/gunbiz-pos",
    name: "GunBiz POS",
    navLabel: "WooCommerce for GunBiz",
    title: "WooCommerce for GunBiz POS (MicroBiz) | Coriolis",
    description:
      "WooCommerce for GunBiz POS, formerly MicroBiz: publish products, sync prices and stock, and pull web orders and customers back into GunBiz.",
    h1: "WooCommerce for GunBiz POS",
    lede: "GunBiz POS, formerly MicroBiz, has a WooCommerce integration. Keep GunBiz at the counter. Coriolis builds the store on your domain, and GunBiz publishes products and prices to it and pulls web orders back in.",
    jumpLabel: "Tell us about your GunBiz store",
    heroImage: {
      src: "brand/gunbiz-pos-hero.jpg",
      alt: "Target Shotguns website, a WooCommerce store connected to GunBiz POS",
      width: 1440,
      height: 900,
    },
    featuresTitle: "What GunBiz does on your website",
    featuresIntro:
      "The GunBiz POS WooCommerce integration runs both directions. Products and prices go out to the site. Orders and customers come back in.",
    features: [
      {
        title: "Publish from the POS",
        body: "New products and price changes go from GunBiz to your WooCommerce store. Nobody rebuilds listings by hand.",
      },
      {
        title: "Sell it out once",
        body: "When an item sells out in the store, GunBiz updates WooCommerce right away. Other stock changes go up in a daily batch. When an item sells online, GunBiz adjusts its own count.",
      },
      {
        title: "Web orders and customers in GunBiz",
        body: "Online orders land in GunBiz Order Management with the items, taxes and payment. A first-time online buyer gets a new GunBiz customer record. A repeat buyer gets matched to the one you have.",
      },
      {
        title: "Store stock plus distributor items",
        body: "Publish your in-stock inventory next to new items from distributor feeds managed in the FFL Cockpit plugin. Militia and above include FFL Cockpit distributor catalogs.",
      },
      {
        title: "FastBound stays in the loop",
        body: "GunBiz connects to FastBound for A&D and the 4473. Coriolis builds the website. We don't file a 4473, run NICS, or replace the bound book.",
      },
    ],
    keepRegister:
      "Warlord ($469/mo) and FFL Accelerator ($569/mo) include API-based GunBiz POS (formerly MicroBiz) integration, with unlimited API requests and webhooks. GunBiz stays on the counter, and WooCommerce goes on your domain. Coriolis does not file a 4473, run NICS, or replace the bound book.",
    vendorHref: LINKS.gunbizPos,
    caseStudy: {
      shop: "Target Shotguns",
      href: "case-studies/target-shotguns",
      linkLead: "See the ",
      linkLabel: "Target Shotguns case study",
      status: "live",
      placeholder: "Full case study coming soon.",
      // TODO(Paul): case-study body
      body: null,
    },
    siblingsIntro: [
      "GunBiz isn't the only register we connect. Warlord and FFL Accelerator work with any POS that works with WooCommerce. Start at ",
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
      {
        q: "Does GunBiz POS work with WooCommerce?",
        a: "Yes. GunBiz has a WooCommerce integration. Coriolis builds the WooCommerce store on your domain and connects it to GunBiz on the Warlord and FFL Accelerator plans.",
      },
      {
        q: "Is GunBiz the same as MicroBiz?",
        a: "Yes. GunBiz POS was formerly MicroBiz. If you run MicroBiz in your gun store, this is your page.",
      },
      {
        q: "What syncs between GunBiz and my website, and how fast?",
        a: "New products, price updates and stock. When an item sells out in the store, GunBiz updates WooCommerce right away. Other stock changes go up in a daily batch.",
      },
      {
        q: "Do web orders and customers come back into GunBiz?",
        a: "Yes. Online orders land in GunBiz Order Management with items, taxes and payment. A new online buyer gets a GunBiz customer record, and a repeat buyer is matched to the existing one.",
      },
      {
        q: "Can I sell distributor items next to my GunBiz inventory?",
        a: "Yes. Your in-stock inventory publishes next to items from distributor feeds managed in the FFL Cockpit plugin. Militia and above include FFL Cockpit distributor catalogs.",
      },
      {
        q: "Which plan includes GunBiz integration?",
        a: "Warlord ($469/mo) and FFL Accelerator ($569/mo). Both include API-based GunBiz POS integration with unlimited API requests and webhooks.",
      },
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
    lede: "For ranges, training centers and gun stores on Trident 1. Keep Trident 1 at the counter. Coriolis builds a WooCommerce site you own where shooters book lanes, buy memberships and sign up for classes.",
    jumpLabel: "Tell us about your range",
    heroImage: {
      src: "brand/trident-1-pos-hero.jpg",
      alt: "Wisconsin Firearms Training Center website, a WooCommerce store connected to Trident 1 POS",
      width: 1440,
      height: 900,
    },
    featuresTitle: "Your range business, online",
    featuresIntro:
      "Trident 1 runs the range side as well as the register. The Trident 1 POS WooCommerce integration carries that range business to your website.",
    features: [
      {
        title: "Book lane time online",
        body: "Lane settings you set up in Trident 1 carry over to your website. Shooters reserve a lane online instead of calling the counter.",
      },
      {
        title: "Sell memberships online",
        body: "Put your membership plans on the site, with recurring billing. People join without coming in.",
      },
      {
        title: "Fill classes online",
        body: "Your course catalog goes on the site with online registration. Students sign up and pay before they show up.",
      },
    ],
    featuresMoreTitle: "What Trident 1 does for your products",
    featuresMore: [
      {
        title: "Publish products from Trident 1",
        body: "Add a part to WooCommerce straight from Trident 1 and pick its WooCommerce category as you go.",
      },
      {
        title: "Stock and price from the POS",
        body: "Your WooCommerce stock count moves up and down as inventory changes in Trident 1. The online price comes from the Trident 1 field you assign as the eCommerce price.",
      },
      {
        title: "Your bound book stays with Trident 1",
        body: "Trident 1 uses FastBound for the eBound Book and E4473. Coriolis builds the website. We don't file a 4473, run NICS, or replace the bound book.",
      },
    ],
    keepRegister:
      "Warlord ($469/mo) and FFL Accelerator ($569/mo) include API-based Trident 1 POS integration, with unlimited API requests and webhooks. Trident 1 keeps running the counter and the range. You own the website. Coriolis does not file a 4473, run NICS, or replace the bound book.",
    vendorNote:
      "Trident 1 marks belong to their owners. Coriolis builds the website.",
    caseStudy: {
      shop: "Wisconsin Firearms Training Center",
      status: "soon",
      placeholder: "Full case study coming soon.",
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
      {
        q: "Does Trident 1 POS work with WooCommerce?",
        a: "Yes. Trident 1 integrates with WooCommerce. Coriolis builds the WooCommerce site on your domain and connects it to Trident 1 on the Warlord and FFL Accelerator plans.",
      },
      {
        q: "Can customers book range time online with Trident 1?",
        a: "Yes. The lane settings you set up in Trident 1 carry over to your website, so shooters can reserve a lane online.",
      },
      {
        q: "Can I sell memberships and classes on my website?",
        a: "Yes. Trident 1 supports memberships with recurring billing and a course catalog with online registration, and both go on your website.",
      },
      {
        q: "How do products and stock get from Trident 1 to the site?",
        a: "You publish a product to WooCommerce from Trident 1 and pick its category. After that, the WooCommerce stock count updates as inventory goes up or down in Trident 1, and the price comes from the field you assign as the eCommerce price.",
      },
      {
        q: "Do I have to replace Trident 1?",
        a: "No. Keep Trident 1 for the counter and the range. FastBound handles the eBound Book and E4473 on the Trident 1 side. Coriolis builds the website and does not file a 4473, run NICS, or replace the bound book.",
      },
      {
        q: "Which plan includes Trident 1 integration?",
        a: "Warlord ($469/mo) and FFL Accelerator ($569/mo). Both include API-based Trident 1 POS integration with unlimited API requests and webhooks.",
      },
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

