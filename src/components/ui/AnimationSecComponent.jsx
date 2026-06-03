"use client"; // Required for Framer Motion client-side hooks in Next.js App Router

import React from "react";
import { motion, useInView, useAnimationControls } from 'framer-motion';

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


export const FadeContent = ({
    children,
    container,                // Handled natively via Framer Motion's intersection viewport bounding box
    blur = false,
    duration = 1000,          // Supports both Milliseconds (e.g., 1000) and Seconds (e.g., 1)
    ease = 'easeOut',         // Mapped power2.out to framer motion equivalents
    delay = 0,
    threshold = 0.1,
    initialOpacity = 0,
    disappearAfter = 0,
    disappearDuration = 0.5,
    disappearEase = 'easeIn', // Mapped power2.in to framer motion equivalents
    onComplete,
    onDisappearanceComplete,
    className = '',
    style,
    ...props
}) => {
    const ref = useRef(null);
    const controls = useAnimationControls();

    // Custom utility function matching your GSAP configuration pattern 
    // (Converts values over 10 assumed as milliseconds down into standard seconds)
    const getSeconds = val => (typeof val === 'number' && val > 10 ? val / 1000 : val);

    // Hook directly looking for element presence matching your 'threshold' settings
    const isInView = useInView(ref, {
        once: true,
        amount: threshold,
    });

    // GSAP ease conversion mapping to native cubic-beziers/names
    const getEase = (easeName) => {
        const maps = {
            'power2.out': [0.25, 1, 0.5, 1], // clean easeOut
            'power2.in': [0.55, 0, 1, 0.45], // clean easeIn
            'easeOut': [0.25, 1, 0.5, 1],
            'easeIn': [0.55, 0, 1, 0.45]
        };
        return maps[easeName] || easeName;
    };

    useEffect(() => {
        if (isInView) {
            // 1. Fire Entry Fade Animation
            controls.start({
                opacity: 1,
                filter: 'blur(0px)',
                transition: {
                    duration: getSeconds(duration),
                    delay: getSeconds(delay),
                    ease: getEase(ease)
                }
            }).then(() => {
                // Fire original onComplete callback
                if (onComplete) onComplete();

                // 2. Check if item needs to disappear after a threshold timeout
                if (disappearAfter > 0) {
                    controls.start({
                        opacity: initialOpacity,
                        filter: blur ? 'blur(10px)' : 'blur(0px)',
                        transition: {
                            duration: getSeconds(disappearDuration),
                            delay: getSeconds(disappearAfter),
                            ease: getEase(disappearEase)
                        }
                    }).then(() => {
                        if (onDisappearanceComplete) onDisappearanceComplete();
                    });
                }
            });
        }
    }, [isInView, controls]);

    // Initial styling declarations matching your GSAP configuration setup
    const initialVariants = {
        hidden: {
            opacity: initialOpacity,
            filter: blur ? 'blur(10px)' : 'blur(0px)',
            willChange: 'opacity, filter, transform'
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            variants={initialVariants}
            animate={controls}
            className={className}
            style={style}
            {...props}
        >
            {children}
        </motion.div>
    );
};

