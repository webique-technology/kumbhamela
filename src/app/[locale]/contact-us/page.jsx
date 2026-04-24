"use client";
import React, { useState } from "react";
import { Container, Row, Col, Form, Accordion } from "react-bootstrap";
import { MessageCircle, MapPin } from "lucide-react";
import "../../../styles/contactPage.scss";
import "../../../assets/scss/main.scss";
import { PrimeryBtn, WhatsappBtn } from "@/components/ui/button";
import { faqData } from "@/lib/data";
import { TitleComponent } from "@/components/ui/common";
import { HeroHeaderCard } from "@/components/ui/card";

const ContactUs = () => {
    // 1. Form State
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        inquiryType: "Vehicle Rental",
        message: ""
    });

    // 2. Error State for Validation
    const [errors, setErrors] = useState({});

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when user starts typing
        if (!!errors[name]) setErrors({ ...errors, [name]: null });
    };

    // 3. Validation and WhatsApp Redirect Function
    const handleWhatsAppSubmit = (e) => {
        if (e) e.preventDefault();

        const newErrors = {};
        // Basic Validation
        if (!formData.fullName) newErrors.fullName = "Please enter your name";
        if (!formData.email || !formData.email.includes("@")) newErrors.email = "Please enter a valid email";
        if (!formData.mobile || formData.mobile.length < 10) newErrors.mobile = "Please enter a valid mobile number";
        if (!formData.message) newErrors.message = "Please enter your requirement";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Stop if there are errors
        }

        // 4. Construct WhatsApp Message
        const phoneNumber = "919022093522"; // Your Business Number
        const text = `*New Inquiry - Nashik Kumbh Concierge*%0A%0A` +
            `*Name:* ${formData.fullName}%0A` +
            `*Email:* ${formData.email}%0A` +
            `*Mobile:* ${formData.mobile}%0A` +
            `*Type:* ${formData.inquiryType}%0A` +
            `*Message:* ${formData.message}`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;

        // Redirect to WhatsApp
        window.open(whatsappUrl, "_blank");
    };

    return (
        <main>
            {/* Header Hero Card */}
            <section className="contact-page-wrapper">
                {/* <Container> */}
                    {/* <div className="contact-hero-card">
                        <div className="hero-overlay">
                            <div className="hero-content">
                                <span className="hero-subtitle">Connect With Us</span>
                                <h1 className="hero-title">Pilgrim Concierge & Support</h1>
                            </div>
                        </div>
                        <img
                            src="/images/contact-page-bg.png"
                            alt="Godavari River Nashik"
                            className="hero-img"
                        />
                    </div> */}
                    <HeroHeaderCard 
                        heroTitle="Pilgrim Concierge & Support"
                        heroSubtitle="Connect With Us"
                        heroImage="/images/contact-page-bg.png"
                        imgClass="hero-img"
                    />
                {/* </Container> */}
            </section>

            {/* form */}
            <section className="contact-page-wrapper section-padding">
                <Container>
                    <Row className="g-4">
                        <Col lg={7}>
                            <div className="form-container shadow-sm h-100">
                                <h2 className="form-heading">Submit an Inquiry</h2>
                                <p className="form-subheading">
                                    Our premium concierge team typically responds within 2 hours.
                                </p>

                                <Form className="contact-form">
                                    <Row className="g-3">
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control
                                                    name="fullName"
                                                    type="text"
                                                    placeholder="Arjun Sharma"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.fullName}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control
                                                    name="email"
                                                    type="email"
                                                    placeholder="arjun@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Mobile Number</Form.Label>
                                                <Form.Control
                                                    name="mobile"
                                                    type="tel"
                                                    placeholder="+91 98765 43210"
                                                    value={formData.mobile}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.mobile}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Inquiry Type</Form.Label>
                                                <Form.Select
                                                    name="inquiryType"
                                                    value={formData.inquiryType}
                                                    onChange={handleChange}
                                                >
                                                    <option>Vehicle Rental</option>
                                                    <option>Accommodation Concierge</option>
                                                    <option>VVIP Darshan Support</option>
                                                    <option>Logistics & Travel</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Group className="mb-4">
                                                <Form.Label>Your Message</Form.Label>
                                                <Form.Control
                                                    name="message"
                                                    as="textarea"
                                                    rows={4}
                                                    placeholder="How can our pilgrimage team assist you today?"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.message}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    {/* form submit button */}
                                    <WhatsappBtn
                                        title={"Send Request"}
                                        className={"whatsapp-btn"}
                                        onClick={handleWhatsAppSubmit}
                                    />
                                </Form>
                            </div>
                        </Col>

                        <Col lg={5}>
                            <Row className="sidebar-wrapper g-4">
                                {/* WhatsApp Support Card */}
                                <Col md={6} lg={12}>
                                    <div className="support-card shadow-sm h-100">
                                        <div className="support-content h-100 d-grid">
                                            <div className="live-badge d-flex py-1 align-items-center justify-content-center">
                                                <span className="pulse-dot"></span>
                                                Live Now
                                            </div>
                                            <h3>Immediate Support</h3>
                                            <p>Need urgent assistance? Our WhatsApp concierge is available 24/7.</p>
                                            <PrimeryBtn
                                                title={"Message on WhatsApp"}
                                                iconLeft={<MessageCircle size={28} />}
                                                className={"whatsapp-btn w-100 py-2 h5 justify-content-center"}
                                                btnLink={"https://wa.me/919022093522"}
                                            />
                                        </div>
                                        <div className="card-blob"></div>
                                    </div>
                                </Col>
                                {/* Location Card */}
                                <Col md={6} lg={12}>
                                    <div className="location-card shadow-sm">
                                        <div className="d-flex align-items-center gap-3 h-100 mb-4">
                                            <div className="location-icon d-flex align-items-center justify-content-center">
                                                <MapPin size={24} />
                                            </div>
                                            <div className="location-text">
                                                <h3 className="m-0">Central Office</h3>
                                                <p className="m-0">Panchavati, Nashik, MH 422003</p>
                                            </div>
                                        </div>
                                        <div className="mini-map-container">
                                            <img
                                                src="/images/map-placeholder.png"
                                                alt="Map of Nashik Area"
                                                className="map-img"
                                            />
                                            <div className="map-marker">
                                                <div className="marker-pulse"></div>
                                                <div className="marker-dot"></div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* faq section */}
            {/* faq section */}
            <section className="faq-section section-padding">
                <Container>
                    {/* Section Header */}
                    <TitleComponent
                        title={"Common Inquiries"}
                        className={"text-center mb-5"}
                    />

                    {/* Accordion Map */}
                    <div className="faq-wrapper mx-auto">
                        {/* 
                            1. defaultActiveKey={faqData[0]?.id}: This opens the first item in the array.
                            2. Removing 'flush' if you want the rounded shadow look to stay consistent.
                        */}
                        <Accordion defaultActiveKey={faqData[0]?.id}>
                            {faqData.map((item) => (
                                <Accordion.Item
                                    eventKey={item.id}
                                    key={item.id}
                                    className="faq-item shadow-sm"
                                >
                                    <Accordion.Header className="faq-header">
                                        {item.question}
                                    </Accordion.Header>
                                    <Accordion.Body className="faq-body">
                                        {item.answer}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default ContactUs;