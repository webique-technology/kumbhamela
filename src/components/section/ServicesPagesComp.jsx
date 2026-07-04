"use client";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import { CheckCircle, ArrowRight, Subtitles } from "lucide-react";

import { useTranslations } from "next-intl";
import aboutHero2 from "@/assets/images/about-hero-2.png";
import aboutHero1 from "@/assets/images/about-hero-1.png";

export const ServicesPageMainHeader = ({ title, spanTitle, subTitle, image, description, }) => {
    return (
        <section className="kumbh-hero">
            <div className="hero-bg">
                <img src={image ? image.src : aboutHero1.src} alt="Godavari River" />
                <div className="hero-gradient"></div>
            </div>
            <Container className="container d-flex hero-content-wrapper">
                <div className="max-w-700 d-flex flex-column align-items-center align-items-lg-start">
                    <span className="playfair-display h4 primery-color">Car Rental Pan India</span>
                    <h1 className="hero-title mb-2 text-light">
                        Car Rental <span className="hero-span primery-color">Pan India</span>
                    </h1>
                    <p className="hero-para text-center text-lg-start mb-3">
                        Explore the vast beauty of India with our reliable and comfortable car rental services. Whether you're planning a religious pilgrimage, a family vacation, or a business trip, we have the perfect vehicle for your journey. Our fleet includes a wide range of cars to suit your needs and preferences.
                    </p>
                    {/* <button className="primery-btn py-3 px-5">
                            {t("Hero.cta")} <ArrowRight size={20} className="ms-2" />
                        </button> */}
                </div>
            </Container>
        </section>
    );
}

export const ServicePageSecondSec = ({ subTitle, title, spanTitle, description, serviceList, image, statNum, statText, legacyMeta }) => {
    return (
        <section className="legacy-hero section-padding secondary-bg">
            <Container>
                <Row className="align-items-center justify-content-center">
                    <Col md={6} className="hero-text-col">
                        {subTitle && <span className="playfair-display h4 primery-color">{subTitle}</span>}
                        <h1
                            className="hero-title mt-3"
                            style={{
                                wordBreak: "break-word",
                                overflowWrap: "break-word",
                                maxWidth: "100%"
                            }}
                        >
                            {title} <span className="hero-span primery-color">{spanTitle}</span>
                        </h1>
                        <p className="description-text mt-4">
                            {description}
                        </p>
                        {legacyMeta && (
                            <div className="shrine-meta mb-3 mb-md-0 d-flex align-items-center gap-3 mt-4">
                                <CheckCircle className="text-secondary" />
                                <span className="italic-meta">{legacyMeta}</span>
                            </div>
                        )}
                        {serviceList && serviceList.length > 0 && (
                            <ul className="d-flex flex-wrap gap-3 p-0 mt-4">
                                {serviceList.map((service, i) => (
                                    <li key={i} className="badge primary-badge sora">{service.listName}</li>
                                ))}
                            </ul>
                        )}
                    </Col>
                    <Col md={6} className="hero-img-col">
                        <div className="hero-img-wrapper d-flex align-items-center justify-content-center shadow-2xl">
                            <Image
                                src={image ? image.src : aboutHero2.src}
                                alt="Car Rental Fleet"
                                width={484}
                                height={300} // Increased from 100 to prevent layout distortion aspect-ratio bugs
                                className="img-fluid"
                            />

                            {statNum && statText && (
                                <div className="floating-stat-card shadow-sm d-none d-md-block">
                                    <p className="stat-number mb-2">{statNum}</p>
                                    <p className="stat-text mb-0">{statText}</p>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="abstract-wave"></div>
        </section>
    );
};