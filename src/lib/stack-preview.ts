export type PreviewNodeId = string;

export type PreviewNode = {
  id: PreviewNodeId;
  label: string;
  sentence: string;
  hub?: boolean;
  gold?: boolean;
  sublabel?: string;
  x: string;
  y: string;
};

export type PreviewEdge = {
  from: PreviewNodeId;
  to: PreviewNodeId;
  label: string;
  sublabel?: string;
  dotted?: boolean;
};

export type PreviewGraph = {
  id: string;
  aria: string;
  caption: string;
  title?: string;
  body?: string;
  nodes: PreviewNode[];
  edges: PreviewEdge[];
};

export function previewNeighbors(
  edges: PreviewEdge[],
): Record<PreviewNodeId, PreviewNodeId[]> {
  const map: Record<PreviewNodeId, PreviewNodeId[]> = {};
  for (const edge of edges) {
    map[edge.from] ??= [];
    map[edge.to] ??= [];
    if (!map[edge.from].includes(edge.to)) map[edge.from].push(edge.to);
    if (!map[edge.to].includes(edge.from)) map[edge.to].push(edge.from);
  }
  return map;
}

export const PREVIEW_TITLE = "Now store vs next store | Coriolis";

export const PREVIEW_META =
  "Current store stack and the next store stack. The store stays yours. The shopper card never hits Coriolis. Stripe is the hosting bill only.";

export const PREVIEW_EYEBROW = "Now / next";

export const PREVIEW_H1 = "Now store vs next store";

export const PREVIEW_LEDE =
  "Two pictures of the same shop. What you run today, and the store that comes next. You still own the site.";

export const PREVIEW_FACTS = [
  "The store is yours.",
  "The shopper card never hits Coriolis.",
  "Stripe is the hosting bill only.",
  "Aisle and account are two maps.",
  "We do not run the register or the 4473.",
] as const;

export const PREVIEW_NOW_HEAD = "NOW — the store you run today";

export const PREVIEW_NOW_LEDE =
  "Shopper to your Woo store. GSA is a doorbell on that store, not a warehouse. FFL Cockpit writes Woo. Distributors feed Cockpit. The office pays Stripe for hosting. Dotted lines are claim and host only.";

export const PREVIEW_NEXT_HEAD = "NEXT — three paths";

export const PREVIEW_NEXT_LEDE =
  "Three paths. The cart does not go through the office. Office Stripe is the hosting bill, not the shopper card.";

export const PREVIEW_NOW: PreviewGraph = {
  id: "now",
  aria: "Now store: shopper to Woo, GSA doorbell and FFL Checkout, FFL Cockpit, distributors, office Stripe hosting bill",
  caption:
    "GSA sits on the store as a doorbell. Stripe is the hosting bill. It is not on the cart.",
  nodes: [
    {
      id: "now-gsa",
      label: "GSA",
      sublabel: "doorbell, not a warehouse",
      sentence:
        "GunSearchAgent on the store. A doorbell that hears search. Not a warehouse.",
      x: "50%",
      y: "16%",
    },
    {
      id: "now-shopper",
      label: "Shopper",
      sentence: "They shop your Woo store. Their card stays on your site.",
      x: "16%",
      y: "40%",
    },
    {
      id: "now-woo",
      label: "Woo",
      sublabel: "your store",
      sentence: "Your Woo store on your domain. You own it.",
      hub: true,
      x: "42%",
      y: "42%",
    },
    {
      id: "now-checkout",
      label: "FFL Checkout",
      sentence: "On the store so a gun can go to a receiving FFL.",
      x: "80%",
      y: "24%",
    },
    {
      id: "now-cockpit",
      label: "FFL Cockpit",
      sentence: "Today it writes catalogs onto Woo.",
      x: "80%",
      y: "54%",
    },
    {
      id: "now-dist",
      label: "Distributors",
      sentence: "They feed Cockpit. Cockpit feeds Woo.",
      x: "80%",
      y: "82%",
    },
    {
      id: "now-office",
      label: "Coriolis",
      sublabel: "office",
      sentence: "The office. We host. We do not take the cart.",
      gold: true,
      x: "16%",
      y: "78%",
    },
    {
      id: "now-stripe",
      label: "Stripe",
      sublabel: "hosting bill, not the cart",
      sentence: "Stripe is the hosting bill only. Not the shopper card.",
      gold: true,
      x: "42%",
      y: "80%",
    },
  ],
  edges: [
    { from: "now-shopper", to: "now-woo", label: "shops" },
    { from: "now-woo", to: "now-gsa", label: "doorbell" },
    { from: "now-woo", to: "now-checkout", label: "on the store" },
    { from: "now-cockpit", to: "now-woo", label: "writes Woo" },
    { from: "now-dist", to: "now-cockpit", label: "feeds" },
    {
      from: "now-office",
      to: "now-stripe",
      label: "hosting bill",
      dotted: true,
    },
    {
      from: "now-office",
      to: "now-woo",
      label: "claim / host",
      dotted: true,
    },
  ],
};

export const PREVIEW_NEXT_CART: PreviewGraph = {
  id: "next-cart",
  title: "1. Cart",
  body: "Shopper → Woo → checkout helper (receiving-FFL rules only) → dealer card gateway → Woo Order, or a failed payment on Woo.",
  aria: "Cart path: shopper to Woo to checkout helper to dealer card gateway to Woo Order or failed payment on Woo",
  caption: "The dealer card gateway is yours. It is not our Stripe.",
  nodes: [
    {
      id: "cart-shopper",
      label: "Shopper",
      sentence: "They check out on your Woo store.",
      x: "14%",
      y: "50%",
    },
    {
      id: "cart-woo",
      label: "Woo",
      sentence: "The cart lives here. The store is yours.",
      hub: true,
      x: "36%",
      y: "50%",
    },
    {
      id: "cart-helper",
      label: "Helper",
      sublabel: "receiving-FFL rules",
      sentence: "Checkout helper. Receiving-FFL rules only. Not the register.",
      x: "58%",
      y: "50%",
    },
    {
      id: "cart-gateway",
      label: "Dealer card",
      sublabel: "your gateway, not ours",
      sentence:
        "Your dealer card gateway. Not Coriolis. Not our Stripe. We do not take the card.",
      x: "84%",
      y: "22%",
    },
    {
      id: "cart-order",
      label: "Woo Order",
      sentence: "The card clears. Woo keeps the Order.",
      x: "84%",
      y: "50%",
    },
    {
      id: "cart-fail",
      label: "Failed on Woo",
      sentence: "A failed payment stays on Woo.",
      x: "84%",
      y: "78%",
    },
  ],
  edges: [
    { from: "cart-shopper", to: "cart-woo", label: "cart" },
    { from: "cart-woo", to: "cart-helper", label: "rules only" },
    {
      from: "cart-helper",
      to: "cart-gateway",
      label: "not our Stripe",
    },
    { from: "cart-gateway", to: "cart-order", label: "clears" },
    { from: "cart-gateway", to: "cart-fail", label: "fails on Woo" },
  ],
};

export const PREVIEW_NEXT_TICKET: PreviewGraph = {
  id: "next-ticket",
  title: "2. After the order",
  body: "Woo Order → order ticket → catalog warehouse → distributor. Not a charge. Not Stripe.",
  aria: "After the order: Woo Order to order ticket to catalog warehouse to distributor",
  caption: "The ticket is not a charge. Stripe is not on this path.",
  nodes: [
    {
      id: "ticket-order",
      label: "Woo Order",
      sentence: "The Order already exists on your store.",
      hub: true,
      x: "16%",
      y: "50%",
    },
    {
      id: "ticket-ticket",
      label: "Order ticket",
      sublabel: "not a charge",
      sentence: "An order ticket. Not a charge. Not Stripe.",
      x: "40%",
      y: "50%",
    },
    {
      id: "ticket-wh",
      label: "Warehouse",
      sublabel: "catalog",
      sentence: "The catalog warehouse reads the ticket. Still not a charge.",
      x: "64%",
      y: "50%",
    },
    {
      id: "ticket-dist",
      label: "Distributor",
      sentence: "They fill from the ticket. Still not Stripe.",
      x: "88%",
      y: "50%",
    },
  ],
  edges: [
    { from: "ticket-order", to: "ticket-ticket", label: "not a charge" },
    { from: "ticket-ticket", to: "ticket-wh", label: "ticket" },
    { from: "ticket-wh", to: "ticket-dist", label: "fill" },
  ],
};

export const PREVIEW_NEXT_OFFICE: PreviewGraph = {
  id: "next-office",
  title: "3. Office",
  body: "Coriolis → Stripe hosting bill. Dotted claim and seed to Woo. Warehouse → a person publishes SKUs to Woo.",
  aria: "Office path: Coriolis to Stripe hosting bill, dotted claim to Woo, warehouse human publish to Woo",
  caption: "Hosting bill on Stripe. Claim and seed are dotted. A person publishes to Woo.",
  nodes: [
    {
      id: "office-coriolis",
      label: "Coriolis",
      sentence: "The office. Hosting and claim. Not the cart.",
      hub: true,
      gold: true,
      x: "22%",
      y: "28%",
    },
    {
      id: "office-stripe",
      label: "Stripe",
      sublabel: "hosting bill",
      sentence: "Stripe is the hosting bill only.",
      gold: true,
      x: "78%",
      y: "28%",
    },
    {
      id: "office-wh",
      label: "Warehouse",
      sentence: "A person publishes SKUs onto Woo. Not a charge.",
      x: "22%",
      y: "74%",
    },
    {
      id: "office-woo",
      label: "Woo",
      sublabel: "your store",
      sentence: "Claim and seed with a dotted line. The store stays yours.",
      hub: true,
      x: "78%",
      y: "74%",
    },
  ],
  edges: [
    {
      from: "office-coriolis",
      to: "office-stripe",
      label: "hosting bill",
    },
    {
      from: "office-coriolis",
      to: "office-woo",
      label: "claim / seed",
      dotted: true,
    },
    {
      from: "office-wh",
      to: "office-woo",
      label: "human publish",
    },
  ],
};

export const PREVIEW_NEXT = [
  PREVIEW_NEXT_CART,
  PREVIEW_NEXT_TICKET,
  PREVIEW_NEXT_OFFICE,
] as const;

export const PREVIEW_GRAPHS = [PREVIEW_NOW, ...PREVIEW_NEXT];
