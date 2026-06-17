import RentalCarPage from "./RentalCarPage";

// --- SERVER SIDE DYNAMIC SEO METADATA ENGINE ---
export async function generateMetadata({ params }) {
  const { locale } = await params;

  // Hardcoded absolute fallback domain reference
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mahakumbhtours.com";

  return {
    // STRICT ENGLISH SEO IMPLEMENTATION
    title: "Premium Car Rental & Tempo Traveller Fleet | Kumbh Mela 2027",
    description: "Book verified cars, SUVs, Tempo Travellers, and luxury vehicles for seamless transit in Nashik and Trimbakeshwar during the Simhastha Kumbh Mela.",

    alternates: {
      canonical: `${baseUrl}/${locale}/rental-car`,
      languages: {
        "en-US": `${baseUrl}/en/rental-car`,
        // "hi-IN": `${baseUrl}/hi/rental-car`,
        // "mr-IN": `${baseUrl}/mr/rental-car`,
        // "gu-IN": `${baseUrl}/gu/rental-car`,
        // "ta-IN": `${baseUrl}/ta/rental-car`,
        // "te-IN": `${baseUrl}/te/rental-car`,
        // "ml-IN": `${baseUrl}/ml/rental-car`,
      }
    },
    openGraph: {
      title: "Premium Car Rental & Tempo Traveller Fleet | Kumbh Mela 2027",
      description: "Book verified cars, SUVs, Tempo Travellers, and luxury vehicles for seamless transit in Nashik and Trimbakeshwar.",
      type: "website",
      locale: locale,
      url: `${baseUrl}/${locale}/rental-car`,
    }
  };
}

const RentalCar = () => {
  return (
    <RentalCarPage />
  );
};

export default RentalCar;