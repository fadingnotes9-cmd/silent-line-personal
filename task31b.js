const fs = require('fs');
let app = fs.readFileSync('app.html', 'utf8');
let log = [];

// ===== 1. Tambah tombol ⚙ di header login =====
const oldHeader = `<div class="header">
      <button class="hbtn" id="btn-login-back">←</button>
      <div class="h-info"><div class="h-title">Silent Line</div></div>
    </div>`;

const newHeader = `<div class="header">
      <button class="hbtn" id="btn-login-back">←</button>
      <div class="h-info"><div class="h-title">Silent Line</div></div>
      <button class="hbtn" id="btn-settings-login" title="Pengaturan">⚙</button>
    </div>`;

if (app.indexOf('btn-settings-login') < 0) {
  if (app.indexOf(oldHeader) >= 0) {
    app = app.replace(oldHeader, newHeader);
    log.push('OK 1: Tombol ⚙ ditambah di header login');
  } else {
    // Coba pattern lebih fleksibel
    const oldHeader2 = '<div class="h-info"><div class="h-title">Silent Line</div></div>\n    </div>';
    const newHeader2 = '<div class="h-info"><div class="h-title">Silent Line</div></div>\n      <button class="hbtn" id="btn-settings-login" title="Pengaturan">⚙</button>\n    </div>';
    if (app.indexOf(oldHeader2) >= 0) {
      app = app.replace(oldHeader2, newHeader2);
      log.push('OK 1: Tombol ⚙ ditambah (pattern 2)');
    } else {
      log.push('FAIL 1: Pattern header tidak ketemu');
    }
  }
} else {
  log.push('SKIP 1: Tombol ⚙ sudah ada');
}

// ===== 2. Tambah handler tombol ⚙ =====
const oldHandler = "$('btn-login-back').onclick = goCalc;";
const newHandler = "$('btn-login-back').onclick = goCalc;\n$('btn-settings-login').onclick = () => window.openSettings();";

if (app.indexOf('btn-settings-login\').onclick') < 0) {
  if (app.indexOf(oldHandler) >= 0) {
    app = app.replace(oldHandler, newHandler);
    log.push('OK 2: Handler tombol ⚙ ditambah');
  } else {
    log.push('FAIL 2: Handler btn-login-back tidak ketemu');
  }
} else {
  log.push('SKIP 2: Handler sudah ada');
}

fs.writeFileSync('app.html', app);
fs.writeFileSync('www/app.html', app);
log.push('OK 3: Sync ke www/');

console.log(log.join('\n'));
