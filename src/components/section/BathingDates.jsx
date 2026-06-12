"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ArrowRight, ArrowLeft, Calendar } from "lucide-react";
import { SwiperSlide } from "swiper/react";
import { BathingDatesSlider, KumbhCountdown, SwiperSliderComp, TitleComponent } from "@/components/ui/common";
import { bathingDates } from "@/lib/data";
import { PrimeryBtn } from "../ui/button";
import "../../assets/scss/main.scss"
import "../../styles/bathingDates.scss"
import { AnimationSecComponent, CountUp } from "../ui/AnimationSecComponent";

export const BathingDates = () => {

    return (
        <>
            {/* bathing dates with slider */}
            <section className="bathing-count-main position-relative">
                <div className="top-divider position-absolute td-trinery-bg z-3 td-top filter-graycsale" style={{ pointerEvents: 'none' }}></div>
                <div className="bathing-row-count">
                    <Container fluid="xl" className="bathing-count-left d-flex flex-column align-items-center justify-content-center">
                        <div className="bcl-content-wrapper d-flex flex-column mt-4 mt-xl-0 align-items-center justify-content-center w-100">
                            <div className="text-center text-md-start">
                                {/* <h2 className="m-0 bathing-title">Nashik–Trimbakeshwar</h2> */}
                                <h2 className="m-0 bathing-title">Kumbha</h2>
                                <span className="m-0 bathing-title-2">Amrit Snan Dates 2027-28</span>
                            </div>
                            <div className="mt-4 count-up-box w-100">
                                <Row>
                                    <Col xs={6} sm={3} md={3} lg={3} xl={6} xxl={6} className="border-right">
                                        <div className="text-center p-3">
                                            <h2>
                                                <CountUp
                                                    from={0}
                                                    to={12}
                                                    separator=","
                                                    direction="up"
                                                    duration={2}
                                                    className="count-up-text text-light"
                                                    delay={0}
                                                />
                                            </h2>
                                            <p className="m-0">Years Cycle</p>
                                        </div>
                                    </Col>
                                    <Col xs={6} sm={3} md={3} lg={3} xl={6} xxl={6} className="border-right">
                                        <div className="text-center p-3">
                                            <h2>
                                                <CountUp
                                                    from={0}
                                                    to={1}
                                                    separator=","
                                                    direction="up"
                                                    duration={2}
                                                    className="count-up-text text-light"
                                                    delay={0}
                                                />
                                                M+
                                            </h2>
                                            <p className="m-0">Daily Pilgrims</p>
                                        </div>
                                    </Col>
                                    <Col xs={6} sm={3} md={3} lg={3} xl={6} xxl={6} className="border-right">
                                        <div className="text-center p-3">
                                            <h2>
                                                <CountUp
                                                    from={0}
                                                    to={108}
                                                    separator=","
                                                    direction="up"
                                                    duration={2}
                                                    className="count-up-text text-light"
                                                    delay={0}
                                                />
                                            </h2>
                                            <p className="m-0">Days Festival</p>
                                        </div>
                                    </Col>
                                    <Col xs={6} sm={3} md={3} lg={3} xl={6} xxl={6} className="">
                                        <div className="text-center p-3">
                                            <h2>
                                                <CountUp
                                                    from={0}
                                                    to={3}
                                                    separator=","
                                                    direction="up"
                                                    duration={3}
                                                    className="count-up-text text-light"
                                                    delay={0}
                                                />
                                            </h2>
                                            <p className="m-0">Amrit Snans</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Container>
                    <Container
                        fluid="md"
                        className={`bathing-count-right section-padding-2 padding-top`}
                    >
                        <div className="py-5">
                            {/* bathing dates slider form 1024 above screen */}
                            <BathingDatesSlider
                                bathingDates={bathingDates}
                            />

                            {/* bathing dates grid for less than 992 */}
                            <Container className="px-2 d-block d-lg-none">
                                <div className="bathing-date-grid">
                                    {bathingDates.map((date, index) => (
                                        <div
                                            key={index}
                                            className="bathing-date-col w-100 h-100"
                                        >

                                            <AnimationSecComponent
                                                type="vertical"
                                                direction="up"
                                                delay={(index % 6) * 0.1} // Dynamically resets the cascade stagger timer for every row iteration
                                                distance={20}
                                                className="h-100 w-100"
                                            >
                                                <div className={`festival-card border calendar-style text-center d-flex flex-column justify-content-between ${date.isKeyDate ? 'key-date-highlight' : ''}`}>

                                                    <div className="calendar-header p-1">
                                                        <p className="title mb-0 text-truncate px-1" title={date.title}>
                                                            {date.title}
                                                        </p>
                                                    </div>

                                                    <div className="calendar-body py-2 d-flex flex-column align-items-center justify-content-center">
                                                        <span className="display-date mb-2 m-0 font-weight-bold">
                                                            {date.day}
                                                        </span>

                                                        <span className="display-occ-text px-1 px-sm-2 m-0 font-weight-bold">
                                                            {date.dateOccation}
                                                        </span>
                                                    </div>

                                                    <div className="calendar-footer p-1">
                                                        <p className="month-year mb-0 text-truncate">
                                                            {date.month} '{date.year.slice(-2)}
                                                        </p>
                                                    </div>

                                                </div>
                                            </AnimationSecComponent>
                                        </div>
                                    ))}
                                </div>
                            </Container>

                        </div>
                    </Container>
                </div>
                <div className="bottom-divider position-absolute z-3 bd-bottom td-trinery-bg" style={{ pointerEvents: 'none' }}></div>
            </section >
        </>
    );
};

