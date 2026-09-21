const fs = require('fs');
const path = 'www/app.html';
let h = fs.readFileSync(path, 'utf8');
let changes = 0;

// 1. Include camera.js sebelum </body>
if (h.indexOf('camera.js') < 0) {
  h = h.replace('</body>', '<script src="camera.js"></script>\n</body>');
  changes++;
  console.log('✓ camera.js included');
} else {
  console.log('- camera.js sudah ada');
}

// 2. Ganti tombol jadi onclick
if (h.indexOf('onclick="tryCamera()"') < 0) {
  h = h.replace(
    '<button class="attach-btn" id="btn-attach" title="Kirim Gambar">📎</button>',
    '<button class="attach-btn" id="btn-attach" onclick="tryCamera()" title="Kirim Gambar">📎</button>'
  );
  changes++;
  console.log('✓ onclick tryCamera ditambahkan');
} else {
  console.log('- onclick sudah ada');
}

fs.writeFileSync(path, h);
console.log('SUCCESS - ' + changes + ' perubahan');
