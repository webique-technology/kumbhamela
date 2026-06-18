import RentalCarPage from "./RentalCarPage";

// --- SERVER SIDE DYNAMIC SEO METADATA ENGINE ---
export async function generateMetadata({ params, searchParams }) {
  const { locale } = await params;

  // Resolve query parameters safely to handle pagination or vehicle filter indexing cleanly
  const resolvedSearchParams = await searchParams;
  const typeFilter = resolvedSearchParams.type ? ` - ${resolvedSearchParams.type}` : "";

  // Hardcoded absolute fallback domain reference
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mahakumbhtours.com";

  // Context-specific keywords generated directly from the filters and cards in image_ff637f.jpg
  const rentalKeywords = [
    "Nashik car rental for Kumbh Mela",
    "Book Tempo Traveller Nashik",
    "Luxury Urbania rental Nashik",
    "Innova Crysta hire Trimbakeshwar",
    "Pilgrim bus rental Nashik",
    "Kumbh Mela group transit fleet",
    "Swift Dzire Ertiga taxi Nashik",
    "Kumbh Mela tour vehicle booking",
    "Nashik car hire with verified driver",
    "Outstation cab booking Nashik 2027"
  ];

  // Automated regional multi-language mapping
  const supportLocales = ["en", "hi", "mr", "gu", "ta", "te", "ml"];
  const languageAlternates = {};
  supportLocales.forEach((loc) => {
    const regionKey = loc === "en" ? "en-IN" : `${loc}-IN`;
    languageAlternates[regionKey] = `${baseUrl}/${loc}/rental-car`;
  });

  const dynamicTitle = `Premium Car Rental & Tempo Traveller Fleet${typeFilter} | Kumbh Mela 2027`;
  const dynamicDesc = "Book verified cars, SUVs, Tempo Travellers, Luxury Urbania, and group buses for seamless transit in Nashik and Trimbakeshwar with 24/7 roadside assistance during the Simhastha Kumbh Mela.";

  return {
    title: dynamicTitle,
    description: dynamicDesc,
    keywords: rentalKeywords,

    alternates: {
      canonical: `${baseUrl}/${locale}/rental-car`,
      languages: languageAlternates,
    },

    openGraph: {
      title: dynamicTitle,
      description: dynamicDesc,
      type: "website",
      locale: locale === 'en' ? 'en_IN' : `${locale}_IN`,
      url: `${baseUrl}/${locale}/rental-car`,
      siteName: "Mahakumbh Tours & Travels",
      images: [
        {
          url: `${baseUrl}/images/rental-fleet-og.jpg`, // Ensure this maps to your social asset banner
          width: 1200,
          height: 630,
          alt: "Mahakumbh Tours Transit Fleet Options",
        }
      ]
    },

    twitter: {
      card: "summary_large_image",
      title: dynamicTitle,
      description: dynamicDesc,
      images: [`${baseUrl}/images/rental-fleet-og.jpg`],
    },

    robots: {
      index: true,
      follow: true,
    }
  };
}

const RentalCar = () => {
  return (
    <RentalCarPage />
  );
};

export default RentalCar;