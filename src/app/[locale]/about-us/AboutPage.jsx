"use client";

import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab, Accordion } from 'react-bootstrap';
import {
    ArrowRight, ArrowLeft, CheckCircle, Crown, Users, Clock, Tent, Music,
    Flame, Milestone, Landmark, ShieldCheck, Heart, Sparkles, MapPin, Layers
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { SwiperSliderComp, TitleComponent } from "@/components/ui/common";
import { SwiperSlide } from "swiper/react";
import { AnimationSecComponent } from "@/components/ui/AnimationSecComponent";

import "../../../styles/aboutPage.scss";
import "../../../assets/scss/main.scss";

// Static Image Asset Mapping Links
import aboutHero1 from "../../../assets/images/about-hero-1.png";
import aboutHero2 from "@/assets/images/about-hero-2.png";
import sadhusSaints from "@/assets/images/sadhus-saints.webp";
import yearCycle2 from "@/assets/images/year-cycle-2.png";
import riverRituals from "@/assets/images/river-rituals.webp";
import eveningAarti from "@/assets/images/evening-aarti.webp";

const TouristDestinations = () => {
    const t = useTranslations("AboutPage");
    
    // Fetch raw nested data maps safely from locale JSON files
    const tabsDataRaw = t.raw("touristTabsData");
    const tDest = useTranslations("AboutPage.Destinations");

    // Dynamic icon and link structure config map
    const tabsMeta = {
        jyotirlingas12: { icon: Crown, packageLink: "/tour-package/12-jyotirlinga-yatra", count: 12 },
        mahaJyotirlingas: { icon: Milestone, packageLink: "/tour-package/5-jyotirlinga-pilgrimage", count: 5 },
        unescoSites: { icon: Landmark, packageLink: "", count: 4 },
        shaktiPeethas: { icon: ShieldCheck, packageLink: "/tour-package/sade-tin-35-shakti-peeth", count: 4 },
        ashtavinayak8: { icon: Heart, packageLink: "/tour-package/ashtavinayak-3-days", count: 8 },
        hillStations: { icon: Sparkles, packageLink: "", count: 3 }
    };

    const tabKeys = Object.keys(tabsDataRaw);
    const [activeTabKey, setActiveTabKey] = useState(tabKeys[0] || "jyotirlingas12");
    
    const activeTabData = tabsDataRaw[activeTabKey];
    const activeMeta = tabsMeta[activeTabKey] || tabsMeta.jyotirlingas12;

    return (
        <section className="tourist-destinations-section py-5 trinery-bg">
            <Container className="py-4">
                <Row className="justify-content-center text-center mb-3 mb-lg-4">
                    <Col lg={8}>
                        <AnimationSecComponent type="vertical" direction="up" delay={0.4}>
                            <TitleComponent
                                title={tDest("title")}
                                divider={false}
                                montezSubTitle={tDest("subTitle")}
                                montezClass="playfair-display primery-color"
                                className="text-center"
                                descClass='text-muted text-description mx-auto lh-base'
                            />
                        </AnimationSecComponent>
                    </Col>
                </Row>

                <Tab.Container activeKey={activeTabKey} onSelect={(k) => setActiveTabKey(k || "jyotirlingas12")}>
                    <Row className="g-4">
                        <Col lg={12}>
                            <AnimationSecComponent type="vertical" direction="up" delay={0.4}>
                                <Nav className="gap-2 gap-md-3 navigation-pill-stack flex-wrap justify-content-center">
                                    {tabKeys.map((key) => {
                                        const Meta = tabsMeta[key] || tabsMeta.jyotirlingas12;
                                        const Icon = Meta.icon;
                                        const isActive = activeTabKey === key;
                                        return (
                                            <Nav.Item key={key}>
                                                <Nav.Link
                                                    eventKey={key}
                                                    className={`w-100 p-2 px-2 px-lg-2 rounded-3 d-flex align-items-center justify-content-between transition-all border ${isActive ? 'nav-active-pill shadow-sm' : 'nav-inactive-pill'}`}
                                                >
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className={`icon-frame p-1 p-lg-2 rounded-2 ${isActive ? 'bg-orange-fill text-white' : 'bg-light-gray text-secondary'}`}>
                                                            <Icon size={18} />
                                                        </div>
                                                        <span className="fw-semibold pill-title-text">{tabsDataRaw[key].title}</span>
                                                    </div>
                                                    <div className="badge-counter-frame d-flex align-items-center gap-2 ms-1">
                                                        <p className="badge rounded-pill px-2 py-1 m-0 small count-indicator primery-bg">
                                                            {Meta.count}
                                                        </p>
                                                    </div>
                                                </Nav.Link>
                                            </Nav.Item>
                                        );
                                    })}
                                </Nav>
                            </AnimationSecComponent>
                        </Col>

                        <Col lg={12}>
                            <Tab.Content>
                                {tabKeys.map((key) => {
                                    const tabData = tabsDataRaw[key];
                                    const Meta = tabsMeta[key] || tabsMeta.jyotirlingas12;
                                    const subItemKeys = Object.keys(tabData.subItems || {});
                                    
                                    return (
                                        <Tab.Pane eventKey={key} key={key} className="transition-fade-pane">
                                            <AnimationSecComponent type="vertical" direction="up" delay={0.2}>
                                                <div className="destination-details-wrapper p-4 p-md-5 bg-white rounded-4 border shadow-sm">
                                                    <div className="d-flex align-items-center gap-2 mb-3 primery-color fw-bold text-uppercase small tracking-wider">
                                                        <Layers size={16} />
                                                        <span>{tabData.title}</span>
                                                        <span className="ms-auto bg-brand-orange-light px-3 py-1 rounded-pill primery-color font-semibold">
                                                            {Meta.count} {tDest("locationsFound")}
                                                        </span>
                                                    </div>

                                                    <p className="pill-title-text text-start text-muted mb-4 pb-3 border-bottom">
                                                        {tabData.description}
                                                    </p>

                                                    <Row className="g-3">
                                                        {subItemKeys.map((subKey) => {
                                                            const subItem = tabData.subItems[subKey];
                                                            return (
                                                                <Col xs={12} md={4} lg={3} key={subKey} className="d-flex">
                                                                    <div className="sub-location-item-card p-3 rounded-3 border w-100 d-flex flex-column transition-all bg-light-card-bg">
                                                                        <div className="d-flex align-items-center gap-2 mb-2">
                                                                            <MapPin size={16} className="primery-color flex-shrink-0" />
                                                                            <h4 className="hero-para text-start fw-semibold m-0 text-brand-dark tracking-tight">
                                                                                {subItem.name}
                                                                            </h4>
                                                                        </div>
                                                                        <p className="m-0 small text-muted lh-base">
                                                                            {subItem.text}
                                                                        </p>
                                                                    </div>
                                                                </Col>
                                                            );
                                                        })}
                                                    </Row>
                                                    {Meta.packageLink && (
                                                        <div className="d-flex justify-content-start mt-4 small-12">
                                                            <p className='m-0 small-12'>{tDest("moreInfo")}</p>
                                                            <Link href={Meta.packageLink}>
                                                                <button className="border-0 primery-color bg-white ms-1">
                                                                    <p className='m-0'>{tDest("readMore")}</p>
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                            </AnimationSecComponent>
                                        </Tab.Pane>
                                    );
                                })}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </section>
    );
};

const AboutPage = () => {
    const t = useTranslations("AboutPage");
    
    // Core localized dynamic text array extractions using raw schemas
    const ritualsRaw = t.raw("Rituals.items");
    const faqRaw = t.raw("faqData");
    const historyCardsRaw = t.raw("History.cards");
    const cycleCardsRaw = t.raw("Showcase.cards");

    const historyCards = [
        { id: 1, badge: historyCardsRaw.card1.badge, title: historyCardsRaw.card1.title, desc: historyCardsRaw.card1.desc },
        { id: 2, badge: historyCardsRaw.card2.badge, title: historyCardsRaw.card2.title, desc: historyCardsRaw.card2.desc },
        { id: 3, badge: historyCardsRaw.card3.badge, title: historyCardsRaw.card3.title, desc: historyCardsRaw.card3.desc },
        { id: 4, badge: historyCardsRaw.card4.badge, title: historyCardsRaw.card4.title, desc: historyCardsRaw.card4.desc }
    ];

    const cycleCards = [
        { id: "01", title: cycleCardsRaw.card1.title, text: cycleCardsRaw.card1.text, img: sadhusSaints.src },
        { id: "02", title: cycleCardsRaw.card2.title, text: cycleCardsRaw.card2.text, img: yearCycle2.src },
        { id: "03", title: cycleCardsRaw.card3.title, text: cycleCardsRaw.card3.text, img: riverRituals.src },
        { id: "04", title: cycleCardsRaw.card4.title, text: cycleCardsRaw.card4.text, img: eveningAarti.src }
    ];

    const ritualsMeta = {
        ritual1: { icon: Crown, isActive: true },
        ritual2: { icon: Users, isActive: false },
        ritual3: { icon: Clock, isActive: false },
        ritual4: { icon: Tent, isActive: false },
        ritual5: { icon: Music, isActive: false },
        ritual6: { icon: Flame, isActive: false }
    };

    const ritualKeys = Object.keys(ritualsRaw);
    const faqKeys = Object.keys(faqRaw);

    return (
        <main className="about-kumbh-page spiritual-legacy">
            {/* Editorial Hero Section */}
            <section className="kumbh-hero">
                <div className="hero-bg">
                    <img src={aboutHero1.src} alt="Godavari River" />
                    <div className="hero-gradient"></div>
                </div>
                <Container className="hero-content-wrapper">
                    <div className="max-w-700 d-flex flex-column align-items-center align-items-lg-start">
                        <span className="playfair-display h4 primery-color">{t("Hero.tag")}</span>
                        <h1 className="hero-title mb-2 text-light">
                            {t("Hero.title")} <span className="hero-span primery-color">{t("Hero.subtitle")}</span>
                        </h1>
                        <p className="hero-para text-center text-lg-start mb-3">
                            {t("Hero.description")}
                        </p>
                        <button className="primery-btn py-3 px-5">
                            {t("Hero.cta")} <ArrowRight size={20} className="ms-2" />
                        </button>
                    </div>
                </Container>
            </section>

            {/* 2. Legacy Hero */}
            <section className="legacy-hero section-padding secondary-bg">
                <Container>
                    <Row className="align-items-center justify-content-center">
                        <Col md={6} className="hero-text-col">
                            <span className="playfair-display h4 primery-color">{t("Legacy.tag")}</span>
                            <h1 className="hero-title mt-3">
                                {t("Legacy.title")} <span className="hero-span primery-color">{t("Legacy.span")}</span>
                            </h1>
                            <p className="description-text mt-4">
                                {t("Legacy.description")}
                            </p>
                            <div className="shrine-meta mb-3 mb-md-0 d-flex align-items-center gap-3 mt-4">
                                <CheckCircle className="text-secondary" />
                                <span className="italic-meta">{t("Legacy.meta")}</span>
                            </div>
                        </Col>
                        <Col md={6} className="hero-img-col">
                            <div className="hero-img-wrapper d-flex align-items-center justify-content-center shadow-2xl">
                                <Image
                                    src={aboutHero2.src}
                                    alt="Pilgrims at river"
                                    width={484}
                                    height={100}
                                    className="img-fluid"
                                />
                                <div className="floating-stat-card shadow-sm d-none d-md-block">
                                    <p className="stat-number mb-2">12</p>
                                    <p className="stat-text mb-0">{t("Legacy.statText")}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="abstract-wave"></div>
            </section>

            {/* History Carousel Section */}
            <section className="history-section section-padding">
                <Container>
                    <div className="d-flex position-relative justify-content-between align-items-center mb-4">
                        <TitleComponent
                            className='text-start mb-0'
                            title={t("History.title")}
                            montezClass="primery-color playfair-display"
                            montezSubTitle={t("History.subTitle")}
                            divider={false}
                        />
                        <div className="slider-nav-wrapper d-flex gap-2">
                            <button className="history-prev-btn nav-custom-btn">
                                <ArrowLeft size={20} />
                            </button>
                            <button className="history-next-btn nav-custom-btn">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    <SwiperSliderComp
                        slidesPerView={3}
                        navigation={{
                            prevEl: '.history-prev-btn',
                            nextEl: '.history-next-btn',
                        }}
                        spaceBetween={20}
                        timeDelay={4000}
                        breakpoints={{
                            0: { slidesPerView: 1, spaceBetween: 20 },
                            450: { slidesPerView: 2, spaceBetween: 20 },
                            768: { slidesPerView: 3, spaceBetween: 30 },
                        }}
                    >
                        {historyCards.map((card, index) => (
                            <SwiperSlide key={index} className="h-auto">
                                <div className="card history-card h-100 border-0 shadow-sm overflow-hidden">
                                    <div className="card-body p-4">
                                        <div className="position-absolute top-0 end-0 m-4 z-2">
                                            <span className="features-badge rounded-pill bg-brand-orange">
                                                {card.badge}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="h5 me-5 pe-4 fw-bold text-brand-dark mb-2">
                                                {card.title}
                                            </h3>
                                            <p className="card-text d-flex align-items-center mb-2 gap-2 text-muted small leading-relaxed">
                                                {card.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </SwiperSliderComp>
                </Container>
            </section>

            {/* Spiritual Insights FAQ Accordion */}
            <section className="insights-section section-padding bg-light2 secondary-bg">
                <Container>
                    <div className="d-flex flex-column gap-4">
                        <TitleComponent
                            title={t("Insights.title")}
                            divider={false}
                            montezSubTitle={t("Insights.subTitle")}
                            montezClass="playfair-display primery-color"
                            className="text-start"
                        />
                        <div className="accordion-card p-4 shadow-sm bg-white">
                            <Accordion defaultActiveKey="faq1" flush className="custom-faq-accordion w-100">
                                {faqKeys.map((key) => {
                                    const item = faqRaw[key];
                                    const listItemKeys = item.listItems ? Object.keys(item.listItems) : [];
                                    const paragraphList = item.paragraphs || [];

                                    return (
                                        <Accordion.Item
                                            key={key}
                                            eventKey={key}
                                            className="border mb-2 rounded-3 overflow-hidden faq-accordion-item shadow-sm"
                                        >
                                            <Accordion.Header className="fw-bold text-brand-dark">
                                                {item.quest}
                                            </Accordion.Header>
                                            <Accordion.Body className="bg-white p-4 text-secondary">
                                                {item.listItems ? (
                                                    <div className="faq-list-content-flow">
                                                        {item.leadText && <p className="mb-3 lead-text-desc">{item.leadText}</p>}
                                                        <ul className="faq-bullet-group ps-3 mb-3">
                                                            {listItemKeys.map((liKey) => (
                                                                <li key={liKey} className="mb-2 faq-list-bullet-item lh-base">
                                                                    <strong className="text-dark font-semibold me-1">
                                                                        {item.listItems[liKey].title} :
                                                                    </strong>
                                                                    <span>{item.listItems[liKey].text}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        {item.footerText && (
                                                            <p className="mt-3 pt-2 border-top border-light-subtle footer-text-note italic text-muted small">
                                                                {item.footerText}
                                                            </p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="faq-paragraphs-flow">
                                                        {paragraphList.map((para, pIdx) => (
                                                            <p key={pIdx} className="lh-lg mb-3">
                                                                {para}
                                                            </p>
                                                        ))}
                                                    </div>
                                                )}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    );
                                })}
                            </Accordion>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Rituals and Key Events */}
            <section className="rituals-events-section py-5 text-white">
                <Container className="py-4">
                    <Row className="justify-content-center text-center mb-3">
                        <Col lg={9} xl={8}>
                            <TitleComponent
                                montezSubTitle={t("Rituals.subTitle")}
                                montezClass="playfair-display primery-color"
                                title={t("Rituals.title")}
                                h2_class="text-dark"
                                divider={false}
                                descClass="section-sub-desc text-black mx-auto"
                                description={t("Rituals.description")}
                            />
                        </Col>
                    </Row>

                    <Row className="g-4 justify-content-center">
                        {ritualKeys.map((key) => {
                            const data = ritualsRaw[key];
                            const meta = ritualsMeta[key] || { icon: Crown, isActive: false };
                            const IconComponent = meta.icon;
                            
                            return (
                                <Col md={6} lg={4} key={key} className="d-flex">
                                    <AnimationSecComponent type="vertical" direction="up" delay={0.2} className="w-100 d-flex">
                                        <div className={`ritual-event-card w-100 shadow-sm p-4 rounded-4 d-flex flex-column transition-all ${meta.isActive ? 'active-highlight-card' : ''}`}>
                                            <div className="icon-box-wrapper d-flex align-items-center justify-content-center rounded-3 mb-3 flex-shrink-0">
                                                <IconComponent size={24} className="icon-accent" />
                                            </div>
                                            <div className="card-titles-meta mb-3">
                                                <h3 className="h4 card-main-title mb-1 fw-bold">{data.title}</h3>
                                                <span className="card-sub-title text-accent small d-block fw-medium">
                                                    {data.subtitle}
                                                </span>
                                            </div>
                                            <p className="card-description-text text-white-60 small lh-base mb-4">
                                                {data.description}
                                            </p>
                                            {meta.isActive && data.footerTag && (
                                                <div className="mt-auto pt-2 border-top border-white-10">
                                                    <span className="badge-featured-tag text-uppercase fw-bold tracking-wider">
                                                        {data.footerTag}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </AnimationSecComponent>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </section>

            {/* Significance Quote */}
            <section className="quote-section section-padding secondary-bg">
                <Container className="text-center">
                    <CheckCircle size={60} className="text-primary-light mb-4" />
                    <h2 className="quote-main mb-4">{t("Quote.text")}</h2>
                    <div className="quote-footer d-flex align-items-center justify-content-center gap-3">
                        <div className="line"></div>
                        <span className="author-label">{t("Quote.author")}</span>
                        <div className="line"></div>
                    </div>
                </Container>
            </section>

            {/* Destinations Tab Slider Grid Row */}
            <TouristDestinations />

            {/* Cultural Showcase */}
            <section className="cycle-section section-padding padding-bottom">
                <Container>
                    <TitleComponent
                        title={t("Showcase.title")}
                        montezSubTitle={t("Showcase.subTitle")}
                        className="text-center max-w-700 mx-auto"
                        h2_class="section-heading mb-3"
                        divider={false}
                        montezClass="playfair-display primery-color"
                    />
                    <Row className="mt-2 g-4">
                        {cycleCards.map((card) => (
                            <Col xs={6} lg={3} key={card.id}>
                                <div className="cycle-card border p-3 shadow-sm rounded-5 h-100">
                                    <div className="img-box overflow-hidden rounded-4">
                                        <img src={card.img} alt={card.title} className="img-fluid object-fit-cover w-100 h-100" />
                                    </div>
                                    <h3 className="h4 fw-bold mt-3 mb-2">{card.title}</h3>
                                    <p className="text-muted mb-2">{card.text}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </main>
    );
};

export default AboutPage;