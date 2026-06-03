"use client"; // Required for Framer Motion client-side hooks in Next.js App Router

import React from "react";
import { motion } from "framer-motion";

/**
 * AnimationSecComponent - Reusable layout, section, and text wrapper.
 * @param {string} type - Animation style: "vertical" or "horizontal"
 * @param {string} direction - Movement origin: "up" | "down" | "left" | "right"
 * @param {number} delay - Postpone execution in seconds (great for cascading/staggering)
 * @param {number} duration - Transition length in seconds
 * @param {number} distance - Movement range in pixels
 * @param {boolean} once - If true, triggers reveal only the first time it rolls into view
 * @param {number} threshold - Trigger point (0.1 means element is 10% visible)
 */

export const AnimationSecComponent = ({
    children,
    type = "vertical",
    direction = "up",
    delay = 0,
    duration = 0.6,
    distance = 40,
    once = true,
    threshold = 0.1,
    className = "",
}) => {

    // Calculate dynamic axis variations based on configuration props
    let initialX = 0;
    let initialY = 0;

    if (type === "horizontal") {
        initialX = direction === "left" ? -distance : distance;
    } else {
        // Default to vertical offsets
        initialY = direction === "up" ? distance : -distance;
    }

    // Pure declarative variants configuration passed directly to Framer Motion
    const variants = {
        hidden: {
            opacity: 0,
            x: initialX,
            y: initialY,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: duration,
                delay: delay,
                ease: [0.25, 1, 0.5, 1], // Custom clean cubic-bezier ease out
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: once, amount: threshold }}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};
