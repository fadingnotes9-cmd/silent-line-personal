/* ============================================
   THEME MANAGER — Silent Line Personal
   Light / Dark / Auto  (v2 - fix global)
   ============================================ */
(function () {
  "use strict";

  var STORAGE_KEY = "sl_theme";
  var root = document.documentElement;

  var css = `
    /* ===== DARK MODE — OVERRIDE CSS VARIABLES ===== */
    html.dark {
      --bg: #0f1419;
      --chat: #0a0e13;
      --sent: #1e3a5f;
      --t: #e2e8f0;
      --t2: #94a3b8;
      --bd: #2d3748;
      --pl: #1e293b;
      --dgL: #2d1b1b;
    }

    /* ===== FORCE BG & TEXT DI ROOT ===== */
    html.dark body {
      background: var(--bg);
      color: var(--t);
    }
    html.dark .screen {
      background: var(--bg);
    }
    html.dark .chat-bg {
      background: var(--chat);
    }

    /* ===== CONTAINER (hardcoded #fff) ===== */
    html.dark .container {
      background: var(--bg);
    }

    /* ===== LOGIN AREA ===== */
    html.dark .login-wrap {
      background: linear-gradient(160deg, #0f1419 0%, #131a22 50%, #0f1419 100%);
    }
    html.dark .login-title {
      color: var(--t);
    }
    html.dark .login-card {
      background: #1a202c;
      border-color: var(--bd);
      box-shadow: 0 4px 24px rgba(0,0,0,.4);
    }
    html.dark .rem-rooms {
      background: #1a202c;
      border-color: var(--bd);
      box-shadow: 0 2px 8px rgba(0,0,0,.3);
    }
    html.dark .rem-rooms h4 {
      color: var(--t2);
    }
    html.dark .rem-item {
      background: var(--pl);
    }
    html.dark .rem-item .code {
      color: var(--t);
    }

    /* ===== TABS ===== */
    html.dark .tabs {
      background: #0f1419;
    }
    html.dark .tabs button.active {
      background: #2d3748;
      color: #93b4f0;
      box-shadow: 0 1px 3px rgba(0,0,0,.3);
    }

    /* ===== INPUT ===== */
    html.dark .field input,
    html.dark .input-row input,
    html.dark .input-row textarea {
      background: #0f1419;
      color: var(--t);
      border-color: var(--bd);
    }
    html.dark .field input::placeholder,
    html.dark .input-row input::placeholder {
      color: #64748b;
    }

    /* ===== BUTTON GHOST ===== */
    html.dark .btn.ghost {
      background: #2d3748;
      color: #93b4f0;
    }

    /* ===== BRAND FOOTER ===== */
    html.dark .brand-footer {
      color: #475569;
    }

    /* ===== CHAT AREA ===== */
    html.dark .messages {
      color: var(--t);
    }
    html.dark .chat-bottom {
      background: #1a202c;
      border-color: var(--bd);
    }
    html.dark .attach-btn {
      background: #2d3748;
      color: var(--t);
    }

    /* ===== BUBBLE (kalau pakai --sent & --bg) ===== */
    /* Bubble terkirim pakai var(--sent), bubble diterima kemungkinan pakai #fff */
    html.dark .bubble:not(.mine):not(.me):not(.sent) {
      background: #1a202c;
      color: var(--t);
    }

    /* ===== SHEET / MODAL ===== */
    html.dark .sheet,
    html.dark .modal-box {
      background: #1a202c;
      color: var(--t);
    }
    html.dark .sheet-item {
      color: var(--t);
      border-color: var(--bd);
    }
    html.dark .sheet-title {
      color: var(--t);
    }
    html.dark .sheet-handle {
      background: var(--bd);
    }
    html.dark .sheet-divider {
      background: var(--bd);
    }

    /* ===== NOTIF / BANNER ===== */
    html.dark .notif,
    html.dark .offline-banner,
    html.dark .reply-preview {
      background: #1a202c;
      color: var(--t);
      border-color: var(--bd);
    }

    /* ===== SMOOTH TRANSITION ===== */
    body, .container, .screen, .chat-bg, .login-card, .rem-rooms,
    .login-wrap, .chat-bottom, .sheet, .modal-box, .field input {
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }
    /* ===== SETTINGS PANEL (.st-*) ===== */
    html.dark .st-panel {
      background: #0f1419 !important;
      color: #e2e8f0 !important;
    }
    html.dark .st-header {
      background: linear-gradient(135deg, #1e293b, #334155) !important;
      color: #e2e8f0 !important;
      box-shadow: 0 2px 8px rgba(0,0,0,.4) !important;
    }
    html.dark .st-header-btn {
      background: rgba(255,255,255,.1) !important;
      color: #e2e8f0 !important;
    }
    html.dark .st-header-btn:active {
      background: rgba(255,255,255,.2) !important;
    }
    html.dark .st-header-title {
      color: #e2e8f0 !important;
    }
    html.dark .st-content {
      background: #0f1419 !important;
    }
    html.dark .st-section {
      background: #1a202c !important;
      border-color: #2d3748 !important;
    }
    html.dark .st-section-title {
      color: #94a3b8 !important;
    }
    html.dark .st-item {
      color: #e2e8f0 !important;
      border-bottom-color: #2d3748 !important;
    }
    html.dark .st-item:active {
      background: #2d3748 !important;
    }
    html.dark .st-item-label .sub {
      color: #94a3b8 !important;
    }
    html.dark .st-item-value {
      color: #94a3b8 !important;
    }
    html.dark .st-item-arrow {
      color: #64748b !important;
    }
    html.dark .st-item-icon.blue   { background: #1e3a5f !important; color: #93b4f0 !important; }
    html.dark .st-item-icon.green  { background: #1c3a3a !important; color: #68d391 !important; }
    html.dark .st-item-icon.orange { background: #3a2c1c !important; color: #f6ad55 !important; }
    html.dark .st-item-icon.red    { background: #3a1e1e !important; color: #fc8181 !important; }
    html.dark .st-item-icon.purple { background: #2d1e3a !important; color: #b794f4 !important; }
    html.dark .st-item-icon.gray   { background: #2d3748 !important; color: #a0aec0 !important; }
    html.dark .st-danger-zone .st-section-title {
      color: #fc8181 !important;
    }
    html.dark .st-footer {
      color: #475569 !important;
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
