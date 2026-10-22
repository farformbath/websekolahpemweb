import { dataSekolah } from "../../components/school-content";

export const metadata = {
  title: "Kesiswaan, Ekskul & Prestasi",
  description:
    "Organisasi OSIS/MPK, 20+ ekstrakurikuler unggulan (Pramuka, OSN, Winda Jurnalistik, Basket), dan torehan prestasi siswa SMA Negeri 2 Purworejo.",
};

const ekskulDirectory = [
  { nama: "Pramuka Ambalan Gudep", kategori: "Kepanduan", foto: "/assets/activities/kegiatan-pramuka.jpg", desc: "Gugus depan berprestasi Kwarda Jawa Tengah yang menempa kepemimpinan, kedisiplinan, dan kemandirian penegak." },
  { nama: "Winda Jurnalistik", kategori: "Literasi & Media", foto: "/assets/news/buletin-winda.jpg", desc: "Penerbitan buletin berkala, majalah dinding digital, dan peliputan karya sastra serta esai kritis siswa." },
  { nama: "Klub Sains & Duta OSN", kategori: "Akademik", foto: "/assets/achievements/osn-provinsi.png", desc: "Pembinaan olimpiade sains intensif cabang Matematika, Fisika, Biologi, Kimia, Astronomi, dan Kebumian." },
  { nama: "Owl Basketball Putri & Putra", kategori: "Olahraga", foto: "/assets/achievements/basket-putri-pbl.jpg", desc: "Tim bola basket berprestasi peraih Juara 3 Purworejo Basketball League dengan latihan intensif terprogram." },
  { nama: "Saka Wira Kartika & Bela Negara", kategori: "Kepemimpinan", foto: "/assets/activities/saka-wira-kartika.jpg", desc: "Pembinaan kedisiplinan militer dasar dan wawasan kebangsaan bekerja sama dengan Kodim Purworejo." },
  { nama: "Projek P5 & Daur Ulang", kategori: "Lingkungan Hidup", foto: "/assets/activities/p5-aksi-nyata.jpg", desc: "Aksi nyata kreasi daur ulang sampah dan kewirausahaan ramah lingkungan khas Sekolah Adiwiyata." },
  { nama: "Palang Merah Remaja (PMR)", kategori: "Kemanusiaan", foto: "/assets/activities/activity-2.jpg", desc: "Pelatihan medis pertolongan pertama, donor darah sukarela, dan bakti sosial kepedulian masyarakat." },
  { nama: "Rohani Islam (Rohis)", kategori: "Keagamaan", foto: "/assets/activities/activity-3.jpg", desc: "Kajian keislaman rutin, kepanitiaan peringatan hari besar Islam, dan pembinaan akhlak mulia siswa." },
  { nama: "Seni Tari & Teater", kategori: "Seni Budaya", foto: "/assets/activities/activity-4.jpg", desc: "Eksplorasi tari tradisional Bagelen Jawa Tengah, seni kontemporer, dan seni pertunjukan drama." }
];

export default function KesiswaanPage() {
  const { prestasi } = dataSekolah;

  return (
    <div className="page-canvas-kesiswaan pt-24 sm:pt-28 pb-20 space-y-16 sm:space-y-20">
      {/* Header Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-b border-slate-200/80 pb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
            Dinamika Siswa
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1E38] tracking-tight mt-2">
            Kesiswaan, Ekskul & Prestasi
          </h1>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl mt-3">
            Ruang kreasi, kepemimpinan demokratis OSIS/MPK, wadah talenta 20+ ekstrakurikuler, dan apresiasi torehan prestasi siswa SMANDA.
          </p>
        </div>
      </section>

      {/* Organisasi OSIS & MPK (Editorial Split) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
              Organisasi Siswa
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F274A] tracking-tight">
              OSIS & MPK SMANDA
            </h2>
            <p className="text-xs sm:text-sm text-[#5D7392] leading-relaxed">
              Organisasi Siswa Intra Sekolah (OSIS) dan Majelis Perwakilan Kelas (MPK) menjadi wadah aktualisasi kepemimpinan, musyawarah mufakat, serta penggerak berbagai kegiatan bakti sosial dan perlombaan antarsiswa.
            </p>
          </div>

          <div className="lg:col-span-7 divide-y divide-slate-200/70 border-t border-b border-slate-200/70">
            <div className="py-4">
              <h3 className="text-sm font-bold text-[#0F274A]">Integritas & Karakter Luhur</h3>
              <p className="text-xs text-[#5D7392] mt-1">Pembiasaan nilai kejujuran, budaya 7S (Senyum, Salam, Sapa, Sopan, Santun, Sehat, Semangat), dan kedisiplinan harian.</p>
            </div>
            <div className="py-4">
              <h3 className="text-sm font-bold text-[#0F274A]">Aksi Nyata Adiwiyata & Lingkungan</h3>
              <p className="text-xs text-[#5D7392] mt-1">Pengelolaan bank sampah sekolah, gerakan penghijauan taman kampus, dan sosialisasi gaya hidup hemat energi.</p>
            </div>
            <div className="py-4">
              <h3 className="text-sm font-bold text-[#0F274A]">Pekan Seni & Kompetisi Olahraga</h3>
              <p className="text-xs text-[#5D7392] mt-1">Penyelenggaraan Classmeeting, peringatan Bulan Bahasa, dan turnamen olahraga tahunan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 20+ Ekstrakurikuler (Clean Directory List - No 9 Identical Cards) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-t border-slate-200/80 pt-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
                Direktori Minat Bakat
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F274A] tracking-tight mt-1">
                Daftar Ekstrakurikuler Pilihan
              </h2>
            </div>
            <span className="text-xs text-slate-500">20+ Cabang Terbina</span>
          </div>

          <div className="divide-y divide-slate-200/70 border-t border-b border-slate-200/70">
            {ekskulDirectory.map((ekskul, idx) => (
              <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img
                      src={ekskul.foto}
                      alt={ekskul.nama}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#0F274A] group-hover:text-[#0B66E8] transition-colors">
                        {ekskul.nama}
                      </h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {ekskul.kategori}
                      </span>
                    </div>
                    <p className="text-xs text-[#5D7392] leading-relaxed mt-1 max-w-2xl">
                      {ekskul.desc}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-[#0B66E8] shrink-0 self-start sm:self-auto">
                  Terbina Aktif
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prestasi & Kejuaraan (Honor Roll List) */}
      <section id="prestasi" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-t border-slate-200/80 pt-12 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B66E8]">
              Arsip Kejuaraan
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F274A] tracking-tight mt-1">
              Catatan Prestasi Siswa & Pembina
            </h2>
          </div>

          <div className="divide-y divide-slate-200/60 border-t border-b border-slate-200/60">
            {prestasi.map((item, idx) => (
              <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shrink-0">
                    ★
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0F274A]">
                      {item.judul}
                    </h3>
                    <p className="text-xs text-[#5D7392] mt-0.5">
                      {item.keterangan}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto text-xs">
                  <span className="text-slate-500 font-medium">{item.bidang}</span>
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
    </div>
  );
}
