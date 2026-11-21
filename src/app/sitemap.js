import { getBlogs } from "./[locale]/blog/blogApi";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://mahakumbhtourstravelsnashik.com"
).replace(/\/+$/, "");

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://laravel.mahakumbhtourstravelsnashik.com/api"
).replace(/\/+$/, "");

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
  "/services/car-rental-pan-india",
  "/services/luxury-car-marriage-corporate",
  "/services/traveller-&amp;-bus",
  "/services/flight-ticketing",
  "/services/holidays-packages",
  "/services/hotel-reservations",
  "/services/visa-services",
  "/services/passport-assistance",
];

export const revalidate = 3600;

function normalizeSlug(rawSlug, title = "") {
  if (rawSlug) {
    return String(rawSlug)
      .replace(/^https?:\/\/[^/]+/i, "")
      .replace(/^\/+|\/+$/g, "")
      .split("/")
      .pop();
  }
  return String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Extracts an array of items from standard Laravel JSON response wrappers
function extractItems(json) {
  if (!json) return [];
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.data?.data)) return json.data.data;
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json?.packages)) return json.packages;
  if (Array.isArray(json?.tours)) return json.tours;
  if (Array.isArray(json?.result)) return json.result;
  return [];
}

// Fetches all tour packages from your Laravel API (supports pagination & common route names)
async function fetchAllTourPackages(locale) {
  const candidateEndpoints = [
    `${API_BASE}/packages?locale=${locale}&per_page=100`,
    `${API_BASE}/tour-packages?locale=${locale}&per_page=100`,
    `${API_BASE}/tours?locale=${locale}&per_page=100`,
    `${API_BASE}/packages?lang=${locale}&per_page=100`,
  ];

  for (const endpoint of candidateEndpoints) {
    try {
      const res = await fetch(endpoint, {
        headers: {
          Accept: "application/json",
          "Accept-Language": locale,
        },
        next: { revalidate: 3600 },
      });

      if (!res.ok) continue;

      const json = await res.json();
      let items = extractItems(json);

      // If Laravel paginated the response (e.g., 6 or 10 per page), fetch remaining pages
      const lastPage = json?.last_page || json?.data?.last_page || 1;
      if (lastPage > 1) {
        const pagePromises = [];
        for (let page = 2; page <= lastPage; page++) {
          const separator = endpoint.includes("?") ? "&" : "?";
          pagePromises.push(
            fetch(`${endpoint}${separator}page=${page}`, {
              headers: {
                Accept: "application/json",
                "Accept-Language": locale,
              },
              next: { revalidate: 3600 },
            })
              .then((r) => (r.ok ? r.json() : null))
              .then((pageJson) => extractItems(pageJson)),
          );
        }
        const extraPages = await Promise.all(pagePromises);
        items = [...items, ...extraPages.flat()];
      }

      if (items.length > 0) {
        return items;
      }
    } catch {
      // Try next candidate endpoint
    }
  }

  console.warn(
    `[Sitemap] Could not auto-detect tour package endpoint for locale "${locale}". Check the API URL inside TourPackageList.jsx.`,
  );
  return [];
}

export default async function sitemap() {
  const sitemapEntries = [];
  const seenUrls = new Set();

  const addEntry = (entry) => {
    if (!seenUrls.has(entry.url)) {
      seenUrls.add(entry.url);
      sitemapEntries.push(entry);
    }
  };

  // 1. Static Routes across all locales
  staticRoutes.forEach((route) => {
    locales.forEach((locale) => {
      addEntry({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    });
  });

  // 2. Dynamic Blog & Tour Package Routes
  try {
    const dynamicPromises = locales.map(async (locale) => {
      const [blogRes, packages] = await Promise.allSettled([
        getBlogs(1, "", "", locale),
        fetchAllTourPackages(locale),
      ]);

      const blogs =
        blogRes.status === "fulfilled"
          ? blogRes.value?.data || blogRes.value || []
          : [];

      const pkgList =
        packages.status === "fulfilled" && Array.isArray(packages.value)
          ? packages.value
          : [];

      const blogEntries = Array.isArray(blogs)
        ? blogs
            .filter((blog) => Boolean(blog?.slug))
            .map((blog) => ({
              url: `${BASE_URL}/${locale}/blog/${normalizeSlug(blog.slug)}`,
              lastModified: blog.updated_at
                ? new Date(blog.updated_at)
                : new Date(),
              changeFrequency: "weekly",
              priority: 0.7,
            }))
        : [];

      const packageEntries = pkgList
        .filter((pkg) => Boolean(pkg?.slug || pkg?.title || pkg?.name))
        .map((pkg) => ({
          url: `${BASE_URL}/${locale}/tour-package/${normalizeSlug(
            pkg.slug,
            pkg.title || pkg.name,
          )}`,
          lastModified: pkg.updated_at ? new Date(pkg.updated_at) : new Date(),
          changeFrequency: "weekly",
          priority: 0.9,
        }));

      return [...blogEntries, ...packageEntries];
    });

    const dynamicResults = await Promise.all(dynamicPromises);
    dynamicResults.flat().forEach(addEntry);
  } catch (error) {
    console.error("Error generating dynamic sitemap entries:", error);
  }

  return sitemapEntries;
}
