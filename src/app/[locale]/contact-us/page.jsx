"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container, Row, Col, Form, Accordion } from "react-bootstrap";
import "../../../styles/contactPage.scss";
import "../../../assets/scss/main.scss";
import { PrimeryBtn, WhatsappBtn } from "@/components/ui/button";
import { faqData } from "@/lib/data";
import { TitleComponent } from "@/components/ui/common";
import { HeroHeaderCard } from "@/components/ui/card";
import { MapPin, Phone, Mail, Building2, MessageCircle } from "lucide-react";
import Link from "next/link";

const branhesData = [
    {
        branchCity: "Nashik",
        branchURL: "https://maps.app.goo.gl/GbHZtkYPSYTcdxhFA",
        branchAddress: "Sakal Office Basement, BA 4, Thakkar Bazar, New CBS, Police Staff Colony, Nashik, Maharashtra 422002",
        branchPhone: "7507778070",
        // branchEmail: "",
    },
    {
        branchCity: "Pune",
        branchURL: "https://maps.app.goo.gl/8vsyB8s35RR1vdKYA",
        branchAddress: "2nd Floor, Pride Icon, Baner Road, Pune, Maharashtra 411045",
        branchPhone: "7507778075",
        // branchEmail: "",
    },
    {
        branchCity: "Shirdi",
        branchURL: "https://maps.app.goo.gl/d1AJ7ZNXwKnwTNdU9",
        branchAddress: "Sai Plaza Complex, Near Temple Road, Shirdi, Maharashtra 423109",
        branchPhone: "7507778095",
        // branchEmail: "",
    },
    {
        branchCity: "Mumbai",
        branchURL: "https://maps.app.goo.gl/VjmYdzxR6WM3bt1V8",
        branchAddress: "Plot No. 12, CIDCO Area, Chatrapati Sambhaji Nagar, Maharashtra 431001",
        branchPhone: "7507778085",
        // branchEmail: "",
    },
]

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
                    // heroSubtitle="Connect With Us"
                    heroImage="/images/contact-page-bg.png"
                    imgClass="hero-img"
                    showSearch={false}
                />
                {/* </Container> */}
            </section>

            {/* form */}
            <section className="contact-page-wrapper section-padding">
                <Container>
                    <Row className="g-4 align-items-start">
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
                            <div className="support-card d-flex flex-column justify-between gap-3 h-100 p-0">
                                {/* Nashik */}
                                {branhesData.map((branch, index) => (
                                    <Link href={branch.branchURL} className="text-decoration-none shadow-sm branch-card" target="_blank" key={index}>
                                        <div className="branch-city">
                                            <Building2 size={22} className="primery-color"/>
                                            <h3>{branch.branchCity}</h3>
                                        </div>

                                        <div className="branch-info">
                                            <MapPin size={18} className="primery-color"/>
                                            <p>{branch.branchAddress}</p>
                                        </div>

                                        <div className="branch-info">
                                            <Phone size={18} className="primery-color"/>
                                            <Link href={`tel:+${branch.branchPhone}`}>{branch.branchPhone}</Link>
                                            {/* <a href={`tel:+${branch.branchPhone}`}>{branch.branchPhone}</a> */}
                                        </div>

                                    </Link>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* faq section */}
            {/* faq section */}
            <section className="faq-section section-padding padding-bottom">
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