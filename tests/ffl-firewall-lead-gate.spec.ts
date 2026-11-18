import { expect, test, type Page } from "@playwright/test";

test.use({ viewport: { width: 1280, height: 800 } });

const PAGE_PATH = "/" + "ffl-firewall";
const TERMS_PATH = "/" + "ffl-firewall/terms";
const BUY_HREF = "https://checkout.coriolisagency.com/b/6oU7sM3obb7c5phf2o1440s";
const BUY_HERO = "Buy FFL Firewall: unlimited transactions, $79 a month";
const BUY_FOOTER = "Get unlimited transactions for $79 a month";

function heroBuy(page: Page) {
  return page.locator('[data-buy="hero"]');
}

function footerBuy(page: Page) {
  return page.locator('[data-buy="footer"]');
}

test.describe("FFL Firewall buy page", () => {
  test("page is noindex and shows the buy buttons, not the early-access form", async ({ page }) => {
    await page.goto(PAGE_PATH);
    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots).toBe("noindex, nofollow");
    await expect(page).toHaveTitle("FFL Firewall: a WooCommerce checkout plugin for FFL dealers | Coriolis");
    await expect(page.locator("[data-fflfw-ea-gate]")).toHaveCount(0);
    await expect(page.getByRole("dialog")).toHaveCount(0); // gate is hidden until a download button is clicked
    await expect(heroBuy(page)).toBeVisible();
    await expect(heroBuy(page)).toHaveText(BUY_HERO);
    await expect(heroBuy(page)).toHaveAttribute("href", BUY_HREF);
    await expect(footerBuy(page)).toBeVisible();
    await expect(footerBuy(page)).toHaveText(BUY_FOOTER);
    await expect(footerBuy(page)).toHaveAttribute("href", BUY_HREF);
    await expect(page.getByRole("link", { name: "Read the FFL Firewall terms" }).first()).toHaveAttribute("href", TERMS_PATH);
  });

  test("download buttons open the lead gate, and the gate carries the Buy a license link", async ({ page }) => {
    await page.goto(PAGE_PATH);
    await page.locator('[data-download="hero"]').click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Download FFL Firewall" })).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Download", exact: true })).toBeVisible();
    await expect(dialog).not.toContainText(/free/i);
    await expect(page.locator("[data-fflf-dl-buy]")).toHaveAttribute("href", BUY_HREF);
  });

  test("terms page is published and is not noindex", async ({ page }) => {
    await page.goto(TERMS_PATH);
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
    await expect(page).toHaveTitle("FFL Firewall terms | Coriolis, LLC");
    await expect(page.getByRole("heading", { name: "FFL Firewall terms", exact: true })).toBeVisible();
    await expect(page.getByText("Effective the day FFL Firewall billing launches.")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Who provides FFL Firewall" })).toBeVisible();
  });
});
