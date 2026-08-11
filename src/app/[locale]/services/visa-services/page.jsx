import { HeroHeaderCard2 } from "@/components/ui/card";
import "../../../../assets/scss/main.scss";
import "../../../../styles/aboutPage.scss";
import { ServicePageSecondSec } from "@/components/section/ServicesPagesComp";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

import visaService from "../../../../assets/images/visa-service.webp";


export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "VisaServices" });

  const keywordsString = t("meta.keywords");
  const keywordsArray = keywordsString
    ? keywordsString.split(",").map((k) => k.trim())
    : [];

  return buildPageMetadata({
    locale,
    pageSlug: "visa-services",
    title: t("meta.title") || "Visa Services",
    description:
      t("meta.description") ||
      "Expert tourist visa processing and NRI travel assistance services in Nashik.",
    keywords: keywordsArray,
  });
}

const VisaServicesPage = async ({ params }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "VisaServices" });

  // Parse the visa guidance list to display inside our badge layout section
  const rawOptions = t.raw("content.guidanceFor");
  const serviceList = Array.isArray(rawOptions)
    ? rawOptions.map((optionName) => ({ listName: optionName }))
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
        statNum="PASSPORT"
        statText={t("content.statText")}
        image={visaService}
      />
    </main>
  );
};

export default VisaServicesPage;
