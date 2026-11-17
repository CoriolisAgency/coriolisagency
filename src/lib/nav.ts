export type NavChild = {
  href: string;
  label: string;
  external?: boolean;
};

export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
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
      { href: "ffl-filters", label: "FFL Plugins" },
    ],
  },
  { href: "firearms-dropshipping", label: "FFL Dropshipping" },
  // CA-NAV-FFL-PLUGINS (Paul 2026-11-17 12:41 PM ET via Chief): FFL Plugins is a
  // dropdown. FFL Filters moves here from a top-level item. FFL Firewall returns
  // inside this dropdown (#194 had removed it). The parent and the FFL Ecommerce
  // > FFL Plugins item point at ffl-filters until Paul names a hub.
  {
    href: "ffl-filters",
    label: "FFL Plugins",
    children: [
      { href: "ffl-filters", label: "FFL Filters" },
      { href: "ffl-firewall", label: "FFL Firewall" },
    ],
  },
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
  { href: "https://gunsearchengine.com/for-dealers", label: "GunSearchEngine.com", external: true },
  { href: "press", label: "News" },
];
