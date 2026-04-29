"use client";
import React, { useState } from 'react';
import { BookingFormHandler } from './bookingFormHandler';
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import "../../assets/scss/main.scss"
import Link from 'next/link';


export const PrimeryBtn = ({ iconLeft, iconRight, title, btnLink, className }) => {
    return (
        <div className="text-center">
            <Link href={btnLink || "#"} className={`${className} text-decoration-none d-inline-flex align-items-center gap-2`}>
                {iconLeft && iconLeft}
                {title}
                {iconRight && iconRight}
            </Link>
        </div>
    )
}

export const WhatsappBtn = ({ iconLeft, iconRight, title, className, onClick, type = "button" }) => {
    return (
        <div className="text-center">
            <button
                type={type}
                onClick={onClick}
                className={`${className} btn d-flex gap-2 align-items-center px-3 py-2 border-0 shadow-sm`}
            >
                {iconLeft && iconLeft}
                <span className="small text-light">{title}</span>
                {iconRight && iconRight}
            </button>
        </div>
    )
}

export const TourBtn = ({ title, className, tourName }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                className={className}
                onClick={() => setIsOpen(true)}
            >
                <MessageCircle size={18} className="me-2" />
                {title}
            </button>
            <BookingFormHandler
                show={isOpen}
                onHide={() => setIsOpen(false)}
                tourName={tourName}
            />
        </>
    );
};

export const WhatsAppShareBtn = ({ tour }) => {
    // This hook gets the path (e.g., /tour-package/essential-darshan)
    const pathname = usePathname();

    const handleWhatsAppShare = () => {
        const origin = window.location.origin;
        const currentUrl = origin + pathname;

        const itinerarySummary = tour.journey
            .map((day, i) => `Day ${i + 1}: ${day.journey_title}`)
            .join("\n");

        // Remove the Preview Image link line. 
        // The main link at the bottom triggers the SEO card.
        const message =
            `*Tour Itinerary: ${tour.name}*\n\n` +
            `*Duration:* ${tour.duration}\n` +
            `*Description:* ${tour.mainDesc}\n\n` +
            `*Itinerary Overview:*\n${itinerarySummary}\n\n` +
            `*Full Details:* ${currentUrl}`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
    };

    return (
        <button
            onClick={handleWhatsAppShare}
            className="itinerary-summary p-2 border-0 bg-white rounded d-flex flex-column align-items-center justify-content-center mt-3"
            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
        >
            <img
                src="/images/whatsapp.png"
                alt="whatsapp"
                style={{ width: '28px', marginBottom: '5px' }}
            />
            <p className="m-0 fw-bold text-success" style={{ fontSize: '12px' }}>
                Send Itinerary
            </p>
        </button>
    );
};