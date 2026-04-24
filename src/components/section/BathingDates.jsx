"use client";
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ArrowRight, ArrowLeft, Calendar } from "lucide-react";
import { SwiperSlide } from "swiper/react";
import { KumbhCountdown, SwiperSliderComp, TitleComponent } from "@/components/ui/common";
import { bathingDates } from "@/lib/data";
import { PrimeryBtn } from "../ui/button";
import "../../assets/scss/main.scss"
import "../../styles/bathingDates.scss"

export const BathingDates = () => {
    return (
        <>
            {/*<section className="section-padding bathing-section">
                <div className="overlay"></div>

                <Container>
                    <div className="section-title text-center">
                        <Calendar size={40} />
                        <h2>Bathing Dates</h2>
                    </div>

                    <Row className="justify-content-center">
                        {bathingDates.map((item, index) => (
                            <Col
                                key={index}
                                lg={2}
                                md={4}
                                sm={6}
                                xs={6}
                                className="mb-4 d-flex justify-content-center"
                            >
                                <div className="date-card w-100">
                                    <p className="title">{item.title}</p>
                                    <span className="m-0">{item.day}</span>
                                    <p className="month">
                                        {item.month} <br /> {item.year}
                                    </p>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <p className="description text-center mb-4">
                                Bathing ritual is the most significant ritual performed at Kumbh.
                                Although taking a dip in the sacred waters on all days of Prayagraj
                                Maha Kumbh beginning from Makar Sankranti is considered holy, yet
                                there are some specific auspicious bathing dates. Mark your calendar
                                for these divine bathing dates.
                            </p>
                        </Col>
                    </Row>

                    <PrimeryBtn
                        title="Read More"
                        btnLink="/"
                        className={"primery-btn-style-2"}
                        iconRight={<ArrowRight size={16} />}
                    />
                </Container>
            </section> */}

            {/* bathing dates with slider */}
            <section className="bathing-count-main">
                <div className="bathing-row-count">
                    <Container fluid="lg" className="bathing-count-left d-flex flex-column align-items-center justify-content-center">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <div className="text-start">
                                {/* <h2 className="m-0 bathing-title">Nashik–Trimbakeshwar</h2> */}
                                <h2 className="m-0 bathing-title">Nashik</h2>
                                <span className="m-0 bathing-title-2">Kumbh Mela 2027–2028</span>
                            </div>
                            <div>
                                <KumbhCountdown
                                    isActive={false}
                                />
                            </div>
                        </div>
                    </Container>
                    <Container fluid="md" className="bathing-count-right section-padding">
                        <div className="py-5">
                            <div className="d-flex mb-4 justify-content-between align-items-center">
                                <div>
                                    <span className="montez-sub-heading">Deals & Offers</span>
                                    <TitleComponent
                                        title="Bathing Dates"
                                        divider={false}
                                        h2_class={"text-start white-color"}
                                        className="mb-3"
                                    />
                                </div>
                                {/* Custom Navigation Buttons */}
                                <div className="me-0">
                                    <div className="slider-nav-wrapper d-flex gap-2 me-0 me-lg-1">
                                        <button className="bathing-prev-btn slider-prev-btn nav-custom-btn">
                                            <ArrowLeft size={20} />
                                        </button>
                                        <button className="bathing-next-btn slider-next-btn nav-custom-btn">
                                            <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="div">
                                <SwiperSliderComp
                                    slidesPerView={4}
                                    navigation={{
                                        prevEl: '.bathing-prev-btn',
                                        nextEl: '.bathing-next-btn',
                                    }}
                                    spaceBetween={20}
                                    timeDelay={4000}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1,
                                            spaceBetween: 20,
                                        },
                                        450: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 2,
                                            spaceBetween: 30,
                                        },
                                        1024: {
                                            slidesPerView: 2,
                                            spaceBetween: 30,
                                        },
                                        1440: {
                                            slidesPerView: 4,
                                            spaceBetween: 30,
                                        },
                                    }}
                                >
                                    {bathingDates.map((date, index) => (
                                        <SwiperSlide key={index} className="h-auto">
                                            <div className="date-card w-100 h-100 d-grid">
                                                <div className="card-img">
                                                    <img src="/images/tour-demo-2.png" alt="" className="bathing-card-img img-fluid" />
                                                </div>
                                                <div className="card-body p-2">
                                                    <p className="title">{date.title}</p>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <span className="m-0">{date.day}</span>
                                                        <p className="month">
                                                            {date.month} {date.year}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </SwiperSliderComp>
                            </div>
                        </div>
                    </Container>
                </div>
            </section>
        </>
    );
};

