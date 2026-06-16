"use client";

import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab, Accordion } from 'react-bootstrap';
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    Crown,
    Users,
    Clock,
    Tent,
    Music,
    Flame,
    Milestone,
    Landmark,
    ShieldCheck,
    Heart,
    Sparkles,
    MapPin,
    ChevronDown,
    Layers
} from "lucide-react";
import Image from "next/image";
import "../../../styles/aboutPage.scss";
import "../../../assets/scss/main.scss"
import { SwiperSliderComp, TitleComponent } from "@/components/ui/common";
import { SwiperSlide } from "swiper/react";
import { AnimationSecComponent } from "@/components/ui/AnimationSecComponent";
import Link from 'next/link';

// --- STATIC IMAGE IMPORTS FROM ASSETS ---
import aboutHero1 from "../../../assets/images/about-hero-1.png";
import aboutHero2 from "@/assets/images/about-hero-2.png";
import history1 from "@/assets/images/history-1.png";
import history2 from "@/assets/images/history-2.png";
import history3 from "@/assets/images/history-3.png";
import sadhusSaints from "@/assets/images/sadhus-saints.webp";
import yearCycle2 from "@/assets/images/year-cycle-2.png";
import riverRituals from "@/assets/images/river-rituals.webp";
import eveningAarti from "@/assets/images/evening-aarti.webp";

const touristTabsData = [
    {
        key: "jyotirlingas-12",
        title: "The 12 Jyotirlingas",
        count: 12,
        icon: Crown,
        description: "The twelve sacred Jyotirlinga shrines dedicated to Lord Shiva, spread across India. These self-manifested lingams are considered the holiest Shiva temples.",
        subItems: [
            { name: "Somnath", text: "Located in Gujarat, the first among the 12 Jyotirlingas, rebuilt multiple times as a symbol of resilience." },
            { name: "Mallikarjuna", text: "Situated on Srisailam hill in Andhra Pradesh, one of the most ancient and revered Shiva shrines." },
            { name: "Mahakaleshwar", text: "In Ujjain, Madhya Pradesh, the only south-facing Jyotirlinga, known for its powerful Bhasma Aarti." },
            { name: "Omkareshwar", text: "On an island in the Narmada River, Madhya Pradesh, shaped like the sacred Om symbol." },
            { name: "Kedarnath", text: "In the Himalayas of Uttarakhand, one of the highest and most sacred Shiva temples in India." },
            { name: "Bhimashankar", text: "In the Sahyadri hills of Maharashtra, surrounded by dense forests and a wildlife sanctuary." },
            { name: "Kashi Vishwanath", text: "In Varanasi, Uttar Pradesh, one of the most famous Hindu temples dedicated to Lord Shiva." },
            { name: "Trimbakeshwar", text: "Near Nashik, Maharashtra, source of the Godavari River with a unique three-faced lingam." },
            { name: "Vaidyanath", text: "In Deoghar, Jharkhand, associated with the legend of Ravana and Lord Shiva's healing powers." },
            { name: "Nageshwar", text: "Near Dwarka in Gujarat, where Lord Shiva manifested to protect his devotee from a demon." },
            { name: "Rameshwaram", text: "On Pamban Island in Tamil Nadu, established by Lord Rama before his journey to Lanka." },
            { name: "Grishneshwar", text: "Near Ellora Caves in Maharashtra, the last of the 12 Jyotirlingas mentioned in Shiva Purana." }
        ],
        packageLink: "http://localhost:3000/en/tour-package/12-jyotirlinga-yatra-with-mahakumbh-tours-travels-nashik"
    },
    {
        key: "maha-jyotirlingas",
        title: "Maharashtra's 5 Jyotirlingas",
        count: 5,
        icon: Milestone,
        description: "Maharashtra is uniquely blessed with 5 of India's 12 Jyotirlingas, the highest concentration in any state.",
        subItems: [
            { name: "Trimbakeshwar", text: "Near Nashik, source of the Godavari River. One of the most revered Jyotirlingas with a unique three-faced lingam representing Brahma, Vishnu, and Shiva." },
            { name: "Bhimashankar", text: "In the Sahyadri hills, surrounded by a wildlife sanctuary. Source of the Bhima River." },
            { name: "Grishneshwar", text: "Near Ellora Caves in Aurangabad district. The last of the 12 Jyotirlingas, mentioned in Shiva Purana." },
            { name: "Aundha Nagnath", text: "In Hingoli district, believed to be the first Jyotirlinga. Ancient temple with Hemadpanthi architecture." },
            { name: "Parli Vaijnath", text: "In Beed district, an ancient temple with beautiful architecture and rich mythological significance." }
        ],
        packageLink: "http://localhost:3000/en/tour-package/5-jyotirlinga-pilgrimage-in-maharashtra"
    },
    {
        key: "unesco-sites",
        title: "UNESCO & Historic Sites",
        count: 4,
        icon: Landmark,
        description: "Explore Maharashtra's world-renowned heritage sites that showcase centuries of art, architecture, and devotion.",
        subItems: [
            { name: "Ajanta Caves", text: "UNESCO World Heritage rock-cut Buddhist caves dating from 2nd century BCE, famous for exquisite murals and sculptures." },
            { name: "Ellora Caves", text: "UNESCO World Heritage site featuring 34 caves representing Buddhist, Hindu, and Jain traditions carved between 6th-11th century CE." },
            { name: "Kailasa Temple (Ellora)", text: "The magnificent monolithic rock-cut temple, carved top-down from a single basalt cliff. Dedicated to Lord Shiva." },
            { name: "Bhadra Maruti Temple", text: "Ancient temple in Khuldabad near Ellora, where Lord Hanuman is depicted in a reclining posture - one of only two such temples in India." }
        ],
        packageLink: ""
    },
    {
        key: "shakti-peethas",
        title: "Shakti Peethas of Maharashtra",
        count: 4,
        icon: ShieldCheck,
        description: "Sacred seats of the Divine Feminine, where the Goddess manifests in her powerful forms. Maharashtra is blessed with some of the most important Shakti Peethas.",
        subItems: [
            { name: "Mahalakshmi Temple, Kolhapur", text: "One of the most important Shakti Peethas, dedicated to Goddess Mahalakshmi. A 3.5 Shakti Peetha." },
            { name: "Tulja Bhavani, Tuljapur", text: "The family deity (Kuladaivat) of many Maharashtrian families. Shivaji Maharaj's patron deity." },
            { name: "Renuka Devi, Mahurgad", text: "An ancient hilltop temple dedicated to Goddess Renuka, considered one of the 3.5 Shakti Peethas." },
            { name: "Sapshrungi Devi, Vani", text: "A dramatic cliff-top temple near Nashik dedicated to the seven-peaked Goddess. One of the 3.5 Shakti Peethas." }
        ],
        packageLink: "http://localhost:3000/en/tour-package/sade-tin-35-shakti-peeth-tour-package"
    },
    {
        key: "ashtavinayak-8",
        title: "Ashtavinayak - Eight Ganesh Temples",
        count: 8,
        icon: Heart,
        description: "A sacred circuit of eight ancient Ganesh temples in Maharashtra, each with a unique self-manifested (swayambhu) idol of Lord Ganeshas.",
        subItems: [
            { name: "Morgaon (Moreshwar)", text: "The first temple in the Ashtavinayak circuit, considered the most important." },
            { name: "Siddhatek (Siddhivinayak)", text: "Known for granting wishes. Lord Vishnu worshipped Ganesha here before defeating demons Madhu and Kaitabha." },
            { name: "Pali (Ballaleshwar)", text: "The only Ashtavinayak named after a devotee rather than Lord Ganesha." },
            { name: "Mahad (Varadvinayak)", text: "Known for granting boons to devotees." },
            { name: "Theur (Chintamani)", text: "Where sage Kapila worshipped Ganesha. The Chintamani jewel was restored here after being stolen by the demon Gana." },
            { name: "Lenyadri (Girijatmaj)", text: "Located in Buddhist rock-cut caves on a hill." },
            { name: "Ozar (Vighnahar)", text: "Known as the remover of obstacles." },
            { name: "Ranjangaon (Mahaganapati)", text: "The last temple in the circuit, believed to house the most powerful form of Ganesha." }
        ],
        packageLink: "http://localhost:3000/en/tour-package/ashtavinayak-tour-package-for-3-days"
    },
    {
        key: "hill-stations",
        title: "Scenic Hill Stations",
        count: 3,
        icon: Sparkles,
        description: "Maharashtra's beloved hill retreats offering cool climate, stunning views, and natural beauty - perfect for a refreshing break during your pilgrimage.",
        subItems: [
            { name: "Lonavala", text: "A popular hill station between Mumbai and Pune, famous for Bhushi Dam, Tiger Point, and chikki sweets." },
            { name: "Khandala", text: "Twin hill station of Lonavala, known for Duke's Nose viewpoint and scenic valleys." },
            { name: "Mahabaleshwar", text: "Maharashtra's most popular hill station with strawberry farms, Arthur Seat, and Pratapgad Fort nearby." }
        ],
        packageLink: ""
    },
];

const TouristDestinations = () => {
    // Single source of truth tracking active top tabs
    const [activeTabKey, setActiveTabKey] = useState(touristTabsData[0].key);

    return (
        <section className="tourist-destinations-section py-5 trinery-bg">
            <Container className="py-4">

                {/* 1. Header Copy Block */}
                <Row className="justify-content-center text-center mb-3 mb-lg-4">
                    <Col lg={8}>
                        {/* heading */}
                        <AnimationSecComponent type="vertical" direction="up" delay={0.4}>
                            <TitleComponent
                                title={"Tourist Sites & Sacred Destinations"}
                                divider={false}
                                // montezSubTitle={"Sacred Ceremonies"}
                                montezSubTitle={"EXPLORE MAHARASHTRA"}
                                montezClass="playfair-display primery-color"
                                className="text-center"
                                // description={" Discover the spiritual and cultural treasures of Maharashtra. From ancient Jyotirlinga temples to UNESCO heritage sites, from sacred Shakti Peethas to scenic hill stations."}
                                descClass='text-muted text-description mx-auto lh-base'
                            />
                        </AnimationSecComponent>
                    </Col>
                </Row>

                {/* 2. Interactive Tab System Grid Layout Container */}
                <Tab.Container activeKey={activeTabKey} onSelect={(k) => setActiveTabKey(k)}>
                    <Row className="g-4">

                        {/* LEFT SIDE: Clickable tab item action columns layout */}
                        <Col lg={12}>
                            <AnimationSecComponent type="vertical" direction="up" delay={0.4}>
                                <Nav className="gap-2 gap-md-3 navigation-pill-stack flex-wrap justify-content-center">
                                    {touristTabsData.map((tab) => {
                                        const Icon = tab.icon;
                                        const isActive = activeTabKey === tab.key;
                                        return (
                                            <Nav.Item key={tab.key}>
                                                <Nav.Link
                                                    eventKey={tab.key}
                                                    className={`w-100 p-2 px-2 px-lg-2 rounded-3 d-flex align-items-center justify-content-between transition-all border ${isActive ? 'nav-active-pill shadow-sm' : 'nav-inactive-pill'
                                                        }`}
                                                >
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className={`icon-frame p-1 p-lg-2 rounded-2 ${isActive ? 'bg-orange-fill text-white' : 'bg-light-gray text-secondary'}`}>
                                                            <Icon size={18} />
                                                        </div>
                                                        <span className="fw-semibold pill-title-text">{tab.title}</span>
                                                    </div>
                                                    <div className="badge-counter-frame d-flex align-items-center gap-2 ms-1">
                                                        <p className="badge rounded-pill px-2 py-1 m-0 small count-indicator primery-bg">
                                                            {tab.count}
                                                        </p>
                                                    </div>
                                                </Nav.Link>
                                            </Nav.Item>
                                        );
                                    })}
                                </Nav>
                            </AnimationSecComponent>
                        </Col>

                        {/* RIGHT SIDE: Active panel displaying deep content data matrices */}
                        <Col lg={12}>
                            <Tab.Content>
                                {touristTabsData.map((tab) => (
                                    <Tab.Pane eventKey={tab.key} key={tab.key} className="transition-fade-pane">
                                        <AnimationSecComponent type="vertical" direction="up" delay={0.2}>
                                            <div className="destination-details-wrapper p-4 p-md-5 bg-white rounded-4 border shadow-sm">

                                                {/* Meta Pane Header Layout */}
                                                <div className="d-flex align-items-center gap-2 mb-3 primery-color fw-bold text-uppercase small tracking-wider">
                                                    <Layers size={16} />
                                                    <span>{tab.title}</span>
                                                    <span className="ms-auto bg-brand-orange-light px-3 py-1 rounded-pill primery-color font-semibold">
                                                        {tab.count} Locations Found
                                                    </span>
                                                </div>

                                                <p className="pill-title-text text-start text-muted mb-4 pb-3 border-bottom">
                                                    {tab.description}
                                                </p>

                                                {/* Nested child grid displaying items */}
                                                <Row className="g-3">
                                                    {tab.subItems.map((subItem, idx) => (
                                                        <Col xs={12} md={4} lg={3} key={idx} className="d-flex">
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
                                                    ))}
                                                </Row>
                                                {tab.packageLink && (
                                                    <div className="d-flex justify-content-start mt-4 small-12">
                                                        <p className='m-0 small-12'>Form more Information Click on this link</p>
                                                        <Link href={tab.packageLink}><button className=" border-0 primery-color bg-white ms-1"><p className='m-0'>Read More</p></button></Link>
                                                    </div>
                                                )}
                                            </div>
                                        </AnimationSecComponent>
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        </Col>

                    </Row>
                </Tab.Container>

            </Container>
        </section>
    );
};


// main about page 
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

    const aboutFaqData = [
        {
            id: "faq-1",
            quest: "Beyond Bathing: The Cultural Life of the Kumbh",
            hasList: true,
            leadText: "While ritual bathing draws the largest attention, the Simhastha is equally sustained by its non-ritual life:",
            listItems: [
                { title: "Spiritual Discourses and Satsangs", text: "Continuous philosophical dialogue forms the intellectual backbone of the Kumbh." },
                { title: "Seva and Community Kitchens", text: "Large-scale charitable service reflects the ethic of collective responsibility." },
                { title: "Music, Chanting, and Oral Tradition", text: "Knowledge is transmitted not through texts alone, but through sound and memory." },
                { title: "Inter-sect Dialogue", text: "The Kumbh acts as a rare meeting ground for diverse spiritual paths within Hinduism." }
            ],
            footerText: "These elements transform the gathering into a temporary civilization rather than a single event."
        },
        {
            id: "faq-2",
            quest: "Sacred Landscapes Around the Simhastha",
            hasList: true,
            leadText: "The wider Nashik–Trimbakeshwar region forms an extended sacred map:",
            listItems: [
                { title: "Panchavati and Kalaram Temple", text: "Anchor Ramayana traditions." },
                { title: "Sita Gufa and Anjaneri Hills", text: "Connect mythology with geography." },
                { title: "Brahmagiri Hill", text: "As the river’s source, represents spiritual origin." },
                { title: "The Pandavleni Caves", text: "Reveal the region’s layered religious history beyond Hinduism." }
            ],
            footerText: "Together, these sites provide context rather than itinerary, deepening understanding of why this region has drawn seekers for millennia."
        },
        {
            id: "faq-3",
            quest: "A Modern Gathering Rooted in Ancient Wisdom",
            hasList: false,
            paragraphs: [
                "Contemporary Simhastha Melas reflect a delicate balance between scale and sanctity. Environmental responsibility, technological integration, and crowd coordination now coexist with ritual purity and ascetic discipline.",
                "Yet despite modern systems, the Kumbh remains fundamentally human-powered, driven by faith, memory, and shared belief rather than spectacle."
            ]
        },
        {
            id: "faq-4",
            quest: "Movement & Participation: What to Keep in Mind",
            hasList: true,
            leadText: "To ensure a smooth pilgrimage experience, keep these core operational realities in mind:",
            listItems: [
                { title: "Expect altered access patterns", text: "During key ritual phases, movement within Nashik and Trimbakeshwar follows ceremonial and security-led routes rather than everyday city traffic flows." },
                { title: "Walking is integral to the experience", text: "Much of the Simhastha is navigated on foot, reflecting both practical necessity and pilgrimage tradition." },
                { title: "Time operates differently", text: "Distances that appear short on maps often take longer during the Simhastha, not due to inefficiency but due to ritual sequencing and crowd rhythm." },
                { title: "Follow institutional guidance", text: "Akhara processions, bathing cycles, and administrative instructions shape how spaces are used and accessed during the event." }
            ],
            footerText: "These considerations are part of the Simhastha’s lived reality, reinforcing that participation is as much about adaptation and patience as it is about ritual observance."
        },
        {
            id: "faq-5",
            quest: "Why the Simhastha Still Matters",
            hasList: false,
            paragraphs: [
                "In an increasingly fragmented world, the Simhastha Kumbh Mela stands as a reminder of collective spiritual identity. It dissolves social hierarchies, compresses time, and reconnects individuals with traditions far older than themselves.",
                "For some, it is a pilgrimage. For others, a cultural immersion. For many, it is simply an encounter with scale, devotion, and continuity that cannot be replicated elsewhere. The Simhastha Nashik Kumbh Mela 2027 is not just observed, it is entered, endured, and remembered."
            ]
        },
        {
            id: "faq-6",
            quest: "Who is the Simhastha for?",
            hasList: false,
            paragraphs: [
                "The Simhastha Kumbh Mela is experienced differently by different people, shaped as much by individual intention as by ritual structure. For some, it is a lifelong spiritual commitment, a return to practices observed across generations. For others, it is a moment of cultural immersion, offering a rare window into living traditions that continue to shape Indian civilization.",
                "At the same time, the Simhastha is physically demanding and emotionally intense. Its scale, pace, and sensory density can be overwhelming for those unprepared for prolonged walking, crowds, and highly structured ritual environments. Approaching the Kumbh with patience, humility, and openness often determines the depth of the experience more than familiarity with the ritual itself.",
                "This range of responses is not a contradiction but a reflection of the Simhastha’s breadth, a gathering vast enough to accommodate devotion, curiosity, and quiet observation in equal measure."
            ]
        },
        {
            id: "faq-7",
            quest: "Accommodation During the Simhastha: A Temporary Sacred City",
            hasList: false,
            paragraphs: [
                "During the Simhastha Kumbh Mela, the Nashik–Trimbakeshwar region functions not as a conventional host city but as a vast, temporary settlement system designed to absorb an extraordinary influx of pilgrims and ascetic communities.",
                "Accommodation during the Simhastha extends beyond permanent hotels and lodgings. Large tented settlements and monastic camps established by Akharas, dharamshalas, and community-run shelters together form a layered housing network that mirrors the social and spiritual diversity of the gathering. These temporary habitats are organized around ritual zones, processional routes, and bathing ghats rather than commercial districts.",
                "For many participants, accommodation is not merely a matter of rest but an extension of pilgrimage life: shared spaces, simple living conditions, and proximity to ritual activity are often embraced as part of the spiritual discipline associated with the Kumbh.",
                "This system of temporary habitation is one of the Simhastha’s most remarkable organizational achievements, demonstrating how large-scale human movement has been sustained for centuries through collective effort, institutional coordination, and voluntary service."
            ]
        }
    ];

    const RITUALS_DATA = [
        {
            id: "ritual-1",
            title: "Shahi Snan",
            subtitle: "Royal Bath",
            description: "The most auspicious bathing ritual led by Akharas in grand processions. These dates are determined by celestial alignments and are considered the most spiritually powerful.",
            icon: Crown,
            isActive: true, // Targets the custom premium highlighted styling border
            footerTag: "MOST AUSPICIOUS EVENT"
        },
        {
            id: "ritual-2",
            title: "Akhara Processions",
            subtitle: "Peshwai",
            description: "Magnificent processions of Naga Sadhus, Mahamandaleshwars, and saints from various Akharas, accompanied by elephants, horses, and traditional music.",
            icon: Users,
            isActive: false
        },
        {
            id: "ritual-3",
            title: "Aarti Ceremonies",
            subtitle: "Daily Rituals",
            description: "Elaborate evening prayers at the ghats with hundreds of oil lamps, creating a mesmerizing spectacle of light and devotion on the Godavari.",
            icon: Clock,
            isActive: false
        },
        {
            id: "ritual-4",
            title: "Kalpavas",
            subtitle: "Month-long Stay",
            description: "Devout pilgrims who undertake Kalpavas live on the riverbanks for the entire Kumbh period, practicing austerity and spiritual disciplines.",
            icon: Tent,
            isActive: false
        },
        {
            id: "ritual-5",
            title: "Pravachans & Bhajans",
            subtitle: "Spiritual Discourses",
            description: "Renowned saints and scholars deliver spiritual discourses, while devotional music fills the air throughout the Kumbh grounds.",
            icon: Music,
            isActive: false
        },
        {
            id: "ritual-6",
            title: "Yagna & Puja",
            subtitle: "Sacred Ceremonies",
            description: "Ancient Vedic fire rituals and elaborate pujas performed for world peace, prosperity, and spiritual upliftment of all beings.",
            icon: Flame,
            isActive: false
        }
    ];

    const cycleCards = [
        {
            id: "01",
            title: "Sadhus & Saints",
            text: "Holy men who have renounced worldly life gather from across India, representing ancient spiritual lineages.",
            img: sadhusSaints.src,
            variant: "#FF6A00"
        },
        {
            id: "02",
            title: "Akharas",
            text: "The traditional monastic orders that preserve and transmit Hindu spiritual knowledge through generations.",
            img: yearCycle2.src,
            variant: "#CBA533"
        },
        {
            id: "03",
            title: "River Rituals",
            text: "Sacred bathing ceremonies performed at auspicious times, believed to cleanse karma and grant liberation.",
            img: riverRituals.src,
            variant: "#20BA5A"
        },
        {
            id: "04",
            title: "Evening Aarti",
            text: "Mesmerizing lamp ceremonies on the ghats create a divine atmosphere of devotion and peace.",
            img: eveningAarti.src,
            variant: "#6a7282"
        }
    ];

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
                        <span className="playfair-display h4 primery-color">The Great Bathing Festival</span>
                        <h1 className="hero-title mb-2 text-light">
                            The Soul of <span className="hero-span secondary-color">Nashik</span>
                        </h1>
                        <p className="hero-para text-center text-lg-start mb-3">
                            Experience the convergence of celestial alignment and spiritual devotion. A timeless tradition on the banks of the sacred Godavari River.
                        </p>
                        <button className="primery-btn py-3 px-5">
                            Explore Journey <ArrowRight size={20} className="ms-2" />
                        </button>
                    </div>
                </Container>
            </section>

            {/* 2. header  */}
            <section className="legacy-hero section-padding secondary-bg">
                <Container>
                    <Row className="align-items-center justify-content-center">
                        <Col md={6} className="hero-text-col">
                            <span className="playfair-display h4 primery-color">The Simhastha Legacy</span>

                            <h1 className="hero-title mt-3">
                                Where Faith Conflues with the <span className="hero-span primery-color">Godavari</span>
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
                                    <p className="stat-text mb-0">Years of preparation for a moment of transcendence.</p>
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
                            title="Sacred History"
                            montezClass="primery-color playfair-display"
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
                                <div className="card history-card h-100 border-0 shadow-sm overflow-hidden">
                                    <div className="position-relative overflow-hidden">
                                        {/* <img
                                            src={card.img}
                                            alt={card.title}
                                            width={200}
                                            height={250}
                                            className="card-img-top object-fit-cover transition-transform"
                                        /> */}

                                        {/* <div className="position-absolute top-0 start-0 m-3 z-2">
                                            <span className="features-badge rounded-pill bg-brand-orange">
                                                {card.badge}
                                            </span>
                                        </div> */}
                                    </div>

                                    <div className="card-body p-4">
                                        <div className="position-absolute top-0 end-0 m-4 z-2">
                                            <span className="features-badge rounded-pill bg-brand-orange">
                                                {card.badge}
                                            </span>
                                        </div>
                                        <div className=''>
                                            <h3 className="h5 me-5 pe-4 fw-bold text-brand-dark mb-2">
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

            {/* Spiritual Insights FAQ */}
            <section className="insights-section section-padding bg-light2 secondary-bg">
                <Container>
                    <div className="d-flex flex-column gap-4">
                        {/* heading */}
                        <TitleComponent
                            title={"Simhastha Experience"}
                            divider={false}
                            // montezSubTitle={"Sacred Ceremonies"}
                            montezSubTitle={"Sacred Insights"}
                            montezClass="playfair-display primery-color"
                            className="text-start"
                        />
                        {/* faq accordian */}
                        <div className="accordion-card p-4 shadow-sm bg-white">
                            {/* <h3 className="mb-4 fw-bold">Spiritual Insights</h3> */}
                            <Accordion defaultActiveKey={aboutFaqData[0].id} flush className="custom-faq-accordion w-100">
                                {aboutFaqData.map((item) => (
                                    <Accordion.Item
                                        key={item.id}
                                        eventKey={item.id}
                                        className="border mb-2 rounded-3 overflow-hidden faq-accordion-item shadow-sm"
                                    >
                                        {/* Header Question Trigger */}
                                        <Accordion.Header className="fw-bold text-brand-dark">
                                            {item.quest}
                                        </Accordion.Header>

                                        {/* Content Body Panel */}
                                        <Accordion.Body className="bg-white p-4 text-secondary">
                                            {item.hasList ? (
                                                /* --- COMPLEX LIST RENDER STRATEGY --- */
                                                <div className="faq-list-content-flow">
                                                    {item.leadText && <p className="mb-3 lead-text-desc">{item.leadText}</p>}

                                                    <ul className="faq-bullet-group ps-3 mb-3">
                                                        {item.listItems?.map((listItem, index) => (
                                                            <li key={index} className="mb-2 faq-list-bullet-item lh-base">
                                                                <strong className="text-dark font-semibold me-1">
                                                                    {listItem.title} :
                                                                </strong>
                                                                <span>{listItem.text}</span>
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
                                                /* --- STANDARD CASCADE PARAGRAPHS STRATEGY --- */
                                                <div className="faq-paragraphs-flow">
                                                    {item.paragraphs?.map((para, paraIdx) => (
                                                        <p
                                                            key={paraIdx}
                                                            className={`lh-lg ${paraIdx === item.paragraphs.length - 1 ? 'mb-0' : 'mb-3'}`}
                                                        >
                                                            {para}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </Container>
            </section>

            {/* rituals and key dates */}
            <section className="rituals-events-section py-5 text-white">
                <Container className="py-4">

                    {/* Section Title Header Group */}
                    <Row className="justify-content-center text-center mb-3">
                        <Col lg={9} xl={8}>
                            <TitleComponent
                                montezSubTitle={"SACRED CEREMONIES"}
                                montezClass="playfair-display primery-color"
                                title={"Rituals & Key Events"}
                                h2_class="text-dark"
                                divider={false}
                                descClass="section-sub-desc text-black mx-auto"
                                description={" Experience the profound spiritual practices that have been observed for millennia. Each ritual carries deep significance and offers unique blessings to participants."}
                            />
                        </Col>
                    </Row>

                    {/* 3-Column Cards Responsive Grid Layout Grid */}
                    <Row className="g-4 justify-content-center">
                        {RITUALS_DATA.map((ritual, idx) => {
                            const IconComponent = ritual.icon;
                            return (
                                <Col md={6} lg={4} key={ritual.id} className="d-flex">
                                    <AnimationSecComponent
                                        type="vertical"
                                        direction="up"
                                        delay={0.2 + idx * 0.1}
                                        className="w-100 d-flex"
                                    >
                                        <div className={`ritual-event-card w-100 shadow-sm p-4 rounded-4 d-flex flex-column transition-all ${ritual.isActive ? 'active-highlight-card' : ''
                                            }`}>

                                            {/* Floating Icon Frame Box */}
                                            <div className="icon-box-wrapper d-flex align-items-center justify-content-center rounded-3 mb-3 flex-shrink-0">
                                                <IconComponent size={24} className="icon-accent" />
                                            </div>

                                            {/* Card Titles Block Layout */}
                                            <div className="card-titles-meta mb-3">
                                                <h3 className="h4 card-main-title mb-1 fw-bold">{ritual.title}</h3>
                                                <span className="card-sub-title text-accent small d-block fw-medium">
                                                    {ritual.subtitle}
                                                </span>
                                            </div>

                                            {/* Card Description Segment */}
                                            <p className="card-description-text text-white-60 small lh-base mb-4">
                                                {ritual.description}
                                            </p>

                                            {/* Conditional Special Feature Label Footer */}
                                            {ritual.isActive && ritual.footerTag && (
                                                <div className="mt-auto pt-2 border-top border-white-10">
                                                    <span className="badge-featured-tag text-uppercase fw-bold tracking-wider">
                                                        {ritual.footerTag}
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

            {/* 5. Significance Quote */}
            <section className="quote-section section-padding secondary-bg">
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

            {/* second about page code added here */}
            {/* 2nd hero header */}
            <TouristDestinations />

            {/* 4. 12-Year Cycle */}
            <section className="cycle-section section-padding padding-bottom">
                <Container>
                    <TitleComponent
                        title="Cultural Showcase"
                        montezSubTitle="Visual Journey"
                        className="text-center max-w-700 mx-auto"
                        h2_class="section-heading mb-3"
                        divider={false}
                        montezClass="playfair-display primery-color"
                    />
                    <Row className="mt-2 g-4">
                        {cycleCards.map((card) => (
                            <Col xs={6} lg={3} key={card.id}>
                                <div className="cycle-card border p-3 shadow-sm rounded-5 h-100">
                                    <div className="img-box">
                                        <img src={card.img} alt={card.title} className="" />
                                        {/* <div className={`badge-number`} style={{ backgroundColor: card.variant }}>{card.id}</div> */}
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

export default AboutUs;