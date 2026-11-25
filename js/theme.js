"use strict";

(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector(".theme-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const storageKey = "resume-theme";
  const validThemes = ["dark", "light"];
  const storedTheme = localStorage.getItem(storageKey);
  const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  function applyTheme(theme, persist = false) {
    const nextTheme = validThemes.includes(theme) ? theme : "dark";
    root.dataset.theme = nextTheme;
    if (themeMeta) {
      themeMeta.content = nextTheme === "light" ? "#f8fafc" : "#0f0f1a";
    }

    if (themeButton) {
      const isLight = nextTheme === "light";
      themeButton.setAttribute("aria-pressed", String(isLight));
      themeButton.dataset.i18nAriaLabel = isLight
        ? "accessibility.themeDark"
        : "accessibility.themeLight";
      const icon = themeButton.querySelector(".theme-toggle__icon");
      if (icon) icon.textContent = isLight ? "🌙" : "☀️";
    }

    if (persist) localStorage.setItem(storageKey, nextTheme);
    window.applyTranslations?.();
  }

  applyTheme(storedTheme || (systemPrefersLight ? "light" : "dark"));

  themeButton?.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
  });

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey) {
      applyTheme(event.newValue || (systemPrefersLight ? "light" : "dark"));
    }
  });
})();
