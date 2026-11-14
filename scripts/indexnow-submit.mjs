#!/usr/bin/env node
/**
 * CA-INDEXNOW: submit published URLs to IndexNow (Bing and partners; Google ignores IndexNow,
 * so the sitemap lastmod is the Google signal). Run right after a page goes live:
 *
 *   npm run indexnow:submit -- https://www.coriolisagency.com/<path> [more urls]
 *
 * Key: INDEXNOW_KEY if set, else read from the live key file at /indexnow-key.txt (public by IndexNow
 * design). The key is never printed. Only https://www.coriolisagency.com URLs are sent.
 * Prints the IndexNow HTTP status (200 or 202 = accepted).
 */
const SITE = (process.env.INDEXNOW_SITE || "https://www.coriolisagency.com").replace(/\/$/, "");
const KEY_PATH = "/indexnow-key.txt";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const urls = [...new Set(process.argv.slice(2).map((u) => u.trim()).filter(Boolean))];
const host = new URL(SITE).host;
const bad = urls.filter((u) => {
  try {
    const parsed = new URL(u);
    return parsed.protocol !== "https:" || parsed.host !== host;
  } catch {
    return true;
  }
});
if (urls.length === 0 || bad.length > 0) {
  console.error(urls.length === 0 ? "usage: indexnow-submit <url> [url...]" : `not ${SITE} URLs: ${bad.join(", ")}`);
  process.exit(2);
}

// Unlinked, noindex paths are never submitted (CA-FFLF-DOWNLOAD-PAGE: /ffl-filters and its zip under /downloads/).
const NO_INDEXNOW = [/^\/ffl-filters(\/.*)?$/, /^\/downloads\//];
const refused = urls.filter((u) => NO_INDEXNOW.some((re) => re.test(new URL(u).pathname)));
if (refused.length > 0) {
  console.error(`refusing noindex URLs (not for IndexNow): ${refused.join(", ")}`);
  process.exit(2);
}

async function loadKey() {
  const fromEnv = (process.env.INDEXNOW_KEY || "").trim();
  if (fromEnv) return fromEnv;
  const res = await fetch(`${SITE}${KEY_PATH}`, { redirect: "error" });
  if (!res.ok) throw new Error(`key file ${SITE}${KEY_PATH} returned ${res.status}`);
  const key = (await res.text()).trim();
  if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) throw new Error("key file content is not a valid IndexNow key");
  return key;
}

const key = await loadKey();
const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `${SITE}${KEY_PATH}`, urlList: urls }),
});
const accepted = res.status === 200 || res.status === 202;
console.log(JSON.stringify({ endpoint: ENDPOINT, status: res.status, accepted, submitted: urls.length, urls }));
process.exit(accepted ? 0 : 1);
