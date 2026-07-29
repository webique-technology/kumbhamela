"use client";
import React, { useState } from 'react';
import { BookingFormHandler } from './bookingFormHandler';
import { MessageCircle } from "lucide-react";
import { Link, usePathname } from '@/i18n/routing';
import "../../assets/scss/main.scss"
import { useTranslations } from 'next-intl';
import whatsappIcon from "../../assets/images/whatsapp.png"

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
    const pathname = usePathname();
    const t = useTranslations();

    const handleWhatsAppShare = () => {
        // Safe check if tour object exists
        if (!tour) return;

        const origin = window.location.origin;
        const currentUrl = origin + pathname;

        // Extract title & description safely from the logged keys
        const tourTitle = tour.title || tour.name || "Tour Package";
        const tourDuration = tour.duration || "";
        const tourDesc = tour.description || tour.mainDesc || "";

        // Map over 'itineraries' array safely instead of non-existent 'journey'
        const itineraryList = tour.itineraries || tour.journey || [];
        const itinerarySummary = itineraryList.length > 0
            ? itineraryList
                .map((day, i) => `Day ${i + 1}: ${day.itinerary_title || day.journey_title || ""}`)
                .join("\n")
            : "Detailed itinerary available on link.";

        // Construct message
        const message =
            `*Tour Itinerary: ${tourTitle}*\n\n` +
            (tourDuration ? `*Duration:* ${tourDuration}\n` : "") +
            (tourDesc ? `*Description:* ${tourDesc.replace(/\*\*/g, "")}\n\n` : "\n") + // Optional: strip markdown ** if any
            `*Itinerary Overview:*\n${itinerarySummary}\n\n` +
            `*Full Details:* ${currentUrl}`;

        const encodedMessage = encodeURIComponent(message);
        
        // Open WhatsApp web / mobile app safely
        window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`, "_blank");
    };

    return (
        <button
            type="button"
            onClick={handleWhatsAppShare}
            className="itinerary-summary p-2 border-0 bg-white rounded d-flex flex-column align-items-center justify-content-center mt-3"
            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
        >
            <img
                src={whatsappIcon.src || whatsappIcon}
                alt="WhatsApp"
                style={{ width: '28px', marginBottom: '5px' }}
            />
            <p className="m-0 fw-bold text-success" style={{ fontSize: '12px' }}>
                {t ? t("TranslateBtn.SendItinerary") : "Send Itinerary"}
            </p>
        </button>
    );
};