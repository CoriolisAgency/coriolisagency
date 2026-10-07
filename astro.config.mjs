// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import gseLinks from "./src/integrations/gse-links.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Custom domain (default): https://www.coriolisagency.com → base /
 * GitHub project path only: ASTRO_BASE=/coriolisagency/ ASTRO_SITE=https://coriolisagency.github.io
 */
const base = process.env.ASTRO_BASE || "/";
const site = process.env.ASTRO_SITE || "https://www.coriolisagency.com";

/**
 * Per-page sitemap lastmod from lastmod.json (path -> ISO date of the page
 * source's last commit; regenerate with `npm run lastmod:gen`). Checked in
 * because Vercel builds from a shallow clone. Pages missing from the file
 * fall back to the build date.
 */
const LASTMOD = JSON.parse(
  fs.readFileSync(fileURLToPath(new URL("./lastmod.json", import.meta.url)), "utf8"),
);
const BUILD_DATE = new Date().toISOString();
const basePrefix = base.replace(/\/$/, "");
function pageLastmod(url) {
  let p = new URL(url).pathname;
  if (basePrefix && p.startsWith(basePrefix)) p = p.slice(basePrefix.length) || "/";
  if (p.length > 1) p = p.replace(/\/$/, "");
  if (LASTMOD[p]) return new Date(LASTMOD[p]).toISOString();
  console.warn(`[sitemap] lastmod: ${p} not in lastmod.json, using build date`);
  return BUILD_DATE;
}

/**
 * @astrojs/sitemap drops the root slash when trailingSlash is "never". Put it
 * back after the sitemap is written so the homepage <loc> matches its
 * canonical tag (https://www.coriolisagency.com/). Other URLs are untouched.
 */
const sitemapHomeSlash = () => ({
  name: "sitemap-home-slash",
  hooks: {
    "astro:build:done": ({ dir }) => {
      const home = new URL(base, site).href;
      const bare = home.replace(/\/$/, "");
      const out = fileURLToPath(dir);
      for (const f of fs.readdirSync(out)) {
        if (!/^sitemap-\d+\.xml$/.test(f)) continue;
        const file = path.join(out, f);
        const xml = fs.readFileSync(file, "utf8");
        fs.writeFileSync(file, xml.replaceAll(`<loc>${bare}</loc>`, `<loc>${home}</loc>`));
      }
    },
  },
});

export default defineConfig({
  site,
  base,
  trailingSlash: "never",
  redirects: {
    "/ai-factory": "/ai-studio",
  },
  integrations: [
    gseLinks(),
    sitemap({
      // Keep out: preview/legacy pages and the noindex list pages.
      filter: (page) =>
        !page.includes("/stack-preview") &&
        !page.includes("/gun-store-pos") &&
        !page.includes("/confirmed") &&
        !page.includes("/unsubscribe"),
      serialize(item) {
        item.lastmod = pageLastmod(item.url);
        return item;
      },
    }),
    sitemapHomeSlash(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

