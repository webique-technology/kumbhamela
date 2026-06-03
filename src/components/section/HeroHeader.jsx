"use client";
import React from 'react';
import { Container } from 'react-bootstrap';
import { SwiperSliderComp } from '../ui/common';
import { SwiperSlide } from 'swiper/react';
import { ArrowRight, ArrowLeft } from "lucide-react";
import { heroSliderData } from '@/lib/data';
import { AnimationSecComponent } from "@/components/ui/AnimationSecComponent";
import { ArrowDown } from 'lucide-react';
import { motion } from "framer-motion";
import "../../styles/heroHeader.scss";
import { EffectFade } from 'swiper/modules';
const HeroHeader = () => {
    return (
        <>
            <section className="hero-header-section">
                <SwiperSliderComp
                    slidesPerView={1}
                    spaceBetween={1}
                    effect="fade" // Tells swiper to fade instead of slide
                    module={EffectFade} // Supplies the engine plugin
                    loop={heroSliderData.length > 1}
                    autoplay={{
                        delay: 6000, // Adjusted down from 450000 to allow smooth automatic rotations
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
                            className='hero-slider-main d-flex align-items-center justify-content-center position-relative overflow-hidden'
                        >
                            {/* Isolated background layer handling the active slide zoom transformation */}
                            <div
                                className="hero-bg-layer"
                                style={{ backgroundImage: `url(${item.image})` }}
                            />

                            <div className="hero-overlay"></div>

                            <Container className="position-relative z-index-2">
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="hero-slide-content text-center d-flex flex-column align-items-center justify-content-center">

                                        {/* Subheading Entrance */}
                                        <AnimationSecComponent type="vertical" direction="up" delay={0.2} distance={40}>
                                            <span className='mb-3 hero-subheading d-block'>
                                                {item.subHeading}
                                            </span>
                                        </AnimationSecComponent>

                                        {/* Title Entrance */}
                                        <AnimationSecComponent type="vertical" direction="up" delay={0.4} distance={40}>
                                            <h1 className='hero-title-h1 mb-2 hero-title'>
                                                {item.title}
                                            </h1>
                                        </AnimationSecComponent>

                                        {/* Description Entrance */}
                                        <AnimationSecComponent type="vertical" direction="up" delay={0.6} distance={30}>
                                            <p className='hero-description text-md mb-4 hero-description-animate'>
                                                {item.description}
                                            </p>
                                        </AnimationSecComponent>

                                        {/* Button Row Entrance with custom cascade layout */}
                                        <div className='d-flex align-items-center justify-content-center gap-4 pt-1'>
                                            <AnimationSecComponent type="vertical" direction="up" delay={0.8} distance={20}>
                                                <button className='primery-btn'>View Bathing Dates</button>
                                            </AnimationSecComponent>
                                            <AnimationSecComponent type="vertical" direction="up" delay={0.8} distance={20}>
                                                <button className='primery-btn-style-2'>WhatsApp Inquiry</button>
                                            </AnimationSecComponent>
                                        </div>

                                    </div>
                                </div>
                            </Container>
                        </SwiperSlide>
                    ))}

                    {/* Slider Nav Controls */}
                    <button className="hero-prev-btn nav-custom-btn">
                        <ArrowLeft size={25} />
                    </button>
                    <button className="hero-next-btn nav-custom-btn">
                        <ArrowRight size={25} />
                    </button>

                    {/* Infinite Bounce Scroll Indicator */}
                    <div
                        className="scroll-indicator"
                        onClick={() => {
                            const section = document.getElementById("whyChooseUs");
                            if (section) {
                                section.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    >
                        <div className="scroll-oval">
                            <motion.div
                                animate={{
                                    opacity: [0.6, 1, 0.6],
                                    y: [0, 8, 0],
                                }}
                                transition={{
                                    duration: 1.8,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                }}
                            >
                                <ArrowDown className="scroll-down-icon" size={32} />
                            </motion.div>
                        </div>
                    </div>
                </SwiperSliderComp>
            </section >
        </>
    );
};

export default HeroHeader;