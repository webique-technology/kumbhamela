import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { tourPackages } from "@/lib/data";
import { slugify } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../../../../styles/tourPackage.scss";
import Image from "next/image";
import * as Icons from "lucide-react";
import { Circle, FileText } from 'lucide-react';
import { WhatsAppShareBtn } from "@/components/ui/button";
import { PaymentTerms } from "@/components/ui/card";
import { TourTabs } from "@/components/ui/common";
import { TourPackageSlider } from "@/components/ui/TourPackageSlider";

// CHANGE THIS to your actual production domain
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourkumbhdomain.com';

export async function generateMetadata({ params }) {
    const { package: slug } = await params;
    const tour = tourPackages.find(p => slugify(p.name) === slug);

    if (!tour) return { title: 'Package Not Found' };

    const fullUrl = `${BASE_URL}/tour-package/${slug}`;
    // Absolute path for the image is required for WhatsApp preview
    const fullImageUrl = `${BASE_URL}${tour.image}`;
    console.log("url:", fullImageUrl);


    return {
        title: `${tour.name} | Your Brand`,
        description: tour.mainDesc,
        openGraph: {
            title: tour.name,
            description: tour.mainDesc,
            url: fullUrl,
            siteName: 'Kumbh Mela Tours',
            images: [{ url: fullImageUrl, width: 1200, height: 630 }],
            type: 'website',
        },
    };
}

const TourPackageDetailPage = async ({ params }) => {
    const resolvedParams = await params;
    const slug = resolvedParams.slug || resolvedParams.package;
    const tour = tourPackages.find(p => slugify(p.name) === slug);

    if (!tour) notFound();

    return (
        <main>
            {/* HERO SECTION */}
            <section className="tour-pack-detail-sec d-flex align-items-end justify-content-start position-relative"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${tour.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '60vh'
                }}
            >
                <Container className="hero-content pb-5">
                    <div className="tag mb-3">✨ {tour.duration}</div>
                    <h1 className="display-4 fw-bold text-white">{tour.name}</h1>
                    <p className="lead text-white-75">{tour.mainDesc}</p>
                    <ul className="px-2 m-0 bg-light tour-route d-flex flex-wrap justify-content-start align-items-center">
                        {tour.tourRoute.map((route, i) => (
                            <li key={i} className="p-1 small-12 rounded bg-primery-color text-decoration-none text-dark">
                                {route} &nbsp; {i !== tour.tourRoute.length - 1 && "---"}
                            </li>
                        ))}
                    </ul>
                </Container>
            </section>

            {/* MAIN CONTENT */}
            <Container className="main-section py-5">
                <Row className="gy-1 gy-md-4 gy-xl-5 m-0" >
                    {/* LEFT CONTENT */}
                    <Col lg={8}>
                        <div className="trinery-bg p-3 rounded-2 shadow-sm">
                            <Row className="">
                                {/* EXPERIENCE INCLUSIONS */}
                                <Col md={6} className="border-md-end m-0">
                                    {tour.inclusion && tour.inclusion.length > 0 && (
                                        <div className="section-block m-0">
                                            <h4 className="section-title fw-bold mb-4 h6 text-capitalize">
                                                {/* Experience Inclusions */}
                                                Tour Includes
                                            </h4>
                                            {/* INCLUSIONS NAMES AND ICONS */}
                                            <div className="d-flex flex-row flex-wrap justify-content-start gap-3 mb-3 mb-md-0">
                                                {tour.inclusion.map((item, i) => {
                                                    // 1. Get the icon component dynamically
                                                    const LucideIcon = Icons[item.in_icon];

                                                    return (
                                                        <div key={i} className="inclusion-item d-flex flex-column align-items-center">
                                                            {/* 2. Render the component only if it exists */}
                                                            {LucideIcon ? (
                                                                <LucideIcon size={24} className="primery-color" />
                                                            ) : (
                                                                <Icons.HelpCircle size={24} className="text-muted" /> // Fallback icon
                                                            )}
                                                            <p className="m-0 small-12 text-center">{item.in_title}</p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </Col>
                                {/* TOUR HIGHLIGHTS */}
                                <Col md={6} className="pt-4 pt-md-0">
                                    <div className="section-block m-0">
                                        <h4 className="section-title fw-bold mb-4 h6 text-capitalize">
                                            Tour Highlights
                                        </h4>
                                        <Row>
                                            {tour.features.map((item, i) => (
                                                <Col xs={6} lg={12} xl={6} key={i}>
                                                    <div className="p-1 rounded h-100 d-flex flex-row justify-content-start align-items-center gap-2 text-start">
                                                        <Circle size={10} className="primery-color" />
                                                        <p className="m-0">{item}</p>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        {/* ITINERARY JOURNEY */}
                        {tour.journey && tour.journey.length > 0 && (
                            <section className="section-block mb-0 mt-4">
                                <h4 className="section-title fw-bold mb-2">The Itinerary</h4>
                                <div className="p-2 rounded mb-4 departure-date-l">
                                    <p className="m-0 white-color">
                                        Viewing itinerary for :&nbsp;
                                        <span className="text-light fw-bold">{tour.departureDate}</span>
                                    </p>
                                </div>
                                {tour.journey.map((day, i) => (
                                    <div className={`timeline-item mb-0 position-relative ps-0 ps-sm-4 ${i !== tour.journey.length - 1 ? 'pb-4' : ''}`} key={i}>
                                        <div className="timeline-dot"></div>
                                        <Row className="align-items-start position-relative overflow-hidden scroll-itineary">
                                            <Col md={9}>
                                                <span className="badge bg-brand-light primery-color ms-3 ms-sm-0 mb-1 mt-1">Day {i + 1}</span>
                                                <h5 className="fw-bold sub-heading text-dark">{day.journey_title}</h5>
                                                <p className="text-secondary m-0">{day.journey_desc}</p>
                                            </Col>
                                            <Col md={3}>
                                                {day.journey_src && (
                                                    <div className="sticky-top z-1" style={{ height: '120px', top: '200px' }}>
                                                        <Image
                                                            src={day.journey_src}
                                                            alt={day.journey_title}
                                                            fill
                                                            className="rounded shadow-sm object-fit-cover"
                                                            sizes="(max-width: 768px) 100vw, 200px"
                                                        />
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* CANCELLATION POLICY & PAYMENT TERMS TABS*/}
                        <div className="section-block tour-tab-section mb-4 mb-md-0 mt-5 border-top pt-4">
                            <TourTabs
                                tour={tour}
                            />
                        </div>
                    </Col>
                    {/* RIGHT SIDEBAR */}
                    <Col lg={4}>
                        <aside className="booking-card sticky-top mb-5 mb-md-0 z-3 p-4 rounded bg-white border" style={{ top: '110px' }}>
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <FileText size={20} />
                                <h4 className="text-start m-0">Booking Summery</h4>
                            </div>
                            <div className="price mb-4">
                                <span className="h3 fw-bold primery-color">₹ {tour.price.toLocaleString()}</span>
                                <span className="text-muted"> / person</span>
                            </div>

                            <div className="info-box mb-4 p-3 rounded">
                                <p className="mb-1"><strong>Group:</strong> &nbsp;2-6 People</p>
                                <p className="mb-1"><strong>Duration:</strong> &nbsp;{tour.duration}</p>
                                <p className="departure-date m-0">
                                    <strong>Departure:</strong> &nbsp;{tour.departureDate || 'Check Availability'}
                                </p>
                            </div>

                            <Link
                                href={`/tour-package/book/${slugify(tour.name)}`}
                                className="primery-btn d-flex align-items-center justify-content-center w-100 py-3 text-center text-decoration-none fw-bold rounded shadow-sm mb-3"
                            >
                                Book Now
                            </Link>

                            <WhatsAppShareBtn tour={tour} />

                            <p className="note text-center text-muted small-12 italic mt-2">
                                * Limited slots available for Kumbh Mela dates.
                            </p>
                        </aside>
                    </Col>
                    {/* SWIPER SLIDER */}
                    <Col xs={12} className="">
                        <TourPackageSlider packages={tourPackages} title="Similar Packages" />
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default TourPackageDetailPage;