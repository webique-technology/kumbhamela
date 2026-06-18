import React, { Suspense } from 'react';
import { HeroHeaderCard2 } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';
import { HotelPageContent } from './HotelPageContent';

// Import regional styling layouts cleanly
import "../../../styles/hotel-accomodation.scss";
import "../../../assets/scss/main.scss";

// --- SERVER SIDE DYNAMIC SEO ENGINE ---
export async function generateMetadata({ params, searchParams }) {
    // 1. Resolve localized layout routing parameters
    const { locale } = await params;

    // 2. Resolve search query parameters safely if page truncation occurs
    const resolvedSearchParams = await searchParams;
    const pageNum = Number(resolvedSearchParams.page) || 1;

    // Fetch server-side asynchronous translations from JSON files
    const t = await getTranslations({ locale, namespace: "HotelPage.hotelHeader" });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mahakumbhtours.com";

    // Prevent duplicate title issues in search consoles across pagination steps
    const paginationString = pageNum > 1 ? ` | Page ${pageNum}` : "";
    const metaTitle = `${t("metaTitle") || "Hotel & Ashram Accommodations near Holy Ghats"}${paginationString} | Kumbh Mela 2027`;
    const metaDesc = t("metaDesc") || "Find and book comfortable hotels, premium stays, budget dharamshalas, and ashram accommodations near the holy ghats in Nashik & Trimbakeshwar.";

    // 3. High-intent, localized keywords built directly from your interface filters & cards
    const hotelKeywords = [
        "Kumbh Mela hotel accommodation",
        "Book Dharamshala in Nashik",
        "Ashram stays near holy ghats",
        "Nashik Kumbh Mela room booking",
        "Hotels near Trimbakeshwar Jyotirlinga",
        "Budget stays Panchavati Nashik",
        "Premium hotels Nashik Kumbh Mela",
        "Kumbh Mela luxury tents accommodation",
        "Where to stay in Nashik 2027",
        "Mela stays and tour hotel booking"
    ];

    // 4. Generate clean multilingual region anchors automatically
    const supportLocales = ["en", "hi", "mr", "gu", "ta", "te", "ml"];
    const languageAlternates = {};
    supportLocales.forEach((loc) => {
        const regionKey = loc === "en" ? "en-IN" : `${loc}-IN`;
        const paginationSuffix = pageNum > 1 ? `?page=${pageNum}` : "";
        languageAlternates[regionKey] = `${baseUrl}/${loc}/hotel${paginationSuffix}`;
    });

    return {
        title: metaTitle,
        description: metaDesc,
        keywords: hotelKeywords,

        // 5. Advanced Search Index Canonical Handlers
        alternates: {
            canonical: pageNum > 1 ? `${baseUrl}/${locale}/hotel?page=${pageNum}` : `${baseUrl}/${locale}/hotel`,
            languages: languageAlternates,
        },

        // OpenGraph Optimization (Facebook, LinkedIn Link Previews)
        openGraph: {
            title: `${t("metaTitle") || "Hotel Accommodations"} - Mela Stays`,
            description: metaDesc,
            type: "website",
            locale: locale === 'en' ? 'en_IN' : `${locale}_IN`,
            url: pageNum > 1 ? `${baseUrl}/${locale}/hotel?page=${pageNum}` : `${baseUrl}/${locale}/hotel`,
            siteName: "Mahakumbh Tours & Travels",
            images: [
                {
                    url: `${baseUrl}/images/hotel-listing-og.jpg`, // Path to your open graph card graphic asset
                    width: 1200,
                    height: 630,
                    alt: "Kumbh Mela Hotel & Ashram Accommodations",
                }
            ]
        },

        // Twitter Card Mapping Fields
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDesc,
            images: [`${baseUrl}/images/hotel-listing-og.jpg`],
        },

        robots: {
            index: true,
            follow: true,
        }
    };
}

// --- SERVER COMPONENT LAYOUT DISPLAY ENTRY ---
export default async function HotelPage({ params }) {
    // Read locale parameter securely on server side execution threads
    const { locale } = await params;

    // Fetch namespace localization records asynchronously 
    const t = await getTranslations({ locale, namespace: "HotelPage.hotelHeader" });

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
                    heroImage="/images/contact-page-bg.png"
                    imgClass="hero-img"
                    showSearch={true}
                />
            </section>

            {/* Interactive Search Grid with Suspense Client Boundary */}
            <Suspense fallback={<div className="text-center py-5">{t("loading")}</div>}>
                <HotelPageContent />
            </Suspense>
        </main>
    );
}