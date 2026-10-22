import { dataSekolah } from "../../../components/school-content";

export const metadata = {
  title: "Pengumuman Resmi & BOSP",
  description:
    "Pengumuman resmi kedinasan, laporan realisasi penggunaan dana BOSP, dan informasi akademik SMA Negeri 2 Purworejo.",
};

export default function PengumumanPage() {
  const { pengumuman } = dataSekolah;

  return (
    <div className="page-canvas-pengumuman pt-24 sm:pt-28 pb-20 space-y-12 sm:space-y-16">
      {/* Header Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-b border-slate-200/80 pb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
            Keterbukaan Informasi
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E38] tracking-tight mt-2">
            Pengumuman & Laporan BOSP
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-xl mt-2">
            Pertanggungjawaban penggunaan dana Bantuan Operasional Satuan Pendidikan (BOSP) dan surat edaran resmi kedinasan.
          </p>
        </div>
      </section>

      {/* Daftar Pengumuman Line-Separated (No Cards) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="divide-y divide-slate-200/70 border-t border-b border-slate-200/70">
          {pengumuman.map((item) => (
            <article key={item.id} className="py-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      item.status === "Aktif"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-xs font-bold text-[#0B66E8]">
                    {item.kategori}
                  </span>
                </div>
                <time className="text-xs text-[#5D7392]">{item.tanggal}</time>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-[#0F274A] leading-snug">
                {item.judul}
              </h2>

              <p className="text-xs sm:text-sm text-[#5D7392] leading-relaxed">
                {item.ringkasan}
              </p>

              {item.lampiran && (
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Lampiran: <strong className="text-slate-600">{item.lampiran}</strong>
                  </span>
                  <a
                    href="#unduh-lampiran"
                    title={`Unduh ${item.lampiran}`}
                    className="text-[#0B66E8] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Unduh Berkas</span>
                    <span>↓</span>
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
