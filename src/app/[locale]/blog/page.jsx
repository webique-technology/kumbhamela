import { getTranslations } from "next-intl/server";
import BlogPageList from "./BlogListPage";

import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params, searchParams }) {
  // 1. Resolve parameters
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const pageNum = Number(resolvedSearchParams.page) || 1;

  // 2. Load translations
  const t = await getTranslations({ locale, namespace: "Blog" });

  // 3. Resolve localized texts safely using t.has()
  const rawTitle = t.has("heroTitle") ? t("heroTitle") : "Kumbh Mela Blogs";
  const rawDesc = t.has("heroDescription")
    ? t("heroDescription")
    : "Explore history, sacred rituals, travel tips, and updates for Nashik Simhastha Kumbh Mela 2027 - 28 - 28.";

  // 4. Page suffix for pagination tracking
  const pageSuffix = pageNum > 1 ? ` (Pg ${pageNum})` : "";
  const pageSlug = pageNum > 1 ? `blog?page=${pageNum}` : "blog";

  return buildPageMetadata({
    locale,
    pageSlug,
    title: `${rawTitle}${pageSuffix}`,
    description: rawDesc,
    keywords: [
      "Kumbh Mela blogs",
      "Nashik Kumbh Mela articles",
      "What are Akharas",
      "Right time to visit Nashik Kumbh Mela 2027 - 28 - 28",
      "Shahi Snan dos and don'ts",
      "Amrit Snan rules Nashik",
      "Ram Kund Nashik blog",
      "Kumbh Mela tourist guides",
      "Nashik travel insights 2027 - 28",
      "Simhastha updates and news",
    ],
  });
}

const BlogPage = () => {
  return <BlogPageList />;
};

export default BlogPage;
