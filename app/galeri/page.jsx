"use client";

import { useState } from "react";

const galeriItems = [
  { kategori: "Fasilitas Kampus", judul: "Gedung Utama & Kawasan Kampus Kutoarjo", gambar: "/assets/facilities/gedung-utama.jpg", desc: "Kompleks gedung pembelajaran modern seluas 19.720 m² di Kutoarjo." },
  { kategori: "Fasilitas Kampus", judul: "Halaman Asri & Taman Adiwiyata", gambar: "/assets/facilities/halaman-sekolah.jpg", desc: "Zona hijau ramah lingkungan untuk ruang interaksi siswa." },
  { kategori: "Fasilitas Kampus", judul: "Koridor Kampus & Akses Terpadu", gambar: "/assets/facilities/koridor-sekolah.jpg", desc: "Aksesibilitas ramah disabilitas antar ruang kelas dan laboratorium." },
  { kategori: "Fasilitas Kampus", judul: "Gelanggang Olahraga Terpadu", gambar: "/assets/facilities/lapangan-olahraga.jpg", desc: "Lapangan basket, voli, dan futsal untuk olahraga dan pertandingan." },
  { kategori: "Kegiatan Siswa", judul: "Pramuka Penegak Ambalan SMANDA", gambar: "/assets/activities/kegiatan-pramuka.jpg", desc: "Latihan kepramukaan pembentukan watak kepemimpinan tangguh." },
  { kategori: "Kegiatan Siswa", judul: "Pelantikan Saka Wira Kartika", gambar: "/assets/activities/saka-wira-kartika.jpg", desc: "Pembinaan wawasan kebangsaan pemuda bersama Kodim Purworejo." },
  { kategori: "Kegiatan Siswa", judul: "Gelar Karya P5: Aksi Nyata Daur Ulang", gambar: "/assets/activities/p5-aksi-nyata.jpg", desc: "Pameran hasil karya inovasi siswa bertema Gaya Hidup Berkelanjutan." },
  { kategori: "Kegiatan Siswa", judul: "Kunjungan Edukasi Lingkungan ke TPA", gambar: "/assets/activities/kunjungan-tpa.jpg", desc: "Studi lapangan pengolahan sampah di Kabupaten Purworejo." },
  { kategori: "Prestasi & Gelar", judul: "10 Duta OSN Lolos Tingkat Provinsi", gambar: "/assets/achievements/osn-provinsi.png", desc: "Delegasi sains SMANDA yang mewakili Purworejo di tingkat Jawa Tengah." },
  { kategori: "Prestasi & Gelar", judul: "Owl Basketball Putri Juara 3 PBL", gambar: "/assets/achievements/basket-putri-pbl.jpg", desc: "Torehan prestasi tim basket putri pada Purworejo Basketball League." },
  { kategori: "Fasilitas Kampus", judul: "Gerbang Utama & Pos Pelayanan Terpadu", gambar: "/assets/facilities/gerbang-sekolah.jpg", desc: "Pintu masuk kampus dengan sistem pengamanan terpadu." },
  { kategori: "Fasilitas Kampus", judul: "Foto Aerial Panorama Kawasan Sekolah", gambar: "/assets/facilities/aerial-kampus.jpg", desc: "Lanskap tata letak gedung dan lapangan terbuka hijau dari udara." },
];

const kategoriList = ["Semua", "Fasilitas Kampus", "Kegiatan Siswa", "Prestasi & Gelar"];

export default function GaleriPage() {
  const [selectedCat, setSelectedCat] = useState("Semua");

  const filtered =
    selectedCat === "Semua"
      ? galeriItems
      : galeriItems.filter((item) => item.kategori === selectedCat);

  return (
    <div className="page-canvas-galeri pt-24 sm:pt-28 pb-20 space-y-16 sm:space-y-20">
      {/* Header Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-b border-slate-200/80 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
              Dokumentasi Visual
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E38] tracking-tight mt-2">
              Galeri Foto Kampus & Kegiatan
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-xl mt-2">
              Koleksi dokumentasi sarana pembelajaran, dinamika kegiatan kesiswaan, dan lingkungan Adiwiyata SMANDA.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            {kategoriList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCat === cat
                    ? "bg-[#0B1E38] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Photo Gallery Grid - No Heavy Nested Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((item, idx) => (
            <div key={idx} className="group">
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200/60 mb-2.5">
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-md text-[#0F274A] shadow-sm">
                  {item.kategori}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#0F274A] leading-snug group-hover:text-[#0B66E8] transition-colors">
                {item.judul}
              </h3>
              <p className="text-[11px] text-[#5D7392] leading-relaxed mt-0.5 line-clamp-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
