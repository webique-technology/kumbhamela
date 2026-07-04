import { HeroHeaderCard2 } from "@/components/ui/card";
import "../../../../assets/scss/main.scss";
import "../../../../styles/aboutPage.scss";
import { ServicePageSecondSec } from "@/components/section/ServicesPagesComp";
import { getTranslations } from "next-intl/server";

import luxuryMarraige from "../../../../assets/images/luxury-car-marriage.jpg"

export async function generateMetadata({ params }) {
    const { locale } = await params;

    // Load translations scoped to the new LuxuryCarWeddingCorporate namespace
    const t = await getTranslations({ locale, namespace: "LuxuryCarWeddingCorporate" });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mahakumbhtours.com";
    const pageSlug = "luxury-car-wedding-corporate";

    // Build the structural array from the comma-separated keyword string
    const keywordsString = t("meta.keywords");
    const keywordsArray = keywordsString ? keywordsString.split(",").map(k => k.trim()) : [];

    const supportLocales = ["en", "hi", "mr", "gu", "ta", "te", "ml", "sa"];
    const languageAlternates = {};
    supportLocales.forEach((loc) => {
        const regionKey = loc === "en" ? "en-IN" : `${loc}-IN`;
        languageAlternates[regionKey] = `${baseUrl}/${loc}/${pageSlug}`;
    });

    // Exact requested meta pattern applied here
    const metaTitle = "Mahakumbh Tours & Travels Nashik | " + t("meta.title");
    const metaDescription = t("meta.description");

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: keywordsArray,
        alternates: {
            canonical: `${baseUrl}/${locale}/${pageSlug}`,
            languages: languageAlternates,
        },
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            type: "website",
            locale: locale === 'en' ? 'en_IN' : `${locale}_IN`,
            url: `${baseUrl}/${locale}/${pageSlug}`,
            siteName: "Mahakumbh Tours & Travels",
            images: [
                {
                    url: `${baseUrl}/images/luxury-car-og-banner.jpg`,
                    width: 1200,
                    height: 630,
                    alt: metaTitle,
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            images: [`${baseUrl}/images/luxury-car-og-banner.jpg`],
        }
    };
}

const LuxuryCarMarriageCorporatePage = async ({ params }) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "LuxuryCarWeddingCorporate" });

    // Safeguard and transform the array strings from the dictionary structure
    const rawServices = t.raw("content.suitableFor");
    const serviceList = Array.isArray(rawServices)
        ? rawServices.map((serviceName) => ({ listName: serviceName }))
        : [];

    return (
        <main className="about-kumbh-page spiritual-legacy">
            <HeroHeaderCard2
                subTitle={t("hero.subTitle")}
                heroTitle={t("hero.title")}
                description={t("meta.description")}
                heroTitleClass="text-light"
                imgClass="hero-img"
                showSearch={false}
            />
            <ServicePageSecondSec
                subTitle={t("content.subTitle")}
                title={t("content.h1")}
                description={t("content.descriptionBody")}
                serviceList={serviceList}
                statNum="VVIP"
                statText={t("content.statText")}
                image={luxuryMarraige}
            />
        </main>
    );
};

export default LuxuryCarMarriageCorporatePage;