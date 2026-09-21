const fs = require('fs');
const path = 'www/app.html';
let h = fs.readFileSync(path, 'utf8');

if (h.indexOf('msg-photo-embed') >= 0) {
  console.log('SUDAH ADA - skip');
  process.exit(0);
}

const oldCode = `const t = document.createElement('div');
  t.textContent = m.text;
  d.appendChild(t);`;

const newCode = `if (m.photoUrl) {
    const img = document.createElement('img');
    img.className = 'msg-photo-embed';
    img.src = m.photoUrl;
    img.style.cssText = 'max-width:100%;width:220px;border-radius:12px;display:block;margin-bottom:4px;cursor:pointer;';
    img.onclick = function() { window.open(m.photoUrl, '_blank'); };
    d.appendChild(img);
    if (m.text && m.text.indexOf('Foto') < 0) {
      const cap = document.createElement('div');
      cap.textContent = m.text;
      cap.style.cssText = 'font-size:14px;';
      d.appendChild(cap);
    }
  } else {
    const t = document.createElement('div');
    t.textContent = m.text;
    d.appendChild(t);
  }`;

const oldCode2 = "const t = document.createElement('div');\n  t.textContent = m.text;\n  d.appendChild(t);";

let replaced = false;
if (h.indexOf(oldCode2) >= 0) {
  h = h.replace(oldCode2, newCode);
  replaced = true;
} else if (h.indexOf(oldCode) >= 0) {
  h = h.replace(oldCode, newCode);
  replaced = true;
}

if (!replaced) {
  // Coba cari dengan regex
  const re = /const\s+t\s*=\s*document\.createElement\('div'\);\s*\n\s*t\.textContent\s*=\s*m\.text;\s*\n\s*d\.appendChild\(t\);/;
  if (re.test(h)) {
    h = h.replace(re, newCode);
    replaced = true;
  }
}

if (!replaced) {
  console.log('FAILED - pattern tidak ketemu');
  process.exit(1);
}

fs.writeFileSync(path, h);
console.log('SUCCESS - addMsg dipatch untuk render foto');
