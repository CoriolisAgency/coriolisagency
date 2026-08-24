/**
 * Homepage Google reviews strip.
 * Quotes and count are from the Google listing (Trustindex Google source).
 * Place ID from the g.page short link. Places API still returns five reviews.
 * Update rating/count when the listing moves.
 */
import { LINKS } from "./links";

export const GOOGLE_PLACE_ID = "ChIJmcphFpSqPYYRr4PGs-CWxdw";
export const GOOGLE_REVIEWS_HREF = LINKS.googleReviews;

/** Google listing as of 2026-08-24 (17 Google reviews, all 5★). */
export const GOOGLE_REVIEW_RATING = 5;
export const GOOGLE_REVIEW_COUNT = 17;

export const GOOGLE_REVIEW_QUOTES = [
  {
    name: "Steve Dyke",
    shop: "Down Range Chico",
    body: "Paul and his team took the time to understand that we are not a simple one-category retail operation. Responsive, patient, and willing to work through the details instead of a one-size-fits-all website.",
  },
  {
    name: "Thomas",
    shop: "Nightshade Optics",
    body: "Paul took the time to understand the vision and personality behind Nightshade Optics. He didn’t just create the site and disappear — ongoing support after launch. Five stars all the way.",
  },
  {
    name: "Carl Giuffre",
    shop: "Big RanDaddy's",
    body: "POS, ecommerce, and a dozen distributors. Coriolis was the only one able to get it done. Our business has doubled. Email Paul and you get an immediate response.",
  },
] as const;
