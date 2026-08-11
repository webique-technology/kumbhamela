"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Mic, Square } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { BookingForm } from "../ui/bookingFormHandler";
import "../../styles/chatbot.scss";

import chatWelcome from "../../assets/images/chatbot-img.svg";

export const KumbhChatbot = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Dynamically extract the current language locale from the URL path (e.g., /hi/hotels -> hi, /mr -> mr, / -> en)
  const currentLocale = pathname.split("/")[1] || "en";

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "init",
      sender: "bot",
      text: "Jai Shree Ram! 🙏 Welcome to Mahakumbh Travels. Ask me about our packages, holy places, or transit. Type below or tap Mic to speak:",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showWelcomeImg, setShowWelcomeImg] = useState(true);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Modal State Hooks for Chatbot Bookings
  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: "hotel", // 'hotel' or 'car'
    selectedItem: "",
    hotelId: null,
    carId: null,
  });

  const quickTags = [
    { label: "📅 Snan Dates 2027 - 28", query: "shahi snan dates 2027 - 28" },
    { label: "🛕 Holy Places", query: "sacred locations in nashik" },
    { label: "🏆 Tour Packages", query: "tour packages" },
    { label: "🚕 Vehicle Rental", query: "car rental options and fleet rates" },
    {
      label: "✈️ Reach Nashik",
      query: "how to reach nashik by train air road",
    },
  ];

  // Watch URL parameters for external or fallback booking triggers
  useEffect(() => {
    const action = searchParams.get("action");
    const type = searchParams.get("type");
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    if (action === "book" && type && id) {
      setModalConfig({
        show: true,
        type: type,
        selectedItem: decodeURIComponent(name || ""),
        hotelId: type === "hotel" ? id : null,
        carId: type === "car" ? id : null,
      });

      const params = new URLSearchParams(searchParams.toString());
      params.delete("action");
      params.delete("type");
      params.delete("id");
      params.delete("name");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  const handleCloseModal = () => {
    setModalConfig((prev) => ({ ...prev, show: false }));
  };

  // Intercept Chat Link Clicks to completely eliminate page refreshes
  const handleChatBodyClick = (e) => {
    const targetLink = e.target.closest("a");
    if (!targetLink) return;

    let hrefUrl = targetLink.getAttribute("href");
    if (!hrefUrl) return;

    // --- CASE 1: Inline booking forms or modal parameters ---
    if (hrefUrl.includes("action=book") || hrefUrl.includes("category=cars")) {
      e.preventDefault();

      try {
        const urlObj = new URL(hrefUrl, window.location.origin);
        const action = urlObj.searchParams.get("action") || "book";
        const type =
          urlObj.searchParams.get("type") ||
          (urlObj.searchParams.get("category") === "cars" ? "car" : "hotel");
        const id = urlObj.searchParams.get("id") || "fleet";
        const name = urlObj.searchParams.get("name") || "";

        setModalConfig({
          show: true,
          type: type,
          selectedItem: decodeURIComponent(name),
          hotelId: type === "hotel" ? id : null,
          carId: type === "car" ? id : null,
        });
      } catch (err) {
        console.error(
          "Failed to intercept component link routing smoothly:",
          err,
        );
      }
    }
    // --- CASE 2: Regular Page Redirection (Tour Packages) ---
    else if (
      hrefUrl.startsWith("/") ||
      hrefUrl.startsWith(window.location.origin)
    ) {
      e.preventDefault();

      // Clean absolute paths down to relative paths if necessary
      let targetPath = hrefUrl.startsWith("http")
        ? hrefUrl.replace(window.location.origin, "")
        : hrefUrl;

      // Dynamic Runtime Patch: If the generated link has plural "/tour-packages/",
      // fix it to singular "/tour-package/" so it maps to your Next.js folder setup
      if (targetPath.includes("/tour-packages/")) {
        targetPath = targetPath.replace("/tour-packages/", "/tour-package/");
      }

      // Route using Next.js engine. The page updates, but chatbot state is fully preserved!
      router.push(targetPath);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight =
        "var(--removed-body-scrollbar-width, 0px)";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang =
        typeof navigator !== "undefined" ? navigator.language : "en-IN";
      rec.onstart = () => setIsListening(true);
      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
          handleSendMessage(transcript);
        }
      };
      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);
      recognitionRef.current = rec;
    }
  }, []);

  const toggleVoiceRecognition = () => {
    if (!recognitionRef.current) {
      alert(
        "Voice command features are not fully supported by your current browser profile.",
      );
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleSendMessage = async (queryText) => {
    const targetQuery = queryText || inputValue.trim();
    if (!targetQuery) return;

    const userMsgId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, sender: "user", text: targetQuery },
    ]);
    if (!queryText) setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: targetQuery,
          history: messages,
          locale: currentLocale, // Passed dynamically to back-end
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: "bot", text: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: "Apologies, I encountered a connection issue. Please try again shortly or contact our counter directly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="kumbh-chatbot-container">
      <div
        className="kumbh-launcher-container"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 99999,
        }}
      >
        <AnimatePresence>
          {showWelcomeImg && !isOpen && (
            <motion.div
              className="chat-welcome-bubble-wrapper"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                className="chat-welcome-close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowWelcomeImg(false);
                }}
              >
                <X size={14} />
              </button>

              <img
                src={chatWelcome.src}
                alt="Welcome Assistant Preview"
                className="chat-welcome-img"
                onClick={() => setIsOpen(true)}
                style={{ cursor: "pointer" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className="kumbh-launcher-btn"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ position: "static" }}
        >
          <MessageSquare size={20} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="kumbh-window-box"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="kumbh-header">
              <div className="kumbh-profile-area">
                <div className="kumbh-avatar">🕉️</div>
                <div>
                  <div className="kumbh-status-title">
                    Mahakumbh AI Assistant
                  </div>
                  <div className="kumbh-status-sub">
                    ● Online | Instant Support
                  </div>
                </div>
              </div>
              <button
                className="kumbh-close-btn"
                onClick={() => setIsOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            {/* Capture clicks inside the chat area safely */}
            <div className="kumbh-body" onClick={handleChatBodyClick}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`kumbh-msg ${msg.sender === "bot" ? "kumbh-msg-bot" : "kumbh-msg-user"}`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              ))}

              {isLoading && (
                <div className="kumbh-msg kumbh-msg-bot typing-indicator">
                  <span className="kumbh-dot"></span>
                  <span className="kumbh-dot"></span>
                  <span className="kumbh-dot"></span>
                </div>
              )}

              {!isLoading && messages.length < 3 && (
                <div className="kumbh-tags-wrapper">
                  {quickTags.map((tag, idx) => (
                    <button
                      key={idx}
                      className="kumbh-btn-tag"
                      onClick={() => handleSendMessage(tag.query)}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form
              className="kumbh-input-footer"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <input
                type="text"
                className="kumbh-txt-input"
                placeholder={
                  isListening
                    ? "Listening closely..."
                    : "Type or speak to assistant..."
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading || isListening}
              />

              <button
                type="button"
                onClick={toggleVoiceRecognition}
                className={`kumbh-mic-btn ${isListening ? "active-listening" : ""}`}
                style={{
                  background: isListening ? "#d32f2f" : "#f1eeea",
                  color: isListening ? "#ffffff" : "#333333",
                }}
              >
                {isListening ? <Square size={16} /> : <Mic size={16} />}
              </button>

              <button
                type="submit"
                className="kumbh-submit-btn"
                disabled={isLoading || isListening}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingForm
        show={modalConfig.show}
        handleClose={handleCloseModal}
        type={modalConfig.type}
        selectedItem={modalConfig.selectedItem}
        hotelId={modalConfig.hotelId}
        carId={modalConfig.carId}
      />
    </div>
  );
};
