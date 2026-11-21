import { expect, test, type Page } from "@playwright/test";

test.use({ viewport: { width: 1280, height: 800 } });

const PAGE_PATH = "/" + "ffl-filters";
const MAILBOX = "support@" + "coriolisagency.com";
const FILE_URL = "https://github.com/CoriolisAgency/ffl-filters-releases/releases/download/v1.3.9/ffl-filters-1.3.9.zip";

async function stubZip(page: Page) {
  await page.route(FILE_URL, async (route) => {
    await route.fulfill({
      status: 200,
      headers: {
        "content-type": "application/zip",
        "content-disposition": "attachment; filename=ffl-filters-1.3.9.zip",
      },
      body: Buffer.from("PK\x03\x04", "binary"),
    });
  });
}

function gate(page: Page) {
  return page.locator("[data-fflf-dl-gate]");
}

function dialog(page: Page) {
  return page.getByRole("dialog");
}

function heroDownload(page: Page) {
  return page.locator('[data-download="hero"]');
}

function footerDownload(page: Page) {
  return page.locator('[data-download="footer"]');
}

async function openHero(page: Page) {
  await stubZip(page);
  await page.goto(PAGE_PATH);
  await heroDownload(page).click();
  await expect(dialog(page)).toBeVisible();
}

test.describe("FFL Filters download gate", () => {
  test("hero click opens the modal and focuses company name", async ({ page }) => {
    await openHero(page);
    await expect(gate(page)).toHaveAttribute("data-file", FILE_URL);
    await expect(heroDownload(page)).toHaveAttribute("href", FILE_URL);
    await expect(page.locator('input[name="company"]')).toBeFocused();
  });

  test("footer click opens the same modal", async ({ page }) => {
    await stubZip(page);
    await page.goto(PAGE_PATH);
    await footerDownload(page).click();
    await expect(dialog(page)).toBeVisible();
    await expect(page.locator('input[name="company"]')).toBeFocused();
  });

  test("Close returns focus to the trigger", async ({ page }) => {
    await openHero(page);
    await page.getByRole("button", { name: "Close" }).click();
    await expect(dialog(page)).toBeHidden();
    await expect(heroDownload(page)).toBeFocused();
  });

  test("Escape closes the modal and returns focus", async ({ page }) => {
    await openHero(page);
    await page.keyboard.press("Escape");
    await expect(dialog(page)).toBeHidden();
    await expect(heroDownload(page)).toBeFocused();
  });

  test("Tab cycles focus inside the dialog", async ({ page }) => {
    await openHero(page);
    await expect(page.locator('input[name="company"]')).toBeFocused();
    const order: string[] = [];
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      order.push(
        await page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          if (!el) return "";
          if (el.getAttribute("data-fflf-dl-close") != null) return "close";
          if (el.getAttribute("data-fflf-dl-submit") != null) return "submit";
          return el.getAttribute("name") || el.tagName;
        }),
      );
      if (order[order.length - 1] === "close" && order.includes("submit")) break;
    }
    expect(order).toContain("website");
    expect(order).toContain("email");
    expect(order).toContain("submit");
    expect(order).toContain("close");
    // Wrap: after close (last control) Tab returns to the first field or close.
    const closeIndex = order.lastIndexOf("close");
    await page.getByRole("button", { name: "Close" }).focus();
    await page.keyboard.press("Tab");
    const after = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      return el?.getAttribute("name") || el?.getAttribute("data-fflf-dl-close") || "";
    });
    expect(after === "company" || after === "").toBeTruthy();
    expect(closeIndex).toBeGreaterThan(-1);
  });

  test("empty submit stays in the modal and does not call the lead path or download", async ({ page }) => {
    let leadCalls = 0;
    let downloaded = false;
    await page.route("**/api/lead", async (route) => {
      leadCalls += 1;
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });
    page.on("download", () => {
      downloaded = true;
    });
    await openHero(page);
    await page.locator("[data-fflf-dl-submit]").click();
    await expect(dialog(page)).toBeVisible();
    await expect(page.locator("[data-fflf-dl-error]")).toHaveText("Company name is required.");
    expect(leadCalls).toBe(0);
    expect(downloaded).toBe(false);
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
    await page.locator("[data-fflf-dl-submit]").click();
    await expect(page.locator("[data-fflf-dl-error]")).toHaveText("That email does not look valid.");
    expect(leadCalls).toBe(0);
  });

  test("successful submit posts the lead, prefixes https, starts the download, and shows thanks", async ({ page }) => {
    const posts: unknown[] = [];
    await page.route("**/api/lead", async (route) => {
      const body = route.request().postDataJSON();
      posts.push(body);
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });
    await openHero(page);
    await page.locator('input[name="company"]').fill("Test Shop");
    await page.locator('input[name="website"]').fill("test-fflf-gate.example");
    await page.locator('input[name="email"]').fill("test@example.com");
    const downloadPromise = page.waitForEvent("download");
    await page.locator("[data-fflf-dl-submit]").click();
    const download = await downloadPromise;
    expect(download.url()).toBe(FILE_URL);
    await expect(page.getByRole("heading", { name: "Thank you" })).toBeVisible();
    await expect(dialog(page).getByRole("link", { name: MAILBOX })).toHaveAttribute("href", "mailto:" + MAILBOX);
    expect(posts).toHaveLength(1);
    const payload = posts[0] as Record<string, unknown>;
    expect(payload.name).toBe("Test Shop");
    expect(payload.company).toBe("Test Shop");
    expect(payload.email).toBe("test@example.com");
    expect(payload.website).toBe("https://test-fflf-gate.example/");
    expect(payload.pillar).toBe("Ecommerce");
    expect(payload.message).toBe("FFL Filters download");
    expect(payload.page).toBe(PAGE_PATH);
    expect(payload.site).toBe("coriolisagency");
    expect(typeof payload.started_at).toBe("number");
  });

  test("thank-you copy has a space before the mailbox link", async ({ page }) => {
    await openHero(page);
    const thanks = await page.locator("[data-fflf-dl-thanks]").textContent();
    expect(thanks).toContain("write to " + MAILBOX);
    expect(thanks).not.toContain("write to" + MAILBOX);
  });

  test("a failed lead still starts the download and shows thanks", async ({ page }) => {
    await page.route("**/api/lead", async (route) => {
      await route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, error: "Could not send. Try again." }),
      });
    });
    await openHero(page);
    await page.locator('input[name="company"]').fill("Test Shop");
    await page.locator('input[name="website"]').fill("https://example.com");
    await page.locator('input[name="email"]').fill("test@example.com");
    const downloadPromise = page.waitForEvent("download");
    await page.locator("[data-fflf-dl-submit]").click();
    const download = await downloadPromise;
    expect(download.url()).toBe(FILE_URL);
    await expect(page.getByRole("heading", { name: "Thank you" })).toBeVisible();
    await expect(dialog(page).getByRole("link", { name: MAILBOX })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog(page)).toBeHidden();
  });
});
