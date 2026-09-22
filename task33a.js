const fs = require('fs');
let s = fs.readFileSync('www/settings.js', 'utf8');
let log = [];

// Tambah handler untuk action 'change-code' sebelum placeholder
const oldPlaceholder = `    // Placeholder untuk action lain
    console.log('Settings action:', action);`;

const newHandler = `    // ===== UBAH KODE =====
    if (action === 'change-code') {
      closeSettings();
      setTimeout(function() {
        if (window.openChangeCode) {
          window.openChangeCode();
        } else {
          alert('Fitur ubah kode tidak tersedia');
        }
      }, 300);
      return;
    }

    // Placeholder untuk action lain
    console.log('Settings action:', action);`;

if (s.indexOf("action === 'change-code'") < 0) {
  if (s.indexOf(oldPlaceholder) >= 0) {
    s = s.replace(oldPlaceholder, newHandler);
    log.push('OK 1: Handler ubah kode ditambahkan');
  } else {
    log.push('FAIL 1: Placeholder tidak ketemu');
  }
} else {
  log.push('SKIP 1: sudah ada');
}

fs.writeFileSync('www/settings.js', s);
fs.writeFileSync('settings.js', s);
log.push('OK 2: Sync settings.js');

console.log(log.join('\\n'));
