import { HeroHeaderCard2 } from "@/components/ui/card";
import "../../../../assets/scss/main.scss";
import "../../../../styles/aboutPage.scss";
import { ServicePageSecondSec } from "@/components/section/ServicesPagesComp";
import { getTranslations } from "next-intl/server";

import hotelReserv from "../../../../assets/images/hotel-reservations.jpg";

import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HotelReservations" });

  const keywordsString = t("meta.keywords");
  const keywordsArray = keywordsString
    ? keywordsString.split(",").map((k) => k.trim())
    : [];

  return buildPageMetadata({
    locale,
    pageSlug: "hotel-reservation",
    title: t("meta.title") || "Hotel Reservations",
    description:
      t("meta.description") ||
      "Book hotels, ashrams, and resort reservations in Nashik & Trimbakeshwar.",
    keywords: keywordsArray,
  });
}

const HotelReservationsPage = async ({ params }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HotelReservations" });

  // Parse the hotel types list to display inside our badge layout section
  const rawOptions = t.raw("content.chooseFrom");
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
        statNum="STAY"
        statText={t("content.statText")}
        image={hotelReserv}
      />
    </main>
  );
};

export default HotelReservationsPage;
