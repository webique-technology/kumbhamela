"use client";
import React from 'react';
import { Container } from 'react-bootstrap';
import { SwiperSliderComp } from '../ui/common';
import { SwiperSlide } from 'swiper/react';
import { ArrowRight, ArrowLeft, Calendar } from "lucide-react";
import { heroSliderData } from '@/lib/data';
import "../../styles/heroHeader.scss"
import { ArrowDown } from 'lucide-react';
const HeroHeader = () => {
    return (
        <>
            <section className="hero-header-section">
                <SwiperSliderComp
                    slidesPerView={1}
                    spaceBetween={1}
                    loop={heroSliderData.length > 1}
                    autoplay={{
                        delay: 450000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        prevEl: '.hero-prev-btn',
                        nextEl: '.hero-next-btn',
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                        }
                    }}
                >
                    {heroSliderData.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            style={{ backgroundImage: `url(${item.image})` }}
                            className='hero-slider-main d-flex align-items-center justify-content-center'
                        >
                            <div className="hero-overlay"></div>
                            <Container>
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="hero-slide-content text-center">
                                        <span className='mb-3 hero-subheading'>
                                            {item.subHeading}
                                        </span>

                                        <h1 className='hero-title-h1 mb-2 hero-title'>
                                            {item.title}
                                        </h1>

                                        <p className='hero-description text-md mb-4 hero-description-animate'>
                                            {item.description}
                                        </p>

                                        <div className='d-flex align-items-center justify-content-center gap-4 pt-1'>
                                            <button className='primery-btn'>View Bathing Dates</button>
                                            <button className='primery-btn-style-2'>WhatsApp Inquiry</button>
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </SwiperSlide>
                    ))}
                    <button className="hero-prev-btn nav-custom-btn">
                        <ArrowLeft size={25} />
                    </button>
                    <button className="hero-next-btn nav-custom-btn">
                        <ArrowRight size={25} />
                    </button>
                    <div
                        className="scroll-indicator"
                        onClick={() => {
                            const section = document.getElementById("whyChooseUs");

                            if (section) {
                                section.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }
                        }}
                    >
                        <div className="scroll-oval">
                            <ArrowDown className="scroll-down-icon" size={32} />
                        </div>

                    </div>
                </SwiperSliderComp>
            </section >
        </>
    )
}

export default HeroHeader;
