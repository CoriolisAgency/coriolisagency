/**
 * FFL Cockpit (g-FFL Cockpit) release notes.
 * Notes are copied from the WordPress.org developers tab.
 * Per-version dates are not on that tab. Tagged dates come from
 * plugins.trac.wordpress.org tagging-version commits (via CockBot).
 * Do not invent dates or notes. Do not skip extract versions.
 */
export const FFL_COCKPIT_PLUGIN = {
  publicName: "FFL Cockpit",
  wpTitle: "g-FFL Cockpit",
  slug: "g-ffl-cockpit",
  currentVersion: "2.0.32",
  added: "2023-05-13",
  lastUpdated: "2026-09-02 6:46pm GMT (2:46pm ET)",
  developersUrl: "https://wordpress.org/plugins/g-ffl-cockpit/#developers",
} as const;

export type CockpitRelease = {
  version: string;
  /** Sourced tag timestamp, or null when the extract says date not sourced. */
  tagged: string | null;
  note: string;
};

export const FFL_COCKPIT_CHANGELOG: readonly CockpitRelease[] = [
  {
    version: "2.0.32",
    tagged: "2026-09-02 18:46 GMT (2:46pm ET)",
    note: "Added AI Product Search Capability",
  },
  {
    version: "2.0.31",
    tagged: "2026-08-25 00:57 GMT (8:57pm ET 8/24)",
    note: "Added more flexibility to MAP brand selection, include or exclude",
  },
  {
    version: "2.0.30",
    tagged: "2026-08-05 21:21 GMT (5:21pm ET)",
    note: "Added Bullet Blaster Target",
  },
  {
    version: "2.0.28",
    tagged: "2026-07-24 14:21 GMT (10:21am ET)",
    note: "Front-end product UPC codes are now clickable for admin users to bring up the FFL Cockpit product search. Also Orders in FFL Cockpit product search will display partial success statuses.",
  },
  {
    version: "2.0.27",
    tagged: "2026-07-17 15:21 GMT (11:21am ET)",
    note: "CrowdSourced Fraud Reporting",
  },
  {
    version: "2.0.26",
    tagged: "2026-07-02 22:39 GMT (6:39pm ET)",
    note: "Product Export/Server Status Fixes",
  },
  {
    version: "2.0.24",
    tagged: "2026-06-12 22:20 GMT (6:20pm ET)",
    note: "Add to Cart Updates",
  },
  {
    version: "2.0.23",
    tagged: "2026-06-06 18:32 GMT (2:32pm ET)",
    note: "Logo Updates, SKU Conflict Cleanup Changes",
  },
  {
    version: "2.0.21",
    tagged: "2026-05-26 01:33 GMT (9:33pm ET 5/25)",
    note: "WordPress 7.0 bump and Guns.com support",
  },
  {
    version: "2.0.19",
    tagged: "2026-05-19 04:10 GMT (12:10am ET)",
    note: "Product Analytics Tagging",
  },
  {
    version: "2.0.18",
    tagged: "2026-05-17 14:54 GMT (10:54am ET)",
    note: "Further optimized media removal on product deletes and onsite update processes",
  },
  {
    version: "2.0.15",
    tagged: "2026-05-13 19:04 GMT (3:04pm ET)",
    note: "Aded BulletScout support",
  },
  {
    version: "2.0.14",
    tagged: "2026-05-11 21:13 GMT (5:13pm ET)",
    note: "POS Fuflillment options and removal of deprecated code for PHP 8.4",
  },
  {
    version: "2.0.13",
    tagged: "2026-04-08 00:00 GMT (8:00pm ET 4/7)",
    note: "Added Wishlist Functionality to Product Search",
  },
  {
    version: "2.0.12",
    tagged: "2026-04-02 20:16 GMT (4:16pm ET)",
    note: "Earn AI Tokens by Categorizing products",
  },
  {
    version: "2.0.11",
    tagged: "2026-03-27 04:35 GMT (12:35am ET)",
    note: "Bug fix for ordering TGD items, handling underscores in skus",
  },
  {
    version: "2.0.10",
    tagged: "2026-03-25 15:04 GMT (11:04am ET)",
    note: "Added support for Email-based fulfillment orders (TGD)",
  },
  {
    version: "2.0.9",
    tagged: "2026-03-19 23:16 GMT (7:16pm ET)",
    note: "Import Out of Stock by UPC UI added to WooCommerce Product Restrictions",
  },
  {
    version: "2.0.7",
    tagged: "2026-03-18 20:30 GMT (4:30pm ET)",
    note: "Davidsons Fulfillment (Ship-to-Store) and Help Documentation Improvements",
  },
  {
    version: "2.0.6",
    tagged: "2026-03-15 19:48 GMT (3:48pm ET)",
    note: "Site Health Dashboard Updates",
  },
  {
    version: "2.0.5",
    tagged: "2026-03-11 00:26 GMT (8:26pm ET 3/10)",
    note: "Product Analytics Updates and DudeDeals Beta",
  },
  {
    version: "2.0.4",
    tagged: "2026-03-08 20:30 GMT (4:30pm ET)",
    note: "Product Analytics Updates",
  },
  {
    version: "2.0.2",
    tagged: "2026-03-05 22:45 GMT (5:45pm ET)",
    note: "Help Desk GARI, Analytics dashboard",
  },
  {
    version: "1.9.2",
    tagged: "2026-01-29 21:06 GMT (4:06pm ET)",
    note: "Product Inventory and pricing history, up fron product restriction change validation",
  },
  {
    version: "1.9.1",
    tagged: "2026-01-13 19:19 GMT (2:19pm ET)",
    note: "Bug fixes for in-search ordering feature",
  },
  {
    version: "1.9.0",
    tagged: "2026-01-02 18:53 GMT (1:53pm ET)",
    note: "Vast improvement in Mobile Support, Improved Product Search, Direct Ordering via Product Search",
  },
  {
    version: "1.8.3",
    tagged: "2025-12-19 16:58 GMT (11:58am ET)",
    note: "Allows users to access only the Product Search View",
  },
  {
    version: "1.8.1",
    tagged: "2025-12-08 20:53 GMT (3:53pm ET)",
    note: "Endpoint Security, Performance and Mobile Compatability Improvement",
  },
  {
    version: "1.7.1",
    tagged: null,
    note: "Added Draft and Private products to Onsite Export, Update Term Counts endpoint, and User Tracking for Config Changes",
  },
  {
    version: "1.7.0",
    tagged: null,
    note: "Improved on-site Processing for prouct updates, and added server status endpoint",
  },
  {
    version: "1.6.2",
    tagged: null,
    note: "Bug Fixes and Minor Tweaks",
  },
  {
    version: "1.6.1",
    tagged: null,
    note: "Back in Stock Alerts and Quick UPC links on Product Search Tab",
  },
  {
    version: "1.6.0",
    tagged: null,
    note: "All new Product Restrictions",
  },
  {
    version: "1.5.4",
    tagged: null,
    note: "Activated SEO meta fields for AI enhanced listings",
  },
  {
    version: "1.5.2",
    tagged: null,
    note: "New AI Product Info, also new Configurable WooCommerce Shipping Classes and Gunbroker Shipping Profiles",
  },
  {
    version: "1.4.39",
    tagged: null,
    note: "Added AmmoBuy",
  },
  {
    version: "1.4.38",
    tagged: null,
    note: "Bug Fix, was too aggressive at hiding admin notices",
  },
  {
    version: "1.4.37",
    tagged: null,
    note: "Added AmmoHunter and made provisions for related videos section in product pages",
  },
  {
    version: "1.4.36",
    tagged: null,
    note: "Product Search UPC dashboard panel",
  },
  {
    version: "1.4.35",
    tagged: null,
    note: "Optimized fulfillment options retrieval to avoid timeouts by eliminating callbacks to the site for order data",
  },
  {
    version: "1.4.34",
    tagged: null,
    note: "Minor updates and support for CaliberKing feeds",
  },
  {
    version: "1.4.33",
    tagged: null,
    note: "Confirm target feed URL’s exist before showing them in the configuration panels",
  },
  {
    version: "1.4.32",
    tagged: null,
    note: "Added GunMade support in Targets, and made the key setting form more robust to prevent users from accidentally resetting it",
  },
  {
    version: "1.4.31",
    tagged: null,
    note: "Added GunAmmo.deals and AmmoBrowser support in Targets",
  },
  {
    version: "1.4.30",
    tagged: null,
    note: "Rearranged configuration tab and fixed bug with attribute loading via onsite queue updater",
  },
  {
    version: "1.4.29",
    tagged: null,
    note: "More Bug fixes and performance enhancements",
  },
  {
    version: "1.4.28",
    tagged: null,
    note: "Bug fixes and performance enhancements",
  },
  {
    version: "1.4.26",
    tagged: null,
    note: "Minor styling bug with distributor and targets cards appearing as a single column",
  },
  {
    version: "1.4.25",
    tagged: null,
    note: "Distributor is now an option for custom margin groups, and also added ability to duplicate margin groups",
  },
  {
    version: "1.4.24",
    tagged: null,
    note: "Added Site Performance Score",
  },
  {
    version: "1.4.23",
    tagged: null,
    note: "Minor cosmetic bug fix only affecting fresh installs",
  },
  {
    version: "1.4.22",
    tagged: null,
    note: "Added a Quick Filter for Drop Ship Restricted brands in the Brand selectors",
  },
  {
    version: "1.4.21",
    tagged: null,
    note: "Added Distributor Validation Indicator",
  },
  {
    version: "1.4.20",
    tagged: null,
    note: "Minor bug fixes for custom margin groups and tiered pricing, also embedded product restrictions video",
  },
  {
    version: "1.4.19",
    tagged: null,
    note: "Minor bug fix to URL encode search terms for Product Search Tab",
  },
  {
    version: "1.4.18",
    tagged: null,
    note: "Further improvement of Product Search Tab, adding ability to recategorize product",
  },
  {
    version: "1.4.17",
    tagged: null,
    note: "Further improvement of Product Search Tab",
  },
  {
    version: "1.4.16",
    tagged: null,
    note: "Updated product feed tab to add more info, search on more items, and be more mobile friendly",
  },
  {
    version: "1.4.15",
    tagged: null,
    note: "Added new Target capability (Armsagora), plus added in Feed URLs",
  },
  {
    version: "1.4.14",
    tagged: null,
    note: "Added new Target capability",
  },
  {
    version: "1.4.13",
    tagged: null,
    note: "Minor bug resolved with default toggle setting",
  },
  {
    version: "1.4.11",
    tagged: null,
    note: "Update Product Catalog Extract to Run and Email Extract, eliminating time-outs",
  },
  {
    version: "1.4.10",
    tagged: null,
    note: "Added parent category to recategorization list in admin panel",
  },
  {
    version: "1.4.9",
    tagged: null,
    note: "Added the ability to filter categories in the admin recategorization panel",
  },
  {
    version: "1.4.8",
    tagged: null,
    note: "Reformatted Fulfillment Options table to help improve manual ordering processes and show a more complete status of the fulfillment",
  },
  {
    version: "1.4.7",
    tagged: null,
    note: "Bug fix for modal popup on product feed tab.",
  },
  {
    version: "1.4.6",
    tagged: null,
    note: "Added ability to adjust logic (AND/OR) on Product Restriction Includes.",
  },
  {
    version: "1.4.5",
    tagged: null,
    note: "Modal popup bug fixes",
  },
  {
    version: "1.4.4",
    tagged: null,
    note: "Fixed compatibility issues with modal styling and also changed the product feed tab to require input before initial loading",
  },
  {
    version: "1.4.3",
    tagged: null,
    note: "Added more help notes and distinguished distributors that are product feed only",
  },
  {
    version: "1.4.1",
    tagged: null,
    note: "Changes for initial view when customer has no key, and also fixed a modal Bug.",
  },
  {
    version: "1.4.0",
    tagged: null,
    note: "Fancy new user interface, which is hopefully a much better experience.",
  },
  {
    version: "1.3.11",
    tagged: null,
    note: "Added configuration validator to Configuration Tab",
  },
  {
    version: "1.3.10",
    tagged: null,
    note: "Bug Fix for Fulfillment History Download button",
  },
  {
    version: "1.3.9",
    tagged: null,
    note: "More Minor Cosmetic changes on Product Feed, added MAP in table",
  },
  {
    version: "1.3.8",
    tagged: null,
    note: "Minor Cosmetic changes on Product Feed",
  },
  {
    version: "1.3.7",
    tagged: null,
    note: "Fixed minor formatting issue (repeating table header) on Distributor order details view",
  },
  {
    version: "1.3.6",
    tagged: null,
    note: "Distributor Orders Listed on the WooCommerce Order Details view, now show SKU’s/UPC’s and the PO associated to the order",
  },
  {
    version: "1.3.4",
    tagged: null,
    note: "Minor updates to support adding additional distributors, plus changed message on product admin panel",
  },
  {
    version: "1.3.3",
    tagged: null,
    note: "Ship-to-Store Beta, Recategorization of Products on Admin Tab in product view, Gunbroker Order reprocessing capability, Dynamic Schema Loading",
  },
  {
    version: "1.2.24",
    tagged: null,
    note: "Update to support product attribute restrictions",
  },
  {
    version: "1.2.23",
    tagged: null,
    note: "Schema validation updates",
  },
  {
    version: "1.2.22",
    tagged: null,
    note: "Schema validation updates, to allow for negative percentage price adjustments",
  },
  {
    version: "1.2.21",
    tagged: null,
    note: "Added a button to send test emails, for refining customer notifications",
  },
  {
    version: "1.2.20",
    tagged: null,
    note: "Bug fixes for the last change, so user can set key properly",
  },
  {
    version: "1.2.19",
    tagged: null,
    note: "Firefox Bug Resolved, you can now save your config in Firefox",
  },
  {
    version: "1.2.18",
    tagged: null,
    note: "New configuration items for update_batch_count and automated_fulfillment in Woo Target",
  },
  {
    version: "1.2.17",
    tagged: null,
    note: "Minor Maintenance Updates",
  },
  {
    version: "1.2.16",
    tagged: null,
    note: "Fixed JSON schema issue for Sports South credential configuration",
  },
  {
    version: "1.2.15",
    tagged: null,
    note: "HPOS Compatibility and Schema validation changes",
  },
  {
    version: "1.2.14",
    tagged: null,
    note: "Updated validation schema for fulfillment and product restrictions",
  },
  {
    version: "1.2.13",
    tagged: null,
    note: "Style Sheet tweaks, JSON Schema updates",
  },
  {
    version: "1.2.12",
    tagged: null,
    note: "Added MAP brand exclusion feature",
  },
  {
    version: "1.2.11",
    tagged: null,
    note: "Added additional product classes",
  },
  {
    version: "1.2.10",
    tagged: null,
    note: "Changed menu icon, modified wording on Zanders Add FFL to hold order process",
  },
  {
    version: "1.2.9",
    tagged: null,
    note: "Added Sports South and update Manufacturers List",
  },
  {
    version: "1.2.8",
    tagged: null,
    note: "WordPress compliance 6.3, added schema validation updates for configuration",
  },
  {
    version: "1.2.7",
    tagged: null,
    note: "Modified Gunbroker configuration requirements",
  },
  {
    version: "1.2.6",
    tagged: null,
    note: "Updated manufacturer list",
  },
  {
    version: "1.2.5",
    tagged: null,
    note: "Better handling for new setups in loading configuration file from server",
  },
  {
    version: "1.2.4",
    tagged: null,
    note: "More minor updates to fulfillment tab",
  },
  {
    version: "1.2.3",
    tagged: null,
    note: "Minor updates to fulfillment tab",
  },
  {
    version: "1.2.2",
    tagged: null,
    note: "Minor change on fulfillment processing, passing through order source",
  },
  {
    version: "1.2.1",
    tagged: null,
    note: "Added some helpers for brand and product class settings in the configuration",
  },
  {
    version: "1.2.0",
    tagged: null,
    note: "(Beta) Fulfillment and Automated-Fulfillment now available for (Lipseys. Zanders, RSR, and Chattanooga)",
  },
  {
    version: "1.1.2",
    tagged: null,
    note: "(Testing Only) Added Fulfillment Ordering via Order Details View",
  },
  {
    version: "1.0.8",
    tagged: null,
    note: "(Testing Only) Added Fulfillment Section to Order Details to view options for Fulfillment",
  },
  {
    version: "1.0.7",
    tagged: null,
    note: "Added Help Center",
  },
  {
    version: "1.0.6",
    tagged: null,
    note: "Logging tab improvements, and on-demand loaging for products and logs",
  },
  {
    version: "1.0.5",
    tagged: null,
    note: "Logging now visible in Log Tab",
  },
  {
    version: "1.0.4",
    tagged: null,
    note: "Bug Fixes",
  },
  {
    version: "1.0.2",
    tagged: null,
    note: "Added gun.deals RSS Feed Support",
  },
  {
    version: "1.0.1",
    tagged: null,
    note: "Added a Load Config Button to reload configuration from database",
  },
  {
    version: "1.0.0",
    tagged: null,
    note: "Initial Release of the g-FFL Cockpit Plugin",
  },
];
