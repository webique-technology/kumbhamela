"use client";
import React from 'react';
import {
    Wind,
    User,
    Fuel,
    Briefcase,
    Users,
    ShieldCheck,
    Wifi,
    Snowflake
} from 'lucide-react';

const IconResolver = ({ featureName, size = 16, className = "" }) => {
    // Map your string values to actual Lucide Components
    const iconMap = {
        "AC": <Snowflake size={size} className={className} />,
        "Driver": <User size={size} className={className} />,
        "Fuel": <Fuel size={size} className={className} />,
        "Luggage": <Briefcase size={size} className={className} />,
        "Group Travel": <Users size={size} className={className} />,
        "Wifi": <Wifi size={size} className={className} />,
        "Safety": <ShieldCheck size={size} className={className} />,
        // Default fallback if string doesn't match
        "default": <Wind size={size} className={className} />
    };

    // Return the matched icon or the default one
    return iconMap[featureName] || iconMap["default"];
};

export default IconResolver;