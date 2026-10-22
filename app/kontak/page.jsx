import { dataSekolah } from "../../components/school-content";

export const metadata = {
  title: "Kontak & Lokasi Sekolah",
  description:
    "Alamat lengkap, peta lokasi, nomor telepon, email resmi, dan jam layanan administrasi SMA Negeri 2 Purworejo.",
};

export default function KontakPage() {
  return (
    <div className="page-canvas-kontak pt-24 sm:pt-28 pb-20 space-y-16 sm:space-y-20">
      {/* Header Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-b border-slate-200/80 pb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
            Komunikasi & Layanan
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E38] tracking-tight mt-2">
            Hubungi SMA Negeri 2 Purworejo
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-xl mt-2">
            Pos pelayanan terpadu dan informasi resmi bagi orang tua, peserta didik, alumni, dan masyarakat.
          </p>
        </div>
      </section>

      {/* Split Kontak & Google Maps (No Heavy Card Boxes) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Kolom Kiri: Rincian Kontak Bergaris */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-lg font-bold text-[#0F274A]">
              Informasi Pelayanan Terpadu
            </h2>

            <div className="divide-y divide-slate-200/70 border-t border-b border-slate-200/70 text-xs sm:text-sm">
              <div className="py-4 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Alamat Kampus
                </span>
                <p className="font-semibold text-[#0F274A] leading-relaxed">
                  {dataSekolah.alamat}
                </p>
              </div>

              <div className="py-4 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Telepon Kantor
                </span>
                <div>
                  <a
                    href={`tel:${dataSekolah.telepon.replace(/[^0-9]/g, "")}`}
                    className="font-bold text-[#0B66E8] hover:underline"
                  >
                    {dataSekolah.telepon}
                  </a>
                </div>
              </div>

              <div className="py-4 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Surat Elektronik (Email)
                </span>
                <div>
                  <a
                    href={`mailto:${dataSekolah.email}`}
                    className="font-bold text-[#0B66E8] hover:underline"
                  >
                    {dataSekolah.email}
                  </a>
                </div>
              </div>

              <div className="py-4 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Jam Layanan Tata Usaha
                </span>
                <p className="font-semibold text-[#0F274A]">
                  {dataSekolah.jamLayanan}
                </p>
                <p className="text-[11px] text-[#5D7392]">
                  Hari Kerja Operasional Dinas
                </p>
              </div>
            </div>

            <div>
              <a
                href="https://maps.google.com/?q=SMA+Negeri+2+Purworejo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B66E8] hover:underline"
              >
                <span>Buka Petunjuk Arah di Google Maps</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Google Maps Frame */}
          <div className="lg:col-span-7">
            <div className="w-full h-80 sm:h-[420px] rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.864387220023!2d109.91039827588373!3d-7.727509892290748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a95610ec1f2df%3A0xe7a505b4526d15b8!2sSMA%20Negeri%202%20Purworejo!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi SMA Negeri 2 Purworejo"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
