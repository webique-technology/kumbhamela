import axios from "axios";
import { notFound } from "next/navigation";
import TourPackageDetail from "./TourPackageDetail";
import "../../../../styles/tourPackage.scss";
import { getTourBySlug } from "../tourApi";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// 1. DYNAMIC METADATA GENERATION
export async function generateMetadata({ params }) {
  const { slug, locale } = await params;

  // Optimized: Only fetch the specific tour needed for this slug
  const tour = await getTourBySlug(slug);

  if (!tour) {
    return {
      title: "Package Not Found",
    };
  }

  const fullUrl = `${BASE_URL}/${locale}/tour-package/${slug}`;

  return {
    title: `${tour.title} | Kumbh Mela Tours`,
    description: tour.description || "",
    openGraph: {
      title: tour.title,
      description: tour.description || "",
      url: fullUrl,
      siteName: "Kumbh Mela Tours",
      images: [
        {
          url: tour.image_url,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tour.title,
      description: tour.description || "",
      images: [tour.image_url],
    },
  };
}

// 2. MAIN DETAIL PAGE ENTRY
export default async function TourDetailPage({ params }) {
  const { slug } = await params;

  // Optimized: Removed the heavy getTours() call entirely
  const tour = await getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return <TourPackageDetail tour={tour} />;
}