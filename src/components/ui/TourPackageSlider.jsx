"use client";
import { SwiperSlide } from "swiper/react";
import { SwiperSliderComp } from "./common";
import Link from "next/link";
import { slugify } from "@/lib/utils";

export const TourPackageSlider = ({ packages, title }) => {
    return (
        <div className="tour-package-slider-main">
            <h4 className="section-title fw-bold mb-4">{title}</h4>
            <SwiperSliderComp
                className={"py-1"}
                navigation={false}
                loop={true}
                timeDelay={3500}
                disableAutoplay={true}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 16,
                    },
                    350: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1220: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
            >
                {packages.map((item, index) => (
                    <SwiperSlide key={index} className="h-100">
                        <Link href={`/tour-package/${slugify(item.name)}`} className="h-100 text-decoration-none" aria-label={item.name}>
                            <div className="tour-package-card-small rounded-2 shadow-sm border p-3 h-100">
                                <div className="image-wrapper rounded-2">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="tpcs-img rounded-2 mb-2"
                                    />
                                </div>
                                <div className="card-body d-grid">
                                    <h6 className="text-dark">{item.name}</h6>
                                    <p className="m-0 fw-medium primery-color">₹ {item.price}</p>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </SwiperSliderComp>
        </div>
    );
};