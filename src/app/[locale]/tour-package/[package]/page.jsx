import { notFound } from "next/navigation";
import { tourPackages } from "@/lib/data";
import { slugify } from "@/lib/utils";
import TourPackageDetail from "./TourPackageDetail";
import "../../../../styles/tourPackage.scss";

const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://yourkumbhdomain.com";

export const generateMetadata = async ({ params }) => {
    const resolvedParams = await params;

    const slug = resolvedParams.package;

    const tour = tourPackages.find(
        (p) => slugify(p.name) === slug
    );

    if (!tour) {
        return {
            title: "Package Not Found",
        };
    }

    const fullUrl = `${BASE_URL}/tour-package/${slug}`;

    const fullImageUrl = tour.image.startsWith("http")
        ? tour.image
        : `${BASE_URL}${tour.image}`;

    return {
        title: `${tour.name} | Kumbh Mela Tours`,
        description: tour.mainDesc,

        openGraph: {
            title: tour.name,
            description: tour.mainDesc,
            url: fullUrl,
            siteName: "Kumbh Mela Tours",
            images: [
                {
                    url: fullImageUrl,
                    width: 1200,
                    height: 630,
                },
            ],
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title: tour.name,
            description: tour.mainDesc,
            images: [fullImageUrl],
        },
    };
};

const TourDetailPage = async ({ params }) => {
    const resolvedParams = await params;

    const slug = resolvedParams.package;

    const tour = tourPackages.find(
        (p) => slugify(p.name) === slug
    );

    if (!tour) {
        notFound();
    }

    return <TourPackageDetail tour={tour} />;
};

export default TourDetailPage;