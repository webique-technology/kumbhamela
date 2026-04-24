"use client";
import React from 'react';
import { Container } from 'react-bootstrap';
import { SwiperSliderComp } from '../ui/common';
import { SwiperSlide } from 'swiper/react';
import { ArrowRight, ArrowLeft, Calendar } from "lucide-react";
import { heroSliderData } from '@/lib/data';
import "../../styles/heroHeader.scss"
const HeroHeader = () => {
    return (
        <>
            <section className="hero-header-section">
                <SwiperSliderComp
                    slidesPerView={1}
                    spaceBetween={1}
                    loop={true}
                    autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        prevEl: '.hero-prev-btn',
                        nextEl: '.hero-next-btn',
                    }}
                    breakpoints={{
                        0:{
                            slidesPerView:1,
                            spaceBetween:0,
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
                            <div className="hero-slide-content">
                                <span className='montez-sub-heading mb-4'>{item.subHeading}</span>
                                <h1 className='hero-title-h1 mb-4'>{item.title}</h1>
                                <p className='hero-description text-md mb-5'>{item.description}</p>

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
            </SwiperSliderComp>
        </section >
        </>
    )
}

export default HeroHeader;
