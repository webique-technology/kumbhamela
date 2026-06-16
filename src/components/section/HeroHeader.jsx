"use client";
import React from 'react';
import { Container } from 'react-bootstrap';
import { KumbhCountdown, SwiperSliderComp } from '../ui/common';
import { SwiperSlide } from 'swiper/react';
import { ArrowRight, ArrowLeft } from "lucide-react";
import { AnimationSecComponent } from "@/components/ui/AnimationSecComponent";
import { useTranslations } from "next-intl";
import { EffectFade } from 'swiper/modules';
import "../../styles/heroHeader.scss";
import { slugify } from '@/lib/utils';
// Base Configuration Layout Data (Keeps structural elements localized)

export const heroSliderConfig = [
    {
        id: 1,
        image: `/images/banner-1.webp`,
        translationPrefix: "slide1"
    },
    {
        id: 2,
        image: `/images/banner-2.webp`,
        translationPrefix: "slide2"
    }
];

const HeroHeader = () => {
    // Instantiate your next-intl dictionary lookup engine
    const t = useTranslations('HeroHeader');

    return (
        <>
            <section className="hero-header-section">
                <SwiperSliderComp
                    slidesPerView={1}
                    spaceBetween={1}
                    effect="fade"
                    module={EffectFade}
                    loop={heroSliderConfig.length > 1}
                    autoplay={{
                        delay: 6000,
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
                    {heroSliderConfig.map((item, index) => (
                        <SwiperSlide
                            key={item.id || index}
                            className='hero-slider-main d-flex align-items-center justify-content-center position-relative overflow-hidden'
                        >
                            {/* Background graphic layers */}
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
                                                {t(`${item.translationPrefix}_subHeading`)}
                                            </span>
                                        </AnimationSecComponent>

                                        {/* Title Entrance */}
                                        <AnimationSecComponent type="vertical" direction="up" delay={0.4} distance={40}>
                                            <h1 className='hero-title-h1 mb-2 hero-title playfair-display'>
                                                {t(`${item.translationPrefix}_title`)}
                                            </h1>
                                        </AnimationSecComponent>

                                        {/* Description Entrance */}
                                        <AnimationSecComponent type="vertical" direction="up" delay={0.6} distance={30}>
                                            <p className='hero-description text-md mb-4 hero-description-animate'>
                                                {t(`${item.translationPrefix}_description`)}
                                            </p>
                                        </AnimationSecComponent>

                                        {/* Conditional Interactive Footer Area Nodes */}
                                        {index === 0 ? (
                                            /* Slide 1 Countdown Embed Tracker */
                                            <div className="mt-2 countdown-embed-frame w-100 d-flex flex-column justify-content-center">
                                                <KumbhCountdown isActive={true} />
                                            </div>
                                        ) : (
                                            /* Slide 2 Multi-Action Route CTA Buttons */
                                            <div className="w-100 d-flex flex-column align-items-center justify-content-center">
                                                <AnimationSecComponent type="vertical" direction="up" delay={0.8} distance={20}>
                                                    <div className='d-flex align-items-center justify-content-center gap-4 pt-1 execution-row-layer'>
                                                        <button className='primery-btn'>
                                                            {t("btnBathDates")}
                                                        </button>
                                                        <button className='primery-btn-style-2'>
                                                            {t("btnInquiry")}
                                                        </button>
                                                    </div>
                                                </AnimationSecComponent>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </Container>
                        </SwiperSlide>
                    ))}

                    {/* Navigation Controls */}
                    <button className="hero-prev-btn nav-custom-btn">
                        <ArrowLeft size={25} />
                    </button>
                    <button className="hero-next-btn nav-custom-btn">
                        <ArrowRight size={25} />
                    </button>

                    {/* Scroll Trigger Bottom Target */}
                    <div
                        className="scroll-indicator"
                        onClick={() => {
                            const section = document.getElementById("whyChooseUs");
                            if (section) {
                                section.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    >
                    </div>
                </SwiperSliderComp>
            </section>
        </>
    );
};

export default HeroHeader;