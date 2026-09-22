const fs = require('fs');
let s = fs.readFileSync('www/settings.js', 'utf8');
let log = [];

const oldPlaceholder = `    // Placeholder untuk action lain
    console.log('Settings action:', action);
    alert('Fitur sedang dikembangkan:\\n\\n' + item.querySelector('.st-item-label').textContent.trim());`;

const newHandler = `    // ===== UBAH NAMA =====
    if (action === 'edit-name') {
      var currentName = localStorage.getItem('sl_user_name') || (window.state && window.state.name) || '';
      var newName = prompt('Masukkan nama baru:\\n\\n(maks 20 karakter)', currentName);
      if (newName === null) return;
      newName = newName.trim();
      if (newName.length < 1) return;
      if (newName.length > 20) {
        alert('❌ Maksimal 20 karakter');
        return;
      }
      localStorage.setItem('sl_user_name', newName);
      if (window.updateProfileName) {
        window.updateProfileName(newName);
      }
      alert('✅ Nama diubah ke: ' + newName);
      return;
    }

    // Placeholder untuk action lain
    console.log('Settings action:', action);
    alert('Fitur sedang dikembangkan:\\n\\n' + item.querySelector('.st-item-label').textContent.trim());`;

if (s.indexOf("action === 'edit-name'") < 0) {
  if (s.indexOf(oldPlaceholder) >= 0) {
    s = s.replace(oldPlaceholder, newHandler);
    log.push('OK 1: Handler ubah nama ditambahkan');
  } else {
    log.push('FAIL 1: Placeholder tidak ketemu');
  }
} else {
  log.push('SKIP 1: Handler sudah ada');
}

fs.writeFileSync('www/settings.js', s);
fs.writeFileSync('settings.js', s);
log.push('OK 2: Sync settings.js');

console.log(log.join('\\n'));
