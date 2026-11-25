"use strict";

document.documentElement.classList.add("js-ready");

document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Копирует адрес почты и показывает локализованный результат операции.
  document.querySelectorAll(".copy-email").forEach((button) => {
    const label = button.querySelector("[data-i18n]");
    let feedbackTimer;

    button.addEventListener("click", async () => {
      if (!label) return;

      window.clearTimeout(feedbackTimer);
      try {
        if (!navigator.clipboard?.writeText) {
          throw new Error("Clipboard API is unavailable in this browser context.");
        }

        await navigator.clipboard.writeText(button.dataset.copyValue);
        button.dataset.copyState = "success";
        label.dataset.i18n = "copy.success";
      } catch (error) {
        console.error("Unable to copy the email address.", error);
        button.dataset.copyState = "error";
        label.dataset.i18n = "copy.failed";
      }

      window.applyTranslations?.();
      feedbackTimer = window.setTimeout(() => {
        delete button.dataset.copyState;
        label.dataset.i18n = "copy.default";
        window.applyTranslations?.();
      }, 1800);
    });
  });

  // Печатает должность с учётом выбранного языка и настроек движения.
  const typewriter = document.querySelector(".typewriter");
  let typewriterTimer;

  function startTypewriter() {
    if (!typewriter) return;

    window.clearTimeout(typewriterTimer);
    const role = typewriter.textContent.trim();

    if (reducedMotion.matches) {
      typewriter.textContent = role;
      return;
    }

    typewriter.textContent = "";
    let index = 0;

    function typeNextCharacter() {
      if (index >= role.length) return;
      typewriter.textContent += role.charAt(index);
      index += 1;
      typewriterTimer = window.setTimeout(typeNextCharacter, 60);
    }

    typeNextCharacter();
  }

  startTypewriter();
  document.addEventListener("languagechange", startTypewriter);
  reducedMotion.addEventListener?.("change", startTypewriter);

  // Подключает иконки навыков только при первом открытии этого слайда.
  function loadSkillIcons() {
    document.querySelectorAll("#skills .skill-list li[data-icon]").forEach((item) => {
      if (item.querySelector(".skill-list__icon")) return;

      const icon = document.createElement("img");
      const iconName = item.dataset.icon;
      const isBrandIcon = [
        "html5",
        "css3",
        "javascript",
        "bootstrap",
        "git",
        "github",
        "vscode",
        "figma",
        "chrome",
        "php",
        "mysql",
        "windows8",
      ].includes(iconName);

      icon.className = `skill-list__icon${isBrandIcon ? "" : " skill-list__icon--symbol"}`;
      icon.src = `image/icons/${iconName}.svg`;
      icon.alt = "";
      icon.setAttribute("aria-hidden", "true");
      icon.loading = "lazy";
      icon.decoding = "async";
      icon.addEventListener("error", () => icon.remove(), { once: true });
      item.prepend(icon);
    });
  }

  const skillsCarousel = document.querySelector("[data-skills-carousel]");
  const skillsTrack = skillsCarousel?.querySelector("[data-skills-track]");
  const skillGroups = skillsTrack
    ? [...skillsTrack.querySelectorAll(".skill-group")]
    : [];
  const skillsPagination = skillsCarousel?.querySelector(
    "[data-skills-pagination]",
  );
  const previousSkillButton = skillsCarousel?.querySelector(
    "[data-skills-previous]",
  );
  const nextSkillButton = skillsCarousel?.querySelector("[data-skills-next]");
  let activeSkillPage = 0;
  let skillResizeFrame = 0;
  let rotationDegrees = 0;
  let dragStartX = 0;
  let dragStartRotation = 0;
  let dragSensitivity = 45;
  let dragPointerId = null;
  let didDragSkills = false;

  function getSkillTranslation(key, number) {
    const language = document.documentElement.lang;
    return (
      window.translations?.[language]?.[key]?.replace("{number}", String(number)) ??
      `${key} ${number}`
    );
  }

  function getSkillsPageCount() {
    return skillGroups.length;
  }

  function getSkillAngle() {
    return 360 / getSkillsPageCount();
  }

  function getSkillIndexFromRotation(rotation = rotationDegrees) {
    return (
      ((Math.round(-rotation / getSkillAngle()) % skillGroups.length) +
        skillGroups.length) %
      skillGroups.length
    );
  }

  function updateSkillRotation() {
    if (!skillsTrack || !skillsCarousel || !skillGroups.length) return;
    const cardWidth = skillGroups[0].offsetWidth;
    const radius = cardWidth / 2 / Math.tan(Math.PI / getSkillsPageCount());
    skillsCarousel.style.setProperty("--carousel-radius", `${radius}px`);
    skillsTrack.style.setProperty(
      "--carousel-rotation",
      `${rotationDegrees}deg`,
    );

    skillGroups.forEach((group, index) => {
      group.style.setProperty("--card-angle", `${index * getSkillAngle()}deg`);
      const angle =
        (index * getSkillAngle() + rotationDegrees) * (Math.PI / 180);
      const depth = Math.max(0, Math.cos(angle));
      group.style.setProperty("--face-depth", String(depth));
    });
  }

  function goToSkillPage(page, behavior = "smooth") {
    if (!skillsTrack || !skillGroups.length) return;
    const pageCount = getSkillsPageCount();
    const nextPage = (page % pageCount + pageCount) % pageCount;
    const targetRotation = -nextPage * getSkillAngle();
    rotationDegrees =
      targetRotation +
      Math.round((rotationDegrees - targetRotation) / 360) * 360;
    activeSkillPage = nextPage;

    const instant = reducedMotion.matches || behavior === "auto";
    skillsCarousel?.classList.toggle("is-instant", instant);
    updateSkillRotation();
    updateSkillControls(nextPage);
    if (instant) {
      void skillsTrack.offsetWidth;
      skillsCarousel?.classList.remove("is-instant");
    }
  }

  function updateSkillControls(page = activeSkillPage) {
    if (!skillGroups.length || !skillsPagination) return;
    activeSkillPage = page;
    const paginationButtons = [
      ...skillsPagination.querySelectorAll("button"),
    ];

    skillGroups.forEach((group, groupIndex) => {
      const forwardDistance =
        (groupIndex - activeSkillPage + skillGroups.length) % skillGroups.length;
      const backwardDistance =
        (activeSkillPage - groupIndex + skillGroups.length) % skillGroups.length;
      const isActive = groupIndex === activeSkillPage;
      const isVisible = Math.min(forwardDistance, backwardDistance) <= 1;
      group.setAttribute(
        "aria-label",
        getSkillTranslation("skills.carouselGroup", groupIndex + 1).replace(
          "{total}",
          String(skillGroups.length),
        ),
      );
      group.setAttribute("aria-hidden", String(!isVisible));
      group.inert = !isVisible;
      group.tabIndex = isVisible && !isActive ? 0 : -1;
      group.toggleAttribute("data-active", isActive);
      if (isActive) {
        group.setAttribute("aria-current", "true");
      } else {
        group.removeAttribute("aria-current");
      }
    });

    paginationButtons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === activeSkillPage;
      if (isActive) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }
      button.setAttribute(
        "aria-label",
        getSkillTranslation("skills.carouselGoToPage", buttonIndex + 1),
      );
    });

  }

  if (skillsTrack && skillsPagination && skillGroups.length > 0) {
    skillGroups.forEach((group, index) => {
      group.classList.remove("reveal");
      group.classList.add("visible");
    });

    skillsPagination.replaceChildren();
    skillGroups.forEach((group, index) => {
      const pageButton = document.createElement("button");
      pageButton.type = "button";
      pageButton.className = "skills-carousel__dot";
      pageButton.addEventListener("click", () => goToSkillPage(index));
      skillsPagination.append(pageButton);

      group.addEventListener("click", () => {
        if (!didDragSkills && index !== activeSkillPage) {
          goToSkillPage(index);
        }
      });
      group.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          goToSkillPage(index);
        }
      });
    });

    skillsTrack.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragPointerId = event.pointerId;
      didDragSkills = false;
      dragStartX = event.clientX;
      dragStartRotation = rotationDegrees;
      dragSensitivity = event.pointerType === "mouse" ? 54 : 45;
      skillsCarousel.classList.add("is-dragging");
      document.querySelector(".custom-cursor")?.classList.add("is-hidden");
      skillsTrack.focus({ preventScroll: true });
    });
    window.addEventListener("pointermove", (event) => {
      if (event.pointerId !== dragPointerId) return;
      const distance = event.clientX - dragStartX;
      if (Math.abs(distance) < 4) return;
      didDragSkills = true;
      rotationDegrees =
        dragStartRotation +
        (distance / Math.max(skillsCarousel.clientWidth, 1)) * dragSensitivity;
      updateSkillRotation();
      updateSkillControls(getSkillIndexFromRotation());
    });

    function finishSkillsDrag(event) {
      if (event.pointerId !== dragPointerId) return;
      dragPointerId = null;
      skillsCarousel.classList.remove("is-dragging");
      document.querySelector(".custom-cursor")?.classList.remove("is-hidden");
      if (didDragSkills) goToSkillPage(getSkillIndexFromRotation());
      didDragSkills = false;
    }

    window.addEventListener("pointerup", finishSkillsDrag);
    window.addEventListener("pointercancel", finishSkillsDrag);

    previousSkillButton?.addEventListener("click", () =>
      goToSkillPage(activeSkillPage - 1),
    );
    nextSkillButton?.addEventListener("click", () =>
      goToSkillPage(activeSkillPage + 1),
    );
    skillsTrack.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        event.stopPropagation();
        goToSkillPage(activeSkillPage + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopPropagation();
        goToSkillPage(activeSkillPage - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        event.stopPropagation();
        goToSkillPage(0);
      } else if (event.key === "End") {
        event.preventDefault();
        event.stopPropagation();
        goToSkillPage(getSkillsPageCount() - 1);
      }
    });
    window.addEventListener("resize", () => {
      if (skillResizeFrame) window.cancelAnimationFrame(skillResizeFrame);
      skillResizeFrame = window.requestAnimationFrame(() => {
        skillResizeFrame = 0;
        updateSkillRotation();
      });
    });
    if ("ResizeObserver" in window) {
      const carouselResizeObserver = new ResizeObserver(updateSkillRotation);
      carouselResizeObserver.observe(skillsCarousel);
    }
    document.addEventListener("languagechange", () => updateSkillControls());
    updateSkillRotation();
    updateSkillControls();
    skillsCarousel
      .querySelector(".skills-carousel__controls")
      ?.removeAttribute("hidden");
  }

  // Анимирует содержимое только при первом открытии соответствующего слайда.
  function revealSlideContent(slide) {
    slide.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("visible");
    });
  }

  // Переключает слайды анимацией, не прокручивая всю страницу.
  let portfolioModalOpen = false;
  const slideCounter = document.querySelector(".slide-counter");
  const slideControls = document.querySelector(".slide-controls");
  const progressBar = document.querySelector(".scroll-progress__bar");
  const backToTopButton = document.querySelector(".back-to-top");
  const slideNavigation = new Map([
    ["services", "services"],
    ["portfolio", "portfolio"],
    ["about", "about"],
    ["education", "about"],
    ["experience", "experience"],
    ["skills", "skills"],
    ["soft-skills", "skills"],
    ["location", "skills"],
    ["process", "services"],
    ["advantages", "services"],
    ["contact", "contact"],
  ]);

  function hasPublishedPortfolio() {
    return (window.PORTFOLIO_PROJECTS || []).some((project) => project.published);
  }

  function collectPresentationSlides() {
    return [...document.querySelectorAll("main > .section")].filter((slide) => {
      if (slide.id !== "portfolio") return true;
      return hasPublishedPortfolio() && !slide.hidden;
    });
  }

  let presentationSlides = collectPresentationSlides();
  const requestedSlideId = window.location.hash.slice(1);
  const initialSlideIndex = presentationSlides.findIndex(
    (slide) => slide.id === requestedSlideId,
  );
  let currentSlideIndex = initialSlideIndex >= 0 ? initialSlideIndex : 0;

  function refreshPresentationSlides({ preferSlideId } = {}) {
    const previousId =
      preferSlideId || presentationSlides[currentSlideIndex]?.id || "hero";
    presentationSlides = collectPresentationSlides();
    const nextIndex = presentationSlides.findIndex(
      (slide) => slide.id === previousId,
    );
    currentSlideIndex = nextIndex >= 0 ? nextIndex : 0;
    presentationSlides.forEach((slide, index) => {
      const scrollPanel = slide.querySelector(
        ":scope > .container, :scope > .hero__layout",
      );
      if (scrollPanel) scrollPanel.tabIndex = 0;
      slide.classList.add("presentation-slide");
      slide.classList.toggle("is-current", index === currentSlideIndex);
      slide.classList.toggle("is-before", index < currentSlideIndex);
      slide.classList.toggle("is-after", index > currentSlideIndex);
      slide.setAttribute("aria-hidden", String(index !== currentSlideIndex));
      slide.inert = index !== currentSlideIndex;
    });
    revealSlideContent(presentationSlides[currentSlideIndex]);
    updateSlideNavigation();
  }

  window.resumePresentation = {
    setModalOpen(isOpen) {
      portfolioModalOpen = Boolean(isOpen);
    },
    isModalOpen() {
      return portfolioModalOpen || Boolean(window.portfolioAPI?.isModalOpen?.());
    },
    goToSlideById(slideId) {
      const targetIndex = presentationSlides.findIndex(
        (slide) => slide.id === slideId,
      );
      if (targetIndex >= 0) goToSlide(targetIndex);
    },
    refreshSlides: refreshPresentationSlides,
  };

  document.addEventListener("portfolioavailabilitychange", () => {
    refreshPresentationSlides();
  });

  function updateSlideNavigation() {
    const activeSlide = presentationSlides[currentSlideIndex];
    const activeNavId = slideNavigation.get(activeSlide?.id);

    document.querySelectorAll(".primary-navigation a[href^='#']").forEach((link) => {
      const isActive = link.getAttribute("href") === `#${activeNavId}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (slideCounter) {
      slideCounter.textContent =
        `${String(currentSlideIndex + 1).padStart(2, "0")} / ` +
        `${String(presentationSlides.length).padStart(2, "0")}`;
    }

    slideControls
      ?.querySelector("[data-slide-action='previous']")
      ?.toggleAttribute("disabled", currentSlideIndex === 0);
    slideControls
      ?.querySelector("[data-slide-action='next']")
      ?.toggleAttribute(
        "disabled",
        currentSlideIndex === presentationSlides.length - 1,
      );

    if (progressBar) {
      const progress =
        presentationSlides.length > 1
          ? (currentSlideIndex / (presentationSlides.length - 1)) * 100
          : 0;
      progressBar.style.width = `${progress}%`;
    }

    if (backToTopButton) {
      backToTopButton.classList.toggle("is-visible", currentSlideIndex > 0);
    }
  }

  function goToSlide(index, { updateHistory = true } = {}) {
    if (window.resumePresentation?.isModalOpen?.()) return false;
    if (index < 0 || index >= presentationSlides.length) return false;

    const previousIndex = currentSlideIndex;
    currentSlideIndex = index;

    presentationSlides.forEach((slide, slideIndex) => {
      const isCurrent = slideIndex === currentSlideIndex;
      slide.classList.add("presentation-slide");
      slide.classList.toggle("is-current", isCurrent);
      slide.classList.toggle("is-before", slideIndex < currentSlideIndex);
      slide.classList.toggle("is-after", slideIndex > currentSlideIndex);
      slide.setAttribute("aria-hidden", String(!isCurrent));
      slide.inert = !isCurrent;
    });
    revealSlideContent(presentationSlides[currentSlideIndex]);
    if (presentationSlides[currentSlideIndex].id === "skills") {
      loadSkillIcons();
    }

    if (updateHistory) {
      const hash = `#${presentationSlides[currentSlideIndex].id}`;
      if (window.location.hash !== hash) {
        window.history.pushState(null, "", hash);
      }
    }

    updateSlideNavigation();
    return previousIndex !== currentSlideIndex;
  }

  presentationSlides.forEach((slide, index) => {
    const scrollPanel = slide.querySelector(":scope > .container, :scope > .hero__layout");
    if (scrollPanel) scrollPanel.tabIndex = 0;
    slide.classList.add("presentation-slide");
    slide.classList.toggle("is-current", index === currentSlideIndex);
    slide.classList.toggle("is-before", index < currentSlideIndex);
    slide.classList.toggle("is-after", index > currentSlideIndex);
    slide.setAttribute("aria-hidden", String(index !== currentSlideIndex));
    slide.inert = index !== currentSlideIndex;
  });

  revealSlideContent(presentationSlides[currentSlideIndex]);
  if (presentationSlides[currentSlideIndex].id === "skills") {
    loadSkillIcons();
  }
  document.documentElement.classList.add("presentation-ready");
  document.documentElement.classList.remove("presentation-loading");
  if (skillsTrack && skillGroups.length > 0) {
    updateSkillRotation();
    goToSkillPage(activeSkillPage, "auto");
  }
  updateSlideNavigation();

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      let targetId;
      try {
        targetId = decodeURIComponent(hash.slice(1));
      } catch {
        return;
      }

      const target = document.getElementById(targetId);
      if (!target) return;

      const targetSlide = target.matches("main > .section")
        ? target
        : target.closest("main > .section");
      if (!targetSlide) return;

      event.preventDefault();
      goToSlide(presentationSlides.indexOf(targetSlide));
      if (link.classList.contains("skip-link")) {
        targetSlide
          .querySelector(":scope > .container, :scope > .hero__layout")
          ?.focus({ preventScroll: true });
      }
    });
  });

  window.addEventListener("popstate", () => {
    const targetIndex = presentationSlides.findIndex(
      (slide) => `#${slide.id}` === window.location.hash,
    );
    if (targetIndex >= 0) goToSlide(targetIndex, { updateHistory: false });
  });

  document.querySelectorAll("[data-slide-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.slideAction === "next" ? 1 : -1;
      goToSlide(currentSlideIndex + offset);
    });
  });

  function getInnerScrollContainer(target) {
    if (!(target instanceof Element)) return null;
    const container = target.closest(
      ".presentation-slide > .container, .presentation-slide > .hero__layout",
    );
    if (!container || container.scrollHeight <= container.clientHeight + 8) {
      return null;
    }
    return container;
  }

  function canInnerScroll(container, direction) {
    if (!container) return false;
    if (direction > 0) {
      return container.scrollTop + container.clientHeight < container.scrollHeight - 2;
    }
    return container.scrollTop > 2;
  }

  let wheelLock = false;
  document.querySelector("main")?.addEventListener(
    "wheel",
    (event) => {
      if (window.resumePresentation?.isModalOpen?.()) return;
      if (Math.abs(event.deltaY) < 24 || wheelLock) return;

      const direction = Math.sign(event.deltaY);
      const scrollContainer = getInnerScrollContainer(event.target);
      if (canInnerScroll(scrollContainer, direction)) return;

      event.preventDefault();
      if (!goToSlide(currentSlideIndex + direction)) return;

      wheelLock = true;
      window.setTimeout(
        () => {
          wheelLock = false;
        },
        reducedMotion.matches ? 80 : 780,
      );
    },
    { passive: false },
  );

  let touchStart = null;
  let touchSlideLock = false;
  const main = document.querySelector("main");

  main?.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.changedTouches[0];
      const scrollContainer = getInnerScrollContainer(event.target);
      touchStart = {
        x: touch.clientX,
        y: touch.clientY,
        scrollContainer,
        scrollTop: scrollContainer?.scrollTop ?? 0,
      };
    },
    { passive: true },
  );

  main?.addEventListener(
    "touchend",
    (event) => {
      if (!touchStart || touchSlideLock) return;
      if (window.resumePresentation?.isModalOpen?.()) {
        touchStart = null;
        return;
      }
      const touch = event.changedTouches[0];
      const deltaY = touchStart.y - touch.clientY;
      const deltaX = touchStart.x - touch.clientX;
      const { scrollContainer, scrollTop } = touchStart;
      touchStart = null;

      if (Math.abs(deltaY) < 60 || Math.abs(deltaY) < Math.abs(deltaX)) return;
      const direction = Math.sign(deltaY);
      if (scrollContainer && Math.abs(scrollContainer.scrollTop - scrollTop) > 2) {
        return;
      }
      if (canInnerScroll(scrollContainer, direction)) return;
      if (!goToSlide(currentSlideIndex + direction)) return;

      touchSlideLock = true;
      window.setTimeout(
        () => {
          touchSlideLock = false;
        },
        reducedMotion.matches ? 80 : 780,
      );
    },
    { passive: true },
  );

  main?.addEventListener(
    "touchcancel",
    () => {
      touchStart = null;
    },
    { passive: true },
  );

  document.addEventListener("keydown", (event) => {
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      window.resumePresentation?.isModalOpen?.() ||
      (event.key === " " &&
        event.target instanceof Element &&
        event.target.closest("a, button, input, select, textarea, [contenteditable='true']")) ||
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLTextAreaElement ||
      navigation?.classList.contains("is-open")
    ) {
      return;
    }

    const directionKeys = ["ArrowDown", "PageDown", " ", "ArrowRight"];
    const reverseKeys = ["ArrowUp", "PageUp", "ArrowLeft"];
    let direction = 0;

    if (directionKeys.includes(event.key)) direction = 1;
    if (reverseKeys.includes(event.key)) direction = -1;
    if (event.key === "Home") direction = -currentSlideIndex;
    if (event.key === "End") {
      direction = presentationSlides.length - 1 - currentSlideIndex;
    }
    if (direction === 0) return;

    const scrollContainer = getInnerScrollContainer(event.target);
    if (scrollContainer && event.key === "Home" && scrollContainer.scrollTop > 2) {
      event.preventDefault();
      scrollContainer.scrollTop = 0;
      return;
    }
    if (
      scrollContainer &&
      event.key === "End" &&
      scrollContainer.scrollTop + scrollContainer.clientHeight <
        scrollContainer.scrollHeight - 2
    ) {
      event.preventDefault();
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
      return;
    }
    if (
      event.key !== "Home" &&
      event.key !== "End" &&
      canInnerScroll(scrollContainer, direction)
    ) {
      return;
    }

    event.preventDefault();
    goToSlide(currentSlideIndex + direction);
  });

  backToTopButton?.addEventListener("click", () => {
    goToSlide(0);
  });

  // Управляет мобильной навигацией и закрывает её при уходе со страницы меню.
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-navigation");

  function setMenuOpen(isOpen) {
    if (!menuToggle || !navigation) return;
    navigation.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.dataset.i18nAriaLabel = isOpen
      ? "accessibility.menuClose"
      : "accessibility.menuOpen";
    window.applyTranslations?.();
  }

  menuToggle?.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  navigation?.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (
      navigation?.classList.contains("is-open") &&
      !navigation.contains(event.target) &&
      !menuToggle?.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) setMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (window.resumePresentation?.isModalOpen?.()) return;

    if (navigation?.classList.contains("is-open")) {
      setMenuOpen(false);
      menuToggle?.focus();
    }
  });

  // Включает кастомный курсор только на устройствах с точным указателем.
  const customCursor = document.querySelector(".custom-cursor");
  const hoverAvailable = window.matchMedia("(hover: hover)");

  if (customCursor && hoverAvailable.matches) {
    const hoverSelector = "a, button, .skill-list li, .glass-card";

    window.addEventListener(
      "pointermove",
      (event) => {
        if (event.pointerType !== "mouse") return;
        customCursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
        customCursor.style.opacity = "1";
      },
      { passive: true },
    );

    document.addEventListener("pointerover", (event) => {
      if (event.pointerType !== "mouse") return;
      customCursor.classList.toggle(
        "is-hover",
        event.target instanceof Element &&
          Boolean(event.target.closest(hoverSelector)),
      );
    });

    document.addEventListener("pointerout", (event) => {
      if (event.pointerType !== "mouse") return;
      if (
        !(event.relatedTarget instanceof Element) ||
        !event.relatedTarget.closest(hoverSelector)
      ) {
        customCursor.classList.remove("is-hover");
      }
    });

    document.documentElement.addEventListener("pointerleave", () => {
      customCursor.style.opacity = "0";
    });
  } else if (customCursor) {
    customCursor.hidden = true;
  }
});
