"use client";

import { useSearchParams } from "next/navigation";

export const useSearchFilter = (data) => {
    const searchParams = useSearchParams();

    // Safe return if data hasn't loaded yet
    if (!data || !Array.isArray(data)) return [];

    const nameFilter = searchParams.get("name")?.toLowerCase();
    const categoryFilter = searchParams.get("category");
    const priceFilter = searchParams.get("price");

    const filteredData = data.filter((item) => {
        if (!item) return false;

        // 1. Dynamic Multi-Property Search (Supporting both .name and .title)
        let matchesName = true;
        if (nameFilter) {
            const checkMatch = (val) => String(val || "").toLowerCase().includes(nameFilter);

            // Checks both standard naming conventions (.name and .title)
            const matchInName = checkMatch(item.name) || checkMatch(item.title);
            const matchInLocation = checkMatch(item.location) || checkMatch(item.address);
            const matchInType = checkMatch(item.type);
            const matchInCategory = checkMatch(item.category);
            
            const matchInFeatures = Array.isArray(item.features)
                ? item.features.some(f => checkMatch(f))
                : checkMatch(item.features);

            matchesName = matchInName || matchInLocation || matchInType || matchInCategory || matchInFeatures;
        }

        // 2. Category Filter
        const matchesCategory =
            categoryFilter && categoryFilter !== "all"
                ? (item.type === categoryFilter || item.category === categoryFilter)
                : true;

        // 3. Price Filter
        let matchesPrice = true;
        if (priceFilter && priceFilter !== "all") {
            const [min, max] = priceFilter.split("-").map(Number);

            const itemPrice =
                typeof item.price === "string"
                    ? parseInt(item.price.replace(/[^\d]/g, ""), 10)
                    : item.price;

            if (!isNaN(itemPrice)) {
                matchesPrice = itemPrice >= min && itemPrice <= max;
            } else {
                matchesPrice = false; 
            }
        }

        return matchesName && matchesCategory && matchesPrice;
    });

    return filteredData;
};