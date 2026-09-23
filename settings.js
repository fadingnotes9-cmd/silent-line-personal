/* ============================================
   SETTINGS PANEL — Silent Line Personal
   ============================================ */

(function() {
  // ========== CSS ==========
  const css = `
    .st-panel {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: #f4f6f8;
      z-index: 9000;
      display: none;
      flex-direction: column;
      overflow-y: auto;
      transform: translateX(100%);
      transition: transform 0.25s ease-out;
    }
    .st-panel.active { display: flex; transform: translateX(0); }

    .st-header {
      background: linear-gradient(135deg, #5b8def, #3a6fd8);
      color: #fff;
      padding: 14px 16px;
      padding-top: calc(14px + env(safe-area-inset-top, 0px));
      display: flex; align-items: center; gap: 12px;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(91,141,239,.25);
      position: sticky; top: 0; z-index: 10;
    }
    .st-header-btn {
      background: rgba(255,255,255,.15);
      border: none; color: #fff;
      width: 36px; height: 36px; border-radius: 50%;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; flex-shrink: 0;
      font-family: inherit;
    }
    .st-header-btn:active { background: rgba(255,255,255,.3); }
    .st-header-title { font-size: 17px; font-weight: 700; flex: 1; }

    .st-content {
      flex: 1; padding: 12px 0;
      padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
    }

    .st-section {
      margin: 0 12px 12px;
      background: #fff; border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e4e9ee;
    }
    .st-section-title {
      font-size: 12px; font-weight: 700;
      color: #718096; text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 14px 16px 8px;
    }

    .st-item {
      display: flex; align-items: center; gap: 14px;
      padding: 12px 16px;
      cursor: pointer;
      border: none; background: transparent;
      width: 100%; text-align: left;
      font-family: inherit; font-size: 15px; font-weight: 500;
      color: #1a202c;
      transition: background 0.15s;
      border-bottom: 1px solid #f0f2f5;
    }
    .st-item:last-child { border-bottom: none; }
    .st-item:active { background: #f4f6f8; }

    .st-item-icon {
      width: 38px; height: 38px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; flex-shrink: 0;
    }
    .st-item-icon.blue { background: #e8f0ff; color: #3a6fd8; }
    .st-item-icon.green { background: #e6fffa; color: #2c7a7b; }
    .st-item-icon.orange { background: #fffaf0; color: #c05621; }
    .st-item-icon.red { background: #fff5f5; color: #c53030; }
    .st-item-icon.purple { background: #faf5ff; color: #6b46c1; }
    .st-item-icon.gray { background: #f7fafc; color: #4a5568; }

    .st-item-label { flex: 1; min-width: 0; }
    .st-item-label .sub {
      font-size: 12.5px; color: #718096;
      font-weight: 400; margin-top: 2px;
    }
    .st-item-value { color: #718096; font-size: 14px; flex-shrink: 0; }
    .st-item-arrow { color: #cbd5e0; font-size: 18px; flex-shrink: 0; }

    .st-danger-zone .st-section-title { color: #c53030; }

    .st-footer {
      text-align: center;
      font-size: 11px;
      color: #cbd5e0;
      letter-spacing: 2px;
      font-weight: 700;
      padding: 20px 0;
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ========== HTML ==========
  const html = `
    <div class="st-panel" id="st-panel">
      <div class="st-header">
        <button class="st-header-btn" id="st-close">←</button>
        <div class="st-header-title">Pengaturan</div>
      </div>
      <div class="st-content">

        <div class="st-section">
          <div class="st-section-title">Room Aktif</div>
          <button class="st-item" data-action="room-info">
            <div class="st-item-icon blue">ℹ</div>
            <div class="st-item-label">Info Room</div>
            <div class="st-item-arrow">›</div>
          </button>
          <button class="st-item" data-action="clear-chat">
            <div class="st-item-icon orange">🧹</div>
            <div class="st-item-label">Hapus Semua Chat</div>
            <div class="st-item-arrow">›</div>
          </button>
          <button class="st-item" data-action="leave-room">
            <div class="st-item-icon orange">🚪</div>
            <div class="st-item-label">Keluar Room</div>
            <div class="st-item-arrow">›</div>
          </button>
        </div>

        <div class="st-section">
          <div class="st-section-title">Profil</div>
          <button class="st-item" data-action="edit-name">
            <div class="st-item-icon blue">👤</div>
            <div class="st-item-label">Ubah Nama</div>
            <div class="st-item-arrow">›</div>
          </button>
        </div>

        <div class="st-section">
          <div class="st-section-title">Keamanan</div>
          <button class="st-item" data-action="change-code">
            <div class="st-item-icon purple">🔐</div>
            <div class="st-item-label">Ubah Kode Rahasia</div>
            <div class="st-item-arrow">›</div>
          </button>
          <button class="st-item" data-action="auto-lock">
            <div class="st-item-icon purple">⏱</div>
            <div class="st-item-label">
              Auto-Lock
              <div class="sub">Keluar otomatis saat idle</div>
            </div>
            <div class="st-item-value" id="st-auto-lock-val">Off</div>
          </button>
        </div>

        <div class="st-section">
          <div class="st-section-title">Tampilan</div>
          <button class="st-item" data-action="theme">
            <div class="st-item-icon blue">🎨</div>
            <div class="st-item-label">Tema</div>
            <div class="st-item-value" id="st-theme-val">Terang</div>
          </button>
          <button class="st-item" data-action="font-size">
            <div class="st-item-icon blue">Aa</div>
            <div class="st-item-label">Ukuran Font</div>
            <div class="st-item-value" id="st-font-val">Sedang</div>
          </button>
        </div>

        <div class="st-section">
          <div class="st-section-title">Chat</div>
          <button class="st-item" data-action="auto-delete">
            <div class="st-item-icon green">⏳</div>
            <div class="st-item-label">Auto-Hapus Pesan</div>
            <div class="st-item-value" id="st-delete-val">24 jam</div>
          </button>
        </div>

        <div class="st-section">
          <div class="st-section-title">Notifikasi</div>
          <button class="st-item" data-action="toggle-sound">
            <div class="st-item-icon green">🔊</div>
            <div class="st-item-label">Suara</div>
            <div class="st-item-value" id="st-sound-val">On</div>
          </button>
          <button class="st-item" data-action="toggle-vibrate">
            <div class="st-item-icon green">📳</div>
            <div class="st-item-label">Getar</div>
            <div class="st-item-value" id="st-vibrate-val">On</div>
          </button>
        </div>

        <div class="st-section">
          <div class="st-section-title">Data</div>
          <button class="st-item" data-action="storage-info">
            <div class="st-item-icon gray">💾</div>
            <div class="st-item-label">Info Penyimpanan</div>
            <div class="st-item-value" id="st-storage-val">0 KB</div>
          </button>
        </div>

        <div class="st-section st-danger-zone">
          <div class="st-section-title">Zona Bahaya</div>
          <button class="st-item" data-action="reset-app">
            <div class="st-item-icon red">⚠</div>
            <div class="st-item-label">Reset Aplikasi</div>
            <div class="st-item-arrow">›</div>
          </button>
          <button class="st-item" data-action="delete-account">
            <div class="st-item-icon red">🗑</div>
            <div class="st-item-label">Hapus Akun</div>
            <div class="st-item-arrow">›</div>
          </button>
        </div>

        <div class="st-section">
          <div class="st-section-title">Tentang</div>
          <button class="st-item" data-action="about">
            <div class="st-item-icon gray">ℹ</div>
            <div class="st-item-label">Versi Aplikasi</div>
            <div class="st-item-value">v2.2.1</div>
          </button>
          <button class="st-item" data-action="privacy">
            <div class="st-item-icon gray">📄</div>
            <div class="st-item-label">Kebijakan Privasi</div>
            <div class="st-item-arrow">›</div>
          </button>
          <button class="st-item" data-action="terms">
            <div class="st-item-icon gray">📋</div>
            <div class="st-item-label">Syarat & Ketentuan</div>
            <div class="st-item-arrow">›</div>
          </button>
        </div>

        <div class="st-footer">SILENT LINE</div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);

  // ========== PUBLIC API ==========
  window.openSettings = function() {
    document.getElementById('st-panel').classList.add('active');
    loadValues();
  };
  window.closeSettings = function() {
    document.getElementById('st-panel').classList.remove('active');
  };

  document.getElementById('st-close').addEventListener('click', closeSettings);

  // ========== LOAD NILAI ==========
  function loadValues() {
    const autoLock = localStorage.getItem('sl_auto_lock') || '0';
    const autoLockText = { '0': 'Off', '1': '1 menit', '5': '5 menit', '15': '15 menit' }[autoLock] || 'Off';
    const el1 = document.getElementById('st-auto-lock-val');
    if (el1) el1.textContent = autoLockText;

    const theme = localStorage.getItem('sl_theme') || 'light';
    const themeText = { 'light': 'Terang', 'dark': 'Gelap', 'auto': 'Otomatis' }[theme] || 'Terang';
    const el2 = document.getElementById('st-theme-val');
    if (el2) el2.textContent = themeText;


    const font = localStorage.getItem('sl_font_size') || 'medium';
    const fontText = { 'small': 'Kecil', 'medium': 'Sedang', 'large': 'Besar' }[font] || 'Sedang';
    const el4 = document.getElementById('st-font-val');
    if (el4) el4.textContent = fontText;


    const autoDelete = localStorage.getItem('sl_auto_delete') || '24';
    const deleteText = { '0': 'Off', '6': '6 jam', '12': '12 jam', '24': '24 jam', '168': '7 hari' }[autoDelete] || '24 jam';
    const el6 = document.getElementById('st-delete-val');
    if (el6) el6.textContent = deleteText;

    const sound = localStorage.getItem('sl_notif_sound') !== 'off';
    const el7 = document.getElementById('st-sound-val');
    if (el7) el7.textContent = sound ? 'On' : 'Off';

    const vibrate = localStorage.getItem('sl_notif_vibrate') !== 'off';
    const el8 = document.getElementById('st-vibrate-val');
    if (el8) el8.textContent = vibrate ? 'On' : 'Off';

    let totalSize = 0;
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        totalSize += (String(localStorage[key]).length + key.length) * 2;
      }
    }
    let sizeText;
    if (totalSize < 1024) {
      sizeText = totalSize + ' B';
    } else if (totalSize < 1024 * 1024) {
      sizeText = (totalSize / 1024).toFixed(1) + ' KB';
    } else {
      sizeText = (totalSize / (1024 * 1024)).toFixed(1) + ' MB';
    }
    const el9 = document.getElementById('st-storage-val');
    if (el9) el9.textContent = sizeText;
  }

  // ========== HANDLE ACTION ==========
  document.querySelector('.st-content').addEventListener('click', function(e) {
    const item = e.target.closest('.st-item');
    if (!item) return;
    const action = item.dataset.action;

    // Room actions → forward ke handler lama
    if (action === 'room-info') {
      closeSettings();
      setTimeout(function() {
        const b = document.getElementById('sheet-info');
        if (b) b.click();
      }, 300);
      return;
    }
    if (action === 'clear-chat') {
      closeSettings();
      setTimeout(function() {
        const b = document.getElementById('sheet-clear');
        if (b) b.click();
      }, 300);
      return;
    }
    if (action === 'leave-room') {
      closeSettings();
      setTimeout(function() {
        const b = document.getElementById('btn-leave');
        if (b) b.click();
      }, 300);
      return;
    }

    // ===== UBAH NAMA =====
    if (action === 'edit-name') {
      var currentName = localStorage.getItem('sl_user_name') || (window.state && window.state.name) || '';
      var newName = prompt('Masukkan nama baru:\n\n(maks 20 karakter)', currentName);
      if (newName === null) return;
      newName = newName.trim();
      if (newName.length < 1) return;
      if (newName.length > 20) {
        alert('❌ Maksimal 20 karakter');
        return;
      }
      localStorage.setItem('sl_user_name', newName);
      if (window.updateProfileName) {
        window.updateProfileName(newName);
      }
      alert('✅ Nama diubah ke: ' + newName);
      return;
    }

    // ===== UBAH KODE =====
    if (action === 'change-code') {
      closeSettings();
      setTimeout(function() {
        if (window.openChangeCode) {
          window.openChangeCode();
        } else {
          alert('Fitur ubah kode tidak tersedia');
        }
      }, 300);
      return;
    }

    


    // ===== RESET APLIKASI =====
    if (action === "reset-app") {
      var ok1 = confirm(
        "⚠️ RESET APLIKASI\n\n" +
        "Semua pengaturan akan dihapus:\n" +
        "• Nama profil\n" +
        "• Kode rahasia\n" +
        "• Room tersimpan\n" +
        "• Tema, notifikasi, dll.\n\n" +
        "Room yang Anda buat akan DIHAPUS PERMANEN dari server.\n" +
        "Room yang Anda ikuti (bukan milik Anda) tetap ada.\n\n" +
        "Lanjutkan?"
      );
      if (!ok1) return;

      var ok2 = prompt("Ketik RESET (huruf kapital) untuk konfirmasi:");
      if (ok2 !== "RESET") {
        alert("❌ Reset dibatalkan.");
        return;
      }

      var doReset = function() {
        var keys = [];
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i);
          // Jangan hapus device ID (identitas device permanen)
          if (k && k.indexOf("sl_") === 0 && k !== "sl_device_id") keys.push(k);
        }
        keys.forEach(function(k) { localStorage.removeItem(k); });
        alert("✅ Reset selesai. Aplikasi akan dimuat ulang.");
        setTimeout(function() { location.reload(); }, 400);
      };

      // Purge room creator dari Firebase (Fase 5.5c)
      if (window.__slPurgeMyRooms) {
        window.__slPurgeMyRooms()
          .then(function(result) {
            console.log("✅ Purge:", result.deleted + "/" + result.total + " room dihapus");
          })
          .catch(function(e) {
            console.error("Gagal purge room:", e);
          })
          .then(doReset);
      } else {
        doReset();
      }
      return;
    }

    // ===== NOTIFIKASI =====
    if (action === "toggle-sound") {
      var cur = localStorage.getItem("sl_notif_sound") || "on";
      var next = cur === "on" ? "off" : "on";
      localStorage.setItem("sl_notif_sound", next);
      var elS = document.getElementById("st-sound-val");
      if (elS) elS.textContent = next === "on" ? "On" : "Off";
      return;
    }
    if (action === "toggle-vibrate") {
      var curV = localStorage.getItem("sl_notif_vibrate") || "on";
      var nextV = curV === "on" ? "off" : "on";
      localStorage.setItem("sl_notif_vibrate", nextV);
      var elV = document.getElementById("st-vibrate-val");
      if (elV) elV.textContent = nextV === "on" ? "On" : "Off";
      return;
    }

    // ===== TEMA =====
    if (action === "theme") {
      var next = window.SLTheme ? window.SLTheme.cycle() : "light";
      var map = { light: "Terang", dark: "Gelap", auto: "Otomatis" };
      var el = document.getElementById("st-theme-val");
      if (el) el.textContent = map[next] || "Terang";
      return;
    }

    // ===== AUTO-LOCK =====
    if (action === "auto-lock") {
      var curAL = localStorage.getItem("sl_auto_lock") || "0";
      var cycle = { "0": "1", "1": "5", "5": "15", "15": "0" };
      var nextAL = cycle[curAL] || "0";
      localStorage.setItem("sl_auto_lock", nextAL);
      var labelAL = { "0": "Off", "1": "1 menit", "5": "5 menit", "15": "15 menit" }[nextAL] || "Off";
      var elAL = document.getElementById("st-auto-lock-val");
      if (elAL) elAL.textContent = labelAL;
      if (window.__slUpdateIdleTimer) window.__slUpdateIdleTimer(parseInt(nextAL, 10));
      return;
    }

    // ===== TENTANG =====
    if (action === "about") {
      alert("Silent Line Personal\n\nVersi: v2.2.1\nKoordinasi aman, tanpa jejak.\n\n\u00a9 2026 Silent Line");
      return;
    }
    if (action === "privacy") {
      alert("Kebijakan Privasi\n\n\u2022 Pesan hanya tersimpan di perangkat Anda.\n\u2022 Tidak ada pelacakan pengguna.\n\u2022 Tidak ada data yang dijual ke pihak ketiga.\n\u2022 Data dihapus otomatis sesuai pengaturan.");
      return;
    }
    if (action === "terms") {
      alert("Syarat & Ketentuan\n\n1. Untuk komunikasi privat.\n2. Dilarang untuk aktivitas ilegal.\n3. Pengguna bertanggung jawab atas konten.\n4. Layanan disediakan apa adanya.");
      return;
    }

// Placeholder untuk action lain
    console.log('Settings action:', action);
    alert('Fitur sedang dikembangkan:\n\n' + item.querySelector('.st-item-label').textContent.trim());
  });

  console.log('✅ settings.js loaded');

  // init notif labels
  function __initNotifLabels() {
    var s = localStorage.getItem("sl_notif_sound") || "on";
    var v = localStorage.getItem("sl_notif_vibrate") || "on";
    var elS = document.getElementById("st-sound-val");
    var elV = document.getElementById("st-vibrate-val");
    if (elS) elS.textContent = s === "on" ? "On" : "Off";
    if (elV) elV.textContent = v === "on" ? "On" : "Off";
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", __initNotifLabels);
  } else {
    __initNotifLabels();
  }

})();
