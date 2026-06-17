"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { WhatsappBtn } from "@/components/ui/button";
import { HeroHeaderCard2 } from "@/components/ui/card";
import { MapPin, Phone, Building2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";

import "../../../styles/contactPage.scss";
import "../../../assets/scss/main.scss";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const branchesStaticData = [
    {
        id: "nashik",
        branchURL: "https://maps.app.goo.gl/GbHZtkYPSYTcdxhFA",
        branchPhone: "7507778070",
    },
    {
        id: "pune",
        branchURL: "https://maps.app.goo.gl/8vsyB8s35RR1vdKYA",
        branchPhone: "7507778075",
    },
    {
        id: "shirdi",
        branchURL: "https://maps.app.goo.gl/d1AJ7ZNXwKnwTNdU9",
        branchPhone: "7507778095",
    },
    {
        id: "mumbai",
        branchURL: "https://maps.app.goo.gl/VjmYdzxR6WM3bt1V8",
        branchPhone: "7507778085",
    },
];

const ContactUsPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { locale } = useParams();

    // Bind translation resources targeting ContactPage namespace
    const t = useTranslations("ContactPage");

    // Dynamically build translated data inside the component loop execution
    const branchesData = branchesStaticData.map((branch) => ({
        ...branch,
        branchCity: t(`Branches.${branch.id}.city`), // Capital "B" to match your JSON data
        branchAddress: t(`Branches.${branch.id}.address`), // Capital "B" to match your JSON data
    }));

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        inquiryType: "Vehicle Rental",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (!!errors[name]) setErrors({ ...errors, [name]: null });
    };

    const handleWhatsAppSubmit = async (e) => {
        if (e) e.preventDefault();
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = t("Form.errors.name");
        }

        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t("Form.errors.email");
        }

        if (!formData.mobile.trim() || formData.mobile.replace(/\D/g, "").length < 10) {
            newErrors.mobile = t("Form.errors.mobile");
        }

        if (!formData.message.trim()) {
            newErrors.message = t("Form.errors.message");
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);

            const payload = {
                full_name: formData.fullName,
                email: formData.email,
                mobile_number: formData.mobile,
                inquiry_type: formData.inquiryType,
                your_message: formData.message,
            };

            await axios.post(
                `${API_URL}/contact-us`,
                payload,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            const phoneNumber = "919022093522";
            const text =
                `*New Inquiry - Nashik Kumbh Concierge*%0A%0A` +
                `*Name:* ${formData.fullName}%0A` +
                `*Email:* ${formData.email}%0A` +
                `*Mobile:* ${formData.mobile}%0A` +
                `*Type:* ${formData.inquiryType}%0A` +
                `*Message:* ${formData.message}`;

            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
            window.open(whatsappUrl, "_blank");

            setFormData({
                fullName: "",
                email: "",
                mobile: "",
                inquiryType: "Vehicle Rental",
                message: "",
            });
            setErrors({});
        } catch (error) {
            console.error("Contact Form Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || t("Form.errors.general"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <HeroHeaderCard2
                subTitle={t("Hero.subTitle")}
                heroTitle={t("Hero.heroTitle")}
                description={t("Hero.description")}
                showSearch={false}
                heroTitleClass="text-light"
            />

            <section className="contact-page-wrapper section-padding-2 pt-5">
                <Container className="pb-4 pb-sm-5 pb-xl-4">
                    <Row className="g-4 align-items-start">
                        <Col lg={7}>
                            <div className="form-container shadow-sm h-100">
                                <h2 className="form-heading">{t("Form.heading")}</h2>
                                <p className="form-subheading">{t("Form.subheading")}</p>

                                <Form className="contact-form" onSubmit={handleWhatsAppSubmit}>
                                    <Row className="g-3">
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t("Form.labelName")}</Form.Label>
                                                <Form.Control
                                                    name="fullName"
                                                    type="text"
                                                    placeholder={t("Form.placeholderName")}
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.fullName}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t("Form.labelEmail")}</Form.Label>
                                                <Form.Control
                                                    name="email"
                                                    type="email"
                                                    placeholder={t("Form.placeholderEmail")}
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t("Form.labelMobile")}</Form.Label>
                                                <Form.Control
                                                    name="mobile"
                                                    type="tel"
                                                    placeholder={t("Form.placeholderMobile")}
                                                    value={formData.mobile}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.mobile}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t("Form.labelType")}</Form.Label>
                                                <Form.Select
                                                    name="inquiryType"
                                                    value={formData.inquiryType}
                                                    onChange={handleChange}
                                                >
                                                    <option value="Vehicle Rental">{t("Form.types.vehicle")}</option>
                                                    <option value="Accommodation Concierge">{t("Form.types.hotel")}</option>
                                                    <option value="Logistics & Travel">{t("Form.types.travel")}</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Group className="mb-4">
                                                <Form.Label>{t("Form.labelMessage")}</Form.Label>
                                                <Form.Control
                                                    name="message"
                                                    as="textarea"
                                                    rows={4}
                                                    placeholder={t("Form.placeholderMessage")}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.message}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <WhatsappBtn
                                        title={loading ? t("Form.btnSubmitting") : t("Form.btnSend")}
                                        className="whatsapp-btn"
                                        onClick={handleWhatsAppSubmit}
                                        type="button"
                                    />
                                </Form>
                            </div>
                        </Col>

                        <Col lg={5}>
                            <div className="support-card d-flex flex-column justify-between gap-3 h-100 p-0">
                                {branchesData.map((branch, index) => (
                                    <div className="text-decoration-none shadow-sm branch-card" key={index}>
                                        <div className="branch-city">
                                            <Building2 size={22} className="primery-color" />
                                            <h3>{branch.branchCity}</h3>
                                        </div>

                                        {/* Opens up Google Maps tab cleanly */}
                                        <Link
                                            href={branch.branchURL}
                                            className="text-decoration-none branch-info"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <MapPin size={18} className="primery-color" />
                                            <p>{branch.branchAddress}</p>
                                        </Link>

                                        {/* Fires real device phone call dialer hook */}
                                        <Link href={`tel:${branch.branchPhone}`} className="text-decoration-none branch-info">
                                            <Phone size={18} className="primery-color" />
                                            <span className="text-dark">{branch.branchPhone}</span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};

export default ContactUsPage;