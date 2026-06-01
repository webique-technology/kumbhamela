"use client";

import React, { useRef, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ArrowRight, ArrowLeft } from "lucide-react"

import "swiper/css";
import "../../styles/videoGallery.scss";
import { SwiperSliderComp, TitleComponent } from "../ui/common";

const VideoGallery = () => {
    const videoRefs = useRef([]);
    const swiperRef = useRef(null);

    const [showModal, setShowModal] = useState(false);
    const [activeVideo, setActiveVideo] = useState(null);

    const reels = [
        { id: 1, video: "/videos/GramFetchr_98506378.mp4", title: "Kumbh Mela Experience", location: "Prayagraj" },
        { id: 2, video: "/videos/GramFetchr_98506378.mp4", title: "Evening Aarti", location: "Nashik" },
        { id: 3, video: "/videos/GramFetchr_98506378.mp4", title: "Holy Dip", location: "Haridwar" },
        { id: 4, video: "/videos/GramFetchr_98506378.mp4", title: "Sadhu Procession", location: "Ujjain" },
        { id: 5, video: "/videos/GramFetchr_98506378.mp4", title: "Goda Ghat", location: "Nashik" },
        { id: 6, video: "/videos/GramFetchr_98506378.mp4", title: "Goda Ghat", location: "Nashik" },
        { id: 7, video: "/videos/GramFetchr_98506378.mp4", title: "Goda Ghat", location: "Nashik" },
        { id: 8, video: "/videos/GramFetchr_98506378.mp4", title: "Goda Ghat", location: "Nashik" }
    ];

    const handleSlideChange = (swiper) => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;

            if (index === swiper.realIndex) {
                video.play().catch(() => { });
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    };

    const handleVideoEnd = () => {
        swiperRef.current?.slideNext();
    };

    const openModal = (video) => {
        setActiveVideo(video);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setActiveVideo(null);
    };

    return (
        <section className="section-padding-2 trinery-bg position-relative video-gallery-main">
            <div className="top-divider position-absolute z-3 td-top bd-light-bg" style={{ pointerEvents: 'none' }}></div>
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <TitleComponent
                        title="Divine Experiences"
                        className="mb-4 md-md-5"
                        divider={false}
                        montezSubTitle="video stories"
                        montezClass="montez-sub-heading primery-color"
                    />

                    {/* Custom Navigation Buttons */}
                    <div className="slider-nav-wrapper d-none d-sm-flex gap-2">
                        <button className="video-prev-btn nav-custom-btn">
                            <ArrowLeft size={20} />
                        </button>
                        <button className="video-next-btn nav-custom-btn">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
                <SwiperSliderComp
                    slidesPerView={6}
                    navigation={{
                        prevEl: '.video-prev-btn',
                        nextEl: '.video-next-btn',
                    }}
                    spaceBetween={15}
                    loop={reels.length > 6}
                    speed={800}
                    watchSlidesProgress={true}
                    // disableAutoplay={true}
                    breakpoints={{
                        0: { slidesPerView: 3 },
                        450: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1240: { slidesPerView: 5 },
                        1440: { slidesPerView: 6 }
                    }}
                    onSlideChange={handleSlideChange}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;

                        setTimeout(() => {
                            videoRefs.current[swiper.realIndex]?.play().catch(() => { });
                        }, 300);
                    }}
                    className="video-swiper"
                >
                    {reels.map((reel, index) => (
                        <SwiperSlide key={reel.id}>
                            <div className="reel-card" onClick={() => openModal(reel.video)}>
                                <div className="reel-thumbnail-wrapper">

                                    <video
                                        ref={(el) => (videoRefs.current[index] = el)}
                                        src={reel.video}
                                        muted
                                        playsInline
                                        preload="metadata"
                                        className="reel-video"
                                        onEnded={handleVideoEnd} // auto next the reel when reel end
                                    />

                                    <div className="reel-content">
                                        <h5>{reel.title}</h5>
                                        <small>{reel.location}</small>
                                    </div>

                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </SwiperSliderComp>
            </Container>

            {/* fullscreen modale to opern reel */}
            <Modal
                show={showModal}
                onHide={closeModal}
                centered
                size="lg"
                className="video-modal"
            >
                <Modal.Body>
                    {activeVideo && (
                        <video
                            src={activeVideo}
                            controls
                            autoPlay
                            preload="metadata"
                            className="modal-video"
                        />
                    )}
                </Modal.Body>
            </Modal>
            <div className="bottom-divider position-absolute z-3 bd-bottom d-black-filter" style={{ pointerEvents: 'none' }}></div>
        </section>
    );
};

export default VideoGallery;