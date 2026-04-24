"use client"; // Required for useState
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { TitleComponent } from '../ui/common'
import { rentalCar } from '@/lib/data'
import { RentalCarCard } from '../ui/card'
import { BookingForm, CarBookingForm } from '../ui/bookingFormHandler'
import { PrimeryBtn } from '../ui/button'
import { ArrowRight } from 'lucide-react'

const RentalCar = () => {
    const [show, setShow] = useState(false);
    const [selectedCar, setSelectedCar] = useState("");

    const handleOpenBooking = (carName) => {
        setSelectedCar(carName);
        setShow(true);
    };

    return (
        <div className=''>
            {/* <Container> */}
            {/* <TitleComponent
                    title="Car Rental Services"
                    description="Travel in comfort with our range of vehicles and experienced drivers"
                /> */}
            <Row className='g-4'>
                {rentalCar.map((value, index) => (
                    <Col key={index} lg={3} md={4} sm={12} xs={12}>
                        <RentalCarCard
                            car={value}
                            // Pass the function to the card
                            onBook={() => handleOpenBooking(value.carName || value.name)}
                        />
                    </Col>
                ))}
            </Row>
            {/* </Container> */}
            <PrimeryBtn
                title="View All Cars"
                btnLink="/rental-car"
                className="primery-btn-style-2 mt-4"
                iconRight={<ArrowRight size={18} />}
            />
            {/* Render the Form once at the bottom */}
            {/* <CarBookingForm
                show={show}
                handleClose={() => setShow(false)}
                selectedCar={selectedCar}
            /> */}
            <BookingForm
                show={show}
                handleClose={() => setShow(false)}
                type="car"
                selectedItem={selectedCar}
            />
        </div>
    )
}

export default RentalCar