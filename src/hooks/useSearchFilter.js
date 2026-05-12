"use client";

import { useSearchParams } from "next/navigation";

export const useSearchFilter = (data) => {

    const searchParams = useSearchParams();

    const nameFilter = searchParams.get("name");
    const categoryFilter = searchParams.get("category");
    const priceFilter = searchParams.get("price");

    const filteredData = data.filter((item) => {

        // Name filter
        const matchesName = nameFilter
            ? item.name.toLowerCase().includes(nameFilter.toLowerCase())
            : true;

        // Category filter
        const matchesCategory =
            categoryFilter &&
                categoryFilter !== "all"
                ? item.type === categoryFilter
                : true;

        // Price filter
        let matchesPrice = true;

        if (priceFilter && priceFilter !== "all") {

            const [min, max] = priceFilter
                .split("-")
                .map(Number);

            const itemPrice =
                typeof item.price === "string"
                    ? parseInt(item.price.replace(/[^\d]/g, ""))
                    : item.price;

            matchesPrice =
                itemPrice >= min &&
                itemPrice <= max;
        }

        return (
            matchesName &&
            matchesCategory &&
            matchesPrice
        );
    });

    return filteredData;
};