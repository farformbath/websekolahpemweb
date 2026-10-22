import Link from "next/link";
import Button from "../../components/button";
import { dataSekolah } from "../../components/school-content";

export const metadata = {
  title: "Informasi PPDB 2026/2027",
  description:
    "Panduan resmi Penerimaan Peserta Didik Baru (PPDB) SMA Negeri 2 Purworejo: jalur zonasi, afirmasi, prestasi, mutasi, jadwal alur, dan tautan portal resmi Jawa Tengah.",
};

export default function PpdbPage() {
  const { ppdbInfo } = dataSekolah;

  return (
    <div className="page-canvas-ppdb pt-24 sm:pt-28 pb-20 space-y-16 sm:space-y-20">
      {/* Header Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-astra-banner-ppdb text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-amber-400 text-[#0B1E38] shadow-sm">
              {ppdbInfo.status}
            </span>
            <span className="text-xs font-bold text-sky-100 tracking-wide">
              {ppdbInfo.periode} • Seleksi Resmi Daring Pemprov Jateng
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Penerimaan Peserta Didik Baru (PPDB)
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mt-3">
            Sistem penerimaan peserta didik baru terintegrasi secara daring melalui portal resmi PPDB Pemerintah Provinsi Jawa Tengah.
          </p>
          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-4">
            <Button
              href={ppdbInfo.linkResmi}
              variant="gold"
              size="md"
            >
              <span>Kunjungi Portal Resmi PPDB Jateng</span>
            </Button>
            <a
              href="#jalur"
              className="text-xs sm:text-sm font-bold text-amber-300 hover:text-white hover:underline"
            >
              Pelajari 4 Jalur Masuk
            </a>
          </div>
        </div>
      </section>

      {/* 4 Jalur Masuk Resmi (Clean Structured Breakdown - No Cards) */}
      <section id="jalur" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
              Jalur Pendaftaran
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F274A] tracking-tight mt-1">
              Empat Jalur Masuk Seleksi Resmi
            </h2>
          </div>

          <div className="divide-y divide-slate-200/70 border-t border-b border-slate-200/70">
            {ppdbInfo.jalur.map((j, idx) => (
              <div key={idx} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                <div className="md:col-span-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0B66E8] tabular-nums">
                      0{idx + 1}
                    </span>
                    <h3 className="text-base font-extrabold text-[#0F274A]">
                      {j.nama}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5D7392] leading-relaxed mt-2">
                    {j.deskripsi}
                  </p>
                </div>

                <div className="md:col-span-7">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-2">
                    Dokumen & Persyaratan Khusus:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#0F274A]">
                    {j.syarat.map((s, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0B66E8]" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tahapan Alur Pendaftaran (Clean Horizontal Steps Flow) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-t border-slate-200/80 pt-12 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
              Jadwal & Prosedur
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F274A] tracking-tight mt-1">
              Alur Pelaksanaan Seleksi PPDB
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
            {ppdbInfo.tahapan.map((t, idx) => (
              <div key={idx} className={`pt-4 sm:pt-0 ${idx > 0 ? "sm:pl-4" : ""}`}>
                <span className="text-xs font-black text-[#0B66E8] tabular-nums">
                  Langkah {t.langkah}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-[#0F274A] mt-1">{t.judul}</h4>
                <p className="text-[11px] font-semibold text-[#0B66E8] mt-1">{t.tanggal}</p>
                <p className="text-[11px] text-[#5D7392] leading-relaxed mt-1">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tanya Jawab & Layanan Posko Offline */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-t border-slate-200/80 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* FAQ List */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
              Bantuan
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F274A] tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>

            <div className="divide-y divide-slate-200/70 border-t border-b border-slate-200/70 pt-2">
              {ppdbInfo.faq.map((item, idx) => (
                <div key={idx} className="py-4 space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F274A]">
                    {item.q}
                  </h4>
                  <p className="text-xs text-[#5D7392] leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Posko Kampus SMANDA */}
          <div className="lg:col-span-5 space-y-4 border-l border-slate-200/70 lg:pl-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
              Layanan Fisik
            </span>
            <h3 className="text-xl font-bold text-[#0F274A]">
              Posko Helpdesk Kampus
            </h3>
            <p className="text-xs text-[#5D7392] leading-relaxed">
              Bagi calon peserta didik atau orang tua/wali yang memerlukan pendampingan teknis pendaftaran atau verifikasi berkas:
            </p>

            <div className="space-y-2 text-xs text-[#0F274A] pt-2">
              <div>
                <span className="font-bold text-slate-400 block text-[10px] uppercase">Lokasi Layanan:</span>
                <span>Hall Pelayanan Terpadu SMAN 2 Purworejo, Kutoarjo</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 block text-[10px] uppercase">Waktu Operasional:</span>
                <span>Senin – Jumat: 08.00 – 15.00 WIB</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 block text-[10px] uppercase">Hotline PPDB:</span>
                <span>(0275) 641065</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/kontak" className="text-xs font-bold text-[#0B66E8] hover:underline">
                Buka Peta Lokasi & Kontak Lengkap
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
