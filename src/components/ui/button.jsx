"use client";
import React, { useState } from "react";
import { BookingFormHandler } from "./bookingFormHandler";
import { MessageCircle, Share2 } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import "../../assets/scss/main.scss";
import { useTranslations, useLocale } from "next-intl";
import whatsappIcon from "../../assets/images/whatsapp.png";

/**
 * WhatsAppShareBtn Component
 *
 * @param {Object} data - Backend card object
 * @param {string} type - Card type: 'hotel' | 'car' | 'tour'
 * @param {string} mode - Display mode: 'both' | 'icon' | 'text' (default: 'both')
 * @param {string} className - Optional custom styles
 * @param {string} label - Custom button text (default: 'Share')
 */

// make for whatsapp ahre btn

// Utility: Strips HTML tags, trims whitespace, and limits character count
function cleanPlainText(input = "", maxLength = 160) {
  if (!input) return "";
  const stripped = String(input)
    .replace(/<[^>]+>/g, " ") // Strip HTML tags (<p>, <br>, etc.)
    .replace(/&[a-z0-9#]+;/gi, " ") // Strip HTML entities (&amp;, &nbsp;, etc.)
    .replace(/\s+/g, " ") // Collapse duplicate spaces
    .trim();

  if (stripped.length <= maxLength) return stripped;
  const boundary = stripped.lastIndexOf(" ", maxLength);
  return (
    (boundary > 0
      ? stripped.slice(0, boundary)
      : stripped.slice(0, maxLength)) + "..."
  );
}

// make for whatsapp ahre btn

export const PrimeryBtn = ({
  iconLeft,
  iconRight,
  title,
  btnLink,
  className,
}) => {
  return (
    <div className="text-center">
      <Link
        href={btnLink || "#"}
        className={`${className} text-decoration-none d-inline-flex align-items-center gap-2`}
      >
        {iconLeft && iconLeft}
        {title}
        {iconRight && iconRight}
      </Link>
    </div>
  );
};

export const WhatsappBtn = ({
  iconLeft,
  iconRight,
  title,
  className,
  onClick,
  type = "button",
}) => {
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
  );
};

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
  const locale = useLocale();
  const t = useTranslations();

  const handleWhatsAppShare = () => {
    if (!tour) return;

    // 1. Construct canonical localized URL directly from active locale & backend slug
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const tourSlug = tour.slug || "";
    const currentUrl = `${origin}/${locale}/tour-package/${tourSlug}`;

    // 2. Sanitize and trim fields to prevent URI overflow (> 2000 chars)
    const tourTitle = cleanPlainText(
      tour.title || tour.name || "Tour Package",
      70,
    );
    const tourDuration = cleanPlainText(tour.duration || "", 30);
    const tourDesc = cleanPlainText(
      tour.description || tour.mainDesc || "",
      150,
    );

    // 3. Format Price
    const tourPrice = tour.offer_price
      ? `₹${Number(tour.offer_price).toLocaleString("en-IN")}`
      : tour.base_price
        ? `₹${Number(tour.base_price).toLocaleString("en-IN")}`
        : "";

    // 4. Summarize Itinerary (Max 4 days to prevent link cut-off)
    const itineraryList = Array.isArray(tour.itineraries)
      ? tour.itineraries
      : [];
    const itinerarySummary =
      itineraryList.length > 0
        ? itineraryList
            .slice(0, 4)
            .map((day, i) => {
              const dayTitle = cleanPlainText(
                day.itinerary_title || day.journey_title || `Day ${i + 1}`,
                40,
              );
              return `• Day ${i + 1}: ${dayTitle}`;
            })
            .join("\n")
        : "Detailed itinerary available on link.";

    // 5. Construct message (URL isolated on its own line to prevent Markdown merge errors)
    const message =
      `*Tour Itinerary: ${tourTitle}*\n\n` +
      (tourDuration ? `*Duration:* ${tourDuration}\n` : "") +
      (tourPrice ? `*Starting From:* ${tourPrice} per person\n` : "") +
      (tourDesc ? `*Overview:* ${tourDesc}\n\n` : "\n") +
      `*Day-wise Highlights:*\n${itinerarySummary}\n\n` +
      `*View Full Itinerary & Book:*\n${currentUrl}`;

    const encodedMessage = encodeURIComponent(message);

    // 6. Use universal wa.me protocol with noopener,noreferrer
    window.open(
      `https://wa.me/?text=${encodedMessage}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <button
      type="button"
      onClick={handleWhatsAppShare}
      className="itinerary-summary p-2 border-0 bg-white rounded d-flex flex-column align-items-center justify-content-center mt-3"
      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
    >
      <img
        src={whatsappIcon?.src || whatsappIcon}
        alt="WhatsApp"
        style={{ width: "28px", marginBottom: "5px" }}
      />
      <p className="m-0 fw-bold text-success" style={{ fontSize: "12px" }}>
        {t ? t("TranslateBtn.SendItinerary") : "Send Itinerary"}
      </p>
    </button>
  );
};

export const WhatsAppCardDataShareBtn = ({
  data,
  type = "tour",
  mode = "both",
  className = "",
  label = "Share",
}) => {
  if (!data) return null;

  const generateShareMessage = () => {
    let title = "";
    let details = [];
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : "";

    if (type === "car") {
      title = data.name || "Car Details";

      if (data.total_seats) {
        details.push(`Capacity: ${data.total_seats} Seats`);
      }
      if (data.base_price) {
        details.push(`Rate: ₹${data.base_price} / km`);
      }
      if (Array.isArray(data.features) && data.features.length > 0) {
        details.push(`Features: ${data.features.join(", ")}`);
      }
    } else if (type === "hotel") {
      title = data.title || "Hotel Details";

      if (data.location) {
        details.push(`Location: ${data.location}`);
      }
      if (data.rating) {
        details.push(`Rating: ${data.rating}`);
      }

      const price = data.offer_price || data.base_price;
      if (price) {
        details.push(`Price: ₹${price} / per night`);
      }

      if (Array.isArray(data.room_type) && data.room_type.length > 0) {
        details.push(`Room Type: ${data.room_type.join(", ")}`);
      }
    } else if (type === "tour") {
      title = data.title || "Tour Package Details";

      const price = data.offer_price || data.base_price;
      if (price) {
        details.push(`Price: Starting from ₹${price}`);
      }

      if (Array.isArray(data.highlights) && data.highlights.length > 0) {
        details.push(`Highlights: ${data.highlights.join(" | ")}`);
      }
    } else if (type === "tent") {
      title = data.title || "Tent Details";

      const price = data.offer_price || data.base_price;
      if (price) {
        details.push(`Price: Starting from ₹${price}`);
      }

      if (Array.isArray(data.facilities) && data.facilities.length > 0) {
        details.push(`Facilities: ${data.facilities.join(" | ")}`);
      }
    }

    // Construct final clean message
    let message = `*Mahakumbh Tours & Travels*\n\n`;
    message += `*${title}*\n\n`;
    if (details.length > 0) {
      message += details.join("\n") + "\n\n";
    }
    message += `View more details here: ${currentUrl}`;

    return encodeURIComponent(message);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const encodedMessage = generateShareMessage();
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleShare}
      className={`btn whatsapp-btn p-2 rounded-circle d-inline-flex align-items-center justify-content-center gap-2 ${className}`}
      title="Share on WhatsApp"
      type="button"
    >
      {(mode === "both" || mode === "icon") && (
        <Share2 size={18} className="text-light" />
      )}
      {(mode === "both" || mode === "text") && <span>{label}</span>}
    </button>
  );
};
