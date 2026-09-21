const fs = require('fs');
let h = fs.readFileSync('www/app.html', 'utf8');

// Remove ALL debug window.addEventListener('load', ...) blocks
h = h.replace(/window\.addEventListener\('load',\s*async\s*\(\)\s*=>\s*\{[\s\S]*?\n\}\);\s*/g, '');
h = h.replace(/window\.addEventListener\('load',\s*\(\)\s*=>\s*\{[\s\S]*?\n\}\);\s*/g, '');

// Fix addRemembered if broken
if (h.indexOf('function addRemembered(room) {') > 0) {
  const start = h.indexOf('function addRemembered(room) {');
  const nextFunc = h.indexOf('\nfunction ', start + 30);
  if (nextFunc > 0) {
    const currentBlock = h.substring(start, nextFunc);
    if (currentBlock.indexOf('list.push(room)') < 0) {
      const fixedBlock = "function addRemembered(room) {\n  const list = getRemembered().filter(r => r.code !== room.code);\n  list.push(room); saveRemembered(list); renderRemembered();\n}\n";
      h = h.substring(0, start) + fixedBlock + h.substring(nextFunc);
      console.log('Fixed addRemembered function');
    }
  }
}

// Add inline onclick to button (if not present)
if (h.indexOf('onclick="window.tryCamera()"') < 0) {
  h = h.replace(
    /<button class="attach-btn" id="btn-attach" title="Kirim Gambar">📎<\/button>/,
    '<button class="attach-btn" id="btn-attach" onclick="window.tryCamera()" title="Kirim Gambar">📎</button>'
  );
}

// Remove any old tryCamera script
h = h.replace(/<script>[\s\S]*?window\.tryCamera[\s\S]*?<\/script>\s*/g, '');

// Add new clean tryCamera script before </body>
const script = '<script>' +
'window.tryCamera = async function() {' +
'  var c = window.Capacitor;' +
'  if (!c) { alert("DEBUG: Capacitor TIDAK ADA"); return; }' +
'  if (!c.Plugins) { alert("DEBUG: Plugins TIDAK ADA"); return; }' +
'  var cam = c.Plugins.Camera;' +
'  if (!cam) {' +
'    var k = Object.keys(c.Plugins);' +
'    alert("DEBUG: Camera plugin KOSONG\\nPlugins: " + (k.length ? k.join(", ") : "TIDAK ADA SATU PUN"));' +
'    return;' +
'  }' +
'  try {' +
'    var p = await cam.getPhoto({quality:85, resultType:"base64", source:"PROMPT"});' +
'    var r = await fetch("data:image/jpeg;base64," + p.base64String);' +
'    var b = await r.blob();' +
'    var f = new File([b], "photo.jpg", {type:"image/jpeg"});' +
'    if (typeof window.uploadPhoto === "function") {' +
'      await window.uploadPhoto(f);' +
'      alert("Foto terkirim!");' +
'    } else {' +
'      alert("ERROR: uploadPhoto tidak tersedia. Cek nama function di app.html");' +
'    }' +
'  } catch(e) { alert("ERROR: " + (e.message || e)); }' +
'};' +
'</script>';

h = h.replace('</body>', script + '\n</body>');

fs.writeFileSync('www/app.html', h);
console.log('SUCCESS - file repaired');
