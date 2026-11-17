#!/usr/bin/env node
/**
 * FFLFW-LANDING guard: /ffl-firewall is a noindex early-access landing page.
 * Checks Brandy's copy and art, the lead-form payload (message/page/pillar,
 * no data-file), launch noindex + nav order, sitemap/lastmod/IndexNow/vercel
 * exclusions, and banned words. If dist/ exists (after `npm run build`), also
 * checks the built page, sitemap, OG/hero bytes, and header nav order.
 */
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

const pageRel = "src/pages/ffl-firewall/index.astro";
const gateRel = "src/components/FflFirewallLeadGate.astro";
const page = read(pageRel);
const gate = read(gateRel);

const banned = /Orchid|eState/i;
assert.doesNotMatch(page, banned, `${pageRel} has a banned word`);
assert.doesNotMatch(gate, banned, `${gateRel} has a banned word`);

// 1. Page: noindex, title, meta, path, early-access CTAs, contact, no download/file.
assert.match(page, /^\s*noindex\s*$/m, "page passes noindex to BaseLayout");
assert.match(
  page,
  /title="FFL Firewall: a WooCommerce checkout plugin for FFL dealers \| Coriolis"/,
);
assert.match(
  page,
  /description="FFL Firewall is a WooCommerce plugin for FFL dealers, made by Coriolis. At checkout it checks each product against the shopper's zip code and removes items that can't go there."/,
);
assert.match(page, /path="\/ffl-firewall"/);
assert.match(page, /withBase\("contact"\)/);
assert.match(page, /const earlyAccessLabel = "Get early access";/);
assert.match(page, /const contactLabel = "Talk to Coriolis";/);
const ea = [...page.matchAll(/data-early-access="(hero|footer)"/g)].map((m) => m[1]);
assert.deepEqual(ea, ["hero", "footer"], "hero and footer early-access buttons");
assert.doesNotMatch(page, /data-file=/);
assert.doesNotMatch(page, /data-download/);
assert.doesNotMatch(page, /\.zip/);
assert.match(page, /import FflFirewallLeadGate from "\.\.\/\.\.\/components\/FflFirewallLeadGate\.astro";/);
assert.match(page, /<FflFirewallLeadGate \/>/);
assert.match(read("src/layouts/BaseLayout.astro"), /noindex && <meta name="robots" content="noindex, nofollow" \/>/);

// Verbatim section copy and data-section names (FFL Filters structure + faq).
for (const section of ["hero", "built-around", "fits", "settings", "faq", "install", "requirements", "download"]) {
  assert.match(page, new RegExp(`data-section="${section}"`), `missing data-section=${section}`);
}
assert.match(page, /<h1[^>]*>A WooCommerce plugin that checks the cart at checkout for FFL dealers<\/h1>/);
assert.ok(page.includes("At checkout, FFL Firewall checks each product in the cart by UPC against the zip code the shopper entered. If an item is prohibited for that zip, it's removed from the cart and the shopper sees a message explaining why."));
assert.ok(page.includes("For FFL dealers running WooCommerce."));
assert.ok(page.includes("It checks each product in the cart against the shopper's zip"));
assert.ok(page.includes("The product check."));
assert.ok(page.includes("Items that can't go there."));
assert.ok(page.includes("A message for the shopper."));
assert.ok(page.includes("It runs at the checkout you already use"));
assert.ok(page.includes("What the check uses"));
assert.ok(page.includes("It uses the UPC on the product and the zip at checkout"));
assert.ok(page.includes("The questions dealers ask about FFL Firewall"));
assert.ok(page.includes("What does FFL Firewall check?"));
assert.ok(page.includes("Can I download it today?"));
assert.ok(page.includes("Leave your details and we'll write when it's ready"));
assert.ok(page.includes("A WooCommerce store"));
assert.ok(page.includes("Products that have a UPC"));
assert.ok(page.includes("A checkout where the shopper enters a zip code"));
assert.ok(page.includes("Get early access to FFL Firewall"));
assert.ok(page.includes("You're still responsible for what you ship, and this is not legal advice."));
assert.doesNotMatch(page, /California|Colorado|Illinois|Massachusetts|New York|Washington,?\s*D\.?C/i);
assert.doesNotMatch(gate, /California|Colorado|Illinois|Massachusetts|New York|Washington,?\s*D\.?C/i);

// 2. OG image: exact JPEG, page-only props, Brandy's alt verbatim.
const ogRel = "public/og/ffl-firewall-og.jpg";
const ogBuf = fs.readFileSync(path.join(root, ogRel));
assert.equal(ogBuf.length, 102821, "og image size");
assert.equal(
  crypto.createHash("sha256").update(ogBuf).digest("hex"),
  "da69a7a458f2b6b6a958ed201eae593db2faca173c4323a75ed2bc9463f62549",
  "og image sha256",
);
assert.equal(ogBuf.subarray(0, 3).toString("hex"), "ffd8ff", "jpeg magic");
function jpegSize(buf) {
  let i = 2;
  while (i < buf.length - 8) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
    }
    if (marker === 0xd8 || marker === 0xd9 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2;
      continue;
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  throw new Error("no JPEG SOF");
}
const ogDim = jpegSize(ogBuf);
assert.equal(ogDim.w, 1200, "og image width");
assert.equal(ogDim.h, 630, "og image height");

const ogAbs = "https://www.coriolisagency.com/og/ffl-firewall-og.jpg";
const ogAlt =
  'The FFL Firewall logo and the headline "A WooCommerce plugin that checks the cart at checkout for FFL dealers" sit on a dark navy background. Beside them, a stylized checkout in a browser window shows a cart with one item pulled out and a message that the item can\'t be shipped to the zip code the shopper entered.';
assert.match(page, /const ogImage = "og\/ffl-firewall-og\.jpg";/);
assert.match(page, /ogImagePath=\{ogImage\}/);
assert.match(page, /ogImageWidth=\{1200\}/);
assert.match(page, /ogImageHeight=\{630\}/);
assert.match(page, /ogImageAlt=\{ogImageAlt\}/);
assert.ok(page.includes(ogAlt), "page ships Brandy OG alt verbatim");

// 3. Hero art + lockup.
const heroAlt =
  "A stylized checkout in a browser window, with the address yourstore.example/checkout. The cart shows Glock pistols with their photos and specs; one row is pulled out, and a message reads, \"This item can't be shipped to the zip code you entered.\"";
const heroFiles = [
  { rel: "public/brand/ffl-firewall/hero/ffl-firewall-hero-desktop-1440x1152.webp", sha: "a679ce800e5695add5f11e1fa4ded012003ab830ae160fc24940351a4cb4da0d", w: 1440, h: 1152, magic: "52494646", kind: "webp" },
  { rel: "public/brand/ffl-firewall/hero/ffl-firewall-hero-desktop-1440x1152.jpg", sha: "5926bff3b0e77cffa36458ab6c9ff9ca60ac0e7dcc27a06dd229006e740c3d22", w: 1440, h: 1152, magic: "ffd8ff", kind: "jpeg" },
  { rel: "public/brand/ffl-firewall/hero/ffl-firewall-hero-mobile-750x1200.webp", sha: "590ae2f6a20bd849dffbca8299d2fbfb7cefdcf732549a041a1ec5f216e04d2f", w: 750, h: 1200, magic: "52494646", kind: "webp" },
  { rel: "public/brand/ffl-firewall/hero/ffl-firewall-hero-mobile-750x1200.jpg", sha: "d2d148f33bb7c180af825734094428dae146c217ea858c827ced8af41bb5b463", w: 750, h: 1200, magic: "ffd8ff", kind: "jpeg" },
];
function webpSize(buf) {
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") throw new Error("not webp");
  if (buf.toString("ascii", 12, 16) === "VP8X") return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
  if (buf.toString("ascii", 12, 16) === "VP8L") {
    const bits = buf.readUInt32LE(21);
    return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (buf.toString("ascii", 12, 16) === "VP8 ") {
    return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
  }
  throw new Error("no webp size");
}
for (const f of heroFiles) {
  const buf = fs.readFileSync(path.join(root, f.rel));
  assert.equal(crypto.createHash("sha256").update(buf).digest("hex"), f.sha, f.rel + " sha256");
  assert.equal(buf.subarray(0, f.magic.length / 2).toString("hex"), f.magic, f.rel + " magic");
  const dim = f.kind === "jpeg" ? jpegSize(buf) : webpSize(buf);
  assert.equal(dim.w, f.w, f.rel + " width");
  assert.equal(dim.h, f.h, f.rel + " height");
}
const lockupDark = fs.readFileSync(path.join(root, "public/brand/ffl-firewall/ffl-firewall-lockup-on-dark.svg"));
assert.equal(
  crypto.createHash("sha256").update(lockupDark).digest("hex"),
  "0ec20cc813d46eb74c9444c42553e87aa25dfe239890e169f813243b025e41dc",
  "lockup-on-dark sha256",
);
assert.ok(fs.existsSync(path.join(root, "public/brand/ffl-firewall/ffl-firewall-lockup-on-light.svg")));
assert.ok(fs.existsSync(path.join(root, "public/brand/ffl-firewall/icon/ffl-firewall-icon.svg")));
assert.ok(fs.existsSync(path.join(root, "public/brand/ffl-firewall/icon/ffl-firewall-icon-512.png")));
assert.ok(fs.existsSync(path.join(root, "public/brand/ffl-firewall/icon/ffl-firewall-icon-small.svg")));
assert.ok(fs.existsSync(path.join(root, "public/brand/ffl-firewall/icon/ffl-firewall-icon-32.png")));
assert.match(page, /width="278"/);
assert.match(page, /height="80"/);
assert.match(page, /withBase\("brand\/ffl-firewall\/ffl-firewall-lockup-on-dark\.svg"\)/);
assert.match(page, /<picture>/);
assert.match(page, /media="\(min-width: 640px\)" type="image\/webp" srcset=\{withBase\("brand\/ffl-firewall\/hero\/ffl-firewall-hero-desktop-1440x1152\.webp"\)\} width="1440" height="1152"/);
assert.match(page, /media="\(min-width: 640px\)" srcset=\{withBase\("brand\/ffl-firewall\/hero\/ffl-firewall-hero-desktop-1440x1152\.jpg"\)\} width="1440" height="1152"/);
assert.match(page, /type="image\/webp" srcset=\{withBase\("brand\/ffl-firewall\/hero\/ffl-firewall-hero-mobile-750x1200\.webp"\)\} width="750" height="1200"/);
assert.match(page, /withBase\("brand\/ffl-firewall\/hero\/ffl-firewall-hero-mobile-750x1200\.jpg"\)/);
assert.ok(page.includes(heroAlt), "page ships the hero alt");
assert.match(page, /fetchpriority="high"/);
assert.match(page, /decoding="async"/);
assert.match(page, /loading="eager"/);
assert.match(page, /class="mt-10 block h-auto w-full rounded-\[14px\]"/);

// 4. Lead gate: payload fields, honeypot, no file/download.
assert.match(gate, /role="dialog"/);
assert.match(gate, /aria-modal="true"/);
assert.match(gate, /a\[data-early-access\]/);
assert.match(gate, /name="company"/);
assert.match(gate, /name="website"/);
assert.match(gate, /name="email"/);
assert.match(gate, /name="company_url"/);
assert.match(gate, /data-action="\/api\/lead"/);
assert.match(gate, /data-page="\/ffl-firewall"/);
assert.match(gate, /data-min-fill-ms="3000"/);
assert.match(gate, /pillar: "Ecommerce"/);
assert.match(gate, /message: "FFL Firewall early access"/);
assert.match(gate, /page: pagePath/);
assert.match(gate, /site: "coriolisagency"/);
assert.match(gate, /name: company/);
assert.match(gate, /phone: ""/);
assert.match(gate, /started_at: startedAtStamp\(\)/);
assert.match(gate, /Get early access/);
assert.match(gate, /Enter your company name, website URL, and email\./);
assert.match(gate, /Company name is required\./);
assert.match(gate, /Email is required\./);
assert.match(gate, /That email does not look valid\./);
assert.match(gate, /URL is required\./);
assert.match(gate, /We'll write when FFL Firewall is ready to try/);
assert.match(gate, /We couldn't send that\. Try again, or write to /);
assert.match(gate, /mailto:support@coriolisagency\.com/);
assert.match(gate, /setSendFailedError/);
assert.match(gate, /mailto:support@coriolisagency\.com/);
assert.match(gate, /write to\{' '\}/);
assert.match(gate, /"Escape"/);
assert.doesNotMatch(gate, /data-file=/);
assert.doesNotMatch(gate, /startDownload/);
assert.doesNotMatch(gate, /\.zip/);
assert.doesNotMatch(gate, /data-download/);

// 5. Nav: FFL Firewall sits in the FFL Plugins dropdown (CA-NAV-FFL-PLUGINS).
const navRel = "src/lib/nav.ts";
const nav = read(navRel);
assert.match(nav, /\{\s*href:\s*"ffl-firewall",\s*label:\s*"FFL Firewall"\s*\}/, "header nav missing FFL Firewall in the FFL Plugins dropdown");
assert.match(nav, /label:\s*"FFL Plugins",\s*children:\s*\[[\s\S]*?href:\s*"ffl-filters",\s*label:\s*"FFL Filters"[\s\S]*?href:\s*"ffl-firewall",\s*label:\s*"FFL Firewall"/, "FFL Plugins dropdown must contain FFL Filters and FFL Firewall");
{
  assert.match(nav, /label:\s*"FFL Dropshipping",\s*children:\s*\[[\s\S]*?href:\s*"firearms-dropshipping",\s*label:\s*"FFL Dropshipping"[\s\S]*?href:\s*"ffl-cockpit",\s*label:\s*"FFL Cockpit"/, "FFL Dropshipping dropdown keeps firearms-dropshipping and includes FFL Cockpit");
  const drop = nav.indexOf('{ href: "firearms-dropshipping", label: "FFL Dropshipping" }');
  const plugins = nav.indexOf('label: "FFL Plugins"', drop);
  const ffl = nav.indexOf('{ href: "ffl-filters", label: "FFL Filters" }');
  const firewall = nav.indexOf('{ href: "ffl-firewall", label: "FFL Firewall" }');
  const pos = nav.indexOf('href: "gun-store-pos"');
  assert.ok(drop !== -1 && plugins !== -1 && ffl !== -1 && firewall !== -1 && pos !== -1, "header nav missing Dropshipping, FFL Plugins, FFL Filters, FFL Firewall, or POS");
  assert.ok(drop < plugins && plugins < ffl && ffl < firewall && firewall < pos, "nav order should be FFL Dropshipping, FFL Plugins dropdown, Gun Store POS");
}

// 6. Sitemap + lastmod + robots + vercel + IndexNow.
const cfg = read("astro.config.mjs");
assert.match(cfg, /!\/\\\/ffl-firewall\\\/\?\$\/\.test\(new URL\(page\)\.pathname\)/, "sitemap filter excludes /ffl-firewall");
assert.match(read("scripts/gen-lastmod.mjs"), /"\/ffl-firewall",/);
assert.equal(JSON.parse(read("lastmod.json"))["/ffl-firewall"], undefined, "not in lastmod.json");
assert.match(read("public/robots.txt"), /^Disallow: \/ffl-firewall$/m);

const vercel = JSON.parse(read("vercel.json"));
const hdr = (src) => Object.fromEntries((vercel.headers.find((h) => h.source === src)?.headers ?? []).map((h) => [h.key, h.value]));
assert.equal(hdr("/ffl-firewall")["X-Robots-Tag"], "noindex, nofollow");

for (const u of ["https://www.coriolisagency.com/ffl-firewall", "https://www.coriolisagency.com/ffl-firewall/"]) {
  let code = 0;
  try {
    execFileSync(process.execPath, [path.join(root, "scripts/indexnow-submit.mjs"), u], { stdio: "pipe", env: { ...process.env, INDEXNOW_KEY: "test-key-not-used" } });
  } catch (e) {
    code = e.status;
  }
  assert.equal(code, 2, `indexnow refuses ${u}`);
}

// 7. package.json test:ci includes this script.
assert.match(read("package.json"), /scripts\/test-ffl-firewall-landing\.mjs/);

// 8. Built output, when present.
const dist = path.join(root, "dist");
if (fs.existsSync(dist)) {
  const maps = fs.readdirSync(dist).filter((f) => /^sitemap-\d+\.xml$/.test(f));
  assert.ok(maps.length > 0, "built sitemap present");
  for (const m of maps) assert.doesNotMatch(fs.readFileSync(path.join(dist, m), "utf8"), /\/ffl-firewall</, `${m} lists /ffl-firewall`);
  const html = fs.readFileSync(path.join(dist, "ffl-firewall", "index.html"), "utf8");
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(html, /<title>FFL Firewall: a WooCommerce checkout plugin for FFL dealers \| Coriolis<\/title>/);
  assert.match(html, /role="dialog"/);
  assert.match(html, /data-fflfw-ea-gate/);
  assert.match(html, /data-page="\/ffl-firewall"/);
  assert.match(html, /data-action="\/api\/lead"/);
  assert.doesNotMatch(html, /data-file=/);
  assert.equal((html.match(/data-early-access="(hero|footer)"/g) ?? []).length, 2);
  assert.match(html, /FFL Firewall early access/);
  assert.match(html, /pillar: "Ecommerce"/);
  const ogAbsRe = ogAbs.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const ogAltEsc = ogAlt.replaceAll('"', "&quot;").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  assert.match(html, new RegExp(`<meta property="og:image" content="${ogAbsRe}"`));
  assert.match(html, /<meta property="og:image:width" content="1200"/);
  assert.match(html, /<meta property="og:image:height" content="630"/);
  assert.match(html, new RegExp(`<meta property="og:image:alt" content="${ogAltEsc}"`));
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"/);
  assert.match(html, new RegExp(`<meta name="twitter:image" content="${ogAbsRe}"`));
  const distOg = fs.readFileSync(path.join(dist, "og", "ffl-firewall-og.jpg"));
  assert.equal(
    crypto.createHash("sha256").update(distOg).digest("hex"),
    "da69a7a458f2b6b6a958ed201eae593db2faca173c4323a75ed2bc9463f62549",
    "dist og image sha256",
  );
  const heroAltEsc = heroAlt.replaceAll('"', "&quot;").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  assert.match(html, /<picture>/);
  assert.match(html, /<source media="\(min-width: 640px\)" type="image\/webp" srcset="\/brand\/ffl-firewall\/hero\/ffl-firewall-hero-desktop-1440x1152\.webp" width="1440" height="1152"/);
  assert.match(html, /<source media="\(min-width: 640px\)" srcset="\/brand\/ffl-firewall\/hero\/ffl-firewall-hero-desktop-1440x1152\.jpg" width="1440" height="1152"/);
  assert.match(html, /<source type="image\/webp" srcset="\/brand\/ffl-firewall\/hero\/ffl-firewall-hero-mobile-750x1200\.webp" width="750" height="1200"/);
  assert.match(html, new RegExp(`src="/brand/ffl-firewall/hero/ffl-firewall-hero-mobile-750x1200.jpg"`));
  assert.match(html, new RegExp(`alt="${heroAltEsc}"`));
  for (const f of heroFiles) {
    const distHeroBuf = fs.readFileSync(path.join(dist, f.rel.replace(/^public\//, "")));
    assert.equal(crypto.createHash("sha256").update(distHeroBuf).digest("hex"), f.sha, "dist " + f.rel + " sha256");
  }
  const fwHref = /<a\b[^>]*href="\/ffl-firewall\/?"[^>]*>FFL Firewall<\/a>/;
  const fflHref = /<a\b[^>]*>FFL Filters<\/a>/;
  const pluginsHref = /<a\b[^>]*>FFL Plugins<\/a>/;
  const cockpitHref = /<a\b[^>]*>FFL Cockpit<\/a>/;
  const chromeOf = (built) => {
    const header = built.match(/<header\b[\s\S]*?<\/header>/)?.[0] ?? "";
    const drawerAt = built.indexOf('id="nav-drawer"');
    const scriptAt = drawerAt === -1 ? -1 : built.indexOf("<script>", drawerAt);
    const drawer =
      drawerAt === -1
        ? ""
        : built.slice(built.lastIndexOf("<div", drawerAt), scriptAt === -1 ? built.length : scriptAt);
    return { header, drawer };
  };
  const assertHeaderNav = (built, rel) => {
    const { header, drawer } = chromeOf(built);
    assert.ok(header, `${rel} missing <header>`);
    assert.ok(drawer.includes('id="nav-drawer"'), `${rel} missing nav-drawer`);
    assert.match(header, fwHref, `${rel} desktop header missing FFL Firewall link`);
    assert.match(drawer, fwHref, `${rel} mobile nav missing FFL Firewall link`);
    assert.match(header, pluginsHref, `${rel} desktop header missing FFL Plugins link`);
    assert.match(drawer, pluginsHref, `${rel} mobile nav missing FFL Plugins link`);
    const orderIn = (chunk, where) => {
      const drop = chunk.search(/<a\b[^>]*>FFL Dropshipping<\/a>/);
      const after = chunk.slice(drop);
      const cockpit = after.search(cockpitHref);
      const plugins = after.search(pluginsHref);
      const filters = after.search(fflHref);
      const fw = after.search(fwHref);
      const pos = chunk.search(/<a\b[^>]*>Gun Store POS<\/a>/);
      assert.ok(drop !== -1 && cockpit !== -1 && plugins !== -1 && filters !== -1 && fw !== -1 && pos !== -1, `${rel} ${where} missing Dropshipping, FFL Cockpit, FFL Plugins, FFL Filters, FFL Firewall, or POS`);
      assert.ok(cockpit < plugins && plugins < filters && filters < fw && drop + fw < pos, `${rel} ${where} FFL Plugins dropdown is not between FFL Dropshipping and Gun Store POS`);
    };
    orderIn(header, "desktop header");
    orderIn(drawer, "mobile nav");
  };
  assertHeaderNav(html, "ffl-firewall/index.html");
  const home = path.join(dist, "index.html");
  if (fs.existsSync(home)) assertHeaderNav(fs.readFileSync(home, "utf8"), "index.html");
  console.log("test-ffl-firewall-landing: dist checks ok");
}
console.log("test-ffl-firewall-landing: ok");
