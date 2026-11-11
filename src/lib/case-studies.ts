/**
 * SEO-U8v2: /case-studies hub plus five shop stories. Copy is Brandy's FINAL
 * (handoff/SEO-U8v2/FINAL.md, Chief 9:23 AM ET; lock Paul 9:05 AM ET via Chief 9:06).
 * No quotes, no stats, no result numbers, no launch dates.
 *
 * Drafts (`draft: true`) still build a route. The draft flag does four things only:
 * robots noindex,nofollow on the page, off the sitemap (filter in astro.config.mjs),
 * out of the hub cards and the hub ItemList, and no link to it from any other page
 * (or llms.txt). Flipping a draft live is Paul's call.
 */

/** A paragraph is plain text plus optional inline links. */
export type Segment = string | { text: string; href: string };
export type Paragraph = Segment[];

export interface CaseSection {
  heading: string;
  paragraphs: Paragraph[];
}

export interface CaseFact {
  label: string;
  value: string;
  href?: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  /** Hub card kicker. */
  kicker: string;
  /** Hub card line. */
  cardLine: string;
  /** Hub card link text. */
  cardLink: string;
  title: string;
  meta: string;
  h1: string;
  facts: CaseFact[];
  sections: CaseSection[];
  cta: Paragraph;
  talkHeading?: string;
  talkSubline?: string;
  /** Hub card sentence as drafted (markdown links). */
  cardMd?: string;
  /** dateModified for Article JSON-LD. */
  modified?: string;
  pos: string | null;
  posHref: string | null;
  /** Live shop domain. Null for drafts. */
  siteUrl: string | null;
  hero: string;
  og: string;
  alt: string;
  draft: boolean;
}

/** Build date Coriolis ships these pages. JSON-LD metadata only, never shown in copy. */
export const CASE_STUDIES_PUBLISHED = "2026-10-22";
// CA-VOICE-P1 batch 6 (Paul yes via Chief, 2026-11-10 12:49 PM ET): copy from batch-6/case-studies*.md, shipped as drafted.

export const CASE_STUDIES_HUB = {
  path: "/case-studies",
  title: "Case Studies: Gun Store Websites We Built | Coriolis",
  meta: "See the WooCommerce stores Coriolis built for Naples Gun Shop, Allegheny Arms, Target Shotguns and Jim's Armory, each on its own domain, hosted on WP Engine.",
  eyebrow: "Ecommerce · Case studies",
  h1: "Case studies: gun store websites we built",
  talkSubline: "We build, host, and support your open source WooCommerce website. There is no contract and you can cancel at any time.",
  intro:
    "Every gun shop sells a little differently, so every store we build is set up for the shop that owns it. Naples Gun Shop keeps AIM POS on the counter, Allegheny Arms sells through its own online store, Target Shotguns is a shotgun specialist on MicroBiz POS, and Jim's Armory sells online alongside a YouTube channel, each running WooCommerce on the shop's own domain, hosted on WP Engine.",
} as const;

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "naples-gun-shop",
    name: "Naples Gun Shop",
    kicker: "Gun shop · AIM POS",
    cardLine: "A full gun shop online, with its store connected to the AIM POS on the counter.",
    cardLink: "Read the Naples Gun Shop story",
    cardMd: "[Naples Gun Shop](/case-studies/naples-gun-shop) is a full gun shop online, with its store connected to the AIM POS on the counter.",
    title: "Naples Gun Shop Case Study: AIM POS Website | Coriolis",
    meta: "Naples Gun Shop runs a Coriolis-built WooCommerce store on its own domain, connected to its AIM POS, with FFL checkout and in-store pickup.",
    h1: "Naples Gun Shop: one store online and on the counter, connected to AIM POS",
    facts: [
      { label: "Store", value: "Naples Gun Shop" },
      { label: "Type", value: "Gun shop with classes" },
      { label: "Register", value: "AIM POS" },
      { label: "Plan", value: "FFL Accelerator" },
      { label: "Site", value: "naplesgunshop.net", href: "https://naplesgunshop.net/" },
    ],
    sections: [
      {
        "heading": "The shop",
        "paragraphs": [
          [
            "Naples Gun Shop is a full-line gun shop in Southwest Florida. It sells handguns, rifles, shotguns and suppressors, NFA items, ammo, less-lethal gear and body armor, and it also teaches Basic Pistol and concealed carry classes and handles FFL transfers. That's a big catalog, and the counter already runs on AIM POS."
          ]
        ]
      },
      {
        "heading": "What we built",
        "paragraphs": [
          [
            "The live store is ",
            {
              "text": "naplesgunshop.net",
              "href": "https://naplesgunshop.net/"
            },
            ", a WooCommerce site on the shop's own domain, hosted on WP Engine, and connected to that AIM register so the website and the counter work from the same system. Online, shoppers narrow the catalog with filters for category, brand, price and stock, and the filters fold into a drawer on a phone. At checkout, a buyer picks the FFL dealer that will receive the firearm, or picks up at Naples Gun Shop. Distributor catalogs are connected too, so the site can sell more than what's on the shelf."
          ]
        ]
      },
      {
        "heading": "Where it stands",
        "paragraphs": [
          [
            "Naples Gun Shop is on FFL Accelerator, the plan for shops that want us to tune and watch the site for them. The AIM POS on the counter stays the register, and Naples Gun Shop is one of the FFLs named in our ",
            {
              "text": "AIM POS integration press release",
              "href": "/press/five-ffls-choose-coriolis-for-aim-pos-integration"
            },
            "."
          ]
        ]
      },
      {
        "heading": "If your shop runs like this",
        "paragraphs": [
          [
            "If you run AIM POS, you keep it. Coriolis builds the WooCommerce store on your domain and connects it to the register you already use, so your staff keeps ringing sales the way they do today. You own the site, and it runs on WP Engine. A big catalog is where shop filters and distributor catalogs matter most, because shoppers can get to the right gun without scrolling page after page, and you can list more than you stock."
          ]
        ]
      }
    ],
    cta: [
      "If you run AIM at the counter, see ",
      {
        "text": "connecting WooCommerce to AIM POS",
        "href": "/aim-pos"
      },
      ", or ",
      {
        "text": "what FFL Accelerator includes",
        "href": "/ecommerce#ffl-accelerator"
      },
      "."
    ],
    talkHeading: "Tell us about the website you want and we'll make it happen.",
    talkSubline: "We build, host, and support your open source WooCommerce website. There is no contract and you can cancel at any time.",
    modified: "2026-11-10",
    pos: "AIM POS",
    posHref: "/aim-pos",
    siteUrl: "https://naplesgunshop.net/",
    hero: "/case-studies/naples-gun-shop-hero.webp",
    og: "/case-studies/naples-gun-shop-og.png",
    alt: "Naples Gun Shop's WooCommerce website by Coriolis, shown on a desktop browser and a phone.",
    draft: false,
  },
  {
    slug: "allegheny-arms",
    name: "Allegheny Arms",
    kicker: "Online store",
    cardLine: "A WooCommerce store on its own domain, with a big catalog shoppers can filter by category, brand, price and stock.",
    cardLink: "Read the Allegheny Arms story",
    cardMd: "[Allegheny Arms](/case-studies/allegheny-arms) is a WooCommerce store on its own domain, with a big catalog shoppers can filter by category, brand, price and stock.",
    title: "Allegheny Arms Case Study: WooCommerce Store | Coriolis",
    meta: "Allegheny Arms sells online through a Coriolis-built WooCommerce store on its own domain, hosted on WP Engine, with shop filters that work on a phone.",
    h1: "Allegheny Arms: a WooCommerce store on its own domain",
    facts: [
      { label: "Store", value: "Allegheny Arms" },
      { label: "Type", value: "Online store" },
      { label: "Site", value: "alleghenyarms.com", href: "https://alleghenyarms.com/" },
    ],
    sections: [
      {
        "heading": "The store",
        "paragraphs": [
          [
            "Allegheny Arms sells firearms, ammo and accessories online at ",
            {
              "text": "alleghenyarms.com",
              "href": "https://alleghenyarms.com/"
            },
            ", along with its own AGW products and used guns. That's a lot of brands and a lot of products in one catalog. The website is the storefront, so it has to make that catalog easy to get through on a laptop or a phone, and it has to belong to Allegheny."
          ]
        ]
      },
      {
        "heading": "What we built",
        "paragraphs": [
          [
            {
              "text": "alleghenyarms.com",
              "href": "https://alleghenyarms.com/"
            },
            " is theirs: a WooCommerce store on their domain, hosted on WP Engine. Shoppers narrow the catalog with filters for category, brand, price and stock, and the filters fold into a drawer on a phone, so nobody has to scroll page after page to find one product. A product search box sits in the header next to the cart and the account link, and the menu breaks the catalog into clear sections, with a Shop All menu for browsing. Every product page, the cart and the checkout run on Allegheny's own domain, so a sale never leaves the site."
          ]
        ]
      },
      {
        "heading": "Where it stands",
        "paragraphs": [
          [
            "The store is live at alleghenyarms.com."
          ]
        ]
      },
      {
        "heading": "If you want a store like this",
        "paragraphs": [
          [
            "A WooCommerce store on your own domain is a straightforward way to sell online. You own the site, it runs on WP Engine, and the catalog, the checkout and the customer accounts all live on it. Good filters matter more as the catalog grows, because a shopper on a phone will not page through a long list to find one product."
          ]
        ]
      }
    ],
    cta: [
      "For your own store, see ",
      {
        "text": "FFL website plans",
        "href": "/ecommerce"
      },
      ", or ",
      {
        "text": "what gun-friendly hosting includes",
        "href": "/gun-friendly-hosting"
      },
      "."
    ],
    talkHeading: "Tell us about the website you want and we'll make it happen.",
    talkSubline: "We build, host, and support your open source WooCommerce website. There is no contract and you can cancel at any time.",
    modified: "2026-11-10",
    pos: null,
    posHref: null,
    siteUrl: "https://alleghenyarms.com/",
    hero: "/case-studies/allegheny-arms-hero.webp",
    og: "/case-studies/allegheny-arms-og.png",
    alt: "Allegheny Arms' WooCommerce store by Coriolis, shown on a desktop browser and a phone.",
    draft: false,
  },
  {
    slug: "target-shotguns",
    name: "Target Shotguns",
    kicker: "Shotgun specialist · MicroBiz POS",
    cardLine: "A shotgun specialist's store, connected to MicroBiz POS, with drop ship items kept apart from in-store stock.",
    cardLink: "Read the Target Shotguns story",
    cardMd: "[Target Shotguns](/case-studies/target-shotguns) is a shotgun specialist's store, connected to MicroBiz POS, with drop ship items kept apart from in-store stock.",
    title: "Target Shotguns Case Study: MicroBiz POS Website | Coriolis",
    meta: "Target Shotguns runs a Coriolis-built WooCommerce store connected to MicroBiz POS, with FFL checkout and drop ship items kept apart.",
    h1: "Target Shotguns: a shotgun specialist's store, connected to MicroBiz POS",
    facts: [
      { label: "Store", value: "Target Shotguns" },
      { label: "Type", value: "Shotgun specialist" },
      { label: "Register", value: "MicroBiz POS" },
      { label: "Site", value: "targetshotguns.com", href: "https://targetshotguns.com/" },
    ],
    sections: [
      {
        heading: "The shop",
        paragraphs: [
          [
            "Target Shotguns is a shotgun specialist. It sells in-store competition and field shotguns, used and new, plus shotgun parts, choke tubes, precision fit stocks and clay target gear like voice release systems and clay machines, and it also does custom stock fitting, so a shooter can get a gun that fits. Many of its in-store shotguns are used, so each one is its own listing. The register is MicroBiz POS.",
          ],
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          [
            { text: "targetshotguns.com", href: "https://targetshotguns.com/" },
            " is a WooCommerce store on the shop's own domain, hosted on WP Engine, and connected to that MicroBiz register so the counter and the website work from the same system. Distributor catalogs are connected too, so the site sells shells, optics, magazines and other gear beyond what's in the building. The menu keeps those drop ship items in their own clearly marked area, so nobody drives in expecting one on the shelf. At checkout, a buyer picks the FFL dealer that will receive the firearm.",
          ],
        ],
      },
      {
        heading: "Where it stands",
        paragraphs: [
          [
            "The store is live, with the in-store shotguns up front and the drop ship catalog marked apart. Shoppers can browse in-store guns, parts and accessories, or go straight to the drop ship menu.",
          ],
        ],
      },
      {
        heading: "If your shop runs like this",
        paragraphs: [
          [
            "Specialty shops sell to buyers who know exactly what they're after. A clear menu, a marked area for drop ship items and an FFL checkout keep those buyers moving. If you run MicroBiz, you keep it. Coriolis builds the WooCommerce store on your domain and connects it to the register you already use. You own the site, and it runs on WP Engine.",
          ],
        ],
      },
    ],
    cta: [
      "If you run MicroBiz at the counter, see ",
      { text: "connecting WooCommerce to MicroBiz POS", href: "/microbiz-pos" },
      ", or ",
      { text: "listing distributor catalogs on a store you own", href: "/firearms-dropshipping" },
      ".",
    ],
    pos: "MicroBiz POS",
    posHref: "/microbiz-pos",
    siteUrl: "https://targetshotguns.com/",
    hero: "/case-studies/target-shotguns-hero.webp?v=20261110-microbiz",
    og: "/case-studies/target-shotguns-og.png?v=20261110-microbiz",
    alt: "Target Shotguns' WooCommerce website by Coriolis, shown on a desktop browser and a phone.",
    draft: false,
  },
  {
    // JIMS-ARMORY case study (Paul 2026-11-10 10:23 PM ET via Chief: "Merge it and I'll review it live"). Copy: Brandy, CASE-STUDY.md.
    slug: "jims-armory",
    name: "Jim's Armory",
    kicker: "Online store · YouTube channel",
    cardLine: "An online store that sells alongside Jim Grill's YouTube channel, with a blog post for each video and a big catalog shoppers can filter.",
    cardLink: "Read the Jim's Armory story",
    cardMd: "[Jim's Armory](/case-studies/jims-armory) is an online store that sells alongside Jim Grill's YouTube channel, with a blog post for each video and a big catalog shoppers can filter.",
    title: "Jim's Armory Case Study: YouTube Channel Store | Coriolis",
    meta: "Coriolis built Jim's Armory a WooCommerce store on its own domain, hosted on WP Engine, to sell alongside Jim Grill's YouTube channel.",
    h1: "Jim's Armory: the online store behind a YouTube channel",
    facts: [
      { label: "Store", value: "Jim's Armory" },
      { label: "Type", value: "Online store" },
      { label: "Channel", value: "Jim's Armory on YouTube", href: "https://www.youtube.com/@JimsArmory" },
      { label: "Site", value: "jimsarmory.com", href: "https://jimsarmory.com/" },
    ],
    sections: [
      {
        heading: "The store",
        paragraphs: [
          [
            "Jim's Armory is Jim Grill's online gun store, and it runs alongside his ",
            { text: "Jim's Armory YouTube channel", href: "https://www.youtube.com/@JimsArmory" },
            ", where he covers gunsmithing, reloading, training and gear reviews. It's a licensed dealer with no public storefront, and it doesn't take FFL transfers, so the website is the whole store. It sells handguns, rifles, shotguns, ammo, optics, magazines, tools and blades, and the categories up front follow what Jim talks about on camera: 2011 pistols, red dots, reloading gear and the Jim's Armory Custom Shop.",
          ],
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          [
            { text: "jimsarmory.com", href: "https://jimsarmory.com/" },
            " is a WooCommerce store on Jim's own domain, hosted on WP Engine, and Coriolis built it to work with the channel. Each video gets a blog post on the site with the video right in it, so a viewer who finds an episode of Jim's Gun Garage, like the MAC 9 DS rebuild, can read the write-up and then shop the same categories from the menu. Distributor catalogs are connected, so the catalog runs deep in every category, and shoppers narrow it with filters for category, brand, price and stock that fold into a drawer on a phone. At checkout, a buyer picks the FFL dealer that will receive the firearm.",
          ],
          [
            "When something is out of stock, a shopper can sign up to hear when it's back, and the store connects to Mailchimp, so people who come over from the channel can join Jim's email list right on the site.",
          ],
        ],
      },
      {
        heading: "Where it stands",
        paragraphs: [
          [
            "The store is live, with each episode's blog post and the full catalog on Jim's own domain, and the footer links back out to YouTube, Instagram, X and Facebook. Jim's Armory is also one of the four stores named in our ",
            { text: "press release on custom WooCommerce stores", href: "/press/four-firearms-businesses-choose-coriolis-for-custom-woocommerce-stores" },
            ".",
          ],
        ],
      },
      {
        heading: "If you run a channel like this",
        paragraphs: [
          [
            "If you make gun videos, your viewers already want the gear you're showing them, and a store on your own domain gives them a place to buy it from you. Coriolis builds the WooCommerce store, connects the distributor catalogs and the FFL checkout, and hosts it on WP Engine. You own the site and the email list, and a blog post for each video gives search engines something to find long after the episode goes up.",
          ],
        ],
      },
    ],
    cta: [
      "If you want a store for your channel, see ",
      { text: "FFL website plans", href: "/ecommerce" },
      ", or ",
      { text: "how email marketing works for a gun store", href: "/email-marketing-for-ffl-ecommerce" },
      ".",
    ],
    talkHeading: "Tell us about the website you want and we'll make it happen.",
    talkSubline: "We build, host, and support your open source WooCommerce website. There is no contract and you can cancel at any time.",
    modified: "2026-11-10",
    pos: null,
    posHref: null,
    siteUrl: "https://jimsarmory.com/",
    hero: "/case-studies/jims-armory-hero.webp",
    og: "/case-studies/jims-armory-og.png",
    alt: "Jim's Armory's WooCommerce store by Coriolis, shown on a desktop browser and a phone.",
    draft: false,
  },
  {
    // DRAFT (Chief 9:06): committed route, noindex,nofollow, off the sitemap, unlinked, not in the hub ItemList.
    slug: "the-gun-range",
    name: "The Gun Range",
    kicker: "Indoor range · AIM POS",
    cardLine: "An indoor range's website, with its catalog connected to AIM POS.",
    cardLink: "Read The Gun Range story",
    title: "The Gun Range Case Study: Indoor Range Website | Coriolis",
    meta: "The Gun Range is an indoor shooting range. Coriolis built its WooCommerce website with range, class and gunsmith pages and a catalog tied to AIM POS.",
    h1: "The Gun Range: an indoor range's website, with its catalog tied to AIM POS",
    facts: [
      { label: "Store", value: "The Gun Range" },
      { label: "Type", value: "Indoor shooting range and pro shop" },
      { label: "Register", value: "AIM POS" },
    ],
    sections: [
      {
        heading: "The shop",
        paragraphs: [
          [
            "The Gun Range is an indoor shooting facility in California. It runs lanes for walk-in shooters, rents firearms, teaches pistol and concealed carry classes, and handles CDCR and LEOSA qualifications. Rentals cover pistols, revolvers, rifles and shotguns, and classes run from the fundamentals to concealed carry. It has a full-time gunsmith with custom engraving and stippling, a pro shop, and FFL transfers. A range like that needs a website that does far more than list products.",
          ],
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          [
            "Coriolis built The Gun Range a WooCommerce website hosted on WP Engine, with pages for the range, rentals, classes, gunsmithing, gift cards, range FAQs and California FFL FAQs. We connected its online catalog to AIM POS, the register the range already runs, so the pro shop and the website work from the same system. The homepage leads with what a walk-in shooter needs first: range rules, pricing and rentals.",
          ],
          [
            "Shoppers narrow the catalog with filters for category, brand, price and stock, and the filters fold into a drawer on a phone. Below the service tiles, the homepage shows the in-store catalog, so a shooter can see what the pro shop carries before driving over.",
          ],
        ],
      },
      {
        heading: "Where it stands",
        paragraphs: [
          [
            "The range, the classes, gift cards and the pro shop now sit on one website, with the pro shop catalog tied to the AIM POS at the counter.",
          ],
        ],
      },
      {
        heading: "If your range runs like this",
        paragraphs: [
          [
            "A range sells more than products. Lane time, rentals, classes and gunsmith work all have to be explained, and the pro shop still needs a catalog. If you run AIM POS at the pro shop, you keep it. Coriolis builds the WooCommerce site on your domain and connects the catalog to the register you already use. You own the site, and it runs on WP Engine.",
          ],
        ],
      },
    ],
    cta: [
      "Run a range with a pro shop? See ",
      { text: "websites for ranges, gunsmiths and instructors", href: "/websites-for-ranges-gunsmiths-instructors" },
      ", or ",
      { text: "WooCommerce for AIM", href: "/aim-pos" },
      ".",
    ],
    talkHeading: "Tell us about your range",
    pos: "AIM POS",
    posHref: "/aim-pos",
    siteUrl: null,
    hero: "/case-studies/the-gun-range-hero.webp",
    og: "/case-studies/the-gun-range-og.png",
    alt: "The Gun Range's indoor range website by Coriolis, shown on a desktop browser and a phone.",
    draft: true,
  },
  {
    // DRAFT (Chief 9:06): committed route, noindex,nofollow, off the sitemap, unlinked, not in the hub ItemList.
    slug: "acme",
    name: "ACME",
    kicker: "Gun shop · Rapid Gun Systems",
    cardLine: "A family gun shop's store for new, used and police trade-in guns, connected to Rapid Gun Systems.",
    cardLink: "Read the ACME story",
    title: "ACME Case Study: Rapid Gun Systems Website | Coriolis",
    meta: "ACME is a family gun shop. Coriolis built its WooCommerce store for new, used and police trade-in guns, connected to Rapid Gun Systems.",
    h1: "ACME: new, used and trade-in guns online, connected to Rapid Gun Systems",
    facts: [
      { label: "Store", value: "ACME" },
      { label: "Type", value: "Family-owned Class III FFL" },
      { label: "Register", value: "Rapid Gun Systems" },
    ],
    sections: [
      {
        heading: "The shop",
        paragraphs: [
          [
            "ACME is a family-owned Class III FFL. It's a factory direct dealer for several major brands, and it buys and appraises estate guns. It stocks firearms, suppressors and accessories for civilians and law enforcement, along with law enforcement supplies, ammo, holsters and lights. A lot of its inventory is used: police trade-ins, estate buys and guns that just came in. Every used gun is a single item, so the website has to keep up with the counter.",
          ],
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          [
            "Coriolis built ACME a WooCommerce store hosted on WP Engine, with sections for police trade-ins, used guns, new inventory and just-arrived guns, plus handgun, rifle and shotgun menus. We connected the store to Rapid Gun Systems, the register the shop already runs, so the counter and the website work from the same system.",
          ],
          [
            "We also connected distributor catalogs, so the site can sell more than what's on the shelf. At checkout, a buyer picks the FFL dealer that will receive the firearm.",
          ],
        ],
      },
      {
        heading: "Where it stands",
        paragraphs: [
          [
            "Used and trade-in guns now sit online next to new stock, suppressors and short barreled rifles, with the store tied to Rapid Gun Systems at the counter.",
          ],
        ],
      },
      {
        heading: "If your shop runs like this",
        paragraphs: [
          [
            "If you run Rapid Gun Systems, you keep it. Coriolis builds the WooCommerce store on your domain and connects it to the register you already use, so the counter stays the counter. You own the site, and it runs on WP Engine. Clear sections for trade-ins, used guns and new stock let a buyer go straight to the kind of gun they came for.",
          ],
        ],
      },
    ],
    cta: [
      "Run Rapid Gun Systems at the counter? See ",
      { text: "Rapid Gun Systems + WooCommerce", href: "/rapid-gun-systems-pos" },
      ", or how ",
      { text: "FFL dropshipping", href: "/firearms-dropshipping" },
      " works.",
    ],
    pos: "Rapid Gun Systems",
    posHref: "/rapid-gun-systems-pos",
    siteUrl: null,
    hero: "/case-studies/acme-hero.webp",
    og: "/case-studies/acme-og.png",
    alt: "ACME's WooCommerce website by Coriolis, shown on a desktop browser and a phone.",
    draft: true,
  },
];

/** Live stories only, in hub order. Drafts never appear on the hub, in the ItemList or in any link. */
export const LIVE_CASE_STUDIES = CASE_STUDIES.filter((c) => !c.draft);

export const casePath = (slug: string) => `/case-studies/${slug}`;

export const caseBySlug = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
