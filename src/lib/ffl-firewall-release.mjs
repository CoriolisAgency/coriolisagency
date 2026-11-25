// FFLFW-LANDING-1-0: the one switch for the FFL Firewall 1.0.0 launch on /ffl-firewall.
//
// FFLFW_V1_LIVE is true: the page is indexed (sitemap, lastmod, IndexNow) and every download
// button serves FFLFW_ZIP_V1. Companions that must agree with this flag:
//   1. public/downloads/ffl-firewall-1.0.2.zip and FFLFW_ZIP_V1_SHA256,
//   2. no Disallow: /ffl-firewall in public/robots.txt,
//   3. no /ffl-firewall X-Robots-Tag header in vercel.json.
// scripts/test-ffl-firewall-landing.mjs fails test:ci when any of these disagree with the flag.
// Only /ffl-firewall itself is affected; /ffl-firewall/setup and everything else under it stay as they are.
// Run `npm run lastmod:gen` after flipping so the page gets its lastmod date.

export const FFLFW_V1_LIVE = true;

export const FFLFW_ZIP_CURRENT = "downloads/ffl-firewall-0.1.3.zip";
export const FFLFW_ZIP_V1 = "downloads/ffl-firewall-1.0.2.zip";
/** sha256 of the 1.0.2 zip, set in the same PR that adds the zip. */
export const FFLFW_ZIP_V1_SHA256 = "e026bcfbea6df804057540599d66bc2154fc2ae51fc98a300b305d856cb211a2";

/** Site-relative path of the zip every download button serves. */
export function fflfwZip() {
  return FFLFW_V1_LIVE ? FFLFW_ZIP_V1 : FFLFW_ZIP_CURRENT;
}

/** Whether /ffl-firewall stays noindex, off the sitemap, lastmod and IndexNow. */
export function fflfwLandingNoindex() {
  return !FFLFW_V1_LIVE;
}
