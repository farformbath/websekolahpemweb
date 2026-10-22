"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dataSekolah } from "./school-content";

export default function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 sm:mt-24 bg-astra-footer text-white relative z-10 shadow-2xl border-t border-white/25 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Col 1: Identity & Motto (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center shrink-0 drop-shadow-md">
                <img
                  src="/assets/logo-sekolah.png"
                  alt="Logo SMA Negeri 2 Purworejo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight drop-shadow-sm">
                  SMA NEGERI 2 PURWOREJO
                </h3>
                <p className="text-[11px] text-sky-100 font-medium">
                  NPSN: 20306155 • Akreditasi A (Unggul)
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-sky-50 leading-relaxed max-w-md drop-shadow-xs">
              {dataSekolah.slogan}. Berdiri berdasarkan SK Mendikbud RI No. 0206/0/1980 tertanggal 1 Juli 1980 di Kutoarjo, Kabupaten Purworejo, Jawa Tengah.
            </p>

          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white drop-shadow-xs">
              Jelajahi Portal
            </h4>
            <ul className="space-y-2 text-xs text-sky-50 font-medium">
              <li>
                <Link href="/profil" className="hover:text-[#F6C744] transition-colors">
                  Profil Sekolah
                </Link>
              </li>
              <li>
                <Link href="/kesiswaan" className="hover:text-[#F6C744] transition-colors">
                  Kesiswaan & Ekskul
                </Link>
              </li>
              <li>
                <Link href="/informasi/berita" className="hover:text-[#F6C744] transition-colors">
                  Warta & Berita
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-[#F6C744] transition-colors">
                  Galeri Foto Kampus
                </Link>
              </li>
              <li>
                <Link href="/ppdb" className="text-[#F6C744] hover:text-white font-black transition-colors">
                  Informasi PPDB 2026
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-[#F6C744] transition-colors">
                  Sekretariat & Lokasi
                </Link>
              </li>
            </ul>
          </div>
          {/* Col 3: Kontak Resmi (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white drop-shadow-xs">
              Sekretariat Sekolah
            </h4>
            <div className="space-y-1.5 text-xs text-sky-50 font-medium">
              <p className="leading-relaxed">
                {dataSekolah.alamat}
              </p>
              <div className="pt-1">
                <span className="font-black text-white">Telepon:</span> {dataSekolah.telepon}
              </div>
              <div>
                <span className="font-black text-white">Email:</span>{" "}
                <a href={`mailto:${dataSekolah.email}`} className="text-[#F6C744] hover:text-white underline">
                  {dataSekolah.email}
                </a>
              </div>
              <div>
                <span className="font-black text-white">Operasional:</span> {dataSekolah.jamLayanan}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar with copyright */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sky-100 font-medium">
          <p>© {currentYear} SMA Negeri 2 Purworejo. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-3">
            <Link href="/kontak" className="hover:text-white">
              Sekretariat
            </Link>
            <span>•</span>
            <Link href="/profil" className="hover:text-white">
              Profil
            </Link>
            <span>•</span>
            <Link href="/admin" className="text-amber-300 hover:text-white font-semibold">
              Portal Admin
            </Link>
            <span>•</span>
            <a
              href="https://sman2purworejo.sch.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline"
            >
              Portal Asli (sman2purworejo.sch.id)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
