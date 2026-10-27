import { expect, test, type Locator, type Page } from "@playwright/test";

test.use({ viewport: { width: 1280, height: 800 } });

function posNav(page: Page) {
  return page.locator("[data-pos-nav]");
}

function posMenu(page: Page) {
  return page.locator("#pos-menu");
}

function posToggle(page: Page) {
  return posNav(page).locator(".pos-nav-toggle");
}

async function assertMenuVisibleAlongPath(page: Page, menu: Locator, from: { x: number; y: number }, to: { x: number; y: number }) {
  const hops = 4;
  for (let i = 1; i <= hops; i++) {
    const x = from.x + ((to.x - from.x) * i) / hops;
    const y = from.y + ((to.y - from.y) * i) / hops;
    await page.mouse.move(x, y, { steps: 8 });
    await expect(menu).toBeVisible();
  }
}

test.describe("Gun Store POS desktop dropdown", () => {
  test("stays open while moving from trigger to panel, then opens /aim-pos", async ({ page }) => {
    await page.goto("/");
    const nav = posNav(page);
    const menu = posMenu(page);
    const trigger = nav.locator(".pos-nav-trigger");

    await trigger.hover();
    await expect(menu).toBeVisible();

    const triggerBox = await trigger.boundingBox();
    const menuBox = await menu.boundingBox();
    expect(triggerBox).toBeTruthy();
    expect(menuBox).toBeTruthy();
    if (!triggerBox || !menuBox) return;

    const start = {
      x: triggerBox.x + triggerBox.width - 12,
      y: triggerBox.y + triggerBox.height - 1,
    };
    const end = {
      x: menuBox.x + Math.min(24, menuBox.width / 2),
      y: menuBox.y + Math.min(16, menuBox.height / 2),
    };
    await page.mouse.move(start.x, start.y, { steps: 4 });
    await expect(menu).toBeVisible();
    await assertMenuVisibleAlongPath(page, menu, start, end);

    await menu.getByRole("link", { name: "WooCommerce for AIM" }).click();
    await expect(page).toHaveURL(/\/aim-pos\/?$/);
  });

  test("Escape closes the panel and returns focus to the chevron", async ({ page }) => {
    await page.goto("/");
    const menu = posMenu(page);
    const toggle = posToggle(page);

    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  });

  test("chevron click toggles the panel", async ({ page }) => {
    await page.goto("/");
    const menu = posMenu(page);
    const toggle = posToggle(page);

    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    await toggle.click();
    await expect(menu).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});
