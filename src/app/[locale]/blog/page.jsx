import { getTranslations } from "next-intl/server";
import BlogPageList from "./BlogListPage";

// 1. Generate Dynamic Metadata based on the current language
export async function generateMetadata({ params, searchParams }) {
  // 1. Resolve localized layout routing parameters
  const { locale } = await params;

  // 2. Resolve query parameters to accurately index pagination paths (e.g., page=2)
  const resolvedSearchParams = await searchParams;
  const pageNum = Number(resolvedSearchParams.page) || 1;

  // 3. Load localization files matching your namespace configuration
  const t = await getTranslations({ locale, namespace: "Blog" });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mahakumbhtours.com";

  // 4. Construct a dynamic page title append token to avoid duplicate title warnings in Search Console
  const pageString = pageNum > 1 ? ` | Page ${pageNum}` : "";
  const pageTitle = `${t("heroTitle") || "Kumbh Mela Blogs & Articles"}${pageString}`;
  const pageDescription = t("heroDescription") || "Explore the rich history, sacred rituals, absolute Dos and Don'ts, and practical travel tips for Nashik Simhastha Kumbh Mela 2027.";

  // 5. Core context-optimized searchable keywords based on your active post grid titles
  const blogKeywords = [
    "Kumbh Mela blogs",
    "Nashik Kumbh Mela articles",
    "What are Akharas",
    "Right time to visit Nashik Kumbh Mela 2027",
    "Shahi Snan dos and don'ts",
    "Amrit Snan rules Nashik",
    "Ram Kund Nashik blog",
    "Kumbh Mela tourist guides",
    "Nashik travel insights 2027",
    "Simhastha updates and news"
  ];

  // Build automated regional language routes safely
  const supportLocales = ["en", "hi", "mr", "gu", "ta", "te", "ml"];
  const languageAlternates = {};
  supportLocales.forEach((loc) => {
    const regionKey = loc === "en" ? "en-IN" : `${loc}-IN`;
    // Include the page tracking argument to map the language options precisely
    const paginationSuffix = pageNum > 1 ? `?page=${pageNum}` : "";
    languageAlternates[regionKey] = `${baseUrl}/${loc}/blog${paginationSuffix}`;
  });

  return {
    title: `${pageTitle} | Mahakumbh Tours & Travels`,
    description: pageDescription,
    keywords: blogKeywords,

    // Pagination and dynamic tracking canonical setups
    alternates: {
      canonical: pageNum > 1 ? `${baseUrl}/${locale}/blog?page=${pageNum}` : `${baseUrl}/${locale}/blog`,
      languages: languageAlternates,
    },

    // Social Media Link Previews (OpenGraph Platform Targeting)
    openGraph: {
      title: `${pageTitle} - Insights & Information | Mahakumbh Tours`,
      description: pageDescription,
      type: "website",
      locale: locale === 'en' ? 'en_IN' : `${locale}_IN`,
      url: pageNum > 1 ? `${baseUrl}/${locale}/blog?page=${pageNum}` : `${baseUrl}/${locale}/blog`,
      siteName: "Mahakumbh Tours & Travels",
      images: [
        {
          url: `${baseUrl}/images/blog-listing-banner.jpg`, // Add a fallback blog listing graphic or reuse a hero background image
          width: 1200,
          height: 630,
          alt: "Kumbh Mela Blogs & Articles",
        }
      ]
    },

    // Twitter Card Mapping Fields
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | Nashik Kumbh Mela 2027`,
      description: pageDescription,
      images: [`${baseUrl}/images/blog-listing-banner.jpg`],
    },

    // Advanced adjustments preventing the indexing of highly nested, broken empty pagination paths
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

const BlogPage = () => {
  return <BlogPageList />;
};

export default BlogPage;