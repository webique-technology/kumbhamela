"use client";

import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { generateTourBrochure } from "@/lib/pdfGenerator";

export const DownloadBrochureBtn = ({ tour }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!tour) return;
    try {
      setLoading(true);
      // Small timeout allows UI state to update smoothly
      setTimeout(() => {
        generateTourBrochure(tour);
        setLoading(false);
      }, 150);
    } catch (err) {
      console.error("Failed to generate brochure PDF:", err);
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2 w-auto py-2 text-decoration-none fw-semibold rounded shadow-sm mt-2"
      style={{
        fontSize: "13.5px",
        transition: "all 0.2s ease",
        borderColor: "#EB3B5A",
        color: "#EB3B5A",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#EB3B5A";
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "#EB3B5A";
      }}
    >
      {loading ? (
        <>
          <Loader2 size={16} className="spinner-border spinner-border-sm" />
          <span>Generating PDF...</span>
        </>
      ) : (
        <>
          <Download size={16} />
          <span>Download Itinerary Brochure</span>
        </>
      )}
    </button>
  );
};
