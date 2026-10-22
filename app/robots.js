export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://sman2purworejo.sch.id/sitemap.xml",
  };
}
