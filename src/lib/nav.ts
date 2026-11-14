export type NavChild = {
  href: string;
  label: string;
};

export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
  children?: readonly NavChild[];
};

export const MAIN_NAV: readonly NavItem[] = [
  { href: "ecommerce", label: "FFL Ecommerce" },
  { href: "firearms-dropshipping", label: "FFL Dropshipping" },
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
  { href: "ffl-filters", label: "FFL Filters" },
  { href: "https://gunsearchengine.com/for-dealers", label: "GunSearchEngine.com", external: true },
  { href: "press", label: "News" },
];
