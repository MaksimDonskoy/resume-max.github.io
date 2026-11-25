"use strict";

import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(join(process.cwd(), ".playwright-tmp/node_modules/sharp"));
const assets = "C:/Users/maksi/.cursor/projects/c-My-work-my-resume/assets";
const refs = join(process.cwd(), "demos/_refs");

const jobs = [
  ["ambre", "cover.webp", ["ambre-studio-ref.jpg", "ambre-studio.jpg"]],
  ["ambre", "01.webp", ["ambre-lifestyle.jpg"]],
  ["ambre", "02.webp", ["ambre-detail.jpg"]],
  ["urban-step", "cover.webp", ["urban-step-studio.jpg"]],
  ["urban-step", "01.webp", ["urban-step-lifestyle.jpg"]],
  ["urban-step", "02.webp", ["urban-step-detail.jpg"]],
  ["lumiere", "cover.webp", ["lumiere-studio.jpg"]],
  ["lumiere", "01.webp", ["lumiere-lifestyle.jpg"]],
  ["lumiere", "02.webp", ["lumiere-detail.jpg"]],
  ["nord-skin", "cover.webp", ["nord-skin-studio.jpg"]],
  ["nord-skin", "01.webp", ["nord-skin-lifestyle.jpg"]],
  ["nord-skin", "02.webp", ["nord-skin-studio.jpg"]],
  ["fresh-berry", "cover.webp", ["fresh-berry-studio.jpg"]],
  ["fresh-berry", "01.webp", ["fresh-berry-detail.jpg"]],
  ["fresh-berry", "02.webp", ["fresh-berry-studio.jpg"]],
];

function resolveSource(names) {
  for (const name of names) {
    const a = join(assets, name);
    const r = join(refs, name);
    if (existsSync(a)) return a;
    if (existsSync(r)) return r;
  }
  return null;
}

const report = [];
for (const [slug, file, sources] of jobs) {
  const src = resolveSource(sources);
  const outDir = join("image/portfolio/ai-photo", slug);
  await mkdir(outDir, { recursive: true });
  const out = join(outDir, file);
  if (!src) {
    report.push({ out, ok: false, reason: "missing source" });
    continue;
  }
  await sharp(src).webp({ quality: 84 }).toFile(out);
  report.push({ out, ok: true, src });
}

console.log(JSON.stringify(report, null, 2));
