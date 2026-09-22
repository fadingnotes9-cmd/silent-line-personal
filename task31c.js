const fs = require('fs');
let app = fs.readFileSync('app.html', 'utf8');
let log = [];

// Kembalikan handler btn-menu (chat) ke openSheet()
const oldHandler = "$('btn-menu').onclick = () => window.openSettings();";
const newHandler = "$('btn-menu').onclick = openSheet;";

if (app.indexOf(oldHandler) >= 0) {
  app = app.replace(oldHandler, newHandler);
  log.push('OK 1: btn-menu → openSheet() (menu room)');
} else {
  // Coba pattern lain
  const alt = "$('btn-menu').onclick = () => window.openSettings();";
  if (app.indexOf(alt) >= 0) {
    app = app.replace(alt, newHandler);
    log.push('OK 1: btn-menu → openSheet() (alternatif)');
  } else {
    log.push('FAIL 1: handler btn-menu tidak ketemu');
  }
}

// Pastikan tombol ⚙ login masih buka openSettings
if (app.indexOf("$('btn-settings-login').onclick") >= 0) {
  log.push('OK 2: Tombol ⚙ login → openSettings() (tetap)');
} else {
  log.push('WARN 2: Tombol ⚙ login tidak ada handler');
}

fs.writeFileSync('app.html', app);
fs.writeFileSync('www/app.html', app);
log.push('OK 3: Sync ke www/');

console.log(log.join('\n'));
