/* ============================================
   SETUP WIZARD — Silent Line Personal
   4 slide onboarding untuk user baru
   ============================================ */

(function() {
  // Cek apakah sudah setup sebelumnya
  const hasCode = localStorage.getItem('sl_user_code');
  if (hasCode) return; // Sudah setup, tidak perlu wizard

  // ========== CSS WIZARD ============
  const css = `
    .wz-overlay {
      position: fixed; inset: 0;
      background: linear-gradient(160deg, #f0f7ff 0%, #e8f0ff 50%, #fff 100%);
      z-index: 9999;
      display: none;
      flex-direction: column;
      padding: 24px 20px;
      padding-top: calc(24px + env(safe-area-inset-top, 0px));
      padding-bottom: calc(24px + env(safe-area-inset-bottom, 0px));
      overflow-y: auto;
    }
    .wz-overlay.active { display: flex; }

    .wz-progress {
      display: flex;
      gap: 6px;
      margin-bottom: 32px;
      justify-content: center;
    }
    .wz-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #cbd5e0;
      transition: all 0.3s;
    }
    .wz-dot.active { background: #5b8def; width: 24px; border-radius: 4px; }
    .wz-dot.done { background: #48bb78; }

    .wz-slide { display: none; flex-direction: column; flex: 1; }
    .wz-slide.active { display: flex; }

    .wz-logo {
      width: 84px; height: 84px;
      border-radius: 24px;
      background: linear-gradient(135deg, #5b8def, #3a6fd8);
      display: flex; align-items: center; justify-content: center;
      font-size: 32px; color: #fff;
      font-weight: 700; letter-spacing: 1px;
      margin: 0 auto 24px;
      box-shadow: 0 12px 32px rgba(91,141,239,.35);
    }

    .wz-title {
      font-size: 24px; font-weight: 800;
      color: #1a202c;
      text-align: center;
      margin-bottom: 12px;
      letter-spacing: .3px;
    }

    .wz-subtitle {
      font-size: 15px; color: #718096;
      text-align: center;
      line-height: 1.6;
      margin-bottom: 32px;
      padding: 0 20px;
    }

    .wz-body { flex: 1; }

    .wz-actions {
      display: flex; flex-direction: column;
      gap: 12px;
      margin-top: 24px;
    }

    .wz-btn {
      width: 100%; padding: 16px;
      background: linear-gradient(135deg, #5b8def, #3a6fd8);
      color: #fff;
      border: none; border-radius: 12px;
      font-size: 16px; font-weight: 700;
      font-family: inherit;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(91,141,239,.3);
      transition: all .15s;
    }
    .wz-btn:active { transform: scale(.98); }
    .wz-btn.ghost {
      background: transparent;
      color: #718096;
      box-shadow: none;
      font-weight: 500;
    }

    .wz-brand {
      font-size: 11px; color: #cbd5e0;
      letter-spacing: 2px; text-align: center;
      font-weight: 700;
      margin-top: 16px;
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ========== HTML WIZARD ============
  const html = `
    <div class="wz-overlay" id="wz-overlay">
      <div class="wz-progress" id="wz-progress">
        <div class="wz-dot active" data-step="1"></div>
        <div class="wz-dot" data-step="2"></div>
        <div class="wz-dot" data-step="3"></div>
        <div class="wz-dot" data-step="4"></div>
      </div>

      <!-- SLIDE 1: Welcome -->
      <div class="wz-slide active" data-slide="1">
        <div class="wz-body">
          <div class="wz-logo">SL</div>
          <div class="wz-title">Selamat Datang</div>
          <div class="wz-subtitle">
            Silent Line adalah aplikasi chat privat
            yang tampil sebagai kalkulator.
            <br><br>
            Data Anda aman & tidak dibagikan.
          </div>
        </div>
        <div class="wz-actions">
          <button class="wz-btn" id="wz-next-1">Mulai Setup</button>
        </div>
        <div class="wz-brand">SILENT LINE v2.2.1</div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);

  // ========== SHOW WIZARD ==========
  setTimeout(function() {
    const overlay = document.getElementById('wz-overlay');
    if (overlay) overlay.classList.add('active');
  }, 100);

  // ========== LOGIC SLIDE 1 ==========
  document.getElementById('wz-next-1').addEventListener('click', function() {
    console.log('Wizard slide 1: Next clicked');
    // Nanti: go to slide 2
  });
})();
