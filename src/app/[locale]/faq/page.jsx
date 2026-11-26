import FaqPage from "./FaqPage";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "FaqPage" });

  const rawTitle =
    locale === "sa"
      ? "सामान्यप्रश्नाः | महाकुम्भ टूर्स् एण्ड् ट्रॅवल्स्"
      : t.has("metaTitle")
        ? t("metaTitle")
        : "Frequently Asked Questions (FAQ) | Nashik Kumbh Mela & Tour Packages";

  const rawDesc = t.has("metaDescription")
    ? t("metaDescription")
    : "Find answers to common questions about Nashik–Trimbakeshwar Simhastha Kumbh Mela 2027–28, Shahi Snan dates, car rentals, hotel bookings, and customized Jyotirlinga tour packages.";

  const metadata = buildPageMetadata({
    locale,
    pageSlug: "faq",
    title: rawTitle,
    description: rawDesc,
    keywords: [
      "Nashik Kumbh Mela 2027 FAQ",
      "Simhastha Kumbh Mela Shahi Snan dates",
      "Nashik car rental FAQ",
      "Trimbakeshwar darshan tour questions",
      "Mahakumbh Tours and Travels Nashik",
      "Kumbh Mela hotel booking guide",
      "Nashik airport transfer cab",
      "Senior citizen pilgrimage Nashik",
    ],
  });

  return metadata;
}

export default async function FaqRoutePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FaqPage" });

  // Build FAQPage JSON-LD Schema for Google Rich Results
  const faqItems = t.has("items") ? t.raw("items") : [];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Array.isArray(faqItems)
      ? faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        }))
      : [],
  };

  return (
    <>
      {faqJsonLd.mainEntity.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <FaqPage />
    </>
  );
}