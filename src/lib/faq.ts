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
    a: "Setup is $500 for a clean launch or $2,500 for the full custom site and email. Monthly plans: Minute Man $169, Militia $269, Gun Runner $369, Warlord $469, Accelerator $569. No annual contract. If you walk, you take the website.",
  },
  {
    q: "Can you use WooCommerce to sell guns?",
    a: "Yes, when a licensed FFL owns the store and checkout is built for dealer transfer. Coriolis builds that WooCommerce store on your domain, with FFL Cockpit catalogs and FFL Checkout. Serialized firearms ship to a receiving FFL. This is not legal advice. We do not run 4473, NICS, or the bound book.",
  },
  {
    q: "Is WooCommerce good for firearms?",
    a: "It is the stack we use because you own the site. Template platforms (AmmoReady, Gearfire) put your inventory on pages you do not write. WooCommerce on your domain lets you write titles, slugs, and schema. Militia ($269/mo) adds dropshipping. The plan we put dealers on is FFL Accelerator ($569/mo).",
  },
  {
    q: "Can I sell guns I do not stock?",
    a: "Yes. FFL Cockpit streams twenty-one distributor catalogs. A serialized firearm ships to a receiving FFL. You can still sell what is in the safe. This is not legal advice. We do not run your 4473, NICS, or bound book.",
  },
  {
    q: "I already have a register. Do I throw it out?",
    a: "No. Bring the register you already run. Warlord and Accelerator connect AIM, MicroBiz, Rapid Gun Systems, Trident 1, and Corestore.",
  },
  {
    q: "I'm on AmmoReady or Gearfire. Can you replace the site without going dark?",
    a: "Yes. We build WooCommerce on your domain first, move what ranks, test a live cart, then cut DNS. Do not give notice until the new store is ready.",
  },
  {
    q: "Do I own it?",
    a: "Yes. It is WooCommerce on your domain. Cancel and the site goes with you.",
  },
  {
    q: "What about Shopify?",
    a: "Coriolis builds WooCommerce you own. We do not sell a Shopify gun-store product. FFL Cockpit and FFL Checkout are WooCommerce plugins. See the WooCommerce vs Shopify page for the ownership difference.",
  },
];

export const FAQ_DROPSHIP: FaqItem[] = [
  {
    q: "Is firearms dropshipping legal?",
    a: "It can be, when you hold a valid FFL and follow federal, state, and local rules. Serialized firearms ship FFL-to-FFL. You log the transaction in the bound book you already use. Coriolis is not 4473 software, not a NICS system, and not a bound-book replacement. This page is not legal advice.",
  },
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
  {
    q: "I am a home-based FFL. Can I dropship without a storefront?",
    a: "Dropshipping can run without a retail floor. You still need a valid FFL and you still follow the rules that apply to your premises. Coriolis does not advise on zoning, HOA, or ATF premises questions. Talk to your attorney and the ATF. This is not legal advice.",
  },
];

export const FAQ_COCKPIT: FaqItem[] = [
  {
    q: "Is FFL Cockpit a website?",
    a: "No. FFL Cockpit is the plugin for distributor catalogs, FFL Checkout, and order routing. You still need a WooCommerce storefront. Coriolis builds and hosts that storefront.",
  },
  {
    q: "Do I buy FFL Cockpit from Coriolis?",
    a: "Licenses live on fflcockpit.com. Militia ($269/mo) and every plan above it include the FFL Cockpit and FFL Checkout licenses. We configure them as part of setup. Coriolis does not own the FFL Cockpit brand.",
  },
  {
    q: "I already have FFL Cockpit. Can you just build the site?",
    a: "Yes. That is the usual job: custom WooCommerce on your domain, Cockpit configured, hosting and support from Coriolis.",
  },
  {
    q: "Who hosts FFL Cockpit WooCommerce?",
    a: "Coriolis hosts the WooCommerce store. FFL Accelerator includes unlimited hosting on WP Engine (Coriolis is a WP Engine agency partner) and a 99.95% SLA. Militia and above include the Cockpit and Checkout licenses we configure at setup.",
  },
];

export const FAQ_AMMOREADY: FaqItem[] = [
  {
    q: "Is Coriolis a hosted AmmoReady clone?",
    a: "No. Coriolis is the opposite model: open WooCommerce you own, FFL Cockpit for catalogs, and no vendor lock-in on the storefront.",
  },
  {
    q: "What about Gearfire?",
    a: "See the Gearfire alternative page. Same owned-Woo model. We are not affiliated with Gearfire or RetailBI.",
  },
  {
    q: "How do you migrate a live AmmoReady store?",
    a: "Keep your domain. We stand up Woo on it before you give notice. Map the catalog and redirect the pages that already rank. Wire FFL Checkout, payments, and taxes, then test a mixed cart. Connect the register only if you want the floor and the site in sync. Cut DNS. You leave with the site. Coriolis was founded by the person who ran AmmoReady for nine years.",
  },
  {
    q: "What does setup cost?",
    a: "Setup is $500 or $2,500. Monthly hosting starts after we talk. FFL Accelerator is $569 a month.",
  },
];

export const FAQ_GEARFIRE: FaqItem[] = [
  {
    q: "Is Coriolis affiliated with Gearfire or RetailBI?",
    a: "No. Marks belong to their owners. We do not sell Gearfire’s sales data.",
  },
  {
    q: "Can I leave Gearfire without going dark?",
    a: "Yes. Keep your domain. We stand up WooCommerce before you give notice, map the catalog, redirect the pages that already rank, test a mixed cart, then cut DNS. Do not give notice until the new store is ready.",
  },
  {
    q: "What is Gearfire’s 2026 price?",
    a: "We do not republish Gearfire’s fee card. It is theirs and it changes. Compare their invoice to the published Coriolis ladder: Minute Man $169, Militia $269, Gun Runner $369, Warlord $469, FFL Accelerator $569. Setup $500 or $2,500.",
  },
  {
    q: "What about FirearmCart and Gunpowdr?",
    a: "Dealers compare those storefronts too. We do not republish their fee cards or invent their catalog internals. The Coriolis column is the one we publish: WooCommerce you own, 21 distributors via FFL Cockpit, the register you already run.",
  },
  {
    q: "Does switching off Gearfire kill RetailBI?",
    a: "No. Demand Intelligence is not a RetailBI replacement. Keep the Index for what sold. Add search intent if you want what people typed. See Demand Intelligence vs RetailBI.",
  },
];

export const FAQ_EMAIL: FaqItem[] = [
  {
    q: "What email is included with FFL Accelerator?",
    a: "FFL Accelerator ($569/mo) includes email capture, list management, and campaign management: welcome, abandoned cart, back in stock, and thank you. We do not publish an LTV multiple.",
  },
  {
    q: "What if I need the full email build at setup?",
    a: "Retail Setup ($2,500) includes complete email marketing setup, CRM integration, a custom brand kit and template, welcome / abandoned-cart / back-in-stock series, and deliverability work. Basic Setup ($500) includes email capture implementation.",
  },
  {
    q: "Do I have to stay on Coriolis to keep the list?",
    a: "The site is yours. Cancel and the website goes with you. Email platform accounts you own stay yours.",
  },
];

export const FAQ_SHOPIFY: FaqItem[] = [
  {
    q: "Does Coriolis build Shopify gun stores?",
    a: "No. Coriolis builds WooCommerce you own. FFL Cockpit and FFL Checkout are WooCommerce plugins.",
  },
  {
    q: "Why WooCommerce instead of Shopify for an FFL?",
    a: "You leave with the site. Shopify is a hosted platform with its own acceptable-use rules. We do not republish Shopify’s fee card or write their policy. The published Coriolis offer is owned WooCommerce, FFL Cockpit, and the register you already run.",
  },
  {
    q: "Can WooCommerce sell guns?",
    a: "Yes, when a licensed FFL owns the store and checkout is built for dealer transfer. Serialized firearms ship FFL-to-FFL. This is not legal advice.",
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
    a: "RetailBI tells you what sold - guns that rang at the register or checked out online, including their monthly Index of new guns sold at the same stores as last year. Demand Intelligence tells you what people typed when they searched, including empty searches. One is what sold. The other is what they asked for.",
  },
  {
    q: "Is Demand Intelligence a RetailBI replacement?",
    a: "No. Keep the Index for what sold at the register. Add the ask for typed intent and empty searches. We do not sell Gearfire's sales data.",
  },
  {
    q: "I searched retailbi alternative — do I rip out sell-through?",
    a: "No. Searching \"alternative\" often means you want a second number, not to rip out what sold. Add Demand Intelligence beside what sold.",
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
    a: "No. Not 4473 software. Not NICS. Not your bound book. Those stay with the systems licensed for them.",
  },
  {
    q: "How do I see guns and ammo people searched for but could not find?",
    a: "That is empty-search demand - they looked, nothing matched. Request a Demand Intelligence demo, or see Unmet Demand on the Demand Intelligence page. Dealer sites can also write empty searches down with GunSearchAgent.",
  },
  {
    q: "What should brands use instead of only NICS or what sold?",
    a: "Use three numbers and do not mix them up: NICS is checks, not sales. RetailBI Index is sold units at the same stores. Search intent is what people typed - including empties. Keep what sold. Add the ask.",
  },
];
