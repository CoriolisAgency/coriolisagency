// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

/**
 * Custom domain (default): https://coriolisagency.com → base /
 * GitHub project path only: ASTRO_BASE=/coriolisagency/ ASTRO_SITE=https://coriolisagency.github.io
 */
const base = process.env.ASTRO_BASE || "/";
const site = process.env.ASTRO_SITE || "https://coriolisagency.com";

export default defineConfig({
  site,
  base,
  trailingSlash: "never",
  redirects: {
    "/ai-factory": "/ai-studio",
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});

