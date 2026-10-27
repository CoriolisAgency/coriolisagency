/** Inline window.CORIOLIS_POPUP for the agency site. Copy is from the shared SPEC. */

export const AGENCY_POPUP_CONFIG = {
  site: "agency",
  lane: "agency-web",
  endpoint: "/api/popup",
  privacyUrl: "/privacy",
  denyPaths: ["/contact", "/msa", "/betsy-ai"],
  copy: {
    eyebrow: "Coriolis, LLC",
    headline: "Need a gun store website that sells?",
    body: "We build and host WooCommerce sites for FFLs. Get our notes on websites, hosting and getting found. One email at a time.",
    button: "Send me the notes",
    consent:
      "By signing up you agree to get email from Coriolis. Unsubscribe anytime. Privacy policy.",
    success: {
      headline: "You're in. Check your inbox.",
      body: "If you asked to confirm, click the link we just sent.",
    },
  },
  fields: [{ name: "company", label: "Store name (optional)", type: "text" }],
} as const;
