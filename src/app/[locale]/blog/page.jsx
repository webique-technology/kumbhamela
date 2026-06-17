import { getTranslations } from "next-intl/server";
import BlogPageList from "./BlogListPage";

// 1. Generate Dynamic Metadata based on the current language
export async function generateMetadata() {
  // Pulls translations from the same "Blog" namespace used in your component
  const t = await getTranslations("Blog");

  return {
    title: "Kumbh Mela Blogs & Articles", // e.g., "Kumbh Mela Blogs & Articles"
    description: "Explore the rich history, sacred rituals, and practical travel tips for Kumbh Mela Nashik 2027", // e.g., "Explore the rich history..."
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title: "Kumbh Mela Blogs & Articles",
      description: "Explore the rich history, sacred rituals, and practical travel tips for Kumbh Mela Nashik 2027",
      type: "website",
    },

  }
}

const BlogPage = () => {
  return <BlogPageList />;
};

export default BlogPage;