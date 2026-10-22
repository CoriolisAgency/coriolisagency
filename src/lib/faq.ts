import { GOOGLE_REVIEW_COUNT } from "./google-reviews";

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ECOMMERCE: FaqItem[] = [
  {
    q: "What is FFL Accelerator?",
    a: "It is the Coriolis plan for a gun store that wants a real website. $569 a month. We build WooCommerce on your domain and connect catalogs and checkout. The site is yours.",
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
    a: "It is the stack we use because you own the site. Template platforms (AmmoReady, Gearfire) put your inventory on pages you do not write. WooCommerce on your domain lets you write the titles and the page copy. Militia ($269/mo) adds dropshipping. The plan we put dealers on is FFL Accelerator ($569/mo).",
  },
  {
    q: "Can I sell guns I do not stock?",
    a: "Yes. FFL Cockpit streams twenty-one distributor catalogs. A serialized firearm ships to a receiving FFL. You can still sell what is in the safe. This is not legal advice. We do not run your 4473, NICS, or bound book.",
  },
  {
    q: "I already have a register. Do I throw it out?",
    a: "No. Bring the register you already run. Warlord and Accelerator connect AIM, GunBiz, Rapid Gun Systems, and Trident 1.",
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

/** Agency home (SEO-U4). Facts and prices as FAQ_ECOMMERCE states them. */
export const FAQ_HOME: FaqItem[] = [
  {
    q: "What does Coriolis do?",
    a: "We build and host WooCommerce websites for FFL dealers: gun shops, online-only FFLs, ranges and gunsmiths. The store is on your domain and you own it.",
  },
  {
    q: "What does an FFL website cost?",
    a: "Setup is $500 for a clean launch or $2,500 for the full custom site and email. Monthly plans run from Minute Man at $169 to FFL Accelerator at $569. No annual contract.",
  },
  {
    q: "Can I leave AmmoReady or Gearfire without my site going dark?",
    a: "Yes. Our switch guides for AmmoReady and Gearfire walk through it step by step. And if you ever leave us, you take the website with you.",
  },
  {
    q: "Does it work with my register?",
    a: "Yes. We connect the WooCommerce store to the register you already run, such as GunBiz or AIM.",
  },
  {
    q: "Do you file 4473s or run NICS?",
    a: "No. We don't file a 4473, run NICS, keep your bound book or run your register. Serialized guns ship to a receiving FFL.",
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
    a: "Militia and above include an FFL Cockpit license and 21 distributor catalogs with automated lowest-cost fulfillment. Sports South, RSR, and Zanders are typical starting points. We add catalogs during setup.",
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
    a: "Leaving Gearfire? See the Gearfire alternative page. Same owned-Woo model. We are not affiliated with Gearfire or RetailBI.",
  },
  {
    q: "How do you migrate a live AmmoReady store?",
    a: "Keep your domain. We stand up Woo on it before you give notice. Map the catalog and redirect the URLs that already rank. Wire FFL Checkout, payments, and taxes, then test a mixed cart. Connect the register only if you want the floor and the site in sync. Cut DNS. You leave with the site. Coriolis was founded by the person who ran AmmoReady for nine years.",
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
    a: "Yes. Keep your domain. We stand up WooCommerce before you give notice, map the catalog, redirect the URLs that already rank, test a mixed cart, then cut DNS. Do not give notice until the new store is ready.",
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

/** /orchid-alternative (SEO S4). No Orchid prices beyond POS Spark's published $99/mo. */
export const FAQ_ORCHID: FaqItem[] = [
  {
    q: "Is Coriolis an Orchid reseller or partner?",
    a: "No. We are not affiliated with Orchid. We build and host WooCommerce stores.",
  },
  {
    q: "Can I keep Orchid eBound and use a Coriolis website?",
    a: "Yes. Your bound book is your compliance record and stays where it is. The website is a separate decision.",
  },
  {
    q: "FastBound or Orchid eBound: which is better?",
    a: "Both are electronic A&D bound books with e4473. Pick on compliance support and how it connects to your register. The comparison section on this page lays out what each vendor publishes.",
  },
  {
    q: "How much does Orchid eBound cost?",
    a: "Orchid sets its own eBound pricing; check Orchid’s pricing page or ask Orchid. POS Spark lists at $99/mo. Coriolis plans start at $169/mo for the website only.",
  },
  {
    q: "Does Coriolis do 4473 or NICS?",
    a: "No. Not 4473 software. Not a NICS system. Not a bound-book replacement.",
  },
  {
    q: "What do I keep if I leave?",
    a: "The website: your domain, your content, and your WooCommerce data.",
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

export const FAQ_WOO_SELL_GUNS: FaqItem[] = [
  {
    q: "Can you use WooCommerce to sell guns?",
    a: "Yes. WooCommerce is open-source, and a licensed FFL can run a gun store on it when it is self-hosted. You need a payment processor that accepts firearms, a host that allows them, and a checkout that ships every gun to a receiving FFL. This is not legal advice.",
  },
  {
    q: "Does WooPayments allow firearms?",
    a: "No. WooPayments lists firearms and ammunition as prohibited. Use a merchant account approved for firearms and connect it through a gateway: GOAT Payments, or bring your own.",
  },
  {
    q: "Can I use Stripe, Square, or PayPal for a gun store?",
    a: "Square and PayPal prohibit firearm sales. Stripe moved legal firearms to a restricted category in late 2025 and asks those businesses to contact its sales team, so expect a review before approval.",
  },
  {
    q: "Can I host a WooCommerce gun store on WordPress.com?",
    a: "No. WordPress.com prohibits selling firearms, parts, accessories, and ammunition on its hosted sites. It does not prohibit firearms merchants from running the WooCommerce software on another host.",
  },
  {
    q: "Do guns sold online have to ship to an FFL?",
    a: "When an unlicensed buyer orders from out of state, the gun ships to a licensed dealer in the buyer's home state, who handles the transfer. Your checkout should only offer FFL shipping for firearms. This is not legal advice.",
  },
  {
    q: "What plugin adds an FFL dealer selector to WooCommerce?",
    a: "FFL Checkout from FFL Cockpit, Automatic FFL, and FFL Bridge all add a dealer search to checkout. Coriolis includes FFL Checkout on Militia and above.",
  },
  {
    q: "Can WooCommerce block shipments to restricted states?",
    a: "Yes, with shipping rules and an FFL plugin that has state restriction settings. California, for example, requires ammunition bought online to go to a licensed ammunition vendor. Someone has to keep those rules current.",
  },
  {
    q: "Does Coriolis handle background checks or the bound book?",
    a: "No. Coriolis builds and runs the WooCommerce store. The 4473, NICS, and the bound book stay with the systems licensed for them.",
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
    a: "Bring the register you already run. Warlord and Accelerator connect AIM, GunBiz, Rapid, and Trident 1. Coriolis is not 4473, NICS, or bound-book software. Those stay with the systems licensed for them. This is not legal advice.",
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
    a: "No. RetailBI sales data is theirs. Demand Intelligence is anonymized searches from GunSearchEngine.com, including on dealer sites, and related search tools.",
  },
  {
    q: "Is this ATF / 4473 software?",
    a: "No. Not 4473 software. Not NICS. Not your bound book. Those stay with the systems licensed for them.",
  },
  {
    q: "How do I see guns and ammo people searched for but could not find?",
    a: "That is empty-search demand - they looked, nothing matched. Request a Demand Intelligence demo, or see Unmet Demand on the Demand Intelligence page. Dealer sites can also write empty searches down with GunSearchEngine.com.",
  },
  {
    q: "What should brands use instead of only NICS or what sold?",
    a: "Use three numbers and do not mix them up: NICS is checks, not sales. RetailBI Index is sold units at the same stores. Search intent is what people typed - including empties. Keep what sold. Add the ask.",
  },
];

/** /demand-intelligence (SEO-U24, D-N16). Ported word for word from the GSE page's FAQS. */
export const FAQ_DEMAND_INTELLIGENCE: FaqItem[] = [
  {
    q: "Do I only see my brand and three competitors?",
    a: "No. Every plan includes full-market anonymized demand - the whole category, not a tiny competitor-only view. Optional brand pins help dashboards and digests highlight your labels; they do not hide the rest of the market.",
  },
  {
    q: "How do the three plans differ?",
    a: "Insight: full market demand for brand managers who don't have a data team (what's rising for up to 30 Eastern Time days - no session list or export). Growth: same market view, plus privacy-safe sessions and CSV when you need to dig (longer lookback). Platform: full feed for analysts - export, inventory search when linked, and an assistant hook if you want it. (Dealer market pulse is a separate 7-day view.)",
  },
  {
    q: "How do team seats work?",
    a: "Every plan includes 1 free Client Admin seat. Additional named users (Client Users or extra admins) are $49/user/month. Seat headcount is enforced in the portal Team page; purchase additional seats through Coriolis during onboarding or expansion.",
  },
  {
    q: "What are rising totals vs sessions vs export?",
    a: "Rising totals are aggregates (calibers/brands/loads going up). Sessions are privacy-safe journey rows (no emails or session ids). Export packages those rows as CSV and/or JSON for data teams. Full-market rising totals are available on every plan; depth and portability increase with Growth and Platform.",
  },
  {
    q: "How fresh is the data?",
    a: "Sessions are captured as shoppers search (including dealer embeds). Dashboard and API windows use Eastern Time calendar ranges. Short windows use a live sample; multi-day windows use saved daily totals where available.",
  },
  {
    q: "What do I get via API?",
    a: "REST with secure keys. All plans: demand endpoints within your max lookback. Growth+: sessions list. Growth: CSV export. Platform: JSON and CSV export with optional search-event detail. Docs: gunsearchengine.com/docs/enterprise-api.",
  },
  {
    q: "How do I request a demo?",
    a: "Request a demo on any plan. We capture company, contact, phone, and email, then follow up to schedule a demo. Portal and API keys open after review.",
  },
  {
    q: "Is this a RetailBI replacement?",
    a: "No. RetailBI reports what sold. This reports what people asked for. We are not affiliated with Gearfire or RetailBI.",
  },
];

/** SEO-U5 PR B (Brandy FINAL, 10/21): /ffl-website-cost. */
export const FAQ_COST: FaqItem[] = [
  {
    q: "How much does an FFL website cost?",
    a: "An FFL website at Coriolis is a one-time setup of $500 or $2,500, plus a monthly plan from $169 to $569. Plans start with Minute Man at $169 for the website on your own domain and go up to FFL Accelerator at $569, which includes a webmaster. There's no annual contract.",
  },
  {
    q: "What's the difference between the $500 and $2,500 setup?",
    a: "Basic Setup is $500 for a clean launch, and extra custom pages are $125 each. Retail Setup is $2,500 for the full custom site and email, with up to ten custom pages.",
  },
  {
    q: "Is there a contract?",
    a: "No. There's no annual contract, and you can cancel any time. If you walk, you take the website.",
  },
  {
    q: "What does it cost to connect my register to the website?",
    a: "Connecting your register is the Warlord plan at $469 a month. It syncs the site with any third-party register that works with WooCommerce. FFL Accelerator at $569 includes it too, and your register subscription stays with the company you buy it from.",
  },
  {
    q: "What isn't included in the monthly price?",
    a: "Three things aren't in the plan price: card processing, your register subscription and compliance software. We install the payment gateway at setup, or you bring your own, and the merchant account and its fees are yours. We don't run your 4473, NICS or bound book. Support on Minute Man is $125 per incident, and Militia and up include email support.",
  },
  {
    q: "Who is Coriolis?",
    a: `Coriolis builds and hosts WooCommerce websites for FFLs: gun shops, online-only FFLs, ranges, gunsmiths and instructors. We have 100+ clients and a 5-star Google rating from ${GOOGLE_REVIEW_COUNT} reviews, and we're members of NSSF, Firearms Policy Coalition and Gun Owners of America. Our founder ran AmmoReady for nine years. Call (279) 258-6771.`,
  },
];

/** SEO-U5 PR B (Brandy FINAL, 10/21): /leave-ammoready. */
export const FAQ_LEAVE_AMMOREADY: FaqItem[] = [
  {
    q: "Can I leave AmmoReady without my site going offline?",
    a: "Yes, if you go in order. Get the domain in your name, build the new store on it, redirect the pages that rank, then switch DNS.",
  },
  {
    q: "When should I give AmmoReady notice?",
    a: "Not until the new store is ready. We build it on your domain first, so you give notice with the new site already standing.",
  },
  {
    q: "Do I keep my domain?",
    a: "Yes, once the registrar account is in your name. Find out who holds it and fix that first, because everything else depends on it. Then we build the new WooCommerce store on your domain before you give notice.",
  },
  {
    q: "Will I lose my Google rankings?",
    a: "Nobody can promise rankings, but you protect them by redirecting the pages that bring you traffic. Google Search Console shows which product, category and info pages those are. Each one gets redirected to its page on the new store.",
  },
  {
    q: "Can I keep selling distributor products after I leave AmmoReady?",
    a: "Yes. Distributor catalogs run through FFL Cockpit, starting with the Militia plan at $269 a month, which includes 21 distributor catalogs. If you only sell your own stock, Minute Man at $169 covers it.",
  },
  {
    q: "What does it cost to switch from AmmoReady?",
    a: "Setup is $500 or $2,500, then $169 to $569 a month, with no annual contract. We don't publish AmmoReady's prices, so put your current invoice next to our plan ladder.",
  },
];

/** SEO-U5 PR B (Brandy FINAL, 10/21): /leave-gearfire. */
export const FAQ_LEAVE_GEARFIRE: FaqItem[] = [
  {
    q: "Can I leave Gearfire without going offline?",
    a: "Yes, if you do it in order. Get your domain in your name, build WooCommerce on it, redirect the pages that rank, test a mixed cart, then switch DNS.",
  },
  {
    q: "Do I keep my domain if I leave Gearfire?",
    a: "Yes, once the registrar account is in your name. Find out who holds it and fix that first, because everything else depends on it. Then we build WooCommerce on your domain before you give notice.",
  },
  {
    q: "When should I tell Gearfire I'm leaving?",
    a: "Not until the new store is ready. We build it on your domain first, then you give notice.",
  },
  {
    q: "What happens to the pages that rank on Google now?",
    a: "You redirect each one to its new page, so the links Google already has still land somewhere. Google Search Console shows which product, category and info pages bring you traffic. Nobody can promise rankings after a move.",
  },
  {
    q: "Can I connect my register to the new site?",
    a: "Yes, if you want the floor and the site in sync. That's the Warlord plan at $469 a month or FFL Accelerator at $569.",
  },
  {
    q: "How does the cost compare with Gearfire?",
    a: "Put your current Gearfire invoice next to our numbers: setup of $500 or $2,500, then $169 to $569 a month. We don't republish Gearfire's fee card, because it's theirs and it changes.",
  },
];

/** SEO-U5 PR B (Brandy FINAL, 10/21): /ai-studio. */
export const FAQ_AI_STUDIO: FaqItem[] = [
  {
    q: "What can AI do for a gun store?",
    a: "AI can do the daily jobs you'd rather not do by hand. That means a morning count of last night's orders and what's on the shelf, sales and accounting answers from QuickBooks, and read-only answers about what your FastBound book says. It can also schedule policy-safe Facebook posts and report site problems to support for you.",
  },
  {
    q: "Will AI touch my 4473s or my bound book?",
    a: "It never touches a 4473, and it only reads your bound book. FastBound is read only, so it can tell you what the book says but never writes a disposition. It doesn't change your hosting, DNS or billing either.",
  },
  {
    q: "What does it cost to get started with AI?",
    a: "Grok Bot setup is $995, one time, and it isn't a monthly bill from us. You buy your own Cursor or xAI seat, at prices they set.",
  },
  {
    q: "Can you build a custom app or AI agent for my business?",
    a: "Yes. Bring the brief and the budget. Botopticon.com, GunSearchEngine.com, Demand Intelligence and Gun Store Game are live work we already shipped.",
  },
  {
    q: "Do I have to host my website with you to use it?",
    a: "No. You don't have to host with us to get Grok Bot setup. If you want a dealer website, start on our FFL ecommerce page.",
  },
];

/** SEO-U5 PR B (Brandy FINAL, 10/21): /grok-bot-setup. */
export const FAQ_GROK_BOT: FaqItem[] = [
  {
    q: "Is Grok Bot a chatbot for my gun store?",
    a: "It isn't a chat widget for your website. It's an AI assistant set up for you and your staff to do shop jobs: a morning count of last night's orders and what's on the shelf, answers to accounting questions, scheduled Facebook posts, and a support bot for site problems.",
  },
  {
    q: "What does Grok Bot setup cost?",
    a: "$995, one time. It isn't a monthly bill from us. That covers a one-hour consult, then a second meeting where we build it, test it and sit with you until you can run it.",
  },
  {
    q: "What else do I have to pay for?",
    a: "Your own Cursor or xAI seat, at their prices. Today those are Cursor Teams Premium at $120 per seat per month, Cursor Ultra at $200 a month, or SuperGrok Heavy at $300 a month (x.ai/bot). They set those prices and can change them, and we set Grok Bot up on your seat, never ours.",
  },
  {
    q: "What tools does Grok Bot connect to?",
    a: "QuickBooks, FastBound and Facebook, the tools you already own. QuickBooks answers sales and accounting questions, FastBound is read only, and Facebook gets scheduled, policy-safe posts with no comments and no ads. We hook up what you already own. We don't sell you the tool.",
  },
  {
    q: "What won't Grok Bot do?",
    a: "It won't touch a 4473, and it never writes a disposition in FastBound. It doesn't change your hosting, DNS or billing, and it doesn't run your register.",
  },
  {
    q: "What support do I get after setup?",
    a: "On-demand support when you need it. It's not 24/7, and it's not a retainer.",
  },
];

/** SEO-U5 PR B (Brandy FINAL, 10/21): /ffl-analytics. */
export const FAQ_FFL_ANALYTICS: FaqItem[] = [
  {
    q: "What is FFL Analytics?",
    a: "FFL Analytics is a free report of what shoppers typed into your website's search, including what they couldn't find. It also shows which sites sent the visitors who searched. You get it in your GSE dealer dashboard and in a morning email.",
  },
  {
    q: "Is FFL Analytics free?",
    a: "Yes. It's free with any GSE dealer account, including free GSE Basic, and GSE Basic is free forever. Pro is optional: sign up by Dec 31, 2026 and get Pro free through Dec 31, 2027, then it's $99 a month.",
  },
  {
    q: "How is FFL Analytics different from Google Analytics?",
    a: "Google Analytics shows how many people visited, and FFL Analytics shows what they were looking for. It doesn't replace Google's traffic reports, so run them side by side. FFL Analytics isn't affiliated with Google.",
  },
  {
    q: "What's in the FFL Analytics morning email?",
    a: "A summary of the last 24 hours of searches on your website, in your inbox around 6:30 AM Eastern. It covers sessions, searches, and the top calibers, brands and types shoppers looked for. Turn it on in your dealer settings once the script is running.",
  },
  {
    q: "What do I have to install?",
    a: "Just the GSE script on your website. You don't have to list any inventory on GunSearchEngine.com to use it. Once the script is running, you get the dashboard and the morning email.",
  },
];

/** SEO-U32 /ffl-seo FAQ (Brandy FINAL; FAQ 1 [CONFIRM: Paul] placeholder deleted). */
export const FAQ_FFL_SEO: FaqItem[] = [
  {
    q: "What is FFL SEO?",
    a: "FFL SEO is search engine optimization for gun stores and FFL dealers: getting your own website found on Google when shoppers search for what you sell. Coriolis does SEO for FFL dealers.",
  },
  {
    q: "Is there free SEO help for gun stores?",
    a: "Yes. FFL Search Console is free with any GSE dealer account, including free GSE Basic, with no Pro required. It gives you a weekly fix list and shows the Google searches that find you.",
  },
  {
    q: "What does FFL Search Console show?",
    a: "Four tabs: Fix this week, Google searches that find you, What shoppers ask for, and How your GSE listing shows on Google. Fix this week is a short list from a light check run at most once a week. The shopper tab covers the last 7 days, and the listing tab covers the last 28 days.",
  },
  {
    q: "Do I have to connect my Google account?",
    a: "No. Two tabs work without it: what shoppers ask for, and how your GSE listing shows on Google. Connect Google Search Console to see the searches that find your own website.",
  },
  {
    q: "Can it change my website or my Google account?",
    a: "No. It\u2019s read-only. It reads and shows, and you decide what to fix.",
  },
  {
    q: "Can I do SEO on a template FFL website?",
    a: "Only a little, because on template platforms you don\u2019t control the title tag, the slugs or the markup. A WooCommerce site on your own domain gives you your slugs, your content and your schema.",
  },
];

/** SEO-U32 /ffl-search-console FAQ (Brandy FINAL). */
export const FAQ_FFL_SEARCH_CONSOLE: FaqItem[] = [
  {
    q: "Is FFL Search Console free?",
    a: "Yes. FFL Search Console is free with any GSE dealer account, including free GSE Basic. No Pro required.",
  },
  {
    q: "Do I have to connect Google?",
    a: "No. Two tabs work without it: what shoppers ask for, and how your GSE listing shows on Google. Connect Google Search Console to see the searches that find your own website.",
  },
  {
    q: "Can it change my site or my Google account?",
    a: "No. It\u2019s read-only. It reads and shows, and you decide what to fix.",
  },
  {
    q: "Is FFL Search Console real-time?",
    a: "No. It pulls your Google data on a schedule: a starting baseline, then regular snapshots and updates. The fix list comes from a check run at most once a week.",
  },
];

/** SEO-U30 /ffl-payment-processing FAQ (Brandy FINAL; the FAQ 3 [CONFIRM: Paul] slot is left out until Paul answers). */
export const FAQ_PAYMENTS: FaqItem[] = [
  {
    q: "What is FFL payment processing?",
    a: "It\u2019s how a gun store takes cards online: a merchant account that allows firearm sales, connected to your website through a payment gateway. The gateway moves the card data. The merchant account is the part that gets approved for your business.",
  },
  {
    q: "Why do payment processors turn down gun stores?",
    a: "Many mainstream processors and store payment add-ons list firearms and ammunition as prohibited, and the card industry generally treats firearms as high-risk. Dealers use a merchant account underwritten for firearms by a bank or processor that accepts FFLs.",
  },
  {
    q: "What does Coriolis set up for payments?",
    a: "Coriolis installs the payment gateway as part of setup, on Basic Setup ($500) or Retail Setup ($2,500). We enable it, run a small live authorization and void it. Then you test a non-firearm order, and a firearm order once ship-to-FFL is on.",
  },
  {
    q: "Who owns the merchant account, and who pays the fees?",
    a: "You do. The merchant account is in your store\u2019s legal name, and its fees are yours.",
  },
  {
    q: "Can Coriolis get my store approved?",
    a: "No one can promise approval, because the processor decides. Make sure the account is approved for what you sell (firearms, ammunition or both), and get that approval in writing before you launch.",
  },
  {
    q: "Does the payment step handle the 4473 or the transfer?",
    a: "No. The gateway charges the card. It doesn\u2019t check a 4473, run a background check or pick the receiving dealer. FFL Checkout handles dealer selection on Militia and above. This is not legal advice.",
  },
];
