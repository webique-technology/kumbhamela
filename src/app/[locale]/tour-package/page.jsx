import React from "react";
import TourDetailPage from "./TourPackageList";

// Import regional styling layouts cleanly
import "../../../styles/blog.scss";

// --- SERVER SIDE STATIC ENGLISH SEO METADATA ENGINE ---
export async function generateMetadata({ params }) {
    // Resolve the current locale parameter directly from the route path
    const { locale } = await params;

    // Hardcoded absolute base context fallback URL for search index crawlers
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mahakumbhtours.com";

    return {
        // STRICT STATIC ENGLISH SEO IMPLEMENTATION
        title: "Sacred Tour Packages & Pilgrimage Itineraries | Kumbh Mela 2027",
        description: "Explore curated pilgrimage tour packages for Trimbakeshwar Jyotirlinga, Nashik Darshan, Panchavati, Shirdi, and tailored itineraries for the Simhastha Kumbh Mela.",

        alternates: {
            canonical: `${baseUrl}/${locale}/tour-package`,
            languages: {
                "en-US": `${baseUrl}/en/tour-package`,
                // "hi-IN": `${baseUrl}/hi/tour-package`,
                // "mr-IN": `${baseUrl}/mr/tour-package`,
                // "gu-IN": `${baseUrl}/gu/tour-package`,
                // "ta-IN": `${baseUrl}/ta/tour-package`,
                // "te-IN": `${baseUrl}/te/tour-package`,
                // "ml-IN": `${baseUrl}/ml/tour-package`,
            }
        },

        openGraph: {
            title: "Sacred Tour Packages & Pilgrimage Itineraries | Kumbh Mela 2027",
            description: "Explore curated pilgrimage tour packages for Trimbakeshwar Jyotirlinga, Nashik Darshan, Panchavati, and Shirdi.",
            type: "website",
            locale: locale,
            url: `${baseUrl}/${locale}/tour-package`,
            images: [
                {
                    url: `${baseUrl}/images/tour-packages-og.jpg`,
                    width: 1200,
                    height: 630,
                    alt: "Kumbh Mela Tour Packages",
                }
            ]
        },

        twitter: {
            card: "summary_large_image",
            title: "Sacred Tour Packages & Pilgrimage Itineraries | Kumbh Mela 2027",
            description: "Explore curated pilgrimage tour packages for Trimbakeshwar Jyotirlinga, Nashik Darshan, Panchavati, and Shirdi.",
            images: [`${baseUrl}/images/tour-packages-og.jpg`],
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