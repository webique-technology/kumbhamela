"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Mic, Square } from "lucide-react";
import "../../styles/chatbot.scss";

import chatWelcome from "../../assets/images/chatbot-img.svg"

export const KumbhChatbot = () => {
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

    const quickTags = [
        { label: "📅 Snan Dates 2027", query: "shahi snan dates 2027" },
        { label: "🛕 Holy Places", query: "sacred locations in nashik" },
        { label: "🏆 Tour Packages", query: "tour packages" },
        { label: "🚕 Vehicle Rental", query: "car rental options and fleet rates" },
        { label: "✈️ Reach Nashik", query: "how to reach nashik by train air road" },
    ];

    useEffect(() => {
        if (isOpen) {
            // Disables standard scrolling on window body elements
            document.body.style.overflow = "hidden";
            // Optional: Adds subtle right padding to prevent layout shifts if scrollbars disappear on desktop
            document.body.style.paddingRight = "var(--removed-body-scrollbar-width, 0px)";
        } else {
            // Restores standard scrolling mechanics cleanly
            document.body.style.overflow = "unset";
            document.body.style.paddingRight = "0px";
        }

        // Cleanup function ensures body scroll is safely restored if the component unmounts unexpectedly
        return () => {
            document.body.style.overflow = "unset";
            document.body.style.paddingRight = "0px";
        };
    }, [isOpen]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    // Initialize Speech Recognition cleanly within the client runtime mount cycle
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const rec = new SpeechRecognition();
            rec.continuous = false;
            rec.interimResults = false;
            rec.lang = "en-IN"; // Sets regional dialect recognition default optimization

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
            alert("Voice command features are not fully supported by your current browser profile.");
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

        // Append User Message Locally
        const userMsgId = Date.now().toString();
        setMessages((prev) => [...prev, { id: userMsgId, sender: "user", text: targetQuery }]);
        if (!queryText) setInputValue("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: targetQuery, history: messages }),
            });

            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                { id: Date.now().toString(), sender: "bot", text: data.reply },
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { id: Date.now().toString(), sender: "bot", text: "Apologies, I encountered a connection issue. Please try again shortly or contact our counter directly." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="kumbh-chatbot-container">
            {/* Floating Action Trigger Button */}
            {/* Floating Launcher Action Container */}
            <div className="kumbh-launcher-container" style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 99999 }}>
                <AnimatePresence>
                    {showWelcomeImg && !isOpen && (
                        <motion.div
                            className="chat-welcome-bubble-wrapper"
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Close Button Trigger for Welcome Image Bubble */}
                            <button
                                type="button"
                                className="chat-welcome-close-btn"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevents clicking the close icon from accidentally opening the main chat
                                    setShowWelcomeImg(false);
                                }}
                            >
                                <X size={14} />
                            </button>

                            {/* Main Welcome Graphic Asset Banner */}
                            <img
                                src={chatWelcome.src}
                                alt="Welcome Assistant Preview"
                                className="chat-welcome-img"
                                onClick={() => setIsOpen(true)} // Clicking the image bubble directly opens the chat window too
                                style={{ cursor: "pointer" }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Launcher Button Element */}
                <motion.button
                    className="kumbh-launcher-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ position: "static" }} // Handled gracefully by the parent container absolute layout wrapper
                >
                    <MessageSquare size={20} />
                </motion.button>
            </div>

            {/* Main Interactive Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="kumbh-window-box"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        {/* Header Block */}
                        <div className="kumbh-header">
                            <div className="kumbh-profile-area">
                                <div className="kumbh-avatar">🕉️</div>
                                <div>
                                    <div className="kumbh-status-title">Mahakumbh AI Assistant</div>
                                    <div className="kumbh-status-sub">● Online | Instant Support</div>
                                </div>
                            </div>
                            <button className="kumbh-close-btn" onClick={() => setIsOpen(false)}>
                                <X size={22} />
                            </button>
                        </div>

                        {/* Chat Body Tracking System */}
                        <div className="kumbh-body">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`kumbh-msg ${msg.sender === "bot" ? "kumbh-msg-bot" : "kumbh-msg-user"}`}
                                    dangerouslySetInnerHTML={{ __html: msg.text }}
                                />
                            ))}

                            {/* Dynamic Loader Component */}
                            {isLoading && (
                                <div className="kumbh-msg kumbh-msg-bot typing-indicator">
                                    <span className="kumbh-dot"></span>
                                    <span className="kumbh-dot"></span>
                                    <span className="kumbh-dot"></span>
                                </div>
                            )}

                            {/* Render Navigation Tags only when conversation state stays natural */}
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

                        {/* Input Submission Footer Form with Native Voice Integration */}
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
                                placeholder={isListening ? "Listening closely..." : "Type or speak to assistant..."}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={isLoading || isListening}
                            />

                            {/* Mic Icon Action Button */}
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

                            <button type="submit" className="kumbh-submit-btn" disabled={isLoading || isListening}>
                                <Send size={16} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};