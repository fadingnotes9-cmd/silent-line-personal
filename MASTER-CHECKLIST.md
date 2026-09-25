# MASTER CHECKLIST — Silent Line Personal

## FASE 1: Fondasi (6 task)
- [x] 1.1 Hapus super-admin.html
- [x] 1.2 Hapus fitur license dari app.html
- [x] 1.3 Hapus device approval (auto-approve sudah ada)
- [x] 1.4 Rename "petugas" → "user"
- [x] 1.5 Update icon & branding
- [x] 1.6 Test build pertama (auto via GitHub Actions)

## FASE 2: Setup Wizard (7 task)
- [x] 2.1 Slide 1: Selamat datang
- [x] 2.2 Slide 2: Buat kode rahasia
- [x] 2.3 Slide 3: Konfirmasi kode
- [x] 2.4 Slide 4: Selesai
- [x] 2.5 Simpan ke localStorage
- [x] 2.6 Validasi kode
- [x] 2.7 Test wizard

## FASE 3: Settings Panel (9 task)
- [x] 3.1 Menu Pengaturan utama
- [x] 3.2 Profil (ubah nama)
- [x] 3.3 Keamanan (ubah kode)
- [x] 3.4 Tampilan (dark mode)
- [~] 3.5 Chat (font size)
- [x] 3.6 Notifikasi
- [x] 3.7 Data (reset)
- [x] 3.8 Tentang (versi, privasi)
- [x] 3.9 Test semua menu
- [x] 3.15 Hapus Akun (purge + delete auth + wipe device)
- [x] 3.16 Hapus Ubah Nama dari Settings (redundan)
- [x] 3.17 Smart ✕ di daftar room (lupakan / hapus permanen)
- [x] 3.18 Kelola Room Saya (query userRooms + hapus)

## FASE 4: Multi-Room (8 task)
- [x] 4.1 Room Manager screen
- [x] 4.2 Simpan room ke localStorage
- [x] 4.3 Quick switch (klik room → isi form)
- [x] 4.4 Limit room (3 tersimpan + guard)
- [x] 4.5 Tambah room
- [x] 4.6 Hapus room
- [-] 4.7 Rename room (SKIP — tidak prioritas)
- [x] 4.8 Test multi-room (SUKSES)

## FASE 7a: License System (Sideload)
- [x] 7a.1 Admin panel — login + dashboard + list license
- [x] 7a.2 Admin — generate + revoke + reset + delete kode
- [x] 7a.3 Layar aktivasi user + validasi + device binding
- [x] 7a.4 Admin — monitoring Firebase + timestamp sync
- [x] 7a.5 Fix teks Hapus Akun (aktivasi via penjual)
- [x] 7a.6 Signing key (release signed APK)
- [x] 7a.7 Update workflow → signed APK (via GitHub Secrets)
- [x] 7a.8 Test install di HP sendiri (Play Protect accept)

## FASE 5: Proteksi (7 task)
- [x] 5.1 Auto-lock idle (cycle off/1m/5m/15m)
- [-] 5.2 Panic wipe (SKIP — risky untuk personal)
- [-] 5.3 Watermark nama user (SKIP — kontra-produktif)
- [~] 5.4 Google Play Licensing (TUNDA — butuh Play Console)
- [x] 5.5 Firebase Auth + Rules + Purge room creator
- [-] 5.6 Device binding (SKIP — user ganti HP blokir akses)
- [x] 5.7 Test proteksi
- [-] 5.8 Native Notification (SKIP — kontra stealth, bocor via notif)

## FASE 6: Optimasi Firebase (6 task)
- [-] 6.1 Auto-hapus 6 jam (SKIP — belum ada user)
- [x] 6.2 Presence interval 30 detik
- [x] 6.3 Read receipt interval 15 detik
- [-] 6.4 Limit foto 5/hari (SKIP — belum ada user)
- [x] 6.5 Compress foto 100 KB
- [-] 6.6 Test beban Firebase (SKIP — belum ada beban)

## FASE 7: Play Store Prep (6 task)
- [ ] 7.1 Privacy Policy
- [ ] 7.2 Terms of Service
- [ ] 7.3 Signing key
- [ ] 7.4 Ganti build APK → AAB
- [ ] 7.5 Update target API 36
- [ ] 7.6 Test build AAB

## FASE 8: Marketing (6 task)
- [ ] 8.1 Screenshot Play Store
- [ ] 8.2 Feature graphic
- [ ] 8.3 Icon Play Store
- [ ] 8.4 Video promo
- [ ] 8.5 Deskripsi aplikasi
- [ ] 8.6 Landing page

---

**TOTAL:** 55 task
