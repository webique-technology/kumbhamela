"use client";
import React, { useTransition } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SwiperSlide } from "swiper/react";
import { BathingDatesSlider, SwiperSliderComp } from "@/components/ui/common";
import { bathingDatesConfig } from "@/lib/data";
import { useTranslations, useLocale } from "next-intl";
import { AnimationSecComponent, CountUp } from "../ui/AnimationSecComponent";
import "../../assets/scss/main.scss";
import "../../styles/bathingDates.scss";

export const BathingDates = () => {
    const t = useTranslations('BathingDates');
    const locale = useLocale();
    const [isPending] = useTransition();

    return (
        <section className={`bathing-count-main position-relative ${isPending ? "opacity-50" : ""}`}>
            <div className="top-divider position-absolute td-trinery-bg z-3 td-top filter-graycsale" style={{ pointerEvents: 'none' }}></div>
            <div className="bathing-row-count d-flex align-items-center justify-content-center">
                {/* LEFT BLOCK: Core Dashboard Stat Matrix Counters */}
                <Container fluid="xl" className="bathing-count-left d-flex flex-column align-items-center justify-content-center">
                    <div className="bcl-content-wrapper d-flex flex-column mt-4 mt-xl-0 align-items-center justify-content-center w-100">
                        <div className="text-center text-md-center">
                            <h2 className="mb-2 bathing-title text-center">{t("mainTitle")}</h2>
                            <span className="m-0 bathing-title-2 text-center">{t("mainSubtitle")}</span>
                        </div>

                        <div className="mt-4 count-up-box w-100">
                            <Row>
                                <Col xs={6} sm={3} md={3} lg={3} xl={6} xxl={6} className="border-right">
                                    <div className="text-center p-3">
                                        <h2>
                                            <CountUp from={0} to={12} separator="," direction="up" duration={2} className="count-up-text text-light" delay={0} />
                                        </h2>
                                        <p className="m-0 small text-uppercase font-semibold text-white-50">{t("yearsCycle")}</p>
                                    </div>
                                </Col>
                                <Col xs={6} sm={3} md={3} lg={3} xl={6} xxl={6} className="border-right">
                                    <div className="text-center p-3">
                                        <h2>
                                            <CountUp from={0} to={1} separator="," direction="up" duration={2} className="count-up-text text-light" delay={0} />M+
                                        </h2>
                                        <p className="m-0 small text-uppercase font-semibold text-white-50">{t("dailyPilgrims")}</p>
                                    </div>
                                </Col>
                                <Col xs={6} sm={3} md={3} lg={3} xl={6} xxl={6} className="border-right">
                                    <div className="text-center p-3">
                                        <h2>
                                            <CountUp from={0} to={108} separator="," direction="up" duration={2} className="count-up-text text-light" delay={0} />
                                        </h2>
                                        <p className="m-0 small text-uppercase font-semibold text-white-50">{t("daysFestival")}</p>
                                    </div>
                                </Col>
                                <Col xs={6} sm={3} md={3} lg={3} xl={6} xxl={6} className="">
                                    <div className="text-center p-3">
                                        <h2>
                                            <CountUp from={0} to={3} separator="," direction="up" duration={3} className="count-up-text text-light" delay={0} />
                                        </h2>
                                        <p className="m-0 small text-uppercase font-semibold text-white-50">{t("amritSnans")}</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Container>

                {/* RIGHT BLOCK: Desktop Swiper Slider Loop & Mobile Backup Calendars */}
                <Container fluid="md" className="bathing-count-right pb-5 pb-xl-0">
                    <div className="py-5">

                        {/* 1. Large viewport desktop slider wrapper node component */}
                        <BathingDatesSlider bathingDates={bathingDatesConfig} t={t} />

                        {/* 2. Responsive fall-back list grid for mobile screens (< 992px) */}
                        <Container className="px-2 d-block d-lg-none">
                            <div className="bathing-date-grid">
                                {bathingDatesConfig.map((date, index) => (
                                    <div key={index} className="bathing-date-col w-100 h-100">
                                        <AnimationSecComponent type="vertical" direction="up" delay={(index % 4) * 0.1} distance={20} className="h-100 w-100">
                                            <div className={`festival-card border calendar-style text-center d-flex flex-column justify-content-between ${date.isKeyDate ? 'key-date-highlight' : ''}`}>

                                                <div className="calendar-header p-2">
                                                    <p className="title mb-0 text-truncate px-1 fw-bold text-uppercase" title={t(date.titleKey)}>
                                                        {t(date.titleKey)}
                                                    </p>
                                                </div>

                                                <div className="calendar-body py-3 d-flex flex-column align-items-center justify-content-center">
                                                    <span className="display-date mb-1 m-0 font-weight-bold">{date.day}</span>
                                                    <span className="display-occ-text px-2 m-0 text-muted small lh-sm">{t(date.dateOccationKey)}</span>
                                                </div>

                                                <div className="calendar-footer p-2 border-top">
                                                    <p className="month-year mb-0 text-truncate font-semibold text-brand">
                                                        {t(date.monthKey)} '{date.year.slice(-2)}
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
        </section>
    );
};
