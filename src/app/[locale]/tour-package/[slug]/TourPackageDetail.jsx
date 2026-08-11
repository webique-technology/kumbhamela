"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import * as Icons from "lucide-react";
import {
  Circle,
  FileText,
  CalendarCheck,
  ArrowLeft,
  Hotel,
  Utensils,
  Plane,
  Trees,
  Bus,
  TramFront,
  HelpCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { slugify, imageUrl } from "@/lib/utils";
import { WhatsAppShareBtn } from "@/components/ui/button";
import { HighlightsModal, TourTabs } from "@/components/ui/common";
import { TourPackageSlider } from "@/components/ui/TourPackageSlider";
import { tourPackages } from "@/lib/data";
import {
  getCancellationPolicy,
  getPaymentPolicy,
  getTours,
  getTourBySlug,
} from "../tourApi";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const getInclusionIcon = (item) => {
  // 1. First check if there's an explicit English key or icon identifier
  const iconKey = typeof item === "object" ? item?.in_icon || item?.key || item?.id : null;
  
  // 2. Extract the display string (either translated or raw English)
  const rawText = typeof item === "string" ? item : item?.label || item?.title || item?.in_icon || "";
  
  console.log(item);
  

  // Normalize string for lowercased checks
  const searchKey = (iconKey || rawText).trim().toLowerCase();

  if (!searchKey) return HelpCircle;

  // ----------------------------------------------------
  // MULTI-LANGUAGE KEYWORD MATCHING DICTIONARY
  // ----------------------------------------------------
  
  // HOTEL: English, Hindi, Marathi, Gujarati, Tamil, Telugu, Malayalam, Sanskrit
  const hotelKeywords = ["hotel", "हॉटेल", "होटल", "હોટેલ", "ஹோட்டல்", "హోటల్", "ഹോട്ടൽ", "होटल-", "वसतिगृह"];
  if (hotelKeywords.some((kw) => searchKey.includes(kw))) {
    return Hotel;
  }

  // MEALS / FOOD: English, Hindi, Marathi, Gujarati, Tamil, Telugu, Malayalam, Sanskrit
  const mealKeywords = ["meal", "food", "अन्न", "जेवण", "भोजन", "ભોજન", "சாப்பாடு", "భోజనం", "ഭക്ഷണം", "आहार", "उत्स"];
  if (mealKeywords.some((kw) => searchKey.includes(kw))) {
    return Utensils;
  }

  // FLIGHT: English, Hindi, Marathi, Gujarati, Tamil, Telugu, Malayalam, Sanskrit
  const flightKeywords = ["flight", "plane", "विमान", "फ्लाईट", "ફ્લાઇટ", "விமானம்", "విమాన", "വിമാനം", "उड्डयन"];
  if (flightKeywords.some((kw) => searchKey.includes(kw))) {
    return Plane;
  }

  // SIGHTSEEING: English, Hindi, Marathi, Gujarati, Tamil, Telugu, Malayalam, Sanskrit
  const sightseeingKeywords = ["sightseeing", "दर्शनीय", "दर्शन", "देखने", "સ્થળો", "சுற்றுலா", "சுற்றிப்பார்த்தல்", "సందర్శనా స్థలం", "കാഴ്ചകൾ", "पर्यटन", "परि- ईक्ष्"];
  if (sightseeingKeywords.some((kw) => searchKey.includes(kw))) {
    return Trees;
  }

  // TRANSPORT / BUS: English, Hindi, Marathi, Gujarati, Tamil, Telugu, Malayalam, Sanskrit
  const transportKeywords = ["transport", "bus", "वाहतूक", "परिवहन", "પરિવહન", "போக்குவரத்து", "రవాణా", "ഗതാഗതം", "यातायात", "बस", "बसों", "બસો", "பேருந்து", "బస్సులు", "ബസുകൾ"];
  if (transportKeywords.some((kw) => searchKey.includes(kw))) {
    return Bus;
  }

  // TRAIN / RAILWAYS: English, Hindi, Marathi, Gujarati, Tamil, Telugu, Malayalam, Sanskrit
  const trainKeywords = ["train", "rail", "रेल", "रेल्वे", "રેલવે", "ரயில்", "రైలు", "ട്രെയിൻ", "लोहपथగామీ"];
  if (trainKeywords.some((kw) => searchKey.includes(kw))) {
    return TramFront;
  }

  // Default fallback if no language match is found
  return HelpCircle;
};

const TourPackageDetail = ({ tour }) => {
  const t = useTranslations();
  const [cancellationPolicy, setCancellationPolicy] = useState([]);
  const [paymentPolicy, setPaymentPolicy] = useState([]);
  const [recentPackages, setRecentPackages] = useState([]);
  const params = useParams();
  const locale = params.locale;

  const [expandedItems, setExpandedItems] = useState({});
  const loadMore = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  //   console.log(tour);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cancelData, paymentData, toursData] = await Promise.all([
          getCancellationPolicy(locale),
          getPaymentPolicy(),
          getTours(1, "", "", "", "", locale),
        ]);

        setCancellationPolicy(cancelData || []);
        setPaymentPolicy(paymentData || []);

        const filteredTours = (toursData?.data || toursData || []).filter(
          (item) => item.id !== tour.id,
        );

        setRecentPackages(filteredTours);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [tour.id]);

  return (
    <main>
      {/* HERO SECTION */}
      <section
        className="tour-pack-detail-sec d-flex flex-column align-items-end justify-content-between position-relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${tour.image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh",
        }}
      >
        <Container className="pt-4 mb-5">
          <div className="w-max">
            <Link
              href="/tour-package"
              className="border position-relative btn primery-btn d-flex align-items-center gap-2 p-1 px-2 rounded-pill"
            >
              <ArrowLeft size={15} />
              <p className="m-0">{t("TourDetail.backBtn")}</p>
            </Link>
          </div>
        </Container>
        <Container className="hero-content pb-3 pb-md-4">
          <div className="tag mb-3">✨ {tour.duration}</div>

          <h1 className="display-4 fw-bold text-white">{tour.title}</h1>

          {/* <p className="d-none d-lg-block fs-6 lead text-white-75">
                        {tour.description}
                    </p> */}
          <div
            className="d-none d-lg-block fs-6 mb-2 lead text-white-75"
            dangerouslySetInnerHTML={{
              __html: tour.description || "",
            }}
          />
          {tour?.routes?.length > 0 && (
            <ul className="d-none px-2 m-0 bg-light tour-route d-md-flex flex-wrap justify-content-start align-items-center">
              {(tour.routes || []).map((route, i) => (
                <li
                  key={i}
                  className="p-1 small-12 rounded bg-primery-color text-decoration-none text-dark"
                >
                  {route} &nbsp; {i !== (tour.routes?.length || 0) - 1 && "---"}
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* MAIN CONTENT */}
      <Container className="main-section pb-0 pt-0">
        <Row className="gy-1 gy-md-4 gy-xl-5 m-0">
          {/* LEFT CONTENT */}
          <Col lg={8}>
            <div className="">
              <p
                className="lead text-dark fs-6 d-block d-lg-none my-2 pb-2"
                dangerouslySetInnerHTML={{
                  __html: tour.description || "",
                }}
              />
              {/* {tour.description}
                            </p> */}
              {tour?.routes?.length > 0 && (
                <ul className="d-block d-md-none px-2 my-2 m-0 bg-light tour-route d-flex flex-wrap justify-content-start align-items-center">
                  {(tour.routes || []).map((route, i) => (
                    <li
                      key={i}
                      className="p-1 small-12 rounded bg-primery-color text-decoration-none text-dark"
                    >
                      {route} &nbsp;{" "}
                      {i !== (tour.routes?.length || 0) - 1 && "---"}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="trinery-bg p-3 mt-4 mt-md-0 rounded-2 shadow-sm">
              <Row>
                {/* EXPERIENCE INCLUSIONS */}
                <Col md={6} className="border-md-end m-0">
                  {tour.inclusions && tour.inclusions.length > 0 && (
                    <div className="section-block m-0">
                      <h4 className="section-title fw-bold mb-4 h6 text-capitalize">
                        {t("TourDetail.includes")}
                      </h4>

                      <div className="d-flex flex-row flex-wrap justify-content-start gap-3 mb-3 mb-md-0">
                        {(tour.inclusions || []).map((item, i) => {
                          const IconComponent = getInclusionIcon(item);

                          return (
                            <div
                              key={i}
                              className="inclusion-item d-flex flex-column align-items-center"
                            >
                              <span className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{width:"40px", height:"40px"}}>
                                <IconComponent
                                  size={24}
                                  className="primery-color"
                                />
                              </span>

                              <p className="m-0 small-12 text-center">
                                {typeof item === "object"
                                  ? item.label || item.title
                                  : item}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Col>

                {/* TOUR HIGHLIGHTS */}
                <Col md={6} className="pt-4 pt-md-0">
                  <div className="section-block m-0">
                    <h4 className="section-title fw-bold mb-4 h6 text-capitalize">
                      {t("TourDetail.highlights")}
                    </h4>

                    <Row>
                      {(tour.highlights || []).slice(0, 4).map((item, i) => (
                        <Col xs={12} key={i}>
                          <div className="p-1 rounded h-100 d-flex flex-row justify-content-start align-items-center gap-2 text-start">
                            <Circle size={10} className="primery-color" />

                            <p className="m-0">{item}</p>
                          </div>
                        </Col>
                      ))}
                    </Row>

                    <HighlightsModal>
                      {(tour.highlights || []).map((item, i) => (
                        <div
                          key={i}
                          className="p-1 rounded h-100 d-flex flex-row justify-content-start align-items-center gap-2 text-start"
                        >
                          <Circle size={10} className="primery-color" />

                          <p className="m-0">{item}</p>
                        </div>
                      ))}
                    </HighlightsModal>
                  </div>
                </Col>
              </Row>
            </div>

            {/* ITINERARY */}
            {tour.itineraries && tour.itineraries.length > 0 && (
              <div className="section-block mb-0 mt-4">
                <h4 className="section-title fw-bold mb-2">
                  {t("TourDetail.itinerary")}
                </h4>

                {(tour.itineraries || []).map((day, i) => (
                  <div
                    key={day.id}
                    className={`timeline-item mb-0 position-relative ps-0 ps-sm-4 ${
                      i !== (tour.itineraries?.length || 0) - 1 ? "pb-4" : ""
                    }`}
                  >
                    <div className="timeline-dot"></div>

                    <Row className="align-items-start">
                      <Col md={9}>
                        <span className="badge bg-brand-light primery-color ms-2 ms-sm-0">
                          {t("TourDetail.day")} {i + 1}
                          {/* {i + 1} */}
                        </span>

                        <h5 className="fw-bold sub-heading text-dark">
                          {day.itinerary_title}
                        </h5>

                        {/* <p
                                                        className={`text-secondary ${expandedItems[i] ? "" : "line-clamp-5"
                                                            }`}
                                                    >
                                                        {day.description || ""}
                                                    </p> */}
                        <div
                          className={`text-secondary ${expandedItems[i] ? "" : "line-clamp-5"}`}
                          dangerouslySetInnerHTML={{
                            __html: day.description || "",
                          }}
                        />

                        {day.description?.length > 261 && (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => loadMore(i)}
                            className="primery-btn py-1 px-2 small-12 rounded-2"
                          >
                            {expandedItems[i]
                              ? t("TourDetail.showLess")
                              : t("TourDetail.loadMore")}
                          </motion.button>
                        )}
                      </Col>

                      <Col md={3}>
                        {day.itineraries_image_url && (
                          <div
                            className="position-relative"
                            style={{
                              width: "100%",
                              height: "120px",
                            }}
                          >
                            <Image
                              src={imageUrl(day.itineraries_image_url)}
                              alt={day.itinerary_title || "Itinerary"}
                              fill
                              unoptimized
                              sizes="(max-width: 768px) 100vw, 25vw"
                              className="rounded shadow-sm object-fit-cover mt-3"
                            />
                          </div>
                        )}
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            )}

            {/* TABS */}
            <div className="section-block tour-tab-section mb-4 mb-md-0 mt-5 border-top pt-4">
              <TourTabs
                tour={tour}
                cancellationPolicy={cancellationPolicy}
                paymentPolicy={paymentPolicy}
              />
            </div>
          </Col>

          {/* SIDEBAR */}
          <Col lg={4}>
            <aside
              className="booking-card sticky-top mb-5 mb-md-0 z-3 p-4 rounded bg-white border"
              style={{ top: "110px" }}
            >
              <div className="d-flex align-items-center gap-2 mb-3">
                <FileText size={20} />
                <h4 className="text-start m-0">
                  {t("TourDetail.Summary.title")}
                </h4>
              </div>
              <div className="price mb-4">
                <span className="h3 fw-bold primery-color">
                  ₹ {Number(tour.base_price || 0).toLocaleString("en-IN")}
                </span>
                {/* ₹ {(tour.base_price || 0).toLocaleString()}  */}
                <span className="text-muted">
                  {" "}
                  {t("TourDetail.Summary.perPerson")}
                </span>
              </div>
              <div className="info-box mb-4 p-3 rounded">
                {/* <p className="mb-1"><strong>Group:</strong> &nbsp;2-6 People</p> */}
                <p className="mb-1">
                  <strong>{t("TourDetail.Summary.duration")} :</strong> &nbsp;
                  {tour.duration}
                </p>
                {/* <p className="mb-1"><strong>Duration:</strong> &nbsp;5 Days / 4 Nights</p> */}
                {/* <p className="departure-date m-0">
                                    <strong>Departure:</strong> &nbsp;{tour.departureDate || 'Check Availability'}
                                </p> */}
              </div>
              <Link
                href={`/tour-package/book/${slugify(tour.slug)}`}
                className="primery-btn d-flex align-items-center justify-content-center gap-2 w-100 py-3 text-center text-decoration-none fw-bold rounded shadow-sm mb-3"
              >
                <CalendarCheck size={18} />
                {t("TranslateBtn.BookNow")}
              </Link>

              <WhatsAppShareBtn tour={tour} />

              <p className="note text-center text-muted small-12 italic mt-2">
                {t("TourDetail.Summary.kumbhNote")}
              </p>
            </aside>
          </Col>

          <Col xs={12}>
            <TourPackageSlider
              packages={recentPackages}
              title="Recent Packages"
            />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default TourPackageDetail;
