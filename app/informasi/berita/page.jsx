"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllBerita } from "../../../components/school-content";

const categories = ["Semua", "Info Sekolah", "Prestasi", "Berita", "PPDB"];

export default function BeritaPage() {
  const [selectedCat, setSelectedCat] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const allBerita = getAllBerita();

  const filteredBerita = useMemo(() => {
    return allBerita.filter((item) => {
      const matchCat =
        selectedCat === "Semua" ||
        item.kategori.toLowerCase().includes(selectedCat.toLowerCase()) ||
        (selectedCat === "PPDB" && item.kategori.includes("PPDB"));

      const matchSearch =
        searchQuery === "" ||
        item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ringkasan.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [allBerita, selectedCat, searchQuery]);

  return (
    <div className="page-canvas-berita pt-24 sm:pt-28 pb-20 space-y-12 sm:space-y-16">
      {/* Header Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-b border-slate-200/80 pb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
            Warta Sekolah
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E38] tracking-tight mt-2">
            Berita & Publikasi SMANDA
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-xl mt-2">
            Arsip resmi kegiatan sekolah, publikasi Buletin Winda Jurnalistik, dan perkembangan prestasi peserta didik.
          </p>

          {/* Search & Filter Inline */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    selectedCat === cat
                      ? "bg-[#0B1E38] text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3.5 py-1.5 rounded-full text-xs border border-slate-200 bg-white text-[#0B1E38] focus:outline-none focus:border-[#0B66E8]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Magazine News Feed (Line-Separated Editorial List - No Cards) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        {filteredBerita.length > 0 ? (
          <div className="divide-y divide-slate-200/70 border-t border-b border-slate-200/70">
            {filteredBerita.map((item) => (
              <article key={item.id} className="py-6 sm:py-8 flex flex-col sm:flex-row gap-5 sm:gap-8 group">
                <div className="w-full sm:w-56 h-40 sm:h-36 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/60 shadow-sm">
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-[#5D7392] mb-1.5">
                      <span className="font-bold text-[#0B66E8]">{item.kategori}</span>
                      <span>•</span>
                      <time>{item.tanggal}</time>
                      <span>•</span>
                      <span>Oleh {item.penulis || "Humas SMANDA"}</span>
                    </div>

                    <h2 className="text-base sm:text-lg font-extrabold text-[#0F274A] group-hover:text-[#0B66E8] transition-colors leading-snug">
                      <Link href={`/informasi/berita/${item.slug}`}>
                        {item.judul}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-[#5D7392] leading-relaxed mt-2 line-clamp-2">
                      {item.ringkasan}
                    </p>
                  </div>

                  <div className="mt-3">
                    <Link
                      href={`/informasi/berita/${item.slug}`}
                      className="text-xs font-bold text-[#0B66E8] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Baca Selengkapnya</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-xs text-[#5D7392]">
            Tidak ada berita ditemukan untuk pencarian ini.
          </div>
        )}
      </section>
    </div>
  );
}
