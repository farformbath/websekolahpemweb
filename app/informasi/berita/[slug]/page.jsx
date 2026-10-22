import Link from "next/link";
import { notFound } from "next/navigation";
import { getBeritaBySlug, getAllBerita } from "../../../../components/school-content";

export async function generateStaticParams() {
  const allBerita = getAllBerita();
  return allBerita.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const berita = getBeritaBySlug(slug);
  if (!berita) return { title: "Berita Tidak Ditemukan" };

  return {
    title: berita.judul,
    description: berita.ringkasan,
    openGraph: {
      title: berita.judul,
      description: berita.ringkasan,
      images: [{ url: berita.gambar }],
    },
  };
}

export default async function DetailBeritaPage({ params }) {
  const { slug } = await params;
  const berita = getBeritaBySlug(slug);

  if (!berita) {
    notFound();
  }

  const allBerita = getAllBerita();
  const relatedBerita = allBerita
    .filter((b) => b.slug !== berita.slug)
    .slice(0, 3);

  return (
    <div className="pt-24 sm:pt-28 pb-20 space-y-12 sm:space-y-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#5D7392] mb-6">
          <Link href="/" className="hover:text-[#0B66E8]">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/informasi/berita" className="hover:text-[#0B66E8]">
            Berita
          </Link>
          <span>/</span>
          <span className="text-[#0F274A] truncate max-w-[200px] sm:max-w-xs">
            {berita.judul}
          </span>
        </nav>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#0B66E8]/10 text-[#0B66E8] border border-[#0B66E8]/20">
              {berita.kategori}
            </span>
            <span className="text-xs text-[#5D7392] flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {berita.tanggal}
            </span>
            <span className="text-xs text-[#5D7392]">
              • Oleh {berita.penulis || "Humas SMANDA"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1E38] tracking-tight leading-tight">
            {berita.judul}
          </h1>
        </div>

        {/* Featured Image */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100 mb-8 border border-slate-200/80 shadow-sm">
          <img
            src={berita.gambar}
            alt={berita.judul}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="border-b border-slate-200/80 pb-10 mb-10">
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-[#0B1E38] leading-relaxed space-y-5 whitespace-pre-line">
            {berita.isi}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-4 text-xs text-[#475569]">
            <div>
              Sumber: <strong>SMA Negeri 2 Purworejo</strong> (Portal Resmi sman2purworejo.sch.id)
            </div>
            <Link
              href="/informasi/berita"
              className="inline-flex items-center gap-1.5 font-bold text-[#0B66E8] hover:underline"
            >
              <span>Kembali ke Daftar Berita</span>
            </Link>
          </div>
        </div>

      </article>

      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-4">
          <h2 className="text-base sm:text-lg font-bold text-[#0B1E38]">
            Warta Terkait Lainnya
          </h2>
        </div>

        <div className="divide-y divide-slate-200/70 border-t border-b border-slate-200/70">
          {relatedBerita.map((item) => (
            <article key={item.id} className="py-4 flex items-center justify-between gap-4 group">
              <div>
                <span className="text-[11px] font-bold text-[#0B66E8]">{item.kategori} • {item.tanggal}</span>
                <h3 className="text-xs sm:text-sm font-bold text-[#0B1E38] group-hover:text-[#0B66E8] transition-colors leading-snug mt-0.5">
                  <Link href={`/informasi/berita/${item.slug}`}>{item.judul}</Link>
                </h3>
              </div>
              <Link href={`/informasi/berita/${item.slug}`} className="text-xs font-bold text-[#0B66E8] shrink-0">
                Baca Selengkapnya
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
