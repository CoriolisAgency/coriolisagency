// FFLFW-LANDING-1-0: the one switch for the FFL Firewall 1.0.0 launch on /ffl-firewall.
//
// Leave FFLFW_V1_LIVE false until Paul's $79 test purchase (FFLF-FIREWALL-V1-S4) passes
// (Paul 9:15 AM ET Nov 23, 2026: "swap the zip and lift noindex as soon as my $79 test purchase passes").
//
// While false: the page stays noindex, nofollow, off the sitemap, lastmod and IndexNow, and every download
// button serves the current zip (FFLFW_ZIP_CURRENT).
// When true: the page drops noindex, enters the sitemap, lastmod and IndexNow, and every download button
// serves FFLFW_ZIP_V1. Two static files cannot read this flag, so the same PR must also
//   1. add public/downloads/ffl-firewall-1.0.0.zip (the rebuilt 1.0.0 zip, after FFLFW-CRAWLER-GRACE) and set
//      FFLFW_ZIP_V1_SHA256 to its sha256,
//   2. delete the "Disallow: /ffl-firewall" line (and its comment) from public/robots.txt,
//   3. delete the "/ffl-firewall" X-Robots-Tag header block from vercel.json.
// scripts/test-ffl-firewall-landing.mjs fails test:ci when any of these disagree with the flag.
// Only /ffl-firewall itself is affected; /ffl-firewall/setup and everything else under it stay as they are.
// Run `npm run lastmod:gen` after flipping so the page gets its lastmod date.

export const FFLFW_V1_LIVE = false;

export const FFLFW_ZIP_CURRENT = "downloads/ffl-firewall-0.1.3.zip";
export const FFLFW_ZIP_V1 = "downloads/ffl-firewall-1.0.0.zip";
/** sha256 of the 1.0.0 zip, set in the same PR that adds the zip and flips the flag. */
export const FFLFW_ZIP_V1_SHA256 = "";

/** Site-relative path of the zip every download button serves. */
export function fflfwZip() {
  return FFLFW_V1_LIVE ? FFLFW_ZIP_V1 : FFLFW_ZIP_CURRENT;
}

/** Whether /ffl-firewall stays noindex, off the sitemap, lastmod and IndexNow. */
export function fflfwLandingNoindex() {
  return !FFLFW_V1_LIVE;
}
