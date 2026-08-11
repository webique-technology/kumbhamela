import { HeroHeaderCard2 } from "@/components/ui/card";
import "../../../../assets/scss/main.scss";
import "../../../../styles/aboutPage.scss";
import { ServicePageSecondSec } from "@/components/section/ServicesPagesComp";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

import passportAss from "../../../../assets/images/passport-assistance.jpg";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PassportAssistance" });

  const keywordsString = t("meta.keywords");
  const keywordsArray = keywordsString ? keywordsString.split(",").map((k) => k.trim()) : [];

  return buildPageMetadata({
    locale,
    pageSlug: "passport-assistance",
    title: t("meta.title") || "Passport Assistance",
    description: t("meta.description") || "Hassle-free passport application assistance and renewal support in Nashik.",
    keywords: keywordsArray,
  });
}

const PassportAssistancePage = async ({ params }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PassportAssistance" });

  // Parse the passport help offerings list to display inside our badge layout section
  const rawOptions = t.raw("content.helpWith");
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
        statNum="GOVT"
        statText={t("content.statText")}
        image={passportAss}
      />
    </main>
  );
};

export default PassportAssistancePage;
