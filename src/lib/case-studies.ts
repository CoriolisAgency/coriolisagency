/**
 * SEO-U8: /case-studies hub plus 3 stories. Copy is Brandy's FINAL
 * (handoff/SEO-U8/FINAL.md, base 8435d3a), built with the section 5
 * no-numbers fallback (Paul "Start u8 and u9", via Chief 8:28 AM ET 10/22).
 *
 * Built: settled lines only. Left out: all 18 [PAUL TO CONFIRM] items
 * (result numbers, launch dates, previous platforms, build scope, register
 * name, photos, dealer story permission) and the Big RanDaddy's register (POS)
 * line. Nothing here says which register Big RanDaddy's runs or that
 * Coriolis connected it.
 *
 * Quotes are not copied here. Each story pulls its quote from
 * GOOGLE_REVIEW_QUOTES by shop name, so the text stays verbatim in one place.
 * No Review or AggregateRating markup (self-serving reviews).
 */
import { GOOGLE_REVIEW_QUOTES } from "./google-reviews";

/** A run of text, or an inline link. `ext` opens a client site in a new tab. */
export type Part = string | { label: string; href: string; ext?: boolean };

export type CaseStudy = {
  slug: string;
  shop: (typeof GOOGLE_REVIEW_QUOTES)[number]["shop"];
  title: string;
  description: string;
  h1: string;
  facts: { label: string; value: string }[];
  card: { kicker: string; line: string };
  situation: Part[][];
  built: Part[][];
  stands: Part[][];
  cta: Part[];
  talkHeading?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "down-range-chico",
    shop: "Down Range Chico",
    title: "Down Range Chico Case Study: Range Website | Coriolis",
    description:
      "Down Range Chico, an indoor range and full-line gun store in Chico, Calif., runs a Coriolis-built WooCommerce store connected to its AIM POS.",
    h1: "Down Range Chico: one website for a range, a store and a gunsmith",
    facts: [
      { label: "Store", value: "Down Range Chico" },
      { label: "Town", value: "Chico, Calif." },
      { label: "Type", value: "Indoor range and full-line retail store" },
    ],
    card: {
      kicker: "Range and retail \u00b7 Chico, Calif.",
      line: "An indoor range and full-line firearms store, on a WooCommerce site connected to AIM POS.",
    },
    situation: [
      [
        "Down Range Chico is an indoor range and full-line retail store in Chico, Calif., with pistol, rifle and shotgun lanes, training and gunsmithing. It also sells memberships and runs CCW classes. That's a lot of business for one website to carry, and the store didn't want a one-size-fits-all template.",
      ],
    ],
    built: [
      [
        "Coriolis built Down Range Chico a WooCommerce store on its own domain and connected it to AIM POS, the register the store already runs. Inventory, orders and customers stay in sync between the counter and the website.",
      ],
      [
        "Down Range Chico was one of five FFLs in our ",
        { label: "AIM POS integration press release", href: "press/five-ffls-choose-coriolis-for-aim-pos-integration" },
        ".",
      ],
    ],
    stands: [
      [
        "The store is live at ",
        { label: "downrangechico.com", href: "https://downrangechico.com/", ext: true },
        ", and the counter and the website share one inventory.",
      ],
    ],
    cta: [
      "Run a range with a retail floor? See ",
      { label: "websites for ranges, gunsmiths and instructors", href: "websites-for-ranges-gunsmiths-instructors" },
      ", or keep your register with ",
      { label: "Gun Store POS", href: "gun-store-pos" },
      ".",
    ],
    talkHeading: "Tell us about your range",
  },
  {
    slug: "nightshade-optics",
    shop: "Nightshade Optics",
    title: "Nightshade Optics Case Study: Online Optics Store | Coriolis",
    description:
      "Nightshade Optics is an online-only thermal and night vision store. Coriolis built its WooCommerce site and supports it after launch.",
    h1: "Nightshade Optics: an online store with the owner's voice",
    facts: [
      { label: "Store", value: "Nightshade Optics" },
      { label: "Type", value: "Online-only optics and hunting gear" },
    ],
    card: {
      kicker: "Online only",
      line: "An online-only thermal and night vision store, built and supported after launch.",
    },
    situation: [
      [
        "Nightshade Optics sells thermal scopes, night vision, tripods and hunting gear to predator, hog and deer hunters. It's online only, with no physical store, so the website is the whole shop. Thomas wanted a site that carried the vision and personality behind the business.",
      ],
    ],
    built: [
      [
        "Coriolis built Nightshade Optics' WooCommerce store on its own domain, and we've supported it since launch.",
      ],
    ],
    stands: [
      [
        "The store is live at ",
        { label: "nightshadeoptics.com", href: "https://nightshadeoptics.com/", ext: true },
        ", and Coriolis supports it after launch.",
      ],
    ],
    cta: [
      "Selling online only? See ",
      { label: "FFL website plans", href: "ecommerce#plans" },
      ", or what ",
      { label: "gun-friendly hosting", href: "gun-friendly-hosting" },
      " includes.",
    ],
  },
  {
    slug: "big-randaddys",
    shop: "Big RanDaddy's",
    title: "Big RanDaddy's Case Study: Ammo Store Website | Coriolis",
    description:
      "Big RanDaddy's needed its register, its online store and its distributors working together. Coriolis built the WooCommerce store and connected the distributor catalogs.",
    h1: "Big RanDaddy's: the store and the distributors on one site",
    facts: [
      { label: "Store", value: "Big RanDaddy's" },
      { label: "Type", value: "Discount ammo and gear" },
    ],
    card: {
      kicker: "Ammo and gear",
      line: "A discount ammo store with its online store and distributors working together.",
    },
    situation: [
      [
        "Big RanDaddy's sells discount ammunition, accessories and gear online. The job had three parts that had to work together: the register, the online store and the distributors. Other providers couldn't put all three together.",
      ],
    ],
    built: [
      [
        "Coriolis built the WooCommerce store on Big RanDaddy's own domain and connected the distributor catalogs it sells from.",
      ],
    ],
    stands: [
      [
        "The store is live at ",
        { label: "bigrandaddy.com", href: "https://bigrandaddy.com/", ext: true },
        ", with the online store and the distributors working together.",
      ],
    ],
    cta: [
      "Want your register, your website and your distributors working together? See ",
      { label: "Gun Store POS", href: "gun-store-pos" },
      " and ",
      { label: "FFL dropshipping", href: "firearms-dropshipping" },
      ".",
    ],
  },
];

export function caseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

/** The verbatim homepage quote for a story's shop. */
export function quoteFor(shop: CaseStudy["shop"]) {
  const q = GOOGLE_REVIEW_QUOTES.find((x) => x.shop === shop);
  if (!q) throw new Error(`No GOOGLE_REVIEW_QUOTES entry for ${shop}`);
  return q;
}

export const CASE_STUDIES_HUB = {
  path: "/case-studies",
  title: "Case Studies: Gun Store and FFL Websites | Coriolis",
  description:
    "How Coriolis built stores for Down Range Chico, Nightshade Optics and Big RanDaddy's, told in the owners' words. 100+ clients, 5-star Google rating.",
  eyebrow: "Ecommerce \u00b7 Case studies",
  h1: "Case studies: gun store websites we built",
  intro:
    "Three stores and three different jobs. The first is an indoor range with a full retail floor. The second is an online-only optics shop. The third is an ammo store that needed its register, its website and its distributors working together. Each story is told in the owner's words.",
} as const;
