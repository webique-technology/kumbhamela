"use client";

import React, { useRef, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "../../styles/videoGallery.scss";
import { TitleComponent } from "../ui/common";

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
        { id: 5, video: "/videos/GramFetchr_98506378.mp4", title: "Goda Ghat", location: "Nashik" }
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
            <div className="top-divider position-absolute z-3 td-top bd-light-bg"></div>
            <Container>
                <TitleComponent
                    title={"Divine Experiences"}
                    className='text-center mb-4 mb-md-5'
                    divider={false}
                    montezSubTitle={"video stories"}
                    montezClass='montez-sub-heading primery-color'
                />
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={4}
                    spaceBetween={15}
                    loop={true}
                    speed={800}
                    watchSlidesProgress={true}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        450: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1240: { slidesPerView: 4 }
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
                </Swiper>
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
                            className="modal-video"
                        />
                    )}
                </Modal.Body>
            </Modal>
            <div className="bottom-divider position-absolute z-3 bd-bottom d-black-filter"></div>
        </section>
    );
};

export default VideoGallery;