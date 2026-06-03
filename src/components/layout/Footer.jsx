"use client"
import React from 'react'
import {
    Mail,
    Phone,
    MapPin,
    MessageCircle,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import "../../styles/footer.scss"
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";
import { Col, Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <>
            <footer id="contact" className="custom-footer text-white">
                {/* Main Footer */}
                <div className="container py-2 py-sm-4 py-md-5">

                    <Row className="gy-2 gy-md-4">
                        {/* About */}
                        <Col md={6} lg={3}>
                            {/* logo */}
                            <div className="d-flex align-items-center mb-4">
                                <div className="footer-logo-icon">
                                    <span>ॐ</span>
                                </div>
                                <div className="ms-2">
                                    <h3 className="footer-title">Nashik Kumbh</h3>
                                    <p className="footer-subtitle">Mela 2027</p>
                                </div>
                            </div>
                            <p className="footer-text d-none d-md-block">
                                Your trusted guide to the sacred Nashik Kumbh Mela pilgrimage.
                                Experience the divine gathering with complete information and support.
                            </p>
                            {/* social links */}
                            <div className="d-flex gap-2 mt-3 mb-3">
                                {/* facebook */}
                                <a href="#" className="social-icon">
                                    <Image
                                        src="/images/facebook-logo.svg"
                                        alt="Facebook"
                                        width={18}
                                        height={18}
                                        className='img-fluid'
                                    />
                                </a>
                                {/* twitter - x */}
                                <a href="#" className="social-icon">
                                    <Image
                                        src="/images/x-logo.svg"
                                        alt="Twitter"
                                        width={18}
                                        height={18}
                                        className='img-fluid'
                                    />
                                </a>
                                {/* instagram */}
                                <a href="#" className="social-icon">
                                    <Image
                                        src="/images/instagram-logo.svg"
                                        alt="Instagram"
                                        width={18}
                                        height={18}
                                        className='img-fluid'
                                    />
                                </a>
                                {/* youtube */}
                                <a href="#" className="social-icon">
                                    <Image
                                        src="/images/youtube-logo.svg"
                                        alt="Youtube"
                                        width={18}
                                        height={18}
                                        className='img-fluid'
                                    />
                                </a>
                            </div>
                        </Col>

                        {/* Quick Links */}
                        <Col md={6} lg={3} className='d-none d-md-block'>
                            <h3 className="footer-heading">Quick Links</h3>

                            <ul className="list-unstyled">
                                {NAV_LINKS.map((link, index) => (
                                    <li key={index} className="mb-2">
                                        <Link
                                            href={link.path}
                                            className="footer-link"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                        <Col md={6} lg={3}>
                            <h3 className="footer-heading">Other Services We Offer:</h3>
                            <ul className='services-link'>
                                <li className='mb-0 mb-md-2'>Car Rental Pan India</li>
                                <li className='mb-0 mb-md-2'>Luxury Car Marriage Corporate</li>
                                <li className='mb-0 mb-md-2'>Traveller & Bus</li>
                                <li className='mb-0 mb-md-2'>Flight Ticketing</li>
                                <li className='mb-0 mb-md-2'>Holidays Packages</li>
                                <li className='mb-0 mb-md-2'>Hotel Reservations</li>
                                <li className='mb-0 mb-md-2'>Visa Services</li>
                                <li className='mb-0 mb-md-2'>Passport Assistance</li>
                            </ul>

                        </Col>
                        {/* Contact Info */}
                        <Col md={6} lg={3} className='d-none d-md-block'>
                            <h3 className="footer-heading">Contact Information</h3>

                            <ul className="list-unstyled footer-contact">
                                <li className="d-flex mb-3">
                                    <MapPin size={18} className="me-2 mt-1 icon" />
                                    <span>
                                        Nashik Tourism Office <br />
                                        Panchavati, Nashik 422003 <br />
                                        Maharashtra, India
                                    </span>
                                </li>

                                <li className="d-flex mb-3">
                                    <Phone size={18} className="me-2 mt-1 icon" />
                                    <div>
                                        <a href="tel:+911234567890" className="footer-link d-block">
                                            +91 1234 567 890
                                        </a>
                                        <a href="tel:1800" className="footer-link d-block">
                                            Toll Free: 1800-XXX-XXXX
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

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <div className="container py-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
                        <p className="mb-0 small text-center text-md-start">
                            © 2026 Nashik Kumbh Mela. All rights reserved.
                        </p>

                        <div className="d-flex gap-3">
                            <p className="footer-text m-0">Design and Developed by <a href="https://webique.in/" target="_blank" className='footer-link--webname'>Webique Technology</a></p>
                            {/* <a href="#" className="footer-link small">Terms & Conditions</a>
                            <a href="#" className="footer-link small">Disclaimer</a> */}
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default Footer;