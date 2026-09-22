const fs = require('fs');
let s = fs.readFileSync('www/settings.js', 'utf8');

// Pastikan teks close button pakai ← (sudah benar)
// Verifikasi ada di file
if (s.indexOf('id="st-close"') >= 0) {
  console.log('OK: Tombol close ada');
}

fs.writeFileSync('settings.js', s);
console.log('OK: sync settings.js');
