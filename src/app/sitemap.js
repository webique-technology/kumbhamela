import { getBlogs } from "./[locale]/blog/blogApi";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mahakumbhtourstravelsnashik.com";

const locales = ["en", "hi", "mr"];

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
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    });
  });

  // 2. Dynamic Blog Routes (fetched concurrently)
  try {
    const blogPromises = locales.map(async (locale) => {
      const response = await getBlogs(1, "", "", locale);
      const blogs = response?.data || [];

      return blogs
        .filter((blog) => Boolean(blog?.slug))
        .map((blog) => ({
          url: `${BASE_URL}/${locale}/blog/${blog.slug}`,
          lastModified: blog.updated_at
            ? new Date(blog.updated_at)
            : new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        }));
    });

    const blogResults = await Promise.all(blogPromises);
    sitemapEntries.push(...blogResults.flat());
  } catch (error) {
    console.error("Error generating dynamic blog sitemap entries:", error);
  }

  return sitemapEntries;
}
