const fs = require('fs');
const path = 'www/app.html';
let h = fs.readFileSync(path, 'utf8');

// Hapus blok lama
h = h.replace(/window\.addEventListener\('load',\s*async\s*\(\)\s*=>\s*\{[\s\S]*?\n\}\);/g, '___REMOVED___');

// Blok debug baru yang sangat jelas
const dbg = `window.addEventListener('load', () => {
  setTimeout(() => {
    const btn = document.getElementById('btn-attach');
    if (!btn) { alert('DEBUG-A: Tombol tidak ada di HTML'); return; }
    const cap = window.Capacitor;
    let info = 'Capacitor: ' + (cap ? 'ADA' : 'TIDAK ADA') + '\\n';
    if (cap) {
      info += 'Plugins object: ' + (cap.Plugins ? 'ADA' : 'TIDAK ADA') + '\\n';
      if (cap.Plugins) {
        const keys = Object.keys(cap.Plugins);
        info += 'Plugin terdaftar: ' + (keys.length ? keys.join(', ') : 'KOSONG') + '\\n';
      }
    }
    info += 'window.Capacitor.Plugins.Camera: ' + (cap && cap.Plugins && cap.Plugins.Camera ? 'ADA' : 'TIDAK ADA');
    btn.onclick = () => alert('DEBUG-B:\\n\\n' + info);
  }, 1000);
});`;

h = h.replace('___REMOVED___', dbg);
fs.writeFileSync(path, h);
console.log('Debug alert installed');
