import AboutPage from "./AboutPage";
import { getTranslations } from "next-intl/server";

// --- SERVER SIDE DYNAMIC SEO METADATA ENGINE ---
export async function generateMetadata({ params }) {
    // URL से वर्तमान भाषा (locale) प्राप्त करें
    const { locale } = await params;

    // सर्वर-साइड लोकलाइजेशन डिक्शनरी लोड करें (AboutPage.Legacy नेमस्पेस से)
    const t = await getTranslations({ locale, namespace: "AboutPage.Legacy" });
    const tHero = await getTranslations({ locale, namespace: "AboutPage.Hero" });

    // वेबसाइट का बेस यूआरएल (कैनोनिकल और अल्टरनेट लिंक्स के लिए)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mahakumbhtours.com";

    // एसईओ टाइटल के लिए भाषा के अनुसार फ़ालबैक सेट करें
    const pageTitle = locale === 'sa' ? "सिंहस्थ-उत्तराधिकारः" : t("title");

    return {
        // डायनेमिक मेटा टाइटल और डिस्क्रिप्शन
        title: `${pageTitle} | ${tHero("tag")} Kumbh Mela 2027`,
        description: t("description"),
        
        // सर्च इंजन के लिए कैनोनिकल और बहुभाषी (Multilingual) अल्टरनेट लिंक्स
        alternates: {
            canonical: `${baseUrl}/${locale}/about-us`,
            // languages: {
            //     "en-US": `${baseUrl}/en/about-us`,
            //     "hi-IN": `${baseUrl}/hi/about-us`,
            //     "mr-IN": `${baseUrl}/mr/about-us`,
            //     "gu-IN": `${baseUrl}/gu/about-us`,
            //     "ta-IN": `${baseUrl}/ta/about-us`,
            //     "te-IN": `${baseUrl}/te/about-us`,
            //     "ml-IN": `${baseUrl}/ml/about-us`,
            // }
        },

        // सोशल मीडिया शेयरिंग के लिए ओपन ग्राफ (OpenGraph) सेटिंग्स
        openGraph: {
            title: `${pageTitle} - Mahakumbh Tours`,
            description: t("description"),
            type: "website",
            locale: locale,
            url: `${baseUrl}/${locale}/about-us`,
            images: [
                {
                    url: `${baseUrl}/images/about-og-banner.jpg`, // अपनी पसंद का ओजी बैनर पाथ जोड़ें
                    width: 1200,
                    height: 630,
                    alt: pageTitle,
                }
            ]
        },

        // ट्विटर कार्ड्स मेटा टैग्स
        twitter: {
            card: "summary_large_image",
            title: `${pageTitle} | Kumbh Mela 2027`,
            description: t("description"),
            images: [`${baseUrl}/images/about-og-banner.jpg`],
        }
    };
}

// --- SERVER SIDE ROOT PAGE COMPONENT ---
const AboutUs = () => {
    return (
        <>
            <AboutPage />
        </>
    );
};

export default AboutUs;