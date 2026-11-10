/**
 * SEO-REFRESH-P1: tiny inline-markdown renderer for approved copy.
 * Supports [text](href) and **bold** only. Text is HTML-escaped first.
 * Internal hrefs go through withBase and open in the same tab; http(s) hrefs open in a new tab.
 * Links use linkClass (global.css `a { color: inherit }` needs the `!` utilities).
 */
import { withBase } from "./base";
import { linkClass } from "./links";
import type { FaqItem } from "./faq";

const escapeHtml = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const BOLD = /\*\*([^*]+)\*\*/g;

export function md(src: string): string {
  return escapeHtml(src)
    .replace(BOLD, '<strong class="text-zinc-300">$1</strong>')
    .replace(LINK, (_m, text: string, href: string) => {
      if (/^(tel:|mailto:)/.test(href)) {
        return `<a href="${href}" class="${linkClass}">${text}</a>`;
      }
      if (/^https?:\/\//.test(href)) {
        return `<a href="${href}" class="${linkClass}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      }
      const [p, hash] = href.split("#");
      const url = `${withBase(p)}${hash ? `#${hash}` : ""}`;
      return `<a href="${url}" class="${linkClass}">${text}</a>`;
    });
}

/** Plain text for JSON-LD: link text kept, markup dropped. */
export function plain(src: string): string {
  return src.replace(LINK, "$1").replace(BOLD, "$1");
}

/** FAQ item from approved copy: plain `a` for FAQPage JSON-LD, linked `html` for the page. */
export function faqMd(q: string, a: string): FaqItem {
  return { q, a: plain(a), html: md(a) };
}
