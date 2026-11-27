export type NavChild = {
  href: string;
  label: string;
  external?: boolean;
};

export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
  /** CA-HEADER-NAV-CTA: render as the yellow primary CTA button instead of a pill. */
  cta?: boolean;
  children?: readonly NavChild[];
};

export const MAIN_NAV: readonly NavItem[] = [
  // CA-FFL-SOVEREIGNTY (Paul 2026-11-16 8:30 PM ET via Chief): FFL Ecommerce is a
  // dropdown. Child URLs are existing pages: /ecommerce, /ffl-sovereignty,
  // /case-studies, /ecommerce#plans (Hosting Plans), and https://fflaccelerator.com
  // (the FFL Accelerator offer site).
  {
    href: "ecommerce",
    label: "FFL Ecommerce",
    children: [
      { href: "ecommerce", label: "FFL Ecommerce" },
      { href: "ffl-sovereignty", label: "FFL Sovereignty" },
      { href: "case-studies", label: "Case Studies" },
      { href: "ecommerce#plans", label: "Hosting Plans" },
      { href: "https://fflaccelerator.com", label: "FFL Accelerator", external: true },
    ],
  },
  // CA-NAV-DROPSHIP-DROPDOWN (Paul 2026-11-17 12:52 PM ET via Chief): FFL
  // Dropshipping is a dropdown. The first child keeps the existing
  // firearms-dropshipping href. The second child is FFL Cockpit.
  {
    href: "firearms-dropshipping",
    label: "FFL Dropshipping",
    children: [
      { href: "firearms-dropshipping", label: "FFL Dropshipping" },
      { href: "ffl-cockpit", label: "FFL Cockpit" },
    ],
  },
  // CA-HEADER-NAV-CTA (Paul 2026-11-27 5:50 PM ET via Chief 5:51): the plugins
  // dropdown (and its link under FFL Ecommerce) and the news item left the header.
  // Both live in SiteChrome's footer links now.
  {
    href: "gun-store-pos",
    label: "Gun Store POS",
    children: [
      { href: "aim-pos", label: "WooCommerce for AIM" },
      { href: "rapid-gun-systems-pos", label: "WooCommerce for Rapid" },
      { href: "microbiz-pos", label: "WooCommerce for MicroBiz" },
      { href: "trident-1-pos", label: "WooCommerce for Trident 1" },
    ],
  },
  // CA-WEBSITE-PLANS-PAGE (Paul 2026-11-27 4:56 PM ET via Chief 4:57): the old third-party header item is swapped for
  // Website Plans (/website-plans, same tab). The footer family links stay (D-N3/D-N4).
  // CA-HEADER-NAV-CTA: Website Plans is the yellow primary CTA (cta: true).
  { href: "website-plans", label: "Website Plans", cta: true },
];
