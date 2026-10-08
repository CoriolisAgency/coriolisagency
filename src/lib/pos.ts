import { LINKS } from "./links";

export type PosPage = {
  slug: string;
  path: string;
  name: string;
  title: string;
  description: string;
  lede: string;
  keepRegister: string;
  extra: string;
  vendorHref?: string;
};

export const POS_PAGES: PosPage[] = [
  {
    slug: "aim-pos",
    path: "/aim-pos",
    name: "AIM POS",
    title: "AIM POS + WooCommerce — keep your register | Coriolis",
    description:
      "Keep AIM POS. Coriolis builds the WooCommerce website that talks to it. Warlord and FFL Accelerator connect the register you already run.",
    lede:
      "AIM POS is the register. Coriolis builds the WooCommerce website. Keep AIM. We replace the rented storefront, not the counter.",
    keepRegister:
      "Warlord ($469/mo) and FFL Accelerator ($569/mo) include API-based AIM POS integration so the floor and the site stay in sync. Unlimited API requests and webhooks. Coriolis does not file a 4473, run NICS, or replace the bound book. AIM POS is the register.",
    extra:
      "Coriolis announced its AIM POS partnership in April 2026. A September 2026 press release named five FFL retailers and ranges on AIM POS + owned WooCommerce: Naples Gun Shop, Down Range Chico, Lawful Defense, 2A Firearms, and The Range in McKinney. Each of those named shops is on FFL Accelerator.",
    vendorHref: LINKS.aimPos,
  },
  {
    slug: "gunbiz-pos",
    path: "/gunbiz-pos",
    name: "GunBiz POS",
    title: "GunBiz POS + WooCommerce — keep your register | Coriolis",
    description:
      "Keep GunBiz POS. Coriolis builds the WooCommerce website that talks to it. Warlord and FFL Accelerator connect the register you already run.",
    lede:
      "GunBiz is the register. Coriolis builds the WooCommerce website. Keep GunBiz. We replace the rented storefront, not the counter.",
    keepRegister:
      "Warlord ($469/mo) and FFL Accelerator ($569/mo) include API-based GunBiz POS integration so the floor and the site stay in sync. Unlimited API requests and webhooks. Coriolis does not file a 4473, run NICS, or replace the bound book.",
    extra:
      "GunBiz was formerly MicroBiz. GunBiz has a fully developed, tested and supported WooCommerce integration, and it uses FastBound. We keep GunBiz on the counter and put WooCommerce on your domain.",
    vendorHref: LINKS.gunbizPos,
  },
  {
    slug: "trident-1-pos",
    path: "/trident-1-pos",
    name: "Trident 1 POS",
    title: "Trident 1 POS + WooCommerce — keep your register | Coriolis",
    description:
      "Keep Trident 1 POS. Coriolis builds the WooCommerce website that talks to it. Warlord and FFL Accelerator connect the register you already run.",
    lede:
      "Trident 1 is the register. Coriolis builds the WooCommerce website. Keep Trident 1. We replace the rented storefront, not the counter.",
    keepRegister:
      "Warlord ($469/mo) and FFL Accelerator ($569/mo) include API-based Trident 1 POS integration so the floor and the site stay in sync. Unlimited API requests and webhooks. Coriolis does not file a 4473, run NICS, or replace the bound book.",
    extra:
      "Same job: a store you own in front of the register you already run.",
  },
  {
    slug: "rapid-gun-systems-pos",
    path: "/rapid-gun-systems-pos",
    name: "Rapid Gun Systems",
    title: "Rapid Gun Systems + WooCommerce — keep your register | Coriolis",
    description:
      "Keep Rapid Gun Systems. Coriolis builds the WooCommerce website that talks to it. Warlord and FFL Accelerator connect the register you already run.",
    lede:
      "Rapid Gun Systems is the register. Coriolis builds the WooCommerce website. Keep Rapid. We replace the rented storefront, not the counter.",
    keepRegister:
      "Warlord ($469/mo) and FFL Accelerator ($569/mo) include API-based Rapid Gun Systems integration so the floor and the site stay in sync. Unlimited API requests and webhooks. Coriolis does not file a 4473, run NICS, or replace the bound book.",
    extra:
      "Same keep-your-register message as AIM, GunBiz, and Trident 1.",
  },
];

export function posBySlug(slug: string): PosPage | undefined {
  return POS_PAGES.find((page) => page.slug === slug);
}

export const FAQ_POS = [
  {
    q: "Do I have to throw out my register?",
    a: "No. Bring the register you already run. Warlord and FFL Accelerator connect AIM, GunBiz, Trident 1, and Rapid Gun Systems.",
  },
  {
    q: "Does Coriolis replace 4473 or the bound book?",
    a: "No. Coriolis is not 4473 software, not a NICS system, and not a bound-book replacement. Those stay with the systems licensed for them. This is not legal advice.",
  },
  {
    q: "What website sits in front of the register?",
    a: "WooCommerce on your domain. Militia and above add FFL Cockpit distributor catalogs and FFL Checkout. The plan we put dealers on is FFL Accelerator at $569 a month.",
  },
] as const;
