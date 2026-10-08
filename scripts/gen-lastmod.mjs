// Regenerates lastmod.json: sitemap URL path -> ISO date of the last commit
// that touched the page's source file. Dynamic routes also count their data
// file. Run `npm run lastmod:gen` with full git history and commit the result.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesDir = path.join(root, "src", "pages");
const outFile = path.join(root, "lastmod.json");

// Same pages the sitemap filter in astro.config.mjs leaves out, plus 404.
const SKIP = new Set(["/404", "/stack-preview", "/confirmed", "/unsubscribe"]);

// Dynamic routes: the data file that holds their slugs and content.
const DYNAMIC = {
  "src/pages/[pos].astro": { data: "src/lib/pos.ts", prefix: "/" },
  "src/pages/press/[slug].astro": { data: "src/lib/press.ts", prefix: "/press/" },
};

const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();

if (git("rev-parse", "--is-shallow-repository") === "true") {
  console.error("gen-lastmod: shallow clone, dates would be wrong. Run it with full history.");
  process.exit(1);
}

function lastCommit(...files) {
  const dates = files.map((f) => git("log", "-1", "--format=%cI", "--", f)).filter(Boolean);
  return dates.sort((a, b) => Date.parse(b) - Date.parse(a))[0] ?? null;
}

function walk(dir, prefix = "") {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...walk(path.join(dir, e.name), rel));
    else out.push(rel);
  }
  return out;
}

const map = {};
for (const rel of walk(pagesDir)) {
  if (!/\.(astro|md|mdx)$/.test(rel)) continue;
  const file = `src/pages/${rel}`;
  const dyn = DYNAMIC[file];
  if (dyn) {
    const date = lastCommit(file, dyn.data);
    const src = fs.readFileSync(path.join(root, dyn.data), "utf8");
    for (const m of src.matchAll(/^\s*slug:\s*"([^"]+)"/gm)) {
      if (date) map[dyn.prefix + m[1]] = date;
    }
    continue;
  }
  if (rel.includes("[")) {
    console.warn(`gen-lastmod: no data file mapped for ${file}, skipped`);
    continue;
  }
  let p = "/" + rel.replace(/\.(astro|md|mdx)$/, "").replace(/(^|\/)index$/, "");
  if (p.length > 1) p = p.replace(/\/$/, "");
  if (SKIP.has(p)) continue;
  const date = lastCommit(file);
  if (date) map[p] = date;
  else console.warn(`gen-lastmod: ${file} has no commit yet, skipped`);
}

const sorted = Object.fromEntries(Object.keys(map).sort().map((k) => [k, map[k]]));
fs.writeFileSync(outFile, JSON.stringify(sorted, null, 2) + "\n");
console.log(`gen-lastmod: wrote ${Object.keys(sorted).length} paths to lastmod.json`);
