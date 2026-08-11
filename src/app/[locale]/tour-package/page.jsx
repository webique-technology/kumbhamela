import React from "react";
import TourDetailPage from "./TourPackageList";

// Import regional styling layouts cleanly
import "../../../styles/blog.scss";

import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params, searchParams }) {
  // 1. Resolve parameters
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const pageNum = Number(resolvedSearchParams.page) || 1;

  // 2. Handle pagination tracking
  const pageSuffix = pageNum > 1 ? ` (Pg ${pageNum})` : "";
  const pageSlug =
    pageNum > 1 ? `tour-package?page=${pageNum}` : "tour-package";

  return buildPageMetadata({
    locale,
    pageSlug,
    title: `Kumbh Mela 2027 - 28 - 28 Tour Packages${pageSuffix}`,
    description:
      "Book Nashik Kumbh Mela 2027 - 28 - 28 tour packages, 12 Jyotirlinga Yatra, Shirdi, and Shakti Peeth pilgrimage itineraries.",
    keywords: [
      "Kumbh Mela 2027 - 28 - 28 tour packages",
      "12 Jyotirlinga Yatra packages",
      "5 Jyotirlinga pilgrimage maharashtra",
      "Nashik Shirdi Trimbakeshwar tour",
      "Sade Tin Shakti Peeth tour package",
      "Ashtavinayak 3 days tour package",
      "Trimbakeshwar Grishneshwar yatra",
      "Akkalkot Shegaon Pandharpur tour",
      "Nashik pilgrimage itineraries",
      "Kumbh Mela family travel packages",
    ],
  });
}

// --- SERVER COMPONENT LAYOUT DISPLAY ENTRY ---
export default async function TourPage() {
  return (
    <main>
      <TourDetailPage />
    </main>
  );
}
