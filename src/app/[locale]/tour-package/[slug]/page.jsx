import axios from "axios";
import { notFound } from "next/navigation";
import TourPackageDetail from "./TourPackageDetail";
import "../../../../styles/tourPackage.scss";
import { getTourBySlug } from "../tourApi";

// Ensure this matches your actual production domain where assets exist
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mahakumbhtourtravelsnashik.com";

// Helper function to safely strip raw HTML tags and clean description lengths
function cleanDescription(htmlString, maxLength = 160) {
  if (!htmlString) return "";
  const plainText = htmlString.replace(/<[^>]*>/g, "").trim();
  return plainText.length > maxLength ? `${plainText.slice(0, maxLength)}...` : plainText;
}

// 1. DYNAMIC METADATA GENERATION
export async function generateMetadata({ params }) {
  const { slug, locale } = await params;

  // Fetch the specific tour details for this slug
  const tour = await getTourBySlug(slug);

  if (!tour) {
    return {
      title: "Package Not Found",
    };
  }

  const fullUrl = `${BASE_URL}/${locale}/tour-package/${slug}`;
  const seoDescription = cleanDescription(tour.description);

  return {
    title: `Sacred tour: ${tour.title} | Mahakumbh tour & travel`,
    description: seoDescription,

    // Custom metadata extension to force-feed the non-standard og:logo tag Orca Scan wants
    other: {
      "og:logo": `${BASE_URL}/images/logo.png`, // Point this directly to your brand logo asset file
    },

    openGraph: {
      title: tour.title,
      description: seoDescription,
      url: fullUrl,
      siteName: "Mahakumbh Tours & Travels",
      type: "website", // Next.js outputs this, but keeping it explicitly defined inside openGraph ensures parsing
      images: [
        {
          url: tour.image_url || `${BASE_URL}/images/tour-packages-og.jpg`,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
      locale: locale === "en" ? "en_IN" : `${locale}_IN`,
    },

    twitter: {
      card: "summary_large_image",
      title: tour.title,
      description: seoDescription,
      images: [tour.image_url || `${BASE_URL}/images/tour-packages-og.jpg`],
    },
  };
}

// 2. MAIN DETAIL PAGE ENTRY
export default async function TourDetailPage({ params }) {
  const { slug } = await params;

  const tour = await getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return <TourPackageDetail tour={tour} />;
}