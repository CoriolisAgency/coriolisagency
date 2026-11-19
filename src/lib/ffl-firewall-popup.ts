/**
 * CA-FFLF-POPUP: strings and rules for the site-wide FFL Firewall pop-up.
 * Copy is verbatim from Brandy's popup-v2 COPY-rebrand-v3-2026-11-19.md (Paul 1:33 PM ET, FFLF-FIREWALL-V1-OVERWATCH-LEAD). Every "FFL Firewall (dot) NAME" uses non-breaking spaces so it never wraps. Paul approved the
 * pop-up 10:33 AM ET, the map hero 10:54 AM ET, and white card F01 on desktop
 * 11:00 AM ET. No event tracking of any kind (not approved).
 */
export const FFW_POPUP_COPY = {
  eyebrow: "New from Coriolis",
  title: "FFL Firewall: shipping checks and security for FFL dealers",
  body:
    "FFL\u00A0Firewall\u00A0\u00B7\u00A0OVERWATCH helps you catch items at checkout that can't ship to the buyer's ZIP. FFL\u00A0Firewall\u00A0\u00B7\u00A0ACTIVE\u00A0DEFENSE keeps watching for bots, and FFL\u00A0Firewall\u00A0\u00B7\u00A0RECON reports come as a bonus.",
  price:
    "A flat $79 a month covers every service, unlimited FFL\u00A0Firewall\u00A0\u00B7\u00A0OVERWATCH transactions and future features. You can download it and try the demo before you buy a license.",
  cta: "See FFL Firewall",
  later: "Not now",
  close: "Close",
  fine: "For FFL dealers running WooCommerce.",
} as const;

export const FFW_POPUP_HREF = "/ffl-firewall";
export const FFW_POPUP_DISMISS_KEY = "ffw_popup_dismissed_until";
export const FFW_POPUP_CLICKED_KEY = "ffw_popup_clicked";
export const FFW_POPUP_SESSION_KEY = "ffw_popup_session";
export const FFW_POPUP_DISMISS_DAYS = 14;

/**
 * Paul 2026-11-18 11:22 AM ET: the pop-up shows ONLY on the FFL Firewall page (and its
 * trailing-slash form) while he tests it. Not on the terms page, not anywhere else.
 */
export const FFW_POPUP_ALLOW_PATHS = ["/ffl-firewall"] as const;

export function ffwPopupAllowed(pathname: string): boolean {
  const p = (pathname.replace(/\/+$/, "") || "/").toLowerCase();
  return (FFW_POPUP_ALLOW_PATHS as readonly string[]).includes(p);
}
