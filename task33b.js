const fs = require('fs');
let app = fs.readFileSync('app.html', 'utf8');
let log = [];

if (app.indexOf('changecode.js') < 0) {
  const target = '<script src="settings.js"></script>';
  const newHtml = target + '\\n<script src="changecode.js"></script>';
  if (app.indexOf(target) >= 0) {
    app = app.replace(target, newHtml);
    log.push('OK 1: changecode.js di-include');
  } else {
    log.push('FAIL 1: settings.js tidak ketemu');
  }
} else {
  log.push('SKIP 1: sudah ada');
}

fs.writeFileSync('app.html', app);
fs.writeFileSync('www/app.html', app);
log.push('OK 2: Sync app.html');

console.log(log.join('\\n'));
