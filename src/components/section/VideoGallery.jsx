"use client";

import React, { useRef, useState, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import { SwiperSlide } from "swiper/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SwiperSliderComp, TitleComponent } from "../ui/common";

import "swiper/css";
import "../../styles/videoGallery.scss";

const VideoGallery = () => {
    const videoRefs = useRef([]);
    const swiperRef = useRef(null);

    const [showModal, setShowModal] = useState(false);
    const [activeVideoUrl, setActiveVideoUrl] = useState("");
    
    // Track unique custom cover states for your Instagram API fallbacks
    const [instagramCovers, setInstagramCovers] = useState({});

    const reels = [
        { id: 1, video: "/videos/GramFetchr_98506378.mp4", title: "Kumbh Mela Experience", location: "Prayagraj" },
        { id: 2, video: "/videos/GramFetchr_98506378.mp4", title: "Holy Dip", location: "Haridwar" },
        { id: 3, video: "https://youtube.com/shorts/aRRPbm0PiUI?si=nH3hW8xO6vPvTUGO", title: "Sadhu Procession", location: "Ujjain" },
        { id: 4, video: "https://www.instagram.com/reel/DYFGdpLo21j/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==.mp4", title: "Goda Ghat", location: "Nashik" },
        { id: 5, video: "https://youtu.be/SvZoIu-ixPI?si=0TFUn_IpWA3Nh-FO", title: "Goda Ghat", location: "Nashik" },
        { id: 6, video: "/videos/GramFetchr_98506378.mp4", title: "Goda Ghat", location: "Nashik" },
        { id: 7, video: "/videos/GramFetchr_98506378.mp4", title: "Goda Ghat", location: "Nashik" }
    ];

    // Domain matching pattern verifiers
    const isYouTubeUrl = (url) => url?.includes("youtube.com") || url?.includes("youtu.be");
    const isInstagramUrl = (url) => url?.includes("instagram.com") || url?.includes("instagr.am");

    // Parses diverse social media link formats into clean iframe source links
    const getEmbedUrl = (url) => {
        if (!url) return "";
        
        if (isYouTubeUrl(url)) {
            let videoId = "";
            if (url.includes("/shorts/")) {
                videoId = url.split("/shorts/")[1]?.split("?")[0];
            } else if (url.includes("v=")) {
                videoId = url.split("v=")[1]?.split("&")[0];
            } else if (url.includes("youtu.be/")) {
                videoId = url.split("youtu.be/")[1]?.split("?")[0];
            }
            return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=0&controls=1&rel=0`;
        }

        if (isInstagramUrl(url)) {
            // Clean up the trailing ".mp4" string from your dataset safely to prevent broken route pathways
            let sanitizedUrl = url.replace(".mp4", "");
            let baseReelUrl = sanitizedUrl.split("?")[0];
            if (!baseReelUrl.endsWith("/")) baseReelUrl += "/";
            // Uses standard Instagram embed routing pattern profiles
            return `${baseReelUrl}embed/captioned/?cr=1&v=12`;
        }

        return url;
    };

    // Dynamically generates safe, crisp asset placeholder images for cloud networks
    const getThumbnailSrc = (reel) => {
        if (isYouTubeUrl(reel.video)) {
            const videoId = reel.video.split("/shorts/")[1]?.split("?")[0];
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
        if (isInstagramUrl(reel.video)) {
            // Fallback backstop image while waiting for a live graph API connection
            return instagramCovers[reel.id] || "/images/banner1.webp"; 
        }
        return null;
    };

    const handleSlideChange = (swiper) => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;
            
            if (index === swiper.realIndex) {
                // Instantly play direct local native file assets when swipe finishes
                if (typeof video.play === "function") {
                    video.play().catch(() => { });
                }
            } else {
                // Gracefully pause background videos to preserve CPU memory pools
                if (typeof video.pause === "function") {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    };

    const handleVideoEnd = () => {
        swiperRef.current?.slideNext();
    };

    const openModal = (videoUrl) => {
        setActiveVideoUrl(videoUrl);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setActiveVideoUrl("");
    };

    return (
        <section className="section-padding-2 padding-bottom trinery-bg position-relative video-gallery-main">
            <div className="top-divider position-absolute z-3 td-top bd-light-bg" style={{ pointerEvents: 'none' }}></div>
            <Container>
                <div className="d-flex justify-content-center mb-4 mb-md-0 justify-content-sm-between align-items-center">
                    <TitleComponent
                        title="Divine Experiences"
                        className="mb-0 md-md-5"
                        divider={false}
                        montezSubTitle="video stories"
                        montezClass="playfair-display primery-color d-none d-md-block"
                    />

                    {/* Navigation Handles */}
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
                    loop={reels.length > 5}
                    speed={800}
                    watchSlidesProgress={true}
                    disableAutoplay={true}
                    breakpoints={{
                        0: { slidesPerView: 2.25 },
                        450: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1240: { slidesPerView: 5 },
                        1440: { slidesPerView: 5 }
                    }}
                    onSlideChange={handleSlideChange}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        // Delayed initialization handler ensures video components sync smoothly with DOM loading
                        setTimeout(() => {
                            const initialVideo = videoRefs.current[swiper.realIndex];
                            if (initialVideo && typeof initialVideo.play === "function") {
                                initialVideo.play().catch(() => { });
                            }
                        }, 400);
                    }}
                    className="video-swiper"
                >
                    {reels.map((reel, index) => {
                        const isYT = isYouTubeUrl(reel.video);
                        const isIG = isInstagramUrl(reel.video);
                        const isExternal = isYT || isIG;

                        return (
                            <SwiperSlide key={reel.id}>
                                <div className="reel-card" onClick={() => openModal(reel.video)}>
                                    <div className="reel-thumbnail-wrapper position-relative w-100 h-100 overflow-hidden">
                                        
                                        {isExternal ? (
                                            /* Static Placeholder Card Layer for Complex Iframe Streams */
                                            <div 
                                                ref={(el) => (videoRefs.current[index] = el)}
                                                className="external-placeholder-wrapper w-100 h-100 d-flex align-items-center justify-content-center"
                                            >
                                                <img 
                                                    src={getThumbnailSrc(reel)} 
                                                    alt={reel.title}
                                                    className="w-100 h-100 object-cover"
                                                />
                                                <div className={`social-play-badge position-absolute ${isIG ? 'instagram-gradient' : 'youtube-red'}`}>
                                                    ▶
                                                </div>
                                            </div>
                                        ) : (
                                            /* Native HTML5 Video Node for Local Asset Paths */
                                            <video
                                                ref={(el) => (videoRefs.current[index] = el)}
                                                src={reel.video}
                                                muted
                                                playsInline
                                                preload="metadata"
                                                className="reel-video w-100 h-100 object-cover"
                                                onEnded={handleVideoEnd}
                                            />
                                        )}

                                        <div className="reel-content position-absolute bottom-0 left-0 w-100 p-3 z-2">
                                            <h5 className="text-white mb-1">{reel.title}</h5>
                                            <small className="text-white-50">{reel.location}</small>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </SwiperSliderComp>
            </Container>

            {/* Overlay Modal Video Player */}
            <Modal
                show={showModal}
                onHide={closeModal}
                centered
                size="lg"
                className="video-modal"
            >
                <Modal.Body className="p-0 bg-black overflow-hidden position-relative">
                    <button 
                        type="button" 
                        className="btn-close btn-close-white position-absolute top-0 end-0 m-3 z-3" 
                        onClick={closeModal} 
                        aria-label="Close"
                    />
                    {activeVideoUrl && (
                        isYouTubeUrl(activeVideoUrl) || isInstagramUrl(activeVideoUrl) ? (
                            /* Re-routed Iframe Layer for Social Web Providers */
                            <div className="ratio ratio-9x16 modal-iframe-container">
                                <iframe
                                    src={getEmbedUrl(activeVideoUrl)}
                                    title="Social Video Player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="modal-video-iframe border-0 w-100 h-100"
                                />
                            </div>
                        ) : (
                            /* Direct Native Storage Streams */
                            <div className="ratio ratio-9x16">
                                <video
                                    src={activeVideoUrl}
                                    controls
                                    autoPlay
                                    preload="metadata"
                                    className="modal-video w-100 h-100"
                                />
                            </div>
                        )
                    )}
                </Modal.Body>
            </Modal>
        </section>
    );
};

export default VideoGallery;