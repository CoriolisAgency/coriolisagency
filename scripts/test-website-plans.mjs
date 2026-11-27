// CA-WEBSITE-PLANS-PAGE (Paul 2026-11-27 4:56 PM ET via Chief 4:57): header "Website Plans" item, the /website-plans page,
// and the plan cards + setup packages shared with /ecommerce so one edit updates both.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const ok = (n) => console.log(`  ok  ${n}`);

// 1. Header nav: one Website Plans item, same tab, no GunSearchEngine.com item (desktop and drawer both map MAIN_NAV).
const nav = read("src/lib/nav.ts");
assert.match(nav, /\{\s*href:\s*"website-plans",\s*label:\s*"Website Plans"\s*\}/, "Website Plans item links website-plans");
assert.doesNotMatch(nav, /gunsearchengine/i, "no GunSearchEngine.com header item");
assert.doesNotMatch(nav, /website-plans[^}]*external/, "Website Plans is not external (same tab)");
const chrome = read("src/components/SiteChrome.astro");
assert.equal([...chrome.matchAll(/MAIN_NAV\.map\(/g)].length, 2, "desktop nav and mobile drawer both read MAIN_NAV");
assert.match(chrome, /label:\s*"GunSearchEngine\.com"/, "footer family GunSearchEngine.com link stays (D-N3/D-N4)");
ok("nav: Website Plans in MAIN_NAV, no GSE header item, footer family link stays");

// 2. Shared components: both pages import and render them, and ecommerce.astro no longer carries its own copies.
const eco = read("src/pages/ecommerce.astro");
const wp = read("src/pages/website-plans.astro");
for (const [name, src] of [["ecommerce.astro", eco], ["website-plans.astro", wp]]) {
  assert.match(src, /import HostingPlansSection from "\.\.\/components\/HostingPlansSection\.astro"/, `${name} imports HostingPlansSection`);
  assert.match(src, /import SetupPackagesSection from "\.\.\/components\/SetupPackagesSection\.astro"/, `${name} imports SetupPackagesSection`);
  assert.match(src, /<HostingPlansSection[ />]/, `${name} renders HostingPlansSection`);
  assert.match(src, /<SetupPackagesSection[ />]/, `${name} renders SetupPackagesSection`);
}
assert.doesNotMatch(eco, /PLANS\.map|SETUP\.map|PLAN_TAGLINE_EMOJI/, "ecommerce.astro has no private copy of the plan or setup cards");
const wpBody = wp.slice(wp.indexOf("---", 3) + 3); // markup after the frontmatter comments
assert.doesNotMatch(wpBody, /PLANS|SETUP|BulletList|set:html|<p[ >]|<h2/, "website-plans.astro composes no cards or copy of its own");
const plansComp = read("src/components/HostingPlansSection.astro");
const setupComp = read("src/components/SetupPackagesSection.astro");
assert.match(plansComp, /PLANS\.map/, "plan cards read plans.ts");
assert.match(setupComp, /SETUP\.map/, "setup cards read plans.ts");
assert.ok(wp.indexOf("<HostingPlansSection") < wp.indexOf("<SetupPackagesSection"), "plan cards come before the setup packages");
assert.match(wp, /<HostingPlansSection headingTag="h1" \/>/, "the plans heading is the page H1");
ok("shared components used by /ecommerce and /website-plans, plans before setup");

// 3. H1 is the live string word for word; title and description are Brandy's strings, cleared by Karp (META-FINAL.md, sha8 783c6349).
const H1 = "The five monthly plans, from Minute Man through FFL Accelerator";
assert.ok(plansComp.includes(`{"${H1}"}`), "H1 string is the plans heading in the shared component");
const TITLE = "FFL Website Plans and Pricing: $169 to $569/mo | Coriolis";
const DESC = "Compare five monthly FFL website plans from $169 to $569/mo, then pick a Basic $500 or Retail $2,500 setup package for your gun store's WooCommerce site.";
const ecoDesc = eco.match(/description="([^"]+)"/)[1];
assert.notEqual(DESC, ecoDesc, "meta description is unique, not /ecommerce's");
assert.ok(wp.includes(`description="${DESC}"`), "meta description is the cleared string verbatim");
assert.ok(wp.includes(`title="${TITLE}"`), "title is the cleared string verbatim");
assert.match(wp, /path="\/website-plans"/, "path (canonical) is /website-plans");
ok("title and description are the cleared strings; H1 is the live string");

// 4. Sitemap lastmod and IndexNow.
assert.ok(JSON.parse(read("lastmod.json"))["/website-plans"], "/website-plans is in lastmod.json");
const noIndexNow = read("scripts/indexnow-submit.mjs").match(/const NO_INDEXNOW = \[(.*?)\];/s)[1];
assert.doesNotMatch(noIndexNow, /website-plans/, "IndexNow does not refuse /website-plans (it is not in NO_INDEXNOW)");
assert.doesNotMatch(read("astro.config.mjs"), /website-plans/, "the sitemap does not filter /website-plans out");
ok("lastmod entry, IndexNow and sitemap config allow /website-plans");

// 5. Built HTML (when dist/ exists): canonical, one H1, cards on both pages, nav item, sitemap.
const dist = path.join(root, "dist");
if (fs.existsSync(dist)) {
  const strip = (h) => h.replace(/ data-astro-cid-[a-z0-9]+(?:="[^"]*")?/g, "");
  const built = (p) => strip(fs.readFileSync(path.join(dist, p, "index.html"), "utf8"));
  const wpHtml = built("website-plans");
  const ecoHtml = built("ecommerce");
  assert.match(wpHtml, /<link rel="canonical" href="https:\/\/www\.coriolisagency\.com\/website-plans"/, "built canonical");
  assert.doesNotMatch(wpHtml, /<meta name="robots" content="[^"]*noindex/i, "built page is indexable");
  assert.equal((wpHtml.match(/<h1[ >]/g) ?? []).length, 1, "exactly one H1");
  assert.match(wpHtml, new RegExp(`<h1 class="mb-6 text-xl font-semibold text-white">${H1}</h1>`), "built H1 text");
  assert.ok(wpHtml.includes(`<title>${TITLE}</title>`), "built title");
  assert.ok(wpHtml.includes(`content="${DESC}"`), "built meta description");
  for (const [name, html] of [["/website-plans", wpHtml], ["/ecommerce", ecoHtml]]) {
    for (const id of ["minute-man", "militia", "gun-runner", "warlord", "ffl-accelerator"]) assert.ok(html.includes(`<article id="${id}"`), `${name} has the ${id} plan card`);
    assert.equal((html.match(/one-time<\/span>/g) ?? []).length, 2, `${name} has both setup packages`);
    assert.ok(html.indexOf('id="plans"') < html.indexOf('id="setup"'), `${name}: plans before setup`);
    // nav: desktop + drawer each carry the item; no GSE header anchor.
    assert.equal((html.match(/<a href="\/website-plans"[^>]*>Website Plans<\/a>/g) ?? []).length, 2, `${name} nav item (desktop and drawer)`);
    assert.doesNotMatch(html, /<a[^>]*href="https:\/\/gunsearchengine\.com\/for-dealers"/, `${name}: no GSE header item`);
    assert.match(html, /href="https:\/\/www\.gunsearchengine\.com\/"/, `${name}: footer GSE link stays`);
  }
  // The shared blocks are byte-identical on both pages (only the plans heading tag differs: h1 here, h2 on /ecommerce).
  const block = (html, id, endId) => {
    const s = html.indexOf(`<section class="border-b border-zinc-800/80 py-12" id="${id}"`);
    assert.ok(s >= 0, `section ${id} found`);
    return html.slice(s, html.indexOf("</section>", s) + 10);
  };
  assert.equal(block(wpHtml, "plans").replace("<h1 ", "<h2 ").replace("</h1>", "</h2>"), block(ecoHtml, "plans"), "plan cards identical on both pages");
  assert.equal(block(wpHtml, "setup"), block(ecoHtml, "setup"), "setup packages identical on both pages");
  assert.ok(block(wpHtml, "setup").includes("<li>GunSearchEngine.com setup (free plan)</li>"), "setup bullet stays plain text on /website-plans, as on /ecommerce");
  assert.ok(block(ecoHtml, "setup").includes("<li>GunSearchEngine.com setup (free plan)</li>"), "setup bullet stays plain text on /ecommerce");
  const sm = fs.readdirSync(dist).filter((f) => /^sitemap-\d+\.xml$/.test(f)).map((f) => fs.readFileSync(path.join(dist, f), "utf8")).join("");
  assert.match(sm, /<loc>https:\/\/www\.coriolisagency\.com\/website-plans<\/loc>/, "sitemap lists /website-plans");
  ok("built: canonical, one H1, cards identical on /website-plans and /ecommerce, nav item, sitemap");
} else {
  console.log("  skip built-HTML checks (no dist build)");
}
console.log("test-website-plans: ok");