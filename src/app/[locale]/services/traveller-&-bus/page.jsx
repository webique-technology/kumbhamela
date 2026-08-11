import { HeroHeaderCard2 } from "@/components/ui/card";
import "../../../../assets/scss/main.scss";
import "../../../../styles/aboutPage.scss";
import { ServicePageSecondSec } from "@/components/section/ServicesPagesComp";
import { getTranslations } from "next-intl/server";

import travleBus from "../../../../assets/images/traveller-bus.jpg";

import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TravellerAndBus" });

  const keywordsString = t("meta.keywords");
  const keywordsArray = keywordsString
    ? keywordsString.split(",").map((k) => k.trim())
    : [];

  return buildPageMetadata({
    locale,
    pageSlug: "traveller-bus-rental",
    title: t("meta.title") || "Tempo Traveller & Bus Rental",
    description:
      t("meta.description") ||
      "Rent luxury Tempo Travellers, Force Urbania, and mini buses in Nashik.",
    keywords: keywordsArray,
  });
}

const TravellerAndBusPage = async ({ params }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TravellerAndBus" });

  // Parse the vehicles list to display inside our badge layout section
  const rawVehicles = t.raw("content.availableVehicles");
  const serviceList = Array.isArray(rawVehicles)
    ? rawVehicles.map((vehicleName) => ({ listName: vehicleName }))
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
        statNum="GROUP"
        statText={t("content.statText")}
        image={travleBus}
      />
    </main>
  );
};

export default TravellerAndBusPage;
