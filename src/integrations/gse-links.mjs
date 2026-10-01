// Build step (astro:build:done) over the generated HTML:
// 1. Plain-text "GunSearchEngine.com" (not already inside a link or other
//    interactive/non-body element) becomes a link to https://gunsearchengine.com.
// 2. Links to off-site family hosts (gunsearchengine.com, gunstoregame.com,
//    fflintel.com, fflanalytics.com, fflsearchconsole.com) open in a new tab
//    (target="_blank" rel="noopener noreferrer"). On-site links such as
//    /ffl-analytics and /ffl-search-console open in the same tab, so any
//    target/rel on them is removed.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const GSE_ROOT = "https://gunsearchengine.com";
const LABEL = "GunSearchEngine.com";
const LINK = `<a href="${GSE_ROOT}" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 hover:text-sky-300">${LABEL}</a>`;
const SKIP = new Set(["a", "button", "summary", "label", "option", "select", "textarea", "title", "script", "style", "svg", "head", "noscript", "template"]);
const NEW_TAB_HREF = /^https?:\/\/(?:www\.)?(?:gunsearchengine|gunstoregame|fflintel|fflanalytics|fflsearchconsole)\.com(?:[/?#:]|$)/i;
const SAME_TAB_HREF = /^(?:\/[^"?#]*)?\/ffl-(?:analytics|search-console)(?:[?#]|$)/i;

function fixAnchor(tag) {
  const href = /\shref="([^"]*)"/i.exec(tag)?.[1];
  if (href === undefined) return tag;
  if (NEW_TAB_HREF.test(href)) {
    const t = tag.replace(/\s(target|rel)="[^"]*"/gi, "");
    return t.replace(/^<a\b/i, '<a target="_blank" rel="noopener noreferrer"');
  }
  if (SAME_TAB_HREF.test(href)) return tag.replace(/\s(target|rel)="[^"]*"/gi, "");
  return tag;
}

export function transformHtml(html) {
  const out = [];
  const skip = [];
  const re = /<!--[\s\S]*?-->|<[^>]+>|[^<]+/g;
  let m;
  while ((m = re.exec(html))) {
    let tok = m[0];
    if (tok.startsWith("<!--")) { out.push(tok); continue; }
    if (tok.startsWith("<")) {
      const tm = /^<\/?([a-zA-Z][\w-]*)/.exec(tok);
      const name = tm?.[1]?.toLowerCase();
      if (name === "a" && !tok.startsWith("</")) tok = fixAnchor(tok);
      if (name && SKIP.has(name)) {
        if (tok.startsWith("</")) {
          const i = skip.lastIndexOf(name);
          if (i !== -1) skip.length = i;
        } else if (!tok.endsWith("/>")) skip.push(name);
      }
      out.push(tok);
      continue;
    }
    out.push(skip.length === 0 ? tok.split(LABEL).join(LINK) : tok);
  }
  return out.join("");
}

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, files);
    else if (e.name.endsWith(".html")) files.push(p);
  }
  return files;
}

export default function gseLinks() {
  return {
    name: "gse-links",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        const files = walk(fileURLToPath(dir));
        let changed = 0;
        for (const f of files) {
          const src = fs.readFileSync(f, "utf8");
          const next = transformHtml(src);
          if (next !== src) { fs.writeFileSync(f, next); changed++; }
        }
        logger.info(`gse-links: updated ${changed} of ${files.length} HTML files`);
      },
    },
  };
}
