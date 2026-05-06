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
            title: "Sadhus & Saints",
            text: "Holy men who have renounced worldly life gather from across India, representing ancient spiritual lineages.",
            img: "/images/sadhus-saints.webp",
            variant: "#FF6A00"
        },
        {
            id: "02",
            title: "Akharas",
            text: "The traditional monastic orders that preserve and transmit Hindu spiritual knowledge through generations.",
            img: "/images/year-cycle-2.png",
            variant: "#CBA533"
        },
        {
            id: "03",
            title: "River Rituals",
            text: "Sacred bathing ceremonies performed at auspicious times, believed to cleanse karma and grant liberation.",
            img: "/images/river-rituals.webp",
            variant: "#20BA5A"
        },
        {
            id: "04",
            title: "Evening Aarti",
            text: "Mesmerizing lamp ceremonies on the ghats create a divine atmosphere of devotion and peace.",
            img: "/images/evening-aarti.webp",
            variant: "#6a7282"
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
                        <span className="montez-sub-heading primery-color">The Great Bathing Festival</span>
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
                    <div className="d-flex position-relative justify-content-between align-items-center mb-4">
                        <TitleComponent
                            className='text-start mb-0'
                            title="Sacred History"
                            montezClass="primery-color montez-sub-heading"
                            montezSubTitle="Through the Ages"
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
                                    <div className="position-relative overflow-hidden">
                                        <Image
                                            src={card.img}
                                            alt={card.title}
                                            width={200}
                                            height={250}
                                            className="card-img-top object-fit-cover transition-transform"
                                        />

                                        <div className="position-absolute top-0 start-0 m-3 z-2">
                                            <span className="features-badge rounded-pill bg-brand-orange">
                                                {card.badge}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="card-body p-4">
                                        <div className=''>
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

            <section className="insights-section section-padding bg-light2 secondary-bg">
                <Container>
                    <Row className="">
                        <Col lg={4}>
                            <div className="wisdom-card mb-4">
                                <img src="/images/about-baba.png" alt="Spiritual Sage" />
                                <div className="wisdom-overlay">
                                    <h4>Wisdom of Sages</h4>
                                    <p>Meeting the Naga Sadhus who emerge once every twelve years.</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <div className="d-flex flex-column gap-4">
                                <TitleComponent
                                    title={"Rituals & Key Events"}
                                    divider={false}
                                    montezSubTitle={"Sacred Ceremonies"}
                                    montezClass="montez-sub-heading primery-color"
                                    className="text-start"
                                />

                                <div className="accordion-card p-4 shadow-sm bg-white">
                                    <h3 className="mb-4 fw-bold">Spiritual Insights</h3>
                                    <Accordion defaultActiveKey="0" flush>
                                        <Accordion.Item eventKey="0" className="border-bottom border mb-2 rounded-3">
                                            <Accordion.Header className="rounded-3 bg-transparent">Shahi Snan Royal Bath {"(Most Auspicious Event)"}</Accordion.Header>
                                            <Accordion.Body>
                                                The most auspicious bathing ritual led by Akharas in grand processions. These dates are determined by celestial alignments and are considered the most spiritually powerful
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1" className=" border mb-2 rounded-3">
                                            <Accordion.Header className="rounded-3 bg-transparent">Pravachans & Bhajans Spiritual Discourses</Accordion.Header>
                                            <Accordion.Body>Renowned saints and scholars deliver spiritual discourses, while devotional music fills the air throughout the Kumbh grounds.</Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2" className=" border mb-2 rounded-3">
                                            <Accordion.Header className="rounded-3 bg-transparent">Yagna & Puja Sacred Ceremonies</Accordion.Header>
                                            <Accordion.Body>Ancient Vedic fire rituals and elaborate pujas performed for world peace, prosperity, and spiritual upliftment of all beings.</Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3" className=" border mb-2 rounded-3">
                                            <Accordion.Header className="rounded-3 bg-transparent">Nagas & Sadhus</Accordion.Header>
                                            <Accordion.Body>Ancient Vedic fire rituals and elaborate pujas performed for world peace, prosperity, and spiritual upliftment of all beings.</Accordion.Body>
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
            <section className="legacy-hero section-padding secondary-bg">
                <Container>
                    <Row className="align-items-center justify-content-center">
                        <Col md={6} className="hero-text-col">
                            <span className="montez-sub-heading primery-color">The Sacred Tradition</span>

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
                    <TitleComponent
                        title={"Historical Significance"}
                        montezSubTitle={"Through the Ages"}
                        montezClass="montez-sub-heading primery-color"
                        divider={false}
                        className="mb-4"
                        h2_class={"text-start"}
                    />
                    <div className="bento-grid">
                        <div className="bento-item item-origin shadow-sm">
                            <img src="/images/cosmic-history.png" alt="Origin" className="bg-img" />
                            <div className="bento-content">
                                <span className="label-xs">Vedic Period - 1500 BCE</span>
                                <h3>Ancient Origins</h3>
                                <p>References to sacred bathing rituals at river confluences appear in the Rigveda and other Vedic texts, establishing the spiritual foundation for Kumbh traditions.</p>
                            </div>
                        </div>
                        <div className="bento-item item-legacy text-center">
                            <CheckCircle size={48} className="mb-4" />
                            <h3>Mythological Foundation</h3>
                            <p> The Puranas document the Samudra Manthan legend, establishing Nashik as one of the four sites where drops of Amrit fell from the sacred Kumbh {"(pot)"}.</p>
                        </div>
                        <div className="bento-item item-quote">
                            <p className="quote-text">Lord Rama's exile brought him to Nashik's Panchavati. The Godavari banks became sanctified by his presence, forever linking the region to the epic.</p>
                            <div className="d-flex align-items-center gap-2 mt-auto">
                                <CheckCircle size={20} className="text-primary" />
                                <span className="fw-bold small">Ramayana Connection</span>
                            </div>
                        </div>
                        <div className="bento-item item-visual d-none d-md-block">
                            <img src="/images/diva-lamp.png" alt="Floating Lamp" className="w-100 h-100 object-fit-cover" />
                        </div>
                    </div>
                </Container>
            </section>

            {/* 3. Holy Godavari (Asymmetric) */}

            <section className="river-section section-padding bg-light2 secondary-bg">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="order-2 order-lg-1">
                            <div className="river-img-wrapper position-relative">
                                <img src="/images/dakshin-ganga.png" alt="Godavari Valley" className="img-fluid rounded-large shadow-2xl" />
                                <div className="water-badge d-none d-xl-flex">
                                    <CheckCircle className="text-primary" size={32} />
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} className="order-1 order-lg-2">
                            <TitleComponent
                                montezSubTitle={"Dakshin Ganga"}
                                montezClass="primery-color montez-sub-heading"
                                title={"The Holy Godavari: A River of Life"}
                                h2_class="section-heading-large"
                                divider={false}
                                className="mb-4 text-start"
                            />
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
                        title="Cultural Showcase"
                        montezSubTitle="Visual Journey"
                        className="text-center max-w-700 mx-auto"
                        h2_class="section-heading"
                        divider={false}
                        montezClass="montez-sub-heading primery-color"
                    />
                    <Row className="mt-2">
                        {cycleCards.map((card) => (
                            <Col sm={6} lg={3} key={card.id}>
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

            <section className="quote-section py-5 secondary-bg">
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