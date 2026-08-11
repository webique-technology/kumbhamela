import { HeroHeaderCard2 } from "@/components/ui/card";
import "../../../../assets/scss/main.scss";
import "../../../../styles/aboutPage.scss";
import { ServicePageSecondSec } from "@/components/section/ServicesPagesComp";
import { getTranslations } from "next-intl/server";

import flightTicket from "../../../../assets/images/flight-ticketing.jpg";

import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FlightTicketing" });

  const keywordsString = t("meta.keywords");
  const keywordsArray = keywordsString
    ? keywordsString.split(",").map((k) => k.trim())
    : [];

  return buildPageMetadata({
    locale,
    pageSlug: "flight-ticketing",
    title: t("meta.title") || "Flight Ticketing",
    description:
      t("meta.description") ||
      "Book domestic & international flight tickets to Nashik, Mumbai, and Shirdi.",
    keywords: keywordsArray,
  });
}

const FlightTicketingPage = async ({ params }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FlightTicketing" });

  // Parse the flights offering list to display inside our badge layout section
  const rawOfferings = t.raw("content.whatWeProvide");
  const serviceList = Array.isArray(rawOfferings)
    ? rawOfferings.map((offeringName) => ({ listName: offeringName }))
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
        statNum="BEST"
        statText={t("content.statText")}
        image={flightTicket}
      />
    </main>
  );
};

export default FlightTicketingPage;
