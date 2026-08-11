import RentalCarPage from "./RentalCarPage";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params, searchParams }) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  const typeFilter = resolvedSearchParams.type
    ? ` (${resolvedSearchParams.type})`
    : "";

  const pageSlug = resolvedSearchParams.type
    ? `rental-car?type=${encodeURIComponent(resolvedSearchParams.type)}`
    : "rental-car";

  return buildPageMetadata({
    locale,
    pageSlug,
    title: `Car Rental & Tempo Traveller${typeFilter}`,
    description:
      "Book verified cars, SUVs, Tempo Travellers, and buses in Nashik & Trimbakeshwar for Kumbh Mela 2027 - 28 - 28 with 24/7 support.",
    keywords: [
      "Nashik car rental for Kumbh Mela",
      "Book Tempo Traveller Nashik",
      "Luxury Urbania rental Nashik",
      "Innova Crysta hire Trimbakeshwar",
      "Pilgrim bus rental Nashik",
      "Kumbh Mela group transit fleet",
      "Swift Dzire Ertiga taxi Nashik",
      "Kumbh Mela tour vehicle booking",
      "Nashik car hire with verified driver",
      "Outstation cab booking Nashik 2027 - 28",
    ],
  });
}

const RentalCar = () => {
  return <RentalCarPage />;
};

export default RentalCar;
