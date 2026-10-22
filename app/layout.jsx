import "./globals.css";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";

export const metadata = {
  metadataBase: new URL("https://sman2purworejo.sch.id"),
  title: {
    default: "SMA Negeri 2 Purworejo – Bertaqwa, Berkarakter Unggul, Berprestasi, dan Berbudaya Lingkungan",
    template: "%s | SMA Negeri 2 Purworejo",
  },
  description:
    "Portal resmi SMA Negeri 2 Purworejo (SMANDA Kutoarjo). Sekolah unggulan berwawasan Adiwiyata dan menerapkan Kurikulum Merdeka di Kabupaten Purworejo, Jawa Tengah.",
  keywords: [
    "SMA Negeri 2 Purworejo",
    "SMANDA Purworejo",
    "SMAN 2 Purworejo",
    "PPDB SMA Negeri 2 Purworejo",
    "Sekolah Unggulan Purworejo",
    "Kutoarjo",
    "Sekolah Adiwiyata Purworejo",
    "Kurikulum Merdeka",
  ],
  authors: [{ name: "SMA Negeri 2 Purworejo" }],
  creator: "SMA Negeri 2 Purworejo",
  publisher: "SMA Negeri 2 Purworejo",
  icons: {
    icon: "/assets/logo-sekolah.png",
    shortcut: "/assets/logo-sekolah.png",
    apple: "/assets/logo-sekolah.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://sman2purworejo.sch.id",
    title: "SMA Negeri 2 Purworejo – Profil Resmi Sekolah",
    description:
      "Website resmi SMA Negeri 2 Purworejo: profil sekolah, warta berita, akademik kurikulum merdeka, kesiswaan, fasilitas, dan PPDB.",
    siteName: "SMA Negeri 2 Purworejo",
    images: [
      {
        url: "/assets/campus-hero.png",
        width: 1200,
        height: 630,
        alt: "Kampus SMA Negeri 2 Purworejo",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
