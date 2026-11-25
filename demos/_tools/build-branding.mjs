"use strict";

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const brands = [
  {
    id: "nord-coffee",
    name: "NORD COFFEE",
    tagline: "Nordic roast · quiet mornings",
    colors: ["#1c1917", "#f5f5f4", "#b45309", "#78716c"],
    fonts: ["Space Grotesk", "Inter"],
    mark: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="28" fill="#1c1917"/><circle cx="60" cy="58" r="28" fill="none" stroke="#b45309" stroke-width="8"/><path d="M86 58c10 0 18 8 18 18" fill="none" stroke="#f5f5f4" stroke-width="8" stroke-linecap="round"/><circle cx="60" cy="58" r="10" fill="#f5f5f4"/></svg>`,
  },
  {
    id: "green-lab",
    name: "GREEN LAB",
    tagline: "Science for living nature",
    colors: ["#052e16", "#ecfdf5", "#22c55e", "#86efac"],
    fonts: ["Manrope", "Inter"],
    mark: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="28" fill="#052e16"/><path d="M36 78c18-34 30-46 48-54-8 22-6 40 2 54-18 2-34-2-50 0Z" fill="#22c55e"/><circle cx="78" cy="34" r="8" fill="#86efac"/></svg>`,
  },
  {
    id: "velocity",
    name: "VELOCITY",
    tagline: "Motion without friction",
    colors: ["#0f172a", "#f8fafc", "#ef4444", "#94a3b8"],
    fonts: ["Orbitron-like system", "Inter"],
    mark: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="28" fill="#0f172a"/><path d="M24 78 L54 30 L66 30 L96 78 Z" fill="none" stroke="#ef4444" stroke-width="8" stroke-linejoin="round"/><path d="M40 78h40" stroke="#f8fafc" stroke-width="8" stroke-linecap="round"/></svg>`,
  },
  {
    id: "aurel",
    name: "AUREL",
    tagline: "Soft glow beauty",
    colors: ["#3b0764", "#fdf4ff", "#e879f9", "#f5d0fe"],
    fonts: ["Cormorant-like", "Inter"],
    mark: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="28" fill="#3b0764"/><circle cx="60" cy="60" r="26" fill="none" stroke="#e879f9" stroke-width="6"/><path d="M60 28v64M28 60h64" stroke="#f5d0fe" stroke-width="4"/><circle cx="60" cy="60" r="8" fill="#fdf4ff"/></svg>`,
  },
  {
    id: "vector",
    name: "VECTOR",
    tagline: "Systems that scale",
    colors: ["#020617", "#e2e8f0", "#38bdf8", "#64748b"],
    fonts: ["IBM Plex-like", "Inter"],
    mark: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="28" fill="#020617"/><path d="M28 84 L60 28 L92 84" fill="none" stroke="#38bdf8" stroke-width="10" stroke-linejoin="round"/><circle cx="60" cy="84" r="8" fill="#e2e8f0"/></svg>`,
  },
];

const jobs = [];

for (const brand of brands) {
  const dir = join("demos/branding", brand.id);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "logo.svg"), brand.mark);

  const board = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;600&display=swap');
  *{box-sizing:border-box} body{margin:0;font-family:Inter,sans-serif;background:#0b0d12;color:#fff}
  .board{width:1400px;height:900px;padding:48px;display:grid;grid-template-columns:1.1fr 1fr;gap:36px;background:linear-gradient(145deg,#111827,#0b0d12 55%,#111)}
  .panel{border:1px solid rgba(255,255,255,.08);border-radius:28px;background:rgba(255,255,255,.03);padding:28px}
  .logo{width:180px;height:180px}.logo svg{width:100%;height:100%}
  h1{font-family:"Space Grotesk",sans-serif;font-size:56px;margin:18px 0 8px}
  .tag{opacity:.8;font-size:22px}
  .swatches{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:28px}
  .swatch{height:92px;border-radius:18px;display:flex;align-items:flex-end;padding:10px;font-size:13px;font-weight:700}
  .apps{display:grid;gap:16px}.app{height:140px;border-radius:18px;display:grid;place-items:center;font-weight:700;letter-spacing:.08em}
  .mono{display:flex;gap:18px;align-items:center}.mono .word{font-family:"Space Grotesk",sans-serif;font-size:42px;font-weight:700}
  .note{margin-top:18px;opacity:.65;font-size:14px}
  </style></head><body><section class="board" data-card>
  <div class="panel"><div class="logo">${brand.mark}</div><h1>${brand.name}</h1><p class="tag">${brand.tagline}</p>
  <div class="swatches">${brand.colors
    .map((c) => `<div class="swatch" style="background:${c};color:${c === "#f5f5f4" || c === "#ecfdf5" || c === "#fdf4ff" || c === "#f8fafc" || c === "#e2e8f0" ? "#111" : "#fff"}">${c}</div>`)
    .join("")}</div>
  <p class="note">Demo brand system · original mark for portfolio</p></div>
  <div class="panel apps">
    <div class="app" style="background:${brand.colors[0]};color:${brand.colors[1]}">PRIMARY LOCKUP</div>
    <div class="mono"><div class="logo" style="width:84px;height:84px">${brand.mark}</div><div class="word">${brand.name}</div></div>
    <div class="app" style="background:${brand.colors[1]};color:${brand.colors[0]}">PACKAGING / SIGNAGE MOCK SLOT</div>
    <div class="app" style="background:${brand.colors[2]};color:#111">ACCENT APPLICATION</div>
  </div></section></body></html>`;

  const variants = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
  body{margin:0;background:#0b0d12;color:#fff;font-family:Inter,sans-serif}
  .board{width:1400px;height:900px;padding:48px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
  .tile{border-radius:28px;padding:28px;display:grid;align-content:space-between;border:1px solid rgba(255,255,255,.08)}
  .logo{width:120px;height:120px}.logo svg{width:100%;height:100%}
  h2{margin:0;font-size:28px} p{opacity:.75}
  </style></head><body><section class="board" data-card>
  <div class="tile" style="background:${brand.colors[0]}"><div class="logo">${brand.mark}</div><div><h2>Dark</h2><p>Primary logo on dark</p></div></div>
  <div class="tile" style="background:${brand.colors[1]};color:#111"><div class="logo">${brand.mark}</div><div><h2>Light</h2><p>Primary logo on light</p></div></div>
  <div class="tile" style="background:${brand.colors[2]};color:#111"><div class="logo">${brand.mark}</div><div><h2>Accent</h2><p>Brand mark on accent field</p></div></div>
  </section></body></html>`;

  const collat = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
  body{margin:0;background:#0b0d12;color:#fff;font-family:Inter,sans-serif}
  .board{width:1400px;height:900px;padding:48px;display:grid;grid-template-columns:1.2fr .8fr;gap:24px}
  .card,.bag,.card2{border-radius:28px;padding:32px;border:1px solid rgba(255,255,255,.08)}
  .card{background:linear-gradient(160deg,${brand.colors[0]},#111)}
  .bag{background:${brand.colors[1]};color:#111;display:grid;place-items:center;text-align:center}
  .card2{background:#111827}
  .logo{width:100px;height:100px;margin-bottom:18px}.logo svg{width:100%;height:100%}
  h1{font-size:42px;margin:0 0 10px} p{opacity:.8;line-height:1.5}
  </style></head><body><section class="board" data-card>
  <div class="card"><div class="logo">${brand.mark}</div><h1>${brand.name}</h1><p>${brand.tagline}</p><p>Business card · demo mock</p></div>
  <div class="bag"><div><div class="logo" style="margin:0 auto 16px">${brand.mark}</div><strong>${brand.name}</strong><p>Shopping bag / packaging face</p></div></div>
  </section></body></html>`;

  await writeFile(join(dir, "board.html"), board);
  await writeFile(join(dir, "variants.html"), variants);
  await writeFile(join(dir, "applications.html"), collat);

  jobs.push(
    { url: `demos/branding/${brand.id}/board.html`, selector: "[data-card]", width: 1400, height: 900, scale: 1, out: `image/portfolio/branding/${brand.id}/cover.webp` },
    { url: `demos/branding/${brand.id}/variants.html`, selector: "[data-card]", width: 1400, height: 900, scale: 1, out: `image/portfolio/branding/${brand.id}/01.webp` },
    { url: `demos/branding/${brand.id}/applications.html`, selector: "[data-card]", width: 1400, height: 900, scale: 1, out: `image/portfolio/branding/${brand.id}/02.webp` },
  );
}

await writeFile("demos/_tools/capture-branding.json", JSON.stringify(jobs, null, 2));
console.log(`Branding jobs ${jobs.length}`);
