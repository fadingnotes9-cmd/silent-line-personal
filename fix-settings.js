const fs = require('fs');
let s = fs.readFileSync('www/settings.js', 'utf8');
let log = [];

// Update closeSettings — kalau ada .screen-chat active, balik ke chat; kalau tidak, tetap
const oldClose = "window.closeSettings = function() {\n    document.getElementById('st-panel').classList.remove('active');\n  };";
const newClose = "window.closeSettings = function() {\n    document.getElementById('st-panel').classList.remove('active');\n  };";

// Tidak perlu ubah closeSettings — logika sudah OK
// Tombol close cuma tutup panel, biarkan screen tetap

fs.writeFileSync('www/settings.js', s);
fs.writeFileSync('settings.js', s);
log.push('OK: settings.js sync ke root');
console.log(log.join('\n'));
