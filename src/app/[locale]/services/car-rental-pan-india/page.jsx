import { HeroHeaderCard2 } from "@/components/ui/card";
import "../../../../assets/scss/main.scss";
import "../../../../styles/aboutPage.scss";
import { ServicePageSecondSec } from "@/components/section/ServicesPagesComp";
import { getTranslations } from "next-intl/server";
import carRentalPan from "../../../../assets/images/car-rental-pan-india.jpg";

import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CarRentalPanIndia" });

  const keywordsString = t("meta.keywords");
  const keywordsArray = keywordsString
    ? keywordsString.split(",").map((k) => k.trim())
    : [];

  return buildPageMetadata({
    locale,
    pageSlug: "car-rental-pan-india",
    title: t("meta.title") || "Pan India Car Rental",
    description:
      t("meta.description") ||
      "Book reliable Pan India car rentals and outstation cabs for Nashik Kumbh Mela 2027 - 28 - 28.",
    keywords: keywordsArray,
  });
}

const CarRentalPanIndiaPage = async ({ params }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CarRentalPanIndia" });

  // Safely parse the raw JSON array for our services checkmarks
  const rawServices = t.raw("content.servicesInclude");
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
        statNum="100"
        statText={t("content.statText")}
        image={carRentalPan}
      />
    </main>
  );
};

export default CarRentalPanIndiaPage;
