"use client";
import React, { useState } from 'react';
import { Col, Container, Row, Modal, Form, Button } from 'react-bootstrap';
import { TitleComponent } from '../ui/common';
import "../../styles/hotel-accomodation.scss";
import "../../assets/scss/main.scss";
import { hotels } from '@/lib/data';
import { HotelCards } from '../ui/card';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { PrimeryBtn } from '../ui/button';
import { BookingForm, HotelBookingForm } from '../ui/bookingFormHandler';

const HotelsBookSection = () => {
    // --- form modal state ---
    const [show, setShow] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);

    const handleOpenBooking = (hotelName) => {
        setSelectedHotel(hotelName);
        setShow(true);
    };

    return (
        <>
            <div id='hotelsAccomodationSection' className='hotels-accomodation-section'>
                {/* <Container> */}
                {/* <TitleComponent
                        title="Accommodation & Hotels"
                        description="Comfortable stays near the holy ghats with premium amenities"
                    /> */}
                <Row>
                    {hotels.map((hotel, index) => (
                        <Col lg={3} md={4} key={index} className="mb-4">
                            <HotelCards
                                hotel={hotel}
                                onBookNow={() => handleOpenBooking(hotel.name)}
                            />
                        </Col>
                    ))}
                </Row>
                <PrimeryBtn
                    title="View All hotels"
                    btnLink="/hotel"
                    className="primery-btn-style-2"
                    iconRight={<ArrowRight size={18} />}
                />
                {/* </Container> */}
            </div>

            {/* --- booking modal --- */}
            {/* <HotelBookingForm
                show={show}
                handleClose={() => setShow(false)}
                selectedHotel={selectedHotel}
            /> */}
            <BookingForm
                show={show}
                handleClose={() => setShow(false)}
                type="hotel"
                selectedItem={selectedHotel}
            />
        </>
    )
}

export default HotelsBookSection;