/**
 * CA-POPUP-FFL-FILTERS: strings and rules for the site-wide FFL Filters pop-up.
 * Copy is verbatim from Brandy's ffl-filters/popup-v1 COPY.md (Nov 21, 2026); Brandy owns it.
 * Paul, Sat Nov 21 10:08 AM ET: "Get Brandy to create a pop-up for FFL Filters using the Glock
 * hero and link it to the /ffl-filters page and make that the active pop-up on the CA site."
 * Paul 10:17 AM ET: "Show it on every CA page except /ffl-filters and /ffl-firewall."
 * No event tracking of any kind.
 */
export const FFF_POPUP_COPY = {
  eyebrow: "Free plugin from Coriolis",
  title: "FFL Filters: help shoppers find the 9mm Glock without scrolling your whole catalog",
  body:
    "If your store lists 9mm, 9x19 and 9mm Luger as three separate checkboxes, FFL Filters shows them as one Caliber choice, so a shopper checks one box and sees every gun in that chambering. It also filters by brand, barrel length, capacity and cost per round, and on a phone the panel opens as a drawer.",
  body2: "It's free for any FFL running WooCommerce, on any theme.",
  sheetBody:
    "FFL Filters shows 9mm, 9x19 and 9mm Luger as one Caliber choice, so a shopper checks one box and sees every gun in that chambering.",
  cta: "See FFL Filters",
  later: "Not now",
  close: "Close",
  fine: "Needs WordPress 6.5 or newer and WooCommerce 9.2 or newer.",
} as const;

export const FFF_POPUP_HREF = "/ffl-filters";
export const FFF_POPUP_DISMISS_KEY = "fff_popup_dismissed_until";
export const FFF_POPUP_CLICKED_KEY = "fff_popup_clicked";
export const FFF_POPUP_SESSION_KEY = "fff_popup_session";
export const FFF_POPUP_DISMISS_DAYS = 14;

/**
 * Deny list (Paul 10:17 AM ET): never on /ffl-filters or /ffl-firewall, or anything under them.
 * Same normalisation as the Firewall pop-up: trailing slashes stripped, lowercased.
 */
export const FFF_POPUP_DENY_PATHS = ["/ffl-filters", "/ffl-firewall"] as const;

export function fffPopupAllowed(pathname: string): boolean {
  const p = (pathname.replace(/\/+$/, "") || "/").toLowerCase();
  for (const d of FFF_POPUP_DENY_PATHS as readonly string[]) {
    if (p === d || p.startsWith(d + "/")) return false;
  }
  return true;
}
