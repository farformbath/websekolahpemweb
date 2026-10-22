"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Kesiswaan", href: "/kesiswaan" },
  { label: "Berita", href: "/informasi/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll effect for navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  // Hide header in admin dashboard
  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      <div
        className={`max-w-6xl mx-auto rounded-full transition-all duration-200 pointer-events-auto ${
          scrolled ? "glass-nav-scrolled py-2 px-4 sm:px-6" : "glass-nav py-2.5 px-4 sm:px-6"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0 drop-shadow-sm">
              <img
                src="/assets/logo-sekolah.png"
                alt="Logo SMA Negeri 2 Purworejo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-[13px] font-black tracking-tight text-[#0B1E38] group-hover:text-[#0B66E8] transition-colors leading-none">
                SMA NEGERI 2
              </span>
              <span className="text-[10px] sm:text-[11px] font-black tracking-tight text-[#0B1E38] group-hover:text-[#0B66E8] transition-colors leading-none mt-0.5">
                PURWOREJO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Direct Flat Links - No Dropdowns) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Menu Utama">
            {navItems.map((item, idx) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? "bg-blue-50 text-[#0B66E8] border border-blue-200 shadow-xs"
                      : "text-[#0B1E38] hover:text-[#0B66E8] hover:bg-slate-100/80"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: PPDB Button & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            
            {/* PPDB Button */}
            <Link
              href="/ppdb"
              className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs font-extrabold text-white bg-[#0B66E8] hover:bg-[#0757C9] shadow-sm shadow-[#0B66E8]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              PPDB 2026
            </Link>

            {/* Mobile Hamburger Button */}
            {/* Portal Admin Link */}
            <Link
              href="/admin"
              title="Portal Admin Sekolah"
              className="p-1.5 sm:px-3 sm:py-2 rounded-full text-xs font-bold text-slate-700 hover:text-[#0B66E8] hover:bg-slate-100/80 transition-all flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="hidden sm:inline text-[11px]">Admin</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-full text-[#0B1E38] hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Buka Menu Navigasi"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 pb-2 space-y-1 animate-in fade-in duration-150">
            {navItems.map((item, idx) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-blue-50 text-[#0B66E8]"
                      : "text-[#0B1E38] hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2 rounded-xl text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors"
            >
              🔒 Portal Admin SMANDA
            </Link>
          </div>
        )}

      </div>
    </header>
  );
}
