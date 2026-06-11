"use client";
import React from 'react';
import { Container } from 'react-bootstrap';
import { SwiperSliderComp, TitleComponent } from '../ui/common';
import { sacredDestinations } from '../../lib/data';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from "next/link";
import { PrimeryBtn } from '../ui/button';
import { ArrowRight, ArrowLeft } from "lucide-react";
import { usePathname } from 'next/navigation'; // Fix 1: Import usePathname
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { X } from "lucide-react";
const TouristVisitSection = () => {
    const pathname = usePathname(); // Fix 1: Get current path
    const [selectedCard, setSelectedCard] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setShowModal(true);
    };
    return (
        <section className='section-padding-2 sacred-destinations position-relative'>
            <div className="bottom-divider trinery-bg position-absolute top-0"></div>
            {/* copy section */}
            <Container>
                {/* Flex Header for Title + Buttons */}
                <div className="d-flex position-relative justify-content-center justify-content-sm-between align-items-center mb-4">
                    <TitleComponent
                        title="Sacred Destinations"
                        className="mb-0 mb-md-4 md-md-5"
                        divider={false}
                        montezSubTitle="Must-Visit Temples & Holy Sites"
                        montezClass="montez-sub-heading primery-color d-none d-md-block"
                    />

                    {/* Custom Navigation Buttons */}
                    <div className="slider-nav-wrapper d-none d-sm-flex gap-2">
                        <button className="destination-prev-btn nav-custom-btn">
                            <ArrowLeft size={20} />
                        </button>
                        <button className="destination-next-btn nav-custom-btn">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* slider */}
                <SwiperSliderComp
                    slidesPerView={5}
                    navigation={{
                        prevEl: '.destination-prev-btn',
                        nextEl: '.destination-next-btn',
                    }}
                    spaceBetween={20}
                    timeDelay={4000}
                    disableAutoplay={false}
                    breakpoints={{
                        0: {
                            slidesPerView: 1.25,
                            spaceBetween: 20,
                        },
                        450: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        992: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1220: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {sacredDestinations.map((card, index) => (
                        <SwiperSlide key={index} className="h-auto">
                            <div
                                className="card card-image-wrapper history-card h-100 border-0 shadow-md overflow-hidden cursor-pointer"
                                onClick={() => handleCardClick(card)}
                                style={{ cursor: "pointer" }}
                            >
                                {/* Image Container with Overlay */}
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={card.image}
                                        alt={card.name}
                                        width={200}
                                        height={250}
                                        className="card-img-top object-fit-cover transition-transform"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />

                                    {/* Badge Left */}
                                    <div className="position-absolute bottom-0 start-0 m-3 z-2">
                                        <h4 className='text-light mb-1'>{card.name}</h4>
                                        <p className='text-white text-excerpt m-0'>{card.history}</p>
                                    </div>
                                </div>
                            </div >
                        </SwiperSlide>
                    ))}
                </SwiperSliderComp>

            </Container>
            {/* <div className="top-divider trinery-bg position-absolute bottom-0" style={{ pointerEvents: 'none' }}></div> */}

            {/* make this model for the destination information */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                size="lg"
                scrollable
                className="booking-modal"
            >
                <Modal.Header className="border-0 px-4 py-3 modal-header justify-content-between modal-header">
                    <Modal.Title className='text-dark fw-semibold'>{selectedCard?.name}</Modal.Title>

                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="btn-close bg-transparent"
                        style={{
                            width: "40px",
                            height: "40px",
                        }}
                    >
                        <X size={20} />
                    </button>
                </Modal.Header>

                <Modal.Body className='p-4'>
                    {/* <Image
                        src={selectedCard?.image}
                        alt={selectedCard?.name}
                        width={800}
                        height={500}
                        className="w-100 rounded mb-3"
                        style={{
                            maxHeight: "500px",
                            objectFit: "cover",
                        }}
                    /> */}

                    <h5 className='primery-color model-head'>History</h5>
                    <p className='card-text text-muted small blog-excerpt'>{selectedCard?.history}</p>

                    <h5 className='primery-color model-head'>Route from Nashik</h5>
                    <p className='card-text text-muted small blog-excerpt'>{selectedCard?.routeFromNashik}</p>

                    <h5 className='primery-color model-head'>Transport Options</h5>
                    <Link
                        href={selectedCard?.routeLink || "#"}
                        className="text-primary fw-semibold text-decoration-none"
                    >
                        Book Transportation with Mahakumbh Tours & Travels →
                    </Link>
                    <p className='card-text text-muted small blog-excerpt'>{selectedCard?.transportOptions}</p>

                </Modal.Body>
            </Modal>

        </section>

    );
}

export default TouristVisitSection;