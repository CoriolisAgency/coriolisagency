// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

/**
 * Custom domain (default): https://www.coriolisagency.com → base /
 * GitHub project path only: ASTRO_BASE=/coriolisagency/ ASTRO_SITE=https://coriolisagency.github.io
 */
const base = process.env.ASTRO_BASE || "/";
const site = process.env.ASTRO_SITE || "https://www.coriolisagency.com";

export default defineConfig({
  site,
  base,
  trailingSlash: "never",
  redirects: {
    "/ai-factory": "/ai-studio",
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/stack-preview"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

