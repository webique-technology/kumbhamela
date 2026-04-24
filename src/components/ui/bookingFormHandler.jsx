"use client";
import React, { useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { MessageCircle, Calendar, User, Smartphone, Mail, Hotel, Car } from 'lucide-react';

/**
 * @param {string} type - Either 'car' or 'hotel'
 * @param {string} selectedItem - The name of the car or hotel being booked
 */

// Tour package boking form
export const BookingFormHandler = ({ tourName }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        travelers: 'Solo Pilgrim',
        date: '',
        requirements: ''
    });

    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});

    // Regex patterns for validation
    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[6-9]\d{9}$/ // Basic Indian mobile validation (10 digits starting with 6-9)
    };

    const validateField = (name, value) => {
        let error = "";
        if (!value && name !== 'requirements') {
            error = "This field is required";
        } else if (name === 'email' && !patterns.email.test(value)) {
            error = "Please enter a valid email address";
        } else if (name === 'phone' && !patterns.phone.test(value)) {
            error = "Please enter a valid 10-digit mobile number";
        } else if (name === 'date') {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        // Perform manual validation check
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0 || form.checkValidity() === false) {
            e.stopPropagation();
            setErrors(newErrors);
            setValidated(true);
            return;
        }

        // If valid, proceed to WhatsApp
        const phoneNumber = "919022093522";
        const message = `*New Booking Enquiry*%0A` +
            `*Name:* ${formData.fullName}%0A` +
            `*Mobile No:* ${formData.phone}%0A` +
            `*Email:* ${formData.email}%0A` +
            `*Tour Package:* ${tourName}%0A` +
            `*Date:* ${formData.date}%0A` +
            `*Travelers:* ${formData.travelers}%0A` +
            `*Requirements:* ${formData.requirements || 'no any requirements'}`;

        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
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
                                name="fullName"
                                type="text"
                                placeholder="Enter Your Name"
                                className="custom-input"
                                isInvalid={!!errors.fullName}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
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
                                name="phone"
                                type="tel"
                                placeholder="10-digit mobile number"
                                className="custom-input"
                                isInvalid={!!errors.phone}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    {/* travelers how many persons */}
                    <Col md={6}>
                        <Form.Group controlId="bookingTravelers">
                            <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">Number of Travelers</Form.Label>
                            <Form.Select
                                name="travelers"
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
                                name="date"
                                type="date"
                                className="custom-input"
                                isInvalid={!!errors.date}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
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
                    {/* special requirements */}
                    <Col xs={12}>
                        <Form.Group controlId="bookingRequirements">
                            <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">Special Requirements</Form.Label>
                            <Form.Control
                                name="requirements"
                                as="textarea"
                                rows={4}
                                placeholder="Food preferences, accessibility needs, etc."
                                className="custom-input"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button type="submit" className="whatsapp-btn mt-4 px-4 py-3 border-0">
                    Confirm & Send on WhatsApp
                </Button>
            </Form>
        </div>
    );
};

// make this form foe Hotel & Car
export const BookingForm = ({ show, handleClose, type, selectedItem }) => {
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleWhatsappSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const phoneNumber = "919022093522";
        const isCar = type === 'car';

        // Dynamic Message Construction
        const header = isCar ? "*New Car Rental Inquiry*" : "*New Hotel Booking Inquiry*";
        const itemLabel = isCar ? "*Vehicle:*" : "*Hotel:*";
        const dateStartLabel = isCar ? "*Pickup Date:*" : "*Check-in:*";
        const dateEndLabel = isCar ? "*Return Date:*" : "*Check-out:*";
        const guestLabel = isCar ? "*Passengers:*" : "*Adults:*";

        let message = `${header}%0A` +
            `${itemLabel} ${selectedItem}%0A` +
            `*Name:* ${formData.name}%0A` +
            `*Mobile:* ${formData.mobile}%0A`;

        if (!isCar) message += `*Email:* ${formData.email}%0A*Room Type:* ${formData.roomType}%0A`;

        message += `${dateStartLabel} ${formData.startDate}%0A` +
            `${dateEndLabel} ${formData.endDate}%0A` +
            `${guestLabel} ${formData.guests}%0A`;

        if (!isCar && formData.child !== '0') {
            message += `*Children:* ${formData.child === '2' ? "2+" : formData.child}`;
        }

        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered className="booking-modal">
            <Modal.Header closeButton className="border-0 p-4 pb-0">
                <Modal.Title className="fw-bold h5 d-flex align-items-center gap-2">
                    {type === 'car' ? <Car size={20} /> : <Hotel size={20} />}
                    Book {selectedItem}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="p-4">
                <Form noValidate validated={validated} onSubmit={handleWhatsappSubmit}>
                    {/* Full Name */}
                    <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold">Full Name</Form.Label>
                        <Form.Control
                            required
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            className="rounded-3 py-2"
                        />
                    </Form.Group>

                    {/* Email - Shown only for Hotel */}
                    {type === 'hotel' && (
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold">Email Address</Form.Label>
                            <Form.Control
                                required
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                onChange={handleChange}
                                className="rounded-3 py-2"
                            />
                        </Form.Group>
                    )}

                    <Row>
                        <Col md={type === 'hotel' ? 6 : 12}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">Mobile Number</Form.Label>
                                <Form.Control
                                    required
                                    name="mobile"
                                    type="tel"
                                    placeholder="Enter mobile no."
                                    onChange={handleChange}
                                    className="rounded-3 py-2"
                                />
                            </Form.Group>
                        </Col>

                        {type === 'hotel' && (
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-bold">Room Type</Form.Label>
                                    <Form.Select name="roomType" onChange={handleChange} className="rounded-3 py-2">
                                        <option value="AC">AC Room</option>
                                        <option value="Non-AC">Non-AC Room</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        )}
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">
                                    {type === 'car' ? 'Pickup Date' : 'Check-in Date'}
                                </Form.Label>
                                <Form.Control
                                    required
                                    name="startDate"
                                    type="date"
                                    onChange={handleChange}
                                    className="rounded-3 py-2"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">
                                    {type === 'car' ? 'Return Date' : 'Check-out Date'}
                                </Form.Label>
                                <Form.Control
                                    required
                                    name="endDate"
                                    type="date"
                                    onChange={handleChange}
                                    className="rounded-3 py-2"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={type === 'hotel' ? 6 : 12}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">
                                    {type === 'car' ? 'Passengers' : 'Adults'}
                                </Form.Label>
                                <Form.Select name="guests" onChange={handleChange} className="rounded-3 py-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                        <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {type === 'hotel' && (
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-bold">Children</Form.Label>
                                    <Form.Select name="child" onChange={handleChange} className="rounded-3 py-2">
                                        <option value="0">0 Child</option>
                                        <option value="1">1 Child</option>
                                        <option value="2">2+ Child</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        )}
                    </Row>

                    <Button
                        type="submit"
                        className="whatsapp-btn w-100 py-3 mt-3 border-0 fw-bold d-flex align-items-center justify-content-center gap-2"
                    >
                        <MessageCircle size={20} />
                        Confirm on WhatsApp
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};