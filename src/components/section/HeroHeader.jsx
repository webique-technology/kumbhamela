"use client";
import React from 'react';
import { Container } from 'react-bootstrap';
import { KumbhCountdown, SwiperSliderComp } from '../ui/common';
import { SwiperSlide } from 'swiper/react';
import { ArrowRight, ArrowLeft } from "lucide-react";
import { AnimationSecComponent } from "@/components/ui/AnimationSecComponent";
import { ArrowDown } from 'lucide-react';
import { motion } from "framer-motion";
import "../../styles/heroHeader.scss";
import { EffectFade } from 'swiper/modules';

// Hero Slider Data
export const heroSliderData = [
    {
        id: 1,
        image: "/images/banner-1.webp",
        subHeading: "Experience Unmatched Delight With Us.",
        title: "Kumbh Mela Nashik 2027",
        description: "Countdown to Kumbh Mela ",
    },
    {
        id: 2,
        image: "/images/banner-2.webp",
        subHeading: "The Sacred Confluence of Faith & Time",
        title: "Nashik Kumbh",
        description: "Where millions gather on the banks of the holy Godavari to seek spiritual liberation. Experience the world's largest spiritual congregation at one of India's most sacred pilgrimage sites."
    },
    // {
    //     id: 3,
    //     image: "/images/hero-bg-1.webp",
    //     subHeading: "Experience Unmatched Delight With Us.",
    //     title: "Hero Slider",
    //     description: "Hero Slider Description"
    // }
];

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
                    // disableAutoplay={true}
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
                            key={item.id || index}
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
                                        <AnimationSecComponent
                                            type="vertical"
                                            direction="up"
                                            delay={0.6}
                                            distance={30}
                                        // className={"d-none d-sm-block"}
                                        >
                                            <p className='hero-description text-md mb-4 hero-description-animate'>
                                                {item.description}
                                            </p>
                                        </AnimationSecComponent>
                                        {/* Dynamic content rendering block based on slider data array parameters */}
                                        {index === 0 ? (
                                            /* Renders ONLY inside the very first slide block track (Index 0) */
                                            <div className="mt-2 countdown-embed-frame w-100 d-flex flex-column justify-content-center">
                                                <KumbhCountdown
                                                    isActive={true}
                                                />
                                            </div>
                                        ) : (
                                            /* Renders seamlessly for slide item 2, 3, and onwards dynamically */
                                            <div className="w-100 d-flex flex-column align-items-center justify-content-center">
                                                <AnimationSecComponent type="vertical" direction="up" delay={0.8} distance={20}>
                                                    <div className='d-flex align-items-center justify-content-center gap-4 pt-1 execution-row-layer'>
                                                        <button className='primery-btn'>View Bathing Dates</button>
                                                        <button className='primery-btn-style-2'>WhatsApp Inquiry</button>
                                                    </div>
                                                </AnimationSecComponent>
                                            </div>
                                        )}
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
                        {/* <div className="scroll-oval">
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
                        </div> */}
                    </div>
                </SwiperSliderComp>
            </section >
        </>
    );
};

export default HeroHeader;