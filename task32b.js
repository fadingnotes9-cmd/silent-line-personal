const fs = require('fs');
let app = fs.readFileSync('app.html', 'utf8');
let log = [];

// ===== 1. Expose updateProfileName =====
const target = 'renderRemembered();';
const insert = `// ===== EXPOSE FUNCTION KE SETTINGS =====
window.state = state;
window.updateProfileName = async function(newName) {
  state.name = newName;
  // Kalau sedang di room, update di Firebase juga
  if (state.room && state.info) {
    try {
      await update(ref(db, 'rooms/' + state.room + '/devices/' + state.info.deviceId), {
        name: newName
      });
      await set(ref(db, 'rooms/' + state.room + '/presence/' + state.info.deviceId), {
        name: newName, lastSeen: serverTimestamp()
      });
      console.log('✅ Nama updated di Firebase:', newName);
    } catch(e) {
      console.error('Gagal update nama:', e);
    }
  }
};

renderRemembered();`;

if (app.indexOf('window.updateProfileName') < 0) {
  if (app.indexOf(target) >= 0) {
    app = app.replace(target, insert);
    log.push('OK 1: updateProfileName diekspos');
  } else {
    log.push('FAIL 1: renderRemembered(); tidak ketemu');
  }
} else {
  log.push('SKIP 1: sudah ada');
}

// ===== 2. Prefill nama dari localStorage =====
if (app.indexOf('Prefill nama dari localStorage') < 0) {
  const prefScript = `// Prefill nama dari localStorage
setTimeout(function() {
  var savedName = localStorage.getItem('sl_user_name');
  if (savedName) {
    var cn = document.getElementById('create-name');
    var jn = document.getElementById('join-name');
    if (cn) cn.value = savedName;
    if (jn) jn.value = savedName;
  }
}, 300);
`;

  const pos = app.lastIndexOf('</script>');
  if (pos > 0) {
    app = app.substring(0, pos) + prefScript + app.substring(pos);
    log.push('OK 2: Prefill nama ditambahkan');
  } else {
    log.push('SKIP 2: </script> tidak ketemu');
  }
} else {
  log.push('SKIP 2: Prefill sudah ada');
}

// ===== 3. Update state.name saat login =====
const oldCreate = "const name = $('create-name').value.trim();";
const newCreate = "let name = $('create-name').value.trim();\n  if (!name) name = localStorage.getItem('sl_user_name') || '';\n  if (name) localStorage.setItem('sl_user_name', name);";

if (app.indexOf(oldCreate) >= 0 && app.indexOf('sl_user_name') < 100) {
  // Biarkan — sudah ada
  log.push('OK 3: Login pakai nama (sudah)');
} else if (app.indexOf(oldCreate) >= 0) {
  app = app.replace(oldCreate, newCreate);
  log.push('OK 3: Auto-save nama saat login');
} else {
  log.push('SKIP 3');
}

fs.writeFileSync('app.html', app);
fs.writeFileSync('www/app.html', app);
log.push('OK 4: Sync app.html ke www/');

console.log(log.join('\\n'));
