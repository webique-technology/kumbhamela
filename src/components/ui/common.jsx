"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronDown, DollarSign } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from 'next-intl';

// swiper imports
import { Swiper } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles (Required for it to look right)
import 'swiper/css';
import 'swiper/css/navigation';
import { Tab, Tabs } from 'react-bootstrap';
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

            <span className={montezClass}>{montezSubTitle}</span>

            <h2 className={`${h2_class} display-6 fw-semiboldmb-2`}>
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
    navigation = true,
    timeDelay = 2500,
    loop = true,
    slidesPerView = 1,
    spaceBetween = 20,
    breakpoints,
    disableAutoplay = false,
    ...props // Capture extra props like onSlideChange
}) => {
    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            navigation={navigation}
            // grabCursor makes it feel like an app and helps with "stuck" drags
            grabCursor={true}
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
            breakpoints={breakpoints}
            {...props}
        >
            {children}
        </Swiper>
    );
};

// search fleet component
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

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (formData.name) params.set("name", formData.name);
        if (formData.category !== 'all') params.set("category", formData.category);
        if (formData.price !== 'all') params.set("price", formData.price);
        params.set("page", "1"); // Reset to page 1 on new search

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="search-fleet-container">
            <form className="search-fleet-card shadow-sm" onSubmit={handleSearch}>

                {/* 1. Name Search */}
                <div className="filter-group">
                    <label className="filter-label">SEARCH BY NAME</label>
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

                {/* 2. Category Dropdown */}
                <div className="filter-group">
                    <label className="filter-label">
                        {isVehiclePage ? "VEHICLE TYPE" : isHotelPage ? "ACCOMMODATION" : "TOUR TYPE"}
                    </label>
                    <div className="input-wrapper">
                        <select className="filter-input" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                            <option value="all">All Types</option>
                            {isVehiclePage && (
                                <>
                                    <option value="Sedan">Sedan</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Traveller">Tempo Traveller</option>
                                </>
                            )}
                            {isHotelPage && (
                                <>
                                    <option value="Luxury">Luxury</option>
                                    <option value="Heritage">Heritage</option>
                                    <option value="Budget">Budget</option>
                                </>
                            )}
                            {isTourPage && (
                                <>
                                    <option value="Essential">Essential</option>
                                    <option value="Premium">Premium</option>
                                    <option value="Luxury">Luxury</option>
                                </>
                            )}
                        </select>
                        <ChevronDown className="input-icon-right" size={16} />
                    </div>
                </div>

                {/* 3. Price Filter */}
                <div className="filter-group">
                    <label className="filter-label">PRICE RANGE</label>
                    <div className="input-wrapper">
                        <select className="filter-input" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}>
                            <option value="all">Any Price</option>
                            {/* <option value="0-3000">Below ₹3,000</option>
                            <option value="3000-15000">₹3,000 - ₹15,000</option>
                            <option value="15000-999999">Above ₹15,000</option> */}
                            {isVehiclePage && (
                                <>
                                    <option value="0-2000">Below ₹2,000</option>
                                    <option value="2000-10000">Between ₹2,000 - ₹10,000</option>
                                    <option value="10000-999999">Above ₹10,000</option>
                                </>
                            )}
                            {isHotelPage && (
                                <>
                                    <option value="0-2000">Below ₹2,000</option>
                                    <option value="2000-7000">Between ₹2,000 - ₹7,000</option>
                                    <option value="7000-999999">Above ₹7,000</option>
                                </>
                            )}
                            {isTourPage && (
                                <>
                                    <option value="0-5000">Below ₹5,000</option>
                                    <option value="5000-15000">Between ₹5,000 - ₹15,000</option>
                                    <option value="15000-999999">Above ₹15,000</option>
                                </>
                            )}
                        </select>
                        <DollarSign className="input-icon-right" size={16} />
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
        return targetDate ? new Date(targetDate) : new Date("2027-10-14T00:00:00Z");
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
            <div className="countdown-box w-100 h-100 shadow-sm flex-column d-flex align-items-center justify-content-center text-center">
                <div className='countdown-value w-100'>
                    <h3 className="glitch-text m-0">{formattedValue}</h3>
                </div>
                <div className="countdown-divider border-top"></div>
                <p className="countdown-label m-0">{label}</p>
            </div>
        );
    };

    return (
        <div className="d-grid kumbh-countdown-section gap-3 justify-content-center">
            <CountdownBlock value={timeLeft.days} label="Days" />
            <CountdownBlock value={timeLeft.hours} label="Hours" />
            <CountdownBlock value={timeLeft.minutes} label="Mins" />
            <CountdownBlock value={timeLeft.seconds} label="Seconds" />
        </div>
    );
};


export const TourTabs = ({ tour }) => {
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
                    title="Cancellation Policy"
                >
                    <h4 className="section-title fw-bold mb-3">Cancellation Policy</h4>
                    <p className="text-muted small mb-4">
                        Cancellation charges rise closer to departure, with the exact amount deducted shown below.
                    </p>

                    <div className="cancellation-timeline">
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
                    </div>
                </Tab>
                <Tab eventKey="payment-terms" title="Payment Terms">
                    <PaymentTerms />
                </Tab>
            </Tabs>
        </>
    );

}

