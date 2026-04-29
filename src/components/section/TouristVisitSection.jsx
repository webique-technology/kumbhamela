"use client";
import React from 'react';
import { Container } from 'react-bootstrap';
import { SwiperSliderComp, TitleComponent } from '../ui/common';
import { sacredDestinations } from '../../lib/data';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { PrimeryBtn } from '../ui/button';
import { ArrowRight, ArrowLeft } from "lucide-react";
import { usePathname } from 'next/navigation'; // Fix 1: Import usePathname

const TouristVisitSection = () => {
    const pathname = usePathname(); // Fix 1: Get current path

    return (
        <section className='section-padding-2 sacred-destinations position-relative'>
            <div className="bottom-divider trinery-bg position-absolute top-0"></div>
            {/* copy section */}
            <Container>
                {/* Flex Header for Title + Buttons */}
                <div className="d-flex position-relative justify-content-center justify-content-sm-between align-items-center mb-4">
                    <TitleComponent
                        title="Sacred Destinations"
                        className="mb-4 md-md-5"
                        divider={false}
                        montezSubTitle="Must-Visit Temples & Holy Sites"
                        montezClass="montez-sub-heading primery-color"
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
                    slidesPerView={4}
                    navigation={{
                        prevEl: '.destination-prev-btn',
                        nextEl: '.destination-next-btn',
                    }}
                    spaceBetween={20}
                    timeDelay={4000}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
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
                    }}
                >
                    {sacredDestinations.map((card, index) => (
                        <SwiperSlide key={index} className="h-auto">
                            <div className="card card-image-wrapper history-card h-100 border-0 shadow-md overflow-hidden">
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
                                        <p className='text-white m-0'>{card.description}</p>
                                    </div>
                                </div>
                            </div >
                        </SwiperSlide>
                    ))}
                </SwiperSliderComp>

            </Container>
            <div className="top-divider trinery-bg position-absolute bottom-0" style={{ pointerEvents: 'none' }}></div>
        </section>
    );
}

export default TouristVisitSection;