"use client";
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { KumbhCountdown, SwiperSliderComp } from '../ui/common';
import { SwiperSlide } from 'swiper/react';
import { ArrowRight, ArrowLeft } from "lucide-react";
import { AnimationSecComponent } from "@/components/ui/AnimationSecComponent";
import { useTranslations } from "next-intl";
import { EffectFade } from 'swiper/modules';
import "../../styles/heroHeader.scss";
import { slugify } from '@/lib/utils';
import { Link } from '@/i18n/routing';

import banner1 from '../../assets/images/banner-1.webp';
import banner2 from '@/assets/images/banner-3.webp';
import banner3 from '@/assets/images/banner-4.webp';
// NOTE: Make sure to drop matching image files into your assets directory
import banner4 from '@/assets/images/jyotirlinga-banner.webp';
import banner5 from '@/assets/images/ashtavinayak-banner.webp';

export const heroSliderConfig = [
    {
        id: 1,
        image: banner1.src || banner1,
        translationPrefix: "slide1"
    },
    {
        id: 2,
        image: banner2.src || banner2,
        translationPrefix: "slide2"
    },
    {
        id: 3,
        image: banner3.src || banner3,
        translationPrefix: "slide3"
    },
    {
        id: 4,
        image: banner4.src || banner4,
        translationPrefix: "slide4"
    },
    {
        id: 5,
        image: banner5.src || banner5,
        translationPrefix: "slide5"
    }
];

const HeroHeader = () => {
    const t = useTranslations('HeroHeader');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Helper mapping configuration to keep JSX super clean and maintainable
    const getButtonDetails = (index) => {
        switch (index) {
            case 1:
                return { label: t("btnName1"), link: `/${slugify("rental car")}` };
            case 2:
                return { label: t("btnName2"), link: `/${slugify("tour package")}` };
            case 3:
                return { label: t("btnName3"), link: `/tour-package/${slugify("12-jyotirlinga-yatra-with-mahakumbh-tours-travels-nashik")}` };
            case 4:
                return { label: t("btnName4"), link: `/tour-package/${slugify("ashtavinayak-tour-package-for-3-days")}` };
            default:
                return { label: "", link: "/" };
        }
    };

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
                    {heroSliderConfig.map((item, index) => {
                        const btnDetails = getButtonDetails(index);
                        return (
                            <SwiperSlide
                                key={item.id || index}
                                className='hero-slider-main d-flex align-items-center justify-content-center position-relative overflow-hidden'
                            >
                                <div
                                    className="hero-bg-layer"
                                    style={{ backgroundImage: `url("${item.image}")` }}
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

                                            {/* Interactive Footer Area Nodes */}
                                            {index === 0 ? (
                                                <div className="mt-2 countdown-embed-frame w-100 d-flex flex-column justify-content-center">
                                                    <KumbhCountdown isActive={true} />
                                                </div>
                                            ) : (
                                                <div className="w-100 d-flex flex-column align-items-center justify-content-center">
                                                    <AnimationSecComponent
                                                        type="vertical"
                                                        direction="up"
                                                        delay={0.8}
                                                        distance={20}
                                                    >
                                                        <div className="d-flex align-items-center justify-content-center gap-4 pt-1 execution-row-layer">
                                                            <Link
                                                                href={btnDetails.link}
                                                                target='_blank'
                                                                className="primery-btn text-decoration-none"
                                                            >
                                                                {btnDetails.label}
                                                            </Link>
                                                        </div>
                                                    </AnimationSecComponent>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Container>
                            </SwiperSlide>
                        );
                    })}

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