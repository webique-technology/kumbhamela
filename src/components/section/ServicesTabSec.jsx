"use client";
import React, { useState } from 'react';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { SwiperSliderComp, TitleComponent } from '../ui/common';
import { HotelCards, RentalCarCard, TourPackageCard } from '../ui/card';
import { hotels, rentalCar, tourPackages } from '@/lib/data';
import { SwiperSlide } from 'swiper/react';
import { PrimeryBtn, WhatsappBtn } from '../ui/button';
import { MessageCircle, MapPin, Clock, Users, ArrowRight } from 'lucide-react'
import { BookingForm } from '../ui/bookingFormHandler';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import { usePathname } from 'next/navigation';


const ServicesTabSec = () => {
    const [show, setShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const handleOpenBooking = (selectedName) => {
        setSelectedItem(selectedName);
        setShow(true);
    };
    const [activeTab, setActiveTab] = useState("tour-package");
    const pathname = usePathname();

    const tabData = [
        {
            key: "tour-package",
            title: "Tour Packages",
            mapData: tourPackages,
            // We use a function or type string to identify which card to use
            type: "tour"
        },
        {
            key: "rental-car",
            title: "Rental Car",
            mapData: rentalCar,
            type: "car"
        },
        {
            key: "hotel",
            title: "Hotel & Accommodation",
            mapData: hotels,
            type: "hotel"
        }
    ];

    // Helper function to render the correct card based on type
    const renderCard = (type, data) => {
        switch (type) {
            case "tour": return <TourPackageCard tour={data} />;
            case "hotel": return <HotelCards hotel={data} />;
            case "car": return <RentalCarCard car={data} />;
            default: return null;
        }
    };

    return (
        <section className='section-padding position-relative trinery-bg services-section'>
            {/* <div className="bottom-divider position-absolute top-0"></div> */}
            <Container fluid>
                <Tab.Container
                    key={pathname + activeTab}
                    id="services-tabs"
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                >
                    <Row>
                        <Col xs={12} className='d-flex flex-column mb-5 align-items-center justify-content-between'>
                            <TitleComponent
                                title={tabData.find(t => t.key === activeTab)?.title || "Our Services"}
                                className='text-center'
                                divider={false}
                                montezSubTitle={"Our Services"}
                                montezClass='montez-sub-heading primery-color'
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
                                        <SwiperSliderComp
                                            breakpoints={{
                                                0: {
                                                    slidesPerView: 1,
                                                    spaceBetween: 20
                                                },
                                                576: {
                                                    slidesPerView: 2,
                                                    spaceBetween: 20
                                                },
                                                992: {
                                                    slidesPerView: 3,
                                                    spaceBetween: 20
                                                },
                                                1400: {
                                                    slidesPerView: 4,
                                                    spaceBetween: 20
                                                },
                                            }}
                                            loop={true}
                                            navigation={false}
                                            className="mySwiper"
                                        >
                                            {tab.mapData.map((item, i) => {
                                                // check if the images have array
                                                const backgroundImagePath = Array.isArray(item.images)
                                                    ? item.images[0]
                                                    : item.image;
                                                return (
                                                    <SwiperSlide key={i}>
                                                        {/* {renderCard(tab.type, item)} */}
                                                        <div className="service-item-card d-flex align-itemx-end"
                                                            style={{ backgroundImage: `url(${backgroundImagePath})` }}
                                                        >
                                                            <div className="service-item-card-content w-100 d-flex flex-column justify-content-end z-3">
                                                                <div className="badge service-item-badge">
                                                                    {item.type}
                                                                </div>
                                                                <h2 className="service-item-card-title text-light">{item.name}</h2>
                                                                <div className='d-flex align-items-center justify-content-between mt-2'>
                                                                    <h4 className="service-item-card-text text-light">
                                                                        {typeof item.price === 'number' ? `From : ₹${item.price.toLocaleString()}` : item.price}
                                                                        <span className='text-decoration-line-through text-light-25 ms-4'>₹1,450</span>
                                                                    </h4>

                                                                </div>
                                                                <span className='card-divider my-3'></span>
                                                                <div className='d-flex align-items-center justify-content-between'>
                                                                    <span className='text-light d-flex align-items-center gap-1 service-item-card-text'>
                                                                        {tab.key === "tour-package" && <><Clock size={16} />{item.duration}</>}
                                                                        {tab.key === "rental-car" && <><Users size={16} />{item.capacity}</>}
                                                                        {tab.key === "hotel" && <><MapPin size={16} />{item.location}</>}
                                                                    </span>
                                                                    {/* Case 1: Only for Tour Packages */}
                                                                    {tab.key === "tour-package" && (
                                                                        <Link
                                                                            href={`/tour-package/${slugify(item.name || "")}`}
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
                                                                            onClick={() => handleOpenBooking(item.name)}
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
            />
            {/* <div className="top-divider position-absolute bottom-0"></div> */}
        </section >
    );
};

export default ServicesTabSec;