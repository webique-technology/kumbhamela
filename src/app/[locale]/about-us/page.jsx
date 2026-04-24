"use client";

import React from "react";
import { Container, Row, Col, Accordion, Button } from "react-bootstrap";
import {
    ArrowRight,
    ArrowLeft,
    Waves,
    Calendar,
    ChevronDown,
    Shrine,
    HistoryEdu,
    CheckCircle,
    FormatQuote
} from "lucide-react";
import Image from "next/image";
import "../../../styles/aboutPage.scss";
import "../../../assets/scss/main.scss"
import { SwiperSliderComp, TitleComponent } from "@/components/ui/common";
import { SwiperSlide } from "swiper/react";

const AboutUs = () => {
    const historyCards = [
        {
            id: 1,
            badge: "Origin",
            title: "The Celestial Alignment",
            desc: "According to the Puranas, a drop of the divine nectar fell at Trimbakeshwar, making the waters of Godavari a portal to liberation.",
            img: "/images/history-1.png",
        },
        {
            id: 2,
            badge: "Evolution",
            title: "The Kumbh Tradition",
            desc: "The Nashik-Trimbakeshwar Kumbh Mela is unique as it is celebrated separately by the Shaivite and Vaishnavite sects.",
            img: "/images/history-2.png",
        },
        {
            id: 3,
            badge: "Vibrancy",
            title: "A Cultural Tapestry",
            desc: "Beyond the bath, the Mela is a grand gathering of sages, scholars, and seekers from all corners of India.",
            img: "/images/history-3.png",
        },
        {
            id: 4,
            badge: "Evolution 2",
            title: "The Kumbh Tradition 2",
            desc: "The Nashik-Trimbakeshwar Kumbh Mela is unique as it is celebrated separately by the Shaivite and Vaishnavite sects.",
            img: "/images/about-hero-1.png",
        }
    ];

    const cycleCards = [
        {
            id: "01",
            title: "Celestial Alignment",
            text: "The mela is held when Jupiter enters Leo (Simha) and the Sun enters Aries, creating a unique resonance.",
            img: "/images/year-cycle-1.png",
            variant: "#FF6A00"
        },
        {
            id: "02",
            title: "The Wait of Years",
            text: "The twelve-year gap represents a period of internal purification, preparing for the influx of energy.",
            img: "/images/year-cycle-2.png",
            variant: "#CBA533"
        },
        {
            id: "03",
            title: "The Great Awakening",
            text: "When the time comes, millions descend upon Nashik to participate in the Shahi Snan.",
            img: "/images/year-cycle-3.png",
            variant: "#20BA5A"
        }
    ];

    return (
        <main className="about-kumbh-page spiritual-legacy">
            {/* Editorial Hero Section */}
            <section className="kumbh-hero">
                <div className="hero-bg">
                    <img src="/images/about-hero-1.png" alt="Godavari River" />
                    <div className="hero-gradient"></div>
                </div>
                <Container className="hero-content-wrapper">
                    <div className="max-w-700">
                        <span className="hero-label">The Great Bathing Festival</span>
                        <h1 className="hero-title text-light">
                            The Soul of <span className="hero-span secondary-color">Nashik</span>
                        </h1>
                        <p className="hero-para">
                            Experience the convergence of celestial alignment and spiritual devotion. A timeless tradition on the banks of the sacred Godavari River.
                        </p>
                        <button className="primery-btn py-3 px-5">
                            Explore Journey <ArrowRight size={20} className="ms-2" />
                        </button>
                    </div>
                </Container>
            </section>

            {/* History Carousel Section */}
            <section className="history-section section-padding">
                <Container>
                    {/* Flex Header for Title + Buttons */}
                    <div className="d-flex position-relative justify-content-between align-items-center mb-4">
                        <TitleComponent
                            className='text-start mb-0'
                            title="Sacred History"
                            description="Our Collections"
                            divider={false}
                        />

                        {/* Custom Navigation Buttons */}
                        <div className="slider-nav-wrapper d-flex gap-2">
                            <button className="history-prev-btn nav-custom-btn">
                                <ArrowLeft size={20} />
                            </button>
                            <button className="history-next-btn nav-custom-btn">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* slider */}
                    <SwiperSliderComp
                        slidesPerView={3}
                        navigation={{
                            prevEl: '.history-prev-btn',
                            nextEl: '.history-next-btn',
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
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {historyCards.map((card, index) => (
                            <SwiperSlide key={index} className="h-auto">
                                <div className="card history-card h-100 border-0 shadow-md overflow-hidden">
                                    {/* Image Container with Overlay */}
                                    <div className="position-relative overflow-hidden">
                                        <Image
                                            src={card.img}
                                            alt={card.title}
                                            width={200}
                                            height={250}
                                            className="card-img-top object-fit-cover transition-transform"
                                        />

                                        {/* Badge Left */}
                                        <div className="position-absolute top-0 start-0 m-3 z-2">
                                            <span className="features-badge rounded-pill bg-brand-orange">
                                                {card.badge}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Body */}
                                    <div className="card-body p-4">
                                        <div className='d-grid'>
                                            <h3 className="h5 fw-bold text-brand-dark mb-2">
                                                {card.title}
                                            </h3>
                                            <p className="card-text d-flex align-items-center mb-2 gap-2 text-muted small leading-relaxed">
                                                {card.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div >
                            </SwiperSlide>
                        ))}
                    </SwiperSliderComp>

                </Container>
            </section>

            {/* Spiritual Insights Bento */}
            <section className="insights-section section-padding bg-light2">
                <Container>
                    <Row className="g-4 g-sm-1 g-md-4">
                        <Col lg={4}>
                            <div className="wisdom-card">
                                <img src="/images/about-baba.png" alt="Spiritual Sage" />
                                <div className="wisdom-overlay">
                                    <h4>Wisdom of Sages</h4>
                                    <p>Meeting the Naga Sadhus who emerge once every twelve years.</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <div className="d-flex flex-column gap-4">
                                <Row className="g-4 g-sm-1 g-md-4">
                                    <Col md={6}>
                                        <div className="stat-card stat-orange">
                                            <Waves size={40} className="mb-3" />
                                            <h5>30M+</h5>
                                            <p>Projected pilgrims for Shahi Snan.</p>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="stat-card stat-yellow">
                                            <Calendar size={40} className="mb-3" />
                                            <h5>12 Yrs</h5>
                                            <p>Sacred cycle of Simhastha Kumbh.</p>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="accordion-card p-4 shadow-sm bg-white">
                                    <h3 className="mb-4 fw-bold">Spiritual Insights</h3>
                                    <Accordion defaultActiveKey="0" flush>
                                        <Accordion.Item eventKey="0" className="border-bottom">
                                            <Accordion.Header>Why is Shahi Snan auspicious?</Accordion.Header>
                                            <Accordion.Body>
                                                Planetary alignments maximize spiritual vibration, believed to dissolve lifetimes of karma.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Significance of Kushavarta Ghat?</Accordion.Header>
                                            <Accordion.Body>It is the source where the Godavari reappears after disappearing from Brahmagiri.</Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="cta-section section-padding">
                <Container>
                    <div className="cta-box">
                        <div className="cta-bg-img">
                            <img src="/images/mela-aerial.png" alt="Mela ground" />
                        </div>
                        <div className="cta-content">
                            <h2 className="cta-title">Ready to Witness History?</h2>
                            <p className="cta-para">Our concierge handles everything from luxury transport to spiritual walks.</p>
                            <div className="d-flex flex-wrap justify-content-center gap-3">
                                <button className="primery-btn py-3 px-5">Book Premium Rental</button>
                                <button className="outline-btn py-3 px-5">Download Guide</button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* second about page code added here */}
            {/* 2nd hero header */}

            {/* 2. header  */}
            <section className="legacy-hero section-padding">
                <Container>
                    <Row className="align-items-center justify-content-center g-0 g-md-5">
                        <Col md={6} className="hero-text-col">
                            <span className="label-sm">The Sacred Tradition</span>
                            <h1 className="hero-title mt-3">
                                Where Time Meets the <span className="hero-span primery-color">Divine</span>
                            </h1>
                            <p className="description-text mt-4">
                                Discover the spiritual heartbeat of Nashik. A journey through the Kumbh Mela is more than a
                                pilgrimage; it is a profound reconnection with the cosmic rhythm of the universe.
                            </p>
                            <div className="shrine-meta mb-3 mb-md-0 d-flex align-items-center gap-3 mt-4">
                                <CheckCircle className="text-secondary" />
                                <span className="italic-meta">Sacred gatherings since time immemorial</span>
                            </div>
                        </Col>
                        <Col md={6} className="hero-img-col">
                            <div className="hero-img-wrapper shadow-2xl">
                                <Image
                                    src="/images/about-hero-2.png"
                                    alt="Pilgrims at river"
                                    width={584}
                                    height={100}
                                    className="img-fluid"
                                />
                                <div className="floating-stat-card shadow-sm d-none d-md-block">
                                    <p className="stat-number">12</p>
                                    <p className="stat-text">Years of preparation for a moment of transcendence.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="abstract-wave"></div>
            </section>

            {/* 2. History of Simhastha (Bento) */}
            <section className="history-bento section-padding">
                <Container>
                    <div className="section-header mb-5">
                        <h2 className="section-heading">History of Simhastha</h2>
                        <div className="heading-divider"></div>
                    </div>
                    <div className="bento-grid">
                        <div className="bento-item item-origin shadow-sm">
                            <img src="/images/cosmic-history.png" alt="Origin" className="bg-img" />
                            <div className="bento-content">
                                <span className="label-xs">The Cosmic Origin</span>
                                <h3>The Churning of the Ocean</h3>
                                <p>According to the Puranas, drops of 'Amrit' fell at Nashik, Haridwar, Ujjain, and Prayagraj.</p>
                            </div>
                        </div>
                        <div className="bento-item item-legacy text-center">
                            <CheckCircle size={48} className="mb-4" />
                            <h3>The Peshwa Legacy</h3>
                            <p>Nashik's prominence grew under the Peshwas, who revitalized the city's temples and the sacred Ram Kund.</p>
                        </div>
                        <div className="bento-item item-quote">
                            <p className="quote-text">"Nashik is the gateway to salvation, where the lion meets the spirit."</p>
                            <div className="d-flex align-items-center gap-2 mt-auto">
                                <CheckCircle size={20} className="text-primary" />
                                <span className="fw-bold small">Vedic Chronicles</span>
                            </div>
                        </div>
                        <div className="bento-item item-visual">
                            <img src="/images/diva-lamp.png" alt="Floating Lamp" className="w-100 h-100 object-fit-cover" />
                        </div>
                    </div>
                </Container>
            </section>

            {/* 3. Holy Godavari (Asymmetric) */}
            <section className="river-section section-padding bg-light2">
                <Container>
                    <Row className="align-items-center g-0 g-md-5">
                        <Col lg={6} className="order-2 order-lg-1">
                            <div className="river-img-wrapper position-relative">
                                <img src="/images/dakshin-ganga.png" alt="Godavari Valley" className="img-fluid rounded-large shadow-2xl" />
                                <div className="water-badge d-none d-xl-flex">
                                    <CheckCircle className="text-primary" size={32} />
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} className="order-1 order-lg-2">
                            <span className="label-sm text-secondary">Dakshin Ganga</span>
                            <h2 className="section-heading-large mt-3">The Holy Godavari: A River of Life</h2>
                            <p className="description-text mt-4">
                                Devotees believe that a dip in the 'Ram Kund' cleanses the soul of lifetimes of karma.
                            </p>
                            <ul className="list-unstyled custom-check-list mt-4">
                                <li><CheckCircle className="text-primary" size={20} /> <strong>Ram Kund:</strong> The epicenter of the holy dip.</li>
                                <li><CheckCircle className="text-primary" size={20} /> <strong>Panchavati:</strong> Where history and mythology breathe.</li>
                                <li><CheckCircle className="text-primary" size={20} /> <strong>Kushavarta:</strong> The symbolic source in Trimbakeshwar.</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 4. 12-Year Cycle */}
            <section className="cycle-section section-padding">
                <Container>
                    <TitleComponent
                        title="The 12-Year Cycle"
                        description="Aligned with the position of Jupiter (Guru) and the Sun, the Kumbh Mela follows a cosmic calendar."
                        className="text-center max-w-700 mx-auto mb-5"
                        h2_class="section-heading"
                    />
                    <Row className="g-0 g-sm-1 g-md-5 mt-4">
                        {cycleCards.map((card) => (
                            <Col md={4} key={card.id}>
                                <div className="cycle-card">
                                    <div className="img-box">
                                        <img src={card.img} alt={card.title} className="grayscale-hover" />
                                        <div className={`badge-number`} style={{ backgroundColor: card.variant }}>{card.id}</div>
                                    </div>
                                    <h3 className="h4 fw-bold mt-4 mb-3">{card.title}</h3>
                                    <p className="text-muted">{card.text}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* 5. Significance Quote */}
            <section className="quote-section py-5 bg-white">
                <Container className="text-center">
                    <CheckCircle size={60} className="text-primary-light mb-4" />
                    <h2 className="quote-main mb-4">
                        "Kumbh is not just a fair, it's a congregation of souls seeking the eternal truth amidst the flow of the Godavari."
                    </h2>
                    <div className="quote-footer d-flex align-items-center justify-content-center gap-3">
                        <div className="line"></div>
                        <span className="author-label">The Pilgrim's Wisdom</span>
                        <div className="line"></div>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default AboutUs;