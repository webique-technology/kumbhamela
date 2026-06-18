import React from "react";
import TourDetailPage from "./TourPackageList";

// Import regional styling layouts cleanly
import "../../../styles/blog.scss";

// --- SERVER SIDE STATIC ENGLISH SEO METADATA ENGINE ---
export async function generateMetadata({ params, searchParams }) {
    // Resolve dynamic path attributes asynchronously 
    const { locale } = await params;

    // Resolve search params to track pagination setups cleanly
    const resolvedSearchParams = await searchParams;
    const pageNum = Number(resolvedSearchParams.page) || 1;

    // Hardcoded absolute base URL for dynamic generation structures
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mahakumbhtours.com";

    // Prevent duplicate title crawl errors across your item pages
    const pageAppend = pageNum > 1 ? ` | Page ${pageNum}` : "";

    const metaTitle = `Mahakumbh Mela 2027 Tour Packages & Pilgrimage Itineraries${pageAppend}`;
    const metaDesc = "Book curated Nashik Kumbh Mela 2027 tour packages. Highly optimized itineraries for 12 Jyotirlinga Yatra, Maharashtra 5 Jyotirlinga pilgrimage, Ashtavinayak, Shirdi, and Sade Tin Shakti Peeth.";

    // Targeted, commercial transactional search phrases extracted directly from image_ff5ba0.jpg
    const tourKeywords = [
        "Kumbh Mela 2027 tour packages",
        "12 Jyotirlinga Yatra packages",
        "5 Jyotirlinga pilgrimage maharashtra",
        "Nashik Shirdi Trimbakeshwar tour",
        "Sade Tin Shakti Peeth tour package",
        "Ashtavinayak 3 days tour package",
        "Trimbakeshwar Grishneshwar yatra",
        "Akkalkot Shegaon Pandharpur tour",
        "Nashik pilgrimage itineraries",
        "Kumbh Mela family travel packages"
    ];

    // Setup active regional index fallback tracking maps 
    const supportLocales = ["en", "hi", "mr", "gu", "ta", "te", "ml"];
    const languageAlternates = {};
    supportLocales.forEach((loc) => {
        const regionKey = loc === "en" ? "en-IN" : `${loc}-IN`;
        const paginationSuffix = pageNum > 1 ? `?page=${pageNum}` : "";
        languageAlternates[regionKey] = `${baseUrl}/${loc}/tour-package${paginationSuffix}`;
    });

    return {
        title: `${metaTitle} | Mahakumbh Tours`,
        description: metaDesc,
        keywords: tourKeywords,

        // Multilingual Indexing Anchors
        alternates: {
            canonical: pageNum > 1 ? `${baseUrl}/${locale}/tour-package?page=${pageNum}` : `${baseUrl}/${locale}/tour-package`,
            languages: languageAlternates,
        },

        // Social Card Formats
        openGraph: {
            title: `Sacred Tour Packages & Pilgrimage Itineraries | Kumbh Mela 2027`,
            description: metaDesc,
            type: "website",
            locale: locale === 'en' ? 'en_IN' : `${locale}_IN`,
            url: pageNum > 1 ? `${baseUrl}/${locale}/tour-package?page=${pageNum}` : `${baseUrl}/${locale}/tour-package`,
            siteName: "Mahakumbh Tours & Travels",
            images: [
                {
                    url: `${baseUrl}/images/tour-packages-og.jpg`,
                    width: 1200,
                    height: 630,
                    alt: "Mahakumbh Sacred Tour Booking Packages",
                }
            ]
        },

        twitter: {
            card: "summary_large_image",
            title: `${metaTitle} | Kumbh Mela 2027`,
            description: metaDesc,
            images: [`${baseUrl}/images/tour-packages-og.jpg`],
        },

        robots: {
            index: true,
            follow: true,
        }
    };
}

// --- SERVER COMPONENT LAYOUT DISPLAY ENTRY ---
export default async function TourPage() {
    return (
        <main>
            <TourDetailPage />
        </main>
    );
}