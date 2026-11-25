"use strict";

import { readFileSync, writeFileSync } from "node:fs";

const code = readFileSync("js/portfolio-data.js", "utf8");
const windowObj = {};
Function("window", code)(windowObj);

const T = {
  "advertising-burger-club": {
    ru: {
      title: "BURGER CLUB",
      description: "Рекламный набор для доставки еды: квадрат, Stories и горизонтальный баннер.",
      task: "Собрать демонстрационные креативы доставки бургеров в трёх форматах без фиктивных скидок.",
      solution: "Сделаны фото-driven макеты с русским заголовком, пояснением и CTA; материалы помечены как демо.",
    },
    de: {
      title: "BURGER CLUB",
      description: "Werbeset für Essenslieferung: Quadrat, Stories und Horizontalbanner.",
      task: "Demo-Creatives für Burger-Lieferung in drei Formaten ohne fiktive Rabatte erstellen.",
      solution: "Foto-Layouts mit russischer Headline, Begleittext und CTA; klar als Demo gekennzeichnet.",
    },
    fr: {
      title: "BURGER CLUB",
      description: "Set publicitaire livraison de repas : carré, Stories et bannière horizontale.",
      task: "Créer des créatifs démo burger en trois formats sans fausses réductions.",
      solution: "Maquettes photo avec titre russe, texte d’appui et CTA ; clairement marquées démo.",
    },
  },
  "advertising-dental-pro": {
    ru: {
      title: "DENTAL PRO",
      description: "Рекламные концепции стоматологической клиники без медицинских обещаний.",
      task: "Подготовить аккуратные креативы клиники в square, Stories и banner.",
      solution: "Собран набор макетов на фото интерьера с спокойным тоном и демо-CTA без медзаявлений.",
    },
    de: {
      title: "DENTAL PRO",
      description: "Werbekonzepte für eine Zahnklinik ohne medizinische Versprechen.",
      task: "Zurückhaltende Klinik-Creatives in Square, Stories und Banner erstellen.",
      solution: "Layouts auf Interior-Fotos mit ruhigem Ton und Demo-CTA ohne Heilversprechen.",
    },
    fr: {
      title: "DENTAL PRO",
      description: "Concepts publicitaires pour clinique dentaire sans promesses médicales.",
      task: "Préparer des créatifs sobres en formats carré, Stories et bannière.",
      solution: "Maquettes sur photo d’intérieur, ton calme et CTA démo sans allégations médicales.",
    },
  },
  "advertising-motor-lab": {
    ru: {
      title: "MOTOR LAB",
      description: "Креативы автосервиса для квадратного, Stories и banner-форматов.",
      task: "Показать сервисный характер бренда через сильный визуал и понятный призыв.",
      solution: "Использована сцена автосервиса и единая типографика кампании в трёх форматах.",
    },
    de: {
      title: "MOTOR LAB",
      description: "Autoservice-Creatives für Square-, Stories- und Bannerformate.",
      task: "Den Service-Charakter der Marke mit starkem Visual und klarem CTA zeigen.",
      solution: "Werkstattmotiv und einheitliche Kampagnentypografie in drei Formaten.",
    },
    fr: {
      title: "MOTOR LAB",
      description: "Créatifs garage auto pour formats carré, Stories et bannière.",
      task: "Montrer le caractère service de la marque avec un visuel fort et un CTA clair.",
      solution: "Scène d’atelier et typographie de campagne cohérente sur trois formats.",
    },
  },
  "advertising-beauty-room": {
    ru: {
      title: "BEAUTY ROOM",
      description: "Кампания салона красоты в трёх рекламных форматах.",
      task: "Сделать премиальные, но сдержанные beauty-креативы для соцсетей и баннера.",
      solution: "Собраны vertical/square/banner макеты на основе салона с мягким акцентом и демо-CTA.",
    },
    de: {
      title: "BEAUTY ROOM",
      description: "Beauty-Salon-Kampagne in drei Werbeformaten.",
      task: "Premium-aber-dezente Beauty-Creatives für Social und Banner erstellen.",
      solution: "Vertical/Square/Banner-Layouts mit Salonmotiv, weichem Akzent und Demo-CTA.",
    },
    fr: {
      title: "BEAUTY ROOM",
      description: "Campagne salon de beauté en trois formats publicitaires.",
      task: "Créer des créatifs beauty premium mais sobres pour social et bannière.",
      solution: "Maquettes vertical/carré/bannière sur motif salon, accent doux et CTA démo.",
    },
  },
  "advertising-nova-estate": {
    ru: {
      title: "NOVA ESTATE",
      description: "Рекламные концепции недвижимости для премиальных квартир.",
      task: "Передать атмосферу вида и интерьера без вымышленных скидок и контактов.",
      solution: "Сделаны креативы на основе вечернего интерьера с заголовком, поддержкой и CTA.",
    },
    de: {
      title: "NOVA ESTATE",
      description: "Immobilien-Werbekonzepte für Premium-Wohnungen.",
      task: "Atmosphäre von Ausblick und Interieur ohne fiktive Rabatte oder Kontakte vermitteln.",
      solution: "Creatives auf Abend-Interieur mit Headline, Support-Text und CTA.",
    },
    fr: {
      title: "NOVA ESTATE",
      description: "Concepts pub immobilier pour appartements premium.",
      task: "Transmettre l’ambiance vue/intérieur sans fausses promos ni contacts fictifs.",
      solution: "Créatifs sur intérieur en soirée avec titre, texte d’appui et CTA.",
    },
  },
  "web-design-forma": {
    ru: {
      title: "FORMA",
      description: "Сайт архитектурной студии: тёмный UI и лаймовые акценты.",
      task: "Спроектировать первый экран, внутреннюю страницу проектов и мобильную версию.",
      solution: "Сверстан HTML/CSS-макет с реальной навигацией и текстами; для портфолио сняты скриншоты, демо доступно локально.",
    },
    de: {
      title: "FORMA",
      description: "Website eines Architekturbüros: dunkles UI mit Lime-Akzenten.",
      task: "First Screen, Projektseite und Mobile-Ansicht gestalten.",
      solution: "HTML/CSS-Mockup mit echter Navigation und Texten; Screenshots fürs Portfolio, lokale Demo verfügbar.",
    },
    fr: {
      title: "FORMA",
      description: "Site d’agence d’architecture : UI sombre et accents lime.",
      task: "Concevoir le premier écran, la page projets et la version mobile.",
      solution: "Maquette HTML/CSS avec navigation et textes réels ; captures portfolio et démo locale.",
    },
  },
  "web-design-medica": {
    ru: {
      title: "MEDICA",
      description: "Концепт сайта медклиники со спокойным светлым UI.",
      task: "Собрать доверительный первый экран и страницу услуг.",
      solution: "Светлая дизайн-система, читаемые блоки услуг и адаптив; скриншоты и локальное демо.",
    },
    de: {
      title: "MEDICA",
      description: "Klinik-Website-Konzept mit ruhigem hellem UI.",
      task: "Vertrauensbildenden First Screen und Leistungsseite erstellen.",
      solution: "Helles Designsystem, lesbare Serviceblöcke und Responsive; Screenshots plus lokale Demo.",
    },
    fr: {
      title: "MEDICA",
      description: "Concept de site clinique au UI clair et apaisant.",
      task: "Créer un premier écran rassurant et une page services.",
      solution: "Système clair, blocs services lisibles et responsive ; captures et démo locale.",
    },
  },
  "web-design-mono": {
    ru: {
      title: "MONO",
      description: "Editorial-концепт интернет-магазина одежды.",
      task: "Сделать fashion e-commerce: главный экран и каталог.",
      solution: "Чёрно-белая editorial-система с карточками товаров и мобильной версией.",
    },
    de: {
      title: "MONO",
      description: "Editorial-Konzept für einen Fashion-Onlineshop.",
      task: "Fashion-E-Commerce mit Home und Katalog gestalten.",
      solution: "Schwarz-weißes Editorial-System mit Produktkarten und Mobile-Ansicht.",
    },
    fr: {
      title: "MONO",
      description: "Concept editorial pour une boutique mode en ligne.",
      task: "Créer home e-commerce mode et page catalogue.",
      solution: "Système noir et blanc editorial avec fiches produits et version mobile.",
    },
  },
  "web-design-finance-pro": {
    ru: {
      title: "FINANCE PRO",
      description: "Финтех-сайт и экран дашборда.",
      task: "Показать маркетинговый первый экран и кабинет с метриками.",
      solution: "Navy/teal система, лендинг и dashboard-экран со скриншотами демо.",
    },
    de: {
      title: "FINANCE PRO",
      description: "Fintech-Website und Dashboard-Screen.",
      task: "Marketing-First-Screen und Kennzahlen-Dashboard zeigen.",
      solution: "Navy/Teal-System, Landingpage und Dashboard mit Demo-Screenshots.",
    },
    fr: {
      title: "FINANCE PRO",
      description: "Site fintech et écran dashboard.",
      task: "Montrer un premier écran marketing et un tableau de bord.",
      solution: "Système navy/teal, landing et dashboard avec captures démo.",
    },
  },
  "web-design-travel-go": {
    ru: {
      title: "TRAVEL GO",
      description: "Концепт UI туристической платформы бронирования.",
      task: "Собрать hero поиска поездок и экран результатов.",
      solution: "Тёплая песочно-океанская палитра, поиск и results-экран в HTML/CSS.",
    },
    de: {
      title: "TRAVEL GO",
      description: "UI-Konzept einer Reisebuchungsplattform.",
      task: "Hero mit Suche und Ergebnisseite gestalten.",
      solution: "Warme Sand-/Ozean-Palette, Suche und Results-Screen in HTML/CSS.",
    },
    fr: {
      title: "TRAVEL GO",
      description: "Concept UI de plateforme de réservation voyage.",
      task: "Créer le hero de recherche et l’écran de résultats.",
      solution: "Palette sable/océan, recherche et écran résultats en HTML/CSS.",
    },
  },
  "branding-nord-coffee": {
    ru: {
      title: "NORD COFFEE",
      description: "Айдентика кофейни: знак чашки, тёплая каменная палитра и применения.",
      task: "Разработать логотип, цвета, типографику и борды носителей.",
      solution: "Оригинальный SVG-знак и презентационные борды primary/light/accent.",
    },
    de: {
      title: "NORD COFFEE",
      description: "Café-Identität: Tassenmarke, warme Steinpalette und Anwendungen.",
      task: "Logo, Farben, Typo und Anwendungsboards entwickeln.",
      solution: "Originales SVG-Markenzeichen und Präsentationsboards.",
    },
    fr: {
      title: "NORD COFFEE",
      description: "Identité coffee shop : signe tasse, palette pierre chaude et applications.",
      task: "Créer logo, couleurs, typo et planches d’application.",
      solution: "Marque SVG originale et planches de présentation.",
    },
  },
  "branding-green-lab": {
    ru: {
      title: "GREEN LAB",
      description: "Эко-научный бренд: лист-лаборатория и зелёная система.",
      task: "Сделать отличительный знак и показать применение на носителях.",
      solution: "SVG-символ и борды палитры/вариаций без повторения чужих логотипов.",
    },
    de: {
      title: "GREEN LAB",
      description: "Eco-Science-Brand: Blatt-Labor-Zeichen und grünes System.",
      task: "Ein unverwechselbares Markenzeichen und Anwendungen zeigen.",
      solution: "SVG-Symbol sowie Paletten-/Variantenboards.",
    },
    fr: {
      title: "GREEN LAB",
      description: "Marque éco-science : signe feuille-labo et système vert.",
      task: "Créer un signe distinctif et montrer les applications.",
      solution: "Symbole SVG et planches palette/variantes.",
    },
  },
  "branding-velocity": {
    ru: {
      title: "VELOCITY",
      description: "Спортивный бренд с динамичным знаком и красным акцентом.",
      task: "Передать скорость и движение через логотип и айдентику.",
      solution: "Острый SVG-знак, тёмная база и акцентные применения.",
    },
    de: {
      title: "VELOCITY",
      description: "Sportmarke mit dynamischem Zeichen und Rotakzent.",
      task: "Geschwindigkeit und Bewegung über Logo und Identität zeigen.",
      solution: "Scharfes SVG-Mark, dunkle Basis und Akzentanwendungen.",
    },
    fr: {
      title: "VELOCITY",
      description: "Marque sport avec signe dynamique et accent rouge.",
      task: "Exprimer vitesse et mouvement via logo et identité.",
      solution: "Signe SVG tranchant, base sombre et applications accent.",
    },
  },
  "branding-aurel": {
    ru: {
      title: "AUREL",
      description: "Beauty-айдентика с сияющим знаком и фиолетовой палитрой.",
      task: "Собрать мягкий премиальный visual identity для косметики.",
      solution: "SVG-эмблема и борды упаковки/носителей в едином стиле.",
    },
    de: {
      title: "AUREL",
      description: "Beauty-Identität mit strahlendem Zeichen und Violettpalette.",
      task: "Weiche Premium-Identität für Kosmetik aufbauen.",
      solution: "SVG-Emblem und Packaging-/Trägerboards im gleichen Stil.",
    },
    fr: {
      title: "AUREL",
      description: "Identité beauty avec signe lumineux et palette violette.",
      task: "Construire une identité premium douce pour la cosmétique.",
      solution: "Emblème SVG et planches packaging/supports cohérentes.",
    },
  },
  "branding-vector": {
    ru: {
      title: "VECTOR",
      description: "Технологичный бренд с геометрическим знаком и cyan-акцентом.",
      task: "Сделать системную IT-айдентику для цифрового продукта.",
      solution: "Геометрический SVG-знак и борды dark/light/accent применений.",
    },
    de: {
      title: "VECTOR",
      description: "Tech-Brand mit geometrischem Zeichen und Cyan-Akzent.",
      task: "Systemische IT-Identität für ein Digitalprodukt erstellen.",
      solution: "Geometrisches SVG-Mark und Dark/Light/Accent-Boards.",
    },
    fr: {
      title: "VECTOR",
      description: "Marque tech avec signe géométrique et accent cyan.",
      task: "Créer une identité IT systémique pour un produit digital.",
      solution: "Signe SVG géométrique et planches dark/light/accent.",
    },
  },
  "printing-cacao": {
    ru: {
      title: "CACAO",
      description: "Система упаковки артизанского шоколада.",
      task: "Подготовить print-макеты с читаемой иерархией и подачей на носителе.",
      solution: "Собраны обложка, детальный вид и mock-презентация упаковки без прайса.",
    },
    de: {
      title: "CACAO",
      description: "Verpackungssystem für artisanale Schokolade.",
      task: "Drucklayouts mit klarer Hierarchie und Trägerpräsentation vorbereiten.",
      solution: "Cover, Detailansicht und Mock-Präsentation ohne Preisliste.",
    },
    fr: {
      title: "CACAO",
      description: "Système d’emballage chocolat artisanal.",
      task: "Préparer des maquettes print avec hiérarchie lisible et présentation support.",
      solution: "Couverture, détail et mock de présentation sans grille tarifaire.",
    },
  },
  "printing-bloom": {
    ru: {
      title: "BLOOM",
      description: "Упаковочная система для beauty-линейки.",
      task: "Сделать согласованные макеты флакона/коробки и детализацию.",
      solution: "Print-борды с типографикой, акцентом и mock-носителем.",
    },
    de: {
      title: "BLOOM",
      description: "Packaging-System für eine Beauty-Linie.",
      task: "Abgestimmte Flakon-/Kartonlayouts und Details erstellen.",
      solution: "Print-Boards mit Typografie, Akzent und Mock-Träger.",
    },
    fr: {
      title: "BLOOM",
      description: "Système packaging pour une ligne beauty.",
      task: "Créer des maquettes flacon/boîte cohérentes et leurs détails.",
      solution: "Planches print avec typo, accent et support mock.",
    },
  },
  "printing-business-kit": {
    ru: {
      title: "BUSINESS KIT",
      description: "Деловой комплект: визитка, бланк и логика конверта.",
      task: "Выстроить единую сетку и тон корпоративной полиграфии.",
      solution: "Макеты stationery-системы и презентация на носителях.",
    },
    de: {
      title: "BUSINESS KIT",
      description: "Geschäftsausstattung: Karte, Briefbogen und Kuvertlogik.",
      task: "Einheitliches Raster und Ton für Corporate Stationery aufbauen.",
      solution: "Layouts des Stationery-Systems und Trägerpräsentation.",
    },
    fr: {
      title: "BUSINESS KIT",
      description: "Kit corporate : carte, papier à en-tête et logique d’enveloppe.",
      task: "Construire une grille et un ton unifiés pour la papeterie.",
      solution: "Maquettes du système stationery et présentation supports.",
    },
  },
  "printing-gastro": {
    ru: {
      title: "GASTRO",
      description: "Редакционное меню ресторана без прайс-листа.",
      task: "Сделать читаемую структуру разделов и блюд.",
      solution: "Меню-разворот с типографикой и детальным фрагментом композиции.",
    },
    de: {
      title: "GASTRO",
      description: "Editorial-Menü ohne Preisliste.",
      task: "Lesbare Abschnitte und Gerichte strukturieren.",
      solution: "Menü-Spread mit Typografie und Detailausschnitt.",
    },
    fr: {
      title: "GASTRO",
      description: "Menu éditorial sans grille de prix.",
      task: "Structurer des sections et plats lisibles.",
      solution: "Spread menu avec typographie et fragment détaillé.",
    },
  },
  "printing-interior": {
    ru: {
      title: "INTERIOR",
      description: "Концепт разворота мебельного каталога.",
      task: "Показать коллекцию через обложку, карточки изделий и материал-сэмплы.",
      solution: "Каталожные борды с сеткой и mock-презентацией носителя.",
    },
    de: {
      title: "INTERIOR",
      description: "Konzept eines Möbelkatalog-Spreads.",
      task: "Kollektion über Cover, Produktkarten und Materialsamples zeigen.",
      solution: "Katalogboards mit Raster und Mock-Trägerpräsentation.",
    },
    fr: {
      title: "INTERIOR",
      description: "Concept de spread catalogue mobilier.",
      task: "Montrer la collection via couverture, fiches et échantillons matière.",
      solution: "Planches catalogue avec grille et présentation mock.",
    },
  },
  "web-development-auto-import": {
    ru: {
      title: "AUTO IMPORT",
      description: "Интерактивный калькулятор ввоза авто с демо-коэффициентами.",
      task: "Показать расчёт таможни/пошлины/сборов без реальных ставок и отправки данных.",
      solution: "Vanilla JS калькулятор с живым итогом; скриншоты состояний и локальное демо.",
    },
    de: {
      title: "AUTO IMPORT",
      description: "Interaktiver Importkosten-Rechner mit Demo-Koeffizienten.",
      task: "Zoll-/Abgabenberechnung ohne echte Sätze und ohne Datensubmit zeigen.",
      solution: "Vanilla-JS-Rechner mit Live-Summe; Screenshots und lokale Demo.",
    },
    fr: {
      title: "AUTO IMPORT",
      description: "Calculateur interactif d’import auto avec coefficients démo.",
      task: "Montrer le calcul douane/taxes/frais sans tarifs réels ni envoi de données.",
      solution: "Calculateur JS vanilla avec total live ; captures et démo locale.",
    },
  },
  "web-development-build-house": {
    ru: {
      title: "BUILD HOUSE",
      description: "Сайт строительной компании с локальной валидацией заявки.",
      task: "Собрать каталог услуг и форму, которая не уходит на сервер.",
      solution: "Интерактивный лендинг: услуги, форма и toast успеха только локально.",
    },
    de: {
      title: "BUILD HOUSE",
      description: "Baufirma-Website mit lokaler Formularvalidierung.",
      task: "Leistungskatalog und Formular ohne Server-Submit umsetzen.",
      solution: "Interaktives Landing: Services, Formular und lokaler Erfolgs-Toast.",
    },
    fr: {
      title: "BUILD HOUSE",
      description: "Site entreprise BTP avec validation locale du formulaire.",
      task: "Créer catalogue de services et formulaire sans envoi serveur.",
      solution: "Landing interactive : services, formulaire et toast succès local.",
    },
  },
  "web-development-tech-store": {
    ru: {
      title: "TECH STORE",
      description: "Демо магазина электроники с фильтрами и корзиной.",
      task: "Реализовать каталог, фильтрацию и подсчёт суммы заказа на клиенте.",
      solution: "Frontend-магазин на demo-данных: фильтры, cart panel и локальные итоги.",
    },
    de: {
      title: "TECH STORE",
      description: "Elektronikshop-Demo mit Filtern und Warenkorb.",
      task: "Katalog, Filter und Summenberechnung clientseitig umsetzen.",
      solution: "Frontend-Shop mit Demodaten: Filter, Cart-Panel und lokale Totals.",
    },
    fr: {
      title: "TECH STORE",
      description: "Démo boutique électronique avec filtres et panier.",
      task: "Implémenter catalogue, filtres et total panier côté client.",
      solution: "Boutique frontend sur données démo : filtres, panier et totaux locaux.",
    },
  },
  "web-development-digital-space": {
    ru: {
      title: "DIGITAL SPACE",
      description: "Лендинг IT-агентства с интерактивными секциями.",
      task: "Показать услуги/кейсы через вкладки, аккордеоны и фильтры.",
      solution: "Многосекционный интерактивный лендинг без внешних зависимостей.",
    },
    de: {
      title: "DIGITAL SPACE",
      description: "IT-Agentur-Landing mit interaktiven Sektionen.",
      task: "Leistungen/Cases über Tabs, Akkordeons und Filter zeigen.",
      solution: "Mehrteiliges interaktives Landing ohne externe Abhängigkeiten.",
    },
    fr: {
      title: "DIGITAL SPACE",
      description: "Landing agence IT avec sections interactives.",
      task: "Montrer services/cas via onglets, accordéons et filtres.",
      solution: "Landing multi-sections interactive sans dépendances externes.",
    },
  },
  "web-development-booking-pro": {
    ru: {
      title: "BOOKING PRO",
      description: "Сценарий бронирования услуги, даты и времени с локальным подтверждением.",
      task: "Собрать рабочий flow выбора слота без реальной записи.",
      solution: "UI бронирования: услуга → дата → время → локальное подтверждение.",
    },
    de: {
      title: "BOOKING PRO",
      description: "Buchungsflow für Service, Datum und Zeit mit lokaler Bestätigung.",
      task: "Funktionierenden Slot-Flow ohne echte Terminbuchung bauen.",
      solution: "Booking-UI: Service → Datum → Zeit → lokale Bestätigung.",
    },
    fr: {
      title: "BOOKING PRO",
      description: "Parcours de réservation service/date/heure avec confirmation locale.",
      task: "Créer un flow de créneau fonctionnel sans vraie prise de rendez-vous.",
      solution: "UI réservation : service → date → heure → confirmation locale.",
    },
  },
  "bots-shop-bot": {
    ru: {
      title: "SHOP BOT",
      description: "Демо Telegram-подобного магазин-бота: каталог и локальное оформление заказа.",
      task: "Смоделировать чат-сценарий с кнопками меню и читаемыми сообщениями.",
      solution: "Локальный web-чат без Telegram API; скриншоты старта, сценария и результата.",
    },
    de: {
      title: "SHOP BOT",
      description: "Demo eines Telegram-ähnlichen Shop-Bots mit Katalog und lokalem Checkout.",
      task: "Chat-Szenario mit Menü-Buttons und lesbaren Nachrichten simulieren.",
      solution: "Lokaler Web-Chat ohne Telegram-API; Screenshots von Start, Flow und Resultat.",
    },
    fr: {
      title: "SHOP BOT",
      description: "Démo de bot boutique façon Telegram : catalogue et checkout local.",
      task: "Simuler un scénario chat avec boutons de menu et messages lisibles.",
      solution: "Chat web local sans API Telegram ; captures début, parcours et résultat.",
    },
  },
  "bots-booking-bot": {
    ru: {
      title: "BOOKING BOT",
      description: "Демо бота записи на приём с выбором слота.",
      task: "Показать ветвление диалога до подтверждения времени.",
      solution: "Интерактивный чат-прототип: услуга/дата/слот и локальный результат.",
    },
    de: {
      title: "BOOKING BOT",
      description: "Demo eines Termin-Bots mit Slot-Auswahl.",
      task: "Dialogverzweigung bis zur Zeitbestätigung zeigen.",
      solution: "Interaktiver Chat-Prototyp: Service/Datum/Slot und lokales Ergebnis.",
    },
    fr: {
      title: "BOOKING BOT",
      description: "Démo de bot de rendez-vous avec choix de créneau.",
      task: "Montrer l’arborescence du dialogue jusqu’à la confirmation horaire.",
      solution: "Prototype chat interactif : service/date/créneau et résultat local.",
    },
  },
  "bots-support-ai": {
    ru: {
      title: "SUPPORT AI",
      description: "Демо support-чатбота с FAQ-ветвлением.",
      task: "Реализовать понятные ответы и переходы по кнопкам помощи.",
      solution: "Локальная симуляция поддержки с читаемыми репликами и итогом сценария.",
    },
    de: {
      title: "SUPPORT AI",
      description: "Demo eines Support-Chatbots mit FAQ-Verzweigung.",
      task: "Klare Antworten und Hilfe-Button-Flows umsetzen.",
      solution: "Lokale Support-Simulation mit lesbaren Repliken und Szenario-Ende.",
    },
    fr: {
      title: "SUPPORT AI",
      description: "Démo de chatbot support avec arborescence FAQ.",
      task: "Mettre en place des réponses claires et des parcours par boutons.",
      solution: "Simulation locale du support avec répliques lisibles et fin de scénario.",
    },
  },
  "bots-subscribe-bot": {
    ru: {
      title: "SUBSCRIBE BOT",
      description: "Демо бота подписок с выбором тарифного плана.",
      task: "Показать выбор плана и подтверждение без реальной оплаты.",
      solution: "Чат-сценарий подписки на demo-данных; оплата не подключается.",
    },
    de: {
      title: "SUBSCRIBE BOT",
      description: "Abo-Bot-Demo mit Planauswahl.",
      task: "Planwahl und Bestätigung ohne echte Zahlung zeigen.",
      solution: "Chat-Abo-Szenario auf Demodaten; keine Zahlungsanbindung.",
    },
    fr: {
      title: "SUBSCRIBE BOT",
      description: "Démo de bot d’abonnement avec choix d’offre.",
      task: "Montrer le choix d’offre et la confirmation sans paiement réel.",
      solution: "Scénario chat d’abonnement sur données démo ; aucun paiement branché.",
    },
  },
  "bots-order-track": {
    ru: {
      title: "ORDER TRACK",
      description: "Демо бота отслеживания заказа со статусами.",
      task: "Провести пользователя от запроса номера до текущего статуса.",
      solution: "Симуляция трекинга с обновляемыми статусами и финальным экраном результата.",
    },
    de: {
      title: "ORDER TRACK",
      description: "Demo eines Tracking-Bots mit Bestellstatus.",
      task: "Nutzer von Nummernabfrage bis aktuellen Status führen.",
      solution: "Tracking-Simulation mit Statusupdates und Ergebnisbildschirm.",
    },
    fr: {
      title: "ORDER TRACK",
      description: "Démo de bot de suivi de commande avec statuts.",
      task: "Guider l’utilisateur de la demande de numéro jusqu’au statut actuel.",
      solution: "Simulation de tracking avec mises à jour de statut et écran résultat.",
    },
  },
  "automation-data-flow": {
    ru: {
      title: "DATA FLOW",
      description: "Дашборд обработки каталога: фильтры, таблица задач и демо-запуск.",
      task: "Показать операционную панель синхронизации данных без реальных API.",
      solution: "Интерактивный локальный dashboard с журналом job’ов и имитацией run.",
    },
    de: {
      title: "DATA FLOW",
      description: "Katalog-Verarbeitungsdashboard mit Filtern, Job-Tabelle und Demo-Run.",
      task: "Operations-Panel zur Datensynchronisation ohne echte APIs zeigen.",
      solution: "Interaktives lokales Dashboard mit Job-Log und Run-Simulation.",
    },
    fr: {
      title: "DATA FLOW",
      description: "Dashboard de traitement catalogue : filtres, table de jobs et run démo.",
      task: "Montrer un panel d’ops de sync données sans API réelles.",
      solution: "Dashboard local interactif avec journal de jobs et run simulé.",
    },
  },
  "automation-price-watch": {
    ru: {
      title: "PRICE WATCH",
      description: "Панель мониторинга конкурентных цен со статусами и графиком.",
      task: "Демонстрировать контроль изменений цены на тестовых данных.",
      solution: "Dashboard с таблицей, фильтрами и визуализацией throughput/статусов.",
    },
    de: {
      title: "PRICE WATCH",
      description: "Preisüberwachungs-Panel mit Statussen und Chart.",
      task: "Preisänderungen auf Testdaten kontrollierbar zeigen.",
      solution: "Dashboard mit Tabelle, Filtern und Status-/Throughput-Visualisierung.",
    },
    fr: {
      title: "PRICE WATCH",
      description: "Panel de monitoring des prix concurrents avec statuts et graphique.",
      task: "Démontrer le suivi des variations de prix sur données de test.",
      solution: "Dashboard avec table, filtres et visualisation des statuts.",
    },
  },
  "automation-stock-sync": {
    ru: {
      title: "STOCK SYNC",
      description: "Консоль синхронизации остатков с журналом операций.",
      task: "Показать согласование стоков между системами на демо-данных.",
      solution: "Интерактивная панель статусов и локальный лог синхронизации.",
    },
    de: {
      title: "STOCK SYNC",
      description: "Bestands-Sync-Konsole mit Operationslog.",
      task: "Bestandsabgleich zwischen Systemen auf Demodaten zeigen.",
      solution: "Interaktives Status-Panel und lokales Sync-Log.",
    },
    fr: {
      title: "STOCK SYNC",
      description: "Console de sync des stocks avec journal d’opérations.",
      task: "Montrer l’alignement des stocks entre systèmes sur données démo.",
      solution: "Panel de statuts interactif et journal de sync local.",
    },
  },
  "automation-crm-connect": {
    ru: {
      title: "CRM CONNECT",
      description: "Борд интеграции с CRM и статусами пайплайна.",
      task: "Имитировать обмен лидами/сделками без подключения реального CRM.",
      solution: "Локальный integration board с фильтрами и статусами этапов.",
    },
    de: {
      title: "CRM CONNECT",
      description: "CRM-Integrationsboard mit Pipeline-Statussen.",
      task: "Lead-/Deal-Austausch ohne echtes CRM simulieren.",
      solution: "Lokales Integrationsboard mit Filtern und Stage-Statussen.",
    },
    fr: {
      title: "CRM CONNECT",
      description: "Board d’intégration CRM avec statuts de pipeline.",
      task: "Simuler l’échange leads/deals sans CRM réel.",
      solution: "Board d’intégration local avec filtres et statuts d’étapes.",
    },
  },
  "automation-ai-content": {
    ru: {
      title: "AI CONTENT",
      description: "Стол автоматизации контента с очередью задач.",
      task: "Показать постановку и имитацию генерации/публикации контента.",
      solution: "Очередь задач, статусы и локальный запуск демо-процесса.",
    },
    de: {
      title: "AI CONTENT",
      description: "Content-Automationsdesk mit Task-Queue.",
      task: "Erstellung und Simulation von Content-Generierung/Publishing zeigen.",
      solution: "Task-Queue, Statusse und lokaler Demo-Prozessstart.",
    },
    fr: {
      title: "AI CONTENT",
      description: "Bureau d’automatisation contenu avec file de tâches.",
      task: "Montrer la mise en file et la simulation génération/publication.",
      solution: "File de tâches, statuts et lancement local du processus démo.",
    },
  },
  "mobile-fit-track": {
    ru: {
      title: "FIT TRACK",
      description: "Mobile-прототип трекера тренировок: активность, тренировка и профиль.",
      task: "Собрать минимум три экрана с рабочей нижней навигацией.",
      solution: "Vanilla multi-screen прототип (не native app); скриншоты mobile viewport.",
    },
    de: {
      title: "FIT TRACK",
      description: "Mobile-Prototyp für Fitness-Tracking: Aktivität, Workout und Profil.",
      task: "Mindestens drei Screens mit funktionierender Bottom-Navigation bauen.",
      solution: "Vanilla-Mehrscreen-Prototyp (keine Native-App); Mobile-Viewport-Screenshots.",
    },
    fr: {
      title: "FIT TRACK",
      description: "Prototype mobile fitness : activité, séance et profil.",
      task: "Construire au moins trois écrans avec navigation inférieure active.",
      solution: "Prototype multi-écrans vanilla (pas une app native) ; captures viewport mobile.",
    },
  },
  "mobile-money-flow": {
    ru: {
      title: "MONEY FLOW",
      description: "Mobile-прототип личных финансов: баланс и операции.",
      task: "Показать ключевые экраны учёта расходов на демо-данных.",
      solution: "Интерактивный mobile web UI с навигацией между экранами.",
    },
    de: {
      title: "MONEY FLOW",
      description: "Mobile-Prototyp für persönliche Finanzen: Saldo und Transaktionen.",
      task: "Schlüsselscreens der Ausgabenübersicht auf Demodaten zeigen.",
      solution: "Interaktives Mobile-Web-UI mit Navigation zwischen Screens.",
    },
    fr: {
      title: "MONEY FLOW",
      description: "Prototype mobile finances perso : solde et opérations.",
      task: "Montrer les écrans clés du suivi de dépenses sur données démo.",
      solution: "UI web mobile interactive avec navigation entre écrans.",
    },
  },
  "mobile-food-go": {
    ru: {
      title: "FOOD GO",
      description: "Mobile-прототип доставки еды: меню и корзина.",
      task: "Собрать пользовательский сценарий выбора блюд и корзины.",
      solution: "Демо-экраны меню/заказа с локальным состоянием корзины.",
    },
    de: {
      title: "FOOD GO",
      description: "Mobile-Prototyp für Essenslieferung: Menü und Warenkorb.",
      task: "User-Flow für Gerichtewahl und Warenkorb umsetzen.",
      solution: "Demo-Screens Menü/Bestellung mit lokalem Cart-State.",
    },
    fr: {
      title: "FOOD GO",
      description: "Prototype mobile livraison repas : menu et panier.",
      task: "Créer le parcours choix de plats et panier.",
      solution: "Écrans démo menu/commande avec état panier local.",
    },
  },
  "mobile-task-space": {
    ru: {
      title: "TASK SPACE",
      description: "Mobile-прототип задач: доски и детали.",
      task: "Показать управление задачами минимум на трёх экранах.",
      solution: "Навигация между списком, деталями и профилем/настройками в web-прототипе.",
    },
    de: {
      title: "TASK SPACE",
      description: "Mobile-Prototyp für Tasks: Boards und Details.",
      task: "Task-Management auf mindestens drei Screens zeigen.",
      solution: "Navigation zwischen Liste, Details und Profil/Settings im Web-Prototyp.",
    },
    fr: {
      title: "TASK SPACE",
      description: "Prototype mobile tâches : tableaux et détails.",
      task: "Montrer la gestion de tâches sur au moins trois écrans.",
      solution: "Navigation liste/détails/profil dans un prototype web.",
    },
  },
  "mobile-city-guide": {
    ru: {
      title: "CITY GUIDE",
      description: "Mobile-прототип городского гида: места и маршруты.",
      task: "Собрать экраны подборок локаций и карточки места.",
      solution: "Демо-навигация гида с читаемым контентом и локальным UI.",
    },
    de: {
      title: "CITY GUIDE",
      description: "Mobile-Prototyp eines City-Guides: Orte und Routen.",
      task: "Screens für Ortssammlungen und Place-Cards erstellen.",
      solution: "Guide-Demo-Navigation mit lesbarem Content und lokalem UI.",
    },
    fr: {
      title: "CITY GUIDE",
      description: "Prototype mobile guide urbain : lieux et itinéraires.",
      task: "Créer des écrans de sélections et fiches de lieux.",
      solution: "Navigation démo du guide avec contenu lisible et UI locale.",
    },
  },
};

let updated = 0;
for (const project of windowObj.PORTFOLIO_PROJECTS) {
  const patch = T[project.id];
  if (!patch) continue;
  project.translations = {
    ...(project.translations || {}),
    ru: { ...(project.translations?.ru || {}), ...patch.ru },
    de: { ...(project.translations?.de || {}), ...patch.de },
    fr: { ...(project.translations?.fr || {}), ...patch.fr },
  };
  updated += 1;
}

const header = `"use strict";

/**
 * Central portfolio data store.
 * Regenerated after portfolio content overhaul.
 * projectType remains demo. No prices.
 */
`;

const output =
  header +
  `window.PORTFOLIO_CATEGORIES = ${JSON.stringify(windowObj.PORTFOLIO_CATEGORIES, null, 2)};\n\n` +
  `window.PORTFOLIO_PROJECTS = ${JSON.stringify(windowObj.PORTFOLIO_PROJECTS, null, 2)};\n`;

writeFileSync("js/portfolio-data.js", output);

let sameDe = 0;
let sameFr = 0;
let sameRu = 0;
for (const p of windowObj.PORTFOLIO_PROJECTS) {
  if (p.description === p.translations?.de?.description) sameDe += 1;
  if (p.description === p.translations?.fr?.description) sameFr += 1;
  if (p.description === p.translations?.ru?.description) sameRu += 1;
}

console.log(JSON.stringify({ updated, sameRu, sameDe, sameFr }, null, 2));
