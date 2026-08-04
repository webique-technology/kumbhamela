import AboutPage from "./AboutPage";
import { getTranslations } from "next-intl/server";

// --- SERVER SIDE DYNAMIC SEO METADATA ENGINE ---
export async function generateMetadata({ params }) {
  // 1. Await incoming parameters cleanly
  const { locale } = await params;

  // 2. Load localization dictionaries for dynamic text translations
  const t = await getTranslations({ locale, namespace: "AboutPage.Legacy" });
  const tHero = await getTranslations({ locale, namespace: "AboutPage.Hero" });

  // 3. Fallback configuration URLs
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://mahakumbhtours.com";

  // 4. Localized title tracking
  const pageTitle = locale === "sa" ? "सिंहस्थ-उत्तराधिकारः" : t("title");

  // 5. Hardcoded rich SEO keywords gathered directly from the About Page sections
  const staticKeywords = [
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
  ];

  // Dynamic alternate languages mapper setup matching your active business targets
  const supportLocales = ["en", "hi", "mr", "gu", "ta", "te", "ml"];
  const languageAlternates = {};
  supportLocales.forEach((loc) => {
    // Formats language keys to structural standards like "hi-IN", "mr-IN", etc.
    const regionKey = loc === "en" ? "en-IN" : `${loc}-IN`;
    languageAlternates[regionKey] = `${baseUrl}/${loc}/about-us`;
  });

  return {
    // Dynamic Meta Fields
    title: `${pageTitle} | ${tHero("tag") || "The Soul of Nashik"} Kumbh Mela 2027`,
    description:
      t("description") ||
      "Discover the sacred legacy, history, and spiritual depth of the Nashik Simhastha Kumbh Mela along the banks of the holy Godavari River.",
    keywords: staticKeywords,
    verification: {
      google: "WU3Y7CH7N7bDfnbFUxVQrrylvEvpusixzajkOydFyOQ",
    },
    // Multilingual Canonical Indexing Bridges
    alternates: {
      canonical: `${baseUrl}/${locale}/about-us`,
      languages: languageAlternates,
    },

    // Open Graph Configuration (Social Sharing Card Optimization)
    openGraph: {
      title: `${pageTitle} - The Soul of Nashik | Mahakumbh Tours`,
      description:
        t("description") ||
        "Explore the rich rituals, historical destinations, and cultural legacy of the Nashik Kumbh Mela.",
      type: "website",
      locale: locale === "en" ? "en_IN" : `${locale}_IN`,
      url: `${baseUrl}/${locale}/about-us`,
      siteName: "Mahakumbh Tours & Travels",
      images: [
        {
          url: `${baseUrl}/images/about-og-banner.jpg`,
          width: 1200,
          height: 630,
          alt: `${pageTitle} - Nashik Simhastha Heritage`,
        },
      ],
    },

    // Twitter Card Data Sets
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | Nashik Kumbh Mela 2027`,
      description: t("description"),
      images: [`${baseUrl}/images/about-og-banner.jpg`],
    },
  };
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
