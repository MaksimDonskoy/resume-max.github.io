import fs from "node:fs";

const path = new URL("../../js/i18n.js", import.meta.url);
let src = fs.readFileSync(path, "utf8");

const patches = {
  en: {
    "meta.description":
      "Portfolio of Maxim Donskoy — designer and developer: marketplace cards, branding, web, bots, mobile apps, and business automation.",
    "hero.role": "Designer & Developer for digital products and automation",
    "hero.description":
      "Over 7 years I deliver commercial design and full-cycle development: marketplace cards, ads, branding and packaging, websites, bots, mobile apps, and business automation.",
    "about.summary":
      "Designer and developer with 7 years of experience across commercial visuals and digital products. I design marketplace cards, advertising creatives, brand identities, print materials and AI product photography; build websites and mobile apps; create messenger bots; and automate business workflows. Practical problem-solver, fast learner, and reliable collaborator.",
    "about.services":
      "My work covers ten directions: marketplace cards, advertising creatives, AI photoshoots, web design, branding, print and packaging, website development, bots, automation and integrations, and mobile applications — from concept to a finished, usable result.",
    "experience.developerRole": "Designer & Full-Stack Developer",
    "experience.developerPeriod": "2018–2026",
    "experience.commercialDesign": "Commercial Design",
    "experience.commercialDesignDetails":
      "Designed marketplace product cards, advertising creatives, AI product photography, logos and brand systems, print layouts and packaging for e-commerce and service brands.",
    "experience.webDevelopment": "Web Design & Development",
    "experience.webDevelopmentDetails":
      "Designed and built landing pages, corporate sites and web apps; modernized existing projects with React, Vue, Node.js, PHP, Laravel, Next.js, WordPress and Tilda; improved performance, SEO and analytics.",
    "experience.automation": "Automation & Integrations",
    "experience.automationDetails":
      "Built parsers, API integrations, store and CRM workflows, data pipelines and AI-assisted content automation to reduce manual work.",
    "skills.design": "Design",
    "skills.photoshop": "Adobe Photoshop",
    "skills.illustrator": "Adobe Illustrator",
    "skills.aiImagery": "AI product photography",
    "skills.marketplaceGraphics": "Marketplace infographics",
    "skills.brandIdentity": "Brand identity",
    "skills.printPackaging": "Print & packaging",
    "accessibility.designSkills": "Design skills",
    "softSkills.item1":
      "Creative thinking with a conversion- and user-focused approach",
    "softSkills.item4": "Attention to visual detail and brand consistency",
    "contact.description":
      "I work as a freelancer on design and development projects — from marketplace cards and branding to websites, bots and automation. Tell me about your task.",
    "advantages.item1": "Over 7 years across design and development",
    "advantages.item3":
      "End-to-end delivery: from visual concept to working product",
    "advantages.item6":
      "Modern tools and AI in design and development workflows",
    "footer.copyright": "© 2026 Donskoy Maxim",
  },
  ru: {
    "meta.description":
      "Портфолио Максима Донского — дизайнера и разработчика: карточки маркетплейсов, брендинг, веб, боты, мобильные приложения и автоматизация бизнеса.",
    "hero.role": "дизайнер и разработчик цифровых продуктов и автоматизации",
    "hero.description":
      "За 7 лет совмещаю коммерческий дизайн и полную разработку: карточки маркетплейсов, реклама, брендинг и упаковка, сайты, боты, мобильные приложения и автоматизация бизнес-процессов.",
    "about.summary":
      "Дизайнер и разработчик с 7-летним опытом в коммерческих визуалах и цифровых продуктах. Делаю карточки маркетплейсов, рекламные креативы, фирменный стиль, полиграфию и нейрофотосессии; разрабатываю сайты и мобильные приложения; создаю ботов для мессенджеров и автоматизирую бизнес-процессы. Умею находить практичные решения, быстро осваиваю новое и надёжно работаю в команде.",
    "about.services":
      "Работаю по десяти направлениям: карточки маркетплейсов, рекламные креативы, нейрофотосессии, веб-дизайн, брендинг, полиграфия и упаковка, разработка сайтов, боты, автоматизация и интеграции, мобильные приложения — от идеи до готового результата.",
    "experience.developerRole": "Дизайнер и Full-Stack-разработчик",
    "experience.developerPeriod": "2018–2026",
    "experience.commercialDesign": "Коммерческий дизайн",
    "experience.commercialDesignDetails":
      "Проектировал карточки товаров для маркетплейсов, рекламные креативы, нейрофотосессии, логотипы и фирменный стиль, полиграфию и упаковку для e-commerce и сервисных брендов.",
    "experience.webDevelopment": "Веб-дизайн и разработка",
    "experience.webDevelopmentDetails":
      "Проектировал и разрабатывал лендинги, корпоративные сайты и веб-приложения; дорабатывал проекты на React, Vue, Node.js, PHP, Laravel, Next.js, WordPress и Tilda; улучшал производительность, SEO и аналитику.",
    "experience.automation": "Автоматизация и интеграции",
    "experience.automationDetails":
      "Создавал парсеры, API-интеграции, сценарии для магазинов и CRM, пайплайны данных и автоматизацию контента с ИИ, чтобы сокращать ручную работу.",
    "skills.design": "Дизайн",
    "skills.photoshop": "Adobe Photoshop",
    "skills.illustrator": "Adobe Illustrator",
    "skills.aiImagery": "Нейрофотосессии товаров",
    "skills.marketplaceGraphics": "Инфографика для маркетплейсов",
    "skills.brandIdentity": "Фирменный стиль",
    "skills.printPackaging": "Полиграфия и упаковка",
    "accessibility.designSkills": "Навыки дизайна",
    "softSkills.item1":
      "Креативность с фокусом на конверсию и удобство пользователя",
    "softSkills.item4": "Внимание к визуальным деталям и целостности бренда",
    "contact.description":
      "Работаю как фрилансер над дизайн- и dev-задачами — от карточек маркетплейсов и брендинга до сайтов, ботов и автоматизации. Напишите о вашей задаче.",
    "advantages.item1": "Более 7 лет опыта в дизайне и разработке",
    "advantages.item3":
      "Полный цикл: от визуальной концепции до рабочего продукта",
    "advantages.item6": "Современные инструменты и ИИ в дизайне и разработке",
    "footer.copyright": "© 2026 Максим Донской",
  },
  de: {
    "meta.description":
      "Portfolio von Maxim Donskoy — Designer und Entwickler: Marketplace-Karten, Branding, Web, Bots, Mobile Apps und Geschäftsautomatisierung.",
    "hero.role": "Designer & Entwickler für digitale Produkte und Automatisierung",
    "hero.description":
      "Seit 7 Jahren verbinde ich kommerzielles Design und Full-Cycle-Entwicklung: Marketplace-Karten, Werbung, Branding und Packaging, Websites, Bots, Mobile Apps und Geschäftsautomatisierung.",
    "about.summary":
      "Designer und Entwickler mit 7 Jahren Erfahrung in kommerziellen Visuals und digitalen Produkten. Ich gestalte Marketplace-Karten, Werbekreatives, Markenauftritte, Printmaterialien und KI-Produktfotos; entwickle Websites und Mobile Apps; baue Messenger-Bots und automatisiere Geschäftsprozesse. Praxisnah, lernbereit und zuverlässig im Team.",
    "about.services":
      "Mein Angebot umfasst zehn Bereiche: Marketplace-Karten, Werbekreatives, KI-Fotoshootings, Webdesign, Branding, Print und Packaging, Webentwicklung, Bots, Automatisierung und Integrationen sowie Mobile Apps — von der Idee bis zum fertigen Ergebnis.",
    "experience.developerRole": "Designer & Full-Stack-Entwickler",
    "experience.developerPeriod": "2018–2026",
    "experience.commercialDesign": "Kommerzielles Design",
    "experience.commercialDesignDetails":
      "Gestaltung von Marketplace-Produktkarten, Werbekreatives, KI-Produktfotografie, Logos und Markensystemen sowie Printlayouts und Packaging für E-Commerce- und Service-Marken.",
    "experience.webDevelopment": "Webdesign & Entwicklung",
    "experience.webDevelopmentDetails":
      "Konzeption und Umsetzung von Landingpages, Unternehmenswebsites und Web-Apps; Modernisierung bestehender Projekte mit React, Vue, Node.js, PHP, Laravel, Next.js, WordPress und Tilda; Optimierung von Performance, SEO und Analytics.",
    "experience.automation": "Automatisierung & Integrationen",
    "experience.automationDetails":
      "Aufbau von Parsern, API-Integrationen, Shop- und CRM-Workflows, Datenpipelines und KI-gestützter Content-Automatisierung zur Reduktion manueller Arbeit.",
    "skills.design": "Design",
    "skills.photoshop": "Adobe Photoshop",
    "skills.illustrator": "Adobe Illustrator",
    "skills.aiImagery": "KI-Produktfotografie",
    "skills.marketplaceGraphics": "Marketplace-Infografiken",
    "skills.brandIdentity": "Markenidentität",
    "skills.printPackaging": "Print & Packaging",
    "accessibility.designSkills": "Design-Kenntnisse",
    "softSkills.item1":
      "Kreatives Denken mit Fokus auf Conversion und Nutzererlebnis",
    "softSkills.item4": "Augenmerk auf visuelle Details und Markenkonsistenz",
    "contact.description":
      "Ich arbeite als Freelancer an Design- und Entwicklungsprojekten — von Marketplace-Karten und Branding bis zu Websites, Bots und Automatisierung. Erzählen Sie mir von Ihrer Aufgabe.",
    "advantages.item1": "Über 7 Jahre Erfahrung in Design und Entwicklung",
    "advantages.item3":
      "End-to-End: von der visuellen Idee bis zum funktionierenden Produkt",
    "advantages.item6":
      "Moderne Tools und KI in Design- und Entwicklungsprozessen",
    "footer.copyright": "© 2026 Donskoy Maxim",
  },
  fr: {
    "meta.description":
      "Portfolio de Maxim Donskoy — designer et développeur : fiches marketplace, branding, web, bots, apps mobiles et automatisation métier.",
    "hero.role":
      "designer et développeur de produits numériques et d’automatisation",
    "hero.description":
      "Depuis 7 ans, je combine design commercial et développement de bout en bout : fiches marketplace, publicité, branding et packaging, sites, bots, apps mobiles et automatisation métier.",
    "about.summary":
      "Designer et développeur avec 7 ans d’expérience en visuels commerciaux et produits numériques. Je conçois des fiches marketplace, des créatifs publicitaires, des identités de marque, des supports print et des photos produits assistées par IA ; je développe des sites et des apps mobiles ; je crée des bots de messagerie et j’automatise les processus métier. Pragmatique, rapide à apprendre et fiable en équipe.",
    "about.services":
      "Mon travail couvre dix directions : fiches marketplace, créatifs publicitaires, photoshootings IA, web design, branding, print et packaging, développement web, bots, automatisation et intégrations, et applications mobiles — de l’idée au résultat utilisable.",
    "experience.developerRole": "Designer & développeur Full-Stack",
    "experience.developerPeriod": "2018–2026",
    "experience.commercialDesign": "Design commercial",
    "experience.commercialDesignDetails":
      "Conception de fiches produits marketplace, créatifs publicitaires, photographie produit assistée par IA, logos et systèmes de marque, mises en page print et packaging pour le e-commerce et les marques de services.",
    "experience.webDevelopment": "Web design & développement",
    "experience.webDevelopmentDetails":
      "Conception et réalisation de landing pages, sites corporate et applications web ; modernisation de projets existants avec React, Vue, Node.js, PHP, Laravel, Next.js, WordPress et Tilda ; amélioration des performances, du SEO et de l’analytique.",
    "experience.automation": "Automatisation & intégrations",
    "experience.automationDetails":
      "Mise en place de parseurs, d’intégrations API, de workflows boutique/CRM, de pipelines de données et d’automatisation de contenu assistée par IA pour réduire le travail manuel.",
    "skills.design": "Design",
    "skills.photoshop": "Adobe Photoshop",
    "skills.illustrator": "Adobe Illustrator",
    "skills.aiImagery": "Photographie produit assistée par IA",
    "skills.marketplaceGraphics": "Infographies marketplace",
    "skills.brandIdentity": "Identité de marque",
    "skills.printPackaging": "Print & packaging",
    "accessibility.designSkills": "Compétences design",
    "softSkills.item1":
      "Créativité orientée conversion et expérience utilisateur",
    "softSkills.item4":
      "Attention aux détails visuels et à la cohérence de marque",
    "contact.description":
      "Je travaille en freelance sur des projets de design et de développement — des fiches marketplace et du branding aux sites, bots et automatisation. Parlez-moi de votre besoin.",
    "advantages.item1": "Plus de 7 ans d’expérience en design et développement",
    "advantages.item3":
      "Livraison de bout en bout : de l’idée visuelle au produit fonctionnel",
    "advantages.item6":
      "Outils modernes et IA dans les flux de design et de développement",
    "footer.copyright": "© 2026 Donskoy Maxim",
  },
};

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeJsonString(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
}

function patchLang(source, lang, map) {
  const startRe = new RegExp(`\\n\\s*${lang}:\\s*\\{`);
  const startMatch = source.match(startRe);
  if (!startMatch) throw new Error(`lang not found ${lang}`);
  const startIdx = startMatch.index + startMatch[0].length;
  const nextLang = { en: "ru", ru: "de", de: "fr", fr: null }[lang];
  let endIdx;
  if (nextLang) {
    const nextRe = new RegExp(`\\n\\s*${nextLang}:\\s*\\{`);
    const m = source.slice(startIdx).match(nextRe);
    if (!m) throw new Error(`next lang not found for ${lang}`);
    endIdx = startIdx + m.index;
  } else {
    endIdx = source.indexOf("\n  };", startIdx);
    if (endIdx === -1) throw new Error("fr block end not found");
  }

  let block = source.slice(startIdx, endIdx);
  const missing = [];

  for (const [key, value] of Object.entries(map)) {
    const keyRe = new RegExp(
      `("${escapeRegExp(key)}"\\s*:\\s*")(?:\\\\.|[^"\\\\])*(")`
    );
    if (keyRe.test(block)) {
      block = block.replace(keyRe, `$1${escapeJsonString(value)}$2`);
    } else {
      missing.push(key);
      const insertPoint = block.lastIndexOf('\n      "footer.pdf"');
      if (insertPoint === -1) {
        throw new Error(`cannot insert ${key} in ${lang}`);
      }
      const line = `\n      "${key}": "${escapeJsonString(value)}",`;
      block = block.slice(0, insertPoint) + line + block.slice(insertPoint);
    }
  }

  if (missing.length) {
    console.log(`${lang}: inserted ${missing.length} new keys`);
  }

  return source.slice(0, startIdx) + block + source.slice(endIdx);
}

for (const lang of ["en", "ru", "de", "fr"]) {
  src = patchLang(src, lang, patches[lang]);
}

fs.writeFileSync(path, src);
console.log("patched i18n profile copy");
