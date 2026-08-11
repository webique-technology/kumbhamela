import { notFound } from "next/navigation";
import TourPackageDetail from "./TourPackageDetail";
import "../../../../styles/tourPackage.scss";
import { getTourBySlug } from "../tourApi";
import { truncateText, getValidUrl } from "@/lib/seo";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mahakumbhtourstravelsnashik.com";

function cleanHtml(htmlString) {
  if (!htmlString) return "";
  return htmlString.replace(/<[^>]*>/g, "").trim();
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;

  // Fetch tour data
  const tour = await getTourBySlug(slug, locale);

  if (!tour) {
    return {
      title: "Package Not Found",
    };
  }

  // --- 1. TITLE TRUNCATION (Keeps total string ~50-53 chars max) ---
  const shortTourTitle = truncateText(tour.title || "Tour Package", 35);
  const searchTitle = `${shortTourTitle} | Mahakumbh Tours`;
  const socialTitle = `${shortTourTitle} | Nashik Kumbh 2027`;

  // --- 2. DESCRIPTION TRUNCATION ---
  const rawPlainText = cleanHtml(tour.description);
  const searchDescription = truncateText(
    rawPlainText ||
      "Explore sacred pilgrimage tour packages for Nashik Kumbh Mela 2027.",
    155,
  ); // Max 155 chars for Google
  const socialDescription = truncateText(
    rawPlainText ||
      "Explore sacred pilgrimage tour packages for Nashik Kumbh Mela 2027.",
    120,
  ); // Max 120 chars for Social Cards

  // --- 3. ABSOLUTE URLS & FALLBACKS ---
  const fullUrl = getValidUrl(BASE_URL, `/${locale}/tour-package/${slug}`);

  // Use dynamic tour image if available, otherwise fall back to 1200x630 static banner
  const ogImageUrl = tour.image_url
    ? getValidUrl(BASE_URL, tour.image_url)
    : getValidUrl(BASE_URL, "/images/tour-section-bg.jpg");

  const supportLocales = ["en", "hi", "mr", "gu", "ta", "te", "ml", "sa"];
  const languageAlternates = {};
  supportLocales.forEach((loc) => {
    const regionKey = loc === "en" ? "en-IN" : `${loc}-IN`;
    languageAlternates[regionKey] = getValidUrl(
      BASE_URL,
      `/${loc}/tour-package/${slug}`,
    );
  });

  return {
    metadataBase: new URL(BASE_URL),

    // Absolute title stops Next.js layout.js template from doubling up
    title: {
      absolute: searchTitle,
    },

    description: searchDescription,

    other: {
      "og:logo": getValidUrl(BASE_URL, "/images/icon.png"),
    },

    alternates: {
      canonical: fullUrl,
      languages: languageAlternates,
    },

    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: fullUrl,
      siteName: "Mahakumbh Tours & Travels",
      type: "website",
      locale: locale === "en" ? "en_IN" : `${locale}_IN`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: searchTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [ogImageUrl],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

// 2. MAIN DETAIL PAGE ENTRY
export default async function TourDetailPage({ params }) {
  const { slug, locale } = await params;

  const tour = await getTourBySlug(slug, locale);

  if (!tour) {
    notFound();
  }

  return <TourPackageDetail tour={tour} />;
}
