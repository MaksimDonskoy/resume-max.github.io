"use strict";

import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const categories = [
  "marketplace",
  "advertising",
  "ai-photo",
  "web-design",
  "branding",
  "printing",
  "web-development",
  "bots",
  "automation",
  "mobile",
];

function imagesFor(category, slug) {
  const dir = join("image/portfolio", category, slug);
  if (!existsSync(dir)) return { cover: null, images: [] };
  const files = readdirSync(dir)
    .filter((f) => /\.webp$/i.test(f))
    .sort((a, b) => {
      if (a.startsWith("cover")) return -1;
      if (b.startsWith("cover")) return 1;
      return a.localeCompare(b, "en", { numeric: true });
    })
    .map((f) => `image/portfolio/${category}/${slug}/${f}`);
  const cover = files.find((f) => f.endsWith("/cover.webp")) || files[0] || null;
  return { cover, images: files };
}

function project(def) {
  const media = imagesFor(def.category, def.slug);
  const minImages = 3;
  const hasCover = Boolean(media.cover);
  const enough = media.images.length >= minImages;
  const published = hasCover && enough && def.forceDraft !== true;
  return {
    id: `${def.category === "web-development" ? "web-development" : def.category}-${def.slug}`.replace(
      `${def.category}-${def.category}-`,
      `${def.category}-`,
    ).replace(/^marketplace-/, "marketplace-")
      .replace(/^advertising-/, "advertising-")
      .replace(/^ai-photo-/, "ai-photo-")
      .replace(/^web-design-/, "web-design-")
      .replace(/^branding-/, "branding-")
      .replace(/^printing-/, "printing-")
      .replace(/^web-development-/, "web-development-")
      .replace(/^bots-/, "bots-")
      .replace(/^automation-/, "automation-")
      .replace(/^mobile-/, "mobile-"),
    category: def.category,
    title: def.title.en,
    description: def.description.en,
    task: def.task.en,
    solution: def.solution.en,
    cover: media.cover,
    images: media.images,
    technologies: def.technologies,
    projectType: "demo",
    projectUrl: def.projectUrl || null,
    featured: Boolean(def.featured),
    published,
    translations: {
      ru: {
        title: def.title.ru,
        description: def.description.ru,
        task: def.task.ru,
        solution: def.solution.ru,
      },
      de: {
        title: def.title.de,
        description: def.description.de,
        task: def.task.de,
        solution: def.solution.de,
      },
      fr: {
        title: def.title.fr,
        description: def.description.fr,
        task: def.task.fr,
        solution: def.solution.fr,
      },
    },
  };
}

const t = (en, ru, de, fr) => ({ en, ru, de, fr });

const defs = [
  // MARKETPLACE
  {
    category: "marketplace",
    slug: "botanica",
    featured: true,
    title: t("BOTANICA", "BOTANICA", "BOTANICA", "BOTANICA"),
    description: t(
      "Marketplace card system for a botanical haircare serum with Russian infographics.",
      "Система карточек маркетплейса для ботанической сыворотки для волос с русскоязычной инфографикой.",
      "Marketplace-Kartensystem für ein botanisches Haanserum mit russischer Infografik.",
      "Système de fiches marketplace pour un sérum capillaire botanique avec infographie en russe.",
    ),
    task: t(
      "Design a conversion-focused product card set for Wildberries/Ozon style listings.",
      "Спроектировать набор карточек товара в стиле Wildberries/Ozon с акцентом на понятность и конверсию.",
      "Ein conversion-starkes Produktkartenset im Stil von Wildberries/Ozon gestalten.",
      "Concevoir un set de fiches produit orienté conversion façon Wildberries/Ozon.",
    ),
    solution: t(
      "Built a 5-slide demo set: hero shot, benefits, specs, usage steps and lifestyle frame around one consistent product look. Specs are demonstrative.",
      "Собран демо-набор из 5 слайдов: обложка, преимущества, характеристики, использование и имидж. Параметры демонстрационные.",
      "5 Demo-Slides: Cover, Vorteile, Specs, Anwendung und Image. Angaben sind demonstrativ.",
      "Set démo de 5 slides : couverture, avantages, specs, usage et image. Données démonstratives.",
    ),
    technologies: ["Adobe Photoshop", "AI product photography", "Infographic layout"],
  },
  {
    category: "marketplace",
    slug: "pulse",
    featured: true,
    title: t("PULSE", "PULSE", "PULSE", "PULSE"),
    description: t(
      "Tech marketplace visuals for wireless earbuds with clear benefit and spec slides.",
      "Технологичные карточки маркетплейса для TWS-наушников с слайдами преимуществ и характеристик.",
      "Tech-Marketplace-Visuals für TWS-Kopfhörer mit Vorteils- und Spec-Slides.",
      "Visuels marketplace tech pour écouteurs TWS avec slides avantages et specs.",
    ),
    task: t(
      "Create a coherent product presentation for a graphite earbud kit.",
      "Создать целостную презентацию комплекта наушников в графитовом корпусе.",
      "Eine kohärente Produktpräsentation für ein Graphit-Earbud-Set erstellen.",
      "Créer une présentation produit cohérente pour un kit d’écouteurs graphite.",
    ),
    solution: t(
      "Matched product photography with structured Russian UI overlays for marketplace browsing.",
      "Согласованы предметные кадры и структурированные русские UI-оверлеи для карточки.",
      "Produktfotos mit strukturierten russischen UI-Overlays kombiniert.",
      "Photos produit associées à des overlays UI russes structurés.",
    ),
    technologies: ["Product photography", "Typographic layout", "Marketplace UX"],
  },
  {
    category: "marketplace",
    slug: "elara",
    featured: true,
    title: t("ÉLARA", "ÉLARA", "ÉLARA", "ÉLARA"),
    description: t(
      "Fashion marketplace cards for a soft leather women’s bag.",
      "Fashion-карточки маркетплейса для мягкой женской сумки.",
      "Fashion-Marketplace-Karten für eine weiche Damentasche.",
      "Fiches marketplace mode pour un sac femme en cuir souple.",
    ),
    task: t(
      "Present the bag with premium softness and practical feature hierarchy.",
      "Показать сумку через премиальную фактуру и понятную иерархию преимуществ.",
      "Die Tasche über Premium-Haptik und klare Vorteilshierarchie zeigen.",
      "Présenter le sac via une texture premium et une hiérarchie claire des bénéfices.",
    ),
    solution: t(
      "Warm lifestyle product shots plus benefit/spec/usage slides in one visual language.",
      "Тёплые предметные кадры плюс слайды преимуществ/характеристик/использования в едином стиле.",
      "Warme Produktshots plus Vorteils-/Spec-/Nutzungs-Slides in einer Sprache.",
      "Shots produit chaleureux plus slides bénéfices/specs/usage dans un même langage.",
    ),
    technologies: ["Fashion product photo", "Infographic design", "Color grading"],
  },
  {
    category: "marketplace",
    slug: "tea-home",
    featured: true,
    title: t("TEA HOME", "TEA HOME", "TEA HOME", "TEA HOME"),
    description: t(
      "Warm lifestyle marketplace set for a glass teapot tea kit.",
      "Тёплый lifestyle-набор карточек для стеклянного чайного комплекта.",
      "Warmes Lifestyle-Kartenset für ein gläsernes Tee-Set.",
      "Set marketplace lifestyle pour un service à thé en verre.",
    ),
    task: t(
      "Sell the ritual of tea, not only the object.",
      "Продать ритуал чаепития, а не только предмет.",
      "Das Teeritual verkaufen, nicht nur das Objekt.",
      "Vendre le rituel du thé, pas seulement l’objet.",
    ),
    solution: t(
      "Hero still life with amber tea plus informative Russian slides for kit contents and use.",
      "Hero-натюрморт с янтарным чаем и информативные русские слайды состава и использования.",
      "Hero-Stillleben mit Bernsteintee plus informative russische Slides.",
      "Nature morte hero au thé ambré plus slides russes informatives.",
    ),
    technologies: ["Lifestyle photography", "Packaging storytelling", "Marketplace layout"],
  },
  {
    category: "marketplace",
    slug: "atlet",
    featured: true,
    title: t("ATLET", "ATLET", "ATLET", "ATLET"),
    description: t(
      "Energetic marketplace cards for a home/gym sports accessory kit.",
      "Энергичные карточки маркетплейса для спортивного набора дома/зала.",
      "Energetische Marketplace-Karten für ein Sport-Zubehörset.",
      "Fiches marketplace énergiques pour un kit d’accessoires sport.",
    ),
    task: t(
      "Show training utility quickly on a marketplace thumbnail and gallery.",
      "Быстро показать пользу для тренировок на превью и в галерее.",
      "Trainingnutzen schnell auf Thumbnail und Galerie zeigen.",
      "Montrer vite l’utilité entraînement sur miniature et galerie.",
    ),
    solution: t(
      "Dark athletic staging with lime accents and structured benefit/spec/use slides.",
      "Тёмная спортивная постановка с лаймовыми акцентами и слайдами пользы/характеристик/сценария.",
      "Dunkle Sport-Inszenierung mit Lime-Akzenten und strukturierten Slides.",
      "Mise en scène sportive sombre avec accents lime et slides structurés.",
    ),
    technologies: ["Sports product photo", "Infographics", "Visual hierarchy"],
  },
];

// Continue adding remaining categories in a compact but unique way
const more = [];

function pushAdv(slug, brand, enDesc, ruDesc, tech) {
  more.push({
    category: "advertising",
    slug,
    featured: true,
    title: t(brand, brand, brand, brand),
    description: t(enDesc, ruDesc, enDesc, enDesc),
    task: t(
      `Create square, Stories and banner demo creatives for ${brand}.`,
      `Собрать квадратный, Stories и banner демо-креативы для ${brand}.`,
      `Square-, Stories- und Banner-Demo-Creatives für ${brand} erstellen.`,
      `Créer des créatifs démo carré, Stories et bannière pour ${brand}.`,
    ),
    solution: t(
      "Photo-led layouts with Russian headline, supporting line and CTA, clearly marked as demo (no fake discounts or medical claims).",
      "Фото-driven макеты с русским заголовком, поддержкой и CTA; явно помечены как демо (без фиктивных скидок и мед.обещаний).",
      "Foto-Layouts mit russischer Headline und CTA, klar als Demo markiert.",
      "Layouts photo avec titre russe et CTA, clairement marqués démo.",
    ),
    technologies: tech,
  });
}

pushAdv("burger-club", "BURGER CLUB", "Food delivery ad set with square, Stories and horizontal banner.", "Рекламный набор доставки еды: квадрат, Stories и горизонтальный баннер.", ["Campaign layout", "Food photography", "Typography"]);
pushAdv("dental-pro", "DENTAL PRO", "Clinic advertising concepts without medical promises.", "Рекламные концепции клиники без медицинских обещаний.", ["Healthcare creative", "Layout design", "Photo art direction"]);
pushAdv("motor-lab", "MOTOR LAB", "Auto service creatives for square, Stories and banner formats.", "Креативы автосервиса для square, Stories и banner.", ["Automotive creative", "Typographic hierarchy", "Photo compositing"]);
pushAdv("beauty-room", "BEAUTY ROOM", "Beauty salon campaign visuals across three formats.", "Кампания салона красоты в трёх форматах.", ["Beauty advertising", "Stories design", "Brand voice"]);
pushAdv("nova-estate", "NOVA ESTATE", "Real-estate advertising concepts for premium apartments.", "Рекламные концепции недвижимости для премиальных квартир.", ["Real-estate creative", "Banner design", "Art direction"]);

function pushPhoto(slug, brand, subjectRu, subjectEn) {
  more.push({
    category: "ai-photo",
    slug,
    featured: true,
    title: t(brand, brand, brand, brand),
    description: t(
      `AI-assisted commercial photoshoot for ${subjectEn}: studio, lifestyle and detail frames.`,
      `Нейрофотосессия для ${subjectRu}: студия, lifestyle и детальный кадр.`,
      `KI-gestütztes kommerzielles Fotoshooting für ${subjectEn}.`,
      `Séance photo commerciale assistée par IA pour ${subjectEn}.`,
    ),
    task: t(
      "Produce realistic product imagery with consistent materials and lighting.",
      "Получить реалистичные предметные кадры с согласованными материалами и светом.",
      "Realistische Produktbilder mit konsistenten Materialien und Licht erzeugen.",
      "Produire des images produit réalistes avec matières et lumière cohérentes.",
    ),
    solution: t(
      "Generated original studio, environment and detail photographs for a demo portfolio set.",
      "Сгенерированы оригинальные студийный, средовой и детальный кадры для демо-портфолио.",
      "Originale Studio-, Umfeld- und Detailfotos für ein Demo-Portfolio erzeugt.",
      "Photos studio, environnement et détail originales générées pour un portfolio démo.",
    ),
    technologies: ["AI image generation", "Commercial lighting direction", "Retouch workflow"],
  });
}

pushPhoto("ambre", "AMBRE", "парфюмерии", "fragrance");
pushPhoto("urban-step", "URBAN STEP", "спортивной обуви", "running footwear");
pushPhoto("lumiere", "LUMIÈRE", "ювелирного кольца", "fine jewelry");
pushPhoto("nord-skin", "NORD SKIN", "уходовой косметики", "skincare");
pushPhoto("fresh-berry", "FRESH BERRY", "ягодного десерта", "berry dessert");

const webDesign = [
  ["forma", "FORMA", "Architecture studio website with dark UI and lime accents.", "Сайт архитектурной студии: тёмный UI и лаймовые акценты.", "demos/web-design/forma/index.html"],
  ["medica", "MEDICA", "Medical clinic website concept with calm clinical UI.", "Концепт сайта медклиники со спокойным клиническим UI.", "demos/web-design/medica/index.html"],
  ["mono", "MONO", "Editorial fashion e-commerce web design concept.", "Editorial-концепт интернет-магазина одежды.", "demos/web-design/mono/index.html"],
  ["finance-pro", "FINANCE PRO", "Fintech marketing site and dashboard screen concept.", "Финтех-сайт и экран дашборда.", "demos/web-design/finance-pro/index.html"],
  ["travel-go", "TRAVEL GO", "Travel booking platform UI concept.", "Концепт UI туристической платформы бронирования.", "demos/web-design/travel-go/index.html"],
];

for (const [slug, brand, en, ru, url] of webDesign) {
  more.push({
    category: "web-design",
    slug,
    featured: true,
    projectUrl: url,
    title: t(brand, brand, brand, brand),
    description: t(en, ru, en, en),
    task: t(
      "Design a distinctive first screen, inner view and mobile adaptation.",
      "Спроектировать выразительный первый экран, внутренний вид и мобильную адаптацию.",
      "Einen markanten First Screen, Innenansicht und Mobile-Anpassung gestalten.",
      "Concevoir un premier écran distinctif, une vue interne et une adaptation mobile.",
    ),
    solution: t(
      "Hand-coded HTML/CSS mockups with real readable UI copy, then captured as portfolio screenshots. Interactive demo available locally.",
      "Ручные HTML/CSS-макеты с читаемым UI-текстом и скриншоты для портфолио. Локальная демо-страница доступна.",
      "Handcodierte HTML/CSS-Mockups mit lesbarem UI-Text und Screenshots. Lokale Demo verfügbar.",
      "Maquettes HTML/CSS avec UI lisible et captures. Démo locale disponible.",
    ),
    technologies: ["HTML", "CSS", "UI design systems", "Responsive layout"],
  });
}

const branding = [
  ["nord-coffee", "NORD COFFEE", "Coffee brand identity with cup-inspired mark and warm stone palette."],
  ["green-lab", "GREEN LAB", "Eco science brand system with leaf-lab symbol and green palette."],
  ["velocity", "VELOCITY", "Sport brand identity with sharp motion mark and red accent."],
  ["aurel", "AUREL", "Beauty brand identity with radiant mark and violet palette."],
  ["vector", "VECTOR", "Technology brand identity with geometric vector mark and cyan accent."],
];

for (const [slug, brand, en] of branding) {
  more.push({
    category: "branding",
    slug,
    featured: true,
    projectUrl: `demos/branding/${slug}/logo.svg`,
    title: t(brand, brand, brand, brand),
    description: t(en, en, en, en),
    task: t(
      "Develop an original logo, color system, type direction and application boards.",
      "Разработать оригинальный логотип, цвет, типографику и борды применения.",
      "Originales Logo, Farbe, Typo und Anwendungsboards entwickeln.",
      "Développer un logo original, couleurs, typo et planches d’application.",
    ),
    solution: t(
      "Created unique SVG marks and HTML identity boards, then exported presentation frames.",
      "Созданы уникальные SVG-знаки и HTML-борды айдентики, затем экспорт презентационных кадров.",
      "Einzigartige SVG-Marks und HTML-Identity-Boards erstellt und exportiert.",
      "Signes SVG uniques et planches d’identité HTML créés puis exportés.",
    ),
    technologies: ["SVG", "Brand systems", "Presentation design"],
  });
}

const printing = [
  ["cacao", "CACAO", "Artisan chocolate packaging layout system."],
  ["bloom", "BLOOM", "Beauty packaging and box design system."],
  ["business-kit", "BUSINESS KIT", "Corporate stationery set: card, letterhead language, envelope logic."],
  ["gastro", "GASTRO", "Restaurant menu editorial layout without price lists."],
  ["interior", "INTERIOR", "Furniture catalog spread concept."],
];

for (const [slug, brand, en] of printing) {
  more.push({
    category: "printing",
    slug,
    featured: true,
    title: t(brand, brand, brand, brand),
    description: t(en, en, en, en),
    task: t(
      "Prepare print-ready demo layouts with readable hierarchy and carrier presentation.",
      "Подготовить demo print-макеты с читаемой иерархией и подачей на носителе.",
      "Druckreife Demo-Layouts mit klarer Hierarchie und Trägerpräsentation vorbereiten.",
      "Préparer des maquettes print démo avec hiérarchie lisible et présentation support.",
    ),
    solution: t(
      "Designed cover, detail and mock presentation frames as portfolio evidence.",
      "Собраны обложка, детальный вид и mock-презентация как доказательства в портфолио.",
      "Cover, Detail und Mock-Präsentation als Portfolio-Nachweis erstellt.",
      "Couverture, détail et mock de présentation créés pour le portfolio.",
    ),
    technologies: ["Editorial layout", "Packaging design", "Print composition"],
  });
}

const webDev = [
  ["auto-import", "AUTO IMPORT", "Interactive car-import calculator with demo coefficients.", "Интерактивный калькулятор ввоза авто с демо-коэффициентами."],
  ["build-house", "BUILD HOUSE", "Construction company site with local-only lead form validation.", "Сайт строительной компании с локальной валидацией заявки."],
  ["tech-store", "TECH STORE", "Electronics store demo with filters and cart totals.", "Демо магазина электроники с фильтрами и корзиной."],
  ["digital-space", "DIGITAL SPACE", "IT agency landing with interactive sections.", "Лендинг IT-агентства с интерактивными секциями."],
  ["booking-pro", "BOOKING PRO", "Booking flow for service, date and time with local confirmation.", "Сценарий бронирования услуги, даты и времени с локальным подтверждением."],
];

for (const [slug, brand, en, ru] of webDev) {
  more.push({
    category: "web-development",
    slug,
    featured: true,
    projectUrl: `demos/web-development/${slug}/index.html`,
    title: t(brand, brand, brand, brand),
    description: t(en, ru, en, en),
    task: t(
      "Ship a working frontend demonstration of the business scenario without backend side effects.",
      "Сделать рабочую frontend-демонстрацию бизнес-сценария без backend side effects.",
      "Eine funktionierende Frontend-Demo ohne Backend-Seiteneffekte liefern.",
      "Livrer une démo frontend fonctionnelle sans effets de bord backend.",
    ),
    solution: t(
      "Vanilla HTML/CSS/JS demo with interactive controls. Screenshots document key states; no real payments or submissions.",
      "Vanilla HTML/CSS/JS демо с интерактивом. Скриншоты ключевых состояний; без реальных платежей и отправок.",
      "Vanilla HTML/CSS/JS-Demo mit Interaktion. Screenshots der Zustände; keine echten Zahlungen.",
      "Démo HTML/CSS/JS vanilla interactive. Captures des états; aucun paiement réel.",
    ),
    technologies: ["HTML", "CSS", "JavaScript", "UX prototyping"],
  });
}

const bots = [
  ["shop-bot", "SHOP BOT", "Telegram-like shop bot demo with catalog and local checkout simulation."],
  ["booking-bot", "BOOKING BOT", "Appointment booking bot demo with slot selection."],
  ["support-ai", "SUPPORT AI", "Support chatbot demo with FAQ-style branching."],
  ["subscribe-bot", "SUBSCRIBE BOT", "Subscription bot demo with plan selection flow."],
  ["order-track", "ORDER TRACK", "Order tracking bot demo with status updates."],
];

for (const [slug, brand, en] of bots) {
  more.push({
    category: "bots",
    slug,
    featured: true,
    projectUrl: `demos/bots/${slug}/index.html`,
    title: t(brand, brand, brand, brand),
    description: t(en, en, en, en),
    task: t(
      "Simulate a Telegram chat scenario with working reply buttons and readable messages.",
      "Смоделировать Telegram-сценарий с рабочими кнопками и читаемыми сообщениями.",
      "Telegram-Szenario mit funktionierenden Buttons und lesbaren Nachrichten simulieren.",
      "Simuler un scénario Telegram avec boutons fonctionnels et messages lisibles.",
    ),
    solution: t(
      "Local web chat prototype (not connected to Telegram API). Screenshots show start, mid-flow and result states.",
      "Локальный web-прототип чата (без Telegram API). Скриншоты старта, середины и результата.",
      "Lokaler Web-Chat-Prototyp (ohne Telegram-API). Screenshots von Start, Mitte und Resultat.",
      "Prototype web local (sans API Telegram). Captures début, milieu et résultat.",
    ),
    technologies: ["HTML", "CSS", "JavaScript", "Conversation design"],
  });
}

const automation = [
  ["data-flow", "DATA FLOW", "Catalog processing dashboard with filters, job table and demo run."],
  ["price-watch", "PRICE WATCH", "Competitor price monitoring panel with statuses and charts."],
  ["stock-sync", "STOCK SYNC", "Inventory sync console with demo operations log."],
  ["crm-connect", "CRM CONNECT", "CRM integration board with pipeline statuses."],
  ["ai-content", "AI CONTENT", "Content automation desk with task queue simulation."],
];

for (const [slug, brand, en] of automation) {
  more.push({
    category: "automation",
    slug,
    featured: true,
    projectUrl: `demos/automation/${slug}/index.html`,
    title: t(brand, brand, brand, brand),
    description: t(en, en, en, en),
    task: t(
      "Demonstrate a business operations panel with tables, filters and simulated process runs.",
      "Показать операционную панель: таблицы, фильтры и имитацию запусков процессов.",
      "Ein Operations-Panel mit Tabellen, Filtern und simulierten Runs zeigen.",
      "Montrer un panel opérations avec tableaux, filtres et runs simulés.",
    ),
    solution: t(
      "Interactive local dashboard (demo data only, no real CRM/API accounts). Screenshots capture primary workflows.",
      "Интерактивный локальный дашборд (только демо-данные, без реальных CRM/API). Скриншоты ключевых сценариев.",
      "Interaktives lokales Dashboard (nur Demodaten). Screenshots der Kernflows.",
      "Dashboard local interactif (données démo uniquement). Captures des parcours clés.",
    ),
    technologies: ["HTML", "CSS", "JavaScript", "Dashboard UX"],
  });
}

const mobile = [
  ["fit-track", "FIT TRACK", "Fitness tracking mobile prototype with activity, workout and profile screens."],
  ["money-flow", "MONEY FLOW", "Personal finance mobile prototype with balances and transactions."],
  ["food-go", "FOOD GO", "Food delivery mobile prototype with menu and cart flow."],
  ["task-space", "TASK SPACE", "Task management mobile prototype with boards and details."],
  ["city-guide", "CITY GUIDE", "City guide mobile prototype with places and routes."],
];

for (const [slug, brand, en] of mobile) {
  more.push({
    category: "mobile",
    slug,
    featured: true,
    projectUrl: `demos/mobile/${slug}/index.html`,
    title: t(brand, brand, brand, brand),
    description: t(en, en, en, en),
    task: t(
      "Build a high-detail mobile web prototype with at least three navigable screens.",
      "Собрать детальный mobile web-прототип минимум с тремя экранами и навигацией.",
      "Ein detailliertes Mobile-Web-Prototyp mit mindestens drei Screens bauen.",
      "Construire un prototype web mobile détaillé avec au moins trois écrans.",
    ),
    solution: t(
      "Vanilla multi-screen prototype (not a published native app). Screenshots from mobile viewport document the flow.",
      "Vanilla multi-screen прототип (не опубликованное native-приложение). Скриншоты mobile viewport.",
      "Vanilla-Mehrscreen-Prototyp (keine native App). Screenshots im Mobile-Viewport.",
      "Prototype multi-écrans vanilla (pas une app native publiée). Captures viewport mobile.",
    ),
    technologies: ["HTML", "CSS", "JavaScript", "Mobile UX"],
  });
}

const allDefs = [...defs, ...more];

// Fix IDs to match prior scheme used in site
function makeId(def) {
  if (def.category === "marketplace") return `marketplace-${def.slug}`;
  if (def.category === "advertising") return def.slug.includes("-") ? def.slug : `${def.slug}`;
  // Prefer human ids matching folders: botanica already marketplace-botanica
  const mapSpecial = {
    "tea-home": "marketplace-tea-home",
  };
  return `${def.category}-${def.slug}`;
}

const projects = allDefs.map((def) => {
  const p = project(def);
  p.id = makeId(def);
  // normalize known ids from previous package
  const idMap = {
    "marketplace-botanica": "marketplace-botanica",
    "marketplace-pulse": "marketplace-pulse",
    "marketplace-elara": "marketplace-elara",
    "marketplace-tea-home": "marketplace-tea-home",
    "marketplace-atlet": "marketplace-atlet",
    "advertising-burger-club": "advertising-burger-club",
    "advertising-dental-pro": "advertising-dental-pro",
    "advertising-motor-lab": "advertising-motor-lab",
    "advertising-beauty-room": "advertising-beauty-room",
    "advertising-nova-estate": "advertising-nova-estate",
  };
  if (def.category === "advertising") p.id = `advertising-${def.slug}`;
  if (def.category === "ai-photo") p.id = `ai-photo-${def.slug}`;
  if (def.category === "web-design") p.id = `web-design-${def.slug}`;
  if (def.category === "branding") p.id = `branding-${def.slug}`;
  if (def.category === "printing") p.id = `printing-${def.slug}`;
  if (def.category === "web-development") p.id = `web-development-${def.slug}`;
  if (def.category === "bots") p.id = `bots-${def.slug}`;
  if (def.category === "automation") p.id = `automation-${def.slug}`;
  if (def.category === "mobile") p.id = `mobile-${def.slug}`;
  return p;
});

const header = `"use strict";

/**
 * Central portfolio data store.
 * Regenerated after portfolio content overhaul.
 * projectType remains demo. No prices.
 */
`;

const output =
  header +
  `window.PORTFOLIO_CATEGORIES = ${JSON.stringify(categories, null, 2)};\n\n` +
  `window.PORTFOLIO_PROJECTS = ${JSON.stringify(projects, null, 2)};\n`;

writeFileSync("js/portfolio-data.js", output);

const counts = {};
let published = 0;
let drafts = 0;
for (const p of projects) {
  counts[p.category] = counts[p.category] || { total: 0, published: 0, drafts: 0 };
  counts[p.category].total += 1;
  if (p.published) {
    counts[p.category].published += 1;
    published += 1;
  } else {
    counts[p.category].drafts += 1;
    drafts += 1;
  }
}

console.log(JSON.stringify({ total: projects.length, published, drafts, counts }, null, 2));
