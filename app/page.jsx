import Link from "next/link";
import Hero from "../components/hero";
import Button from "../components/button";
import { dataSekolah, getAllBerita } from "../components/school-content";

export default function HomePage() {
  const allBerita = getAllBerita();
  const featuredBerita = allBerita[0];
  const sideBerita = allBerita.slice(1, 4);
  const facilities = dataSekolah.fasilitas;
  const achievements = dataSekolah.prestasi;

  return (
    <div className="page-canvas-home space-y-16 sm:space-y-20 pb-20">
      {/* 1. Hero Clean & Minimal Nav Strip */}
      <Hero />

      {/* 2. Sambutan Kepala Sekolah & Profil (Editorial Split - No Heavy Card Boxes) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-astra-card text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Foto Portrait Kepala Sekolah */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
              <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden shadow-2xl bg-white/10 border-2 border-white/40">
                <img
                  src={dataSekolah.kepalaSekolah.foto}
                  alt={dataSekolah.kepalaSekolah.nama}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="mt-4 text-center lg:text-left">
                <h3 className="text-base font-black text-white">
                  {dataSekolah.kepalaSekolah.nama}
                </h3>
                <p className="text-xs font-bold text-amber-300 mt-0.5">
                  {dataSekolah.kepalaSekolah.jabatan}
                </p>
                <p className="text-[11px] text-sky-200">
                  {dataSekolah.kepalaSekolah.periode}
                </p>
              </div>
            </div>

            {/* Narasi Sambutan Editorial */}
            <div className="lg:col-span-8 space-y-5">
              <div className="border-b border-white/20 pb-3">
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-300">
                  Sambutan Kepala Sekolah
                </h2>
              </div>

              <blockquote className="academic-quote text-lg sm:text-xl lg:text-2xl font-normal italic text-white leading-relaxed tracking-tight">
                &ldquo;{dataSekolah.kepalaSekolah.sambutan}&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Di atas lahan kampus terpadu seluas 19.720 m² di Kutoarjo, SMA Negeri 2 Purworejo menerapkan Kurikulum Merdeka yang menekankan kemandirian nalar kritis, kepekaan literasi lewat Buletin Winda, dan pembinaan 20+ cabang minat bakat siswa.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/profil"
                  className="px-5 py-2 rounded-full bg-white text-[#0055B8] text-xs font-extrabold hover:bg-sky-50 shadow-md transition-all"
                >
                  Baca Sejarah & Profil Sekolah
                </Link>
                <Link
                  href="/profil#visi-misi"
                  className="px-4 py-2 rounded-full bg-white/15 text-white text-xs font-bold hover:bg-white/25 border border-white/20 transition-all"
                >
                  Visi & Misi
                </Link>
              </div>
            </div>

          </div>

          {/* Metric Bar (Horizontal Strip di dalam Panel Astra Blue) */}
          <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/15 relative z-10">
            {dataSekolah.statistik.map((s, idx) => (
              <div key={idx} className={`pt-4 md:pt-0 ${idx > 0 ? "md:pl-6" : ""}`}>
                <div className="text-2xl sm:text-3xl font-black text-amber-300 tabular-nums tracking-tight">
                  {s.nilai}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">
                  {s.label}
                </div>
                <div className="text-[11px] text-sky-200 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Fasilitas & Lingkungan Kampus (Editorial Split Showcase - No Identical Card Grids) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
              Sarana Prasarana
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F274A] tracking-tight mt-1">
              Kawasan Kampus Terpadu Kutoarjo
            </h2>
          </div>
          <Link
            href="/galeri"
            className="text-xs sm:text-sm font-semibold text-[#0B66E8] hover:underline"
          >
            Lihat Dokumentasi Kampus
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Foto Utama Besar */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-slate-100 shadow-md border border-slate-200/60 relative aspect-[16/10]">
            <img
              src="/assets/facilities/gedung-utama.jpg"
              alt="Gedung Utama SMA Negeri 2 Purworejo"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-sky-300">
                Lahan 19.720 m²
              </span>
              <h3 className="text-base sm:text-lg font-bold">
                Gedung Pembelajaran & Laboratorium Terpadu
              </h3>
              <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">
                Ruang kelas representatif, Smart Classroom, dan laboratorium sains lengkap sesuai standar Permendiknas No. 24/2007.
              </p>
            </div>
          </div>

          {/* List Fasilitas Berbaris (Clean Row Directory, Bukan Card) */}
          <div className="lg:col-span-5 divide-y divide-slate-200/70">
            {facilities.slice(1, 5).map((f) => (
              <div key={f.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5 group">
                <div className="w-16 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={f.gambar}
                    alt={f.nama}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F274A] group-hover:text-[#0B66E8] transition-colors leading-tight">
                      {f.nama}
                    </h4>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                      {f.kategori}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5D7392] leading-relaxed line-clamp-2 mt-1">
                    {f.deskripsi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Warta Berita & Buletin Winda (Magazine Editorial Layout) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3 border-b border-slate-200/80 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
              Warta & Publikasi
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F274A] tracking-tight mt-1">
              Kabar Terbaru SMA Negeri 2 Purworejo
            </h2>
          </div>
          <Link
            href="/informasi/berita"
            className="text-xs sm:text-sm font-semibold text-[#0B66E8] hover:underline"
          >
            Arsip Lengkap Berita ({allBerita.length})
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Berita Utama (Hero Headline Magazine) */}
          <article className="lg:col-span-7 flex flex-col group">
            <Link href={`/informasi/berita/${featuredBerita.slug}`} className="block overflow-hidden rounded-2xl aspect-[16/10] bg-slate-100 mb-4 border border-slate-200/60 shadow-sm">
              <img
                src={featuredBerita.gambar}
                alt={featuredBerita.judul}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
            <div className="flex items-center gap-2 text-xs text-[#5D7392] mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0B66E8] font-bold text-[11px]">
                {featuredBerita.kategori}
              </span>
              <span>•</span>
              <time>{featuredBerita.tanggal}</time>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0F274A] group-hover:text-[#0B66E8] transition-colors leading-snug">
              <Link href={`/informasi/berita/${featuredBerita.slug}`}>
                {featuredBerita.judul}
              </Link>
            </h3>
            <p className="text-xs sm:text-sm text-[#5D7392] leading-relaxed mt-2 line-clamp-3">
              {featuredBerita.ringkasan}
            </p>
          </article>

          {/* 3 Berita Sampingan (Line-Separated Editorial List) */}
          <div className="lg:col-span-5 divide-y divide-slate-200/70 flex flex-col justify-between">
            {sideBerita.map((item) => (
              <article key={item.id} className="py-4 first:pt-0 last:pb-0 group">
                <div className="flex items-center gap-2 text-[11px] text-[#5D7392] mb-1">
                  <span className="font-bold text-[#0B66E8]">{item.kategori}</span>
                  <span>•</span>
                  <time>{item.tanggal}</time>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0F274A] group-hover:text-[#0B66E8] transition-colors leading-snug">
                  <Link href={`/informasi/berita/${item.slug}`}>
                    {item.judul}
                  </Link>
                </h4>
                <p className="text-[11px] text-[#5D7392] leading-relaxed mt-1 line-clamp-2">
                  {item.ringkasan}
                </p>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Rekap Prestasi (Clean Honor Roll List) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-t border-slate-200/80 pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
                Kejuaraan & Prestasi
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0F274A] mt-1">
                Torehan Prestasi Siswa & Pembina
              </h2>
            </div>
            <Link href="/kesiswaan#prestasi" className="text-xs font-semibold text-[#0B66E8] hover:underline">
              Seluruh Catatan Prestasi
            </Link>
          </div>

          <div className="divide-y divide-slate-200/60 border-t border-b border-slate-200/60">
            {achievements.map((item, idx) => (
              <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shrink-0">
                    ★
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0F274A]">
                      {item.judul}
                    </h3>
                    <p className="text-[11px] text-[#5D7392] mt-0.5">
                      {item.keterangan}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 shrink-0 self-start sm:self-auto text-xs">
                  <span className="font-semibold text-slate-500">{item.bidang}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[#0F274A] font-bold text-[11px]">
                    Tingkat {item.tingkat}
                  </span>
                  <span className="text-[#0B66E8] font-bold">{item.tahun}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Banner Akses PPDB (Clean & Focused Callout - No Heavy Cards) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl p-8 sm:p-12 bg-astra-banner-home text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-white/20">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="px-3 py-1 rounded-full bg-white/20 text-sky-200 text-xs font-bold inline-block border border-white/20">
              Tahun Ajaran 2026/2027
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Penerimaan Peserta Didik Baru (PPDB)
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Pelajari informasi 4 jalur pendaftaran (Zonasi, Afirmasi, Prestasi, dan Mutasi Tugas), berkas persyaratan, alur seleksi, serta jadwal layanan verifikasi berkas di kampus sekolah.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <Button href="/ppdb" variant="gold" size="md" className="justify-center shadow-lg">
              Panduan Jalur PPDB
            </Button>
            <Button
              href="https://ppdb.jatengprov.go.id"
              variant="secondary"
              size="md"
              className="justify-center"
            >
              Portal Resmi Jateng
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
