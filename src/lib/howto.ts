import { SWITCH_STEPS } from "./switch";

export type HowToStep = {
  name: string;
  text: string;
};

export function howToJsonLd(input: {
  name: string;
  description: string;
  steps: readonly HowToStep[] | readonly string[];
}): Record<string, unknown> {
  const steps = input.steps.map((step, i) => {
    if (typeof step === "string") {
      return {
        "@type": "HowToStep",
        position: i + 1,
        name: `Step ${i + 1}`,
        text: step,
      };
    }
    return {
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    };
  });

  return {
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    step: steps,
  };
}

export const HOWTO_SWITCH = howToJsonLd({
  name: "Switch from a template FFL website without downtime",
  description:
    "Keep your domain. Coriolis stands up WooCommerce before you give notice, then you cut DNS. You leave with the site.",
  steps: SWITCH_STEPS,
});

export const HOWTO_DROPSHIP = howToJsonLd({
  name: "How firearms dropshipping runs on WooCommerce and FFL Cockpit",
  description:
    "A licensed FFL lists distributor catalogs on a WooCommerce store they own. Serialized firearms ship FFL-to-FFL. This is not legal advice.",
  steps: [
    {
      name: "List the catalog",
      text: "FFL Cockpit streams distributor inventory and pricing onto your WooCommerce store. MAP holds. Availability updates on a short cycle.",
    },
    {
      name: "The customer checks out",
      text: "Serialized firearms go through FFL Checkout. The buyer picks a receiving dealer. Accessories and ammo follow destination rules.",
    },
    {
      name: "The distributor ships",
      text: "Orders route to the lowest-cost or fastest vendor. You never have to stock that SKU. You can still sell what you keep on the shelf.",
    },
  ],
});

export const HOWTO_WOO_SELL_GUNS = howToJsonLd({
  name: "How an FFL sells firearms on WooCommerce",
  description:
    "WooCommerce can sell guns when a licensed FFL owns the store and checkout is built for dealer transfer. Coriolis hosts that store. This is not legal advice.",
  steps: [
    {
      name: "Own the storefront",
      text: "Coriolis builds WooCommerce on your domain. Minute Man starts at $169 a month. Setup is $500 or $2,500.",
    },
    {
      name: "Wire FFL checkout and catalogs",
      text: "Militia and above include FFL Cockpit and FFL Checkout. Serialized firearms ship to a receiving FFL. You can also sell what you stock.",
    },
    {
      name: "Keep the register you already run",
      text: "Warlord and FFL Accelerator connect AIM, MicroBiz, Rapid Gun Systems, Trident 1, and Corestore. Coriolis does not run 4473, NICS, or the bound book.",
    },
  ],
});
