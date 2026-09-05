export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ECOMMERCE: FaqItem[] = [
  {
    q: "What is FFL Accelerator?",
    a: "It is the Coriolis plan for a gun store that wants a real website. $569 a month. We build WooCommerce on your domain, connect catalogs and checkout, and put Betsy on the shop. The site is yours.",
  },
  {
    q: "What do I pay to start?",
    a: "Setup is $500 for a clean launch or $2,500 for the full custom site and email. Then $569 a month. No annual contract. If you walk, you take the website.",
  },
  {
    q: "Can I sell guns I do not stock?",
    a: "Yes. FFL Cockpit streams twenty-one distributor catalogs. A serialized firearm ships to a receiving FFL. You can still sell what is in the safe. This is not legal advice. We do not run your 4473, NICS, or bound book.",
  },
  {
    q: "I already have a register. Do I throw it out?",
    a: "No. Bring the register you already run. We connect it when you want the floor and the site in sync.",
  },
  {
    q: "I'm on AmmoReady or Gearfire. Can you replace the site without going dark?",
    a: "Yes. We build WooCommerce on your domain first, move what ranks, test a live cart, then cut DNS. Do not give notice until the new store is ready.",
  },
  {
    q: "Do I own it?",
    a: "Yes. It is WordPress. Cancel and the site goes with you.",
  },
];

export const FAQ_DROPSHIP: FaqItem[] = [
  {
    q: "Do I need an FFL to dropship firearms?",
    a: "Yes. Only a licensed dealer can sell firearms this way. Serialized firearms ship to another FFL for transfer, not to the buyer’s door. This page is not legal advice.",
  },
  {
    q: "Which distributors can I stream?",
    a: "Militia and above include an FFL Cockpit license and 21 distributor catalogs with automated lowest-cost fulfillment. Sports South, RSR, Zanders, and Lipsey’s are typical starting points. We add catalogs during setup.",
  },
  {
    q: "Can I dropship ammunition and accessories too?",
    a: "Yes, where the destination allows it. Non-serialized goods often ship to the customer. State and local rules still apply. The store has to respect them at checkout.",
  },
  {
    q: "What if I also stock my own inventory?",
    a: "Run both. Minute Man is own-inventory WooCommerce. Militia adds dropshipping on top. Brick-and-mortar stores usually want Warlord so the register and the site stay in sync. The full program is FFL Accelerator.",
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
    a: "Same answer. Gearfire is a closed network. Coriolis is managed WooCommerce plus the tools you pick — Cockpit, your register, your payments. We are not affiliated with Gearfire or RetailBI.",
  },
  {
    q: "How do you migrate a live store?",
    a: "Keep your domain. We stand up Woo on it before you give notice. Map the catalog and 301 the URLs that already rank. Wire FFL Checkout, payments, and taxes, then test a mixed cart. Connect the register only if you want the floor and the site in sync. Cut DNS. You leave with the site. Coriolis was founded by the person who ran AmmoReady for nine years.",
  },
];

export const FAQ_BEST: FaqItem[] = [
  {
    q: "What is the best FFL ecommerce website?",
    a: "The one you own. AmmoReady and Gearfire are template platforms — ads you can't strip, shared HTML, pages you don't write. Coriolis builds WooCommerce on your domain — inventory, dropshipping, or both — and you can take it with you.",
  },
  {
    q: "Does WooCommerce handle FFL checkout and dropshipping?",
    a: "Yes, when it is built that way. We use FFL Cockpit and FFL Checkout for dealer selection, 21 distributor catalogs, MAP, and lowest-cost routing. Militia ($269/mo) is the dropshipping plan. The plan we want you on is FFL Accelerator ($569/mo).",
  },
  {
    q: "What about POS and the bound book?",
    a: "Bring the register you already run. Warlord and Accelerator connect AIM, MicroBiz, Rapid, Trident 1, and Corestore. Coriolis is not 4473, NICS, or bound-book software. Those stay with the systems licensed for them. This is not legal advice.",
  },
  {
    q: "Why can’t an AmmoReady or Gearfire site rank like a shop you own?",
    a: "Because Google sees one template repeated across the network. Your inventory is unique. The HTML is not. You do not control titles, slugs, or page copy beyond what the platform allows.",
  },
];

export const FAQ_DI_VS_RETAILBI: FaqItem[] = [
  {
    q: "How is Demand Intelligence different from RetailBI?",
    a: "RetailBI measures sell-through — completed POS and ecommerce tickets, including the monthly RetailBI Firearm Sales Index of same-store new firearm units. Demand Intelligence measures search intent — what shoppers typed, including empty / unmet searches that never become a sale. One is what sold. The other is what they asked for.",
  },
  {
    q: "Is Demand Intelligence a RetailBI replacement?",
    a: "No. Keep the Index for register truth. Add the ask for typed intent and unmet demand. We do not sell Gearfire's sales data.",
  },
  {
    q: "I searched retailbi alternative — do I rip out sell-through?",
    a: "No. Searching alternative often means you want a second number, not to rip out what sold. Add Demand Intelligence beside what sold.",
  },
  {
    q: "Is Coriolis affiliated with Gearfire or RetailBI?",
    a: "No. We are not affiliated with Gearfire or RetailBI. We do not sell their sales data.",
  },
  {
    q: "Do you sell Gearfire's sales data?",
    a: "No. RetailBI sales data is theirs. Demand Intelligence is anonymized searches from GunSearchEngine, GunSearchAgent on dealer sites, and related search tools.",
  },
  {
    q: "Is this ATF / 4473 software?",
    a: "No. Not 4473, NICS processing, or bound-book software. Those stay with the systems licensed for them.",
  },
  {
    q: "How do I see guns and ammo people searched for but could not find?",
    a: "That is empty-search demand - they looked, nothing matched. Request a Demand Intelligence demo, or see Unmet Demand on the Demand Intelligence page. Dealer sites can also write empty searches down with GunSearchAgent.",
  },
  {
    q: "What should OEMs use instead of only NICS or sell-through?",
    a: "Use three numbers and do not mix them up: NICS is checks, not sales. RetailBI Index is sold units at the same stores. Search intent is what people typed — including empties. Keep sell-through. Add the ask.",
  },
];
