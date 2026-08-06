"use client";
import React, { useState, useEffect } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { SwiperSliderComp, TitleComponent } from "../ui/common";
import { SwiperSlide } from "swiper/react";
import {
  MessageCircle,
  MapPin,
  Star,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";
import { BookingForm } from "../ui/bookingFormHandler";
import { Link, usePathname } from "@/i18n/routing";
import { slugify } from "@/lib/utils";
import "../../styles/servicesSec.scss";
import { useTranslations } from "next-intl";
import { getHotels } from "@/app/[locale]/hotel/hotelApi";
import { getCars } from "@/app/[locale]/rental-car/carApi";
import { getTours } from "@/app/[locale]/tour-package/tourApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import { WhatsAppCardDataShareBtn } from "../ui/button";

// Note: Ensure your local static images are placed inside the Next.js `public/` directory
// e.g., public/images/delux-tent.webp -> referenced as "/images/delux-tent.webp"
import deluxTent from "../../assets/images/delux-tent.webp";
import premiumTent from "../../assets/images/premium-tent.webp";
import economyCottage from "../../assets/images/economy-cottage.webp";
import dormitoryCottage from "../../assets/images/dormitory-cottage.webp";

const UnifiedServiceCard = ({ type, item, onBook, t }) => {
  const cardTitle = type === "car" ? item.name : item.title || item.name;

  const cardImage =
    item.image_url || item.images?.[0] || "/images/banner-1.webp";

  const cardCategory =
    type === "hotel"
      ? item.category || t("accommodationTitle")
      : type === "car"
        ? item.category?.category || t("vehicleFallback")
        : type === "tent"
          ? item.category || "Camping"
          : t("tourPackageLabel");

  const rawPrice = item.base_price || item.price || 0;
  const displayPrice = !isNaN(Number(rawPrice))
    ? Number(rawPrice).toFixed(2)
    : rawPrice;

  return (
    <div className="card h-100 border-0 shadow-sm hotel-card overflow-hidden rounded-4 bg-white">
      {/* Top Image Track Area */}
      <div className="position-relative">
        <div
          className="position-relative hotel-img-container"
          style={{
            aspectRatio: type === "car" ? "null" : "4/3",
            scale: type === "car" ? "0.9" : "null",
            overflow: "hidden",
          }}
        >
          {item.images && item.images.length > 1 ? (
            <SwiperSliderComp navigation={false} loop={true} timeDelay={3500}>
              {item.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <Image
                    src={img}
                    alt={cardTitle}
                    width={400}
                    height={300}
                    className="w-100 h-100 object-fit-cover"
                    priority={idx === 0}
                  />
                </SwiperSlide>
              ))}
            </SwiperSliderComp>
          ) : (
            <Image
              src={cardImage}
              alt={cardTitle}
              width={400}
              height={300}
              className="w-100 h-100 object-fit-cover"
              priority
            />
          )}
        </div>

        {/* Left Floating Category Tag */}
        <div className="position-absolute top-0 start-0 m-3 z-2">
          <span className="primary-bg small-12 rounded-pill px-2 py-1 text-white">
            {cardCategory}
          </span>
        </div>

        {(type === "car" || type === "hotel" || type === "tent") && (
          <div className="position-absolute z-3 top-0 end-0 m-3">
            <WhatsAppCardDataShareBtn data={item} type={type} mode="icon" />
          </div>
        )}
      </div>

      {/* Middle Card Details Body */}
      <div className="card-body d-flex flex-column justify-content-between" style={{padding:"18px"}}>
        <div className="border-bottom pb-2 mb-2 d-grid">
          <h3
            className="h4 fw-bold text-brand-dark mb-2 text-truncate"
            title={cardTitle}
          >
            {cardTitle}
          </h3>

          {/* Context Specific Sub-Metadata */}
          <div
            className={`${
              type === "tent"
                ? "d-flex align-items-center justify-content-between gap-1 flex-wrap"
                : "d-flex align-items-center gap-1"
            } text-muted small mb-3`}
          >
            {(type === "hotel" || type === "tent") && (
              <div className="d-flex align-items-center gap-2">
                <MapPin size={16} className="text-secondary opacity-70" />
                <span className="text-secondary text-truncate">
                  {item.location || "Nashik, Maharashtra"}
                </span>
              </div>
            )}

            {type === "tent" &&
              item.facilities &&
              Array.isArray(item.facilities) && (
                <div className="d-flex align-items-center gap-1 flex-wrap mt-2">
                  {item.facilities.map((facility, idx) => (
                    <span
                      key={idx}
                      className="badge bg-light py-1 text-dark border font-normal small-11 rounded-2 fw-normal"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              )}

            {type === "car" && (
              <div className="d-flex align-items-center gap-2">
                <Users size={16} className="text-secondary opacity-70" />
                <span className="text-secondary">
                  {item.total_seats || item.seats || 4} {t("seaterCapacity")}
                </span>
              </div>
            )}

            {type === "tour" && (
              <div className="d-flex align-items-center gap-2">
                <Clock size={16} className="text-secondary opacity-70" />
                <span className="text-secondary">
                  {item.duration || t("customDuration")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Pricing & CTA */}
        <div className="d-flex align-items-center justify-content-between pt-2 mt-auto border-top-0">
          <div className="d-flex flex-column">
            <span className="fw-semibold text-brand-orange my-1">
              ₹ {displayPrice}
            </span>
          </div>

          {/* Booking Button */}
          {type === "tour" ? (
            <Link
              href={`/tour-package/${item.slug}`}
              className="service-btn text-decoration-none d-flex justify-content-center align-items-center mt-auto"
            >
              <span>{t("viewDetails")}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={onBook}
              className="btn whatsapp-btn d-flex align-items-center gap-2 px-3 py-2 text-white border-0 shadow-sm rounded-pill fw-bold"
            >
              <MessageCircle size={14} />
              <span className="text-light small-12">{t("bookNow")}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ServicesTabSec = () => {
  const t = useTranslations("ServicesTab");

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [selectedTentId, setSelectedTentId] = useState(null);

  const tentData = [
    {
      id: 101,
      title: t("tent101_title"),
      base_price: 5500,
      // description: t("capacity3Person"),
      category: t("categoryLuxuryTent"),
      location: t("nashikLocation"),
      image_url: deluxTent.src,
      facilities: [
        t("facility_ac"),
        t("facility_attachedBath"),
        t("facility_wifi"),
      ],
    },
    {
      id: 102,
      title: t("tent102_title"),
      base_price: 4000,
      // description: t("capacity4Person"),
      category: t("categoryPremiumTent"),
      location: t("nashikLocation"),
      image_url: premiumTent.src,
      facilities: [
        t("facility_attachedBath"),
        t("facility_meals"),
        t("facility_wifi"),
      ],
    },
    {
      id: 103,
      title: t("tent103_title"),
      base_price: 2000,
      // description: t("capacity2Person"),
      category: t("categoryCottage"),
      location: t("nashikLocation"),
      image_url: economyCottage.src,
      facilities: [
        t("facility_bed"),
        t("facility_charging"),
        t("facility_attachedBath"),
      ],
    },
    {
      id: 104,
      title: t("tent104_title"),
      base_price: 4000,
      // description: t("capacity4Person"),
      category: t("categoryDormitory"),
      location: t("nashikLocation"),
      image_url: dormitoryCottage.src,
      facilities: [
        t("facility_locker"),
        t("facility_charging"),
        t("facility_wifi"),
      ],
    },
  ];

  const handleOpenBooking = (item, type) => {
    setSelectedItem(item.name || item.title);

    if (type === "hotel") {
      setSelectedHotelId(item.id);
      setSelectedCarId(null);
      setSelectedTentId(null);
    }

    if (type === "car") {
      setSelectedCarId(item.id);
      setSelectedHotelId(null);
      setSelectedTentId(null);
    }

    if (type === "tent") {
      setSelectedTentId(item.id);
      setSelectedCarId(null);
      setSelectedHotelId(null);
    }

    setShow(true);
  };

  const [activeTab, setActiveTab] = useState("tour-package");
  const pathname = usePathname();

  const [tours, setTours] = useState([]);
  const [cars, setCars] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const locale = params.locale;

  const tabData = [
    {
      key: "tour-package",
      title: t("tourPackagesTitle"),
      mapData: tours,
      type: "tour",
    },
    {
      key: "rental-car",
      title: t("rentalCarTitle"),
      mapData: cars,
      type: "car",
    },
    {
      key: "hotel",
      title: t("accommodationTitle"),
      mapData: hotels,
      type: "hotel",
    },
    {
      key: "tent",
      title: t("tentTitle"),
      mapData: tentData,
      type: "tent",
    },
  ];

  useEffect(() => {
    fetchData();
  }, [locale]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tourRes, carRes, hotelRes] = await Promise.all([
        getTours(1, "", "", "", 6, locale),
        getCars(1, "", "", "", 6),
        getHotels(1, "", "", "", 6),
      ]);
      setTours(tourRes || []);
      setCars(carRes || []);
      setHotels(hotelRes || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding-2 pt-5 position-relative trinery-bg services-section">
      <Container>
        <Tab.Container
          key={pathname + activeTab}
          id="services-tabs"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
        >
          <Row>
            <Col
              xs={12}
              className="d-flex flex-column mb-4 mb-sm-5 align-items-center justify-content-between"
            >
              <TitleComponent
                title={
                  tabData.find((t) => t.key === activeTab)?.title ||
                  "Our Services"
                }
                className="text-center"
                divider={false}
                montezSubTitle={t("montezSubTitle")}
                montezClass="playfair-display primery-color d-none d-md-block"
              />

              <Nav
                variant="pills"
                className="flex-row gap-2 mt-3 justify-content-center nav-tab-count"
              >
                {tabData.map((item) => (
                  <Nav.Item key={item.key}>
                    <Nav.Link eventKey={item.key}>{item.title}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>

            <Col xs={12}>
              <Tab.Content>
                {tabData.map((tab) => (
                  <Tab.Pane key={tab.key + activeTab} eventKey={tab.key}>
                    {tab.mapData && tab.mapData.length > 0 ? (
                      <SwiperSliderComp
                        breakpoints={{
                          0: { slidesPerView: 1.25, spaceBetween: 20 },
                          576: { slidesPerView: 2, spaceBetween: 20 },
                          768: { slidesPerView: 2.25, spaceBetween: 20 },
                          992: { slidesPerView: 3, spaceBetween: 20 },
                          1366: { slidesPerView: 4, spaceBetween: 20 },
                          1400: { slidesPerView: 4, spaceBetween: 20 },
                        }}
                        loop={tab.mapData.length >= 4}
                        navigation={false}
                        className={`mySwiper`}
                        disableAutoplay={true}
                      >
                        {tab.mapData.map((item, i) => (
                          <SwiperSlide key={i} className="h-auto">
                            <UnifiedServiceCard
                              type={tab.type}
                              item={item}
                              onBook={() => handleOpenBooking(item, tab.type)}
                              t={t}
                            />
                          </SwiperSlide>
                        ))}
                      </SwiperSliderComp>
                    ) : (
                      <div className="text-center py-5 text-muted fw-medium">
                        {loading ? t("loading") : t("noItems")}
                      </div>
                    )}
                  </Tab.Pane>
                ))}

                {activeTab === "tent" ? (
                  <div className="pb-5 pb-lg-4"></div>
                ) : (
                  <div className="w-100 text-center">
                    <Link
                      href={
                        activeTab === "hotel"
                          ? "/hotel"
                          : activeTab === "rental-car"
                            ? "/rental-car"
                            : "/tour-package"
                      }
                      className="primery-btn mt-5 text-white text-decoration-none d-inline-flex align-items-center gap-2"
                    >
                      {t("viewAll")}
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                )}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>

      <BookingForm
        show={show}
        handleClose={() => setShow(false)}
        type={
          activeTab === "hotel"
            ? "hotel"
            : activeTab === "tent"
              ? "tent"
              : "car"
        }
        selectedItem={selectedItem}
        hotelId={selectedHotelId}
        carId={selectedCarId}
      />
      <div
        className="bottom-divider bd-light-bg position-absolute bottom-0"
        style={{ bottom: "-40px" }}
      ></div>
    </section>
  );
};

export default ServicesTabSec;
