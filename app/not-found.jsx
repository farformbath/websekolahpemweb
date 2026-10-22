import GlassPanel from "../components/glass-panel";
import Button from "../components/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24 sm:py-32">
      <GlassPanel elevated className="max-w-md w-full text-center space-y-5 p-8 sm:p-10">
        <div className="w-16 h-16 rounded-3xl bg-[#0B66E8]/10 text-[#0B66E8] flex items-center justify-center mx-auto text-2xl font-black">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-[#0F274A] tracking-tight">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-xs sm:text-sm text-[#5D7392] leading-relaxed">
            Halaman atau tautan yang Anda tuju tidak tersedia atau telah dipindahkan ke alamat baru.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md" className="w-full sm:w-auto">
            Kembali ke Beranda
          </Button>
          <Button href="/informasi/berita" variant="secondary" size="md" className="w-full sm:w-auto">
            Daftar Berita
          </Button>
        </div>
      </GlassPanel>
    </div>
  );
}
