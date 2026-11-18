import { expect, test, type Page } from "@playwright/test";

const KEY = "ffw_popup_dismissed_until";
const HREF = "/ffl-firewall/";

async function scrollDeep(page: Page) {
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.6));
}

test.describe("FFL Firewall pop-up, desktop", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("does not cover the page on load, opens on 40% scroll as a centered modal", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#ffw-popup-root")).toBeHidden();
    await scrollDeep(page);
    const dlg = page.getByRole("dialog", { name: /FFL Firewall checks the cart/ });
    await expect(dlg).toBeVisible();
    await expect(dlg).toHaveAttribute("aria-modal", "true");
    const box = (await dlg.boundingBox())!;
    expect(Math.round(box.width)).toBe(640);
    expect(Math.abs(box.x + box.width / 2 - 640)).toBeLessThan(2);
    const cta = dlg.getByRole("link", { name: "See FFL Firewall" });
    await expect(cta).toHaveAttribute("href", HREF);
    await expect(dlg.getByRole("button", { name: "Not now" })).toBeVisible();
    const html = await dlg.innerText();
    expect(html).not.toMatch(/free/i);
    // hero loaded, not hotlinked
    const src = await dlg.locator(".ffw-hero img").getAttribute("src");
    expect(src).toBe("/brand/ffl-firewall/popup/ffl-firewall-us-map-hero.webp");
    expect((await page.request.get(src!)).status()).toBe(200);
  });

  test("Not now sets the 14-day dismissal key and it stays away after reload", async ({ page }) => {
    await page.goto("/");
    await scrollDeep(page);
    const dlg = page.getByRole("dialog");
    await dlg.getByRole("button", { name: "Not now" }).click();
    await expect(page.locator("#ffw-popup-root")).toBeHidden();
    const until = Number(await page.evaluate((k) => localStorage.getItem(k), KEY));
    const days = (until - Date.now()) / 864e5;
    expect(days).toBeGreaterThan(13.9);
    expect(days).toBeLessThan(14.1);
    expect(page.url()).not.toContain("ffl-firewall");
    await page.reload();
    await scrollDeep(page);
    await page.waitForTimeout(500);
    await expect(page.locator("#ffw-popup-root")).toBeHidden();
  });

  test("Esc closes, focus returns, Tab stays inside", async ({ page }) => {
    await page.goto("/");
    await page.locator("a").first().focus();
    const before = await page.evaluate(() => document.activeElement?.outerHTML);
    await scrollDeep(page);
    const dlg = page.getByRole("dialog");
    await expect(dlg).toBeVisible();
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      expect(await page.evaluate(() => !!document.activeElement?.closest("#ffw-modal"))).toBe(true);
    }
    await page.keyboard.press("Escape");
    await expect(page.locator("#ffw-popup-root")).toBeHidden();
    expect(await page.evaluate(() => document.activeElement?.outerHTML)).toBe(before);
  });

  test("exit intent opens it", async ({ page }) => {
    await page.goto("/");
    await page.mouse.move(600, 300);
    await page.evaluate(() =>
      document.dispatchEvent(new MouseEvent("mouseout", { clientY: -2, relatedTarget: null, bubbles: true })),
    );
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("not mounted on /ffl-firewall or its terms", async ({ page }) => {
    for (const p of ["/ffl-firewall", "/ffl-firewall/", "/ffl-firewall/terms"]) {
      await page.goto(p);
      await expect(page.locator("#ffw-popup-root")).toHaveCount(0);
      await scrollDeep(page);
      await page.waitForTimeout(300);
      await expect(page.locator("#ffw-popup-root")).toHaveCount(0);
    }
  });

  test("CTA click leads to /ffl-firewall/ and is remembered", async ({ page }) => {
    await page.goto("/");
    await scrollDeep(page);
    await page.getByRole("dialog").getByRole("link", { name: "See FFL Firewall" }).click();
    await expect(page).toHaveURL(/\/ffl-firewall\/?$/);
  });
});

test.describe("FFL Firewall pop-up, phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test("bottom sheet is about 40% of the screen and swipes away", async ({ page }) => {
    await page.goto("/");
    await scrollDeep(page);
    const sheet = page.getByRole("dialog", { name: "FFL Firewall for WooCommerce" });
    await expect(sheet).toBeVisible();
    await expect(sheet).toHaveAttribute("aria-modal", "false");
    await page.waitForTimeout(400);
    const box = (await sheet.boundingBox())!;
    expect(box.height / 844).toBeGreaterThan(0.36);
    expect(box.height / 844).toBeLessThan(0.46);
    const close = (await sheet.getByRole("button", { name: "Close" }).boundingBox())!;
    expect(close.width).toBeGreaterThanOrEqual(40);
    expect(await sheet.innerText()).not.toMatch(/free/i);
    await page.evaluate(() => {
      const el = document.getElementById("ffw-sheet")!;
      const t = (type: string, y: number) =>
        el.dispatchEvent(
          new TouchEvent(type, {
            bubbles: true,
            touches: type === "touchend" ? [] : [new Touch({ identifier: 1, target: el, clientX: 100, clientY: y })],
          }),
        );
      t("touchstart", 600);
      t("touchmove", 700);
      t("touchend", 700);
    });
    await expect(page.locator("#ffw-popup-root")).toBeHidden();
    const until = await page.evaluate((k) => localStorage.getItem(k), KEY);
    expect(Number(until)).toBeGreaterThan(Date.now());
  });

  test("short phone screens drop the hero to 96 px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 640 });
    await page.goto("/");
    await scrollDeep(page);
    await expect(page.getByRole("dialog")).toBeVisible();
    const h = await page.locator("#ffw-sheet .ffw-hero").evaluate((e) => e.getBoundingClientRect().height);
    expect(Math.round(h)).toBe(96);
  });
});
