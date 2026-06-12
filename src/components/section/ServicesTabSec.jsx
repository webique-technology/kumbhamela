"use client";
import React, { useState, useEffect } from 'react';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { SwiperSliderComp, TitleComponent } from '../ui/common';
import { HotelCards, RentalCarCard, TourPackageCard } from '../ui/card';
// import { hotels, rentalCar, tourPackages } from '@/lib/data';
import { SwiperSlide } from 'swiper/react';
import { PrimeryBtn, WhatsappBtn } from '../ui/button';
import { MessageCircle, MapPin, Star, Clock, Users, ArrowRight } from 'lucide-react'
import { BookingForm } from '../ui/bookingFormHandler';
import { Link, usePathname } from '@/i18n/routing';
import { slugify } from '@/lib/utils';
import "../../styles/servicesSec.scss"
import { getHotels } from '@/app/[locale]/hotel/hotelApi';
import { getCars } from '@/app/[locale]/rental-car/carApi';
import { getTours } from '@/app/[locale]/tour-package/tourApi';
import Image from 'next/image';


const UnifiedServiceCard = ({ type, item, onBook }) => {
    // 1. Dynamic Attribute Resolvers across distinct API schemas
    const cardTitle = type === "car" ? item.name : (item.title || item.name);
    const cardImage = item.image_url || item.images?.[0] || "/images/banner-1.webp";

    const cardCategory = type === "hotel"
        ? item.category
        : type === "car"
            ? (item.category?.category || "Vehicle")
            : "Tour Package";

    const displayPrice = Number(item.base_price || item.price || 0).toFixed(2);

    const pricingFooterLabel = type === "hotel"
        ? "per night"
        : type === "car"
            ? "per km"
            : "per person";

    return (
        <div className="card h-100 border-0 shadow-sm hotel-card overflow-hidden rounded-4 bg-white">

            {/* Top Image Track Area */}
            <div className="position-relative hotel-img-container" style={{ aspectRatio: type === "car" ? 'null' : '4/3', overflow: 'hidden' }}>
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

                {/* Left Floating Category Tag */}
                <div className="position-absolute top-0 start-0 m-3 z-2">
                    <span className="primary-bg rounded-pill px-2 py-1 text-white">
                        {cardCategory}
                    </span>
                </div>

                {/* Right Floating Star Rating (Rendered for Hotels or Tours) */}
                {(item.rating || type === "hotel") && (
                    <div className="position-absolute top-0 end-0 m-3 badge rounded-pill bg-white text-dark d-flex align-items-center gap-1 px-3 py-2 shadow-sm z-2">
                        <Star size={14} className="text-warning fill-warning" />
                        <span className="fw-bold text-dark">{Number(item.rating || 4.0).toFixed(1)}</span>
                    </div>
                )}
            </div>

            {/* Middle Card Details Body */}
            <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div>
                    <h3 className="h4 fw-bold text-brand-dark mb-2 text-truncate" title={cardTitle}>
                        {cardTitle}
                    </h3>

                    {/* Context Specific Sub-Metadata Footer Strings */}
                    <div className="d-flex align-items-center gap-1 text-muted small mb-3">
                        {type === "hotel" && (
                            <>
                                <MapPin size={16} className="text-secondary opacity-70" />
                                <span className="text-secondary text-truncate">{item.location || "Nashik, Maharashtra"}</span>
                            </>
                        )}
                        {type === "car" && (
                            <>
                                <Users size={16} className="text-secondary opacity-70" />
                                <span className="text-secondary">{item.total_seats || item.seats || 4} Seater Capacity</span>
                            </>
                        )}
                        {type === "tour" && (
                            <>
                                <Clock size={16} className="text-secondary opacity-70" />
                                <span className="text-secondary">{item.duration || "Custom Days"} Duration</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Bottom Pricing & CTA Layout Track */}
                <div className="d-flex align-items-center justify-content-between pt-2 mt-auto border-top-0">
                    <div className="d-flex flex-column">
                        {/* <small className="text-muted smaller lh-sm">Starting from</small> */}
                        <span className="fw-semibold text-brand-orange my-1">
                            ₹ {displayPrice}
                        </span>
                        {/* <small className="text-muted smaller lh-sm">{pricingFooterLabel}</small> */}
                    </div>

                    {/* Integrated Booking Interaction Node */}
                    {type === "tour" ? (
                        /* 1. VIEW DETAILS LINK - Exclusively for Tour Packages */
                        <Link
                            href={`/tour-package/${slugify(cardTitle || "")}`}
                            className="service-btn text-decoration-none d-flex justify-content-center align-items-center mt-auto"
                        >
                            <span>View Details</span>
                        </Link>
                    ) : (
                        /* 2. WHATSAPP BOOK NOW BUTTON - For Hotels & Car Rental Fleets */
                        <button
                            type="button"
                            onClick={onBook}
                            className="btn whatsapp-btn d-flex align-items-center gap-2 px-3 py-2 text-white border-0 shadow-sm rounded-pill fw-bold"
                        >
                            <MessageCircle size={18} />
                            <span className="text-light">Book Now</span>
                        </button>
                        // <WhatsappBtn
                        //     type="button"
                        //     onClick={onBook}
                        //     iconLeft={<MessageCircle size={18} />}
                        //     className={"whatsapp-btn"}
                        //     title={"book"}
                        // />
                    )}
                </div>
            </div>

        </div>
    );
};

const ServicesTabSec = () => {
    const [show, setShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedHotelId, setSelectedHotelId] = useState(null);
    const [selectedCarId, setSelectedCarId] = useState(null);

    const handleOpenBooking = (item, type) => {
        setSelectedItem(item.name || item.title); // Fallback string protection

        if (type === "hotel") {
            setSelectedHotelId(item.id);
            setSelectedCarId(null);
        }

        if (type === "car") {
            setSelectedCarId(item.id);
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

    const tabData = [
        {
            key: "tour-package",
            title: "Tour Packages",
            mapData: tours,
            type: "tour"
        },
        {
            key: "rental-car",
            title: "Rental Car",
            mapData: cars,
            type: "car"
        },
        {
            key: "hotel",
            title: "Accommodation",
            mapData: hotels,
            type: "hotel"
        }
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            const [tourRes, carRes, hotelRes] = await Promise.all([
                getTours(1, "", "", "", 6),
                getCars(1, "", "", "", 6),
                getHotels(1, "", "", "", 6)
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

    const activeTabData = tabData.find(tab => tab.key === activeTab);

    return (
        <section className='section-padding-2 pt-5 position-relative trinery-bg  services-section'>
            {/* <div className="bottom-divider position-absolute top-0"></div> */}
            <Container>
                <Tab.Container
                    key={pathname + activeTab}
                    id="services-tabs"
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                >
                    <Row>
                        <Col xs={12} className='d-flex flex-column mb-4 mb-sm-5 align-items-center justify-content-between'>
                            <TitleComponent
                                title={tabData.find(t => t.key === activeTab)?.title || "Our Services"}
                                className='text-center'
                                divider={false}
                                montezSubTitle={"Our Services"}
                                montezClass='playfair-display primery-color d-none d-md-block'
                            />

                            <Nav variant="pills" className="flex-row gap-2 mt-3 justify-content-center nav-tab-count">
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
                                        {/* CRITICAL FIX: Only mount Swiper component when mapData has elements loaded */}
                                        {tab.mapData && tab.mapData.length > 0 ? (
                                            <SwiperSliderComp
                                                breakpoints={{
                                                    0: {
                                                        slidesPerView: 1.25,
                                                        spaceBetween: 20
                                                    },
                                                    576: {
                                                        slidesPerView: 2,
                                                        spaceBetween: 20
                                                    },
                                                    768: {
                                                        slidesPerView: 2.25,
                                                        spaceBetween: 20
                                                    },
                                                    992: {
                                                        slidesPerView: 3,
                                                        spaceBetween: 20
                                                    },
                                                    1366: {
                                                        slidesPerView: 4,
                                                        spaceBetween: 20
                                                    },
                                                    1400: {
                                                        slidesPerView: 4,
                                                        spaceBetween: 20
                                                    },
                                                }}
                                                loop={tab.mapData.length >= 4} // Dynamically scale loops to avoid loop errors if items are fewer than slidesPerView
                                                navigation={false}
                                                className={`mySwiper`}
                                                disableAutoplay={true}
                                            >
                                                {tab.mapData.map((item, i) => {
                                                    let backgroundImagePath = "";
                                                    // check if the images have array
                                                    if (tab.type === "hotel") {
                                                        backgroundImagePath =
                                                            item.image_url ||
                                                            item.images?.[0];
                                                    }

                                                    if (tab.type === "car") {
                                                        backgroundImagePath =
                                                            item.image_url;
                                                    }

                                                    if (tab.type === "tour") {
                                                        backgroundImagePath =
                                                            item.image_url ||
                                                            item.images?.[0];
                                                    }
                                                    return (
                                                        <SwiperSlide key={i}>
                                                            {/* <div className="service-item-card d-flex align-itemx-end"
                                                                style={{ backgroundImage: `url(${backgroundImagePath})` }}
                                                            >
                                                                <div className="service-item-card-content w-100 d-flex flex-column justify-content-end z-3">
                                                                    
                                                                    <div className="badge service-item-badge">
                                                                        {tab.type === "hotel" && item.category}
                                                                        {tab.type === "car" && item.category?.category}
                                                                        {tab.type === "tour" && "Tour Package"}
                                                                    </div>
                                                                    <h2 className="service-item-card-title text-light">{
                                                                        tab.type === "tour" || tab.type === "hotel"
                                                                            ? item.title
                                                                            : item.name
                                                                    }</h2>
                                                                    <div className='d-flex align-items-center justify-content-between mt-2'>
                                                                        <h4 className="service-item-card-text text-light">From :
                                                                            ₹{
                                                                                (
                                                                                    item.base_price ||
                                                                                    item.price ||
                                                                                    0
                                                                                ).toLocaleString()
                                                                            }
                                                                        </h4>

                                                                    </div>
                                                                    <span className='card-divider my-3'></span>
                                                                    <div className='d-flex align-items-center justify-content-between'>
                                                                        <span className='text-light d-flex align-items-center gap-1 service-item-card-text'>
                                                                            {tab.key === "tour-package" && (
                                                                                <>
                                                                                    <Clock size={16} />
                                                                                    {item.duration}
                                                                                </>
                                                                            )}

                                                                            {tab.key === "rental-car" && (
                                                                                <>
                                                                                    <Users size={16} />
                                                                                    {item.total_seats} Seater
                                                                                </>
                                                                            )}

                                                                            {tab.key === "hotel" && (
                                                                                <>
                                                                                    <MapPin size={16} />
                                                                                    {item.location}
                                                                                </>
                                                                            )}
                                                                        </span>
                                                                        {tab.key === "tour-package" && (
                                                                            <Link
                                                                                href={`/tour-package/${slugify(item.title || "")}`}
                                                                                className="service-btn text-decoration-none d-flex justify-content-center align-items-center mt-auto"
                                                                            >
                                                                                View Details
                                                                            </Link>
                                                                        )}

                                                                        {(tab.key === "rental-car" || tab.key === "hotel") && (
                                                                            <button
                                                                                type='button'
                                                                                onClick={() =>
                                                                                    handleOpenBooking(
                                                                                        item,
                                                                                        tab.type
                                                                                    )
                                                                                }
                                                                                className="service-btn"
                                                                            >Book Now</button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                            <UnifiedServiceCard
                                                                type={tab.type}
                                                                item={item}
                                                                onBook={() => handleOpenBooking(item, tab.type)}
                                                            />
                                                        </SwiperSlide>
                                                    )
                                                })}
                                            </SwiperSliderComp>
                                        ) : (
                                            /* Simple UI skeleton placeholder or text while data fetches to prevent layout shift */
                                            <div className="text-center py-5 text-muted">
                                                {loading ? "Loading available listings..." : "No items found."}
                                            </div>
                                        )}
                                    </Tab.Pane>
                                ))}

                                <PrimeryBtn
                                    title="View All"
                                    btnLink={
                                        activeTab === "hotel"
                                            ? "/hotel"
                                            : activeTab === "rental-car"
                                                ? "/rental-car"
                                                : "/tour-package"
                                    }
                                    className="primery-btn mt-5"
                                    iconRight={<ArrowRight size={20} />}
                                />

                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>

            <BookingForm
                show={show}
                handleClose={() => setShow(false)}
                type={activeTab === "hotel" ? "hotel" : "car"}
                selectedItem={selectedItem}
                hotelId={selectedHotelId}
                carId={selectedCarId}
            />
            <div className="bottom-divider bd-light-bg position-absolute bottom-0" style={{ bottom: '-40px' }}></div>
        </section >
    );
};

export default ServicesTabSec;