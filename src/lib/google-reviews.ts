/**
 * Homepage Google reviews strip.
 * Places API still returns five reviews; we do not invent a Place ID.
 * Count and quotes are from the Google listing (Trustindex Google source).
 * Update rating/count when the listing moves.
 */
import { LINKS } from "./links";

export const GOOGLE_REVIEWS_HREF = LINKS.googleReviews;

/** Google listing as of 2026-08-24 (17 Google reviews, all 5★). */
export const GOOGLE_REVIEW_RATING = 5;
export const GOOGLE_REVIEW_COUNT = 17;

export const GOOGLE_REVIEW_QUOTES = [
  {
    name: "Steve Dyke",
    body: "Paul and his team took the time to understand that we are not a simple one-category retail operation. Responsive, patient, and willing to work through the details instead of a one-size-fits-all website.",
  },
  {
    name: "Zach",
    shop: "Volz Outpost",
    body: "Coriolis built the website for Volz Outpost with competence and precision. Professional, relentlessly responsive, no corporate fluff. They deliver actual results for actual businesses.",
  },
  {
    name: "Carl Giuffre",
    body: "POS, ecommerce, and a dozen distributors. Coriolis was the only one able to get it done. Our business has doubled. Email Paul and you get an immediate response.",
  },
] as const;
