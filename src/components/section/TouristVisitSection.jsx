"use client";
import React, { useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { SwiperSliderComp, TitleComponent } from '../ui/common';
import { sacredDestinations } from '../../lib/data';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from "next/link";
import { ArrowRight, ArrowLeft, X } from "lucide-react";
import { useTranslations } from 'next-intl';

const TouristVisitSection = () => {
    // Connect next-intl hooks map translation engine
    const t = useTranslations('SacredDestinations');

    const [selectedCard, setSelectedCard] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setShowModal(true);
    };

    return (
        <section className='section-padding-2 sacred-destinations position-relative'>
            <div className="bottom-divider trinery-bg position-absolute top-0"></div>

            <Container>
                {/* Header Section Container */}
                <div className="d-flex position-relative justify-content-center justify-content-sm-between align-items-center mb-4">
                    <TitleComponent
                        title={t("mainTitle")}
                        className="mb-0 mb-md-4 md-md-5"
                        divider={false}
                        montezSubTitle={t("montezSubTitle")}
                        montezClass="playfair-display primery-color d-none d-md-block"
                    />

                    {/* Navigation Sliders Buttons */}
                    <div className="slider-nav-wrapper d-none d-sm-flex gap-2">
                        <button className="destination-prev-btn nav-custom-btn">
                            <ArrowLeft size={20} />
                        </button>
                        <button className="destination-next-btn nav-custom-btn">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Swiper Slider Wrapper */}
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
                        0: { slidesPerView: 1.25, spaceBetween: 20 },
                        450: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 3, spaceBetween: 20 },
                        992: { slidesPerView: 4, spaceBetween: 20 },
                        1220: { slidesPerView: 5, spaceBetween: 20 },
                    }}
                >
                    {sacredDestinations.map((card, index) => (
                        <SwiperSlide key={index} className="h-auto">
                            <div
                                className="card card-image-wrapper history-card h-100 border-0 shadow-md overflow-hidden cursor-pointer"
                                onClick={() => handleCardClick(card)}
                                style={{ cursor: "pointer" }}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={card.image}
                                        alt={t(card.nameKey)}
                                        width={200}
                                        height={250}
                                        className="card-img-top object-fit-cover transition-transform"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />

                                    {/* Text Badge Overlays translated via key references */}
                                    <div className="position-absolute bottom-0 start-0 m-3 z-2">
                                        <h4 className='text-light mb-1'>{t(card.nameKey)}</h4>
                                        <p className='text-white text-excerpt m-0'>{t(card.historyKey)}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </SwiperSliderComp>
            </Container>

            {/* Dynamic Localized Information Pop-Up Modal Component */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                size="lg"
                scrollable
                className="booking-modal"
            >
                <Modal.Header className="border-0 px-4 py-3 modal-header justify-content-between">
                    <Modal.Title className='text-dark fw-semibold'>
                        {selectedCard ? t(selectedCard.nameKey) : ""}
                    </Modal.Title>

                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="btn-close bg-transparent border-0"
                        style={{ width: "40px", height: "40px" }}
                    >
                        <X size={20} />
                    </button>
                </Modal.Header>

                <Modal.Body className='p-4'>
                    <h5 className='primery-color model-head'>{t("historyHeader")}</h5>
                    <p className='card-text text-muted small'>
                        {selectedCard ? t(selectedCard.historyKey) : ""}
                    </p>

                    <h5 className='primery-color model-head'>{t("routeHeader")}</h5>
                    <p className='card-text text-muted small'>
                        {selectedCard ? t(selectedCard.routeKey) : ""}
                    </p>

                    <h5 className='primery-color model-head'>{t("transportHeader")}</h5>
                    <div className="mb-2">
                        <Link
                            href={selectedCard?.routeLink || "#"}
                            className="text-primary fw-semibold text-decoration-none small"
                        >
                            {t("bookCTA")}
                        </Link>
                    </div>
                    <p className='card-text text-muted small'>
                        {selectedCard ? t(selectedCard.transportKey) : ""}
                    </p>
                </Modal.Body>
            </Modal>
        </section>
    );
};

export default TouristVisitSection;