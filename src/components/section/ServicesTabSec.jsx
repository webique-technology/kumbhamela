"use client";
import React, { useState, useEffect } from 'react';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { SwiperSliderComp, TitleComponent } from '../ui/common';
import { HotelCards, RentalCarCard, TourPackageCard } from '../ui/card';
// import { hotels, rentalCar, tourPackages } from '@/lib/data';
import { SwiperSlide } from 'swiper/react';
import { PrimeryBtn, WhatsappBtn } from '../ui/button';
import { MessageCircle, MapPin, Clock, Users, ArrowRight } from 'lucide-react'
import { BookingForm } from '../ui/bookingFormHandler';
import { Link, usePathname } from '@/i18n/routing';
import { slugify } from '@/lib/utils';
import "../../styles/servicesSec.scss"
import { getHotels } from '@/app/[locale]/hotel/hotelApi';
import { getCars } from '@/app/[locale]/rental-car/carApi';
import { getTours } from '@/app/[locale]/tour-package/tourApi';

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
    // const [selectedItem, setSelectedItem] = useState(null);
    // const handleOpenBooking = (selectedName) => {
    //     setSelectedItem(selectedName);
    //     setShow(true);
    // };
    const [activeTab, setActiveTab] = useState("tour-package");
    const pathname = usePathname();

    const [tours, setTours] = useState([]);
    const [cars, setCars] = useState([]);
    const [hotels, setHotels] = useState([]);

    const [loading, setLoading] = useState(true);

    // const tabData = [
    //     {
    //         key: "tour-package",
    //         title: "Tour Packages",
    //         mapData: tourPackages,
    //         // We use a function or type string to identify which card to use
    //         type: "tour"
    //     },
    //     {
    //         key: "rental-car",
    //         title: "Rental Car",
    //         mapData: rentalCar,
    //         type: "car"
    //     },
    //     {
    //         key: "hotel",
    //         title: "Accommodation",
    //         mapData: hotels,
    //         type: "hotel"
    //     }
    // ];
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

    const [isDesktop, setIsDesktop] = useState(false);

    // useEffect(() => {
    //     const handleResize = () => {
    //         setIsDesktop(window.innerWidth >= 1400);
    //     };

    //     handleResize();
    //     window.addEventListener("resize", handleResize);

    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            const [tourRes, carRes, hotelRes] = await Promise.all([
                getTours(1,"", "", "",6),
                getCars(1, "", "", "", 6),
                getHotels(1, "", "", "", 6)
            ]);
            setTours(tourRes || []);
            setCars(carRes || []);
            setHotels(hotelRes || []);

            // setTours(
            //     tourRes?.data ||
            //     tourRes?.data?.data ||
            //     []
            // );

            // setCars(
            //     carRes?.data ||
            //     carRes?.data?.data ||
            //     []
            // );

            // setHotels(
            //     hotelRes?.data ||
            //     hotelRes?.data?.data ||
            //     []
            // );
        console.log("Tours Response", tourRes);
        console.log("Cars Response", carRes);
        console.log("Hotels Response", hotelRes);

        console.log("Tours State", tours);
console.log("Cars State", cars);
console.log("Hotels State", hotels);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const activeTabData = tabData.find(tab => tab.key === activeTab);

    const shouldCenterTabs =
        activeTabData?.mapData?.length <= 5 &&
        isDesktop;
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
                                montezClass='montez-sub-heading primery-color d-none d-md-block'
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
                                                        slidesPerView: 3,
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
                                                // className={`mySwiper ${shouldCenterTabs ? "center-tabs" : ""}`}
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
                                                            {/* {renderCard(tab.type, item)} */}
                                                            <div className="service-item-card d-flex align-itemx-end"
                                                                style={{ backgroundImage: `url(${backgroundImagePath})` }}
                                                            >
                                                                <div className="service-item-card-content w-100 d-flex flex-column justify-content-end z-3">
                                                                    {/* <div className="badge service-item-badge">
                                                                        {tab.title}
                                                                    </div> */}
                                                                   <div className="badge service-item-badge">
                                                                        {tab.type === "hotel" && item.category}
                                                                        {tab.type === "car" && item.category?.category}
                                                                        {tab.type === "tour" && "Tour Package"}
                                                                    </div>
                                                                    {/* FIX: Handled item.title vs item.name discrepancy for tours & hotels */}
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
                                                                            {/* <span className='text-decoration-line-through text-light-25 ms-4'>₹1,450</span> */}
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
                                                                        {/* Case 1: Only for Tour Packages */}
                                                                        {tab.key === "tour-package" && (
                                                                            <Link
                                                                                href={`/tour-package/${slugify(item.title || "")}`}
                                                                                className="service-btn text-decoration-none d-flex justify-content-center align-items-center mt-auto"
                                                                            >
                                                                                View Details
                                                                            </Link>
                                                                        )}

                                                                        {/* Case 2: For Rental Car OR Hotel */}
                                                                        {(tab.key === "rental-car" || tab.key === "hotel") && (
                                                                            <button
                                                                                type='button'
                                                                                // Ensure your component uses onClick internally
                                                                               onClick={() =>
                                                                                    handleOpenBooking(
                                                                                        item,
                                                                                        tab.type
                                                                                    )
                                                                                }
                                                                                className="service-btn"
                                                                            >Book Now</button>
                                                                            // <WhatsappBtn
                                                                            //     type='button'
                                                                            //     // Ensure your component uses onClick internally
                                                                            //     onClick={() => handleOpenBooking(item.name)}
                                                                            //     title="Book Now"
                                                                            //     className="service-btn"
                                                                            // />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
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