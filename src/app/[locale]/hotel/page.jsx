import React, { Suspense } from "react";
import { HeroHeaderCard2 } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { HotelPageContent } from "./HotelPageContent";

// Import regional styling layouts cleanly
import "../../../styles/hotel-accomodation.scss";
import "../../../assets/scss/main.scss";

import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params, searchParams }) {
  // 1. Resolve parameters
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const pageNum = Number(resolvedSearchParams.page) || 1;

  // 2. Fetch translations
  const t = await getTranslations({
    locale,
    namespace: "HotelPage.hotelHeader",
  });

  // 3. Resolve localized texts safely using t.has()
  const rawTitle = t.has("metaTitle") ? t("metaTitle") : "Hotels & Stays";
  const rawDesc = t.has("metaDesc")
    ? t("metaDesc")
    : "Book hotels, budget dharamshalas, and ashram stays near holy ghats in Nashik & Trimbakeshwar for Kumbh Mela 2027 - 28 - 28.";

  // 4. Handle pagination tracking
  const pageSuffix = pageNum > 1 ? ` (Pg ${pageNum})` : "";
  const pageSlug = pageNum > 1 ? `hotel?page=${pageNum}` : "hotel";

  return buildPageMetadata({
    locale,
    pageSlug,
    title: `${rawTitle}${pageSuffix}`,
    description: rawDesc,
    keywords: [
      "Kumbh Mela hotel accommodation",
      "Book Dharamshala in Nashik",
      "Ashram stays near holy ghats",
      "Nashik Kumbh Mela room booking",
      "Hotels near Trimbakeshwar Jyotirlinga",
      "Budget stays Panchavati Nashik",
      "Premium hotels Nashik Kumbh Mela",
      "Kumbh Mela luxury tents accommodation",
      "Where to stay in Nashik 2027 - 28",
      "Mela stays and tour hotel booking",
    ],
  });
}

// --- SERVER COMPONENT LAYOUT DISPLAY ENTRY ---
export default async function HotelPage({ params }) {
  // Read locale parameter securely on server side execution threads
  const { locale } = await params;

  // Fetch namespace localization records asynchronously
  const t = await getTranslations({
    locale,
    namespace: "HotelPage.hotelHeader",
  });

  return (
    <main>
      {/* Main Header Presentation Section Block */}
      <section>
        <HeroHeaderCard2
          heroTitle={t("title")}
          description={t("description")}
          heroTitleClass="text-light"
          spanClass="text-light"
          heroSubtitle={t("heroTitle")}
          // heroImage="/images/contact-page-bg.png"
          imgClass="hero-img"
          showSearch={true}
        />
      </section>

      {/* Interactive Search Grid with Suspense Client Boundary */}
      <Suspense
        fallback={<div className="text-center py-5">{t("loading")}</div>}
      >
        <HotelPageContent />
      </Suspense>
    </main>
  );
}
