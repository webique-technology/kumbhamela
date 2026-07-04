import { HeroHeaderCard2 } from "@/components/ui/card";
import "../../../../assets/scss/main.scss";
import "../../../../styles/aboutPage.scss";
import { ServicePageSecondSec } from "@/components/section/ServicesPagesComp";
import { getTranslations } from "next-intl/server";

import visaService from "../../../../assets/images/visa-service.webp"

export async function generateMetadata({ params }) {
    const { locale } = await params;

    // Load translations scoped to the VisaServices namespace
    const t = await getTranslations({ locale, namespace: "VisaServices" });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mahakumbhtours.com";
    const pageSlug = "visa-services";

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
                    url: `${baseUrl}/images/visa-og-banner.jpg`,
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
            images: [`${baseUrl}/images/visa-og-banner.jpg`],
        }
    };
}

const VisaServicesPage = async ({ params }) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "VisaServices" });

    // Parse the visa guidance list to display inside our badge layout section
    const rawOptions = t.raw("content.guidanceFor");
    const serviceList = Array.isArray(rawOptions)
        ? rawOptions.map((optionName) => ({ listName: optionName }))
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
                statNum="PASSPORT"
                statText={t("content.statText")}
                image={visaService}
            />
        </main>
    );
};

export default VisaServicesPage;