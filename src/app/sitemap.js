import { getBlogs } from "./[locale]/blog/blogApi"; // Update this path to match your blogApi location

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mahakumbhtourstravelsnashik.com";

const locales = ["en", "hi", "mr"];

// Exact static routes from your project directory
const staticRoutes = [
  "",
  "/about-us",
  "/blog",
  "/contact-us",
  "/hotel",
  "/rental-car",
  "/services",
  "/tour-package",
];

export default async function sitemap() {
  const sitemapEntries = [];

  // 1. Static Routes across all locales
  staticRoutes.forEach((route) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    });
  });

  // 2. Dynamic Blog Routes
  try {
    for (const locale of locales) {
      const response = await getBlogs(1, "", "", locale);
      const blogs = response?.data || [];

      blogs.forEach((blog) => {
        if (blog.slug) {
          sitemapEntries.push({
            url: `${BASE_URL}/${locale}/blog/${blog.slug}`,
            lastModified: blog.updated_at
              ? new Date(blog.updated_at).toISOString()
              : new Date().toISOString(),
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      });
    }
  } catch (error) {
    console.error("Error generating dynamic blog sitemap entries:", error);
  }

  return sitemapEntries;
}
