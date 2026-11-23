import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = "C:\\dev\\popup-nurture\\verify\\coriolisagency";
const port = 4331;
const baseURL = `http://127.0.0.1:${port}`;
const STATUS = {
  ok: true,
  enabled: true,
  lane: "agency-web",
  site: "agency",
};

fs.mkdirSync(outDir, { recursive: true });

function waitForServer(url, timeoutMs) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(url, { redirect: "manual" });
        if (res.status) {
          resolve();
          return;
        }
      } catch {}
      if (Date.now() - start > timeoutMs) {
        reject(new Error("preview did not start"));
        return;
      }
      setTimeout(tick, 300);
    };
    tick();
  });
}

const preview = spawn(
  process.execPath,
  [path.join(root, "node_modules/astro/bin/astro.mjs"), "preview", "--host", "127.0.0.1", "--port", String(port)],
  { cwd: root, stdio: "pipe", shell: false },
);

let previewOut = "";
preview.stdout.on("data", (d) => { previewOut += d.toString(); });
preview.stderr.on("data", (d) => { previewOut += d.toString(); });

function killPreview() {
  try { preview.kill("SIGTERM"); } catch {}
}

process.on("exit", killPreview);

try {
  await waitForServer(baseURL, 30000);
} catch (err) {
  console.error(previewOut);
  killPreview();
  throw err;
}

const browser = await chromium.launch();
const sizes = [
  { name: "390x844", width: 390, height: 844 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "1920x1080", width: 1920, height: 1080 },
];
const numbers = {};

async function stubPopup(page, enabled) {
  await page.route("**/api/popup", async (route) => {
    const req = route.request();
    if (req.method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ...STATUS, enabled }),
      });
      return;
    }
    await route.abort();
  });
}

for (const size of sizes) {
  const errors = [];
  const context = await browser.newContext({
    viewport: { width: size.width, height: size.height },
    isMobile: size.width < 1024,
    hasTouch: size.width < 1024,
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await stubPopup(page, true);
  await page.goto(`${baseURL}/?popup=1`, { waitUntil: "load" });
  await page.locator(".cpop[role='dialog']").waitFor({ timeout: 10000 });
  await page.waitForTimeout(400);
  const shot = path.join(outDir, `${size.name}.png`);
  await page.screenshot({ path: shot, fullPage: false });
  const scrollWidth = await page.evaluate(() => {
    const el = document.scrollingElement || document.documentElement;
    return el.scrollWidth;
  });
  numbers[size.name] = {
    scrollWidth,
    overflow: scrollWidth > size.width,
    consoleErrors: errors.slice(),
    screenshot: shot,
  };
  await context.close();
}

const clsContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
const clsPage = await clsContext.newPage();
const clsErrors = [];
clsPage.on("pageerror", (e) => clsErrors.push(String(e)));
await clsPage.goto(`${baseURL}/`, { waitUntil: "load" });
const cls = await clsPage.evaluate(() => {
  return new Promise((resolve) => {
    let total = 0;
    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) total += entry.value;
      }
    });
    po.observe({ type: "layout-shift", buffered: true });
    setTimeout(() => {
      po.disconnect();
      resolve(total);
    }, 25000);
  });
});
const dialogCount = await clsPage.locator(".cpop[role='dialog']").count();
numbers.cls = {
  value: cls,
  ms: 25000,
  viewport: "390x844",
  dialogs: dialogCount,
  consoleErrors: clsErrors.slice(),
};
await clsContext.close();
await browser.close();
killPreview();

const report = path.join(outDir, "numbers.json");
fs.writeFileSync(report, JSON.stringify(numbers, null, 2) + "\n");
console.log(JSON.stringify(numbers, null, 2));

const overflow390 = numbers["390x844"].scrollWidth;
if (overflow390 > 390) {
  console.error(`overflow at 390: scrollWidth=${overflow390}`);
  process.exit(1);
}
if (numbers["390x844"].consoleErrors.length) {
  console.error("console errors at 390", numbers["390x844"].consoleErrors);
  process.exit(1);
}
if (cls > 0.001) {
  console.error(`CLS ${cls} > 0`);
  process.exit(1);
}
console.log("verify-popup: ok");
