import { getAllBerita } from "../components/school-content";

export default function sitemap() {
  const baseUrl = "https://sman2purworejo.sch.id";
  const allBerita = getAllBerita();

  const staticRoutes = [
    "",
    "/profil",
    "/kesiswaan",
    "/informasi/berita",
    "/informasi/pengumuman",
    "/galeri",
    "/ppdb",
    "/kontak",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const newsRoutes = allBerita.map((item) => ({
    url: `${baseUrl}/informasi/berita/${item.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes];
}
