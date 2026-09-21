const fs = require('fs');
const path = 'www/app.html';
let h = fs.readFileSync(path, 'utf8');

const oldLine = "let C; try { C = (await import('@capacitor/camera')).Camera; } catch(e) { return; }";
const newLine = "const C = (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Camera) || null;";

if (h.indexOf(oldLine) >= 0) {
  h = h.replace(oldLine, newLine);
  fs.writeFileSync(path, h);
  console.log('SUCCESS: replaced old line');
} else {
  const regex = /let\s+C;\s*try\s*\{\s*C\s*=\s*\(await\s+import\([^)]+\)\)\.Camera;\s*\}\s*catch\(e\)\s*\{\s*return;\s*\}/;
  if (regex.test(h)) {
    h = h.replace(regex, newLine);
    fs.writeFileSync(path, h);
    console.log('SUCCESS: replaced via regex');
  } else {
    console.log('FAILED: pattern not found');
  }
}
