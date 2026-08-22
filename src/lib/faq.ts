import { SWITCH_FOUNDER, SWITCH_STEPS } from "./switch";

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ECOMMERCE: FaqItem[] = [
  {
    q: "What is included in every monthly plan?",
    a: "Minute Man is the base: a custom WooCommerce site on your domain with unlimited hosting, storage, bandwidth, products, and orders, plus 24×7 uptime monitoring. Every higher plan includes everything below it.",
  },
  {
    q: "Do I buy the monthly plan online?",
    a: "You do not buy monthly hosting on a checkout page. Talk to us and we set the site up. One-time Basic ($500) and Retail ($2,500) setup packages can be purchased on checkout.coriolisagency.com.",
  },
  {
    q: "What is FFL Accelerator?",
    a: "FFL Accelerator is Coriolis’s managed WooCommerce program for FFLs ($569/mo). It includes GunSearchAgent Pro (Betsy on the dealer site). The site is yours. Betsy on it is included. That feed is what OEMs buy as Demand Intelligence.",
  },
  {
    q: "Do you replace my bound book or run NICS?",
    a: "No. Coriolis is not 4473 software, not a NICS system, and not a bound-book replacement. Ecommerce workflows are designed to coexist with electronic bound books and licensed retailers.",
  },
  {
    q: "How do I leave Gearfire or AmmoReady?",
    a: "New Woo on your domain, catalog and redirects, Cockpit and checkout, then DNS. Start on /ammoready-alternative, then talk to us. Do not give notice until the new store is ready.",
  },
];

export const FAQ_DROPSHIP: FaqItem[] = [
  {
    q: "Do I need an FFL to dropship firearms?",
    a: "Yes. Only a licensed dealer can sell firearms this way. Serialized firearms ship to another FFL for transfer — not to the buyer’s door. This page is not legal advice.",
  },
  {
    q: "Which distributors can I stream?",
    a: "Militia and above include an FFL Cockpit license and 21 distributor catalogs with automated lowest-cost fulfillment. Sports South, RSR, Zanders, and Lipsey’s are typical starting points; we add catalogs during setup.",
  },
  {
    q: "Can I dropship ammunition and accessories too?",
    a: "Yes, where the destination allows it. Non-serialized goods often ship to the customer. State and local rules still apply — the store has to respect them at checkout.",
  },
  {
    q: "What if I also stock my own inventory?",
    a: "Run both. Minute Man is own-inventory WooCommerce. Militia adds dropshipping on top. Brick-and-mortar stores usually want Warlord so the POS and the site stay in sync.",
  },
];

export const FAQ_COCKPIT: FaqItem[] = [
  {
    q: "Is FFL Cockpit a website?",
    a: "No. FFL Cockpit is the plugin for distributor catalogs, FFL Checkout, and order routing. You still need a WooCommerce storefront. Coriolis builds and hosts that storefront.",
  },
  {
    q: "Do I buy FFL Cockpit from Coriolis?",
    a: "Licenses live on fflcockpit.com. Militia ($269/mo) and every plan above it include the FFL Cockpit and FFL Checkout licenses. We configure them as part of setup.",
  },
  {
    q: "I already have FFL Cockpit. Can you just build the site?",
    a: "Yes. That is the usual job: custom WooCommerce on your domain, Cockpit configured, hosting and support from Coriolis.",
  },
];

export const FAQ_AMMOREADY: FaqItem[] = [
  {
    q: "Is Coriolis a hosted AmmoReady clone?",
    a: "No. Coriolis is the opposite model: open WooCommerce you own, FFL Cockpit for catalogs, and no vendor lock-in on the storefront.",
  },
  {
    q: "What about Gearfire?",
    a: "Same answer. Gearfire is a closed network. Coriolis is managed WooCommerce plus the tools you pick — Cockpit, your POS, your payments. We are not affiliated with Gearfire or RetailBI.",
  },
  {
    q: "How do you migrate a live store?",
    a: `${SWITCH_STEPS.map((step, i) => `${i + 1}. ${step}`).join(" ")} ${SWITCH_FOUNDER}`,
  },
];

export const FAQ_BEST: FaqItem[] = [
  {
    q: "What is the best FFL ecommerce website?",
    a: "The one you own. Closed platforms (AmmoReady, Gearfire, Orchid storefronts) rent you a catalog. Coriolis builds WooCommerce on your domain — inventory, dropshipping, or both — and you can take it with you.",
  },
  {
    q: "Does WooCommerce handle FFL checkout and dropshipping?",
    a: "Yes, when it is built that way. We use FFL Cockpit and FFL Checkout for dealer selection, 21 distributor catalogs, MAP, and lowest-cost routing. Militia ($269/mo) is the dropshipping plan.",
  },
  {
    q: "What about POS and the bound book?",
    a: "Bring your POS. Warlord integrates AIM, MicroBiz, Rapid, Trident 1, and Corestore. Coriolis is not 4473, NICS, or bound-book software — those stay with the systems licensed for them.",
  },
];

export const FAQ_DI: FaqItem[] = [
  {
    q: "Is this a RetailBI replacement?",
    a: "No. RetailBI’s intelligence is a byproduct of retail operations software. Betsy’s intelligence is a byproduct of online and in-store product discovery.",
  },
  {
    q: "Do I only see my brand and three competitors?",
    a: "No. Every plan includes full-market anonymized demand — the whole category, not four brands. Optional brand pins highlight your labels; they do not hide the rest of the market.",
  },
  {
    q: "How do Insight, Growth, and Platform differ?",
    a: "Insight is full-market demand signals for up to 30 days. Growth adds 60 days of history, anonymized sessions, and CSV. Platform is unlimited history, JSON and CSV, Enterprise Co-Pilot, and warehouse inventory search when a feed is linked.",
  },
  {
    q: "How do team seats work?",
    a: "Every plan includes 1 free Client Admin seat. Additional named users are $49 per user per month. Add seats through Coriolis when you start or grow the team.",
  },
];
