# Portal Resmi SMA Negeri 2 Purworejo (SMANDA) & SIM Dashboard Admin

Website resmi dan Sistem Informasi Manajemen (SIM) terpadu SMA Negeri 2 Purworejo (SMANDA Kutoarjo) berbasis **Next.js 16 (App Router)**, **React 19**, dan **Tailwind CSS v4**.

---

## 🏛️ Fitur Utama

### 1. Portal Publik Sekolah
- **Beranda & Profil:** Profil sekolah, sejarah, visi-misi, kepala sekolah, struktur organisasi, dan sarana prasarana.
- **Warta & Publikasi:** Berita kegiatan sekolah, liputan prestasi siswa, dan buletin sekolah.
- **Pengumuman & Transparansi:** Laporan realisasi dana BOSP, juknis PPDB, dan surat edaran resmi.
- **Kesiswaan & Ekstrakurikuler:** 20+ cabang ekstrakurikuler, galeri kegiatan, dan prestasi perlombaan.
- **Informasi PPDB:** Alur pendaftaran, persyaratan zonasi/prestasi/afirmasi/pindah tugas, dan FAQ.
- **Kontak & Layanan Terpadu:** Sekretariat, peta kampus, dan formulir pesan masyarakat.

### 2. Dashboard Admin Sekolah (`/admin`)
- **Ringkasan Operasional:** Executive overview metrik peserta didik, pendidik & tendik, alokasi kuota PPDB, dan agenda terpadu.
- **Verifikasi PPDB Online 2026/2027:**
  - Filter multi-kriteria (Jalur & Status berkas).
  - Verifikasi berkas calon peserta didik (Terima, Minta Revisi, Tolak).
  - Modal detail dokumen digital dan ekspor rekap ke CSV.
- **Manajemen Warta (CMS):** Penulisan warta baru, filter kategori, dan pengelolaan artikel publikasi.
- **Direktori Guru & PTK:** Data pendidik & tendik, status kepegawaian (PNS/PPPK), NIP, mapel, dan presensi harian.
- **Inventaris Sarana & Prasarana:** Monitoring kondisi 38 unit ruang, kelas, dan 5 laboratorium (TIK, IPA, Bahasa).
- **Mode Siang & Malam (Light / Dark Mode):** Switcher tema otomatis dengan persistensi `localStorage`.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 16.4.0 (Turbopack)
- **Library UI:** React 19.3.0
- **Styling:** Tailwind CSS v4 & PostCSS
- **Runtime:** Bun / Node.js

---

## 🚀 Menjalankan Project Secara Lokal

1. **Clone repository:**
   ```bash
   git clone https://github.com/farformbath/websekolahpemweb.git
   cd websekolahpemweb
   ```

2. **Install dependensi:**
   ```bash
   bun install
   # atau
   npm install
   ```

3. **Jalankan server pengembangan:**
   ```bash
   bun run dev
   # atau
   npm run dev
   ```

4. **Akses di browser:**
   - Portal Publik: `http://localhost:3010`
   - Dashboard Admin: `http://localhost:3010/admin`

5. **Build produksi:**
   ```bash
   bun run build
   bun run start
   ```
