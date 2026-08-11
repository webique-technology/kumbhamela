"use client";
import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import {
  MessageCircle,
  Calendar,
  User,
  Smartphone,
  Mail,
  Hotel,
  Car,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { createTourEnquiry } from "../../app/[locale]/tour-package/tourApi";
import { createHotelEnquiry } from "../../app/[locale]/hotel/hotelApi";
import { createCarEnquiry } from "../../app/[locale]/rental-car/carApi";

/**
 * @param {string} type - Either 'car' or 'hotel'
 * @param {string} selectedItem - The name of the car or hotel being booked
 */

// Tour package boking form
export const BookingFormHandler = ({
  tourId,
  tourName,
  vehicleCategories = [],
}) => {
  // Bind translation resources targeting BookingFormHandler namespace
  const t = useTranslations("BookingFormHandler");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    number_of_travelers: "Solo Pilgrim",
    preferred_dates: "",
    special_requirements: "",
    vehicle_category_id: "",
  });

  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone_number: /^[6-9]\d{9}$/,
  };

  const validateField = (name, value) => {
    let error = "";
    if (!value && name !== "special_requirements") {
      error = t("errors.required");
    } else if (name === "email" && !patterns.email.test(value)) {
      error = t("errors.email");
    } else if (name === "phone_number" && !patterns.phone_number.test(value)) {
      error = t("errors.phone");
    } else if (name === "preferred_dates") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        error = t("errors.datePast");
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0 || form.checkValidity() === false) {
      e.stopPropagation();
      setErrors(newErrors);
      setValidated(true);
      return;
    }

    try {
      setLoading(true);

      // Database Submission Integration
      if (typeof createTourEnquiry === "function") {
        await createTourEnquiry({
          full_name: formData.full_name,
          email: formData.email,
          phone_number: formData.phone_number,
          number_of_travelers: formData.number_of_travelers,
          preferred_dates: formData.preferred_dates,
          special_requirements: formData.special_requirements,
          tour_id: tourId,
          vehicle_category_id: formData.vehicle_category_id,
        });
      }

      const phoneNumber = "917507778088";
      const message =
        `*New Booking Enquiry*%0A` +
        `*Name:* ${formData.full_name}%0A` +
        `*Mobile No:* ${formData.phone_number}%0A` +
        `*Email:* ${formData.email}%0A` +
        `*Tour Package:* ${tourName}%0A` +
        `*Date:* ${formData.preferred_dates}%0A` +
        `*Travelers:* ${formData.number_of_travelers}%0A` +
        `*Requirements:* ${formData.special_requirements || "no any requirements"}`;

      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");

      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        number_of_travelers: "Solo Pilgrim",
        preferred_dates: "",
        special_requirements: "",
        vehicle_category_id: "",
      });
      setErrors({});
      setValidated(false);
    } catch (error) {
      console.error("Booking handler error:", error);
      alert(t("errors.failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="booking-form"
      >
        <Row className="g-2 g-sm-3 g-md-4">
          {/* Full Name */}
          <Col md={6}>
            <Form.Group controlId="bookingFullName">
              <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">
                {t("labels.fullName")}
              </Form.Label>
              <Form.Control
                required
                name="full_name"
                type="text"
                placeholder={t("placeholders.name")}
                className="custom-input"
                isInvalid={!!errors.full_name}
                value={formData.full_name}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.full_name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Email Address */}
          <Col md={6}>
            <Form.Group controlId="bookingEmail">
              <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">
                {t("labels.email")}
              </Form.Label>
              <Form.Control
                required
                name="email"
                type="email"
                placeholder={t("placeholders.email")}
                className="custom-input"
                isInvalid={!!errors.email}
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Phone Number */}
          <Col md={6}>
            <Form.Group controlId="bookingPhone">
              <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">
                {t("labels.phone")}
              </Form.Label>
              <Form.Control
                required
                name="phone_number"
                type="number"
                placeholder={t("placeholders.phone")}
                className="custom-input"
                isInvalid={!!errors.phone_number}
                value={formData.phone_number}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone_number}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Number of Travelers */}
          <Col md={6}>
            <Form.Group controlId="bookingTravelers">
              <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">
                {t("labels.travelers")}
              </Form.Label>
              <Form.Select
                name="number_of_travelers"
                className="custom-input"
                value={formData.number_of_travelers}
                onChange={handleChange}
              >
                <option value="Solo Pilgrim">{t("options.solo")}</option>
                <option value="Couple">{t("options.couple")}</option>
                <option value="Small Group (3-5)">{t("options.small")}</option>
                <option value="Large Family (5+)">{t("options.large")}</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Preferred Dates */}
          <Col md={6}>
            <Form.Group controlId="bookingDate">
              <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">
                {t("labels.date")}
              </Form.Label>
              <Form.Control
                required
                name="preferred_dates"
                type="date"
                className="custom-input"
                isInvalid={!!errors.preferred_dates}
                value={formData.preferred_dates}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.preferred_dates}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Tour Package Selection (Read-Only) */}
          <Col md={6}>
            <Form.Group controlId="bookingPackage">
              <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">
                {t("labels.package")}
              </Form.Label>
              <Form.Control
                name="tourPackage"
                type="text"
                value={tourName}
                readOnly
                className="custom-input bg-light"
              />
            </Form.Group>
          </Col>

          {/* Vehicle Category Selector */}
          <Col md={6}>
            <Form.Group controlId="bookingVehicleCategory">
              <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">
                {t("labels.vehicle")}
              </Form.Label>
              <Form.Select
                required
                name="vehicle_category_id"
                className="custom-input"
                value={formData.vehicle_category_id}
                isInvalid={!!errors.vehicle_category_id}
                onChange={handleChange}
              >
                <option value="">{t("placeholders.vehicle")}</option>
                {vehicleCategories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.category}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.vehicle_category_id}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Special Requirements */}
          <Col xs={12}>
            <Form.Group controlId="bookingRequirements">
              <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">
                {t("labels.requirements")}
              </Form.Label>
              <Form.Control
                name="special_requirements"
                as="textarea"
                rows={4}
                placeholder={t("placeholders.requirements")}
                className="custom-input"
                value={formData.special_requirements}
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
          {loading ? t("buttons.submitting") : t("buttons.confirm")}
        </Button>
      </Form>
    </div>
  );
};

// make this form for Hotel & Car
export const BookingForm = ({
  show,
  handleClose,
  type,
  selectedItem,
  hotelId,
  roomType,
  carId,
}) => {
  const t = useTranslations("BookingForm");

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    pickupLocation: "",
    dropLocation: "", // Added Drop Location State
    startDate: "", // Pickup or Check-in
    endDate: "", // Return or Check-out
    guests: "1",
    child: "0",
    roomType: "AC",
    textarea: "",
  });

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Dynamic Helper Function: Maps raw backend strings cleanly to i18n JSON keys
  const getLocalizedRoomName = (roomString) => {
    if (!roomString) return "";

    const normalized = roomString.toLowerCase().replace(/[^a-z0-9]/g, "");

    if (normalized.includes("single")) return t("singleRoom");
    if (normalized.includes("double")) return t("doubleRoom");
    if (normalized.includes("twin")) return t("twinRoom");
    if (normalized.includes("triple")) return t("tripleRoom");
    if (normalized.includes("family")) return t("familyRoom");
    if (normalized.includes("suite")) return t("suiteRoom");
    if (normalized.includes("deluxe")) return t("deluxeRoom");

    return roomString;
  };

  // Auto-set the first available room type when the modal changes items
  useEffect(() => {
    if (type === "hotel" && Array.isArray(roomType) && roomType.length > 0) {
      setFormData((prev) => ({ ...prev, roomType: roomType[0] }));
    } else {
      setFormData((prev) => ({ ...prev, roomType: "AC" }));
    }
  }, [roomType, type]);

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
            message: formData.textarea,
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
            pickup_location: formData.pickupLocation,
            drop_location: formData.dropLocation, // Pass Drop-off to API
            pickup_date: formData.startDate,
            return_date: formData.endDate,
            passengers: formData.guests,
            message: formData.textarea,
          });
        }
      }

      // Building structured WhatsApp Notification Markdown Payloads
      const phoneNumber = "917507778088";
      const currentItemName = isCar
        ? selectedItem?.name || selectedItem
        : selectedItem;

      const header = isCar
        ? "*New Car Rental Inquiry*"
        : "*New Hotel Booking Inquiry*";
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

      // Format Pickup & Drop-off for WhatsApp
      if (isCar) {
        if (formData.pickupLocation) {
          message += `*Pickup Location:* ${formData.pickupLocation}%0A`;
        }
        if (formData.dropLocation) {
          message += `*Drop-off Location:* ${formData.dropLocation}%0A`;
        }
      }

      message +=
        `${dateStartLabel} ${formData.startDate}%0A` +
        `${dateEndLabel} ${formData.endDate}%0A` +
        `${guestLabel} ${formData.guests}%0A`;

      if (!isCar && formData.child !== "0") {
        message += `*Children:* ${formData.child === "2" ? "2+" : formData.child}%0A`;
      }

      if (formData.textarea) {
        message += `*Message:* ${encodeURIComponent(formData.textarea)}%0A`;
      }

      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");

      // Form Reset State
      setFormData({
        name: "",
        mobile: "",
        email: "",
        pickupLocation: "",
        dropLocation: "",
        startDate: "",
        endDate: "",
        guests: "1",
        child: "0",
        roomType: "AC",
        textarea: "",
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
      <Modal.Header closeButton className="border-0 p-3 pb-2">
        <Modal.Title className="fw-bold h5 d-flex align-items-center gap-2">
          {t("bookTitle")}{" "}
          {type === "car" ? selectedItem?.name || selectedItem : selectedItem}
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
          {(type === "hotel" || type === "tent") && (
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

          {/* 3. Mobile Input & Pickup / Drop-off / Room Type Dynamic Layouts */}
          <Row>
            <Col md={["car", "tent"].includes(type) ? 12 : 6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">{t("mobile")}</Form.Label>
                <Form.Control
                  required
                  name="mobile"
                  type="number"
                  placeholder={t("placeholderMobile")}
                  value={formData.mobile}
                  onChange={handleChange}
                  className="rounded-3 py-2"
                />
              </Form.Group>
            </Col>

            {type === "hotel" && (
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    {t("roomType")}
                  </Form.Label>
                  <Form.Select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="rounded-3 py-2"
                  >
                    {Array.isArray(roomType) && roomType.length > 0 ? (
                      roomType.map((room, idx) => (
                        <option key={idx} value={room}>
                          {getLocalizedRoomName(room)}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Single Room">{t("singleRoom")}</option>
                        <option value="Double Room">{t("doubleRoom")}</option>
                        <option value="Twin Room">{t("twinRoom")}</option>
                        <option value="Triple Room">{t("tripleRoom")}</option>
                        <option value="Family Room">{t("familyRoom")}</option>
                        <option value="Suite Room">{t("suiteRoom")}</option>
                        <option value="Deluxe Room">{t("deluxeRoom")}</option>
                      </>
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
            )}
          </Row>

          {/* Side-by-Side Pickup & Drop Location Fields (Car Booking Only) */}
          {type === "car" && (
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    {t("pickupLocation")}
                  </Form.Label>
                  <Form.Control
                    required
                    name="pickupLocation"
                    type="text"
                    placeholder={t("placeholderPickupLocation")}
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    className="rounded-3 py-2"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    {t("dropLocation")}
                  </Form.Label>
                  <Form.Control
                    required
                    name="dropLocation"
                    type="text"
                    placeholder={t("placeholderDropLocation")}
                    value={formData.dropLocation}
                    onChange={handleChange}
                    className="rounded-3 py-2"
                  />
                </Form.Group>
              </Col>
            </Row>
          )}

          {/* 4. Scheduling Segment Grid */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">
                  {type === "car" ? t("pickupDate") : t("checkInDate")}
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
                  {type === "car" ? t("returnDate") : t("checkOutDate")}
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

          {/* 5. Passenger or Guest Capacity Configuration */}
          <Row>
            <Col md={type === "hotel" ? 6 : 12}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">
                  {type === "car" ? t("passengers") : t("adults")}
                </Form.Label>
                <Form.Select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="rounded-3 py-2"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? t("person") : t("people")}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {type === "hotel" && (
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    {t("children")}
                  </Form.Label>
                  <Form.Select
                    name="child"
                    value={formData.child}
                    onChange={handleChange}
                    className="rounded-3 py-2"
                  >
                    <option value="0">0 {t("child")}</option>
                    <option value="1">1 {t("child")}</option>
                    <option value="2">{t("childrenPlus")}</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            )}
          </Row>

          {/* 6. Message/Notes Textarea */}
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold">{t("textarea")}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="textarea"
              placeholder={t("placeholdertextarea")}
              value={formData.textarea}
              onChange={handleChange}
              className="rounded-3 py-2"
            />
          </Form.Group>

          {/* 7. WhatsApp CTA Submission Button */}
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
