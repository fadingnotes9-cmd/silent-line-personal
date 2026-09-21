const fs = require('fs');
const path = 'www/app.html';
let h = fs.readFileSync(path, 'utf8');

if (h.indexOf('window.sendPhotoMessage') >= 0) {
  console.log('SUDAH ADA - skip');
  process.exit(0);
}

const target = 'function sendMessage() {';
const replacement = `window.sendPhotoMessage = async function(dataUrl, sizeKB) {
  if (!state.room) return;
  const payload = {
    text: "📷 Foto (" + sizeKB + " KB)",
    timestamp: Date.now(),
    deviceId: state.info.deviceId,
    senderName: state.name || "Anonim",
    photoUrl: dataUrl
  };
  try {
    await push(ref(db, "rooms/" + state.room + "/messages"), payload);
    await update(ref(db, "rooms/" + state.room + "/meta"), { lastActivityAt: serverTimestamp() }).catch(function(){});
  } catch(e) {
    alert("Send error: " + e.message);
  }
};

function sendMessage() {`;

if (h.indexOf(target) < 0) {
  console.log('ERROR: pattern tidak ditemukan');
  process.exit(1);
}

h = h.replace(target, replacement);
fs.writeFileSync(path, h);
console.log('SUCCESS - sendPhotoMessage ditambahkan');
