"use strict";

import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { join } from "node:path";

const assets = "C:/Users/maksi/.cursor/projects/c-My-work-my-resume/assets";
const refs = [
  ["burger-club-food.jpg", "burger-food.jpg"],
  ["dental-pro-clinic.jpg", "dental-clinic.jpg"],
  ["motor-lab-garage.jpg", "motor-garage.jpg"],
  ["beauty-room-salon.jpg", "beauty-salon.jpg"],
  ["nova-estate-interior.jpg", "nova-interior.jpg"],
];

for (const [from, to] of refs) {
  try {
    await copyFile(join(assets, from), join("demos/_refs", to));
  } catch {
    // optional until generated
  }
}

const projects = [
  {
    id: "burger-club",
    brand: "BURGER CLUB",
    headline: "Сочный бургер за 30 минут",
    support: "Демо-креатив службы доставки еды",
    cta: "Заказать демо-меню",
    accent: "#f97316",
    image: "../../_refs/burger-food.jpg",
  },
  {
    id: "dental-pro",
    brand: "DENTAL PRO",
    headline: "Спокойный визит к стоматологу",
    support: "Демо-креатив клиники без медицинских обещаний",
    cta: "Записаться на консультацию",
    accent: "#38bdf8",
    image: "../../_refs/dental-clinic.jpg",
  },
  {
    id: "motor-lab",
    brand: "MOTOR LAB",
    headline: "Сервис, которому видно качество",
    support: "Демо-креатив автосервиса",
    cta: "Записаться на диагностику",
    accent: "#60a5fa",
    image: "../../_refs/motor-garage.jpg",
  },
  {
    id: "beauty-room",
    brand: "BEAUTY ROOM",
    headline: "Уход, который чувствуется",
    support: "Демо-креатив салона красоты",
    cta: "Выбрать услугу",
    accent: "#f472b6",
    image: "../../_refs/beauty-salon.jpg",
  },
  {
    id: "nova-estate",
    brand: "NOVA ESTATE",
    headline: "Квартира с видом на вечер",
    support: "Демо-креатив недвижимости",
    cta: "Смотреть подборку",
    accent: "#a78bfa",
    image: "../../_refs/nova-interior.jpg",
  },
];

const baseCss = `*{box-sizing:border-box}html,body{margin:0;font-family:"Segoe UI",Inter,Arial,sans-serif;color:#fff}
.frame{position:relative;overflow:hidden;background:#0b0d12}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.shade{position:absolute;inset:0}
.brand{display:inline-flex;padding:10px 14px;border-radius:999px;background:rgba(0,0,0,.45);font-weight:800;letter-spacing:.06em}
.h1{margin:0;font-weight:800;letter-spacing:-.03em;line-height:1.05}
.p{margin:12px 0 0;opacity:.92}
.cta{display:inline-flex;margin-top:22px;padding:14px 22px;border-radius:999px;color:#111;font-weight:800}
.note{margin-top:14px;font-size:14px;opacity:.7}`;

function square(project) {
  return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>${baseCss}
.frame{width:1080px;height:1080px}
.shade{background:linear-gradient(180deg,rgba(0,0,0,.15),rgba(0,0,0,.78))}
.content{position:absolute;left:64px;right:64px;bottom:72px}
.h1{font-size:72px;max-width:12ch}.p{font-size:28px;max-width:24ch}.cta{font-size:24px;background:${project.accent}}
</style></head><body><section class="frame" data-card>
<div class="bg" style="background-image:url('${project.image}')"></div><div class="shade"></div>
<div class="content"><div class="brand">${project.brand}</div>
<h1 class="h1">${project.headline}</h1><p class="p">${project.support}</p>
<span class="cta">${project.cta}</span><p class="note">Демонстрационный креатив · без реальных офферов</p>
</div></section></body></html>`;
}

function stories(project) {
  return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>${baseCss}
.frame{width:1080px;height:1920px}
.shade{background:linear-gradient(180deg,rgba(0,0,0,.2) 20%,rgba(0,0,0,.82) 100%)}
.content{position:absolute;left:72px;right:72px;bottom:140px}
.h1{font-size:88px;max-width:10ch}.p{font-size:34px}.cta{font-size:28px;background:${project.accent}}
.top{position:absolute;top:90px;left:72px;right:72px;display:flex;justify-content:space-between}
</style></head><body><section class="frame" data-card>
<div class="bg" style="background-image:url('${project.image}')"></div><div class="shade"></div>
<div class="top"><div class="brand">${project.brand}</div><div class="brand">STORIES</div></div>
<div class="content"><h1 class="h1">${project.headline}</h1><p class="p">${project.support}</p>
<span class="cta">${project.cta}</span></div></section></body></html>`;
}

function banner(project) {
  return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>${baseCss}
.frame{width:1600px;height:600px}
.shade{background:linear-gradient(90deg,rgba(0,0,0,.82),rgba(0,0,0,.25) 58%,rgba(0,0,0,.45))}
.content{position:absolute;left:70px;top:70px;bottom:70px;width:720px;display:flex;flex-direction:column;justify-content:center}
.h1{font-size:64px;max-width:11ch}.p{font-size:26px}.cta{font-size:24px;background:${project.accent};width:fit-content}
</style></head><body><section class="frame" data-card>
<div class="bg" style="background-image:url('${project.image}')"></div><div class="shade"></div>
<div class="content"><div class="brand">${project.brand}</div>
<h1 class="h1">${project.headline}</h1><p class="p">${project.support}</p>
<span class="cta">${project.cta}</span></div></section></body></html>`;
}

const jobs = [];
for (const project of projects) {
  const dir = join("demos/advertising", project.id);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "square.html"), square(project));
  await writeFile(join(dir, "stories.html"), stories(project));
  await writeFile(join(dir, "banner.html"), banner(project));

  jobs.push(
    {
      url: `demos/advertising/${project.id}/square.html`,
      selector: "[data-card]",
      width: 1080,
      height: 1080,
      scale: 1,
      out: `image/portfolio/advertising/${project.id}/cover.webp`,
    },
    {
      url: `demos/advertising/${project.id}/stories.html`,
      selector: "[data-card]",
      width: 1080,
      height: 1920,
      scale: 1,
      out: `image/portfolio/advertising/${project.id}/01.webp`,
    },
    {
      url: `demos/advertising/${project.id}/banner.html`,
      selector: "[data-card]",
      width: 1600,
      height: 600,
      scale: 1,
      out: `image/portfolio/advertising/${project.id}/02.webp`,
    },
  );
}

await writeFile("demos/_tools/capture-advertising.json", JSON.stringify(jobs, null, 2));
console.log(`Advertising jobs: ${jobs.length}`);
