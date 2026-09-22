const fs = require('fs');
const path = 'index.html';
let h = fs.readFileSync(path, 'utf8');
let log = [];

// 1. Hapus baris VENDOR_SEQ
const line1 = "const VENDOR_SEQ = ['2','5','0','*','3'];";
if (h.indexOf(line1) >= 0) {
  h = h.replace(line1 + '\n', '');
  h = h.replace(line1, '');
  log.push('OK 1: VENDOR_SEQ dihapus');
} else {
  log.push('SKIP 1');
}

// 2. Hapus baris VENDOR_PAGE
const line2 = "const VENDOR_PAGE = 'super-admin.html';";
if (h.indexOf(line2) >= 0) {
  h = h.replace(line2 + '\n', '');
  h = h.replace(line2, '');
  log.push('OK 2: VENDOR_PAGE dihapus');
} else {
  log.push('SKIP 2');
}

// 3. Hapus baris pengecekan VENDOR_SEQ
const line3 = "if (seqMatch(VENDOR_SEQ)) { unlock('vendor'); return; }";
if (h.indexOf(line3) >= 0) {
  h = h.replace('  ' + line3 + '\n', '');
  h = h.replace(line3 + '\n', '');
  h = h.replace(line3, '');
  log.push('OK 3: cek VENDOR_SEQ dihapus');
} else {
  log.push('SKIP 3');
}

// 4. Ubah logika target (role === vendor)
const oldTarget = "const target = role === 'vendor' ? VENDOR_PAGE : TARGET_PAGE;";
const newTarget = "const target = TARGET_PAGE;";
if (h.indexOf(oldTarget) >= 0) {
  h = h.replace(oldTarget, newTarget);
  log.push('OK 4: target disederhanakan');
} else {
  log.push('SKIP 4');
}

fs.writeFileSync(path, h);
console.log(log.join('\n'));
