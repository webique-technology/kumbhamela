import React, { Suspense } from 'react';
import { HeroHeaderCard2 } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';
import { HotelPageContent } from './HotelPageContent';

// Import regional styling layouts cleanly
import "../../../styles/hotel-accomodation.scss";
import "../../../assets/scss/main.scss";

// --- SERVER SIDE DYNAMIC SEO ENGINE ---
export async function generateMetadata({ params }) {
    // Resolve the current routing parameters asynchronously
    const { locale } = await params;

    // Fetch server-side asynchronous translations from json file maps
    const t = await getTranslations({ locale, namespace: "HotelPage.hotelHeader" });

    // Fallback base configuration address assignment for canonical indexing
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mahakumbhtours.com";

    return {
        title: `${t("metaTitle")} | Kumbh Mela 2027`,
        description: t("metaDesc"),
        alternates: {
            canonical: `${baseUrl}/${locale}/hotel`,
            languages: {
                "en-US": `${baseUrl}/en/hotel`,
                // "hi-IN": `${baseUrl}/hi/hotel`,
                // "mr-IN": `${baseUrl}/mr/hotel`,
                // "gu-IN": `${baseUrl}/gu/hotel`,
                // "ta-IN": `${baseUrl}/ta/hotel`,
                // "te-IN": `${baseUrl}/te/hotel`,
                // "ml-IN": `${baseUrl}/ml/hotel`,
            }
        },
        openGraph: {
            title: `${t("metaTitle")} | Mela Stays`,
            description: t("metaDesc"),
            type: "website",
            locale: locale,
            url: `${baseUrl}/${locale}/hotel`,
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