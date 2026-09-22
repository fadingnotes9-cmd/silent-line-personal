/* ============================================
   UBAH KODE RAHASIA — Silent Line Personal
   3 langkah: verifikasi lama, kode baru, konfirmasi
   ============================================ */

(function() {
  // ========== CSS ==========
  const css = `
    .cc-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 9500;
      display: none;
      align-items: flex-end;
      justify-content: center;
      backdrop-filter: blur(4px);
    }
    .cc-overlay.active { display: flex; }

    .cc-modal {
      background: #fff;
      border-radius: 24px 24px 0 0;
      width: 100%; max-width: 500px;
      padding: 20px;
      padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
      max-height: 90vh;
      overflow-y: auto;
      animation: ccSlideUp 0.3s ease-out;
    }
    @keyframes ccSlideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }

    .cc-handle {
      width: 40px; height: 4px;
      background: #e2e8f0;
      border-radius: 2px;
      margin: 0 auto 16px;
    }

    .cc-title {
      font-size: 20px; font-weight: 800;
      color: #1a202c;
      text-align: center;
      margin-bottom: 8px;
    }
    .cc-subtitle {
      font-size: 14px; color: #718096;
      text-align: center;
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .cc-step-indicator {
      display: flex;
      gap: 6px;
      justify-content: center;
      margin-bottom: 20px;
    }
    .cc-step-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #cbd5e0;
      transition: all 0.3s;
    }
    .cc-step-dot.active { background: #5b8def; width: 24px; border-radius: 4px; }
    .cc-step-dot.done { background: #48bb78; }

    .cc-slots {
      display: flex; gap: 12px; justify-content: center;
      margin: 16px 0;
    }
    .cc-slot {
      width: 56px; height: 72px; border-radius: 12px;
      background: #fff; border: 2px solid #e2e8f0;
      display: flex; align-items: center; justify-content: center;
      font-size: 28px; font-weight: 700; color: #1a202c;
      transition: all .2s;
    }
    .cc-slot.filled { border-color: #5b8def; background: #e8f0ff; }
    .cc-slot.focused { border-color: #5b8def; box-shadow: 0 0 0 4px rgba(91,141,239,.15); }
    .cc-slot.error { border-color: #f56565; background: #fff5f5; animation: ccShake 0.3s; }
    @keyframes ccShake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-6px); }
      75% { transform: translateX(6px); }
    }

    .cc-calc {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin: 16px 0;
    }
    .cc-key {
      padding: 16px 0;
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      font-size: 20px; font-weight: 600;
      color: #1a202c; cursor: pointer;
      font-family: inherit;
      transition: all .1s;
    }
    .cc-key:active { background: #f0f4f8; transform: scale(.95); }
    .cc-key.op { color: #5b8def; }
    .cc-key.fn { color: #ed8936; font-size: 16px; }

    .cc-error {
      background: #fff5f5;
      border: 1px solid #f56565;
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 13px; color: #c53030;
      margin-bottom: 12px;
      display: none;
    }
    .cc-error.show { display: block; }

    .cc-actions {
      display: flex; flex-direction: column;
      gap: 10px;
      margin-top: 8px;
    }
    .cc-btn {
      width: 100%; padding: 15px;
      background: linear-gradient(135deg, #5b8def, #3a6fd8);
      color: #fff;
      border: none; border-radius: 12px;
      font-size: 15px; font-weight: 700;
      font-family: inherit; cursor: pointer;
      box-shadow: 0 4px 12px rgba(91,141,239,.3);
      transition: all .15s;
    }
    .cc-btn:active { transform: scale(.98); }
    .cc-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .cc-btn.ghost {
      background: transparent;
      color: #718096;
      box-shadow: none;
      font-weight: 500;
    }

    .cc-step { display: none; }
    .cc-step.active { display: block; }

    .cc-success-icon {
      width: 80px; height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #48bb78, #38a169);
      display: flex; align-items: center; justify-content: center;
      font-size: 40px; color: #fff;
      margin: 20px auto 16px;
      box-shadow: 0 12px 32px rgba(72,187,120,.3);
      animation: ccPop 0.5s ease-out;
    }
    @keyframes ccPop {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.15); }
      100% { transform: scale(1); opacity: 1; }
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ========== HTML ==========
  const html = `
    <div class="cc-overlay" id="cc-overlay">
      <div class="cc-modal">
        <div class="cc-handle"></div>

        <div class="cc-step-indicator" id="cc-steps">
          <div class="cc-step-dot active" data-step="1"></div>
          <div class="cc-step-dot" data-step="2"></div>
          <div class="cc-step-dot" data-step="3"></div>
        </div>

        <!-- STEP 1: Verifikasi kode lama -->
        <div class="cc-step active" data-step="1">
          <div class="cc-title">Verifikasi Kode Lama</div>
          <div class="cc-subtitle">Masukkan kode rahasia Anda saat ini</div>

          <div class="cc-slots" id="cc-slots-1">
            <div class="cc-slot">·</div>
            <div class="cc-slot">·</div>
            <div class="cc-slot">·</div>
            <div class="cc-slot">·</div>
          </div>

          <div class="cc-calc" id="cc-calc-1">
            <button class="cc-key" data-val="1">1</button>
            <button class="cc-key" data-val="2">2</button>
            <button class="cc-key" data-val="3">3</button>
            <button class="cc-key op" data-val="+">+</button>
            <button class="cc-key" data-val="4">4</button>
            <button class="cc-key" data-val="5">5</button>
            <button class="cc-key" data-val="6">6</button>
            <button class="cc-key op" data-val="-">−</button>
            <button class="cc-key" data-val="7">7</button>
            <button class="cc-key" data-val="8">8</button>
            <button class="cc-key" data-val="9">9</button>
            <button class="cc-key op" data-val="*">×</button>
            <button class="cc-key fn" data-act="clear">AC</button>
            <button class="cc-key" data-val="0">0</button>
            <button class="cc-key fn" data-act="back">⌫</button>
            <button class="cc-key op" data-val="/">÷</button>
          </div>

          <div class="cc-error" id="cc-error-1">
            ❌ Kode lama salah. Coba lagi.
          </div>

          <div class="cc-actions">
            <button class="cc-btn" id="cc-next-1" disabled>Lanjut</button>
            <button class="cc-btn ghost" id="cc-cancel-1">Batal</button>
          </div>
        </div>

        <!-- STEP 2: Buat kode baru -->
        <div class="cc-step" data-step="2">
          <div class="cc-title">Buat Kode Baru</div>
          <div class="cc-subtitle">Ketuk 4 tombol untuk kode baru</div>

          <div class="cc-slots" id="cc-slots-2">
            <div class="cc-slot">·</div>
            <div class="cc-slot">·</div>
            <div class="cc-slot">·</div>
            <div class="cc-slot">·</div>
          </div>

          <div class="cc-calc" id="cc-calc-2">
            <button class="cc-key" data-val="1">1</button>
            <button class="cc-key" data-val="2">2</button>
            <button class="cc-key" data-val="3">3</button>
            <button class="cc-key op" data-val="+">+</button>
            <button class="cc-key" data-val="4">4</button>
            <button class="cc-key" data-val="5">5</button>
            <button class="cc-key" data-val="6">6</button>
            <button class="cc-key op" data-val="-">−</button>
            <button class="cc-key" data-val="7">7</button>
            <button class="cc-key" data-val="8">8</button>
            <button class="cc-key" data-val="9">9</button>
            <button class="cc-key op" data-val="*">×</button>
            <button class="cc-key fn" data-act="clear">AC</button>
            <button class="cc-key" data-val="0">0</button>
            <button class="cc-key fn" data-act="back">⌫</button>
            <button class="cc-key op" data-val="/">÷</button>
          </div>

          <div class="cc-actions">
            <button class="cc-btn" id="cc-next-2" disabled>Lanjut</button>
            <button class="cc-btn ghost" id="cc-back-2">Kembali</button>
          </div>
        </div>

        <!-- STEP 3: Konfirmasi -->
        <div class="cc-step" data-step="3">
          <div class="cc-title">Konfirmasi Kode Baru</div>
          <div class="cc-subtitle">Ketuk ulang kode baru Anda</div>

          <div class="cc-slots" id="cc-slots-3">
            <div class="cc-slot">·</div>
            <div class="cc-slot">·</div>
            <div class="cc-slot">·</div>
            <div class="cc-slot">·</div>
          </div>

          <div class="cc-calc" id="cc-calc-3">
            <button class="cc-key" data-val="1">1</button>
            <button class="cc-key" data-val="2">2</button>
            <button class="cc-key" data-val="3">3</button>
            <button class="cc-key op" data-val="+">+</button>
            <button class="cc-key" data-val="4">4</button>
            <button class="cc-key" data-val="5">5</button>
            <button class="cc-key" data-val="6">6</button>
            <button class="cc-key op" data-val="-">−</button>
            <button class="cc-key" data-val="7">7</button>
            <button class="cc-key" data-val="8">8</button>
            <button class="cc-key" data-val="9">9</button>
            <button class="cc-key op" data-val="*">×</button>
            <button class="cc-key fn" data-act="clear">AC</button>
            <button class="cc-key" data-val="0">0</button>
            <button class="cc-key fn" data-act="back">⌫</button>
            <button class="cc-key op" data-val="/">÷</button>
          </div>

          <div class="cc-error" id="cc-error-3">
            ❌ Kode tidak cocok. Coba lagi.
          </div>

          <div class="cc-actions">
            <button class="cc-btn" id="cc-save" disabled>Simpan Kode Baru</button>
            <button class="cc-btn ghost" id="cc-back-3">Kembali</button>
          </div>
        </div>

        <!-- STEP 4: Sukses -->
        <div class="cc-step" data-step="4">
          <div class="cc-success-icon">✓</div>
          <div class="cc-title">Kode Berhasil Diubah!</div>
          <div class="cc-subtitle">
            Kode rahasia Anda sudah diperbarui.<br>
            Gunakan kode baru untuk masuk chat.
          </div>
          <div class="cc-actions">
            <button class="cc-btn" id="cc-finish">Selesai</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);

  // ========== STATE ==========
  const state = {
    oldCode: [],
    newCode: [],
    confirmCode: []
  };

  // ========== NAVIGASI ==========
  function goToStep(n) {
    document.querySelectorAll('.cc-step').forEach(function(el) {
      el.classList.remove('active');
    });
    var step = document.querySelector('.cc-step[data-step="' + n + '"]');
    if (step) step.classList.add('active');

    document.querySelectorAll('.cc-step-dot').forEach(function(dot) {
      var s = parseInt(dot.dataset.step);
      dot.classList.remove('active', 'done');
      if (s < n) dot.classList.add('done');
      else if (s === n) dot.classList.add('active');
    });

    if (n === 2) {
      state.newCode = [];
      renderSlots(2);
    }
    if (n === 3) {
      state.confirmCode = [];
      renderSlots(3);
    }
  }

  // ========== SLOT RENDER ==========
  function renderSlots(stepNum) {
    var container = document.getElementById('cc-slots-' + stepNum);
    if (!container) return;
    var slots = container.querySelectorAll('.cc-slot');
    var data = stepNum === 1 ? state.oldCode : (stepNum === 2 ? state.newCode : state.confirmCode);

    slots.forEach(function(s, i) {
      if (data[i]) {
        s.textContent = data[i];
        s.classList.add('filled');
      } else {
        s.textContent = '·';
        s.classList.remove('filled');
      }
      s.classList.remove('focused', 'error');
    });
    if (data.length < 4) {
      var next = slots[data.length];
      if (next) next.classList.add('focused');
    }

    // Update tombol
    if (stepNum === 1) {
      var b1 = document.getElementById('cc-next-1');
      if (b1) b1.disabled = data.length !== 4;
    } else if (stepNum === 2) {
      var b2 = document.getElementById('cc-next-2');
      if (b2) b2.disabled = data.length !== 4;
    } else if (stepNum === 3) {
      var b3 = document.getElementById('cc-save');
      if (b3) b3.disabled = data.length !== 4;
    }
  }

  // ========== CALCULATOR HANDLER ==========
  function bindCalc(stepNum) {
    var calc = document.getElementById('cc-calc-' + stepNum);
    if (!calc) return;
    calc.addEventListener('click', function(e) {
      var btn = e.target.closest('.cc-key');
      if (!btn) return;
      var data = stepNum === 1 ? state.oldCode : (stepNum === 2 ? state.newCode : state.confirmCode);

      if (btn.dataset.act === 'clear') {
        data.length = 0;
        renderSlots(stepNum);
        return;
      }
      if (btn.dataset.act === 'back') {
        data.pop();
        renderSlots(stepNum);
        return;
      }
      if (btn.dataset.val && data.length < 4) {
        data.push(btn.dataset.val);
        renderSlots(stepNum);
      }
    });
  }

  // ========== OPEN / CLOSE ==========
  window.openChangeCode = function() {
    state.oldCode = [];
    state.newCode = [];
    state.confirmCode = [];
    renderSlots(1);
    renderSlots(2);
    renderSlots(3);
    var overlay = document.getElementById('cc-overlay');
    overlay.classList.add('active');
    goToStep(1);
  };

  function closeChangeCode() {
    document.getElementById('cc-overlay').classList.remove('active');
  }

  // ========== STEP 1: Verifikasi kode lama ==========
  document.getElementById('cc-next-1').addEventListener('click', function() {
    if (state.oldCode.length !== 4) return;

    var saved = localStorage.getItem('sl_user_code');
    var savedArr = [];
    try { savedArr = JSON.parse(saved) || []; } catch (e) {}

    var match = savedArr.length === 4 && state.oldCode.every(function(v, i) {
      return v === savedArr[i];
    });

    if (!match) {
      var err = document.getElementById('cc-error-1');
      err.classList.add('show');
      var container = document.getElementById('cc-slots-1');
      container.querySelectorAll('.cc-slot').forEach(function(s) {
        s.classList.add('error');
      });
      setTimeout(function() {
        err.classList.remove('show');
        state.oldCode = [];
        renderSlots(1);
      }, 1500);
      return;
    }

    // Kode lama benar → lanjut step 2
    goToStep(2);
  });

  document.getElementById('cc-cancel-1').addEventListener('click', closeChangeCode);

  // ========== STEP 2 ==========
  document.getElementById('cc-next-2').addEventListener('click', function() {
    if (state.newCode.length !== 4) return;
    goToStep(3);
  });

  document.getElementById('cc-back-2').addEventListener('click', function() {
    goToStep(1);
  });

  // ========== STEP 3: Konfirmasi + Simpan ==========
  document.getElementById('cc-save').addEventListener('click', function() {
    if (state.confirmCode.length !== 4) return;

    var match = state.newCode.every(function(v, i) {
      return v === state.confirmCode[i];
    });

    if (!match) {
      var err = document.getElementById('cc-error-3');
      err.classList.add('show');
      var container = document.getElementById('cc-slots-3');
      container.querySelectorAll('.cc-slot').forEach(function(s) {
        s.classList.add('error');
      });
      setTimeout(function() {
        err.classList.remove('show');
        state.confirmCode = [];
        renderSlots(3);
      }, 1500);
      return;
    }

    // Simpan kode baru
    localStorage.setItem('sl_user_code', JSON.stringify(state.newCode));
    console.log('✅ Kode baru tersimpan:', state.newCode.join(''));
    goToStep(4);
  });

  document.getElementById('cc-back-3').addEventListener('click', function() {
    goToStep(2);
  });

  // ========== STEP 4: Finish ==========
  document.getElementById('cc-finish').addEventListener('click', closeChangeCode);

  // ========== INIT ==========
  bindCalc(1);
  bindCalc(2);
  bindCalc(3);

  console.log('✅ changecode.js loaded');
})();
