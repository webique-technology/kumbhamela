import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { tourPackages } from "@/lib/data";
import { slugify } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../../../../styles/tourPackage.scss";
import { TourBtn, WhatsappBtn } from "@/components/ui/button";
import Image from "next/image";

const TourPackageDetailPage = async ({ params }) => {
    // 1. Correctly await params
    const resolvedParams = await params;
    const slug = resolvedParams.slug || resolvedParams.package;
    const tour = tourPackages.find(p => slugify(p.name) === slug);

    if (!tour) notFound();

    return (
        <main>
            {/* HERO SECTION */}
            <section className="tour-pack-detail-sec d-flex align-items-end justify-content-start position-relative"
                style={{
                    // Added linear gradient for text readability
                    backgroundImage: `url(${tour.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '60vh'
                }}
            >
                <Container className="hero-content pb-5">
                    <div className="tag mb-3">✨ {tour.duration}</div>
                    <h1 className="display-4 fw-bold text-white">{tour.name}</h1>
                    <p className="lead text-white-75">{tour.mainDesc}</p>
                </Container>
            </section>

            {/* MAIN CONTENT */}
            <Container className="main-section py-5">
                <Row className="gy-1 gy-xl-5 m-0" >
                    {/* LEFT CONTENT */}
                    <Col lg={8}>
                        {/* EXPERIENCE INCLUSIONS */}
                        {tour.inclusion && tour.inclusion.length > 0 && (
                            <section className="section-block mb-4 ">
                                <h2 className="section-title fw-bold mb-4">Experience Inclusions</h2>
                                <Row className="gy-2 g-2 g-sm-3">
                                    {tour.inclusion.map((item, i) => (
                                        <Col xs={6} md={4} lg={3} key={i}>
                                            <div className="feature-card p-3 rounded h-100 d-flex flex-column align-items-center text-center">
                                                {item.in_icon && (
                                                    <div className="mb-2">
                                                        <Image
                                                            src={item.in_icon}
                                                            alt={item.in_title}
                                                            width={40}
                                                            height={40}
                                                        />
                                                    </div>
                                                )}
                                                <h6 className="fw-bold m-0">{item.in_title}</h6>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </section>
                        )}

                        {/* ITINERARY JOURNEY */}
                        {tour.journey && tour.journey.length > 0 && (
                            <section className="section-block">
                                <h2 className="section-title fw-bold mb-4">The Journey</h2>
                                {tour.journey.map((day, i) => (
                                    <div className="timeline-item mb-4 mb-sm-5 position-relative ps-0 ps-sm-4" key={i}>
                                        <div className="timeline-dot"></div>
                                        <Row className="align-items-start">
                                            <Col md={7}>
                                                <span className="badge bg-brand-light primery-color ms-3 ms-sm-0 mb-1 mt-1">Day {i + 1}</span>
                                                <h4 className="fw-bold">{day.journey_title}</h4>
                                                <p className="text-secondary">{day.journey_desc}</p>
                                            </Col>
                                            <Col md={5}>
                                                {day.journey_src ? (
                                                    <div className="position-relative" style={{ height: '178px' }}>
                                                        <Image
                                                            src={day.journey_src}
                                                            alt={`Day ${i + 1}`}
                                                            fill
                                                            className="rounded shadow-sm object-fit-cover"
                                                            sizes="(max-width: 768px) 100vw, 33vw"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                                                        <small className="text-muted">Image not available</small>
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                            </section>
                        )}
                    </Col>

                    {/* RIGHT SIDEBAR */}
                    <Col lg={4}>
                        <div className="booking-card sticky-top z-3 p-4 rounded bg-white" style={{ top: '110px' }}>
                            <div className="price mb-4">
                                <span className="h2 fw-bold primery-color">₹ {tour.price.toLocaleString()}</span>
                                <span className="text-muted"> / package</span>
                            </div>

                            <div className="info-box mb-4 p-3 bg-light rounded">
                                <p className="mb-2"><strong>Duration:</strong> {tour.duration}</p>
                                <p className="mb-0"><strong>Group:</strong> 2-6 People</p>
                            </div>

                            <Link
                                href={`/tour-package/book/${slugify(tour.name)}`}
                                className="primery-btn d-flex align-items-center justify-content-center w-100 py-3 text-center text-decoration-none fw-bold rounded shadow-sm"
                            >
                                Book Now
                            </Link>

                            <p className="note text-center text-muted small italic">
                                * Limited slots available for upcoming Shahi Snan dates.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default TourPackageDetailPage;