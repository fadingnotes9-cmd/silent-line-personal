const fs = require('fs');
const path = 'www/app.html';
let h = fs.readFileSync(path, 'utf8');
let changes = 0;

// 1. Tambah clear listeners di awal enterChat + reset Set
const oldEnter = `function enterChat() {
  if (state.screen === 'chat') return;`;
const newEnter = `function enterChat() {
  if (state.screen === 'chat') return;
  state.subs.forEach(u => { try { u(); } catch {} });
  state.subs = [];
  window.__msgSeen = new Set();`;

if (h.indexOf(oldEnter) >= 0 && h.indexOf('__msgSeen') < 0) {
  h = h.replace(oldEnter, newEnter);
  changes++;
  console.log('✓ enterChat: clear subs + reset __msgSeen');
} else {
  console.log('- enterChat: sudah ada atau pattern beda');
}

// 2. Tambah cek duplikat di awal addMsg
const oldAdd = `function addMsg(id, m, isMe) {
  const w = document.createElement('div');`;
const newAdd = `function addMsg(id, m, isMe) {
  if (!window.__msgSeen) window.__msgSeen = new Set();
  if (window.__msgSeen.has(id)) return;
  window.__msgSeen.add(id);
  const w = document.createElement('div');`;

if (h.indexOf(oldAdd) >= 0 && h.indexOf('__msgSeen.has(id)') < 0) {
  h = h.replace(oldAdd, newAdd);
  changes++;
  console.log('✓ addMsg: cek duplikat via __msgSeen');
} else {
  console.log('- addMsg: sudah ada atau pattern beda');
}

// 3. Reset __msgSeen ketika chat clear
if (h.indexOf("$('messages').innerHTML = ''") >= 0) {
  h = h.replace(/onValue\(mRef, snap => \{\s*\n\s*if \(!snap\.exists\(\)\) \{ \$?\('messages'\)\.innerHTML = ''; sent\.clear\(\); \}/g,
    "onValue(mRef, snap => { if (!snap.exists()) { $('messages').innerHTML = ''; sent.clear(); window.__msgSeen = new Set(); } }");
  console.log('✓ Clear chat: reset __msgSeen juga');
}

fs.writeFileSync(path, h);
console.log('SUCCESS - ' + changes + ' patch');
