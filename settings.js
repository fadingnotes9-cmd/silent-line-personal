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
          <button class="st-item" data-action="my-rooms">
            <div class="st-item-icon purple">📋</div>
            <div class="st-item-label">Kelola Room Saya</div>
            <div class="st-item-arrow">›</div>
          </button>
        </div>

        <div class="st-section">
          <div class="st-section-title">Tampilan</div>
          <button class="st-item" data-action="theme">
            <div class="st-item-icon blue">🎨</div>
            <div class="st-item-label">Tema</div>
            <div class="st-item-value" id="st-theme-val">Terang</div>
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
  document.querySelector('.st-content').addEventListener('click', async function(e) {
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
    // ===== UBAH KODE =====
    if (action === 'change-code') {
      closeSettings();
      setTimeout(function() {
        if (window.openChangeCode) {
          window.openChangeCode();
        } else {
          __slAlert({ icon: '❌', title: 'Error', message: 'Fitur ubah kode tidak tersedia.' });
        }
      }, 300);
      return;
    }

    


    // ===== RESET APLIKASI =====
    if (action === "reset-app") {
      var ok1 = await __slConfirm({
        icon: '⚠️',
        title: 'Reset Aplikasi',
        message: 'Semua pengaturan akan dihapus:\n• Nama profil\n• Kode rahasia\n• Room tersimpan\n• Tema, notifikasi, dll.\n\nRoom yang Anda buat akan DIHAPUS PERMANEN dari server.\nRoom yang Anda ikuti tetap ada.',
        type: 'danger',
        confirmText: 'Lanjut',
        cancelText: 'Batal'
      });
      if (!ok1) return;

      var ok2 = await __slPrompt({
        icon: '🔐',
        title: 'Konfirmasi Reset',
        message: 'Ketik RESET (huruf kapital) untuk konfirmasi:',
        placeholder: 'RESET'
      });
      if (ok2 !== 'RESET') {
        await __slAlert({ icon: '❌', title: 'Dibatalkan', message: 'Reset aplikasi dibatalkan.' });
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
        __slAlert({ icon: '✅', title: 'Reset Selesai', message: 'Aplikasi akan dimuat ulang.' });
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

    // ===== INFO PENYIMPANAN =====
    if (action === "storage-info") {
      var detail = [];
      var totalBytes = 0;
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf("sl_") === 0) {
          var v = String(localStorage.getItem(k) || "");
          var bytes = (v.length + k.length) * 2;
          totalBytes += bytes;
          var sizeText = bytes < 1024 ? bytes + " B" : (bytes/1024).toFixed(1) + " KB";
          detail.push("• " + k + ": " + sizeText);
        }
      }
      var totalText = totalBytes < 1024 ? totalBytes + " B" : (totalBytes/1024).toFixed(1) + " KB";
      __slAlert({
        icon: '💾',
        title: 'Info Penyimpanan',
        message: (detail.length ? detail.join('\n') : '(belum ada data)') + '\n\nTotal: ' + totalText + '\n\nData lokal saja. Foto/pesan di server tidak dihitung.'
      });
      return;
    }

    // ===== HAPUS AKUN =====
    if (action === "delete-account") {
      var okA = await __slConfirm({
        icon: '⚠️',
        title: 'Hapus Akun',
        message: 'Semua data akan DIHAPUS PERMANEN:\n• Room yang Anda buat\n• Identitas device\n• Semua pengaturan\n• Kode aktivasi\n\nAnda akan dianggap pengguna BARU.',
        type: 'danger',
        confirmText: 'Lanjut',
        cancelText: 'Batal'
      });
      if (!okA) return;

      var okB = await __slPrompt({
        icon: '🗑️',
        title: 'Konfirmasi Hapus',
        message: 'Ketik HAPUS (huruf kapital) untuk konfirmasi:',
        placeholder: 'HAPUS'
      });
      if (okB !== 'HAPUS') {
        await __slAlert({ icon: '❌', title: 'Dibatalkan', message: 'Hapus akun dibatalkan.' });
        return;
      }

      var finishDelete = function() {
        // Hapus SEMUA localStorage (termasuk sl_device_id)
        var klist = [];
        for (var i = 0; i < localStorage.length; i++) {
          var kk = localStorage.key(i);
          if (kk && kk.indexOf("sl_") === 0) klist.push(kk);
        }
        klist.forEach(function(k) { localStorage.removeItem(k); });
        __slAlert({ icon: '✅', title: 'Akun Dihapus', message: 'Aplikasi akan dimuat ulang.' });
        setTimeout(function() { location.reload(); }, 400);
      };

      if (window.__slDeleteAccount) {
        window.__slDeleteAccount()
          .then(function(result) {
            console.log("✅ Hapus akun:", result);
          })
          .catch(function(e) {
            console.error("Hapus akun gagal:", e);
          })
          .then(finishDelete);
      } else {
        finishDelete();
      }
      return;
    }

    // ===== KELOLA ROOM SAYA (Fase 3.18) =====
    if (action === "my-rooms") {
      if (!window.__slGetMyRooms) { __slAlert({ icon: '❌', title: 'Error', message: 'Fitur tidak tersedia. Coba restart aplikasi.' }); return; }
      window.__slGetMyRooms().then(async function(res) {
        if (!res.ok) { __slAlert({ icon: '❌', title: 'Gagal', message: 'Gagal ambil data: ' + res.error }); return; }
        if (!res.rooms.length) { __slAlert({ icon: '📋', title: 'Belum Ada Room', message: 'Anda belum membuat room apapun.' }); return; }
        var list = res.rooms.map(function(r) { return "• " + r.code + " — " + (r.ownerName || 'Tanpa Nama'); }).join("\n");
        var input = await __slPrompt({
          icon: '📋',
          title: 'Kelola Room',
          message: 'Room yang Anda buat (' + res.rooms.length + '):\n\n' + list + '\n\nKetik kode room untuk HAPUS PERMANEN:',
          placeholder: 'Kode room',
          inputType: 'tel'
        });
        if (!input) return;
        var code = input.trim();
        if (!/^[0-9]{6,10}$/.test(code)) { __slAlert({ icon: '❌', title: 'Kode Tidak Valid', message: 'Kode harus 6-10 digit angka.' }); return; }
        var delOk = await __slConfirm({
          icon: '⚠️',
          title: 'Hapus Room',
          message: 'Yakin HAPUS PERMANEN room ' + code + '?\n\nSemua pesan akan hilang.',
          type: 'danger',
          confirmText: 'Hapus',
          cancelText: 'Batal'
        });
        if (!delOk) return;
        if (window.__slDeleteRoom) {
          window.__slDeleteRoom(code).then(function(delRes) {
            if (delRes.ok) { __slAlert({ icon: '✅', title: 'Berhasil', message: 'Room ' + code + ' berhasil dihapus.' }); }
            else { __slAlert({ icon: '❌', title: 'Gagal', message: 'Gagal hapus: ' + delRes.error }); }
          });
        } else {
          __slAlert({ icon: '❌', title: 'Error', message: 'Fungsi hapus tidak tersedia.' });
        }
      });
      return;
    }

    // ===== AUTO-HAPUS PESAN =====
    if (action === "auto-delete") {
      var curAD = localStorage.getItem("sl_auto_delete") || "24";
      var cycleAD = { "0": "1", "1": "6", "6": "24", "24": "168", "168": "0" };
      var nextAD = cycleAD[curAD] || "24";
      localStorage.setItem("sl_auto_delete", nextAD);
      var labelAD = { "0": "Off", "1": "1 jam", "6": "6 jam", "24": "24 jam", "168": "7 hari" }[nextAD] || "24 jam";
      var elAD = document.getElementById("st-delete-val");
      if (elAD) elAD.textContent = labelAD;
      return;
    }

    // ===== TENTANG =====
    if (action === "about") {
      __slAlert({
        icon: 'ℹ️',
        title: 'Silent Line Personal',
        message: 'Versi: v2.2.1\n\nKoordinasi aman, tanpa jejak.\n\n© 2026 Silent Line'
      });
      return;
    }
    if (action === "privacy") {
      __slAlert({
        icon: '📜',
        title: 'Kebijakan Privasi',
        message: '\u2022 Pesan hanya tersimpan di perangkat Anda.\n\u2022 Tidak ada pelacakan pengguna.\n\u2022 Tidak ada data yang dijual ke pihak ketiga.\n\u2022 Data dihapus otomatis sesuai pengaturan.'
      });
      return;
    }
    if (action === "terms") {
      __slAlert({
        icon: '📝',
        title: 'Syarat & Ketentuan',
        message: '1. Untuk komunikasi privat.\n2. Dilarang untuk aktivitas ilegal.\n3. Pengguna bertanggung jawab atas konten.\n4. Layanan disediakan apa adanya.'
      });
      return;
    }

// Placeholder untuk action lain
    console.log('Settings action:', action);
    __slAlert({ icon: '🚧', title: 'Fitur Segera', message: 'Fitur ' + item.querySelector('.st-item-label').textContent.trim() + ' sedang dikembangkan.' });
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
