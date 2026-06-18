"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from '@/i18n/routing';
import Image from "next/image";
import * as Icons from "lucide-react";
import { Circle, FileText, CalendarCheck, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { slugify, imageUrl } from "@/lib/utils";
import { WhatsAppShareBtn } from "@/components/ui/button";
import { HighlightsModal, TourTabs, } from "@/components/ui/common";
import { TourPackageSlider } from "@/components/ui/TourPackageSlider";
import { tourPackages } from "@/lib/data";
import { getCancellationPolicy, getPaymentPolicy, getTours, getTourBySlug } from "../tourApi";


const TourPackageDetail = ({ tour }) => {

    const [cancellationPolicy, setCancellationPolicy] = useState([]);
    const [paymentPolicy, setPaymentPolicy] = useState([]);
    const [recentPackages, setRecentPackages] = useState([]);

    const [expandedItems, setExpandedItems] = useState({});
    const loadMore = (index) => {
        setExpandedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    // useEffect(() => {
    // const fetchPolicies = async () => {
    //     try {
    //     const [cancelData, paymentData] = await Promise.all([
    //         getCancellationPolicy(),
    //         getPaymentPolicy(),
    //     ]);

    //     setCancellationPolicy(cancelData || []);
    //     setPaymentPolicy(paymentData || []);
    //     } catch (error) {
    //     console.error(error);
    //     }
    // };

    // fetchPolicies();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    cancelData,
                    paymentData,
                    toursData
                ] = await Promise.all([
                    getCancellationPolicy(),
                    getPaymentPolicy(),
                    getTours(1),
                ]);

                setCancellationPolicy(cancelData || []);
                setPaymentPolicy(paymentData || []);

                const filteredTours =
                    (toursData?.data || toursData || []).filter(
                        (item) => item.id !== tour.id
                    );

                setRecentPackages(filteredTours);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [tour.id]);

    return (
        <main>
            {/* HERO SECTION */}
            <section
                className="tour-pack-detail-sec d-flex flex-column align-items-end justify-content-between position-relative"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${tour.image_url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "60vh",
                }}
            >
                <Container className="pt-4 mb-5">
                    <div className="w-max">
                        <Link
                            href="/tour-package"
                            className="border position-relative btn primery-btn d-flex align-items-center gap-2 p-1 px-2 rounded-pill"
                        >
                            <ArrowLeft size={15} />
                            <p className="m-0">Back to Tour Packages</p>
                        </Link>
                    </div>
                </Container>
                <Container className="hero-content pb-3 pb-md-4">
                    <div className="tag mb-3">
                        ✨ {tour.duration}
                    </div>

                    <h1 className="display-4 fw-bold text-white">
                        {tour.title}
                    </h1>

                    <p className="d-none d-lg-block fs-6 lead text-white-75">
                        {tour.description}
                    </p>
                    {tour?.routes?.length > 0 && (
                        <ul className="d-none px-2 m-0 bg-light tour-route d-md-flex flex-wrap justify-content-start align-items-center">
                            {(tour.routes || []).map((route, i) => (
                                <li
                                    key={i}
                                    className="p-1 small-12 rounded bg-primery-color text-decoration-none text-dark"
                                >
                                    {route} &nbsp; {i !== (tour.routes?.length || 0) - 1 && "---"}
                                </li>
                            ))}
                        </ul>
                    )}
                </Container>
            </section>

            {/* MAIN CONTENT */}
            <Container className="main-section pb-5 pt-0">
                <Row className="gy-1 gy-md-4 gy-xl-5 m-0">
                    {/* LEFT CONTENT */}
                    <Col lg={8}>
                        <div className="">
                            <p className="lead text-dark fs-6 d-block d-lg-none my-2 pb-2">
                                {tour.description}
                            </p>
                            {tour?.routes?.length > 0 && (
                                <ul className="d-block d-md-none px-2 my-2 m-0 bg-light tour-route d-flex flex-wrap justify-content-start align-items-center">
                                    {(tour.routes || []).map((route, i) => (
                                        <li
                                            key={i}
                                            className="p-1 small-12 rounded bg-primery-color text-decoration-none text-dark"
                                        >
                                            {route} &nbsp; {i !== (tour.routes?.length || 0) - 1 && "---"}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="trinery-bg p-3 mt-4 mt-md-0 rounded-2 shadow-sm">
                            <Row>
                                {/* EXPERIENCE INCLUSIONS */}
                                <Col md={6} className="border-md-end m-0">
                                    {tour.inclusions &&
                                        tour.inclusions.length > 0 && (
                                            <div className="section-block m-0">
                                                <h4 className="section-title fw-bold mb-4 h6 text-capitalize">
                                                    Tour Includes
                                                </h4>

                                                <div className="d-flex flex-row flex-wrap justify-content-start gap-3 mb-3 mb-md-0">
                                                    {(tour.inclusions || []).map(
                                                        (item, i) => {
                                                            const iconName = typeof item === "object"
                                                                ? item.in_icon
                                                                : null;
                                                            const LucideIcon = iconName && Icons[iconName];
                                                            // Icons[item.in_icon];

                                                            return (
                                                                <div
                                                                    key={i}
                                                                    className="inclusion-item d-flex flex-column align-items-center"
                                                                >
                                                                    {LucideIcon ? (
                                                                        <LucideIcon
                                                                            size={24}
                                                                            className="primery-color"
                                                                        />
                                                                    ) : (
                                                                        <Icons.HelpCircle
                                                                            size={24}
                                                                            className="text-muted"
                                                                        />
                                                                    )}

                                                                    {/* <p className="m-0 small-12 text-center">
                                                                        {item}
                                                                    </p> */}
                                                                    <p className="m-0 small-12 text-center">
                                                                        {typeof item === "object"
                                                                            ? item.label
                                                                            : item}
                                                                    </p>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    }
                                </Col>

                                {/* TOUR HIGHLIGHTS */}
                                <Col md={6} className="pt-4 pt-md-0">
                                    <div className="section-block m-0">
                                        <h4 className="section-title fw-bold mb-4 h6 text-capitalize">
                                            Tour Highlights
                                        </h4>

                                        <Row>
                                            {(tour.highlights || [])
                                                .slice(0, 4)
                                                .map((item, i) => (
                                                    <Col
                                                        xs={6}
                                                        lg={12}
                                                        xl={6}
                                                        key={i}
                                                    >
                                                        <div className="p-1 rounded h-100 d-flex flex-row justify-content-start align-items-center gap-2 text-start">
                                                            <Circle
                                                                size={10}
                                                                className="primery-color"
                                                            />

                                                            <p className="m-0">
                                                                {item}
                                                            </p>
                                                        </div>
                                                    </Col>
                                                ))}
                                        </Row>

                                        <HighlightsModal>
                                            {(tour.highlights || []).map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="p-1 rounded h-100 d-flex flex-row justify-content-start align-items-center gap-2 text-start"
                                                >
                                                    <Circle
                                                        size={10}
                                                        className="primery-color"
                                                    />

                                                    <p className="m-0">{item}</p>
                                                </div>
                                            ))}
                                        </HighlightsModal>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        {/* ITINERARY */}
                        {tour.itineraries &&
                            tour.itineraries.length > 0 && (
                                <div className="section-block mb-0 mt-4">
                                    <h4 className="section-title fw-bold mb-2">
                                        The Itinerary
                                    </h4>

                                    {(tour.itineraries || []).map((day, i) => (
                                        <div
                                            key={day.id}
                                            className={`timeline-item mb-0 position-relative ps-0 ps-sm-4 ${i !==
                                                (tour.itineraries?.length || 0) - 1
                                                ? "pb-4"
                                                : ""
                                                }`}
                                        >
                                            <div className="timeline-dot"></div>

                                            <Row className="align-items-start">
                                                <Col md={9}>
                                                    <span className="badge bg-brand-light primery-color ms-2 ms-sm-0">
                                                        Day {i + 1}
                                                        {/* {i + 1} */}
                                                    </span>

                                                    <h5 className="fw-bold sub-heading text-dark">
                                                        {day.itinerary_title}
                                                    </h5>

                                                    <p
                                                        className={`text-secondary ${expandedItems[i] ? "" : "line-clamp-5"
                                                            }`}
                                                    >
                                                        {day.description || ""}
                                                    </p>

                                                    {day.description?.length > 261 && (
                                                        <motion.button
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => loadMore(i)}
                                                            className="primery-btn py-1 px-2 small-12 rounded-2"
                                                        >
                                                            {expandedItems[i] ? "Show Less" : "Load More"}
                                                        </motion.button>
                                                    )}
                                                </Col>

                                                {/* <Col md={3}>
                                                    {day.itineraries_image_url && (
                                                        <div
                                                            className="position-relative"
                                                            style={{
                                                                height: "120px",
                                                            }}
                                                        >
                                                            <Image
                                                                src={day.itineraries_image_url}
                                                                alt={
                                                                    day.itinerary_title
                                                                }
                                                                fill
                                                                className="rounded shadow-sm object-fit-cover mt-3"
                                                            />
                                                        </div>
                                                    )}
                                                </Col> */}
                                                <Col md={3}>
                                                    {day.itineraries_image_url && (
                                                        <div
                                                            className="position-relative"
                                                            style={{
                                                                width: "100%",
                                                                height: "120px",
                                                            }}
                                                        >
                                                            <Image
                                                                src={imageUrl(day.itineraries_image_url)}
                                                                alt={day.itinerary_title || "Itinerary"}
                                                                fill
                                                                unoptimized
                                                                sizes="(max-width: 768px) 100vw, 25vw"
                                                                className="rounded shadow-sm object-fit-cover mt-3"
                                                            />
                                                        </div>
                                                    )}
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                </div>
                            )}

                        {/* TABS */}
                        <div className="section-block tour-tab-section mb-4 mb-md-0 mt-5 border-top pt-4">
                            <TourTabs tour={tour}
                                cancellationPolicy={cancellationPolicy}
                                paymentPolicy={paymentPolicy}
                            />
                        </div>
                    </Col>

                    {/* SIDEBAR */}
                    <Col lg={4}>
                        <aside className="booking-card sticky-top mb-5 mb-md-0 z-3 p-4 rounded bg-white border" style={{ top: '110px' }}>
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <FileText size={20} />
                                <h4 className="text-start m-0">Booking Summery</h4>
                            </div>
                            <div className="price mb-4">
                                <span className="h3 fw-bold primery-color">₹ {Number(tour.base_price || 0).toLocaleString("en-IN")}</span>
                                {/* ₹ {(tour.base_price || 0).toLocaleString()}  */}
                                <span className="text-muted"> / person</span>
                            </div>
                            <div className="info-box mb-4 p-3 rounded">
                                {/* <p className="mb-1"><strong>Group:</strong> &nbsp;2-6 People</p> */}
                                <p className="mb-1"><strong>Duration:</strong> &nbsp;{tour.duration}</p>
                                {/* <p className="mb-1"><strong>Duration:</strong> &nbsp;5 Days / 4 Nights</p> */}
                                {/* <p className="departure-date m-0">
                                    <strong>Departure:</strong> &nbsp;{tour.departureDate || 'Check Availability'}
                                </p> */}
                            </div >
                            <Link
                                href={`/tour-package/book/${slugify(tour.slug)}`}
                                className="primery-btn d-flex align-items-center justify-content-center gap-2 w-100 py-3 text-center text-decoration-none fw-bold rounded shadow-sm mb-3"
                            >
                                <CalendarCheck size={18} />
                                Book Now
                            </Link>

                            <WhatsAppShareBtn tour={tour} />

                            <p className="note text-center text-muted small-12 italic mt-2">
                                * Limited slots available for Kumbh Mela dates.
                            </p>
                        </aside>
                    </Col>

                    <Col xs={12}>
                        <TourPackageSlider
                            packages={recentPackages}
                            title="Recent Packages"
                        />
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default TourPackageDetail;