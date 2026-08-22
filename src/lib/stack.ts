import type { FaqItem } from "./faq";

export const STACK_TITLE =
  "How the Coriolis stack fits — store, search, demand | Coriolis";

export const STACK_META =
  "A gun store owns the website and the search on it. Brands buy category demand on the network. Coriolis does not replace the register or the 4473.";

export const STACK_EYEBROW = "Stack";

export const STACK_H1 = "Two maps. One store. One market.";

export const STACK_LEDE = [
  "A gun store should own its website and see what people typed on it. A brand should see what the category asked for, without buying a shopper list. Those are different jobs. They share a map. They are not one product.",
  "Coriolis builds the store. GunSearchAgent sits on that store and writes down the searches, including the ones that came back empty. Demand Intelligence is the category read of that same search, sold to brands. The register and the 4473 stay where they are.",
] as const;

export const STACK_ADVANTAGE = [
  {
    head: "The store is yours.",
    body: "WooCommerce on your domain. GunSearchAgent on that site. You leave with both.",
  },
  {
    head: "Search, not bounce.",
    body: "The useful number is what they typed, including the model you did not have. Bounce rate does not tell you that.",
  },
  {
    head: "Not the register. Not the 4473.",
    body: "We do not run the counter, fill a Form 4473, or write the bound book. Those stay with the systems licensed for them.",
  },
  {
    head: "Brands buy the network, not your customers.",
    body: "Demand Intelligence is anonymized search across the stores on the map. It is not a shopper CRM and it does not sell your customer list.",
  },
] as const;

export const STACK_GRAPH_A_CAPTION =
  "The product map is the aisle. A Seller is the shop that listed the gun. It is not the company file.";

export const STACK_GRAPH_B_CAPTION =
  "The company map is the account. Company is not Seller. One company can own a store. That store can list as a Seller on the product map.";

export const STACK_JOIN =
  "The join is the point. Search on a store you own becomes demand a brand can buy. Your customers do not go with it.";

export const STACK_FOOTER =
  "Not affiliated with Gearfire or RetailBI. Not 4473 software. Not a register.";

export const STACK_FAQ: FaqItem[] = [
  {
    q: "Is this a new product?",
    a: "No. It is the picture of the two you already sell. The store is FFL Ecommerce. The category read is Demand Intelligence.",
  },
  {
    q: "Does the brand see my customers?",
    a: "No. They see anonymized search on the network. They do not get a shopper list.",
  },
  {
    q: "Do I have to give up my register?",
    a: "No. Keep the register you already run. This page is the website and the search on it.",
  },
  {
    q: "Is Coriolis the 4473?",
    a: "No.",
  },
];

export type StackNodeId =
  | "product"
  | "brand"
  | "seller"
  | "search"
  | "company"
  | "store"
  | "sensor";

export type StackNode = {
  id: StackNodeId;
  label: string;
  sentence: string;
  hub?: boolean;
  sublabel?: string;
  field: "a" | "b";
  x: string;
  y: string;
};

export type StackEdge = {
  from: StackNodeId;
  to: StackNodeId;
  label: string;
  sublabel?: string;
  join?: boolean;
};

export const STACK_NODES: StackNode[] = [
  {
    id: "product",
    label: "Product",
    sentence: "a live SKU on a store",
    hub: true,
    field: "a",
    x: "38%",
    y: "50%",
  },
  {
    id: "brand",
    label: "Brand",
    sentence: "who made it",
    field: "a",
    x: "20%",
    y: "20%",
  },
  {
    id: "seller",
    label: "Seller",
    sentence: "the FFL listing that SKU (the public shop, not the Coriolis account)",
    sublabel: "not the company file",
    field: "a",
    x: "80%",
    y: "26%",
  },
  {
    id: "search",
    label: "Search",
    sentence: "what someone typed on that store, including a miss",
    field: "a",
    x: "80%",
    y: "78%",
  },
  {
    id: "company",
    label: "Company",
    sentence: "the gun store or range on the plan",
    hub: true,
    sublabel: "not Seller",
    field: "b",
    x: "72%",
    y: "26%",
  },
  {
    id: "store",
    label: "Store",
    sentence: "the WooCommerce site they own",
    field: "b",
    x: "26%",
    y: "42%",
  },
  {
    id: "sensor",
    label: "GunSearchAgent",
    sentence: "GunSearchAgent on that site",
    field: "b",
    x: "26%",
    y: "78%",
  },
];

export const STACK_EDGES: StackEdge[] = [
  { from: "brand", to: "product", label: "manufactured by" },
  { from: "seller", to: "product", label: "listed by" },
  {
    from: "search",
    to: "product",
    label: "asked for",
    sublabel: "or asked and missed",
  },
  { from: "company", to: "store", label: "owns" },
  { from: "store", to: "sensor", label: "carries" },
  { from: "sensor", to: "search", label: "writes", join: true },
  { from: "store", to: "seller", label: "publishes", join: true },
];

export const STACK_NEIGHBORS: Record<StackNodeId, StackNodeId[]> = {
  product: ["brand", "seller", "search"],
  brand: ["product"],
  seller: ["product", "store"],
  search: ["product", "sensor"],
  company: ["store"],
  store: ["company", "sensor", "seller"],
  sensor: ["store", "search"],
};
