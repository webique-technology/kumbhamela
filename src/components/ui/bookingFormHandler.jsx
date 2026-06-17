"use client";
import React, { useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { MessageCircle, Calendar, User, Smartphone, Mail, Hotel, Car } from 'lucide-react';
import { useTranslations } from "next-intl";
import { createTourEnquiry } from "../../app/[locale]/tour-package/tourApi";
import { createHotelEnquiry } from "../../app/[locale]/hotel/hotelApi";
import { createCarEnquiry } from "../../app/[locale]/rental-car/carApi";

/**
 * @param {string} type - Either 'car' or 'hotel'
 * @param {string} selectedItem - The name of the car or hotel being booked
 */

// Tour package boking form
export const BookingFormHandler = ({ tourId, tourName, vehicleCategories = [] }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone_number: '',
        number_of_travelers: 'Solo Pilgrim',
        preferred_dates: '',
        special_requirements: '',
        vehicle_category_id: ""
    });

    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Regex patterns for validation
    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone_number: /^[6-9]\d{9}$/ // Basic Indian mobile validation (10 digits starting with 6-9)
    };

    const validateField = (name, value) => {
        let error = "";
        if (!value && name !== 'special_requirements') {
            error = "This field is required";
        } else if (name === 'email' && !patterns.email.test(value)) {
            error = "Please enter a valid email address";
        } else if (name === 'phone_number' && !patterns.phone_number.test(value)) {
            error = "Please enter a valid 10-digit mobile number";
        } else if (name === 'preferred_dates') {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                error = "Date cannot be in the past";
            }
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error as user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const form = e.currentTarget;

    //     // Perform manual validation check
    //     const newErrors = {};
    //     Object.keys(formData).forEach(key => {
    //         const error = validateField(key, formData[key]);
    //         if (error) newErrors[key] = error;
    //     });

    //     if (Object.keys(newErrors).length > 0 || form.checkValidity() === false) {
    //         e.stopPropagation();
    //         setErrors(newErrors);
    //         setValidated(true);
    //         return;
    //     }

    //     // If valid, proceed to WhatsApp
    //     const phoneNumber = "919022093522";
    //     const message = `*New Booking Enquiry*%0A` +
    //         `*Name:* ${formData.fullName}%0A` +
    //         `*Mobile No:* ${formData.phone}%0A` +
    //         `*Email:* ${formData.email}%0A` +
    //         `*Tour Package:* ${tourName}%0A` +
    //         `*Date:* ${formData.date}%0A` +
    //         `*Travelers:* ${formData.travelers}%0A` +
    //         `*Requirements:* ${formData.requirements || 'no any requirements'}`;

    //     window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        const newErrors = {};

        Object.keys(formData).forEach((key) => {
            const error = validateField(
                key,
                formData[key]
            );

            if (error) {
                newErrors[key] = error;
            }
        });

        if (
            Object.keys(newErrors).length > 0 ||
            form.checkValidity() === false
        ) {
            e.stopPropagation();
            setErrors(newErrors);
            setValidated(true);
            return;
        }

        try {
            setLoading(true);

            // save in database
            await createTourEnquiry({
                full_name:
                    formData.full_name,

                email:
                    formData.email,

                phone_number:
                    formData.phone_number,

                number_of_travelers:
                    formData.number_of_travelers,

                preferred_dates:
                    formData.preferred_dates,

                special_requirements:
                    formData.special_requirements,

                // tour_package:
                //     tourName,
                tour_id:
                    tourId,
                vehicle_category_id:
                    formData.vehicle_category_id,
            });

            // whatsapp after DB save
            const phoneNumber =
                "919022093522";

            const message =
                `*New Booking Enquiry*%0A` +
                `*Name:* ${formData.full_name}%0A` +
                `*Mobile No:* ${formData.phone_number}%0A` +
                `*Email:* ${formData.email}%0A` +
                `*Tour Package:* ${tourName}%0A` +
                `*Date:* ${formData.preferred_dates}%0A` +
                `*Travelers:* ${formData.number_of_travelers}%0A` +
                `*Requirements:* ${formData.special_requirements ||
                "no any requirements"
                }`;

            window.open(
                `https://wa.me/${phoneNumber}?text=${message}`,
                "_blank"
            );

            // reset form
            setFormData({
                full_name: "",
                email: "",
                phone_number: "",
                number_of_travelers:
                    "Solo Pilgrim",
                preferred_dates: "",
                special_requirements: "",
                vehicle_category_id: ""
            });

            setErrors({});
            setValidated(false);

        } catch (error) {
            alert(
                "Unable to submit booking. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="booking-form">
                <Row className="g-2 g-sm-3 g-md-4">
                    {/* full name */}
                    <Col md={6}>
                        <Form.Group controlId="bookingFullName">
                            <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">Full Name</Form.Label>
                            <Form.Control
                                required
                                name="full_name"
                                type="text"
                                placeholder="Enter Your Name"
                                className="custom-input"
                                isInvalid={!!errors.full_name}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">{errors.full_name}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    {/* mail */}
                    <Col md={6}>
                        <Form.Group controlId="bookingEmail">
                            <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">Email Address</Form.Label>
                            <Form.Control
                                required
                                name="email"
                                type="email"
                                placeholder="Enter your Email"
                                className="custom-input"
                                isInvalid={!!errors.email}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    {/* phone number */}
                    <Col md={6}>
                        <Form.Group controlId="bookingPhone">
                            <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">Phone Number</Form.Label>
                            <Form.Control
                                required
                                name="phone_number"
                                type="tel"
                                placeholder="10-digit mobile number"
                                className="custom-input"
                                isInvalid={!!errors.phone_number}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">{errors.phone_number}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    {/* travelers how many persons */}
                    <Col md={6}>
                        <Form.Group controlId="bookingTravelers">
                            <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">Number of Travelers</Form.Label>
                            <Form.Select
                                name="number_of_travelers"
                                className="custom-input"
                                onChange={handleChange}
                            >
                                <option value="Solo Pilgrim">Solo Pilgrim</option>
                                <option value="Couple">Couple</option>
                                <option value="Small Group (3-5)">Small Group (3-5)</option>
                                <option value="Large Family (5+)">Large Family (5+)</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    {/* booking date */}
                    <Col md={6}>
                        <Form.Group controlId="bookingDate">
                            <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">Preferred Dates</Form.Label>
                            <Form.Control
                                required
                                name="preferred_dates"
                                type="date"
                                className="custom-input"
                                isInvalid={!!errors.preferred_dates}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">{errors.preferred_dates}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    {/* tour package */}
                    <Col md={6}>
                        <Form.Group controlId="bookingPackage">
                            <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">Tour Package Selection</Form.Label>
                            <Form.Control
                                name="tourPackage"
                                type="text"
                                value={tourName}
                                readOnly
                                className="custom-input bg-light"
                            />
                        </Form.Group>
                    </Col>
                    {/* <Col md={6}>
                        <Form.Group controlId="bookingTravelers">
                            <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">vechicle cateogry</Form.Label>
                            <Form.Select
                                name="number_of_travelers"
                                className="custom-input"
                                onChange={handleChange}
                            >
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="TempoTraveller">Tempo Traveller</option>
                                <option value="Urbania">Urbania</option>
                                <option value="MiniBus">Mini Bus</option>
                                <option value="LuxuryCar">Luxury Car</option>
                            </Form.Select>
                        </Form.Group>
                    </Col> */}
                    <Col md={6}>
                        <Form.Group controlId="bookingVehicleCategory">
                            <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">
                                Vehicle Category
                            </Form.Label>

                            <Form.Select
                                required
                                name="vehicle_category_id"
                                className="custom-input"
                                value={formData.vehicle_category_id}
                                isInvalid={!!errors.vehicle_category_id}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Select Vehicle Category
                                </option>

                                {vehicleCategories.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.category}
                                    </option>
                                ))}
                            </Form.Select>

                            <Form.Control.Feedback type="invalid">
                                {errors.vehicle_category_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    {/* special requirements */}
                    <Col xs={12}>
                        <Form.Group controlId="bookingRequirements">
                            <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">Special Requirements</Form.Label>
                            <Form.Control
                                name="special_requirements"
                                as="textarea"
                                rows={4}
                                placeholder="Food preferences, accessibility needs, etc."
                                className="custom-input"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button
                    type="submit"
                    disabled={loading}
                    className="whatsapp-btn mt-4 px-4 py-3 border-0"
                >
                    {loading
                        ? "Submitting..."
                        : "Confirm & Send on WhatsApp"}
                </Button>
            </Form>
        </div>
    );
};

// make this form for Hotel & Car
export const BookingForm = ({ show, handleClose, type, selectedItem, hotelId, carId }) => {
    const t = useTranslations("BookingForm");

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        startDate: '',     // Pickup or Check-in
        endDate: '',       // Return or Check-out
        guests: '1',
        child: '0',
        roomType: 'AC'
    });

    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleWhatsappSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            setLoading(true);
            const isCar = type === "car";

            // Hotel Enquiry Submit Integration
            if (!isCar) {
                // Ensure backend functions are properly wrapped or imported if active
                if (typeof createHotelEnquiry === "function") {
                    await createHotelEnquiry({
                        hotel_id: hotelId,
                        full_name: formData.name,
                        email: formData.email,
                        mobile_number: formData.mobile,
                        room_type: formData.roomType,
                        check_in_date: formData.startDate,
                        check_out_date: formData.endDate,
                        adults: formData.guests,
                        children: formData.child,
                    });
                }
            }

            // Car Enquiry Submit Integration
            if (isCar) {
                if (typeof createCarEnquiry === "function") {
                    await createCarEnquiry({
                        vehicle_id: carId,
                        full_name: formData.name,
                        mobile_number: formData.mobile,
                        pickup_date: formData.startDate,
                        return_date: formData.endDate,
                        passengers: formData.guests,
                    });
                }
            }

            // Building structured WhatsApp Notification Markdown Payloads
            const phoneNumber = "919022093522";
            const currentItemName = isCar ? (selectedItem?.name || selectedItem) : selectedItem;

            const header = isCar ? "*New Car Rental Inquiry*" : "*New Hotel Booking Inquiry*";
            const itemLabel = isCar ? "*Vehicle:*" : "*Hotel:*";
            const dateStartLabel = isCar ? "*Pickup Date:*" : "*Check-in:*";
            const dateEndLabel = isCar ? "*Return Date:*" : "*Check-out:*";
            const guestLabel = isCar ? "*Passengers:*" : "*Adults:*";

            let message =
                `${header}%0A` +
                `${itemLabel} ${currentItemName}%0A` +
                `*Name:* ${formData.name}%0A` +
                `*Mobile:* ${formData.mobile}%0A`;

            if (!isCar) {
                message +=
                    `*Email:* ${formData.email}%0A` +
                    `*Room Type:* ${formData.roomType}%0A`;
            }

            message +=
                `${dateStartLabel} ${formData.startDate}%0A` +
                `${dateEndLabel} ${formData.endDate}%0A` +
                `${guestLabel} ${formData.guests}%0A`;

            if (!isCar && formData.child !== "0") {
                message += `*Children:* ${formData.child === "2" ? "2+" : formData.child}`;
            }

            window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");

            // Form Reset State
            setFormData({
                name: "",
                mobile: "",
                email: "",
                startDate: "",
                endDate: "",
                guests: "1",
                child: "0",
                roomType: "AC",
            });
            setValidated(false);
            handleClose();
        } catch (error) {
            console.error("Submission error:", error);
            alert(error?.response?.data?.message || t("errorMsg"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered className="booking-modal">
            <Modal.Header closeButton className="border-0 p-4 pb-0">
                <Modal.Title className="fw-bold h5 d-flex align-items-center gap-2">
                    {t("bookTitle")} {type === "car" ? (selectedItem?.name || selectedItem) : selectedItem}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="p-4">
                <Form noValidate validated={validated} onSubmit={handleWhatsappSubmit}>

                    {/* 1. Full Name Entry */}
                    <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold">{t("fullName")}</Form.Label>
                        <Form.Control
                            required
                            name="name"
                            type="text"
                            placeholder={t("placeholderName")}
                            value={formData.name}
                            onChange={handleChange}
                            className="rounded-3 py-2"
                        />
                    </Form.Group>

                    {/* 2. Email Verification Field - Display conditionally for Hotels */}
                    {type === 'hotel' && (
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold">{t("email")}</Form.Label>
                            <Form.Control
                                required
                                name="email"
                                type="email"
                                placeholder={t("placeholderEmail")}
                                value={formData.email}
                                onChange={handleChange}
                                className="rounded-3 py-2"
                            />
                        </Form.Group>
                    )}

                    {/* 3. Mobile Input Grid Layout */}
                    <Row>
                        <Col md={type === 'hotel' ? 6 : 12}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">{t("mobile")}</Form.Label>
                                <Form.Control
                                    required
                                    name="mobile"
                                    type="tel"
                                    placeholder={t("placeholderMobile")}
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="rounded-3 py-2"
                                />
                            </Form.Group>
                        </Col>

                        {type === 'hotel' && (
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-bold">{t("roomType")}</Form.Label>
                                    <Form.Select name="roomType" value={formData.roomType} onChange={handleChange} className="rounded-3 py-2">
                                        <option value="AC">{t("acRoom")}</option>
                                        <option value="Non-AC">{t("nonAcRoom")}</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        )}
                    </Row>

                    {/* 4. Scheduling Segment Grid */}
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">
                                    {type === 'car' ? t("pickupDate") : t("checkInDate")}
                                </Form.Label>
                                <Form.Control
                                    required
                                    name="startDate"
                                    type="date"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="rounded-3 py-2"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">
                                    {type === 'car' ? t("returnDate") : t("checkOutDate")}
                                </Form.Label>
                                <Form.Control
                                    required
                                    name="endDate"
                                    type="date"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="rounded-3 py-2"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* 5. Passenger or Guest Matrix Capacity Configuration Loops */}
                    <Row>
                        <Col md={type === 'hotel' ? 6 : 12}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">
                                    {type === 'car' ? t("passengers") : t("adults")}
                                </Form.Label>
                                <Form.Select name="guests" value={formData.guests} onChange={handleChange} className="rounded-3 py-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                        <option key={n} value={n}>
                                            {n} {n === 1 ? t("person") : t("people")}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {type === 'hotel' && (
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-bold">{t("children")}</Form.Label>
                                    <Form.Select name="child" value={formData.child} onChange={handleChange} className="rounded-3 py-2">
                                        <option value="0">0 {t("child")}</option>
                                        <option value="1">1 {t("child")}</option>
                                        <option value="2">{t("childrenPlus")}</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        )}
                    </Row>

                    {/* 6. WhatsApp CTA Submission Node Trigger Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="whatsapp-btn w-100 py-3 mt-3 border-0 fw-bold d-flex align-items-center justify-content-center gap-2"
                    >
                        <MessageCircle size={20} />
                        {loading ? t("submitting") : t("btnConfirm")}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};