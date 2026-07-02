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

import "../../styles/footer.scss";
import "../../assets/scss/main.scss";

import facebook from "../../assets/images/facebook-logo.svg";
import insta from "../../assets/images/instagram-logo.svg";
import youtube from "../../assets/images/youtube-logo.svg";
import xLogo from "../../assets/images/x-logo.svg";
import logo from "../../assets/images/maharashtra-tour-logo.png"
import googleLogo from "../../assets/images/google-logo.png";
import tripAdvisorLogo from "../../assets/images/trip-advisor.png";
import justdial from "../../assets/images/justdial-logo.png";

const ServicesList = () => {
    // 1. Tell useTranslations to target the "Footer" namespace scope where servicesList lives
    const t = useTranslations("Footer");

    const serviceKeys = ['panIndia', 'marriage', 'traveller', 'flights', 'holidays', 'hotels', 'visa', 'passport'];

    return (
        <ul className='services-link list-unstyled'>
            {serviceKeys.map((key) => {
                // 2. Use t.raw() to pull out the array successfully in next-intl
                const points = t.raw(`servicesList.${key}.points`) || [];

                return (
                    <li key={key} className='mb-2'>
                        {t(`servicesList.${key}.title`)}
                        <div className='p-2 footer-description-box fw-normal'>
                            <ul className='mb-0 ps-0'>
                                {Array.isArray(points) && points.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

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
                            <div className="">
                                {/* <span>ॐ</span> */}
                                <img src={logo.src} alt="Logo" width={50} height={50} className="me-1" />
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
                            <a href="https://www.threads.com/@mahakumbh_tours_travels" target='_blank' rel="noopener noreferrer" className="social-icon">
                                <Image
                                    src={xLogo}
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
                            <a href="https://www.youtube.com/@mahakumbhtourstravels" className="social-icon">
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
                    <Col md={6} lg={2} className='d-none d-md-block'>
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
                        {/* <ul className='services-link list-unstyled'>
                            <li className='mb-2'>{t("servicesList.panIndia.title")}
                                <div className='p-2 footer-description-box'>
                                    {t("servicesList.panIndia.points")}
                                </div>
                            </li>
                            <li className='mb-2'>{t("servicesList.marriage.title")}
                                <div className='p-2 footer-description-box'>
                                    {t("servicesList.marriage.points")}
                                </div>
                            </li>
                            <li className='mb-2'>{t("servicesList.traveller.title")}
                                <div className='p-2 footer-description-box'>
                                    {t("servicesList.traveller.points")}
                                </div>
                            </li>
                            <li className='mb-2'>{t("servicesList.flights.title")}
                                <div className='p-2 footer-description-box'>
                                    {t("servicesList.flights.points")}
                                </div>
                            </li>
                            <li className='mb-2'>{t("servicesList.holidays.title")}
                                <div className='p-2 footer-description-box'>
                                    {t("servicesList.holidays.points")}
                                </div>
                            </li>
                            <li className='mb-2'>{t("servicesList.hotels.title")}
                                <div className='p-2 footer-description-box'>
                                    {t("servicesList.hotels.points")}
                                </div>
                            </li>
                            <li className='mb-2'>{t("servicesList.visa.title")}
                                <div className='p-2 footer-description-box'>
                                    {t("servicesList.visa.points")}
                                </div>
                            </li>
                            <li className='mb-2'>{t("servicesList.passport.title")}
                                <div className='p-2 footer-description-box'>
                                    {t("servicesList.passport.points")}
                                </div>
                            </li>
                        </ul> */}
                        <ServicesList />
                    </Col>

                    {/* 4. Local Contact Mapping Block */}
                    <Col md={6} lg={4} className=''>
                        <div className='d-none d-md-block'>
                            <h3 className="footer-heading">{t("contactInfo")}</h3>
                            <ul className="list-unstyled footer-contact">
                                <li className="d-flex mb-3">
                                    <MapPin size={18} className="me-2 mt-1 icon flex-shrink-0" />
                                    <a href="https://maps.app.goo.gl/2snH44TGiHw6UATM7" target='_blank' className='footer-link d-block'>
                                        <span>{t("address")}</span>
                                    </a>
                                </li>
                                <li className="d-flex mb-3">
                                    <Phone size={18} className="me-2 mt-1 icon" />
                                    <div>
                                        <a href="tel:+917507778088" className="footer-link d-block">
                                            +91 75077 78088
                                        </a>
                                    </div>
                                </li>
                                <li className="d-flex align-items-center">
                                    <Mail size={18} className="me-2 mt-1 icon" />
                                    <div className="d-flex flex-column">
                                        <a href="mailto:kumbhtourstravels@gmail.com" className="footer-link">
                                            kumbhtourstravels@gmail.com
                                        </a>
                                        <a href="mailto:mahakumbhtourstravels@gmail.com" className="footer-link">
                                            mahakumbhtourstravels@gmail.com
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex mb-3 mb-md-0 flex-wrap align-items-center gap-2 justify-content-start">
                            {/* Apple App Store Button */}
                            <Link
                                href={"https://share.google/aNNTiYPnbUpJd4oaT"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="play-style-btn p-1 px-2 d-flex gap-2 align-items-center flex-row transition-hover"
                            // style={{ height: "45px" }} // Explicit height forces matching scale
                            >
                                <img
                                    src={googleLogo.src} // Update this path to where your image is saved
                                    alt="Download on the App Store"
                                    className="w-auto h-100 object-fit-contain rounded-2"
                                    style={{ maxHeight: "25px" }}
                                />
                                <div className='d-flex flex-column align-items-start'>
                                    <p className='small-12 mb-0'>Get It On</p>
                                    <h4 className="small-12 m-0">Google Search</h4>
                                </div>
                            </Link>
                            {/* Google Play Store Button */}
                            <Link
                                href={"https://www.tripadvisor.in/"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="play-style-btn p-1 px-2 d-flex gap-2 align-items-center flex-row transition-hover"
                            // style={{ height: "45px" }} // Identical explicit height
                            >
                                <img
                                    src={tripAdvisorLogo.src}// Update this path to where your image is saved
                                    alt="Get it on Google Play"
                                    className="w-auto h-100 object-fit-contain rounded-2"
                                    style={{ maxHeight: "25px" }}
                                />
                                <div className='d-flex flex-column align-items-start'>
                                    <p className='small-12 mb-0'>Get It On</p>
                                    <h4 className="small-12 m-0">Trip Advisor</h4>
                                </div>
                            </Link>
                            {/* Just dail btn */}
                            <Link
                                href={"https://www.justdial.com/"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="play-style-btn p-1 px-2 d-flex gap-2 align-items-center flex-row transition-hover"
                            // style={{ height: "45px" }} // Identical explicit height
                            >
                                <img
                                    src={justdial.src}// Update this path to where your image is saved
                                    alt="Get it on Google Play"
                                    className="w-auto h-100 object-fit-contain rounded-2"
                                    style={{ maxHeight: "25px" }}
                                />
                                <div className='d-flex flex-column align-items-start'>
                                    <p className='small-12 mb-0'>Get It On</p>
                                    <h4 className="small-12 m-0">Justdial</h4>
                                </div>
                            </Link>
                        </div>
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