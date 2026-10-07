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
      // lastmod = build date. Vercel builds from a shallow clone and pages
      // share layouts and components, so per-file git dates are not reliable.
      lastmod: new Date(),
    }),
    sitemapHomeSlash(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

