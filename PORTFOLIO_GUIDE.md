# Portfolio Guide

How to add projects to the commercial portfolio section without changing the site architecture.

## Overview

1. Put images into the matching category folder under `image/portfolio/`.
2. Add a project object to `js/portfolio-data.js`.
3. Set `published: true` when the project is ready to appear on the site.
4. Refresh the page.

Until at least one project has `published: true`:

- the Portfolio slide is hidden;
- the Portfolio menu item is hidden;
- “View works” buttons in Services stay hidden;
- “Discuss project” buttons remain available.

## Category folders

| Category key | Folder |
|---|---|
| `marketplace` | `image/portfolio/marketplace/` |
| `advertising` | `image/portfolio/advertising/` |
| `ai-photo` | `image/portfolio/ai-photo/` |
| `web-design` | `image/portfolio/web-design/` |
| `branding` | `image/portfolio/branding/` |
| `printing` | `image/portfolio/printing/` |
| `web-development` | `image/portfolio/web-development/` |
| `bots` | `image/portfolio/bots/` |
| `automation` | `image/portfolio/automation/` |
| `mobile` | `image/portfolio/mobile/` |

Recommended image practices:

- Use `.webp` or `.jpg` for photos and `.png` when transparency is needed.
- Keep a strong cover image; it is shown in the grid and opens first in the modal.
- Prefer optimized files (roughly 1600px on the long side for gallery images).
- Name files clearly, for example `cover.webp`, `01.webp`, `02.webp`.

## Project fields

Required / expected fields in `window.PORTFOLIO_PROJECTS`:

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique id, for example `wb-card-tea-01` |
| `category` | string | One of the category keys above |
| `title` | string | Default title (usually English) |
| `description` | string | Short card summary |
| `task` | string | Task description |
| `solution` | string | Solution description |
| `cover` | string | Path to cover image |
| `images` | string[] | Gallery images (cover may be omitted; it is added automatically if missing) |
| `technologies` | string[] | Tools and technologies |
| `projectType` | string | `commercial`, `demo`, or `personal` |
| `projectUrl` | string \| null | Public project URL, or `null` |
| `featured` | boolean | Reserved for future highlighting |
| `published` | boolean | `true` makes the project visible |
| `translations` | object | Optional overrides for `en`, `ru`, `de`, `fr` |

Do not add `price`, `cost`, or `budget`.

## Example entry

```js
window.PORTFOLIO_PROJECTS = [
  {
    id: "marketplace-tea-set",
    category: "marketplace",
    title: "Tea set marketplace card",
    description: "Main image and infographic slides for a marketplace product card.",
    task: "Prepare a complete card design for a tea set listing.",
    solution: "Designed a cover image and supporting slides with clear product benefits.",
    cover: "image/portfolio/marketplace/tea-set-cover.webp",
    images: [
      "image/portfolio/marketplace/tea-set-cover.webp",
      "image/portfolio/marketplace/tea-set-01.webp",
      "image/portfolio/marketplace/tea-set-02.webp",
    ],
    technologies: ["Photoshop", "Illustrator"],
    projectType: "commercial",
    projectUrl: null,
    featured: true,
    published: true,
    translations: {
      ru: {
        title: "Карточка чайного набора",
        description: "Главное изображение и инфографика для карточки товара.",
        task: "Подготовить полное оформление карточки чайного набора.",
        solution: "Собрал обложку и дополнительные слайды с понятными преимуществами товара.",
      },
      de: {
        title: "Marketplace-Karte für Tee-Set",
        description: "Hauptbild und Infografik-Slides für eine Produktkarte.",
        task: "Komplettes Kartendesign für ein Tee-Set erstellen.",
        solution: "Cover und Zusatzslides mit klaren Produktvorteilen gestaltet.",
      },
      fr: {
        title: "Fiche marketplace pour un set de thé",
        description: "Image principale et slides d’infographie pour une fiche produit.",
        task: "Préparer une fiche complète pour un set de thé.",
        solution: "Conception de la couverture et des slides complémentaires avec les avantages du produit.",
      },
    },
  },
];
```

## Translations

- UI labels live in `js/i18n.js` and already cover portfolio filters, modal texts, and category names.
- Project-specific texts should be stored in the project `translations` object.
- If a language override is missing, the default `title`, `description`, `task`, and `solution` fields are used.

Useful translation keys already prepared:

- `portfolio.filter.all`
- `portfolio.category.*`
- `portfolio.type.commercial` / `demo` / `personal`
- `portfolio.discussSimilar`

## Publishing checklist

1. Images exist in the correct folder and paths in data match the files.
2. `category` uses an exact supported key.
3. `published` is `true` only for finished projects.
4. No placeholder or stock images from the internet.
5. Open the site locally and verify:
   - Portfolio appears in navigation;
   - the category filter is visible;
   - the Services “View works” button for that category is visible;
   - modal, gallery, Escape, and Telegram CTA work;
   - language switching updates project texts.

## Draft projects

To keep a project in the file without showing it on the site:

```js
published: false
```

## Capacity

Each category can hold many projects. Plan for at least five published works per category over time. There is no maximum limit in the code.

## Files involved

- `js/portfolio-data.js` — project records
- `js/portfolio.js` — rendering, filters, modal, gallery
- `css/commercial.css` — portfolio/services styles
- `image/portfolio/<category>/` — media assets
