"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronDown, DollarSign, X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from "framer-motion";

// swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles (Required for it to look right)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { PaymentTerms } from './card';


// make this component for decorative title divider
export const DecorativeDivider = () => {
    return (
        <div className="decorative-divider d-flex align-items-center justify-content-center my-4">

            {/* Left Line */}
            <div className="divider-line"></div>

            {/* Center Dots */}
            <div className="divider-dots d-flex align-items-center mx-3">
                <span className="dot"></span>
                <span className="dot dot-center"></span>
                <span className="dot"></span>
            </div>

            {/* Right Line */}
            <div className="divider-line"></div>

        </div>
    );
};

// Title component for section heading
export const TitleComponent = ({
    className = "text-center mb-5",
    title,
    description,
    badgeTitle,
    h2_class = "text-dark",
    divider = true,
    montezSubTitle,
    montezClass = "montez-sub-heading",
    descClass = "sub-heading"
}) => {
    return (
        <div className={`${className} section-title`}>

            {/* badge */}
            {badgeTitle && (
                <div className="sacred-badge mb-3">
                    <span className="icon">✦</span>
                    <span className="text">{badgeTitle}</span>
                </div>
            )}

            <span className={`${montezClass} h4`}>{montezSubTitle}</span>

            <h2 className={`${h2_class} mt-2 display-6 fw-semiboldmb-2`}>
                {title}
            </h2>

            {divider === true && (<DecorativeDivider />)}

            {description && (
                <p className={descClass}>
                    {description}
                </p>
            )}
        </div>
    )
}

// slider image swiper
export const SwiperSliderComp = ({
    children,
    className,
    style,
    navigation = true,
    timeDelay = 2500,
    loop = true,
    slidesPerView = 1,
    spaceBetween = 20,
    effect, // Added explicit effect parameter
    module,
    breakpoints,
    disableAutoplay = false,
    ...props // Capture extra props like onSlideChange
}) => {
    // Explicit array assignment guarantees modules assemble correctly
    const activeModules = [Navigation, Autoplay];
    if (module) activeModules.push(module);
    if (effect === 'fade' && !activeModules.includes(EffectFade)) {
        activeModules.push(EffectFade);
    }

    const isFade = effect === 'fade';
    return (
        <Swiper
            modules={activeModules}
            effect={effect} // Decides if slider uses 'slide' or 'fade'
            // Crucial: Fade configurations break if spaceBetween is greater than zero
            spaceBetween={isFade ? 0 : spaceBetween}
            slidesPerView={isFade ? 1 : slidesPerView}
            navigation={navigation}
            grabCursor={!isFade} // Disable swipe tracking cursor feel for static crossfades
            // This ensures the transition finishes even if the user stops dragging mid-way
            shortSwipes={true}
            longSwipes={true}
            // Only loop if we have enough slides, otherwise Swiper gets "stuck"
            loop={loop}
            className={className}
            autoplay={
                disableAutoplay
                    ? false
                    : {
                        delay: timeDelay,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true, // Good UX for sliders
                    }
            }
            breakpoints={isFade ? undefined : breakpoints}
            {...props}
            style={style}
        >
            {children}
        </Swiper>
    );
};

// Search Bar
export const SearchFleet = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Identify current page
    const isVehiclePage = pathname.includes('/rental-car');
    const isHotelPage = pathname.includes('/hotel');
    const isTourPage = pathname.includes('/tour-package');

    const [formData, setFormData] = useState({
        name: searchParams.get("name") || '',
        category: searchParams.get("category") || 'all',
        price: searchParams.get("price") || 'all',
    });

    // Handle temporary dropdown open state flags
    const [openDropdown, setOpenDropdown] = useState(null); // 'category' | 'price' | null

    // Safe auto-closing event listener if the user clicks anywhere outside the card

    useEffect(() => {
        const closeAll = () => setOpenDropdown(null);
        window.addEventListener("click", closeAll);
        return () => window.removeEventListener("click", closeAll);
    }, []);

    const toggleDropdown = (e, name) => {
        e.stopPropagation(); // Stops immediate closing via root click propagation
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const handleSelectOption = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setOpenDropdown(null);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (formData.name) params.set("name", formData.name);
        if (formData.category !== 'all') params.set("category", formData.category);
        if (formData.price !== 'all') params.set("price", formData.price);
        params.set("page", "1"); // Reset page offset on filter execution

        router.push(`${pathname}?${params.toString()}`);
    };

    // Label mapping helper to match display values cleanly
    const getCategoryLabel = (val) => {
        const labels = {
            all: "All Types",
            Sedan: "Sedan", SUV: "SUV", Traveller: "Tempo Traveller",
            Luxury: "Luxury", Heritage: "Heritage", Budget: "Budget",
            Essential: "Essential", Premium: "Premium"
        };
        return labels[val] || val;
    };

    const getPriceLabel = (val) => {
        if (val === "all") return "Any Price";
        if (val === "0-2000") return "Below ₹2,000";
        if (val === "2000-10000") return "₹2,000 - ₹10,000";
        if (val === "10000-999999") return "Above ₹10,000";
        if (val === "2000-7000") return "₹2,000 - ₹7,000";
        if (val === "7000-999999") return "Above ₹7,000";
        if (val === "0-5000") return "Below ₹5,000";
        if (val === "5000-15000") return "₹5,000 - ₹15,000";
        if (val === "15000-999999") return "Above ₹15,000";
        return val;
    };

    return (
        <div className="search-fleet-container position-relative z-3">
            <form className="search-fleet-card shadow-sm" onSubmit={handleSearch}>

                {/* 1. Name Search Text Box */}
                <div className="filter-group">
                    <label className="filter-label">Search By Name</label>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            className="filter-input"
                            placeholder={isHotelPage ? "Hotel name..." : isVehiclePage ? "Car model..." : "Package name..."}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Search size={16} className="input-icon-right" />
                    </div>
                </div>

                {/* 2. Custom Category Selector Dropdown Matrix */}
                <div className={`filter-group ${openDropdown === 'category' ? 'raise-z-index' : ''}`}>
                    <label className="filter-label">
                        {isVehiclePage ? "Vehicle Type" : isHotelPage ? "Accommodation" : "Tour Type"}
                    </label>
                    <div className="input-wrapper position-relative">
                        <div
                            className={`custom-select-trigger filter-input ${openDropdown === 'category' ? 'active-dropdown' : ''}`}
                            onClick={(e) => toggleDropdown(e, 'category')}
                        >
                            <span>{getCategoryLabel(formData.category)}</span>
                            <ChevronDown size={18} className={`select-arrow-transition ${openDropdown === 'category' ? 'rotate-arrow' : ''}`} />
                        </div>

                        {/* Dropdown item options list panel with collapse entry wrapper styles */}
                        <div className={`custom-dropdown-options-box shadow-lg ${openDropdown === 'category' ? 'open-expanded' : ''}`}>
                            <div className="option-item" onClick={() => handleSelectOption("category", "all")}>All Types</div>
                            {isVehiclePage && (
                                <>
                                    <div className="option-item" onClick={() => handleSelectOption("category", "Sedan")}>Sedan</div>
                                    <div className="option-item" onClick={() => handleSelectOption("category", "SUV")}>SUV</div>
                                    <div className="option-item" onClick={() => handleSelectOption("category", "Traveller")}>Tempo Traveller</div>
                                </>
                            )}
                            {isHotelPage && (
                                <>
                                    <div className="option-item" onClick={() => handleSelectOption("category", "Luxury")}>Luxury</div>
                                    <div className="option-item" onClick={() => handleSelectOption("category", "Heritage")}>Heritage</div>
                                    <div className="option-item" onClick={() => handleSelectOption("category", "Budget")}>Budget</div>
                                </>
                            )}
                            {isTourPage && (
                                <>
                                    <div className="option-item" onClick={() => handleSelectOption("category", "Essential")}>Essential</div>
                                    <div className="option-item" onClick={() => handleSelectOption("category", "Premium")}>Premium</div>
                                    <div className="option-item" onClick={() => handleSelectOption("category", "Luxury")}>Luxury</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* 3. Custom Price Selector Dropdown Matrix */}
                <div className={`filter-group ${openDropdown === 'price' ? 'raise-z-index' : ''}`}>
                    <label className="filter-label">Price Range</label>
                    <div className="input-wrapper position-relative">
                        <div
                            className={`custom-select-trigger filter-input ${openDropdown === 'price' ? 'active-dropdown' : ''}`}
                            onClick={(e) => toggleDropdown(e, 'price')}
                        >
                            <span>{getPriceLabel(formData.price)}</span>
                            <ChevronDown size={18} className={`select-arrow-transition ${openDropdown === 'price' ? 'rotate-arrow' : ''}`} />
                        </div>

                        {/* Options List Container Box Wrapper */}
                        <div className={`custom-dropdown-options-box shadow-lg ${openDropdown === 'price' ? 'open-expanded' : ''}`}>
                            <div className="option-item" onClick={() => handleSelectOption("price", "all")}>Any Price</div>
                            {isVehiclePage && (
                                <>
                                    <div className="option-item" onClick={() => handleSelectOption("price", "0-2000")}>Below ₹2,000</div>
                                    <div className="option-item" onClick={() => handleSelectOption("price", "2000-10000")}>₹2,000 - ₹10,000</div>
                                    <div className="option-item" onClick={() => handleSelectOption("price", "10000-999999")}>Above ₹10,000</div>
                                </>
                            )}
                            {isHotelPage && (
                                <>
                                    <div className="option-item" onClick={() => handleSelectOption("price", "0-2000")}>Below ₹2,000</div>
                                    <div className="option-item" onClick={() => handleSelectOption("price", "2000-7000")}>₹2,000 - ₹7,000</div>
                                    <div className="option-item" onClick={() => handleSelectOption("price", "7000-999999")}>Above ₹7,000</div>
                                </>
                            )}
                            {isTourPage && (
                                <>
                                    <div className="option-item" onClick={() => handleSelectOption("price", "0-5000")}>Below ₹5,000</div>
                                    <div className="option-item" onClick={() => handleSelectOption("price", "5000-15000")}>₹5,000 - ₹15,000</div>
                                    <div className="option-item" onClick={() => handleSelectOption("price", "15000-999999")}>Above ₹15,000</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="filter-group flex-grow-0">
                    <button type="submit" className="search-fleet-btn">
                        <Search size={20} />
                        <span>Search</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

// timer component
export const KumbhCountdown = ({ targetDate, isActive = true }) => {
    // Memoize the target date so the useEffect doesn't re-run unless the date prop changes
    const COUNTDOWN_TARGET = useMemo(() => {
        return targetDate ? new Date(targetDate) : new Date("2026-11-31T00:00:00Z");
    }, [targetDate]);

    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        // PERF: If the timer isn't active (e.g., component off-screen), don't start the interval
        if (!isActive) return;

        const calculateTimeLeft = () => {
            const difference = COUNTDOWN_TARGET.getTime() - new Date().getTime();

            if (difference <= 0) {
                setIsExpired(true);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            };
        };

        // Set initial time immediately
        setTimeLeft(calculateTimeLeft());

        const timerId = setInterval(() => {
            const nextTime = calculateTimeLeft();

            // LAG FIX: Only trigger a re-render if the 'seconds' value actually changed
            setTimeLeft(prev => {
                if (prev.seconds === nextTime.seconds && prev.days === nextTime.days) {
                    return prev; // Returning the exact same object reference skips the render
                }
                return nextTime;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [COUNTDOWN_TARGET, isActive]);

    if (isExpired) {
        return <div className="countdown-expired text-white h1 text-center">Kumbh Mela Has Begun!</div>;
    }

    // internal sub-component for cleaner rendering
    const CountdownBlock = ({ value, label }) => {
        // Format numbers to always have 2 digits (e.g., 05 instead of 5)
        const formattedValue = String(value).padStart(label === "Days" ? 1 : 2, '0');

        return (
            <div className="countdown-box shadow-sm flex-column d-flex align-items-center justify-content-center text-center">
                <div className='countdown-value'>
                    <h3 className="glitch-text m-0">{formattedValue}</h3>
                </div>
                <div className="countdown-divider border-top"></div>
                <p className="countdown-label text-primery m-0">{label}</p>
            </div>
        );
    };

    return (
        <div className="d-flex align-items-center gap-2 gap-sm-4 justify-content-center px-0 px-sm-5 kumbh-countdown-section">
            <CountdownBlock value={timeLeft.days} label="Days" />
            <CountdownBlock value={timeLeft.hours} label="Hours" />
            <CountdownBlock value={timeLeft.minutes} label="Mins" />
            <CountdownBlock value={timeLeft.seconds} label="Seconds" />
        </div>
    );
};

export const TourTabs = ({ tour, cancellationPolicy, paymentPolicy }) => {
    const [activeTab, setActiveTab] = useState('cancellation-policy');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    return (
        <>
            <Tabs
                activeKey={activeTab}
                onSelect={handleTabChange}
                className="border-0"
            >
                <Tab
                    eventKey="cancellation-policy"
                    // title="Cancellation Policy"
                    title="Terms & Conditions"
                >
                    {/* <h4 className="section-title fw-bold mb-3">Privacy Policy</h4> */}
                    {/* <p className="text-muted small mb-4">
                        {cancellationPolicy.content}
                    </p> */}
                    <p
                        className="text-muted small mb-4"
                        dangerouslySetInnerHTML={{
                            __html: cancellationPolicy.content,
                        }}
                    ></p>
                    {/* <div className="cancellation-timeline">
                        {tour.cancellationPolicy?.map((item, index) => {
                            const charge = Math.round((tour.price * item.percent) / 100);
                            const statusColor = item.percent <= 25 ? '#08c718' : item.percent <= 75 ? '#fd7e14' : '#dc3545';

                            return (
                                <div key={index} className="d-flex align-items-center justify-content-between border p-3 mb-2 bg-white rounded shadow-sm"
                                    style={{
                                        borderLeft: `6px solid ${statusColor} !important`,
                                        transition: 'transform 0.2s ease'
                                    }}>
                                    <div>
                                        <span className="fw-bold h6 mb-0">₹{charge.toLocaleString()}</span>
                                        <span className="text-muted small ms-2">({item.percent}% deduction from tour amount)</span>
                                    </div>
                                    <p className="fw-semibold m-0 text-secondary small-12">
                                        {item.days} days prior
                                    </p>
                                </div>
                            );
                        })}
                    </div> */}
                </Tab>
                {/* <Tab eventKey="payment-terms" title="Payment Terms">
                    <PaymentTerms policy={paymentPolicy} />
                </Tab> */}
            </Tabs>
        </>
    );

}

export const HighlightsModal = ({ children }) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    // LOCK BODY SCROLL
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // cleanup
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <motion.button
                onClick={handleToggle}
                className="px-2 py-1 mt-2 small-12 rounded-2 primery-btn text-decoration-none"
                whileHover={{ scale: 1.01 }}
            >
                View all highlights →
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-backdrop"
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1050,
                            backdropFilter: "blur(4px)",
                            overflow: "hidden",
                        }}
                        onClick={handleToggle}
                    >
                        <motion.div
                            initial={{
                                scale: 0.9,
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                scale: 0.9,
                                opacity: 0,
                                y: 20,
                            }}
                            className="modal-content bg-white p-4 rounded-4 shadow-lg"
                            style={{
                                maxWidth: "500px",
                                width: "90%",
                                position: "relative",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* CLOSE BUTTON */}
                            <button
                                onClick={handleToggle}
                                style={{
                                    position: "absolute",
                                    top: "15px",
                                    right: "15px",
                                    border: "none",
                                    background: "none",
                                }}
                            >
                                <X
                                    size={20}
                                    className="text-muted"
                                />
                            </button>

                            <h3 className="h5 fw-bold mb-4">
                                Tour Highlights
                            </h3>

                            <div
                                className="modal-body-scroll"
                                style={{
                                    maxHeight: "60vh",
                                    overflowY: "auto",
                                }}
                            >
                                {children}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export const BathingDatesSlider = ({ bathingDates }) => {
    return (
        <div className="div d-none d-lg-block">
            <SwiperSliderComp
                slidesPerView={4}
                navigation={{
                    prevEl: '.bathing-prev-btn',
                    nextEl: '.bathing-next-btn',
                }}
                disableAutoplay={true}
                spaceBetween={20}
                timeDelay={4000}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    450: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    865: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    992: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1120: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1600: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
            >
                {bathingDates.map((date, index) => (
                    <SwiperSlide key={index} className="h-auto">
                        <div className="festival-card-wrapper snap-start group">
                            <div className="festival-card glass-card inner-glow position-relative p-4 d-grid rounded-4 transition-card">

                                <div className="festival-card-line position-absolute"></div>

                                <div className="festival-card-header">
                                    <div className="d-flex align-items-center ">
                                        <span className="festival-label text-uppercase d-block">
                                            {date.dateOccation}
                                        </span>
                                    </div>

                                    <h3 className="festival-title my-3 text-capitalize">
                                        {date.title}
                                    </h3>
                                </div>

                                <div className="festival-date d-flex align-items-end gap-3">
                                    <span className="festival-day fw-bold">
                                        {date.day}
                                    </span>

                                    <div className="d-flex flex-column">
                                        <span className="festival-month text-uppercase">
                                            {date.month}
                                        </span>

                                        <span className="festival-year">
                                            2027
                                        </span>
                                    </div>
                                </div>

                                <div className="festival-footer w-100 pt-4 border-top d-flex justify-content-between align-items-center">
                                    <span className="festival-subtitle">
                                        Sacred Immersion
                                    </span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </SwiperSliderComp>
        </div>
    )
}