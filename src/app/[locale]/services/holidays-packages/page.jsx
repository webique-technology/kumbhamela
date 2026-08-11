import { HeroHeaderCard2 } from "@/components/ui/card";
import "../../../../assets/scss/main.scss";
import "../../../../styles/aboutPage.scss";
import { ServicePageSecondSec } from "@/components/section/ServicesPagesComp";
import { getTranslations } from "next-intl/server";

import holidayPackages from "../../../../assets/images/holidays-packages.jpg";

import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HolidayPackages" });

  const keywordsString = t("meta.keywords");
  const keywordsArray = keywordsString
    ? keywordsString.split(",").map((k) => k.trim())
    : [];

  return buildPageMetadata({
    locale,
    pageSlug: "holidays-packages",
    title: t("meta.title") || "Holiday Packages",
    description:
      t("meta.description") ||
      "Explore customized holiday and pilgrimage tour packages in Nashik & Trimbakeshwar.",
    keywords: keywordsArray,
  });
}

const HolidayPackagesPage = async ({ params }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HolidayPackages" });

  // Parse the popular destinations list to display inside our badge layout section
  const rawDestinations = t.raw("content.popularDestinations");
  const serviceList = Array.isArray(rawDestinations)
    ? rawDestinations.map((destinationName) => ({ listName: destinationName }))
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
        statNum="TOUR"
        statText={t("content.statText")}
        image={holidayPackages}
      />
    </main>
  );
};

export default HolidayPackagesPage;
