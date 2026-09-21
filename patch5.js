const fs = require('fs');
const path = 'www/app.html';
let h = fs.readFileSync(path, 'utf8');
let changes = 0;

// 1. Global error handler di <head>
if (h.indexOf('__globalErrorHandler') < 0) {
  const errScript = `<!-- __globalErrorHandler -->\n<script>
window.addEventListener('error', function(e) {
  console.error(e);
  try { alert('JS ERROR:\\n\\n' + e.message + '\\n\\nLine: ' + e.lineno); } catch(x) {}
});
window.addEventListener('unhandledrejection', function(e) {
  console.error(e);
  var m = (e.reason && (e.reason.message || e.reason.toString())) || 'Unknown';
  try { alert('PROMISE ERROR:\\n\\n' + m); } catch(x) {}
});
</script>`;
  h = h.replace('</head>', errScript + '\n</head>');
  changes++;
  console.log('OK 1: Error handler ditambahkan');
} else {
  console.log('- 1: sudah ada');
}

// 2. Fallback tab handler (non-module, di akhir body)
if (h.indexOf('__fallbackTabHandler') < 0) {
  const fallback = `<!-- __fallbackTabHandler -->\n<script>
document.addEventListener('DOMContentLoaded', function() {
  console.log('FALLBACK: tab handler aktif');
  var tabs = document.querySelectorAll('.tabs button');
  console.log('FALLBACK: jumlah tab = ' + tabs.length);
  tabs.forEach(function(btn) {
    btn.addEventListener('click', function() {
      console.log('FALLBACK: tab diklik -> ' + btn.dataset.tab);
      tabs.forEach(function(x) { x.classList.remove('active'); });
      document.querySelectorAll('.tab-content').forEach(function(x) { x.classList.remove('active'); });
      btn.classList.add('active');
      var target = document.querySelector('.tab-content[data-content="' + btn.dataset.tab + '"]');
      if (target) {
        target.classList.add('active');
        console.log('FALLBACK: konten aktif -> ' + btn.dataset.tab);
      } else {
        console.log('FALLBACK: ERROR - konten tidak ditemukan untuk ' + btn.dataset.tab);
      }
    });
  });
});
</script>`;
  h = h.replace('</body>', fallback + '\n</body>');
  changes++;
  console.log('OK 2: Fallback tab handler ditambahkan');
} else {
  console.log('- 2: sudah ada');
}

fs.writeFileSync(path, h);
console.log('SUCCESS - ' + changes + ' patch');
