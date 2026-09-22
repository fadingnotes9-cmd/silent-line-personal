/* ============================================
   SETUP WIZARD — Silent Line Personal
   4 slide onboarding untuk user baru
   ============================================ */

(function() {
  const hasCode = localStorage.getItem('sl_user_code');
  if (hasCode) return;

  // ========== CSS ==========
  const css = `
    .wz-overlay {
      position: fixed; inset: 0;
      background: linear-gradient(160deg, #f0f7ff 0%, #e8f0ff 50%, #fff 100%);
      z-index: 9999; display: none; flex-direction: column;
      padding: 24px 20px;
      padding-top: calc(24px + env(safe-area-inset-top, 0px));
      padding-bottom: calc(24px + env(safe-area-inset-bottom, 0px));
      overflow-y: auto;
    }
    .wz-overlay.active { display: flex; }
    .wz-progress { display: flex; gap: 6px; margin-bottom: 32px; justify-content: center; }
    .wz-dot { width: 8px; height: 8px; border-radius: 50%; background: #cbd5e0; transition: all 0.3s; }
    .wz-dot.active { background: #5b8def; width: 24px; border-radius: 4px; }
    .wz-dot.done { background: #48bb78; }
    .wz-slide { display: none; flex-direction: column; flex: 1; }
    .wz-slide.active { display: flex; }
    .wz-logo {
      width: 84px; height: 84px; border-radius: 24px;
      background: linear-gradient(135deg, #5b8def, #3a6fd8);
      display: flex; align-items: center; justify-content: center;
      font-size: 32px; color: #fff; font-weight: 700; letter-spacing: 1px;
      margin: 0 auto 24px; box-shadow: 0 12px 32px rgba(91,141,239,.35);
    }
    .wz-title { font-size: 24px; font-weight: 800; color: #1a202c; text-align: center; margin-bottom: 12px; }
    .wz-subtitle { font-size: 15px; color: #718096; text-align: center; line-height: 1.6; margin-bottom: 32px; padding: 0 20px; }
    .wz-body { flex: 1; }
    .wz-actions { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
    .wz-btn {
      width: 100%; padding: 16px;
      background: linear-gradient(135deg, #5b8def, #3a6fd8);
      color: #fff; border: none; border-radius: 12px;
      font-size: 16px; font-weight: 700; font-family: inherit; cursor: pointer;
      box-shadow: 0 4px 12px rgba(91,141,239,.3); transition: all .15s;
    }
    .wz-btn:active { transform: scale(.98); }
    .wz-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .wz-btn.ghost { background: transparent; color: #718096; box-shadow: none; font-weight: 500; }
    .wz-brand { font-size: 11px; color: #cbd5e0; letter-spacing: 2px; text-align: center; font-weight: 700; margin-top: 16px; }

    /* Kode slot */
    .wz-slots { display: flex; gap: 12px; justify-content: center; margin: 24px 0; }
    .wz-slot {
      width: 56px; height: 72px; border-radius: 12px;
      background: #fff; border: 2px solid #e2e8f0;
      display: flex; align-items: center; justify-content: center;
      font-size: 28px; font-weight: 700; color: #1a202c;
      transition: all .2s;
    }
    .wz-slot.filled { border-color: #5b8def; background: #e8f0ff; }
    .wz-slot.focused { border-color: #5b8def; box-shadow: 0 0 0 4px rgba(91,141,239,.15); }

    /* Mini calculator */
    .wz-calc { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 16px 0; }
    .wz-key {
      padding: 16px 0; background: #fff; border: 1px solid #e2e8f0;
      border-radius: 12px; font-size: 20px; font-weight: 600;
      color: #1a202c; cursor: pointer; font-family: inherit;
      transition: all .1s;
    }
    .wz-key:active { background: #f0f4f8; transform: scale(.95); }
    .wz-key.op { color: #5b8def; }
    .wz-key.fn { color: #ed8936; font-size: 16px; }

    /* Warning */
    .wz-warning {
      background: #fffaf0; border: 1px solid #ed8936;
      border-radius: 12px; padding: 12px 14px;
      font-size: 13px; color: #744210; line-height: 1.5;
      margin-top: 16px;
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ========== HTML ==========
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
            Silent Line adalah aplikasi chat privat yang tampil sebagai kalkulator.
            <br><br>
            Data Anda aman & tidak dibagikan.
          </div>
        </div>
        <div class="wz-actions">
          <button class="wz-btn" id="wz-next-1">Mulai Setup</button>
        </div>
        <div class="wz-brand">SILENT LINE v2.2.1</div>
      </div>

      <!-- SLIDE 2: Buat Kode -->
      <div class="wz-slide" data-slide="2">
        <div class="wz-body">
          <div class="wz-title">Buat Kode Rahasia</div>
          <div class="wz-subtitle">
            Ketuk 4 tombol untuk membuat kode.
            <br>
            Kode ini untuk membuka chat di HP Anda.
          </div>
          <div class="wz-slots" id="wz-slots">
            <div class="wz-slot" data-slot="1">·</div>
            <div class="wz-slot" data-slot="2">·</div>
            <div class="wz-slot" data-slot="3">·</div>
            <div class="wz-slot" data-slot="4">·</div>
          </div>
          <div class="wz-calc" id="wz-calc">
            <button class="wz-key" data-val="1">1</button>
            <button class="wz-key" data-val="2">2</button>
            <button class="wz-key" data-val="3">3</button>
            <button class="wz-key op" data-val="+">+</button>
            <button class="wz-key" data-val="4">4</button>
            <button class="wz-key" data-val="5">5</button>
            <button class="wz-key" data-val="6">6</button>
            <button class="wz-key op" data-val="-">−</button>
            <button class="wz-key" data-val="7">7</button>
            <button class="wz-key" data-val="8">8</button>
            <button class="wz-key" data-val="9">9</button>
            <button class="wz-key op" data-val="*">×</button>
            <button class="wz-key fn" data-act="clear">AC</button>
            <button class="wz-key" data-val="0">0</button>
            <button class="wz-key fn" data-act="back">⌫</button>
            <button class="wz-key op" data-val="/">÷</button>
          </div>
          <div class="wz-warning">
            ⚠️ <b>Ingat baik-baik kode ini.</b> Kalau lupa, Anda harus reset aplikasi.
          </div>
        </div>
        <div class="wz-actions">
          <button class="wz-btn" id="wz-next-2" disabled>Lanjut</button>
          <button class="wz-btn ghost" id="wz-back-2">Kembali</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);

  setTimeout(function() {
    document.getElementById('wz-overlay').classList.add('active');
  }, 100);

  // ========== STATE ==========
  const state = {
    code: [] // Array of 4 tombol
  };

  // ========== NAVIGASI SLIDE ==========
  function goToSlide(n) {
    document.querySelectorAll('.wz-slide').forEach(function(el) {
      el.classList.remove('active');
    });
    var slide = document.querySelector('.wz-slide[data-slide="' + n + '"]');
    if (slide) slide.classList.add('active');

    // Update progress dots
    document.querySelectorAll('.wz-dot').forEach(function(dot) {
      var step = parseInt(dot.dataset.step);
      dot.classList.remove('active', 'done');
      if (step < n) dot.classList.add('done');
      else if (step === n) dot.classList.add('active');
    });
  }

  // ========== SLIDE 1 ==========
  document.getElementById('wz-next-1').addEventListener('click', function() {
    goToSlide(2);
  });

  // ========== SLIDE 2: INPUT KODE ==========
  function renderSlots() {
    var slots = document.querySelectorAll('.wz-slot');
    slots.forEach(function(s, i) {
      if (state.code[i]) {
        s.textContent = state.code[i];
        s.classList.add('filled');
      } else {
        s.textContent = '·';
        s.classList.remove('filled');
      }
      s.classList.remove('focused');
    });
    // Fokus slot berikutnya
    if (state.code.length < 4) {
      var next = slots[state.code.length];
      if (next) next.classList.add('focused');
    }
    // Enable/disable Lanjut
    var btn = document.getElementById('wz-next-2');
    if (btn) btn.disabled = state.code.length !== 4;
  }

  document.getElementById('wz-calc').addEventListener('click', function(e) {
    var btn = e.target.closest('.wz-key');
    if (!btn) return;

    if (btn.dataset.act === 'clear') {
      state.code = [];
      renderSlots();
      return;
    }
    if (btn.dataset.act === 'back') {
      state.code.pop();
      renderSlots();
      return;
    }
    if (btn.dataset.val && state.code.length < 4) {
      state.code.push(btn.dataset.val);
      renderSlots();
    }
  });

  document.getElementById('wz-next-2').addEventListener('click', function() {
    console.log('Slide 2: kode =', state.code);
    // Nanti: go to slide 3
  });

  document.getElementById('wz-back-2').addEventListener('click', function() {
    goToSlide(1);
  });

  // Init
  renderSlots();
})();
