import AboutPage from "./AboutPage";
import { getTranslations } from "next-intl/server";

import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  // 1. Await incoming parameters
  const { locale } = await params;

  // 2. Load localization dictionaries
  const t = await getTranslations({ locale, namespace: "AboutPage.Legacy" });

  // 3. Raw Page Title
  const rawTitle =
    locale === "sa"
      ? "सिंहस्थ-उत्तराधिकारः"
      : t.has("title")
        ? t("title")
        : "About Us";

  // 4. Safe Description resolution (Prevents MISSING_MESSAGE error)
  const rawDesc = t.has("metaDescription")
    ? t("metaDescription")
    : t.has("description")
      ? t("description")
      : "Discover the history, spiritual depth, and sacred legacy of Nashik Simhastha Kumbh Mela along the Godavari River.";

  // 5. Build standardized SEO output
  const metadata = buildPageMetadata({
    locale,
    pageSlug: "about-us",
    title: rawTitle,
    description: rawDesc,
    keywords: [
      "About Nashik Kumbh Mela",
      "Simhastha Nashik history",
      "Godavari River holy confluence",
      "Kumbh Mela rituals and events",
      "Sadhus and Saints cultural showcase",
      "Ram Kund Nashik history",
      "Trimbakeshwar Jyotirlinga packages",
      "Panchavati tour itinerary",
      "Shahi Snan experience",
      "Nashik spiritual travel agency",
    ],
  });

  // Attach Google verification tag specifically for about page if needed
  metadata.verification = {
    google: "WU3Y7CH7N7bDfnbFUxVQrrylvEvpusixzajkOydFyOQ",
  };

  return metadata;
}

// --- SERVER SIDE ROOT PAGE COMPONENT ---
const AboutUs = () => {
  return (
    <>
      <AboutPage />
    </>
  );
};

export default AboutUs;
