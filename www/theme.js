/* ============================================
   THEME MANAGER — Silent Line Personal
   Light / Dark / Auto
   ============================================ */
(function () {
  "use strict";

  var STORAGE_KEY = "sl_theme";
  var root = document.documentElement;

  var css = `
    :root {
      --sl-bg: #f4f6f8;
      --sl-surface: #ffffff;
      --sl-border: #e4e9ee;
      --sl-text: #1a202c;
      --sl-text-sub: #718096;
      --sl-header-bg: linear-gradient(135deg, #5b8def, #3a6fd8);
      --sl-header-text: #ffffff;
      --sl-item-hover: #f4f6f8;
      --sl-danger: #c53030;
    }

    html.dark {
      --sl-bg: #0f1419;
      --sl-surface: #1a202c;
      --sl-border: #2d3748;
      --sl-text: #e2e8f0;
      --sl-text-sub: #a0aec0;
      --sl-header-bg: linear-gradient(135deg, #1a202c, #2d3748);
      --sl-header-text: #e2e8f0;
      --sl-item-hover: #2d3748;
      --sl-danger: #fc8181;
    }

    body {
      background: var(--sl-bg);
      color: var(--sl-text);
      transition: background 0.2s, color 0.2s;
    }

    .st-panel {
      background: var(--sl-bg) !important;
      color: var(--sl-text) !important;
    }
    .st-section {
      background: var(--sl-surface) !important;
      border-color: var(--sl-border) !important;
    }
    .st-section-title {
      color: var(--sl-text-sub) !important;
    }
    .st-item {
      color: var(--sl-text) !important;
      border-bottom-color: var(--sl-border) !important;
    }
    .st-item:active {
      background: var(--sl-item-hover) !important;
    }
    .st-item-label .sub,
    .st-item-value,
    .st-item-arrow {
      color: var(--sl-text-sub) !important;
    }
    .st-header {
      background: var(--sl-header-bg) !important;
      color: var(--sl-header-text) !important;
    }
  `;

  var style = document.createElement("style");
  style.id = "sl-theme-style";
  style.textContent = css;
  document.head.appendChild(style);

  function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY) || "light";
  }

  function isSystemDark() {
    return window.matchMedia &&
           window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function applyTheme(mode) {
    var effective = mode;
    if (mode === "auto") {
      effective = isSystemDark() ? "dark" : "light";
    }

    if (effective === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem(STORAGE_KEY, mode);
    updateSettingsLabel(mode);

    window.dispatchEvent(new CustomEvent("sl-theme-change", {
      detail: { mode: mode, effective: effective }
    }));
  }

  function updateSettingsLabel(mode) {
    var el = document.getElementById("st-theme-val");
    if (!el) return;
    var map = { light: "Terang", dark: "Gelap", auto: "Otomatis" };
    el.textContent = map[mode] || "Terang";
  }

  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  if (mq) {
    var handler = function () {
      if (getSavedTheme() === "auto") {
        applyTheme("auto");
      }
    };
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else if (mq.addListener) mq.addListener(handler);
  }

  applyTheme(getSavedTheme());

  window.SLTheme = {
    get: getSavedTheme,
    set: applyTheme,
    cycle: function () {
      var order = ["light", "dark", "auto"];
      var current = getSavedTheme();
      var idx = order.indexOf(current);
      var next = order[(idx + 1) % order.length];
      applyTheme(next);
      return next;
    }
  };
})();
