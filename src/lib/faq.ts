
import { faqMd } from "./md";

export interface FaqItem {
  q: string;
  /** Plain text, used for FAQPage JSON-LD. */
  a: string;
  /** Optional rendered answer with inline links (SEO-REFRESH-P1). */
  html?: string;
}

export const FAQ_ECOMMERCE: FaqItem[] = [
  faqMd("What is FFL website design?", "FFL website design is a WooCommerce store a licensed dealer owns, on their own domain, with the catalog, FFL checkout, and the option to dropship or connect the register you already run. Coriolis builds it, hosts it and supports it."),
  faqMd("How long does an FFL website take?", "It depends on your catalog and where you're coming from. We'll give you a timeline after we see your current site."),
  faqMd("Can I sell on GunBroker from the site?", "Yes. Militia and above include marketplace integrations, with GunBroker.com and AmmoSeek.com on the list."),
  faqMd("I'm an online-only FFL. Can you build the store?", "Yes, if you have a valid FFL. We build WooCommerce on your domain, and FFL dropshipping fills the catalog."),
  faqMd("What is FFL Accelerator?", "It is the $569 a month Coriolis plan for a gun store that wants the site built, hosted, and run for you on a domain you own, with catalogs and checkout connected."),
  faqMd("What do I pay to start?", "Setup is $500 for a clean launch or $2,500 for the full custom site and email. Monthly plans are Minute Man $169, Militia $269, Gun Runner $369, Warlord $469, and Accelerator $569, with no annual contract, and if you walk, you take the website."),
  faqMd("Can you use WooCommerce to sell guns?", "Yes, when a licensed FFL owns the store and checkout is built for dealer transfer. Coriolis builds that WooCommerce store on your domain, with FFL Cockpit catalogs and FFL Checkout, and serialized firearms ship to a receiving FFL. This is not legal advice. We do not run 4473, NICS, or the bound book."),
  faqMd("Is WooCommerce good for firearms?", "It is the stack we use because you own the site. Template platforms (AmmoReady, Gearfire) put your inventory on pages you do not write. WooCommerce on your domain lets you write the titles and the page copy. Militia ($269/mo) adds dropshipping. The plan we put dealers on is FFL Accelerator ($569/mo)."),
  faqMd("Can I sell guns I do not stock?", "Yes. FFL Cockpit streams twenty-one distributor catalogs, a serialized firearm ships to a receiving FFL, and you can still sell what is in the safe."),
  faqMd("I already have a register. Do I throw it out?", "No. Bring the register you already run. Warlord and Accelerator connect any POS that works with WooCommerce, such as AIM, MicroBiz, Rapid Gun Systems or Trident 1."),
  faqMd("I'm on AmmoReady or Gearfire. Can you replace the site without going dark?", "Yes. We build WooCommerce on your domain first, move what ranks, test a live cart, then cut DNS. Do not give notice until the new store is ready."),
  faqMd("Do I own it?", "Yes. It is WooCommerce on your domain, and if you cancel, the site goes with you."),
  faqMd("What about Shopify?", "Coriolis builds WooCommerce you own. We do not sell a Shopify gun-store product. FFL Cockpit and FFL Checkout are WooCommerce plugins. See the [WooCommerce vs Shopify](/woocommerce-vs-shopify-for-gun-stores) page for the ownership difference."),
];

/** Agency home (SEO-U4). Facts and prices as FAQ_ECOMMERCE states them. */
export const FAQ_HOME: FaqItem[] = [
  faqMd("What does Coriolis do?", "We build and host WooCommerce websites for FFL dealers, including gun shops, online-only FFLs, ranges, and gunsmiths. The store lives on your domain, and you own it."),
  faqMd("What does an FFL website cost?", "A clean launch is $500; the full custom site and email is $2,500. Monthly plans run from Minute Man at $169 to FFL Accelerator at $569, with no annual contract."),
  faqMd("Can I leave AmmoReady or Gearfire without my site going dark?", "Yes. The switch guides for [AmmoReady](/leave-ammoready) and [Gearfire](/leave-gearfire) walk through it in order, and if you ever leave us, you take the website with you."),
  faqMd("Does it work with my register?", "Yes. We connect the WooCommerce store to the register you already run, including AIM, MicroBiz, Rapid Gun Systems, Trident 1, or another POS that works with WooCommerce."),
  faqMd("Do you file 4473s or run NICS?", "No. We don't file a 4473, run NICS, or keep your bound book; your register stays with your POS company, we connect the website to it, and serialized guns ship to a receiving FFL."),
];

export const FAQ_DROPSHIP: FaqItem[] = [
  faqMd("What is firearms dropshipping for an FFL?", "It lets a licensed FFL list a wholesale distributor's catalog, take the order on their own site, and have the distributor ship it. Serialized firearms go to a receiving FFL for transfer, and accessories or ammo go to the customer where the destination allows it."),
  faqMd("Is firearms dropshipping legal?", "It can be, when you hold a valid FFL and follow federal, state and local rules, and serialized firearms ship FFL to FFL. The legal sentence on 4473, NICS and the bound book is in the section above."),
  faqMd("Do I need an FFL to dropship firearms?", "Yes. Only a licensed dealer can sell firearms this way, and serialized firearms ship to another FFL for transfer, not to the buyer's door."),
  faqMd("Can I dropship ammunition and accessories to the customer?", "Yes, where the destination allows it. Non-serialized goods often ship to the customer. What ships where is the distributor's rule, and state and local rules still apply at checkout."),
  faqMd("What does FFL dropshipping cost on a store I own?", "Coriolis Militia is $269 a month. It includes the FFL Cockpit and FFL Checkout licenses, 21 distributor catalogs and hosting, and setup is $500 or $2,500. There is no contract and you can cancel at any time."),
  faqMd("I'm a home-based FFL. Can I dropship without a storefront?", "Yes. You still need a valid FFL and you still follow the rules for your premises. Coriolis doesn't advise on zoning, HOA or ATF premises questions, so talk to your attorney and the ATF."),
  faqMd("What if I also stock my own inventory?", "Run both. Minute Man ($169/mo) is own-inventory WooCommerce, and Militia ($269/mo) adds dropshipping on top. Brick-and-mortar stores usually want Warlord, so the register and the site stay in sync. See [connecting the register you already run](/gun-store-pos)."),
];

export const FAQ_COCKPIT: FaqItem[] = [
  faqMd("What is FFL Cockpit?", "FFL Cockpit is a firearms plugin for distributor catalogs, FFL Checkout and dropshipping automation. It runs on WooCommerce or BigCommerce. Licenses live on [fflcockpit.com](https://www.fflcockpit.com/)."),
  faqMd("Is FFL Cockpit a website?", "No. It's the plugin behind the store, so you still need a WooCommerce storefront, and Coriolis builds and hosts that storefront."),
  faqMd("Do I buy FFL Cockpit from Coriolis?", "Licenses live on fflcockpit.com. Militia ($269/mo) and every plan above it include the FFL Cockpit and FFL Checkout licenses, and we configure them at setup."),
  faqMd("What is FFL Cockpit setup?", "It's connecting the plugin to your WooCommerce store: licenses, distributor catalogs, pricing rules, FFL Checkout and marketplaces, then a test order. On a Coriolis build, we do it at setup."),
  faqMd("Who hosts FFL Cockpit on WooCommerce?", "You pick the host. FFL Cockpit plugs into your site and doesn't host it. Coriolis hosts every store we build on WP Engine, backed by a 99.95% uptime SLA."),
  faqMd("What does FFL Cockpit hosting cost, DIY vs with Coriolis?", "DIY, FFL Cockpit Premium lists at $84.99 a month on WooCommerce, plus your own hosting and build. With Coriolis, Militia is $269 a month with the licenses, 21 catalogs and hosting included, and setup is $500 or $2,500."),
  faqMd("I already have FFL Cockpit. Can you just build the site?", "Yes. That's the usual job: custom WooCommerce on your domain, Cockpit configured, and hosting and support from Coriolis."),
];

export const FAQ_AMMOREADY: FaqItem[] = [
  faqMd("Is Coriolis a hosted AmmoReady clone?", "No. Coriolis builds open WooCommerce you own, with FFL Cockpit for catalogs, and the storefront leaves with you if you cancel."),
  faqMd("What about Gearfire?", "If you're leaving Gearfire, see the [Gearfire alternative](/gearfire-alternative) page, which uses the same owned-WooCommerce model."),
  faqMd("How do you migrate a live AmmoReady store?", "Keep your domain, stand up Woo on it before you give notice, map the catalog and redirect the URLs that already rank, wire FFL Checkout, payments, and taxes, then test a mixed cart, connect the register only if you want the floor and the site in sync, and cut DNS. You leave with the site. The ordered list is above, and the full checklist is on [how to leave AmmoReady](/leave-ammoready)."),
  faqMd("What does setup cost?", "Setup is $500 or $2,500. Monthly hosting starts after we talk, and FFL Accelerator is $569 a month."),
  faqMd("Do I own it?", "Yes. It is WordPress, and if you cancel, the site goes with you."),
  faqMd("Do you run my 4473?", "No. That work stays with the register and the systems licensed for it."),
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
    q: "Does switching off Gearfire kill RetailBI?",
    a: "No. Demand Intelligence is not a RetailBI replacement. Keep the Index for what sold. Add search intent if you want what people typed. See Demand Intelligence vs RetailBI.",
  },
  {
    q: "Is Coriolis another closed FFL network?",
    a: "No. It is open WooCommerce on your domain. Cancel and the site goes with you.",
  },
  {
    q: "Do you run my 4473?",
    a: "No. Coriolis is not 4473, NICS, or bound-book software. This is not legal advice.",
  },
  {
    q: "What about AmmoReady?",
    a: "Same owned-Woo model. See the AmmoReady alternative. Founder context lives there and on the best FFL ecommerce hub.",
  },
];

export const FAQ_EMAIL: FaqItem[] = [
  faqMd(
    "What email is included with FFL Accelerator?",
    "Capture, list management, and the welcome, back in stock, browse abandonment, thank you for purchase and abandoned cart flows. We run them for you.",
  ),
  faqMd(
    "What if I want the full email build at setup?",
    "Retail Setup ($2,500) includes the complete email marketing setup, platform integration, a custom brand kit and template, the welcome and abandoned cart series, back-in-stock notifications and deliverability work. Basic Setup ($500) includes email capture only.",
  ),
  faqMd(
    "Can a gun store use Mailchimp?",
    "Jim's Armory sends its email through Mailchimp. Check the current policy for what you sell before you import a list. This is not legal advice.",
  ),
  faqMd(
    "Can I send SMS about guns?",
    "Be careful. Klaviyo's policy bars firearms content in SMS and MMS on US and Canadian short code and toll-free numbers. Check your platform's policy before you text a list.",
  ),
  faqMd(
    "Do I have to stay on Coriolis to keep the list?",
    "No. The site is yours. Cancel and the website goes with you. Email platform accounts you own stay yours.",
  ),
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
  faqMd(
    "What is the best FFL ecommerce platform?",
    "The best FFL ecommerce platform depends on what you want to own. Pick a hosted storefront, a POS-first suite, plugins on a WooCommerce site you already run, or a managed WooCommerce build you own. Score ownership, catalogs, POS, listed price and exit, then pick the type that matches how you sell.",
  ),
  faqMd(
    "What is the best ecommerce platform for a gun store?",
    "Start with your register. If you like it, keep it and ask how it connects. AIM, MicroBiz, Rapid and Trident 1 all connect to WooCommerce. See [gun store POS integration](/gun-store-pos). If you want a new register and website together, look at the POS-first suites.",
  ),
  faqMd(
    "Should I pick a hosted platform or WooCommerce I own?",
    "Hosted is faster to launch, and you usually don't take a full website with you when you leave. Owned WooCommerce means you write the pages and keep the site. You still need firearms checkout and catalogs, through plugins or a builder.",
  ),
  faqMd(
    "How do the listed starting prices compare?",
    "See the table. Plugins list lowest because they don't include a site or hosting. Hosted platforms and POS suites include the site. Read the source links for what each price covers.",
  ),
  faqMd(
    "Can I keep my POS and still change websites?",
    "Often, yes. If your POS connects to WooCommerce, you can change the website and keep the counter. Coriolis connects AIM, MicroBiz, Rapid, Trident 1 and other WooCommerce-ready registers on Warlord.",
  ),
  faqMd(
    "What happens if I leave?",
    "Ask before you sign. On a hosted platform, you export what they allow and rebuild. On WooCommerce you own, the site goes with you. With Coriolis, there's no contract and you take the website.",
  ),
  faqMd(
    "Can I use WooCommerce to sell guns?",
    "Yes, when a licensed FFL owns the store and checkout is built for dealer transfer. See [Can you use WooCommerce to sell guns?](/can-you-use-woocommerce-to-sell-guns) This is not legal advice.",
  ),
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
    q: "I searched retailbi alternative. Do I rip out sell-through?",
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
    a: "Every plan includes 1 free Client Admin seat. Seat headcount is enforced in the portal Team page; purchase additional seats through Coriolis during onboarding or expansion.",
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
  faqMd("How much does an FFL website cost?", "An FFL website at Coriolis is a one-time setup of $500 or $2,500, plus a monthly plan from $169 to $569. Plans start with Minute Man at $169 for the website on your own domain and go up to FFL Accelerator at $569, which includes a webmaster, and there's no annual contract."),
  faqMd("What's the difference between the $500 and $2,500 setup?", "Basic Setup is $500 for a clean launch, and extra custom pages are $125 each. Retail Setup is $2,500 for the full custom site and email, with up to ten custom pages."),
  faqMd("Is there a contract?", "No. There's no annual contract, and you can cancel any time, and if you walk, you take the website."),
  faqMd("What does it cost to connect my register to the website?", "Connecting your register is the Warlord plan at $469 a month. It syncs the site both ways with any POS that works with WooCommerce, such as AIM, MicroBiz, Rapid Gun Systems or Trident 1. FFL Accelerator at $569 includes it too, and your register subscription stays with the company you buy it from."),
  faqMd("What isn't included in the monthly price?", "Three things aren't in the plan price: card processing, your register subscription, and the 4473, NICS, and bound-book tools you already use. We install the payment gateway at setup, or you bring your own, and the merchant account and its fees are yours. Support on Minute Man is $125 per incident, and Militia and up include email support."),
  faqMd("Who is Coriolis?", "Coriolis builds and hosts WooCommerce websites for gun shops, online-only FFLs, ranges, gunsmiths and firearms instructors. We have 100+ clients and a 5-star Google rating, and we're members of NSSF, Firearms Policy Coalition and Gun Owners of America. Our founder ran AmmoReady for nine years. Call (279) 258-6771."),
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
  faqMd("What can AI do for a gun store?", "It can do the daily jobs you'd rather not do by hand: a morning count of last night's orders and what's on the shelf, sales and accounting answers from QuickBooks, and read-only answers about what your FastBound book says. It can also schedule policy-safe Facebook posts and report site problems to support for you."),
  faqMd("Will AI touch my 4473s or my bound book?", "It never touches a 4473, and it only reads your bound book. FastBound is read only, so it can tell you what the book says but never writes a disposition, and it doesn't change your hosting, DNS or billing either."),
  faqMd("What does it cost to get started with AI?", "You buy your own Cursor or xAI seat, at prices they set, and we don't add a monthly bill from us for the starting work. For a bigger custom build, bring the brief and the budget."),
  faqMd("Can you build a custom app or AI agent for my business?", "Yes. Bring the brief and the budget. Botopticon.com, GunSearchEngine.com, Demand Intelligence and Gun Store Game are live work we already shipped."),
  faqMd("Do I have to host my website with you to use it?", "No. You don't have to host with us to start this work. If you want a dealer website, start on our [FFL ecommerce](/ecommerce) page."),
];

/** SEO-U5 PR B (Brandy FINAL, 10/21): /grok-bot-setup. */
export const FAQ_GROK_BOT: FaqItem[] = [
  {
    q: "Is Grok Bot a chatbot for my gun store?",
    a: "It isn't a chat widget for your website. It's an AI assistant set up for you and your staff to do shop jobs: a morning count of last night's orders and what's on the shelf, answers to accounting questions, scheduled Facebook posts, and a support bot for site problems.",
  },
  {
    q: "What does Grok Bot setup cost?",
    a: "It isn't a monthly bill from us. That covers a one-hour consult, then a second meeting where we build it, test it and sit with you until you can run it.",
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
    a: "Yes. It's free with any GSE dealer account, including free GSE Basic, and GSE Basic is free forever. Pro is optional. Pro is normally $99/month, and it's free through Dec 31, 2027 for anyone who activates by Dec 31, 2026.",
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

/** SEO-U32 /ffl-seo FAQ (Brandy FINAL plus PAUL-0901: not a paid service). */
export const FAQ_FFL_SEO: FaqItem[] = [
  {
    q: "What is FFL SEO?",
    a: "FFL SEO is search engine optimization for gun stores and FFL dealers: getting your own website found on Google when shoppers search for what you sell. FFL Search Console, free with any GSE dealer account, shows what to fix and the Google searches that find you.",
  },
  {
    q: "Is there free SEO help for gun stores?",
    a: "Yes. FFL Search Console is free with any GSE dealer account, including free GSE Basic, with no Pro required. It gives you a weekly fix list and shows the Google searches that find you. GSE Basic also includes premium SEO backlinks and a dedicated Seller page on GunSearchEngine.com.",
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

/** SEO-U30 /ffl-payment-processing FAQ (Brandy FINAL plus PAUL-0901: slots filled from Paul's 10/21 answers). */
export const FAQ_PAYMENTS: FaqItem[] = [
  {
    q: "What is FFL payment processing?",
    a: "It\u2019s how a gun store takes payments online: a merchant account that allows firearm sales, connected to your website through a payment gateway. The gateway moves the card data. The merchant account is the part that gets approved for your business.",
  },
  {
    q: "Why do payment processors turn down gun stores?",
    a: "Many mainstream processors and store payment add-ons list firearms and ammunition as prohibited, and the card industry generally treats firearms as high-risk. Dealers use a merchant account underwritten for firearms by a bank or processor that accepts FFLs.",
  },
  {
    q: "What does Coriolis set up for payments?",
    a: "Coriolis works with GOAT Payments and Payroc, so we can provide the gateway, help you set it up, or put your own firearms-approved gateway on checkout. Installation is part of setup, on Basic Setup ($500) or Retail Setup ($2,500). We enable it, run a small live authorization and void it. Then you test a non-firearm order, and a firearm order once ship-to-FFL is on.",
  },
  {
    q: "Who owns the merchant account, and who pays the fees?",
    a: "You do. The merchant account is in your store\u2019s legal name, and its fees are yours.",
  },
  {
    q: "What payments can my store take?",
    a: "Cards, through your merchant account and the gateway on your checkout. It isn\u2019t cards-only: Coriolis can set up other payment options during setup. Tell us what you want to take.",
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

/** SEO-U31 /websites-for-ranges-gunsmiths-instructors FAQ (Brandy FINAL, Chief 8:57 AM ET). One FAQPage from all three. */
export const FAQ_RANGES: FaqItem[] = [
  {
    q: "Do you build websites for shooting ranges?",
    a: "Yes. Coriolis builds and hosts WooCommerce websites for ranges, on your own domain, and you own the site.",
  },
  {
    q: "Who owns my range website?",
    a: "You do. We build the WooCommerce store on your own domain, and you own it. There\u2019s no annual contract, and if you walk, you take the website.",
  },
];

export const FAQ_GUNSMITHS: FaqItem[] = [
  {
    q: "Do you build websites for gunsmiths?",
    a: "Yes. Coriolis builds and hosts WooCommerce websites for gunsmiths, on your own domain, and you own the site.",
  },
  {
    q: "What does a gunsmith website cost?",
    a: "Setup is Basic Setup ($500) or Retail Setup ($2,500), and monthly plans run from $169 to $569. There\u2019s no annual contract, and if you walk, you take the website.",
  },
];

export const FAQ_INSTRUCTORS: FaqItem[] = [
  {
    q: "Do you build websites for firearms and CCW instructors?",
    a: "Yes. Coriolis builds and hosts WooCommerce websites for firearms instructors, on your own domain, and you own the site. You don\u2019t need an FFL.",
  },
  {
    q: "What does an instructor website cost?",
    a: "Setup is a one-time $500 (Basic Setup) or $2,500 (Retail Setup), and monthly plans run from $169 to $569. There\u2019s no annual contract.",
  },
];

export const FAQ_HOSTING: FaqItem[] = [
  faqMd("What is gun-friendly hosting?", "Web hosting whose terms allow a firearms business. A gun store needs it, because some hosted platforms, including WordPress.com, prohibit selling firearms, parts, accessories and ammunition."),
  faqMd("Can a gun store use any web host?", "No. Check the host's terms before you build. WordPress.com prohibits selling firearms on its hosted sites, but it doesn't stop firearms merchants from running WooCommerce on another host, and Coriolis runs every dealer store on WP Engine."),
  faqMd("Where does Coriolis host dealer websites?", "On WP Engine, every one of them. Coriolis is a WP Engine agency partner, and we manage the hosting for you, with security updates, uptime monitoring and support."),
  faqMd("What does FFL website hosting cost?", "Hosting is part of every plan, from $169 to $569 a month. Setup is $500 (Basic Setup) or $2,500 (Retail Setup), and there's no annual contract."),
  faqMd("Is there an uptime SLA?", "Every store runs on WP Engine, so every plan is backed by WP Engine's 99.95% uptime SLA, with 24×7 uptime monitoring on top."),
  faqMd("Do I own the website?", "Yes. When setup is done, you own the WooCommerce site files and database, exportable at any time, and if you cancel, the site goes with you."),
  faqMd("Can you move my site without going dark?", "Yes. We build WooCommerce on your domain first, move what ranks, test a live cart, then switch DNS, and you shouldn't give notice until the new store is ready."),
  faqMd("Does hosting cover card payments?", "No. Payments run through a merchant account approved for firearms, connected to checkout through a payment gateway. Coriolis installs the gateway at setup, and the merchant account and its fees are yours."),
];

/** /ffl-messenger-enterprise. Brandy mock, Paul approved. First item opens in the accordion. */
export const FAQ_FFL_MESSENGER_ENTERPRISE: FaqItem[] = [
  {
    q: "What's the difference between Pro and Enterprise?",
    a: "Pro adds employee and rep seats, Tickets and fixed ticket rules. Enterprise adds the API, an MCP server, SSO, the Workflow builder and custom work by Coriolis.",
  },
  {
    q: "Who can get Enterprise?",
    a: "Any verified FFL that wants Enterprise features. One counter or many.",
  },
  {
    q: "Can you read our messages?",
    a: "No. Messages, documents and tickets are end-to-end encrypted. Custom integrations run on your side as your own connected FFL.",
  },
  {
    q: "Can we see the DPA before we sign?",
    a: "Yes. The DPAs are pre-planned, and you review them during scoping.",
  },
  {
    q: "Where are you on SOC 2?",
    a: "SOC 2 readiness planning is part of scoping. We walk your IT lead through it.",
  },
  {
    q: "Why do you need our FFL number?",
    a: "Everyone on FFL Messenger holds a license. Your FFL license is a public document, so we match the number to the ATF record and check that you run the shop.",
  },
];
