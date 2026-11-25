"use strict";

import { writeFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import { spawn } from "node:child_process";

const require = createRequire(import.meta.url);
const code = require("node:fs").readFileSync("js/portfolio-data.js", "utf8");
const windowObj = {};
Function("window", code)(windowObj);

const projects = windowObj.PORTFOLIO_PROJECTS.filter((p) => p.published && p.cover);
const cards = projects
  .map(
    (p) => `<figure><img src="/${p.cover}" alt="${p.title}" loading="lazy"><figcaption>${p.category}<br><strong>${p.title}</strong></figcaption></figure>`,
  )
  .join("\n");

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Portfolio contact sheet</title>
<style>
body{margin:0;background:#0b0d12;color:#fff;font-family:Inter,Arial,sans-serif;padding:24px}
h1{margin:0 0 8px} .meta{opacity:.7;margin-bottom:24px}
grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
figure{margin:0;background:#151a24;border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden}
img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;background:#000}
figcaption{padding:10px;font-size:12px;line-height:1.35;opacity:.9}
</style></head><body>
<h1>Portfolio contact sheet</h1>
<p class="meta">${projects.length} published covers · local QA</p>
<grid>${cards}</grid>
</body></html>`;

await mkdir("demos/_tools", { recursive: true });
await writeFile("demos/_tools/contact-sheet.html", html);
await writeFile(
  "demos/_tools/capture-contact-sheet.json",
  JSON.stringify(
    [
      {
        url: "demos/_tools/contact-sheet.html",
        width: 1600,
        height: 2200,
        scale: 1,
        out: "demos/_tools/contact-sheet.webp",
        quality: 80,
      },
    ],
    null,
    2,
  ),
);

await new Promise((resolve, reject) => {
  const child = spawn(
    process.execPath,
    ["demos/_tools/capture.mjs", "demos/_tools/capture-contact-sheet.json"],
    { stdio: "inherit" },
  );
  child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error("capture failed"))));
});

console.log("Contact sheet ready");
