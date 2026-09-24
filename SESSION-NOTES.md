# SESSION NOTES — Silent Line Personal

## Sesi 1 — 2026-09-22

**Durasi:** ~2 jam

**Yang Dikerjakan:**
- Bikin repo `silent-line-personal` di GitHub
- Clone dari `silent-line` (enterprise)
- Ganti remote ke repo baru
- Push berhasil ✅

**Error:**
- Import GitHub gagal (IP blocked) → pakai manual clone

**Status Akhir:**
- Repo personal sudah live
- Siap mulai Fase 1

**Catatan:**
- Enterprise FROZEN, tidak disentuh
- Fokus semua kerja di `~/silent-line-personal`

---

## Sesi 2 — 2026-09-23

**Durasi:** ~3 jam

**Yang Dikerjakan:**
- Fix Bug #1: key notifikasi konsisten (`sl_notif_sound`, `sl_notif_vibrate`) — commit `e7b1559`
- Fix bug dark mode: teks pesan hilang di bubble (tambah `color:#111`) — commit `fb3585f`
- Sinkronkan MASTER-CHECKLIST dengan PROJECT-STATUS — commit `3723396`
- Fase 3.8: Handler Tentang (about/privacy/terms) — commit `d03ad02`
- Fase 3.9: Test end-to-end — SEMUA SUKSES
- Docs: Fase 3 SELESAI (9/9) — commit `162f200`

**Test yang Lolos:**
- Wizard 4 slide
- Login kode
- Chat teks (light + dark mode)
- Kamera (ambil + galeri)
- Ubah nama
- Ubah kode rahasia
- Dark mode toggle
- Toggle suara/getar persist
- Reset aplikasi
- Tentang (versi/privasi/terms)
- Build APK via GitHub Actions

**Status Akhir:**
- Fase 3 SELESAI (9/9 task)
- Progress: 4/8 fase (50%)
- Build terakhir: `162f200`

**Catatan:**
- Fase 3.5 (Font Size) DEFERRED — evaluasi di tahap 100%
- Login git pakai Personal Access Token (bukan password)

---

## Sesi 3 — 2026-09-23 (lanjutan)

**Durasi:** ~3 jam

**Yang Dikerjakan:**
- Fase 4: Multi-Room SELESAI (4.1-4.6, 4.8; 4.7 skip)
- Fase 4.2: Tombol ✕ di popup Room + handler Copy (fallback execCommand)
- Fase 4.4: Guard limit 3 room (blokir + disable tombol)
- Fase 5.1: Auto-lock idle (handler cycle + timer redirect ke kalkulator)
- Fase 5.5: Firebase Anonymous Auth + Rules ketat + Purge room creator
- Fase 5.5f: Fix cache bug join room (onValue+onlyOnce → get)
- Fase 5.5g: Reset tidak hapus sl_device_id (identitas permanen)
- Fase 5.5h: Cleanup debug alert

**Masalah yang Ditemukan & Diperbaiki:**
- Database Firebase awalnya TERBUKA TOTAL (read/write: true) → ditutup dengan Auth + Rules
- Bug cache onValue+onlyOnce bikin room bisa resurrect → ganti get()
- Device ID berubah setelah reset → purge gagal → jangan hapus sl_device_id

**Catatan Penting:**
- Firebase Rules sekarang: `rooms/*` butuh `auth != null`
- Test: reset aplikasi → join kode lama → HARUS "Room tidak ditemukan"
- Room lama (test) sudah dibersihkan manual via Firebase Console

**Status Akhir:**
- Fase 5: 3/7 done (5.1, 5.5, 5.7), 3 skip, 1 tunda
- Progress: 5/8 fase (62.5%)

---

## Sesi 4 — 2026-09-23 (lanjutan)

**Durasi:** ~1 jam

**Yang Dikerjakan:**
- Fase 6.2: Presence interval 30s (dari 15s) — hemat ~50% kuota
- Fase 6.3: Read receipt interval 15s (dari 8s)
- Fase 6.5: Compress foto target 100 KB (dari 200 KB)
- SKIP 5.8 (Native Notification) — kontra stealth, notif status bar = jejak

**Keputusan Penting:**
- Notifikasi background DIBATALKAN total — melanggar konsep "tanpa jejak"
- Fase 6 SKIP 6.1/6.4/6.6 — prematur (belum ada user)

**Status Akhir:**
- Fase 6 SELESAI (3/6, 3 skip dengan alasan)
- Progress: 6/8 fase (75%)
- Build terakhir: `1b690f5`

---

## Sesi 5 — (belum)

**Rencana Awal:** Fase 7 Play Store Prep

**Yang Benar-benar Dikerjakan:**
- Fase 3.10: Hapus Warna Aksen + Gaya Bubble (cleanup)
- Fase 3.11: Info Penyimpanan tampil B/KB/MB (dari 0 KB)
- Fase 3.12: Auto Hapus Pesan (cycle Off/1h/6h/24h/7d)
- Fase 3.13: Handler storage-info (breakdown per key)
- Fase 3.14: Hapus Ukuran Font (cleanup)

- Fase 3.15: Hapus Akun (purge + delete auth + wipe device)
- Fix mismatch handler delete-account

**Rencana Sesi Berikutnya:**
- Fase 7.1: Privacy Policy
- Fase 7.2: Terms of Service
- Fase 7.3: Signing key
- Fase 7.4: APK → AAB
- Fase 7.5: Target API 36
- Fase 7.6: Test build AAB

**Rencana:** Fase 5.8 Native Notification (background push) → sisa Fase 5

**Rencana:** Fase 4 Multi-Room (8 task)

**Catatan awal Fase 4 (dari Sesi 2):**
- `getRemembered()` dan `saveRemembered()` SUDAH ADA di app.html baris 475-476
- Pakai key `sl_rooms`
- Limit saat ini 10 room (`slice(-10)`) — Fase 4.4 perlu ubah jadi 3
- Jadi Fase 4.2 (simpan room ke localStorage) sudah PARTIAL
