"use strict";

import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, normalize, dirname } from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require(join(process.cwd(), ".playwright-tmp/node_modules/playwright"));
const sharp = require(join(process.cwd(), ".playwright-tmp/node_modules/sharp"));

const root = process.cwd();
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

const jobsPath = process.argv[2] || "demos/_tools/capture-jobs.json";
const jobs = JSON.parse(await readFile(join(root, jobsPath), "utf8"));

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

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true });

const results = [];
for (const job of jobs) {
  const page = await browser.newPage({
    viewport: {
      width: job.width || 1200,
      height: job.height || 1600,
      deviceScaleFactor: job.scale || 2,
    },
  });

  const url = job.url.startsWith("http") ? job.url : `${base}/${job.url.replace(/^\//, "")}`;
  await page.goto(url, { waitUntil: "networkidle" });
  if (job.waitMs) await page.waitForTimeout(job.waitMs);
  if (job.actions) {
    for (const action of job.actions) {
      if (action.click) await page.locator(action.click).first().click();
      if (action.fill) await page.locator(action.fill[0]).fill(action.fill[1]);
      if (action.wait) await page.waitForTimeout(action.wait);
    }
  }

  const target = job.selector
    ? page.locator(job.selector).first()
    : page.locator("body");
  const buffer = await target.screenshot({ type: "png", omitBackground: Boolean(job.omitBackground) });
  const outPath = join(root, job.out);
  await mkdir(dirname(outPath), { recursive: true });

  if (job.out.endsWith(".webp")) {
    await sharp(buffer)
      .webp({ quality: job.quality || 82 })
      .toFile(outPath);
  } else if (job.out.endsWith(".jpg") || job.out.endsWith(".jpeg")) {
    await sharp(buffer)
      .jpeg({ quality: job.quality || 85 })
      .toFile(outPath);
  } else {
    await writeFile(outPath, buffer);
  }

  results.push({ out: job.out, exists: existsSync(outPath) });
  await page.close();
}

await browser.close();
server.close();
console.log(JSON.stringify({ captured: results.length, results }, null, 2));
