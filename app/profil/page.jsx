import { dataSekolah } from "../../components/school-content";

export const metadata = {
  title: "Profil Sekolah & Sejarah",
  description:
    "Profil lengkap, visi-misi, sejarah berdirinya SMA Negeri 2 Purworejo sejak 1980, silsilah kepemimpinan kepala sekolah, dan sarana prasarana kampus.",
};

export default function ProfilPage() {
  return (
    <div className="page-canvas-profil pt-24 sm:pt-28 pb-20 space-y-16 sm:space-y-20">
      {/* Header Banner Editorial */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-b border-slate-200/80 pb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
            Profil Institusi
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1E38] tracking-tight mt-2">
            Mengenal SMA Negeri 2 Purworejo
          </h1>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl mt-3">
            Dedikasi pendidikan, integritas luhur, dan kelestarian lingkungan hidup sejak berdirinya sekolah pada 1 Juli 1980 di Kutoarjo.
          </p>

          {/* Metric Strip Bergaris Tipis */}
          <div className="mt-8 pt-6 border-t border-slate-200/70 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200/70">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">NPSN Resmi</span>
              <div className="text-xl sm:text-2xl font-black text-[#0B1E38] tabular-nums mt-0.5">{dataSekolah.npsn}</div>
              <span className="text-[11px] text-emerald-600 font-semibold">Kemendikbudristek</span>
            </div>
            <div className="md:pl-6">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Akreditasi</span>
              <div className="text-xl sm:text-2xl font-black text-[#0B66E8] mt-0.5">{dataSekolah.akreditasi}</div>
              <span className="text-[11px] text-[#475569]">BAN-S/M Nasional</span>
            </div>
            <div className="md:pl-6">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Tahun Berdiri</span>
              <div className="text-xl sm:text-2xl font-black text-[#0B1E38] tabular-nums mt-0.5">{dataSekolah.tahunBerdiri}</div>
              <span className="text-[11px] text-[#475569]">SK Mendikbud 1980</span>
            </div>
            <div className="md:pl-6">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Luas Kampus</span>
              <div className="text-xl sm:text-2xl font-black text-amber-600 mt-0.5">{dataSekolah.luasLahan}</div>
              <span className="text-[11px] text-[#475569]">Kampus Hijau Kutoarjo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visi dan Misi (Editorial Two-Column Flow) */}
      <section id="visi-misi" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Kolom Visi */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
              Visi Sekolah
            </span>
            <blockquote className="text-xl sm:text-2xl font-black text-[#0F274A] leading-snug tracking-tight">
              &ldquo;{dataSekolah.visi}&rdquo;
            </blockquote>
            <p className="text-xs text-[#5D7392] leading-relaxed pt-2">
              Visi ini menjadi kompas filosofis dalam mengimplementasikan Kurikulum Merdeka, membina karakter berke-Tuhanan, serta memelihara ekosistem Sekolah Berbudaya Lingkungan (Adiwiyata) di Kutoarjo.
            </p>
          </div>

          {/* Kolom Misi (Line-separated Numbered Rows) */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
              Delapan Misi Strategis
            </span>
            <ul className="mt-4 divide-y divide-slate-200/70 border-t border-b border-slate-200/70">
              {dataSekolah.misi.map((m, idx) => (
                <li key={idx} className="py-3.5 flex items-start gap-4">
                  <span className="text-xs font-bold text-[#0B66E8] tabular-nums pt-0.5">
                    0{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-[#0F274A] leading-relaxed">
                    {m}
                  </p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Sejarah Pendirian & Linimasa Transformasi */}
      <section id="sejarah" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-t border-slate-200/80 pt-12 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
              Arsip & Sejarah
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F274A] tracking-tight mt-1">
              Perjalanan Pendirian & Nomenklatur Sekolah
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 prose prose-slate text-xs sm:text-sm text-[#5D7392] leading-relaxed space-y-4 whitespace-pre-line">
              {dataSekolah.sejarah}
            </div>

            {/* Linimasa Nomenklatur Bergaris */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F274A] mb-3">
                Tahapan Perubahan Nama
              </h3>
              <div className="divide-y divide-slate-200/60 border-t border-b border-slate-200/60">
                <div className="py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0F274A]">SMA Negeri Kutoarjo</span>
                    <span className="text-[11px] text-[#0B66E8] font-bold">1980 – 1997</span>
                  </div>
                  <p className="text-[11px] text-[#5D7392]">SK Mendikbud RI No. 0206/0/1980 (1 Juli 1980)</p>
                </div>
                <div className="py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0F274A]">SMU Negeri 1 Kutoarjo</span>
                    <span className="text-[11px] text-[#0B66E8] font-bold">1997 – 2001</span>
                  </div>
                  <p className="text-[11px] text-[#5D7392]">SK Mendikbud RI No. 035/0/1997 (7 Maret 1997)</p>
                </div>
                <div className="py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0F274A]">SMU Negeri 2 Purworejo</span>
                    <span className="text-[11px] text-[#0B66E8] font-bold">2001 – 2004</span>
                  </div>
                  <p className="text-[11px] text-[#5D7392]">SK Bupati Purworejo No. 188.4/104/2001 (26 Sept 2001)</p>
                </div>
                <div className="py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0F274A]">SMA Negeri 2 Purworejo</span>
                    <span className="text-[11px] text-emerald-600 font-bold">2004 – Sekarang</span>
                  </div>
                  <p className="text-[11px] text-[#5D7392]">SK Ka. Dinas PdK Jateng No. 425.3/00153 (8 Jan 2004)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
