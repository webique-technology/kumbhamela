"use client";

import React, { useRef, useState, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import { SwiperSlide } from "swiper/react";
import { ArrowRight, ArrowLeft, X } from "lucide-react";
import { SwiperSliderComp, TitleComponent } from "../ui/common";
import { useTranslations } from "next-intl";
import Image from "next/image"; // Added for optimized placeholder images
import "swiper/css";
import "../../styles/videoGallery.scss";
const localVideoPath = "/videos/GramFetchr_98506378.mp4";
import API from "@/lib/api";

const VideoGallery = () => {
    const videoRefs = useRef([]);
    const swiperRef = useRef(null);
    const t = useTranslations("VideoReels");
    const [showModal, setShowModal] = useState(false);
    const [activeVideoUrl, setActiveVideoUrl] = useState("");
    const [mounted, setMounted] = useState(false);

    // Track unique custom cover states for your Instagram API fallbacks
    const [instagramCovers, setInstagramCovers] = useState({});
    const [reels, setReels] = useState([]);
    const [loading, setLoading] = useState(true);

    // FIX: Extract the raw string path from the Next.js imported video asset object (.src)

    // const reels = [
    //     { id: 1, video: localVideoPath, title: "Kumbh Mela Experience", location: "Prayagraj" },
    //     { id: 2, video: localVideoPath, title: "Holy Dip", location: "Haridwar" },
    //     { id: 3, video: "https://youtube.com/shorts/aRRPbm0PiUI?si=nH3hW8xO6vPvTUGO", title: "Sadhu Procession", location: "Ujjain" },
    //     { id: 4, video: "https://www.instagram.com/reel/DYFGdpLo21j/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==.mp4", title: "Goda Ghat", location: "Nashik" },
    //     { id: 5, video: "https://youtu.be/SvZoIu-ixPI?si=0TFUn_IpWA3Nh-FO", title: "Goda Ghat", location: "Nashik" },
    //     { id: 6, video: localVideoPath, title: "Goda Ghat", location: "Nashik" },
    //     { id: 7, video: localVideoPath, title: "Goda Ghat", location: "Nashik" }
    // ];

    useEffect(() => {
        setMounted(true);
    }, []);
    useEffect(() => {
        const fetchVideos = async () => {
            try {

                const response = await API.get(
                    "/videos?per_page=100"
                );

                const videos = response.data.data || [];

                const formattedVideos = videos
                    .filter(video => video.status)
                    .map(video => ({
                        id: video.id,
                        video: video.video_link,
                        title: video.title,
                        location: video.description || "",
                        image: video.image_url || null
                    }));

                setReels(formattedVideos);

            } catch (error) {

                console.error(
                    "Video Fetch Error:",
                    error
                );

            } finally {

                setLoading(false);
            }
        };

        fetchVideos();

    }, []);

    // Domain matching pattern verifiers
    const isYouTubeUrl = (url) => url?.includes("youtube.com") || url?.includes("youtu.be");
    const isInstagramUrl = (url) => url?.includes("instagram.com") || url?.includes("instagr.am");

    // FIX: Bulletproof extraction of YouTube IDs from Shorts or Standard link routing formats
    const getYouTubeId = (url) => {
        if (!url) return "";
        if (url.includes("/shorts/")) {
            return url.split("/shorts/")[1]?.split("?")[0];
        }
        if (url.includes("v=")) {
            return url.split("v=")[1]?.split("&")[0];
        }
        if (url.includes("youtu.be/")) {
            return url.split("youtu.be/")[1]?.split("?")[0];
        }
        return "";
    };

    // Parses diverse social media link formats into clean iframe source links
    const getEmbedUrl = (url) => {
        if (!url) return "";

        if (isYouTubeUrl(url)) {
            const videoId = getYouTubeId(url);
            return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=0&controls=1&rel=0`;
        }

        if (isInstagramUrl(url)) {
            let sanitizedUrl = url.replace(".mp4", "");
            let baseReelUrl = sanitizedUrl.split("?")[0];
            if (!baseReelUrl.endsWith("/")) baseReelUrl += "/";
            return `${baseReelUrl}embed/captioned/?cr=1&v=12`;
        }

        return url;
    };

    // Dynamically generates safe, crisp asset placeholder images for cloud networks
    // const getThumbnailSrc = (reel) => {
    //     if (isYouTubeUrl(reel.video)) {
    //         const videoId = getYouTubeId(reel.video);
    //         return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    //     }
    //     if (isInstagramUrl(reel.video)) {
    //         return instagramCovers[reel.id] || "/images/banner-1.webp"; // Fixed matching fallback filename casing
    //     }
    //     return "";
    // };

    const getThumbnailSrc = (reel) => {

        if (reel.image) {
            return reel.image;
        }

        if (isYouTubeUrl(reel.video)) {

            const videoId = getYouTubeId(reel.video);

            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }

        if (isInstagramUrl(reel.video)) {

            return (
                instagramCovers[reel.id] ||
                "/images/banner-1.webp"
            );
        }

        return "/images/banner-1.webp";
    };

    const handleSlideChange = (swiper) => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;

            // Stop native loops on non-focused elements
            if (index === swiper.realIndex) {
                if (typeof video.play === "function") {
                    video.play().catch(() => { });
                }
            } else {
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
        // Stop playing any active inline background video before opening the overlay modal
        if (swiperRef.current) {
            const activeVideo = videoRefs.current[swiperRef.current.realIndex];
            if (activeVideo && typeof activeVideo.pause === "function") {
                activeVideo.pause();
            }
        }
        setActiveVideoUrl(videoUrl);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setActiveVideoUrl("");
        // Safely resume active background carousel slider item after modal closes
        if (swiperRef.current) {
            const activeVideo = videoRefs.current[swiperRef.current.realIndex];
            if (activeVideo && typeof activeVideo.play === "function") {
                activeVideo.play().catch(() => { });
            }
        }
    };

    // if (!mounted) return null;
    if (!mounted || loading) return null;
    
    return (
        <section className="section-padding-2 padding-bottom trinery-bg position-relative video-gallery-main">
            <div className="top-divider position-absolute z-3 td-top bd-light-bg" style={{ pointerEvents: 'none' }}></div>
            <Container>
                <div className="d-flex justify-content-center mb-4 mb-md-0 justify-content-sm-between align-items-center">
                    <TitleComponent
                        title={t("mainTitle")}
                        className="mb-0 mb-md-4 md-md-5"
                        divider={false}
                        montezSubTitle={t("montezSubTitle")}
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
                                <div className="reel-card" onClick={() => openModal(reel.video)} style={{ cursor: 'pointer' }}>
                                    <div className="reel-thumbnail-wrapper position-relative w-100 h-100 overflow-hidden">

                                        {isExternal ? (
                                            /* Static Placeholder Card Layer for Complex Iframe Streams */
                                            <div
                                                ref={(el) => (videoRefs.current[index] = el)}
                                                className="external-placeholder-wrapper w-100 h-100 d-flex align-items-center justify-content-center position-relative"
                                            >
                                                <Image
                                                    src={getThumbnailSrc(reel)}
                                                    alt={reel.title}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                    unoptimized={isYT} // Bypasses optimization layers for remote YouTube paths
                                                />
                                                <div className={`social-play-badge position-absolute z-2 ${isIG ? 'instagram-gradient' : 'youtube-red'}`}>
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
                                                className="reel-video w-100 h-100 object-fit-cover"
                                                onEnded={handleVideoEnd}
                                            />
                                        )}

                                        <div className="reel-content position-absolute bottom-0 left-0 w-100 p-3 z-2">
                                            <h5 className="text-white mb-1 fs-6">{reel.title}</h5>
                                            <small className="text-white-50 xs-text">{reel.location}</small>
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
                size="md" // Changed to md since portrait vertical reels look cleaner in a narrower column structure
                className="video-modal"
            >
                <Modal.Body className="p-0 bg-black overflow-hidden position-relative rounded-3">
                    <button
                        type="button"
                        className="btn-close d-flex align-items-center justify-content-center position-absolute top-0 end-0 m-3 z-3 bg-dark p-2 rounded-circle"
                        onClick={closeModal}
                        aria-label="Close"
                        style={{ opacity: 1, width: '30px', height: '30px' }}
                    >
                        <X size={20} color="#fff" />
                    </button>
                    {activeVideoUrl && (
                        isYouTubeUrl(activeVideoUrl) || isInstagramUrl(activeVideoUrl) ? (
                            /* Re-routed Iframe Layer for Social Web Providers */
                            <div className="ratio ratio-9x16 modal-iframe-container" style={{ minHeight: '75vh' }}>
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
                            <div className="ratio ratio-9x16" style={{ minHeight: '75vh' }}>
                                <video
                                    src={activeVideoUrl}
                                    controls
                                    autoPlay
                                    preload="auto"
                                    className="modal-video w-100 h-100 object-fit-cover"
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