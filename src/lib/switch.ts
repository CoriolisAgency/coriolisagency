/** Switch-off-a-rented-storefront checklist. Copy; do not rewrite. */
export const SWITCH_STEPS = [
  "Keep your domain. We stand up Woo on it before you give notice.",
  "Map the catalog (own stock, Cockpit feeds, or both) and redirect the URLs that already rank.",
  "Wire FFL Checkout, payments, and taxes. Test a mixed cart.",
  "Connect the register only if you want the floor and the site in sync (Warlord and Accelerator).",
  "Cut DNS. You leave with the site.",
] as const;

/**
 * Same five steps, worded without plan-tier names, for /orchid-alternative
 * (S4 guardrail: no Warlord mention on the Orchid page).
 */
export const SWITCH_STEPS_NEUTRAL = [
  SWITCH_STEPS[0],
  SWITCH_STEPS[1],
  SWITCH_STEPS[2],
  "Connect the register only if you want the floor and the site in sync (plans with POS integration, including FFL Accelerator).",
  SWITCH_STEPS[4],
] as const;

export const SWITCH_FOUNDER =
  "Coriolis was founded by the person who ran AmmoReady for nine years.";
