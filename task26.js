const fs = require('fs');

// ============== 1. UPDATE index.html ==============
let idx = fs.readFileSync('index.html', 'utf8');
let log = [];

// 1a. Hapus blok Firebase config/codes
const firebaseBlock = `if (db) {
  onValue(ref(db, 'config/codes'), (snap) => {
    const v = snap.val();
    if (!v) return;
    if (Array.isArray(v.user)) USER_SEQ = v.user;
    try { localStorage.setItem('sl_codes', JSON.stringify({ user: USER_SEQ })); } catch {}
  });
}`;

if (idx.indexOf(firebaseBlock) >= 0) {
  idx = idx.replace(firebaseBlock, '// (Firebase config/codes dihapus - pakai wizard kode)');
  log.push('OK 1a: Firebase config/codes dihapus');
} else {
  log.push('SKIP 1a: Firebase block tidak ditemukan');
}

// 1b. Tambah baca sl_user_code (wizard) SEBELUM sl_codes
const oldRead = `try {
  const c = localStorage.getItem('sl_codes');
  if (c) { const p = JSON.parse(c); if (Array.isArray(p.user)) USER_SEQ = p.user; }
} catch {}`;

const newRead = `// Prioritas 1: baca kode dari wizard (sl_user_code)
try {
  const wizardCode = localStorage.getItem('sl_user_code');
  if (wizardCode) {
    const wc = JSON.parse(wizardCode);
    if (Array.isArray(wc) && wc.length > 0) USER_SEQ = wc;
  }
} catch {}

// Prioritas 2: fallback ke cache lama (sl_codes)
try {
  const c = localStorage.getItem('sl_codes');
  if (c) { const p = JSON.parse(c); if (Array.isArray(p.user)) USER_SEQ = p.user; }
} catch {}`;

if (idx.indexOf(oldRead) >= 0) {
  idx = idx.replace(oldRead, newRead);
  log.push('OK 1b: Baca sl_user_code ditambahkan');
} else {
  log.push('SKIP 1b: Baca sl_codes tidak ditemukan (mungkin sudah diubah)');
}

// 1c. Include wizard.js sebelum </body>
if (idx.indexOf('wizard.js') < 0) {
  idx = idx.replace('</body>', '<script src="wizard.js"></script>\n</body>');
  log.push('OK 1c: wizard.js di-include');
} else {
  log.push('SKIP 1c: wizard.js sudah ada');
}

fs.writeFileSync('index.html', idx);

// ============== 2. UPDATE wizard.js ==============
let wz = fs.readFileSync('www/wizard.js', 'utf8');

const oldFinish = `document.getElementById('wz-finish').addEventListener('click', function() {
    // Tutup wizard
    var overlay = document.getElementById('wz-overlay');
    overlay.style.transition = 'opacity 0.3s';
    overlay.style.opacity = '0';
    setTimeout(function() {
      overlay.classList.remove('active');
      overlay.style.display = 'none';
    }, 300);

    console.log('✅ Wizard selesai. Kode user:', state.code.join(''));
  });`;

const newFinish = `document.getElementById('wz-finish').addEventListener('click', function() {
    var overlay = document.getElementById('wz-overlay');
    overlay.style.transition = 'opacity 0.3s';
    overlay.style.opacity = '0';
    setTimeout(function() {
      overlay.classList.remove('active');
      overlay.style.display = 'none';
      // Reload supaya index.html baca kode baru dari localStorage
      console.log('✅ Wizard selesai. Reload...');
      location.reload();
    }, 300);
  });`;

if (wz.indexOf(oldFinish) >= 0) {
  wz = wz.replace(oldFinish, newFinish);
  log.push('OK 2: wizard.js finish → reload halaman');
} else {
  log.push('SKIP 2: pola finish tidak ketemu');
}
fs.writeFileSync('www/wizard.js', wz);

// ============== 3. HAPUS wizard.js dari app.html ==============
let app = fs.readFileSync('app.html', 'utf8');
if (app.indexOf('wizard.js') >= 0) {
  app = app.replace('<script src="wizard.js"></script>\n', '');
  app = app.replace('<script src="wizard.js"></script>', '');
  log.push('OK 3: wizard.js dihapus dari app.html');
} else {
  log.push('SKIP 3: app.html tidak punya wizard.js');
}
fs.writeFileSync('app.html', app);

// ============== 4. SYNC ke www/ ==============
fs.writeFileSync('www/index.html', idx);
fs.writeFileSync('www/app.html', app);
log.push('OK 4: Sync ke www/');

console.log(log.join('\n'));
