import { NextResponse } from "next/server";
import stringSimilarity from "string-similarity";
import enLocale from "../../../messages/en.json";
import { slugify } from "@/lib/utils";

const LARAVEL_API_URL = process.env.NEXT_PUBLIC_API_URL_CHATBOT;

console.log("backend api url:", LARAVEL_API_URL);

const geminiToolsConfiguration = [
  {
    functionDeclarations: [
      {
        name: "fetchDynamicInventory",
        description:
          "Queries the public production database for real-time listings concerning tours (packages), hotels, rental cars (vehicles), or blog posts updates.",
        parameters: {
          type: "OBJECT",
          properties: {
            category: {
              type: "STRING",
              enum: ["tours", "hotels", "cars", "blogs"],
              description:
                "The dynamic inventory category to pull. Pass 'cars' for rental vehicles, 'tours' for tour package lists.",
            },
          },
          required: ["category"],
        },
      },
    ],
  },
];

const KNOWLEDGE_BASE = [
  {
    inputs: [
      "what is nashik mahakumbh 2027 - 28",
      "mahakumbh 2027 - 28 basics",
      "simhastha kumbh mela",
      "what is kumbha",
      "simhastha rashi",
      "jupiter enters leo",
    ],
    reply: `<b>🕉️ Mahakumbh 2027 - 28 Basics & Legacy:</b><br />
        • Nashik Mahakumbh (Simhastha Kumbh) is one of the world's largest Hindu spiritual gatherings, held every 12 years on the banks of the Godavari River in Nashik and Trimbakeshwar. Millions of devotees visit for holy bathing, prayers, and spiritual activities.<br />
        • Simhastha Kumbh occurs when Jupiter enters Leo (Simha Rashi), making Nashik the host city for the sacred event.`,
  },
  {
    inputs: [
      "when will nashik mahakumbh 2027 - 28 take place",
      "kumbh mela dates",
      "amrit snan dates 2027 - 28",
      "shahi snan date",
      "auspicious bathing days",
      "mela calendar",
    ],
    reply: `<b>📅 Official Mahakumbh 2027 - 28 Timings & Auspicious Snan Dates:</b><br />
        • The main Kumbh period is expected during 2027 - 28, while the broader Simhastha cycle officially runs from October 2026 to July 2028.<br />
        • The major Amrit Snan dates are:<br />
          - 2 August 2027 - 28<br />
          - 31 August 2027 - 28<br />
          - 11–12 September 2027 - 28<br />
        • These are considered the most auspicious bathing days.`,
  },
];

export async function POST(request) {
  try {
    const { message, history, locale } = await request.json();

    // --- DYNAMIC HOST ORIGIN RESOLUTION ---
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const originHostUrl = `${protocol}://${host}`;

    // Fix path routing resolution based on active locale
    const currentLang = locale && locale !== "en" ? locale : "en";
    const languagePrefix = currentLang === "en" ? "" : `/${currentLang}`;

    if (!message)
      return NextResponse.json({ reply: "Please type something..." });

    const userQuery = message.trim().toLowerCase();
    let bestMatch = null;
    let highestScore = 0;

    // --- 1. LOCAL SEARCH ACROSS SACRED DESTINATIONS (en.json) ---
    if (enLocale.SacredDestinations) {
      for (let i = 1; i <= 10; i++) {
        const destName =
          enLocale.SacredDestinations[`dest${i}_name`]?.toLowerCase();
        if (destName && userQuery.includes(destName)) {
          const historyText =
            enLocale.SacredDestinations[`dest${i}_history`] || "";
          const routeText = enLocale.SacredDestinations[`dest${i}_route`] || "";
          const transportText =
            enLocale.SacredDestinations[`dest${i}_transport`] || "";
          return NextResponse.json({
            reply: `<b>🛕 ${enLocale.SacredDestinations[`dest${i}_name`]} Details:</b><br /><br />${historyText}<br /><br /><b>🚗 Route from Nashik:</b><br />${routeText}<br /><br /><b>🚌 Transport Options:</b><br />${transportText}`,
          });
        }
      }
    }

    // --- 2. LOCAL SEARCH ACROSS LOGISTICS TABS (en.json) ---
    if (enLocale.PlanTab) {
      for (let t = 0; t <= 3; t++) {
        for (let item = 1; item <= 4; item++) {
          const itemTitle =
            enLocale.PlanTab[`tab${t}_item${item}_title`]?.toLowerCase();
          if (itemTitle && userQuery.includes(itemTitle)) {
            const itemDesc = enLocale.PlanTab[`tab${t}_item${item}_desc`] || "";
            return NextResponse.json({
              reply: `<b>ℹ️ ${enLocale.PlanTab[`tab${t}_item${item}_title`]}:</b><br />${itemDesc}`,
            });
          }
        }
      }
    }

    // --- 3. STANDARD MICRO-CACHE KNOWLEDGE BASE LOOP ---
    for (const item of KNOWLEDGE_BASE) {
      if (!item.inputs) continue;
      for (const sampleInput of item.inputs) {
        if (
          userQuery.includes(sampleInput) ||
          sampleInput.includes(userQuery)
        ) {
          highestScore = 1.0;
          bestMatch = item;
          break;
        }
        const score = stringSimilarity.compareTwoStrings(
          userQuery,
          sampleInput,
        );
        if (score > highestScore) {
          highestScore = score;
          bestMatch = item;
        }
      }
      if (highestScore === 1.0) break;
    }

    if (highestScore > 0.45 && bestMatch) {
      return NextResponse.json({ reply: bestMatch.reply });
    }

    // --- STATIC CONTEXT STRINGS EXTRACTED FROM EN.JSON ---
    const brandAbout = enLocale.AboutSec?.mainDescription || "";
    const fleetQuality = `• Drivers: ${enLocale.RentalCar?.Bento?.card1?.text || "Professional guides"}<br />• Booking: ${enLocale.RentalCar?.Bento?.card2?.text || "Instant booking"}`;
    const pricingMetric = enLocale.ServicesTab?.perKm || "per km";

    // REMOVED THE LEADING SLASHS (/) BEFORE [BASE_URL] TO RESOLVE DUPLICATION BUG
    const systemInstructionText =
      "You are the expert pilgrimage AI concierge for Mahakumbh Tours & Travels Nashik. " +
      "You must answer user questions accurately by referencing the provided website context and real-time backend tool data.\n\n" +
      `[About Company]: ${brandAbout}\n\n` +
      `[Pricing Framework]: Vehicles operate strictly on a '${pricingMetric}' basis. Assurances: ${fleetQuality}\n\n` +
      "CRITICAL BEHAVIOR RULES:\n" +
      "- Start every single turn response with 'Jai Shree Ram! 🙏'.\n" +
      "- When users ask for tours, packages, vehicles, rental choices, cars list, fleet details, hotels, or blogs, you MUST execute the fetchDynamicInventory tool execution.\n" +
      "- DATA PRESENTATION RULE: When processing response data for category 'cars', list all available vehicles clearly detailing their Name, Total Seats, Base Price (per km rate), status, and structural key features.\n" +
      "- ABSOLUTE TRUTH CONSTRAINT: You are forbidden from writing mock categories, placeholders, or imaginary vehicles. Only present elements returned from the active function execution database payload.\n" +
      "- SECURE MEDIA REDACTION: Never print, stream, or output raw image properties, filenames, directory strings, or URLs ending in '.jpg' or '.png'. Hide fields like 'car_image_url', 'image_url', 'images', or 'car_image' completely.\n" +
      "- Format output clean lists using structural HTML breaks (<br />, <b></b>). Do not output markdown code blocks or raw JSON symbols.\n" +
      "STRICT ACTION BUTTON RULES (TRIGGER ONLY ON BOOKING INTENT):\n" +
      "- EVERY SINGLE LINK HOOK OR BUTTON HREF GENERATED MUST STRICTLY AND EXACTLY START WITH THE TOKENS: [BASE_URL]\n" +
      "- DO NOT prepend any forward slash (/) before [BASE_URL].\n" +
      "- NEVER show, append, or output any action link or button if the user is asking general historical, religious, or informational questions (e.g., 'tell me about nashik kumbha' or 'sacred destinations in nashik city').\n" +
      "- ONLY output a button if the user explicitly states they want to book, asks how to rent/book, or says 'I like this package/car/hotel' and wants to proceed.\n" +
      "- FOR HOTELS & CARS: Render a link directing them to the custom funnel format: <br /><br /><a href='/book-now?category=cars' class='chat-btn book-now-btn'>Book Now</a>\n" +
      `- FOR HOTELS: When a user wants to book a specific hotel or show the list to check, look up its metadata and generate an anchor tag with explicit custom analytics parameters targeting the modal state. Format: <br /><br /><a href='/[BASE_URL]/hotel?action=book&type=hotel&id=[hotel-id-or-slug]&name=[encoded-hotel-name]' class='small-12 d-block fw-bold mb-2'>Book [Hotel Name] Now &#8594;</a>\n` +
      `- FOR CARS: When a user wants to book a vehicle or show the list to check, match it against your current asset inventory and append the appropriate action queries. Format: <br /><br /><a href='/[BASE_URL]/rental-car?action=book&type=car&id=[car-id-or-slug]&name=[encoded-car-name]' class='small-12 d-block fw-bold mb-2'>Book [Vehicle Name] Now &#8594;</a>\n` +
      "- FOR A TOUR PACKAGE DETAIL: If the user likes or asks about a specific package (e.g., 'Sade Tin (3.5) Shakti Peeth Tour Package'), you MUST create a dynamic slug. Convert the exact title to lowercase, replace spaces, dots, and parentheses with single hyphens, clean double hyphens, and render it exactly like this at the end of the text:\n" +
      `  <br /><br /><i><b class='text-danger mt-2'>Note: please visit our package planner</b></i><br /><br /><a href='/[BASE_URL]/tour-package/[slugified-title]' class='mb-3 d-block fw-bold'>View Package Details &#8594;</a>\n` +
      `- Real-World Validation Example: If the active language is 'mr' and the user asks about 'Nashik Kumbh Darshan Tour', the button link must be exactly outputted as: /mr/tour-package/nashik-kumbh-darshan-tour\n` +
      "- NO BUTTON FALLBACK: Never show a button or link if the user is asking general informational, historical, or religious questions (e.g., 'tell me about nashik kumbha').\n" +
      `- Example slug transformation: 'Sade Tin (3.5) Shakti Peeth Tour Package' becomes 'sade-tin-35-shakti-peeth-tour-package', making the link '/[BASE_URL]/tour-package/sade-tin-35-shakti-peeth-tour-package'.\n` +
      "- Ensure you never wrap these dynamic custom HTML links inside markdown blocks or raw code blocks.";

    const geminiContents = [];

    if (history && history.length > 0) {
      history.forEach((msg) => {
        if (msg.id === "init" || !msg.text) return;
        geminiContents.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: String(msg.text) }],
        });
      });
    }

    geminiContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const TARGET_GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`;

    // --- FIRST PASS: Check for tool invocation ---
    let geminiResponse = await fetch(TARGET_GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: geminiContents,
        systemInstruction: { parts: [{ text: systemInstructionText }] },
        tools: geminiToolsConfiguration,
        generationConfig: { temperature: 0.1 },
      }),
    });

    let geminiData = await geminiResponse.json();

    if (geminiData.error) {
      console.error(
        "Gemini API Engine rejected initial parameters:",
        geminiData.error,
      );
      throw new Error(geminiData.error.message);
    }

    let firstCandidate = geminiData.candidates?.[0]?.content;
    let functionCallNode = firstCandidate?.parts?.find(
      (part) => part.functionCall,
    );

    // --- 4. DYNAMIC TOOL INTERCEPTION ROUTER ---
    if (functionCallNode) {
      const { name: toolName, args: toolArgs } = functionCallNode.functionCall;

      if (toolName === "fetchDynamicInventory") {
        const endpointMap = {
          tours: "/tours",
          hotels: "/hotels",
          cars: "/vehicles",
          blogs: "/blogs",
        };

        const activeCategory = toolArgs?.category || "tours";
        const activeSegment = endpointMap[activeCategory] || "/tours";

        let fetchedDatabasePayload = [];
        try {
          const laravelFetch = await fetch(
            `${LARAVEL_API_URL}${activeSegment}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            },
          );

          if (laravelFetch.ok) {
            const contentType = laravelFetch.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              const resData = await laravelFetch.json();

              if (resData.data && Array.isArray(resData.data.data)) {
                fetchedDatabasePayload = resData.data.data;
              } else if (resData.data && Array.isArray(resData.data)) {
                fetchedDatabasePayload = resData.data;
              } else if (Array.isArray(resData.data)) {
                fetchedDatabasePayload = resData.data;
              } else if (Array.isArray(resData)) {
                fetchedDatabasePayload = resData;
              } else {
                fetchedDatabasePayload = resData || [];
              }
            }
          }
        } catch (fetchErr) {
          console.error(
            "Public Laravel Connection Interface Dropped:",
            fetchErr,
          );
        }

        geminiContents.push({
          role: "model",
          parts: [
            {
              text: `Executing backend query lookup for database category: ${activeCategory}.`,
            },
          ],
        });

        geminiContents.push({
          role: "user",
          parts: [
            {
              text: `[SYSTEM DATABASE LOG RESPONSE]: Here is the raw real-time live availability data matching category "${activeCategory}". Synthesize this into your final answer: ${JSON.stringify(fetchedDatabasePayload)}`,
            },
          ],
        });

        // SECOND PASS: Final response assembly
        geminiResponse = await fetch(TARGET_GEMINI_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: geminiContents,
            systemInstruction: { parts: [{ text: systemInstructionText }] },
            generationConfig: { temperature: 0.1 },
          }),
        });

        geminiData = await geminiResponse.json();

        if (geminiData.error) {
          console.error(
            "Gemini API Secondary Pass Failed. Details:",
            JSON.stringify(geminiData.error),
          );
          return NextResponse.json({
            reply:
              "Jai Shree Ram! 🙏 We are having trouble syncing our live inventory database right now. Please try again in a few moments.",
          });
        }

        firstCandidate = geminiData.candidates?.[0]?.content;
      }
    }

    const rawOutputText =
      firstCandidate?.parts?.[0]?.text ||
      "System temporarily busy, please re-submit request.";

    const formattedReply = rawOutputText
      .replace(/\n{2,}/g, "<br /><br />")
      .replace(/\n/g, "<br />")
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/\*(.*?)\*/g, "<i>$1</i>")
      .replace(/<br \/>\s*<br \/>/g, "<br /><br />");

    const trueUrlTarget = `${originHostUrl}${languagePrefix}`;
    console.log("trueUrlTarget", trueUrlTarget);

    // Securely swap tokens globally without risking string mutation or layout breaks
    const finalCleanReply = formattedReply.replaceAll(
      "[BASE_URL]",
      trueUrlTarget,
    );

    return NextResponse.json({ reply: finalCleanReply });
  } catch (error) {
    console.error("Gemini Critical Architecture Crash Log:", error);
    return NextResponse.json(
      {
        reply:
          "Jai Shree Ram! 🙏 Server connection latency encountered. Please feel free to request guidance directly via our official WhatsApp connection below.",
      },
      { status: 500 },
    );
  }
}
