const fs = require('fs');
const path = 'app.html';
let h = fs.readFileSync(path, 'utf8');

if (h.indexOf('wizard.js') >= 0) {
  console.log('SUDAH ADA - skip');
  process.exit(0);
}

const target = '<script src="camera.js"></script>';
const newHtml = '<script src="camera.js"></script>\n<script src="wizard.js"></script>';

if (h.indexOf(target) < 0) {
  console.log('ERROR: camera.js script tag tidak ditemukan');
  process.exit(1);
}

h = h.replace(target, newHtml);
fs.writeFileSync(path, h);
console.log('SUCCESS - wizard.js di-include');
