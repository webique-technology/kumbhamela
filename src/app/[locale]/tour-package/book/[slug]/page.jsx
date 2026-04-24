import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { tourPackages } from "@/lib/data";
import { slugify } from "@/lib/utils";
import { notFound } from "next/navigation";
import { BookingFormHandler } from "../../../../../components/ui/bookingFormHandler"; // Check case-sensitivity
import { CheckCircle2, CalendarDays, Sparkles } from 'lucide-react';

const BookingPage = async ({ params }) => {
    const resolvedParams = await params;

    // Since your folder is [slug], use .slug here
    const pkgSlug = resolvedParams.slug;

    const tour = tourPackages.find((p) => slugify(p.name) === pkgSlug);

    if (!tour) notFound();

    return (
        <main>
            <section className="section-padding booking-form-page min-vh-100 d-flex align-items-center">
                <Container>
                    <Row className="justify-content-center">

                        {/* form */}
                        <Col lg={8} className="text-white p-3 pt-0 d-flex flex-column">
                            <div className="form-header mb-4">
                                <h1 className="display-5 fw-bold primery-color">Book Your Sacred Path</h1>
                                <p className="text-dark mb-1">
                                    Fill in the details below to begin your pilgrimage. Our journey coordinators will contact you within 24 hours to personalize your experience.
                                </p>
                            </div>
                            <BookingFormHandler tourName={tour.name} />
                        </Col>

                        {/* sidebar */}
                        <Col lg={4} className="p-2 p-md-3">
                            <div className="sidebar-cards sticky-top z-3 d-flex flex-column gap-4" style={{ top: '110px' }}>
                                {/* Why Book With Us */}
                                <div className="info-card p-4 rounded-4 shadow-sm">
                                    <h4 className="fw-bold mb-4">Why Book With Us</h4>
                                    <div className="d-flex flex-column gap-4">
                                        <div className="d-flex gap-3">
                                            <div className="icon-circle p-2 bg-warning-light rounded-3 h-fit">
                                                <CheckCircle2 className="text-warning" size={20} />
                                            </div>
                                            <div>
                                                <h6 className="fw-bold mb-1">Verified Local Guides</h6>
                                                <p className="small text-muted mb-0">Guided by Nashik scholars who know the hidden stories of every Ghat.</p>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-3">
                                            <div className="icon-circle p-2 bg-warning-light rounded-3 h-fit">
                                                <CalendarDays className="text-warning" size={20} />
                                            </div>
                                            <div>
                                                <h6 className="fw-bold mb-1">Guaranteed Access</h6>
                                                <p className="small text-muted mb-0">Priority slots for restricted ritual areas and VIP viewing platforms.</p>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-3">
                                            <div className="icon-circle p-2 bg-warning-light rounded-3 h-fit">
                                                <Sparkles className="text-warning" size={20} />
                                            </div>
                                            <div>
                                                <h6 className="fw-bold mb-1">Spiritual Concierge</h6>
                                                <p className="small text-muted mb-0">From Samagri arrangements to personalized Puja planning.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4 opacity-10" />
                                    <div className="d-flex justify-content-between text-center">
                                        <div><h5 className="fw-bold mb-0">15k+</h5><small className="text-muted smaller">PILGRIMS</small></div>
                                        <div><h5 className="fw-bold mb-0">4.9/5</h5><small className="text-muted smaller">RATING</small></div>
                                        <div><h5 className="fw-bold mb-0">24/7</h5><small className="text-muted smaller">SUPPORT</small></div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>
        </main>
    );
};

export default BookingPage;