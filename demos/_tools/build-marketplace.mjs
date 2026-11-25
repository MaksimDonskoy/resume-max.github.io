"use strict";

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const projects = [
  {
    id: "botanica",
    brand: "BOTANICA",
    title: "Сыворотка для волос",
    subtitle: "Восстановление и блеск",
    accent: "#22c55e",
    accentDark: "#14532d",
    product: "../../_refs/botanica-product.jpg",
    benefits: [
      ["🌿", "Растительные активы"],
      ["💧", "Глубокое увлажнение"],
      ["✨", "Видимый блеск"],
      ["🛡️", "Защита структуры"],
    ],
    specs: [
      ["Объём", "100 мл"],
      ["Тип волос", "Повреждённые"],
      ["Текстура", "Лёгкий флюид"],
      ["Аромат", "Травяной"],
    ],
    usage: [
      "Нанесите на влажные волосы по длине",
      "Распределите равномерно без корней",
      "Не смывайте и уложите как обычно",
    ],
    lifestyleNote: "Демо-концепция карточки маркетплейса",
  },
  {
    id: "pulse",
    brand: "PULSE",
    title: "Беспроводные наушники",
    subtitle: "Чистый звук без проводов",
    accent: "#06b6d4",
    accentDark: "#0e7490",
    product: "../../_refs/pulse-product.jpg",
    benefits: [
      ["🎧", "Чистый звук"],
      ["🔋", "До 28 часов"],
      ["📶", "Стабильный Bluetooth"],
      ["🌧️", "Защита от влаги"],
    ],
    specs: [
      ["Тип", "TWS"],
      ["Связь", "Bluetooth 5.3"],
      ["Кейс", "Матовый графит"],
      ["Зарядка", "USB-C"],
    ],
    usage: [
      "Откройте кейс и подключите устройство",
      "Выберите режим прозрачности или шума",
      "Управляйте жестами на корпусе",
    ],
    lifestyleNote: "Демо-концепция карточки маркетплейса",
  },
  {
    id: "elara",
    brand: "ÉLARA",
    title: "Женская сумка",
    subtitle: "Мягкая кожа и точный силуэт",
    accent: "#e11d48",
    accentDark: "#9f1239",
    product: "../../_refs/elara-product.jpg",
    benefits: [
      ["👜", "Мягкая фактура"],
      ["✨", "Фурнитура под золото"],
      ["📐", "Вместительный карман"],
      ["🎀", "Универсальный образ"],
    ],
    specs: [
      ["Материал", "Эко-кожа"],
      ["Цвет", "Пудра"],
      ["Размер", "Средний"],
      ["Ремень", "Регулируемый"],
    ],
    usage: [
      "Подходит для повседневных и вечерних образов",
      "Вмещает планшет и базовые вещи",
      "Ремень регулируется под рост",
    ],
    lifestyleNote: "Демо-концепция карточки маркетплейса",
  },
  {
    id: "tea-home",
    brand: "TEA HOME",
    title: "Чайный набор",
    subtitle: "Стекло, тепло и ритуал",
    accent: "#d97706",
    accentDark: "#92400e",
    product: "../../_refs/teahome-product.jpg",
    benefits: [
      ["🫖", "Жаропрочное стекло"],
      ["🔥", "Равномерный прогрев"],
      ["🍋", "Для чая и травяных сборов"],
      ["🎁", "Готовый подарочный вид"],
    ],
    specs: [
      ["Объём чайника", "800 мл"],
      ["Чашки", "2 шт."],
      ["Материал", "Боросиликат"],
      ["Поднос", "Дерево"],
    ],
    usage: [
      "Прогрейте чайник тёплой водой",
      "Засыпьте заварку и залейте воду",
      "Подавайте на деревянном подносе",
    ],
    lifestyleNote: "Демо-концепция карточки маркетплейса",
  },
  {
    id: "atlet",
    brand: "ATLET",
    title: "Спортивный набор",
    subtitle: "Тренировки дома и в зале",
    accent: "#84cc16",
    accentDark: "#3f6212",
    product: "../../_refs/atlet-product.jpg",
    benefits: [
      ["💪", "Универсальная нагрузка"],
      ["🏠", "Для дома и зала"],
      ["🎒", "Компактное хранение"],
      ["⚡", "Быстрый старт тренировки"],
    ],
    specs: [
      ["Состав", "Ленты + коврик"],
      ["Уровень", "Начинающий+"],
      ["Цвет", "Black / Lime"],
      ["Бутылка", "В комплекте"],
    ],
    usage: [
      "Выберите ленту нужного сопротивления",
      "Разложите коврик на ровной поверхности",
      "Выполните круг из 3–4 упражнений",
    ],
    lifestyleNote: "Демо-концепция карточки маркетплейса",
  },
];

const css = `*{box-sizing:border-box}html,body{margin:0;padding:0;font-family:"Segoe UI",Inter,Arial,sans-serif}
.card{position:relative;width:900px;height:1200px;overflow:hidden;color:#fff;background:#111}
.bg{position:absolute;inset:0;background-size:cover;background-position:center;transform:scale(1.02)}
.shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.18) 0%,rgba(0,0,0,.12) 42%,rgba(0,0,0,.78) 100%)}
.top{position:absolute;top:42px;left:42px;right:42px;display:flex;justify-content:space-between;gap:16px;align-items:flex-start}
.brand{padding:12px 18px;border-radius:999px;background:rgba(0,0,0,.45);backdrop-filter:blur(10px);font-weight:800;letter-spacing:.08em;font-size:22px}
.badge{padding:12px 18px;border-radius:999px;font-weight:800;font-size:20px;color:#06120a}
.content{position:absolute;left:42px;right:42px;bottom:48px}
.kicker{margin:0 0 10px;font-size:22px;font-weight:700;opacity:.92}
.title{margin:0 0 12px;font-size:64px;line-height:1.05;font-weight:800;letter-spacing:-.03em;max-width:16ch}
.sub{margin:0;font-size:28px;line-height:1.35;opacity:.95;max-width:22ch}
.panel{position:absolute;left:42px;right:42px;bottom:48px;padding:28px;border-radius:28px;background:rgba(10,12,16,.72);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.12)}
.panel h2{margin:0 0 18px;font-size:36px}
.list{display:grid;gap:14px;margin:0;padding:0;list-style:none}
.list li{display:grid;grid-template-columns:48px 1fr;gap:14px;align-items:center;font-size:26px}
.icon{display:grid;place-items:center;width:48px;height:48px;border-radius:14px;background:rgba(255,255,255,.08);font-size:24px}
.specs{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.spec{padding:18px;border-radius:18px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08)}
.spec b{display:block;font-size:18px;opacity:.7;margin-bottom:6px;font-weight:600}
.spec span{font-size:26px;font-weight:800}
.note{margin-top:18px;font-size:18px;opacity:.7}
`;

function page({ project, slide, body }) {
  return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>${project.brand} ${slide}</title>
<style>${css}</style></head><body>
<section class="card" data-card>
  <div class="bg" style="background-image:url('${project.product}')"></div>
  <div class="shade"></div>
  ${body}
</section>
</body></html>`;
}

const jobs = [];

for (const project of projects) {
  const dir = join("demos/marketplace", project.id);
  await mkdir(dir, { recursive: true });

  const cover = page({
    project,
    slide: "cover",
    body: `<div class="top"><div class="brand">${project.brand}</div><div class="badge" style="background:${project.accent}">DEMO</div></div>
    <div class="content"><p class="kicker">${project.subtitle}</p><h1 class="title">${project.title}</h1><p class="sub">${project.lifestyleNote}</p></div>`,
  });

  const benefits = page({
    project,
    slide: "01",
    body: `<div class="top"><div class="brand">${project.brand}</div></div>
    <div class="panel"><h2>Преимущества</h2><ul class="list">${project.benefits
      .map(([icon, text]) => `<li><span class="icon">${icon}</span><span>${text}</span></li>`)
      .join("")}</ul></div>`,
  });

  const specs = page({
    project,
    slide: "02",
    body: `<div class="top"><div class="brand">${project.brand}</div></div>
    <div class="panel"><h2>Характеристики</h2><div class="specs">${project.specs
      .map(([label, value]) => `<div class="spec"><b>${label}</b><span>${value}</span></div>`)
      .join("")}</div><p class="note">Демонстрационные параметры концепции</p></div>`,
  });

  const usage = page({
    project,
    slide: "03",
    body: `<div class="top"><div class="brand">${project.brand}</div></div>
    <div class="panel"><h2>Как использовать</h2><ul class="list">${project.usage
      .map((text, index) => `<li><span class="icon">${index + 1}</span><span>${text}</span></li>`)
      .join("")}</ul></div>`,
  });

  const imageSlide = page({
    project,
    slide: "04",
    body: `<div class="top"><div class="brand">${project.brand}</div><div class="badge" style="background:${project.accent}">LOOK</div></div>
    <div class="content"><p class="kicker">Имиджевый слайд</p><h1 class="title">${project.title}</h1><p class="sub">Единый визуальный стиль товара на всех слайдах проекта</p></div>`,
  });

  await writeFile(join(dir, "cover.html"), cover);
  await writeFile(join(dir, "01.html"), benefits);
  await writeFile(join(dir, "02.html"), specs);
  await writeFile(join(dir, "03.html"), usage);
  await writeFile(join(dir, "04.html"), imageSlide);

  for (const [slide, file] of [
    ["cover", "cover.webp"],
    ["01", "01.webp"],
    ["02", "02.webp"],
    ["03", "03.webp"],
    ["04", "04.webp"],
  ]) {
    jobs.push({
      url: `demos/marketplace/${project.id}/${slide}.html`,
      selector: "[data-card]",
      width: 900,
      height: 1200,
      scale: 2,
      out: `image/portfolio/marketplace/${project.id}/${file}`,
      quality: 84,
    });
  }
}

await writeFile("demos/_tools/capture-marketplace.json", JSON.stringify(jobs, null, 2));
console.log(`Built ${projects.length} marketplace projects, ${jobs.length} capture jobs`);
