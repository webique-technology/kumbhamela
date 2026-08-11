import { HeroHeaderCard2 } from "@/components/ui/card";
import "../../../../assets/scss/main.scss";
import "../../../../styles/aboutPage.scss";
import { ServicePageSecondSec } from "@/components/section/ServicesPagesComp";
import { getTranslations } from "next-intl/server";

import luxuryMarraige from "../../../../assets/images/luxury-car-marriage.jpg";

import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "LuxuryCarWeddingCorporate",
  });

  const keywordsString = t("meta.keywords");
  const keywordsArray = keywordsString
    ? keywordsString.split(",").map((k) => k.trim())
    : [];

  return buildPageMetadata({
    locale,
    pageSlug: "luxury-car-wedding-corporate",
    title: t("meta.title") || "Luxury Car Hire",
    description:
      t("meta.description") ||
      "Rent premium luxury cars for weddings, corporate events, and executive travel in Nashik.",
    keywords: keywordsArray,
  });
}

const LuxuryCarMarriageCorporatePage = async ({ params }) => {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "LuxuryCarWeddingCorporate",
  });

  // Safeguard and transform the array strings from the dictionary structure
  const rawServices = t.raw("content.suitableFor");
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
        statNum="VVIP"
        statText={t("content.statText")}
        image={luxuryMarraige}
      />
    </main>
  );
};

export default LuxuryCarMarriageCorporatePage;
