/**
 * CA-FFLF-POPUP: strings and rules for the site-wide FFL Firewall pop-up.
 * Copy is verbatim from Brandy's popup-v2 COPY.md (v2b). Paul approved the
 * pop-up 10:33 AM ET, the map hero 10:54 AM ET, and white card F01 on desktop
 * 11:00 AM ET. No event tracking of any kind (not approved).
 */
export const FFW_POPUP_COPY = {
  eyebrow: "New from Coriolis",
  title: "FFL Firewall checks the cart at checkout for FFL dealers on WooCommerce",
  body: "It checks each item in the cart by UPC against the zip code the shopper entered, and takes out anything that can't ship there, with a message telling the shopper why.",
  price:
    "FFL Firewall is a paid plugin with a built-in demo. No purchase is needed to download it, and a license turns the checks on for $79 a month with unlimited transactions.",
  cta: "See FFL Firewall",
  later: "Not now",
  close: "Close",
  fine: "For FFL dealers running WooCommerce.",
  sheetTitle: "FFL Firewall for WooCommerce",
  sheetBody:
    "A paid plugin from Coriolis that checks each cart item by UPC and zip at checkout. Download it and try the built-in demo, then add a license at $79 a month for unlimited transactions.",
} as const;

export const FFW_POPUP_HREF = "/ffl-firewall/";
export const FFW_POPUP_DISMISS_KEY = "ffw_popup_dismissed_until";
export const FFW_POPUP_CLICKED_KEY = "ffw_popup_clicked";
export const FFW_POPUP_SESSION_KEY = "ffw_popup_session";
export const FFW_POPUP_DISMISS_DAYS = 14;

/** Pages that never show it: the FFL Firewall page and everything under it, plus /contact. */
export const FFW_POPUP_DENY_PREFIXES = ["/ffl-firewall", "/contact"] as const;

export function ffwPopupDenied(pathname: string): boolean {
  const p = (pathname.replace(/\/+$/, "") || "/").toLowerCase();
  return FFW_POPUP_DENY_PREFIXES.some((d) => p === d || p.startsWith(d + "/"));
}
