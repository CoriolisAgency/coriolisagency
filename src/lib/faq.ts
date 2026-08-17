export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ECOMMERCE: FaqItem[] = [
  {
    q: "What is included in every monthly plan?",
    a: "Minute Man is the base: a custom WooCommerce site on your domain with unlimited hosting, storage, bandwidth, products, and orders, plus 24×7 uptime monitoring. Every higher plan includes everything below it.",
  },
  {
    q: "Do I buy the monthly plan online?",
    a: "Monthly hosting is onboarded by Coriolis — talk to us and we stand the site up. One-time Basic ($500) and Retail ($2,500) setup packages can be purchased on checkout.coriolisagency.com.",
  },
  {
    q: "What is FFL Accelerator?",
    a: "FFL Accelerator is Coriolis’s managed WooCommerce program for FFLs ($569/mo). It includes GunSearchAgent Pro (Betsy on the dealer site). The site is yours. Betsy on it is included. That feed is what OEMs buy as Demand Intelligence.",
  },
  {
    q: "Do you replace my bound book or run NICS?",
    a: "No. Coriolis is not 4473 software, not a NICS system, and not a bound-book replacement. Ecommerce workflows are designed to coexist with electronic bound books and licensed retailers.",
  },
];

export const FAQ_DI: FaqItem[] = [
  {
    q: "Is this a RetailBI replacement?",
    a: "No. RetailBI’s intelligence is a byproduct of retail operations software. Betsy’s intelligence is a byproduct of online and in-store product discovery.",
  },
  {
    q: "Do I only see my brand and three competitors?",
    a: "No. Every plan includes full-market anonymized demand — the whole category, not a four-brand sandbox. Optional brand pins highlight your labels; they do not hide the rest of the market.",
  },
  {
    q: "How do Insight, Growth, and Platform differ?",
    a: "Insight is full-market demand signals for up to 30 days. Growth adds 60-day lookback, privacy-safe sessions, and CSV. Platform is unlimited lookback, JSON and CSV, Enterprise Co-Pilot, and warehouse inventory search when a feed is linked.",
  },
  {
    q: "How do team seats work?",
    a: "Every plan includes 1 free Client Admin seat. Additional named users are $49 per user per month. Purchase additional seats through Coriolis during onboarding or expansion.",
  },
];
