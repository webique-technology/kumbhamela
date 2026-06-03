import axios from "axios";
import { notFound } from "next/navigation";
import { slugify } from "@/lib/utils";
import TourPackageDetail from "./TourPackageDetail";
import "../../../../styles/tourPackage.scss";
import { getTourBySlug } from "../tourApi";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

async function getTours() {
  try {
    const response = await axios.get(
      `${API_URL}/tours`
    );

    return response.data?.data?.data || [];
  } catch (error) {
    console.error(
      "Tour API Error:",
      error.response?.data || error.message
    );

    return [];
  }
}

export async function generateMetadata({
  params,
}) {
  const { slug, locale } = await params;

  const tours = await getTours();
  const tour = await getTourBySlug(slug);

  // const tour = tours.find(
  //   (item) =>
  //     slugify(item.title || "") === slug
  // );

  if (!tour) {
    return {
      title: "Package Not Found",
    };
  }

  const fullUrl =
    `${BASE_URL}/${locale}/tour-package/${slug}`;

  return {
    title: `${tour.title} | Kumbh Mela Tours`,
    description:
      tour.description || "",

    openGraph: {
      title: tour.title,
      description:
        tour.description || "",
      url: fullUrl,
      siteName:
        "Kumbh Mela Tours",
      images: [
        {
          url: tour.image_url,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },

    twitter: {
      card:
        "summary_large_image",
      title: tour.title,
      description:
        tour.description || "",
      images: [tour.image_url],
    },
  };
}

export default async function TourDetailPage({
  params,
}) {
  const { slug } = await params;

  const tours =await getTours();
  const tour = await getTourBySlug(slug);
  console.log("TOUR DATA", tour);
  // const tour =
  //   tours.find(
  //     (item) =>
  //       slugify(
  //         item.title || ""
  //       ) === slug
  //   );

  if (!tour) {
    notFound();
  }

  return (
    <TourPackageDetail
      tour={tour}
    />
  );
}