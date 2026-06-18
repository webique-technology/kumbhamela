import ContactUsPage from "./ContactPage";


// --- SERVER SIDE SEO METADATA ENGINE ---
export async function generateMetadata({ params, searchParams }) {
    // Resolve current dynamic locale parameter
    const { locale } = await params;

    // Resolve search query parameters to ensure clean URL normalization for indexing
    const resolvedSearchParams = await searchParams;

    // Base domain reference
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mahakumbhtours.com";

    // Contact page content signals
    const contactTitle = "Contact & Support Center | Mahakumbh Mela 2027";
    const contactDesc = "Reach out to the official Mahakumbh Mela 2027 tour desk for booking inquiries, travel assistance, and group transit support. Available 24/7 in multiple languages.";

    // Strategic commercial keywords extracted directly from the contact image assets
    const contactKeywords = [
        "Kumbh Mela 2027 booking support",
        "Nashik tour packages contact",
        "Jyotirlinga Yatra booking number",
        "Tempo traveller hire Nashik contact",
        "Mahakumbh Mela customer service",
        "Trimbakeshwar pilgrimage booking",
        "Shirdi tour booking helpdesk",
        "24/7 travel assistance Kumbh Mela",
        "Emergency travel support Nashik"
    ];

    // Automated regional multi-language mapping anchors
    const supportLocales = ["en", "hi", "mr", "gu", "ta", "te", "ml"];
    const languageAlternates = {};
    supportLocales.forEach((loc) => {
        const regionKey = loc === "en" ? "en-IN" : `${loc}-IN`;
        languageAlternates[regionKey] = `${baseUrl}/${loc}/contact-us`;
    });

    return {
        title: `${contactTitle} | Mahakumbh Tours & Travels`,
        description: contactDesc,
        keywords: contactKeywords,

        alternates: {
            canonical: `${baseUrl}/${locale}/contact-us`,
            languages: languageAlternates,
        },

        openGraph: {
            title: `${contactTitle} | Kumbh Mela 2027`,
            description: contactDesc,
            type: "website",
            locale: locale === 'en' ? 'en_IN' : `${locale}_IN`,
            url: `${baseUrl}/${locale}/contact-us`,
            siteName: "Mahakumbh Tours & Travels",
            images: [
                {
                    url: `${baseUrl}/images/contact-banner-og.jpg`, // Ensure this maps to your contact social asset
                    width: 1200,
                    height: 630,
                    alt: "Contact Support Mahakumbh Mela 2027",
                }
            ]
        },

        twitter: {
            card: "summary_large_image",
            title: `${contactTitle} | Kumbh Mela 2027`,
            description: contactDesc,
            images: [`${baseUrl}/images/contact-banner-og.jpg`],
        },

        robots: {
            index: true,
            follow: true,
        }
    };
}

const ContactUs = () => {
    return <ContactUsPage />;
};

export default ContactUs;