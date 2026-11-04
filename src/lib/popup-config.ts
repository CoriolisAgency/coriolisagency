/** Inline window.CORIOLIS_POPUP for the agency site. popup-kit v2 (FFL-CLAIM-POPUP). */

/**
 * POPUP-PARK: pop-ups are parked (code kept, not mounted). Flip to true to bring the
 * agency claim pop-up back. Decision POPUP-PARK, Paul 2026-11-04 5:21/5:23 PM ET via Chief.
 */
export const POPUPS_ENABLED: boolean = false;

export const AGENCY_POPUP_CONFIG = {
  site: "agency",
  lane: "agency-web",
  endpoint: "/api/popup",
  privacyUrl: "/privacy",
  denyPaths: ["/contact", "/msa", "/betsy-ai"],
  theme: {
    band: "#0b1f3a",
    bandFg: "#ffffff",
    accent: "#f5b301",
    accentFg: "#111111",
    ink: "#0f172a",
  },
  logos: [{ src: "/brand/coriolis-wordmark-white.svg", alt: "Coriolis", h: 34 }],
  peek: {
    src: "/brand/popup-shop-floor.webp",
    caption: "Shop-floor chat, inside FFL Messenger",
  },
  copy: {
    badge: "Free for every licensed FFL",
    headline: "Licensed dealers only. Claim your FFL.",
    body: "Enter your FFL number and email. We match it to the ATF list so your shop shows up right across Coriolis sites.",
    button: "Claim my FFL",
    noFflLabel: "I don't have an FFL",
    noFflHeadline: "Get updates",
    noFflBody: "News from Coriolis on gun store websites, GunSearchEngine.com and FFL Messenger.",
    noFflButton: "Get updates",
    unlocks: [
      "Your GunSearchEngine.com seller listing",
      "FFL Messenger for your shop team",
      "Notes from Coriolis on getting your store found",
    ],
    listed: "Your shop is already listed on GunSearchEngine.com",
    consent: "By submitting you agree to get email from Coriolis. Unsubscribe anytime.",
    next: [
      { label: "See FFL Messenger", href: "https://www.fflmessenger.com/" },
      { label: "Search GunSearchEngine.com", href: "https://www.gunsearchengine.com/" },
    ],
    success: {
      body: "Check your inbox. If you're new here, confirm your email from the link we send.",
    },
  },
} as const;
