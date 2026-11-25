"use strict";

import { readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { spawn } from "node:child_process";

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.name === "index.html") files.push(full);
  }
  return files;
}

for (const category of ["bots", "mobile", "automation"]) {
  const files = await walk(join("demos", category));
  for (const file of files) {
    let html = await readFile(file, "utf8");
    html = html.replace(/<motion(\s[^>]*)>/g, "<div$1>").replace(/<\/motion>/g, "</div>");
    if (!html.includes("waitForDemoReady")) {
      html = html.replace(
        "</body>",
        `<script>window.waitForDemoReady=true;document.documentElement.dataset.ready='1';</script></body>`,
      );
    }
    // Ensure bot chats have visible first message in DOM for cover shots
    if (category === "bots" && html.includes("id=\"chat\"") && !html.includes("data-seeded=\"1\"")) {
      html = html.replace(
        /<div([^>]*id=\"chat\"[^>]*)><\/div>/,
        `<div$1 data-seeded=\"1\"><div class=\"msg bot\">Демонстрационный сценарий готов. Нажмите кнопку ниже.</div></div>`,
      );
    }
    await writeFile(file, html);
  }
}

const jobs = JSON.parse(await readFile("demos/_tools/capture-interactive.json", "utf8"));
const filtered = jobs
  .filter((job) => /\/(bots|mobile|automation)\//.test(job.url) || /portfolio\/(bots|mobile|automation)\//.test(job.out))
  .map((job) => ({
    ...job,
    waitMs: Math.max(job.waitMs || 0, 600),
    selector:
      job.selector === "[data-phone]"
        ? "[data-phone]"
        : job.selector === "[data-device]"
          ? "[data-device]"
          : job.selector === "[data-dashboard]"
            ? "[data-dashboard]"
            : job.selector || "body",
  }));

await writeFile(
  "demos/_tools/capture-bots-mobile-auto.json",
  JSON.stringify(filtered, null, 2),
);
console.log(`Prepared ${filtered.length} recapture jobs`);
