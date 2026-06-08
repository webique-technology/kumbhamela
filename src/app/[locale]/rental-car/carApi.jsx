// import api from "@/lib/axios";
import api from "@/lib/api";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCars = async (
    page = 1,
    name = "",
    category = "",
    price = ""
) => {
    try {
        const params = new URLSearchParams();

        params.set("page", page);

        if (name) {
            params.set("name", name);
        }

        if (category && category !== "all") {
            params.set("category", category);
        }

        if (price && price !== "all") {
            params.set("price", price);
        }

        const response = await api.get(
            `/vehicles?${params.toString()}`
        );

        return response.data.data;
    } catch (error) {
        console.log("Cars API Error:", error);
        throw error;
    }
};

export const createCarEnquiry = async (data) => {
    const response = await api.post(
        "/vehicle-enquiries/store",
        data,
         {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};