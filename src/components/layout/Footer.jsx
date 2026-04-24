"use client"
import React from 'react'
import {
    Mail,
    Phone,
    MapPin,
    MessageCircle,
} from "lucide-react";
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
                            <p className="footer-text">
                                Your trusted guide to the sacred Nashik Kumbh Mela pilgrimage.
                                Experience the divine gathering with complete information and support.
                            </p>
                            {/* social links */}
                            <div className="d-flex gap-2 mt-3">
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
                        <Col md={6} lg={3}>
                            <h3 className="footer-heading">Quick Links</h3>
                            <ul className="list-unstyled">
                                {NAV_LINKS.map((link, index) => (
                                    <li key={index} className="mb-2">
                                        <a
                                            href={`${link.path.toLowerCase().replace(/ /g, "-")}`}
                                            className="footer-link"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </Col>

                        {/* Contact Info */}
                        <Col md={6} lg={3}>
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

                        {/* WhatsApp & Newsletter */}
                        <Col md={6} lg={3}>
                            <h3 className="footer-heading">Get In Touch</h3>

                            <a
                                href="https://wa.me/1234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn whatsapp-btn w-100 mb-4 d-flex align-items-center justify-content-center gap-2"
                            >
                                <MessageCircle size={20} />
                                <div>
                                    <p className="mb-0 small fw-semibold">WhatsApp Support</p>
                                    <small>Available 24/7</small>
                                </div>
                            </a>

                            <div className="newsletter-box">
                                <h4 className="small fw-semibold mb-2">Stay Updated</h4>
                                <p className="small mb-3">
                                    Get latest updates about Kumbh Mela events and schedules
                                </p>

                                <div className="d-flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className="form-control form-control-sm"
                                    />
                                    <button className="btn btn-subscribe btn-sm">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
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
                            <a href="#" className="footer-link small">Privacy Policy</a>
                            <a href="#" className="footer-link small">Terms & Conditions</a>
                            <a href="#" className="footer-link small">Disclaimer</a>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default Footer;