"use strict";

import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require(join(process.cwd(), ".playwright-tmp/node_modules/playwright"));
const root = process.cwd();
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1");
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === "/") pathname = "/index.html";
    const filePath = normalize(join(root, pathname));
    if (!filePath.startsWith(normalize(root))) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    const data = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": mime[extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});

await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
const errors = [];
const failedRequests = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("response", (res) => {
  if (res.status() >= 400) failedRequests.push(`${res.status()} ${res.url()}`);
});

const report = [];
async function check(name, fn) {
  try {
    await fn();
    report.push(`PASS ${name}`);
  } catch (error) {
    report.push(`FAIL ${name}: ${error.message}`);
  }
}

await page.goto(`${base}/index.html`, { waitUntil: "networkidle" });

await check("portfolio nav visible", async () => {
  if (await page.locator("[data-nav-portfolio]").isHidden()) throw new Error("hidden");
});

await page.locator('a[href="#portfolio"]').click();
await page.waitForTimeout(500);

await check("11 filters", async () => {
  const n = await page.locator(".portfolio-filter:visible").count();
  if (n !== 11) throw new Error(String(n));
});

await check("50 cards", async () => {
  const n = await page.locator(".portfolio-card").count();
  if (n !== 50) throw new Error(String(n));
});

await check("covers decode", async () => {
  const result = await page.locator(".portfolio-card__cover").evaluateAll((imgs) =>
    imgs.map((img) => ({
      ok: img.complete && img.naturalWidth > 0,
      src: img.currentSrc || img.src,
      w: img.naturalWidth,
    })),
  );
  const bad = result.filter((r) => !r.ok);
  if (bad.length) throw new Error(`${bad.length} broken covers`);
});

await check("open modal gallery images decode", async () => {
  await page.locator(".portfolio-card").first().click();
  await page.waitForTimeout(300);
  const ok = await page.locator("[data-portfolio-gallery-image]").evaluate((img) => img.complete && img.naturalWidth > 0);
  if (!ok) throw new Error("gallery image failed");
  const next = page.locator("[data-portfolio-gallery-next]");
  if (await next.isVisible()) {
    await next.click();
    await page.waitForTimeout(150);
  }
  await page.keyboard.press("Escape");
});

await check("RU language", async () => {
  await page.selectOption("#language-select", "ru");
  await page.waitForTimeout(200);
  if ((await page.locator("#portfolio-title").innerText()) !== "Портфолио") throw new Error("title");
});

await check("theme toggle", async () => {
  const before = await page.locator("html").getAttribute("data-theme");
  await page.locator(".theme-toggle").click();
  await page.waitForTimeout(80);
  const after = await page.locator("html").getAttribute("data-theme");
  if (before === after) throw new Error("no change");
});

await check("demo link present on interactive project", async () => {
  await page.locator('.portfolio-filter[data-category="web-development"]').click();
  await page.waitForTimeout(150);
  await page.locator(".portfolio-card").first().click();
  await page.waitForTimeout(200);
  const link = page.locator("[data-portfolio-modal-link]");
  if (await link.isHidden()) throw new Error("no project link");
  await page.keyboard.press("Escape");
});

await check("no JS errors", async () => {
  if (errors.length) throw new Error(errors.join(" | "));
});

await check("no 404 for portfolio assets during session", async () => {
  const assetFails = failedRequests.filter((u) => u.includes("/image/portfolio/") || u.includes("/demos/"));
  if (assetFails.length) throw new Error(assetFails.slice(0, 5).join(" ; "));
});

await browser.close();
server.close();
console.log(report.join("\n"));
if (report.some((l) => l.startsWith("FAIL"))) process.exit(1);
