/**
 * Homepage Google reviews strip.
 * Quotes are from the Google listing (Trustindex Google source).
 * Place ID from the g.page short link. Places API still returns five reviews.
 * Public rating CTA links Trustindex so we do not hardcode a review count.
 */
import { LINKS } from "./links";

export const GOOGLE_PLACE_ID = "ChIJmcphFpSqPYYRr4PGs-CWxdw";
/** "Read on Google" widget link (g.page short URL). */
export const GOOGLE_REVIEWS_HREF = LINKS.googleReviews;
/** Homepage / proof-line rating CTA. */
export const TRUSTINDEX_REVIEWS_HREF =
  "https://www.trustindex.io/reviews/coriolisagency.com";

export const GOOGLE_REVIEW_RATING = 5;

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
