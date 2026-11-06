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
      className="itinerary-summary p-2 border-0 bg-white rounded d-flex flex-column align-items-center justify-content-center"
      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
    >
      <img
        src={whatsappIcon?.src || whatsappIcon}
        alt="WhatsApp"
        style={{ width: "28px", marginBottom: "5px" }}
      />
      <span className="m-0 fw-bold text-success" style={{ fontSize: "11px", lineHeight: 1.2 }}>
        {t ? t("TranslateBtn.WhatsApp") : "Send Itinerary"}
      </span>
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


// facebook share btn
export const FacebookShareBtn = ({ tour }) => {
  const locale = useLocale();
  const t = useTranslations();

  const handleFacebookShare = () => {
    if (!tour) return;

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const tourSlug = tour.slug || "";
    const currentUrl = `${origin}/${locale}/tour-package/${tourSlug}`;

    // Meta sharer dialog
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    
    window.open(
      shareUrl,
      "facebook-share-dialog",
      "width=626,height=436,location=no,toolbar=no,menubar=no"
    );
  };

  return (
    <button
      type="button"
      onClick={handleFacebookShare}
      className="border-0 p-2 bg-white d-flex flex-column align-items-center justify-content-between shadow-none"
      style={{
        cursor: "pointer",
        minWidth: "75px",
        // borderColor: "#e5e7eb",
        transition: "all 0.2s ease-in-out",
      }}
      title="Share on Facebook"
    >
      {/* Facebook SVG Logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#1877F2"
        style={{ width: "24px", height: "24px", marginBottom: "4px" }}
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
      <span
        className="fw-bold"
        style={{ fontSize: "11px", color: "#1877F2", lineHeight: 1.2 }}
      >
        {t ? t("TranslateBtn.Facebook") : "Send Itinerary"}
      </span>
    </button>
  );
};

// instagram share btn
export const InstagramShareBtn = ({ tour }) => {
  const locale = useLocale();
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const handleInstagramShare = async () => {
    if (!tour) return;

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const tourSlug = tour.slug || "";
    const currentUrl = `${origin}/${locale}/tour-package/${tourSlug}`;

    const tourTitle = cleanPlainText(tour.title || tour.name || "Tour Package", 70);
    const tourDuration = cleanPlainText(tour.duration || "", 30);
    const tourPrice = tour.offer_price
      ? `₹${Number(tour.offer_price).toLocaleString("en-IN")}`
      : tour.base_price
      ? `₹${Number(tour.base_price).toLocaleString("en-IN")}`
      : "";

    const message =
      `*${tourTitle}*\n` +
      (tourDuration ? `Duration: ${tourDuration}\n` : "") +
      (tourPrice ? `Starting From: ${tourPrice}\n\n` : "\n") +
      `Check full itinerary:\n${currentUrl}`;

    // 1. Mobile Share (Direct Instagram option in OS dialog)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: tourTitle,
          text: message,
          url: currentUrl,
        });
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
      }
    }

    // 2. Desktop Fallback: Copy to clipboard
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${message}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        alert("Unable to copy tour link.");
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleInstagramShare}
      className="border-0 p-2 bg-white d-flex flex-column align-items-center justify-content-between shadow-none"
      style={{
        cursor: "pointer",
        minWidth: "75px",
        // borderColor: "#e5e7eb",
        transition: "all 0.2s ease-in-out",
      }}
      title="Share to Instagram"
    >
      {/* Instagram Gradient SVG Logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style={{ width: "24px", height: "24px", marginBottom: "4px" }}
      >
        <defs>
          <radialGradient id="ig-grad" r="150%" cx="30%" cy="107%">
            <stop stopColor="#fdf497" offset="0%" />
            <stop stopColor="#fdf497" offset="5%" />
            <stop stopColor="#fd5949" offset="45%" />
            <stop stopColor="#d6249f" offset="60%" />
            <stop stopColor="#285AEB" offset="90%" />
          </radialGradient>
        </defs>
        <path
          fill="url(#ig-grad)"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        />
      </svg>
      <span
        className="fw-bold"
        style={{ fontSize: "11px", color: "#d6249f", lineHeight: 1.2 }}
      >
         {t ? t("TranslateBtn.insta") : "Send Itinerary"}
      </span>
    </button>
  );
};