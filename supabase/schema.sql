-- ========================================================
-- SCHEMA DATABASE SUPABASE - SIM SMA NEGERI 2 PURWOREJO
-- Project Ref: ktsxrgqrlubjcuhplksk
-- URL: https://ktsxrgqrlubjcuhplksk.supabase.co
-- ========================================================

-- 1. TABEL PENDAFTAR PPDB
CREATE TABLE IF NOT EXISTS ppdb_pendaftar (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  nisn TEXT NOT NULL,
  asal_sekolah TEXT NOT NULL,
  jalur TEXT NOT NULL,
  nilai_rapor NUMERIC(4, 2) DEFAULT 0,
  jarak_zonasi TEXT,
  berkas JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'Menunggu Verifikasi',
  tanggal DATE DEFAULT CURRENT_DATE,
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL WARTA & ARTIKEL SEKOLAH
CREATE TABLE IF NOT EXISTS berita (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  judul TEXT NOT NULL,
  kategori TEXT NOT NULL,
  ringkasan TEXT,
  penulis TEXT DEFAULT 'Humas SMANDA',
  gambar TEXT DEFAULT '/assets/campus-hero.png',
  konten JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'Published',
  views INT DEFAULT 1,
  tanggal TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL GURU & TENAGA KEPENDIDIKAN (PTK)
CREATE TABLE IF NOT EXISTS guru_ptk (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  nip TEXT,
  mapel TEXT NOT NULL,
  status TEXT DEFAULT 'PNS (ASN)',
  sertifikasi TEXT DEFAULT 'Sudah Sertifikasi',
  kehadiran TEXT DEFAULT 'Hadir (06.45 WIB)',
  foto TEXT DEFAULT '/assets/teachers/guru-amin.jpg',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL SARANA & PRASARANA
CREATE TABLE IF NOT EXISTS sarpras (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  luas TEXT,
  jumlah TEXT,
  kondisi TEXT DEFAULT 'Kondisi Baik',
  penanggung_jawab TEXT DEFAULT 'Tim Sarpras SMANDA',
  terakhir_cek TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AKTIFKAN ROW LEVEL SECURITY (RLS) DENGAN AKSES READ/WRITE PUBLIK
ALTER TABLE ppdb_pendaftar ENABLE ROW LEVEL SECURITY;
ALTER TABLE berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE guru_ptk ENABLE ROW LEVEL SECURITY;
ALTER TABLE sarpras ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses Baca Publik
CREATE POLICY "Public read ppdb" ON ppdb_pendaftar FOR SELECT USING (true);
CREATE POLICY "Public insert ppdb" ON ppdb_pendaftar FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update ppdb" ON ppdb_pendaftar FOR UPDATE USING (true);
CREATE POLICY "Public delete ppdb" ON ppdb_pendaftar FOR DELETE USING (true);

CREATE POLICY "Public read berita" ON berita FOR SELECT USING (true);
CREATE POLICY "Public insert berita" ON berita FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update berita" ON berita FOR UPDATE USING (true);
CREATE POLICY "Public delete berita" ON berita FOR DELETE USING (true);

CREATE POLICY "Public read guru" ON guru_ptk FOR SELECT USING (true);
CREATE POLICY "Public insert guru" ON guru_ptk FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update guru" ON guru_ptk FOR UPDATE USING (true);
CREATE POLICY "Public delete guru" ON guru_ptk FOR DELETE USING (true);

CREATE POLICY "Public read sarpras" ON sarpras FOR SELECT USING (true);
CREATE POLICY "Public insert sarpras" ON sarpras FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update sarpras" ON sarpras FOR UPDATE USING (true);
CREATE POLICY "Public delete sarpras" ON sarpras FOR DELETE USING (true);

-- ========================================================
-- DATA SEED AWAL
-- ========================================================

-- Seed PPDB
INSERT INTO ppdb_pendaftar (id, nama, nisn, asal_sekolah, jalur, nilai_rapor, jarak_zonasi, berkas, status, tanggal, catatan)
VALUES
  ('REG-2026-001', 'Muhammad Rizky Pratama', '0089123456', 'SMP Negeri 1 Kutoarjo', 'Zonasi', 89.4, '450 m', '["Kartu Keluarga", "Surat Keterangan Lulus", "Akta Kelahiran"]'::jsonb, 'Diterima', '2026-10-18', 'Berkas lengkap sesuai zonasi ring 1 Kutoarjo.'),
  ('REG-2026-002', 'Anindya Ayu Kirana', '0087456123', 'SMP Negeri 2 Kutoarjo', 'Prestasi', 93.8, '1.8 km', '["Buku Rapor", "Sertifikat OSN Matematika Kab.", "Ijazah SMP"]'::jsonb, 'Diterima', '2026-10-19', 'Juara 1 OSN Matematika Tingkat Kabupaten Purworejo.'),
  ('REG-2026-003', 'Bagas Satria Wibowo', '0082345678', 'SMP Negeri 1 Purworejo', 'Zonasi', 86.2, '1.1 km', '["Kartu Keluarga", "Surat Keterangan Lulus"]'::jsonb, 'Menunggu Verifikasi', '2026-10-21', 'Menunggu validasi keabsahan KK 1 tahun domisili.'),
  ('REG-2026-004', 'Citra Dewi Lestari', '0083456789', 'SMP Negeri 3 Kutoarjo', 'Afirmasi', 88.0, '2.3 km', '["Kartu Indonesia Pintar (KIP)", "Kartu Keluarga", "SKL"]'::jsonb, 'Diterima', '2026-10-20', 'Terverifikasi penerima Program Indonesia Pintar (PIP).'),
  ('REG-2026-005', 'Dimas Arya Pangestu', '0084567890', 'SMP Negeri 1 Kemiri', 'Prestasi', 91.5, '4.5 km', '["Buku Rapor", "Piagam POPDA Atletik"]'::jsonb, 'Menunggu Verifikasi', '2026-10-21', 'Sertifikat POPDA sedang dalam antrean verifikasi panitia.')
ON CONFLICT (id) DO NOTHING;

-- Seed Guru PTK
INSERT INTO guru_ptk (id, nama, nip, mapel, status, sertifikasi, kehadiran, foto)
VALUES
  ('G-1', 'Amin Subagyo, S.Pd', '19750812 200101 1 001', 'Pendidikan Jasmani & Olahraga', 'PNS (ASN)', 'Sudah Sertifikasi', 'Hadir (06.45 WIB)', '/assets/teachers/guru-amin.jpg'),
  ('G-2', 'Antonius Haryanto, M.Pd', '19760812 200201 1 002', 'Matematika Peminatan & OSN', 'PNS (ASN)', 'Sudah Sertifikasi', 'Hadir (06.45 WIB)', '/assets/teachers/guru-antonius.jpg'),
  ('G-3', 'Ida Rahmawati, S.Pd', '19770812 200301 1 003', 'Bahasa & Sastra Indonesia', 'PNS (ASN)', 'Sudah Sertifikasi', 'Hadir (06.45 WIB)', '/assets/teachers/guru-ida.jpg'),
  ('G-4', 'Kamariyam, S.Pd', '19780812 200401 1 004', 'Fisika & Karya Ilmiah Remaja', 'PPPK', 'Sudah Sertifikasi', 'Hadir (06.45 WIB)', '/assets/teachers/guru-kamariyam.jpg'),
  ('G-5', 'Musidah, S.Pd', '19790812 200501 1 005', 'Biologi & Pembina Adiwiyata', 'PNS (ASN)', 'Sudah Sertifikasi', 'Hadir (06.45 WIB)', '/assets/teachers/guru-musidah.jpg'),
  ('G-6', 'Yuliati, S.Pd, M.Pd', '19800812 200601 1 006', 'Bahasa Inggris & Debat', 'PNS (ASN)', 'Sudah Sertifikasi', 'Hadir (06.45 WIB)', '/assets/teachers/guru-yuliati.jpg')
ON CONFLICT (id) DO NOTHING;
