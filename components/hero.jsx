import Link from "next/link";

const navLinks = [
  {
    title: "PPDB",
    desc: "Penerimaan Peserta Didik Baru",
    href: "/ppdb",
    tag: "Pendaftaran",
    icon: (
      <svg className="w-5 h-5 text-[#0B66E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Kesiswaan",
    desc: "Ekstrakurikuler & Prestasi",
    href: "/kesiswaan",
    tag: "20+ Ekskul",
    icon: (
      <svg className="w-5 h-5 text-[#0B66E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Informasi",
    desc: "Pengumuman & Berita",
    href: "/informasi/berita",
    tag: "Warta",
    icon: (
      <svg className="w-5 h-5 text-[#0B66E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Galeri",
    desc: "Foto & Video Kegiatan",
    href: "/galeri",
    tag: "Dokumentasi",
    icon: (
      <svg className="w-5 h-5 text-[#0B66E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <div className="w-full">
      {/* 1. Clear Panoramic Campus Hero Banner */}
      <section className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[82vh] min-h-[500px] max-h-[820px] overflow-hidden">
        {/* Gambar Kampus 3D Penuh & Bersih */}
        <img
          src="/assets/campus-hero.png"
          alt="Kawasan Kampus SMA Negeri 2 Purworejo"
          className="w-full h-full object-cover object-center scale-100"
          priority="true"
        />

        {/* Soft, harmonious bottom transition gradient strictly at the lower 160px */}
        <div className="absolute bottom-0 inset-x-0 h-36 sm:h-52 bg-gradient-to-t from-[#F5F4EE] via-[#F5F4EE]/80 to-transparent pointer-events-none" />

      </section>

      {/* 2. Navigasi Cepat (Bukan Card - Clean Horizontal Strip Layout di bawah Hero) */}
      <section id="navigasi-utama" className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-12 relative z-20">
        <nav
          aria-label="Akses Cepat Informasi"
          className="rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-blue-950/5 py-3 sm:py-3.5 px-4 sm:px-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className={`group py-3 sm:py-1 px-3 sm:px-4 flex items-center justify-between gap-3 hover:bg-blue-50/50 rounded-xl transition-all ${
                  idx > 0 ? "sm:pl-4" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#0B66E8] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-200">
                    <span className="group-hover:[&>svg]:text-white transition-colors">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0B1E38] group-hover:text-[#0B66E8] transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#475569] leading-tight mt-0.5 line-clamp-1">
                      {item.desc}
                    </p>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        </nav>
      </section>
    </div>
  );
}
