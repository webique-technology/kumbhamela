"use client";
import React from 'react';
import {
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";
import { Col, Row } from 'react-bootstrap';

// स्टाइलिंग पाथ्स
import "../../styles/footer.scss";
import "../../assets/scss/main.scss";

// एसेट्स इम्पोर्ट्स
import facebook from "../../assets/images/facebook-logo.svg";
import insta from "../../assets/images/instagram-logo.svg";
import youtube from "../../assets/images/youtube-logo.svg";

const Footer = () => {
    // next-intl का उपयोग करके डिक्शनरी हुक को बाइंड किया
    const t = useTranslations("Footer");
    const tNavbar = useTranslations("Navbar");

    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="custom-footer position-relative text-white">
            <div className="bottom-divider position-absolute z-3" style={{ top: "-86px", filter: "invert(0.95)" }}></div>

            {/* Main Footer Inner Grid Content */}
            <div className="container pb-2 pb-sm-4 pb-md-5">
                <Row className="gy-4">

                    {/* 1. About Module Frame Segment */}
                    <Col md={6} lg={3}>
                        <div className="d-flex align-items-center mb-4">
                            <div className="footer-logo-icon">
                                <span>ॐ</span>
                            </div>
                            <div className="ms-2">
                                <h3 className="footer-title">{tNavbar("logoTitle")}</h3>
                                <p className="footer-subtitle">{tNavbar("logoSubtitle")}</p>
                            </div>
                        </div>
                        <p className="footer-text d-none d-md-block">
                            {t("description")}
                        </p>

                        {/* Social Link Wrappers */}
                        <div className="d-flex gap-2 mt-3 mb-3">
                            <a href="https://www.facebook.com/people/Mahakumbh-Tours-Travels/61585265510417/?ref=PROFILE_EDIT_xav_ig_profile_page_web#" target='_blank' rel="noopener noreferrer" className="social-icon">
                                <Image
                                    src={facebook}
                                    alt="Facebook"
                                    width={18}
                                    height={18}
                                    className='img-fluid'
                                />
                            </a>
                            <a href="https://www.instagram.com/mahakumbh_tours_travels/" target='_blank' rel="noopener noreferrer" className="social-icon">
                                <Image
                                    src={insta}
                                    alt="Instagram"
                                    width={18}
                                    height={18}
                                    className='img-fluid'
                                />
                            </a>
                            <a href="#" className="social-icon">
                                <Image
                                    src={youtube}
                                    alt="Youtube"
                                    width={18}
                                    height={18}
                                    className='img-fluid'
                                />
                            </a>
                        </div>
                    </Col>

                    {/* 2. Navlinks Column Layer Map */}
                    <Col md={6} lg={3} className='d-none d-md-block'>
                        <h3 className="footer-heading">{t("quickLinks")}</h3>
                        <ul className="list-unstyled">
                            {NAV_LINKS.map((link, index) => {
                                // Normalize names to match exact keys in your json files
                                let translationKey = "home";
                                const normalizedName = link.name.toLowerCase().trim();

                                if (normalizedName === "about us" || normalizedName === "about") {
                                    translationKey = "about";
                                } else if (normalizedName === "hotel") {
                                    translationKey = "hotel";
                                } else if (normalizedName === "rental car" || normalizedName === "rentalcar") {
                                    translationKey = "rentalCar"; // Matches exact camelCase in json
                                } else if (normalizedName === "tour package" || normalizedName === "tourpackage") {
                                    translationKey = "tourPackage"; // Matches exact camelCase in json
                                } else if (normalizedName === "blog") {
                                    translationKey = "blog";
                                } else if (normalizedName === "contact us" || normalizedName === "contact") {
                                    translationKey = "contact";
                                }

                                return (
                                    <li key={index} className="mb-2">
                                        <Link
                                            href={link.path}
                                            className="footer-link"
                                        >
                                            {tNavbar(translationKey)}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </Col>

                    {/* 3. Operational B2B Core Services Render Module */}
                    <Col md={6} lg={3}>
                        <h3 className="footer-heading">{t("otherServices")}</h3>
                        <ul className='services-link list-unstyled'>
                            <li className='mb-2'>{t("servicesList.panIndia")}</li>
                            <li className='mb-2'>{t("servicesList.marriage")}</li>
                            <li className='mb-2'>{t("servicesList.traveller")}</li>
                            <li className='mb-2'>{t("servicesList.flights")}</li>
                            <li className='mb-2'>{t("servicesList.holidays")}</li>
                            <li className='mb-2'>{t("servicesList.hotels")}</li>
                            <li className='mb-2'>{t("servicesList.visa")}</li>
                            <li className='mb-2'>{t("servicesList.passport")}</li>
                        </ul>
                    </Col>

                    {/* 4. Local Contact Mapping Block */}
                    <Col md={6} lg={3} className='d-none d-md-block'>
                        <h3 className="footer-heading">{t("contactInfo")}</h3>
                        <ul className="list-unstyled footer-contact">
                            <li className="d-flex mb-3">
                                <MapPin size={18} className="me-2 mt-1 icon flex-shrink-0" />
                                <span>{t("address")}</span>
                            </li>
                            <li className="d-flex mb-3">
                                <Phone size={18} className="me-2 mt-1 icon" />
                                <div>
                                    <a href="tel:+917507778088" className="footer-link d-block">
                                        +91 75077 78088
                                    </a>
                                </div>
                            </li>
                            <li className="d-flex">
                                <Mail size={18} className="me-2 mt-1 icon" />
                                <a href="mailto:info@nashikkumbh.in" className="footer-link">
                                    info@nashikkumbh.in
                                </a>
                            </li>
                        </ul>
                    </Col>

                </Row>
            </div>

            {/* Bottom Copyright Status Panel */}
            <div className="footer-bottom">
                <div className="container py-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
                    <p className="mb-0 small text-center text-md-start">
                        {t("rightsReserved", { year: currentYear })}
                    </p>
                    <div className="d-flex gap-3">
                        <p className="footer-text m-0">
                            {t("developedBy")}{" "}
                            <a href="https://webique.in/" target="_blank" rel="noopener noreferrer" className='footer-link--webname'>
                                Webique Technology
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;