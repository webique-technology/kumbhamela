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
            {/* bathing dates with slider */}
            <section className="bathing-count-main position-relative">
                <div className="top-divider position-absolute td-trinery-bg z-3 td-top" style={{ pointerEvents: 'none' }}></div>
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
                                    isActive={true}
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
                                <div className="me-0 d-none d-md-block">
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
                            {/* bathing dates slider for display on screen 768 or  > grater than 768px */}
                            <div className="div d-none d-md-block">
                                <SwiperSliderComp
                                    slidesPerView={4}
                                    navigation={{
                                        prevEl: '.bathing-prev-btn',
                                        nextEl: '.bathing-next-btn',
                                    }}
                                    disableAutoplay={true}
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
                                            slidesPerView: 1,
                                            spaceBetween: 30,
                                        },
                                        865: {
                                            slidesPerView: 2,
                                            spaceBetween: 30,
                                        },
                                        992: {
                                            slidesPerView: 2,
                                            spaceBetween: 30,
                                        },
                                        1120: {
                                            slidesPerView: 3,
                                            spaceBetween: 30,
                                        },
                                        1600: {
                                            slidesPerView: 4,
                                            spaceBetween: 30,
                                        },
                                    }}
                                >
                                    {bathingDates.map((date, index) => (
                                        <SwiperSlide key={index} className="h-auto">
                                            {/* <div className="date-card w-100 h-100 d-grid">
                                                <div className="card-body p-2">
                                                    <p className="title">{date.title}</p>
                                                    <div className="d-flex flex-column align-items-center justify-content-between">
                                                        <span className="m-0">{date.day}</span>
                                                        <p className="month">
                                                            {date.month} {date.year}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="festival-card-wrapper snap-start group">
                                                <div className="festival-card glass-card inner-glow position-relative p-4 d-grid rounded-4 transition-card">

                                                    {/* LEFT GLOW BORDER */}
                                                    <div className="festival-card-line position-absolute"></div>

                                                    {/* TOP CONTENT */}
                                                    <div className="festival-card-header">
                                                        <div className="d-flex align-items-center ">
                                                            <span className="festival-label text-uppercase d-block">
                                                                {date.dateOccation}
                                                            </span>

                                                            {/* <div className="key-date"></div> */}
                                                        </div>

                                                        <h3 className="festival-title my-3 text-capitalize">
                                                            {date.title}
                                                        </h3>
                                                    </div>

                                                    {/* DATE SECTION */}
                                                    <div className="festival-date d-flex align-items-end gap-3">
                                                        <span className="festival-day fw-bold">
                                                            {date.day}
                                                        </span>

                                                        <div className="d-flex flex-column">
                                                            <span className="festival-month text-uppercase">
                                                                {date.month}
                                                            </span>

                                                            <span className="festival-year">
                                                                2027
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* FOOTER */}
                                                    <div className="festival-footer w-100 pt-4 border-top d-flex justify-content-between align-items-center">
                                                        <span className="festival-subtitle">
                                                            Sacred Immersion
                                                        </span>

                                                        {/* <button className="festival-btn d-flex align-items-center gap-2 border-0 bg-transparent">
                                                            DETAILS
                                                        </button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </SwiperSliderComp>
                            </div>
                            {/* bathing dates list for display on screen < 768px */}
                            <div className="d-block d-md-none">
                                <ul className="list-unstyled mb-0">
                                    {bathingDates.map((date, index) => (
                                        <li key={index} className="mb-3">
                                            <div className="date-card w-100 h-100 d-grid">
                                                <div className="card-body p-2">
                                                    <p className="title">{date.title}</p>
                                                    <div className="d-flex flex-column align-items-center justify-content-between">
                                                        <span className="m-0">{date.day}</span>
                                                        <p className="month">
                                                            {date.month} {date.year}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Container>
                </div>
                <div className="bottom-divider position-absolute z-3 bd-bottom bd-light-bg" style={{ pointerEvents: 'none' }}></div>
            </section>
        </>
    );
};

