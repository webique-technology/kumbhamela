// src/lib/pdfGenerator.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoImg from "../assets/images/logo-2.png";

// Helper: Loads image path/object into a base64 Data URL for jsPDF
const loadImageBase64 = (imageSource) => {
  return new Promise((resolve) => {
    if (!imageSource) return resolve(null);
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve(null);
    img.src = typeof imageSource === "object" ? imageSource.src : imageSource;
  });
};

// Helper: Strip HTML tags and entities
function stripHtml(html = "") {
  return String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Fixed: marked as async
export const generateTourBrochure = async (tour) => {
  if (!tour) return;

  // Load the logo before PDF generation begins
  const logoDataUrl = await loadImageBase64(logoImg);

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Primary Theme Colors (matches your sample)
  const BRAND_RED = [235, 59, 90];
  const BRAND_DARK = [30, 39, 46];
  const BRAND_MUTED = [100, 100, 100];
  const CARD_BG = [249, 250, 251];
  const CARD_BORDER = [225, 230, 235];
  const GREEN_COLOR = [46, 125, 50];
  const RED_COLOR = [211, 47, 47];

  let currentY = 14;

  // --- TOP RED ACCENT BAR ---
  doc.setFillColor(...BRAND_RED);
  doc.rect(margin, currentY, contentWidth, 1.2, "F");
  currentY += 6;

  // ==========================================
  // 1. HEADER SECTION
  // ==========================================
  let brandTextStartX = margin;

  // Render Brand Logo if available
  if (logoDataUrl) {
    const logoWidth = 11; // Width in mm
    const logoHeight = 11; // Height in mm
    doc.addImage(
      logoDataUrl,
      "PNG",
      margin,
      currentY - 1,
      logoWidth,
      logoHeight,
    );
    brandTextStartX = margin + logoWidth + 3; // Shift text right to sit beside the logo
  }

  // Left: Brand Name (aligned next to logo)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...BRAND_DARK);
  doc.text("MAHAKUMBH TOURS & TRAVELS", brandTextStartX, currentY + 3);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...BRAND_RED);
  doc.text(
    "TOURS, TRAVELS & PILGRIMAGE PACKAGES",
    brandTextStartX,
    currentY + 7.5,
  );

  // Right: Tour Itinerary Pill Badge
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(...BRAND_RED);
  doc.setLineWidth(0.3);
  doc.roundedRect(pageWidth - margin - 36, currentY - 2, 36, 7, 3, 3, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND_RED);
  doc.text("TOUR ITINERARY", pageWidth - margin - 18, currentY + 2.5, {
    align: "center",
  });

  // Right: Contact info under badge
  const headerRightX = pageWidth - margin;
  let contactY = currentY + 9;
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...BRAND_DARK);

  doc.text("Helpline: +91 75077 78088", headerRightX, contactY, {
    align: "right",
  });
  contactY += 3.5;
  doc.text("Email: mahakumbhtourstravels@gmail.com", headerRightX, contactY, {
    align: "right",
  });
  contactY += 3.5;
  doc.text(
    "Website: www.mahakumbhtourstravelsnashik.com",
    headerRightX,
    contactY,
    { align: "right" },
  );

  currentY = contactY + 3;

  // Divider
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 6;

  // ==========================================
  // 2. PACKAGE TITLE & SUMMARY CARD
  // ==========================================
  const startBoxY = currentY;

  // Card Outer Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...CARD_BORDER);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, startBoxY, contentWidth, 27, 2, 2, "FD");

  // Left Red Accent Vertical Line
  doc.setFillColor(...BRAND_RED);
  doc.rect(margin, startBoxY, 1.4, 27, "F");

  // Title & Subtitle inside Card
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...BRAND_DARK);
  const titleText = tour.title || tour.name || "Nashik Kumbh Mela Tour Package";
  doc.text(titleText, margin + 4, startBoxY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND_MUTED);
  doc.text(
    "Mahakumbh Tours  •  Destination: Nashik & Sacred Circuits",
    margin + 4,
    startBoxY + 10.5,
  );

  // Sub-grid: Duration | Destination | Starting Cost
  const subBoxY = startBoxY + 13.5;
  const colWidth = (contentWidth - 8) / 3;

  // Duration
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(...BRAND_MUTED);
  doc.text("DURATION", margin + 4, subBoxY + 3);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_DARK);
  doc.text(tour.duration || "Custom", margin + 4, subBoxY + 8);

  // Vertical line 1
  doc.setDrawColor(...CARD_BORDER);
  doc.line(
    margin + 4 + colWidth,
    subBoxY,
    margin + 4 + colWidth,
    subBoxY + 10.5,
  );

  // Destination
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(...BRAND_MUTED);
  doc.text("DESTINATION", margin + 6 + colWidth, subBoxY + 3);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_DARK);
  doc.text("Nashik / Kumbh", margin + 6 + colWidth, subBoxY + 8);

  // Vertical line 2
  doc.line(
    margin + 4 + colWidth * 2,
    subBoxY,
    margin + 4 + colWidth * 2,
    subBoxY + 10.5,
  );

  // Starting Cost
  const formattedPrice = "On Request";

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(...BRAND_MUTED);
  doc.text("STARTING COST", margin + 6 + colWidth * 2, subBoxY + 3);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_RED);
  doc.text(`${formattedPrice}`, margin + 6 + colWidth * 2, subBoxY + 8);

  currentY = startBoxY + 32;

  // ==========================================
  // 3. TOUR OVERVIEW
  // ==========================================
  const rawDesc = stripHtml(tour.description || tour.mainDesc || "");
  if (rawDesc) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...BRAND_DARK);
    doc.text("Tour Overview: ", margin, currentY);

    const prefixWidth = doc.getTextWidth("Tour Overview: ");
    const splitDesc = doc.splitTextToSize(rawDesc, contentWidth - prefixWidth);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(70, 70, 70);

    // First line next to label
    doc.text(splitDesc[0] || "", margin + prefixWidth, currentY);

    // Remaining lines below
    if (splitDesc.length > 1) {
      const restLines = splitDesc.slice(1, 4);
      doc.text(restLines, margin, currentY + 3.8);
      currentY += (restLines.length + 1) * 3.8 + 3;
    } else {
      currentY += 6;
    }
  }

  // ==========================================
  // 4. DAY-WISE ITINERARY
  // ==========================================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_DARK);
  doc.text("DAY-WISE ", margin, currentY);
  doc.setTextColor(...BRAND_RED);
  doc.text("ITINERARY", margin + doc.getTextWidth("DAY-WISE "), currentY);
  currentY += 3;

  const itineraries = Array.isArray(tour.itineraries) ? tour.itineraries : [];

  itineraries.forEach((day, index) => {
    const dayNumber = `DAY ${index + 1}`;
    const dayTitle = stripHtml(
      day.itinerary_title || day.journey_title || `Day ${index + 1}`,
    );
    const dayDesc = stripHtml(day.description || "");

    const splitDayDesc = doc.splitTextToSize(dayDesc, contentWidth - 8);
    const boxHeight = 11 + splitDayDesc.length * 3.4;

    // Check page overflow
    if (currentY + boxHeight > pageHeight - 16) {
      doc.addPage();
      currentY = 16;
    }

    // Box container
    doc.setFillColor(...CARD_BG);
    doc.setDrawColor(...CARD_BORDER);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, currentY, contentWidth, boxHeight, 1.5, 1.5, "FD");

    // Red left highlight
    doc.setFillColor(...BRAND_RED);
    doc.rect(margin, currentY, 1.2, boxHeight, "F");

    // DAY badge
    doc.setFillColor(...BRAND_RED);
    doc.roundedRect(margin + 3, currentY + 2.5, 12, 4.5, 1, 1, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(255, 255, 255);
    doc.text(dayNumber, margin + 9, currentY + 5.7, { align: "center" });

    // Day Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...BRAND_DARK);
    doc.text(dayTitle, margin + 18, currentY + 5.8);

    // Day Description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(80, 80, 80);
    doc.text(splitDayDesc, margin + 3, currentY + 10.5);

    currentY += boxHeight + 2.5;
  });

  // ==========================================
  // PAGE 2: INCLUSIONS, EXCLUSIONS & NOTES
  // ==========================================
  doc.addPage();
  currentY = 16;

  // Title: PACKAGE INCLUSIONS & EXCLUSIONS
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...BRAND_DARK);
  doc.text("PACKAGE ", margin, currentY);
  doc.setTextColor(...BRAND_RED);
  doc.text(
    "INCLUSIONS & EXCLUSIONS",
    margin + doc.getTextWidth("PACKAGE "),
    currentY,
  );
  currentY += 4;

  const halfWidth = (contentWidth - 4) / 2;
  const colHeight = 55;

  // --- INCLUSIONS BOX (Left) ---
  doc.setFillColor(246, 252, 247);
  doc.setDrawColor(210, 235, 215);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY, halfWidth, colHeight, 1.5, 1.5, "FD");

  // Inclusions Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...GREEN_COLOR);
  doc.text("PACKAGE INCLUSIONS", margin + 4, currentY + 5.5);
  doc.setDrawColor(210, 235, 215);
  doc.line(margin, currentY + 8, margin + halfWidth, currentY + 8);

  const inclusions =
    Array.isArray(tour.inclusions) && tour.inclusions.length > 0
      ? tour.inclusions
      : [
          "Hotel Accommodation in comfortable category",
          "Daily Breakfast and Dinner",
          "Private AC vehicle for all transfers & sightseeing",
          "Kumbh Mela sacred ghats & temple darshan assistance",
          "Driver allowances, tolls, and parking fees",
        ];

  let incY = currentY + 12;
  inclusions.slice(0, 7).forEach((inc) => {
    const text = typeof inc === "object" ? inc.label || inc.title : inc;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...GREEN_COLOR);
    doc.text("✓", margin + 4, incY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(50, 50, 50);
    const splitText = doc.splitTextToSize(String(text), halfWidth - 11);
    doc.text(splitText, margin + 8, incY);
    incY += splitText.length * 3.4 + 2.2;
  });

  // --- EXCLUSIONS BOX (Right) ---
  const rightColX = margin + halfWidth + 4;
  doc.setFillColor(254, 247, 247);
  doc.setDrawColor(245, 215, 215);
  doc.setLineWidth(0.3);
  doc.roundedRect(rightColX, currentY, halfWidth, colHeight, 1.5, 1.5, "FD");

  // Exclusions Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...RED_COLOR);
  doc.text("PACKAGE EXCLUSIONS", rightColX + 4, currentY + 5.5);
  doc.setDrawColor(245, 215, 215);
  doc.line(rightColX, currentY + 8, rightColX + halfWidth, currentY + 8);

  const exclusions =
    Array.isArray(tour.exclusions) && tour.exclusions.length > 0
      ? tour.exclusions
      : [
          "Train, flight, or interstate bus tickets",
          "VIP / Priority temple darshan pass charges",
          "Special puja, dakshina, and personal ritual charges",
          "Personal expenses like laundry, beverages & tips",
          "Travel & medical insurance",
        ];

  let excY = currentY + 12;
  exclusions.slice(0, 7).forEach((exc) => {
    const text = typeof exc === "object" ? exc.label || exc.title : exc;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...RED_COLOR);
    doc.text("✕", rightColX + 4, excY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(50, 50, 50);
    const splitText = doc.splitTextToSize(String(text), halfWidth - 11);
    doc.text(splitText, rightColX + 8, excY);
    excY += splitText.length * 3.4 + 2.2;
  });

  currentY += colHeight + 6;

  // ==========================================
  // IMPORTANT TRAVEL NOTES & GUIDELINES
  // ==========================================
  const notesHeight = 28;
  doc.setFillColor(255, 251, 240);
  doc.setDrawColor(254, 215, 170);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY, contentWidth, notesHeight, 1.5, 1.5, "FD");

  // Left Amber Line
  doc.setFillColor(245, 158, 11);
  doc.rect(margin, currentY, 1.2, notesHeight, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(180, 83, 9);
  doc.text("IMPORTANT TRAVEL NOTES & GUIDELINES", margin + 4, currentY + 5);

  doc.setFontSize(6.8);
  doc.setTextColor(70, 70, 70);

  let noteY = currentY + 9.5;
  const notes = [
    {
      bold: "• Valid ID Proof: ",
      text: "All travelers must carry an original government-issued photo ID (Aadhaar Card, Passport, or Voter ID) during travel and hotel check-in.",
    },
    {
      bold: "• Itinerary & Schedule: ",
      text: "Tour schedules and sightseeing order may vary depending on local weather conditions, traffic, or Kumbh Mela administration guidelines.",
    },
    {
      bold: "• Terms & Cancellations: ",
      text: "Package bookings, transport, and hotel reservations are subject to Mahakumbh Tours & Travels standard booking and cancellation policies.",
    },
  ];

  notes.forEach((note) => {
    doc.setFont("helvetica", "bold");
    doc.text(note.bold, margin + 4, noteY);
    const bWidth = doc.getTextWidth(note.bold);

    doc.setFont("helvetica", "normal");
    const wrapped = doc.splitTextToSize(note.text, contentWidth - 8 - bWidth);
    doc.text(wrapped, margin + 4 + bWidth, noteY);
    noteY += wrapped.length * 3.2 + 2;
  });

  currentY += notesHeight + 6;

  // ==========================================
  // FOOTER CTA BANNER (Dark Navy)
  // ==========================================
  const footerCtaHeight = 22;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(
    margin,
    currentY,
    contentWidth,
    footerCtaHeight,
    1.5,
    1.5,
    "F",
  );

  // Left: Call to action text
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("Plan Your Pilgrimage With ", margin + 5, currentY + 8);
  doc.setTextColor(...BRAND_RED);
  doc.text(
    "Mahakumbh Tours",
    margin + 5 + doc.getTextWidth("Plan Your Pilgrimage With "),
    currentY + 8,
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.8);
  doc.setTextColor(203, 213, 225);
  doc.text(
    "Reach out to our team for bookings, customized packages, and Kumbh guidance.",
    margin + 5,
    currentY + 13.5,
  );

  // Right: Quick Contact details
  const ctaRightX = pageWidth - margin - 5;
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("Call / Helpline: +91 75077 78088", ctaRightX, currentY + 6.5, {
    align: "right",
  });
  doc.setFont("helvetica", "normal");
  doc.setTextColor(203, 213, 225);
  doc.text(
    "Email: mahakumbhtourstravels@gmail.com",
    ctaRightX,
    currentY + 11.5,
    { align: "right" },
  );
  doc.text(
    "Website: www.mahakumbhtourstravelsnashik.com",
    ctaRightX,
    currentY + 16,
    { align: "right" },
  );

  // ==========================================
  // PAGE NUMBERS & FOOTER STAMP
  // ==========================================
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(150, 150, 150);

    // Left timestamp
    doc.text(
      "Mahakumbh Tours & Travels  •  Kumbh Mela 2027",
      margin,
      pageHeight - 6,
    );

    // Center page number
    doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 6, {
      align: "center",
    });

    // Right website
    doc.text(
      "mahakumbhtourstravelsnashik.com",
      pageWidth - margin,
      pageHeight - 6,
      {
        align: "right",
      },
    );
  }

  // Save the PDF
  const sanitizedSlug = (tour.slug || "tour-package").replace(
    /[^a-zA-Z0-9_-]/g,
    "",
  );
  doc.save(`${sanitizedSlug}-itinerary-brochure.pdf`);
};
