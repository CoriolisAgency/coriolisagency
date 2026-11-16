import { expect, test, type Page } from "@playwright/test";

test.use({ viewport: { width: 1280, height: 800 } });

const PAGE_PATH = "/" + "ffl-firewall";
const MAILBOX = "support@" + "coriolisagency.com";

function gate(page: Page) {
  return page.locator("[data-fflfw-ea-gate]");
}

function dialog(page: Page) {
  return page.getByRole("dialog");
}

function heroCta(page: Page) {
  return page.locator('[data-early-access="hero"]');
}

function footerCta(page: Page) {
  return page.locator('[data-early-access="footer"]');
}

async function openHero(page: Page) {
  await page.goto(PAGE_PATH);
  await heroCta(page).click();
  await expect(dialog(page)).toBeVisible();
}

test.describe("FFL Firewall early-access gate", () => {
  test("page is noindex and carries the early-access form", async ({ page }) => {
    await page.goto(PAGE_PATH);
    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots).toBe("noindex, nofollow");
    await expect(page).toHaveTitle("FFL Firewall: a WooCommerce checkout plugin for FFL dealers | Coriolis");
    await expect(gate(page)).toHaveAttribute("data-action", "/api/lead");
    await expect(gate(page)).toHaveAttribute("data-page", PAGE_PATH);
    await expect(gate(page)).not.toHaveAttribute("data-file");
    await expect(heroCta(page)).toBeVisible();
    await expect(footerCta(page)).toBeVisible();
  });

  test("hero click opens the modal and focuses company name", async ({ page }) => {
    await openHero(page);
    await expect(page.locator('input[name="company"]')).toBeFocused();
    await expect(dialog(page).getByRole("heading", { name: "Get early access", exact: true })).toBeVisible();
  });

  test("footer click opens the same modal", async ({ page }) => {
    await page.goto(PAGE_PATH);
    await footerCta(page).click();
    await expect(dialog(page)).toBeVisible();
    await expect(page.locator('input[name="company"]')).toBeFocused();
  });

  test("Close returns focus to the trigger", async ({ page }) => {
    await openHero(page);
    await page.getByRole("button", { name: "Close" }).click();
    await expect(dialog(page)).toBeHidden();
    await expect(heroCta(page)).toBeFocused();
  });

  test("Escape closes the modal and returns focus", async ({ page }) => {
    await openHero(page);
    await page.keyboard.press("Escape");
    await expect(dialog(page)).toBeHidden();
    await expect(heroCta(page)).toBeFocused();
  });

  test("empty submit stays in the modal and does not call the lead path", async ({ page }) => {
    let leadCalls = 0;
    await page.route("**/api/lead", async (route) => {
      leadCalls += 1;
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });
    await openHero(page);
    await page.locator("[data-fflfw-ea-submit]").click();
    await expect(dialog(page)).toBeVisible();
    await expect(page.locator("[data-fflfw-ea-error]")).toHaveText("Company name is required.");
    expect(leadCalls).toBe(0);
  });

  test("invalid email is rejected", async ({ page }) => {
    let leadCalls = 0;
    await page.route("**/api/lead", async (route) => {
      leadCalls += 1;
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });
    await openHero(page);
    await page.locator('input[name="company"]').fill("Test Shop");
    await page.locator('input[name="website"]').fill("https://example.com");
    await page.locator('input[name="email"]').fill("not-an-email");
    await page.locator("[data-fflfw-ea-submit]").click();
    await expect(page.locator("[data-fflfw-ea-error]")).toHaveText("That email does not look valid.");
    expect(leadCalls).toBe(0);
  });

  test("successful submit posts the lead, prefixes https, shows thanks, and does not download", async ({ page }) => {
    const posts: unknown[] = [];
    await page.route("**/api/lead", async (route) => {
      const body = route.request().postDataJSON();
      posts.push(body);
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });
    let downloaded = false;
    page.on("download", () => {
      downloaded = true;
    });
    await openHero(page);
    await page.locator('input[name="company"]').fill("Test Shop");
    await page.locator('input[name="website"]').fill("test-fflfw-gate.example");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page.locator("[data-fflfw-ea-submit]").click();
    await expect(page.getByRole("heading", { name: "Thank you" })).toBeVisible();
    await expect(dialog(page).getByRole("link", { name: MAILBOX })).toHaveAttribute("href", "mailto:" + MAILBOX);
    expect(downloaded).toBe(false);
    expect(posts).toHaveLength(1);
    const payload = posts[0] as Record<string, unknown>;
    expect(payload.name).toBe("Test Shop");
    expect(payload.company).toBe("Test Shop");
    expect(payload.email).toBe("test@example.com");
    expect(payload.website).toBe("https://test-fflfw-gate.example/");
    expect(payload.pillar).toBe("Ecommerce");
    expect(payload.message).toBe("FFL Firewall early access");
    expect(payload.page).toBe(PAGE_PATH);
    expect(payload.site).toBe("coriolisagency");
    expect(typeof payload.started_at).toBe("number");
  });

  test("thank-you copy has a space before the mailbox link", async ({ page }) => {
    const posts: unknown[] = [];
    await page.route("**/api/lead", async (route) => {
      posts.push(route.request().postDataJSON());
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });
    await openHero(page);
    await page.locator('input[name="company"]').fill("Test Shop");
    await page.locator('input[name="website"]').fill("https://example.com");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page.locator("[data-fflfw-ea-submit]").click();
    await expect(page.getByRole("heading", { name: "Thank you" })).toBeVisible();
    const thanks = await page.locator("[data-fflfw-ea-thanks]").textContent();
    expect(thanks).toContain("write to " + MAILBOX);
    expect(thanks).not.toContain("write to" + MAILBOX);
    expect(posts).toHaveLength(1);
  });

  test("a failed lead stays on the form so the dealer can retry", async ({ page }) => {
    await page.route("**/api/lead", async (route) => {
      await route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, error: "Could not send. Try again." }),
      });
    });
    let downloaded = false;
    page.on("download", () => {
      downloaded = true;
    });
    await openHero(page);
    await page.locator('input[name="company"]').fill("Test Shop");
    await page.locator('input[name="website"]').fill("https://example.com");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page.locator("[data-fflfw-ea-submit]").click();
    await expect(page.locator("[data-fflfw-ea-error]")).toHaveText("Could not send. Try again.");
    await expect(dialog(page).getByRole("heading", { name: "Get early access", exact: true })).toBeVisible();
    await expect(page.locator("[data-fflfw-ea-thanks]")).toBeHidden();
    await expect(page.locator("[data-fflfw-ea-form-view]")).toBeVisible();
    expect(downloaded).toBe(false);
    await page.keyboard.press("Escape");
    await expect(dialog(page)).toBeHidden();
  });
});
