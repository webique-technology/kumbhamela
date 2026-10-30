// src/lib/pdfGenerator.js
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logoImg from "../assets/images/logo-2.png";

function stripHtml(html = "") {
  return String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Helper: Pre-converts image to Base64 so html2canvas renders it instantly without CORS delay
const loadImageBase64 = (imageSource) => {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !imageSource) return resolve(null);
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch (e) {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src =
      typeof imageSource === "object" ? imageSource?.src || "" : imageSource;
  });
};

export const generateTourBrochure = async (tour, locale = "en") => {
  if (typeof window === "undefined" || !tour) return;

  // 1. Create a measurement/render container
  const PAGE_WIDTH_PX = 794; // Standard A4 width at 96 DPI
  const PAGE_HEIGHT_PX = 1123; // Standard A4 height at 96 DPI
  const USABLE_PAGE_HEIGHT = 1040; // Leaves room for top/bottom margins & page number

  const logoDataUrl = await loadImageBase64(logoImg);

  const root = document.createElement("div");
  root.id = "pdf-measurement-root";
  root.style.position = "fixed";
  root.style.left = "-9999px";
  root.style.top = "0";
  root.style.width = `${PAGE_WIDTH_PX}px`;
  root.style.background = "#ffffff";
  root.style.color = "#1E272E";
  root.style.fontFamily =
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  root.style.boxSizing = "border-box";
  document.body.appendChild(root);

  try {
    // ----------------------------------------------------
    // HTML BLOCKS DEFINITIONS
    // ----------------------------------------------------

    const logoHtml = logoDataUrl
      ? `<img src="${logoDataUrl}" alt="Logo" style="width: 44px; height: 44px; object-fit: contain; border-radius: 50%;" />`
      : "";

    // Header (Page 1 Only)
    const headerHtml = `
      <div style="height: 3.5px; background: #EB3B5A; margin-bottom: 10px; border-radius: 2px;"></div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px; border-bottom: 1px solid #E2E8F0; margin-bottom: 10px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          ${logoHtml}
          <div>
            <h1 style="margin: 0; font-size: 18px; font-weight: 800; color: #1E272E; letter-spacing: -0.3px;">MAHAKUMBH TOURS & TRAVELS</h1>
            <div style="font-size: 9.5px; font-weight: 700; color: #EB3B5A; margin-top: 1px;">TOURS, TRAVELS & PILGRIMAGE PACKAGES</div>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="display: inline-block; background: #FEF2F2; color: #EB3B5A; border: 1px solid #EB3B5A; padding: 2px 9px; border-radius: 20px; font-size: 9px; font-weight: 700; margin-bottom: 3px;">
            TOUR ITINERARY
          </div>
          <div style="font-size: 8.5px; color: #4A5568; line-height: 1.3;">Helpline: +91 75077 78088</div>
          <div style="font-size: 8.5px; color: #4A5568; line-height: 1.3;">Email: mahakumbhtourstravels@gmail.com</div>
          <div style="font-size: 8.5px; color: #4A5568; line-height: 1.3;">Website: www.mahakumbhtourstravelsnashik.com</div>
        </div>
      </div>
    `;

    // Summary Card (Page 1 Only)
    const rawDestination =
      tour.destination ||
      tour.location ||
      tour.city ||
      (Array.isArray(tour.routes) && tour.routes.length > 0
        ? tour.routes.join(", ")
        : "") ||
      "Nashik / Kumbh";

    const summaryHtml = `
      <div style="border: 1px solid #E2E8F0; border-left: 4px solid #EB3B5A; border-radius: 6px; padding: 10px 12px; margin-bottom: 12px; background: #FFFFFF;">
        <h2 style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #1E272E;">${stripHtml(tour.title || tour.name || "")}</h2>
        <div style="font-size: 10px; color: #718096; margin-bottom: 8px;">Mahakumbh Tours • Destination: Nashik & Sacred Circuits</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; border-top: 1px solid #EDF2F7; padding-top: 6px;">
          <div>
            <div style="font-size: 8.5px; font-weight: 700; color: #718096;">DURATION</div>
            <div style="font-size: 11px; font-weight: 700; color: #1E272E;">${stripHtml(tour.duration || "Custom")}</div>
          </div>
          <div>
            <div style="font-size: 8.5px; font-weight: 700; color: #718096;">DESTINATION</div>
            <div style="font-size: 11px; font-weight: 700; color: #1E272E;">${stripHtml(rawDestination)}</div>
          </div>
          <div>
            <div style="font-size: 8.5px; font-weight: 700; color: #718096;">STARTING COST</div>
            <div style="font-size: 11px; font-weight: 700; color: #EB3B5A;">On Request</div>
          </div>
        </div>
      </div>
    `;

    // Tour Overview (Page 1 Only)
    const overviewHtml =
      tour.description || tour.mainDesc
        ? `
      <div style="margin-bottom: 12px;">
        <span style="font-size: 11px; font-weight: bold; color: #1E272E;">Tour Overview: </span>
        <span style="font-size: 10.5px; color: #4A5568; line-height: 1.45;">${stripHtml(tour.description || tour.mainDesc)}</span>
      </div>
    `
        : "";

    // Day-wise Section Header
    const itineraryTitleHtml = `
      <div style="font-size: 11.5px; font-weight: 800; color: #1E272E; margin-bottom: 8px;">
        DAY-WISE <span style="color: #EB3B5A;">ITINERARY</span>
      </div>
    `;

    // Function to create an individual day card
    const createDayCardHtml = (day, index) => `
      <div style="margin-bottom: 10px; border: 1px solid #E1E6EB; border-left: 4px solid #EB3B5A; border-radius: 6px; padding: 8px 12px; background: #F9FAFB;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="background: #EB3B5A; color: #fff; font-size: 9.5px; font-weight: bold; padding: 1px 6px; border-radius: 3px;">DAY ${index + 1}</span>
          <span style="font-size: 11.5px; font-weight: bold; color: #1E272E;">${stripHtml(day.itinerary_title || day.journey_title || `Day ${index + 1}`)}</span>
        </div>
        <p style="margin: 0; font-size: 10px; line-height: 1.45; color: #4A5568;">
          ${stripHtml(day.description || "")}
        </p>
      </div>
    `;

    // Inclusions & Exclusions block
    const defaultInclusions = [
      "Hotel Accommodation in comfortable category",
      "Daily Breakfast and Dinner",
      "Private AC vehicle for all transfers & sightseeing",
      "Kumbh Mela sacred ghats & temple darshan assistance",
      "Driver allowances, tolls, and parking fees",
    ];
    const inclusions =
      Array.isArray(tour.inclusions) && tour.inclusions.length > 0
        ? tour.inclusions
        : defaultInclusions;

    const defaultExclusions = [
      "Train, flight, or interstate bus tickets",
      "VIP / Priority temple darshan pass charges",
      "Special puja, dakshina, and personal ritual charges",
      "Personal expenses like laundry, beverages & tips",
      "Travel & medical insurance",
    ];
    const exclusions =
      Array.isArray(tour.exclusions) && tour.exclusions.length > 0
        ? tour.exclusions
        : defaultExclusions;

    const inclusionsHtml = inclusions
      .slice(0, 6)
      .map(
        (inc) =>
          `<div style="font-size: 10px; margin-bottom: 4px; color: #2D3748;"><span style="color: #2E7D32; font-weight: bold; margin-right: 6px;">✓</span>${stripHtml(typeof inc === "object" ? inc.label || inc.title : inc)}</div>`,
      )
      .join("");

    const exclusionsHtml = exclusions
      .slice(0, 6)
      .map(
        (exc) =>
          `<div style="font-size: 10px; margin-bottom: 4px; color: #2D3748;"><span style="color: #D32F2F; font-weight: bold; margin-right: 6px;">✕</span>${stripHtml(typeof exc === "object" ? exc.label || exc.title : exc)}</div>`,
      )
      .join("");

    const inclusionsExclusionsBlock = `
      <div style="margin-top: 10px; margin-bottom: 12px;">
        <div style="font-size: 12px; font-weight: 800; color: #1E272E; margin-bottom: 6px;">
          PACKAGE <span style="color: #EB3B5A;">INCLUSIONS & EXCLUSIONS</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div style="border: 1px solid #D2EBD7; background: #F6FCF7; border-radius: 6px; padding: 10px;">
            <div style="font-size: 10.5px; font-weight: bold; color: #2E7D32; margin-bottom: 6px; border-bottom: 1px solid #D2EBD7; padding-bottom: 4px;">
              PACKAGE INCLUSIONS
            </div>
            ${inclusionsHtml}
          </div>
          <div style="border: 1px solid #F5D7D7; background: #FEF7F7; border-radius: 6px; padding: 10px;">
            <div style="font-size: 10.5px; font-weight: bold; color: #D32F2F; margin-bottom: 6px; border-bottom: 1px solid #F5D7D7; padding-bottom: 4px;">
              PACKAGE EXCLUSIONS
            </div>
            ${exclusionsHtml}
          </div>
        </div>
      </div>
    `;

    // Notes & Final Helpline CTA Box (Only on the final page)
    const finalFooterCtaHtml = `
      <div style="border: 1px solid #FED7AA; border-left: 4px solid #F59E0B; background: #FFFBF0; border-radius: 6px; padding: 10px 12px; margin-bottom: 14px;">
        <div style="font-size: 10.5px; font-weight: bold; color: #B45309; margin-bottom: 4px;">IMPORTANT TRAVEL NOTES & GUIDELINES</div>
        <div style="font-size: 9px; color: #4A5568; line-height: 1.45;">
          <div><b>• Valid ID Proof:</b> All travelers must carry an original government-issued photo ID during travel and hotel check-in.</div>
          <div><b>• Itinerary & Schedule:</b> Tour schedules may vary depending on local weather conditions, traffic, or Kumbh Mela administration guidelines.</div>
          <div><b>• Terms & Cancellations:</b> Bookings are subject to Mahakumbh Tours & Travels standard cancellation policies.</div>
        </div>
      </div>

      <div style="background: #0F172A; border-radius: 6px; padding: 12px 16px; color: #FFFFFF; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-size: 12.5px; font-weight: bold;">Plan Your Pilgrimage With <span style="color: #EB3B5A;">Mahakumbh Tours</span></div>
          <div style="font-size: 9.5px; color: #CBD5E1; margin-top: 2px;">Reach out to our team for bookings, customized packages, and Kumbh guidance.</div>
        </div>
        <div style="text-align: right; font-size: 9.5px;">
          <div style="font-weight: bold;">Helpline: +91 75077 78088</div>
          <div style="color: #CBD5E1;">mahakumbhtourstravels@gmail.com</div>
        </div>
      </div>
    `;

    // ----------------------------------------------------
    // DYNAMIC CONTENT HEIGHT-AWARE PACKING
    // ----------------------------------------------------
    const measureBox = document.createElement("div");
    measureBox.style.padding = "36px 40px 22px 40px";
    measureBox.style.boxSizing = "border-box";
    measureBox.style.width = `${PAGE_WIDTH_PX}px`;
    root.appendChild(measureBox);

    const pages = [];
    let currentPageHtml = "";
    let currentHeight = 0;

    // Helper: test-measures height before committing
    const measureHtml = (html) => {
      measureBox.innerHTML = html;
      return measureBox.offsetHeight;
    };

    // 1. Start Page 1 with Top Elements
    currentPageHtml = `
      ${headerHtml}
      ${summaryHtml}
      ${overviewHtml}
      ${itineraryTitleHtml}
    `;
    currentHeight = measureHtml(currentPageHtml);

    // 2. Add each Day Card, creating a new page only when height runs out
    const itineraries = Array.isArray(tour.itineraries) ? tour.itineraries : [];
    itineraries.forEach((day, idx) => {
      const cardHtml = createDayCardHtml(day, idx);
      const cardHeight = measureHtml(cardHtml);

      if (currentHeight + cardHeight > USABLE_PAGE_HEIGHT) {
        // Current page is full, push it and start a clean new page
        pages.push(currentPageHtml);

        // Continuation page starts with a clean top red line
        currentPageHtml = `
          <div style="height: 3px; background: #EB3B5A; margin-bottom: 14px; border-radius: 2px;"></div>
          <div style="font-size: 11.5px; font-weight: 800; color: #1E272E; margin-bottom: 10px;">
            DAY-WISE <span style="color: #EB3B5A;">ITINERARY (CONTINUED)</span>
          </div>
          ${cardHtml}
        `;
        currentHeight = measureHtml(currentPageHtml);
      } else {
        currentPageHtml += cardHtml;
        currentHeight += cardHeight;
      }
    });

    // 3. Try packing Inclusions & Footer onto the current page if it fits
    const finalBlockHtml = `
      ${inclusionsExclusionsBlock}
      <div style="margin-top: auto;">
        ${finalFooterCtaHtml}
      </div>
    `;
    const finalBlockHeight = measureHtml(finalBlockHtml);

    if (currentHeight + finalBlockHeight <= USABLE_PAGE_HEIGHT) {
      // It fits on the same page! No half-empty sheet.
      currentPageHtml += finalBlockHtml;
      pages.push(currentPageHtml);
    } else {
      // It doesn't fit, close the itinerary page and start the dedicated final page
      pages.push(currentPageHtml);

      const standaloneFinalHtml = `
        <div style="height: 3px; background: #EB3B5A; margin-bottom: 14px; border-radius: 2px;"></div>
        ${inclusionsExclusionsBlock}
        <div style="margin-top: auto;">
          ${finalFooterCtaHtml}
        </div>
      `;
      pages.push(standaloneFinalHtml);
    }

    // Clean up temporary measurement element
    root.removeChild(measureBox);

    // ----------------------------------------------------
    // BUILD THE FINAL PAGINATED DOM
    // ----------------------------------------------------
    const totalPages = pages.length;
    const pageNodes = [];

    pages.forEach((pageHtml, index) => {
      const pageNum = index + 1;
      const pageEl = document.createElement("div");
      pageEl.style.width = `${PAGE_WIDTH_PX}px`;
      pageEl.style.height = `${PAGE_HEIGHT_PX}px`;
      pageEl.style.padding = "36px 40px 22px 40px";
      pageEl.style.boxSizing = "border-box";
      pageEl.style.background = "#ffffff";
      pageEl.style.color = "#1E272E";
      pageEl.style.position = "relative";
      pageEl.style.display = "flex";
      pageEl.style.flexDirection = "column";
      pageEl.style.justifyContent = "space-between";
      pageEl.style.overflow = "hidden";

      pageEl.innerHTML = `
        <div style="flex: 1; display: flex; flex-direction: column;">
          ${pageHtml}
        </div>
        <div style="border-top: 1px solid #E2E8F0; padding-top: 6px; margin-top: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 9.5px; color: #718096;">
          <span>Mahakumbh Tours & Travels • Kumbh Mela 2027</span>
          <span>Page ${pageNum} of ${totalPages}</span>
          <span>mahakumbhtourstravelsnashik.com</span>
        </div>
      `;

      root.appendChild(pageEl);
      pageNodes.push(pageEl);
    });

    // ----------------------------------------------------
    // FAST HIGH-RES PDF GENERATION (Optimized)
    // ----------------------------------------------------
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pageNodes.length; i++) {
      const pageEl = pageNodes[i];

      const canvas = await html2canvas(pageEl, {
        scale: 1.5, // 1.5x resolution provides crisp text while cutting rasterization time by >50%
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.9);

      if (i > 0) pdf.addPage();
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        "FAST",
      );
    }

    const sanitizedSlug = (tour.slug || "tour-package").replace(
      /[^a-zA-Z0-9_-]/g,
      "",
    );
    pdf.save(`${sanitizedSlug}-${locale}-itinerary-brochure.pdf`);
  } finally {
    if (document.body.contains(root)) {
      document.body.removeChild(root);
    }
  }
};
