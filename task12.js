const fs = require('fs');
const path = 'app.html';
let h = fs.readFileSync(path, 'utf8');
let log = [];

// ============ 1. GANTI HTML FORM (hapus input license) ============
const oldHTML = `<div class="field">
            <label>Kode Lisensi</label>
            <input type="text" id="create-license" placeholder="SL-XXXX-XXXX" maxlength="20" autocomplete="off" style="text-transform:uppercase">
            <div class="helper" id="create-helper">Diperlukan untuk membuat room baru</div>
          </div>
          <div class="field">
            <label>Nama Anda (opsional)</label>
            <input type="text" id="create-name" placeholder="misal: Andi" maxlength="20" autocomplete="off">
          </div>`;

const newHTML = `<div class="field">
            <label>Nama Anda (opsional)</label>
            <input type="text" id="create-name" placeholder="misal: Andi" maxlength="20" autocomplete="off">
          </div>
          <div class="field">
            <div class="helper" id="create-helper">Kode room akan dibuat otomatis</div>
          </div>`;

if (h.indexOf(oldHTML) >= 0) {
  h = h.replace(oldHTML, newHTML);
  log.push('OK 1: HTML form diganti');
} else {
  log.push('SKIP 1: HTML form sudah/beda');
}

// ============ 2. GANTI FUNGSI deriveRoomCode ============
const oldDerive = `async function deriveRoomCode(licenseKey) {
  const hash = await sha256('room:' + licenseKey.toUpperCase());
  const num = parseInt(hash.slice(0, 8), 16) % 100000000;
  return String(num).padStart(8, '0');
}`;

const newDerive = `function generateRoomCode() {
  return String(Math.floor(10000000 + Math.random() * 90000000));
}`;

if (h.indexOf(oldDerive) >= 0) {
  h = h.replace(oldDerive, newDerive);
  log.push('OK 2: deriveRoomCode → generateRoomCode');
} else {
  log.push('SKIP 2: deriveRoomCode sudah/beda');
}

// ============ 3. GANTI FUNGSI BUAT ROOM ============
// Cari mulai dari "$('btn-create-room').onclick" sampai "$('btn-continue').onclick"
const startMarker = "$('btn-create-room').onclick = async () => {";
const endMarker = "$('btn-continue').onclick = () => {";

const startIdx = h.indexOf(startMarker);
const endIdx = h.indexOf(endMarker);

if (startIdx >= 0 && endIdx > startIdx) {
  const newCreateFn = `$('btn-create-room').onclick = async () => {
  const name = $('create-name').value.trim();
  const helper = $('create-helper');
  helper.className = 'helper';
  helper.textContent = 'Membuat room...';

  const roomCode = generateRoomCode();

  try {
    await set(ref(db, \`rooms/\${roomCode}/meta\`), {
      maxDevices: 10,
      validUntil: 0,
      ownerName: name || 'User',
      creatorDeviceId: state.info.deviceId,
      locked: false,
      createdAt: serverTimestamp(),
      lastActivityAt: serverTimestamp()
    });

    await set(ref(db, \`rooms/\${roomCode}/devices/\${state.info.deviceId}\`), {
      name: name || 'Device-1',
      info: state.info,
      joinedAt: serverTimestamp(),
      lastSeen: serverTimestamp(),
      blocked: false
    });

    state.room = roomCode;
    state.name = name || 'Device-1';
    state.isCreator = true;
    state.meta = {
      maxDevices: 10,
      validUntil: 0,
      ownerName: name || 'User',
      creatorDeviceId: state.info.deviceId
    };

    addRemembered({ code: roomCode, name: state.name, isCreator: true });
    $('new-room-code').textContent = roomCode;
    $('modal-room-created').classList.add('show');
  } catch (err) {
    console.error(err);
    helper.className = 'helper err';
    helper.textContent = 'Gagal membuat room. Coba lagi.';
  }
};

`;

  h = h.substring(0, startIdx) + newCreateFn + h.substring(endIdx);
  log.push('OK 3: Fungsi buat room diganti');
} else {
  log.push('FAIL 3: Marker tidak ditemukan');
}

// ============ 4. HAPUS REFERENSI LICENSE DI RESET ============
const oldReset = `$('create-license').value = ''; $('create-name').value = '';`;
const newReset = `$('create-name').value = '';`;

if (h.indexOf(oldReset) >= 0) {
  h = h.replace(oldReset, newReset);
  log.push('OK 4: Reset license dihapus');
} else {
  log.push('SKIP 4: Reset sudah/beda');
}

// ============ 5. CEK SISA REFERENSI ============
const remainingLic = (h.match(/create-license/gi) || []).length;
const remainingDerive = (h.match(/deriveRoomCode/gi) || []).length;

fs.writeFileSync(path, h);
console.log(log.join('\n'));
console.log('=== SISA REFERENSI ===');
console.log('create-license: ' + remainingLic);
console.log('deriveRoomCode: ' + remainingDerive);
