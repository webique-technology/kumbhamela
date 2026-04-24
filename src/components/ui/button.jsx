"use client";
import React, { useState } from 'react';
import { BookingFormHandler } from './bookingFormHandler';
import { MessageCircle } from "lucide-react";

import "../../assets/scss/main.scss"


export const PrimeryBtn = ({ iconLeft, iconRight, title, btnLink, className }) => {
    return (
        <div className="text-center">
            <a href={btnLink} className={`${className} text-decoration-none d-inline-flex align-items-center gap-2`}>
                {iconLeft && iconLeft}
                {title}
                {iconRight && iconRight}
            </a>
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