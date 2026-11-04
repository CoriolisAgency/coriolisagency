import { CANON_PATHS } from "./site";

export type PressPost = {
  slug: string;
  path: string;
  kicker: string;
  title: string;
  dek: string;
  date: string;
  dateLabel: string;
  location: string;
  ogImagePath: string;
  imageAlt: string;
  /** Hidden: off the /press list and the sitemap; route is its own page file. */
  hidden?: boolean;
};

export const PRESS_POSTS: PressPost[] = [
  {
    slug: "five-ffls-choose-coriolis-for-aim-pos-integration",
    path: "/press/five-ffls-choose-coriolis-for-aim-pos-integration",
    kicker: "Press release",
    title:
      "Naples Gun Shop, Down Range Chico, Lawful Defense, 2A Firearms, and The Range in McKinney Choose Coriolis Agency for AIM POS Integration",
    dek: "Five FFL retailers and shooting ranges selected Coriolis Agency to integrate AIM POS with WooCommerce storefronts they own.",
    date: "2026-09-02",
    dateLabel: "September 2, 2026",
    location: "Greenville, S.C.",
    ogImagePath: CANON_PATHS.rangeMckinney,
    imageAlt:
      "The Range in McKinney: a Coriolis-built WooCommerce storefront for an indoor range and online gun store.",
  },
  {
    slug: "unum-partners-with-coriolis",
    path: "/press/unum-partners-with-coriolis",
    kicker: "Press release",
    title:
      "UNUM Partners With Coriolis To Deliver Fully Managed Ecommerce as a Service For Online Ammunition Retailers",
    dek: "UNUM retailers can now get a fully managed online store from Coriolis Agency: built on their own domain, run by Coriolis, and owned by the retailer.",
    date: "2026-11-04",
    dateLabel: "November 4, 2026",
    location: "Greenville, S.C.",
    ogImagePath: CANON_PATHS.unumPressHero,
    imageAlt: "Coriolis and UNUM partnership: UNUM catalog, your store run by Coriolis, orders shipped by UNUM.",
    hidden: true,
  },
];

export function pressBySlug(slug: string): PressPost | undefined {
  return PRESS_POSTS.find((post) => post.slug === slug);
}
