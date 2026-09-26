# POLISH ROADMAP — Silent Line Personal

**Update:** 2026-09-25
**Tujuan:** Daftar fitur polish & peningkatan UX untuk membuat aplikasi lebih profesional.
**Status:** Aktif dikerjakan setelah Fase 7a selesai.

---

## 📊 Legenda

- [ ] Belum dikerjakan
- [~] Sedang dikerjakan
- [x] Selesai
- [-] Skip / tidak perlu
- [>] Ditunda ke versi berikutnya

---

## 🔴 PRIORITAS 1 — WAJIB SEBELUM JUAL
**Target:** ~10 jam kerja
**Alasan:** Tanpa ini, user pertama akan complain "app terlihat murah".

### 1.1 Modal & Toast Custom ⭐⭐⭐ [SELESAI 2026-09-26]
- [x] Ganti semua `alert()` → modal custom
- [x] Ganti semua `confirm()` → modal kustom 2 tombol
- [x] Ganti semua `prompt()` → modal kustom dengan input
- [~] Toast notification (sudah ada basic, polish nanti)
- **Effort:** ~2-3 jam
- **Impact:** Instantly terlihat 10× lebih pro

### 1.2 Tutorial / Onboarding ⭐⭐⭐
- [ ] Slide tutorial 4-5 halaman (setelah aktivasi pertama)
- [ ] Menu "Cara Pakai" di Settings untuk re-baca
- [ ] Tooltip context saat pertama pakai fitur penting
- **Effort:** ~2 jam
- **Impact:** User baru tidak akan lost

### 1.3 Loading States ⭐⭐
- [ ] Skeleton screen saat load chat (bukan blank)
- [ ] Spinner animasi halus saat loading
- [ ] Progress indicator untuk upload foto
- **Effort:** ~1 jam
- **Impact:** Terasa modern seperti app besar

### 1.4 Empty States Cantik ⭐⭐
- [ ] Empty state "Belum ada room" dengan ilustrasi + CTA
- [ ] Empty state "Belum ada pesan" di chat
- [ ] Empty state "Belum ada foto" di galeri chat
- **Effort:** ~1 jam
- **Impact:** User tahu apa yang harus dilakukan

### 1.5 Error Handling Ramah ⭐⭐
- [ ] Pesan error user-friendly (bukan teknis)
- [ ] Tombol "Coba Lagi" / "Batal" untuk error
- [ ] Auto-retry untuk error jaringan
- **Effort:** ~1 jam
- **Impact:** User tidak panik saat error

### 1.6 Icon & Splash Kalkulator ⭐⭐⭐
- [ ] Ganti icon app jadi kalkulator asli (bukan "SL")
- [ ] Splash screen dengan logo kalkulator
- [ ] Konsisten dengan nama app "Kalkulator"
- **Effort:** ~2 jam
- **Impact:** Disguise sempurna, Play Protect tidak curiga

---

## 🟡 PRIORITAS 2 — BULAN PERTAMA
**Target:** ~11 jam kerja
**Alasan:** Bikin user senang & tidak complain.

### 2.1 Edit & Hapus Pesan Sendiri ⭐⭐
- [ ] Long-press pesan sendiri → menu Edit / Hapus
- [ ] Edit inline dengan timestamp "diedit"
- [ ] Hapus dengan konfirmasi
- **Effort:** ~2 jam

### 2.2 Emoji Picker ⭐⭐
- [ ] Picker dengan ~100 emoji populer
- [ ] 8 kategori: Smileys, Hati, Tangan, Makanan, dll
- [ ] Tab navigation di picker
- **Effort:** ~2 jam

### 2.3 Reply Quote Visual ⭐
- [ ] Quote reply dengan border warna + background
- [ ] Icon quote yang jelas
- [ ] Preview lebih besar
- **Effort:** ~30 menit

### 2.4 Animasi Transisi ⭐⭐
- [ ] Slide-in/out antar screen (login → chat → settings)
- [ ] Fade transition untuk modal
- [ ] Smooth scroll ke pesan baru
- **Effort:** ~1 jam

### 2.5 Haptic Feedback ⭐
- [ ] Getar saat tombol utama di-tap
- [ ] Getar saat terima pesan
- [ ] Getar saat error
- **Effort:** ~30 menit

### 2.6 Pull-to-Refresh ⭐
- [ ] Gesture pull-down di chat untuk refresh
- [ ] Gesture pull-down di daftar room
- **Effort:** ~1 jam

### 2.7 Search Pesan ⭐⭐
- [ ] Search box di header chat
- [ ] Highlight hasil search
- [ ] Navigasi antar hasil (prev/next)
- **Effort:** ~2 jam

### 2.8 Screenshot Blocking ⭐⭐
- [ ] Aktifkan FLAG_SECURE di Android (butuh plugin)
- [ ] Blokir screenshot di layar chat
- [ ] Blokir screen recording
- **Effort:** ~2 jam

---

## 🟢 PRIORITAS 3 — BULAN 2-3
**Target:** ~14 jam kerja
**Alasan:** Bikin user betah & share ke teman.

### 3.1 Voice Message ⭐⭐
- [ ] Rekam + kirim voice note
- [ ] Waveform display
- [ ] Play/pause + durasi
- **Effort:** ~4 jam

### 3.2 Attachment File ⭐
- [ ] Kirim PDF, DOCX, ZIP
- [ ] Preview sebelum kirim
- [ ] Icon berbeda per tipe file
- **Effort:** ~3 jam

### 3.3 Pin Pesan ⭐
- [ ] Pin pesan penting di atas chat
- [ ] Banner pinned message
- [ ] Unpin dengan long-press
- **Effort:** ~2 jam

### 3.4 Multi-Language ⭐
- [ ] Toggle ID / EN di Settings
- [ ] Translate semua string
- [ ] Simpan preferensi bahasa
- **Effort:** ~3 jam

### 3.5 Changelog "What's New" ⭐
- [ ] Show update terbaru ke user
- [ ] Modal dengan daftar fitur baru
- [ ] Show 1× setelah update
- **Effort:** ~1 jam

### 3.6 Rating Prompt ⭐⭐
- [ ] Muncul setelah user pakai 7 hari
- [ ] Hanya kalau user aktif (bukan idle)
- [ ] Opsi "Nanti" / "Jangan tanya lagi"
- **Effort:** ~1 jam

---

## 🔵 PRIORITAS 4 — v2.0 (FUTURE)
**Target:** Jangan dikerjakan sekarang. Rencanakan.

### 4.1 Duress Code 🔒
- [ ] Kode khusus yang kalau dipaksa buka app → jadi kalkulator normal
- [ ] Data chat tersembunyi total
- [ ] Bisa restore pakai kode utama
- **Effort:** ~5 jam

### 4.2 Trial Period 💰
- [ ] Coba gratis 3 hari
- [ ] Setelah trial → minta kode aktivasi
- [ ] Bisa naikkan conversion rate
- **Effort:** ~3 jam

### 4.3 Referral Code 💰
- [ ] Pembeli dapat kode referral unik
- [ ] Teman pakai kode → diskon 20%
- [ ] Referrer dapat komisi
- **Effort:** ~4 jam

### 4.4 Widget Kalkulator 🎨
- [ ] Widget kalkulator fungsional di home screen
- [ ] Disguise sempurna — kalkulator asli
- [ ] Butuh native Android code
- **Effort:** ~8 jam

### 4.5 Encrypted Backup 🔐
- [ ] Backup chat terenkripsi ke lokal
- [ ] Export/import dengan password
- [ ] Format custom (.slbackup)
- **Effort:** ~6 jam

---

## 🚫 TIDAK PERLU DIBANGUN

Hemat waktu, fokus ke yang penting.

- Group video call — bukan target user
- Sticker pack — ribet, tidak penting
- Theme custom warna — sudah skip
- Font custom — sudah skip
- 2FA — overkill untuk personal app
- Cloud backup semua chat — kontradiksi filosofi
- Status/Story — bukan konsep app
- Friend online status — bukan konsep app
- AI chatbot — tidak relevan
- Payment in-app — tidak perlu

---

## 📊 ESTIMASI TOTAL

| Prioritas | Effort | Target |
|---|---|---|
| P1 (Critical) | ~10 jam | Sebelum jual |
| P2 (Important) | ~11 jam | Bulan 1 |
| P3 (Nice) | ~14 jam | Bulan 2-3 |
| P4 (v2.0) | ~26 jam | Setelah 100 user |
| **Total** | **~61 jam** | **~25 sesi** |

---

## 🎯 URUTAN EKSEKUSI REKOMENDASI

### Sesi 1 (Sekarang):
**1.1 Modal & Toast Custom** — paling impactful, effort rendah

### Sesi 2:
**1.6 Icon & Splash Kalkulator** — disguise sempurna

### Sesi 3:
**1.2 Tutorial / Onboarding** — user baru tidak lost

### Sesi 4:
**1.3 + 1.4 + 1.5** — Loading, Empty, Error (bisa digabung)

### Setelah 5 pembeli pertama:
Diskusi feedback → pilih prioritas 2 yang paling diminta

---

## 📝 CATATAN

- **Jangan** kerjakan semua sekaligus — satu per satu
- **Test di APK** setiap selesai 1 fitur
- **Commit** dengan format: `Polish X.Y: [deskripsi]`
- **Update file ini** setiap fitur selesai

---

**END OF POLISH-ROADMAP.md**
