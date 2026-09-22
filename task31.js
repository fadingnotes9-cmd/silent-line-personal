const fs = require('fs');
let log = [];

// ============== 1. UPDATE app.html ==============
let app = fs.readFileSync('app.html', 'utf8');

// 1a. Ganti handler btn-menu
const oldHandler = "$('btn-menu').onclick = openSheet;";
const newHandler = "$('btn-menu').onclick = () => window.openSettings();";

if (app.indexOf(oldHandler) >= 0) {
  app = app.replace(oldHandler, newHandler);
  log.push('OK 1a: btn-menu handler → openSettings()');
} else {
  log.push('SKIP 1a: pattern btn-menu tidak ketemu');
}

// 1b. Include settings.js setelah camera.js
if (app.indexOf('settings.js') < 0) {
  const target = '<script src="camera.js"></script>';
  const newHtml = target + '\n<script src="settings.js"></script>';
  if (app.indexOf(target) >= 0) {
    app = app.replace(target, newHtml);
    log.push('OK 1b: settings.js di-include');
  } else {
    log.push('FAIL 1b: camera.js tidak ditemukan');
  }
} else {
  log.push('SKIP 1b: settings.js sudah ada');
}

fs.writeFileSync('app.html', app);

// ============== 2. SYNC ke www/ ==============
fs.writeFileSync('www/app.html', app);
log.push('OK 2: Sync app.html ke www/');

console.log(log.join('\n'));
