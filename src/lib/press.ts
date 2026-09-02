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
      "The Range in McKinney — a Coriolis-built WooCommerce storefront for an indoor range and online gun store.",
  },
];

export function pressBySlug(slug: string): PressPost | undefined {
  return PRESS_POSTS.find((post) => post.slug === slug);
}
