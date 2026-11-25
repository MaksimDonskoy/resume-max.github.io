"use strict";

(() => {
  const TELEGRAM_URL = "https://t.me/MErcool_git";
  const CATEGORIES = window.PORTFOLIO_CATEGORIES || [];

  const section = document.querySelector("#portfolio");
  const navLink = document.querySelector("[data-nav-portfolio]");
  const filtersRoot = document.querySelector("[data-portfolio-filters]");
  const gridRoot = document.querySelector("[data-portfolio-grid]");
  const emptyRoot = document.querySelector("[data-portfolio-empty]");
  const modal = document.querySelector("[data-portfolio-modal]");
  const lightbox = document.querySelector("[data-portfolio-lightbox]");

  if (!section || !filtersRoot || !gridRoot || !modal) return;

  let activeCategory = "all";
  let activeProject = null;
  let activeImageIndex = 0;
  let lastFocus = null;
  let lightboxOpen = false;

  function getLanguage() {
    return document.documentElement.lang || "en";
  }

  function t(key, fallback = "") {
    const language = getLanguage();
    return (
      window.translations?.[language]?.[key] ??
      window.translations?.en?.[key] ??
      fallback
    );
  }

  function getPublishedProjects() {
    return (window.PORTFOLIO_PROJECTS || []).filter((project) => project.published);
  }

  function localizeProject(project) {
    const language = getLanguage();
    const localized = project.translations?.[language] || {};
    return {
      ...project,
      title: localized.title || project.title,
      description: localized.description || project.description,
      task: localized.task || project.task,
      solution: localized.solution || project.solution,
    };
  }

  function categoryLabel(category) {
    return t(`portfolio.category.${category}`, category);
  }

  function projectTypeLabel(type) {
    return t(`portfolio.type.${type}`, type);
  }

  function setPortfolioAvailability(isAvailable) {
    section.hidden = !isAvailable;
    section.dataset.portfolioEmpty = String(!isAvailable);
    if (navLink) navLink.hidden = !isAvailable;
    document.dispatchEvent(
      new CustomEvent("portfolioavailabilitychange", {
        detail: { available: isAvailable },
      }),
    );
  }

  function getCategoriesWithProjects(projects) {
    const present = new Set(projects.map((project) => project.category));
    return CATEGORIES.filter((category) => present.has(category));
  }

  function renderFilters(projects) {
    const categories = getCategoriesWithProjects(projects);
    filtersRoot.replaceChildren();

    const allButton = document.createElement("button");
    allButton.type = "button";
    allButton.className = "portfolio-filter";
    allButton.dataset.category = "all";
    allButton.dataset.i18n = "portfolio.filter.all";
    allButton.textContent = t("portfolio.filter.all", "All works");
    allButton.setAttribute("aria-pressed", String(activeCategory === "all"));
    allButton.addEventListener("click", () => setCategory("all"));
    filtersRoot.append(allButton);

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "portfolio-filter";
      button.dataset.category = category;
      button.textContent = categoryLabel(category);
      button.setAttribute(
        "aria-pressed",
        String(activeCategory === category),
      );
      button.addEventListener("click", () => setCategory(category));
      filtersRoot.append(button);
    });

    window.applyTranslations?.();
  }

  function renderGrid(projects) {
    const filtered =
      activeCategory === "all"
        ? projects
        : projects.filter((project) => project.category === activeCategory);

    gridRoot.replaceChildren();

    if (!filtered.length) {
      if (emptyRoot) emptyRoot.hidden = false;
      return;
    }

    if (emptyRoot) emptyRoot.hidden = true;

    filtered.forEach((project) => {
      const localized = localizeProject(project);
      const card = document.createElement("button");
      card.type = "button";
      card.className = "portfolio-card reveal visible";
      card.dataset.projectId = project.id;

      const cover = document.createElement("img");
      cover.className = "portfolio-card__cover";
      cover.src = project.cover;
      cover.alt = localized.title;
      cover.loading = "lazy";
      cover.decoding = "async";
      cover.addEventListener(
        "error",
        () => {
          cover.removeAttribute("src");
          cover.alt = "";
        },
        { once: true },
      );

      const body = document.createElement("div");
      body.className = "portfolio-card__body";

      const category = document.createElement("span");
      category.className = "portfolio-card__category";
      category.textContent = categoryLabel(project.category);

      const title = document.createElement("h3");
      title.className = "portfolio-card__title";
      title.textContent = localized.title;

      const description = document.createElement("p");
      description.className = "portfolio-card__description";
      description.textContent = localized.description;

      body.append(category, title, description);
      card.append(cover, body);
      card.addEventListener("click", () => openModal(project.id));
      gridRoot.append(card);
    });
  }

  function setCategory(category, { announce = true } = {}) {
    activeCategory = category;
    filtersRoot.querySelectorAll(".portfolio-filter").forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.category === category),
      );
    });
    renderGrid(getPublishedProjects());
    if (announce) {
      document.dispatchEvent(
        new CustomEvent("portfoliofilterchange", {
          detail: { category },
        }),
      );
    }
  }

  function updateServiceViewButtons(projects) {
    const counts = projects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {});

    document.querySelectorAll("[data-service-view]").forEach((button) => {
      const category = button.dataset.serviceView;
      const hasWorks = Boolean(counts[category]);
      button.hidden = !hasWorks;
    });
  }

  function getModalNodes() {
    return {
      title: modal.querySelector("[data-portfolio-modal-title]"),
      category: modal.querySelector("[data-portfolio-modal-category]"),
      task: modal.querySelector("[data-portfolio-modal-task]"),
      solution: modal.querySelector("[data-portfolio-modal-solution]"),
      type: modal.querySelector("[data-portfolio-modal-type]"),
      tech: modal.querySelector("[data-portfolio-modal-tech]"),
      link: modal.querySelector("[data-portfolio-modal-link]"),
      discuss: modal.querySelector("[data-portfolio-modal-discuss]"),
      image: modal.querySelector("[data-portfolio-gallery-image]"),
      thumbs: modal.querySelector("[data-portfolio-gallery-thumbs]"),
      prev: modal.querySelector("[data-portfolio-gallery-prev]"),
      next: modal.querySelector("[data-portfolio-gallery-next]"),
    };
  }

  function getProjectImages(project) {
    const images = Array.isArray(project.images) ? [...project.images] : [];
    if (project.cover && !images.includes(project.cover)) {
      images.unshift(project.cover);
    }
    return images.filter(Boolean);
  }

  function renderGallery(project) {
    const nodes = getModalNodes();
    const images = getProjectImages(project);
    if (!images.length || !nodes.image) return;

    activeImageIndex = Math.min(activeImageIndex, images.length - 1);
    nodes.image.src = images[activeImageIndex];
    nodes.image.alt = localizeProject(project).title;
    nodes.image.loading = "lazy";
    nodes.image.decoding = "async";

    const multi = images.length > 1;
    if (nodes.prev) nodes.prev.hidden = !multi;
    if (nodes.next) nodes.next.hidden = !multi;

    if (nodes.thumbs) {
      nodes.thumbs.replaceChildren();
      images.forEach((src, index) => {
        const thumb = document.createElement("button");
        thumb.type = "button";
        thumb.className = "portfolio-gallery__thumb";
        thumb.setAttribute(
          "aria-label",
          t("portfolio.gallery.goToImage", "Go to image").replace(
            "{number}",
            String(index + 1),
          ),
        );
        thumb.setAttribute(
          "aria-current",
          String(index === activeImageIndex),
        );
        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";
        thumb.append(img);
        thumb.addEventListener("click", () => {
          activeImageIndex = index;
          renderGallery(project);
        });
        nodes.thumbs.append(thumb);
      });
    }

    if (lightboxOpen) {
      updateLightboxImage(project);
    }
  }

  function showImage(offset) {
    if (!activeProject) return;
    const images = getProjectImages(activeProject);
    if (images.length < 2) return;
    activeImageIndex =
      (activeImageIndex + offset + images.length) % images.length;
    renderGallery(activeProject);
  }

  function updateLightboxImage(project) {
    const image = lightbox?.querySelector("[data-portfolio-lightbox-image]");
    const images = getProjectImages(project);
    if (!image || !images.length) return;
    image.src = images[activeImageIndex];
    image.alt = localizeProject(project).title;
  }

  function openLightbox() {
    if (!lightbox || !activeProject) return;
    lightboxOpen = true;
    updateLightboxImage(activeProject);
    const images = getProjectImages(activeProject);
    lightbox
      .querySelectorAll("[data-portfolio-lightbox-prev], [data-portfolio-lightbox-next]")
      .forEach((button) => {
        button.hidden = images.length < 2;
      });
    lightbox.hidden = false;
    window.resumePresentation?.setModalOpen?.(true);
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightboxOpen = false;
    lightbox.hidden = true;
  }

  function openModal(projectId) {
    const project = getPublishedProjects().find((item) => item.id === projectId);
    if (!project) return;

    const localized = localizeProject(project);
    const nodes = getModalNodes();
    activeProject = project;
    activeImageIndex = 0;
    lastFocus = document.activeElement;

    if (nodes.category) nodes.category.textContent = categoryLabel(project.category);
    if (nodes.title) nodes.title.textContent = localized.title;
    if (nodes.task) nodes.task.textContent = localized.task;
    if (nodes.solution) nodes.solution.textContent = localized.solution;
    if (nodes.type) nodes.type.textContent = projectTypeLabel(project.projectType);

    if (nodes.tech) {
      nodes.tech.replaceChildren();
      (project.technologies || []).forEach((tech) => {
        const item = document.createElement("li");
        item.textContent = tech;
        nodes.tech.append(item);
      });
    }

    if (nodes.link) {
      if (project.projectUrl) {
        nodes.link.hidden = false;
        nodes.link.href = project.projectUrl;
      } else {
        nodes.link.hidden = true;
        nodes.link.removeAttribute("href");
      }
    }

    if (nodes.discuss) {
      nodes.discuss.href = TELEGRAM_URL;
    }

    renderGallery(project);
    modal.hidden = false;
    document.body.classList.add("portfolio-modal-open");
    window.resumePresentation?.setModalOpen?.(true);
    modal.querySelector("[data-portfolio-modal-close]")?.focus();
  }

  function closeModal() {
    if (modal.hidden) return;
    closeLightbox();
    modal.hidden = true;
    document.body.classList.remove("portfolio-modal-open");
    window.resumePresentation?.setModalOpen?.(false);
    activeProject = null;
    if (lastFocus instanceof HTMLElement) {
      lastFocus.focus({ preventScroll: true });
    }
  }

  function refresh() {
    const projects = getPublishedProjects();
    const available = projects.length > 0;
    setPortfolioAvailability(available);
    updateServiceViewButtons(projects);

    if (!available) {
      filtersRoot.replaceChildren();
      gridRoot.replaceChildren();
      if (emptyRoot) emptyRoot.hidden = true;
      closeModal();
      return;
    }

    if (
      activeCategory !== "all" &&
      !projects.some((project) => project.category === activeCategory)
    ) {
      activeCategory = "all";
    }

    renderFilters(projects);
    renderGrid(projects);
  }

  function goToCategory(category) {
    if (!CATEGORIES.includes(category) && category !== "all") return;
    activeCategory = category;
    refresh();
    window.resumePresentation?.goToSlideById?.("portfolio");
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  modal
    .querySelector("[data-portfolio-modal-close]")
    ?.addEventListener("click", closeModal);

  modal
    .querySelector("[data-portfolio-gallery-prev]")
    ?.addEventListener("click", () => showImage(-1));

  modal
    .querySelector("[data-portfolio-gallery-next]")
    ?.addEventListener("click", () => showImage(1));

  modal
    .querySelector("[data-portfolio-gallery-image]")
    ?.addEventListener("click", openLightbox);

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  lightbox
    ?.querySelector("[data-portfolio-lightbox-close]")
    ?.addEventListener("click", closeLightbox);

  lightbox
    ?.querySelector("[data-portfolio-lightbox-prev]")
    ?.addEventListener("click", () => showImage(-1));

  lightbox
    ?.querySelector("[data-portfolio-lightbox-next]")
    ?.addEventListener("click", () => showImage(1));

  document.addEventListener("keydown", (event) => {
    if (modal.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      if (!lightbox.hidden) {
        closeLightbox();
      } else {
        closeModal();
      }
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      event.stopPropagation();
      showImage(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      event.stopPropagation();
      showImage(1);
    }
  });

  document.querySelectorAll("[data-service-view]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      goToCategory(button.dataset.serviceView);
    });
  });

  document.addEventListener("languagechange", () => {
    refresh();
    if (!modal.hidden && activeProject) {
      openModal(activeProject.id);
    }
  });

  window.portfolioAPI = {
    refresh,
    goToCategory,
    hasPublishedProjects: () => getPublishedProjects().length > 0,
    isModalOpen: () => !modal.hidden,
    closeModal,
  };

  refresh();
})();
