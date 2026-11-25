"use strict";

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const projects = [
  {
    id: "cacao",
    title: "CACAO",
    subtitle: "Artisan chocolate packaging",
    accent: "#7c2d12",
    paper: "#f5e6d3",
    ink: "#1c0a00",
    body: " demо-линейка горького шоколада 70%. На упаковке — происхождение какао, состав и ритуал дегустации.",
  },
  {
    id: "bloom",
    title: "BLOOM",
    subtitle: "Beauty packaging system",
    accent: "#be185d",
    paper: "#fff1f2",
    ink: "#4c0519",
    body: "Серия флаконов и коробок для уходовой линии. Акцент на мягкой типографике и цветочных модулях.",
  },
  {
    id: "business-kit",
    title: "BUSINESS KIT",
    subtitle: "Stationery system",
    accent: "#1e3a8a",
    paper: "#eff6ff",
    ink: "#0f172a",
    body: "Комплект: визитка, бланк письма, конверт. Единая сетка, деловой тон, чёткая иерархия.",
  },
  {
    id: "gastro",
    title: "GASTRO",
    subtitle: "Restaurant menu",
    accent: "#365314",
    paper: "#f7fee7",
    ink: "#1a2e05",
    body: "Меню с разделами закусок, основных блюд и десертов. Читаемые цены-заглушки не используются — только названия и описания.",
  },
  {
    id: "interior",
    title: "INTERIOR",
    subtitle: "Furniture catalog spread",
    accent: "#92400e",
    paper: "#fffbeb",
    ink: "#451a03",
    body: "Разворот каталога мебели: обложка коллекции, карточки изделий и материал-сэмплы.",
  },
];

const jobs = [];

for (const project of projects) {
  const dir = join("demos/printing", project.id);
  await mkdir(dir, { recursive: true });

  const cover = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>
  body{margin:0;font-family:Georgia,"Times New Roman",serif;background:#111}
  .sheet{width:1200px;height:900px;background:${project.paper};color:${project.ink};display:grid;grid-template-columns:1.1fr .9fr}
  .left{padding:64px;display:flex;flex-direction:column;justify-content:space-between;border-right:1px solid rgba(0,0,0,.08)}
  .right{padding:48px;background:linear-gradient(160deg,${project.accent},${project.ink});color:#fff;display:grid;align-content:end}
  .eyebrow{letter-spacing:.18em;text-transform:uppercase;font-size:14px;font-family:Inter,Arial,sans-serif}
  h1{font-size:72px;margin:18px 0;line-height:1} p{font-size:22px;line-height:1.5;max-width:28ch}
  .badge{display:inline-flex;padding:10px 14px;border:1px solid currentColor;font-family:Inter,Arial,sans-serif;font-size:13px;letter-spacing:.08em}
  </style></head><body><section class="sheet" data-card>
  <div class="left"><div><div class="eyebrow">Print / Packaging</div><h1>${project.title}</h1><p>${project.subtitle}</p></div>
  <div class="badge">DEMO LAYOUT</div></div>
  <div class="right"><p>${project.body}</p></div>
  </section></body></html>`;

  const detail = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>
  body{margin:0;font-family:Inter,Arial,sans-serif;background:#0b0d12}
  .board{width:1200px;height:900px;padding:40px;display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
  .card{background:${project.paper};color:${project.ink};border-radius:8px;padding:28px;box-shadow:0 20px 50px rgba(0,0,0,.35)}
  h2{margin:0 0 12px;font-family:Georgia,serif;font-size:36px}
  .line{height:1px;background:rgba(0,0,0,.15);margin:18px 0}
  .row{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px dashed rgba(0,0,0,.15);font-size:15px}
  .swatch{height:120px;border-radius:6px;background:linear-gradient(135deg,${project.accent},#fff0)}
  </style></head><body><section class="board" data-card>
  <div class="card"><h2>Детальный макет</h2><p>${project.subtitle}</p><div class="line"></div>
  <div class="row"><span>Модульная сетка</span><strong>12 колонок</strong></div>
  <div class="row"><span>Типографика</span><strong>Serif + Sans</strong></div>
  <div class="row"><span>Носитель</span><strong>Print-ready demo</strong></div>
  </div>
  <div class="card"><div class="swatch"></div><h2 style="margin-top:20px">Фрагмент композиции</h2><p>${project.body}</p></div>
  </section></body></html>`;

  const mock = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>
  body{margin:0;background:#111;font-family:Inter,Arial,sans-serif;color:#fff}
  .stage{width:1200px;height:900px;display:grid;place-items:center;background:radial-gradient(circle at 30% 20%,#333,#0b0d12)}
  .object{width:520px;height:640px;background:${project.paper};color:${project.ink};border-radius:18px;padding:36px;box-shadow:0 40px 80px rgba(0,0,0,.45);transform:rotate(-4deg)}
  .object h1{font-family:Georgia,serif;font-size:54px;margin:0 0 12px}
  .band{margin-top:24px;padding:16px;background:${project.accent};color:#fff;font-weight:700}
  </style></head><body><section class="stage" data-card>
  <div class="object"><div style="letter-spacing:.16em;font-size:12px;opacity:.7">MOCK PRESENTATION</div>
  <h1>${project.title}</h1><p>${project.subtitle}</p><div class="band">Demo carrier visualization</div></div>
  </section></body></html>`;

  await writeFile(join(dir, "cover.html"), cover);
  await writeFile(join(dir, "detail.html"), detail);
  await writeFile(join(dir, "mock.html"), mock);

  jobs.push(
    { url: `demos/printing/${project.id}/cover.html`, selector: "[data-card]", width: 1200, height: 900, scale: 1, out: `image/portfolio/printing/${project.id}/cover.webp` },
    { url: `demos/printing/${project.id}/detail.html`, selector: "[data-card]", width: 1200, height: 900, scale: 1, out: `image/portfolio/printing/${project.id}/01.webp` },
    { url: `demos/printing/${project.id}/mock.html`, selector: "[data-card]", width: 1200, height: 900, scale: 1, out: `image/portfolio/printing/${project.id}/02.webp` },
  );
}

await writeFile("demos/_tools/capture-printing.json", JSON.stringify(jobs, null, 2));
console.log(`Printing jobs ${jobs.length}`);
