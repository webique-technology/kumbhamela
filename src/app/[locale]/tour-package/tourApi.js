import api from "@/lib/api";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get all tours
// export const getTours = async (page = 1) => {
//   try {
//     const response = await api.get(`/tours?page=${page}`);
//     return response.data.data;
//   } catch (error) {
//     console.log("Tours API Error:", error);
//     throw error;
//   }
// };
export const getTours = async (
    page = 1,
    name = "",
    category = "",
    price = "",
    limit = ""
    ) => {
        try {
            const params = new URLSearchParams();

            params.set("page", page);

            if (name) {
                params.set("name", name);
            }
            if (limit) {
                params.set("limit", limit);
            }

            if (category && category !== "all") {
                params.set("category", category);
            }

            if (price && price !== "all") {
                params.set("price", price);
            }

            const response = await api.get(
                `/tours?${params.toString()}`
            );

            return response.data.data;
        } catch (error) {
            console.log("Tours API Error:", error);
            throw error;
        }
    };

export const createTourEnquiry = async (payload) => {
    try {
        const response = await axios.post(
            `${API_URL}/tour-enquiries`,
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error(
            "Tour enquiry error:",
            error.response?.data || error.message
        );

        throw error;
    }
};

export const getCancellationPolicy = async () => {
  try {
    const response = await api.get("/privacy-policy");
    return response.data;
  } catch (error) {
    console.log("Cancellation Policy API Error:", error);
    return [];
  }
};

export const getPaymentPolicy = async () => {
  try {
    const response = await api.get("/payment-policy");
    return response.data;
  } catch (error) {
    console.log("Payment Policy API Error:", error);
    return [];
  }
};

export const getTourBySlug = async (slug ,lang = "en") => {
  try {
    const response = await api.get(
      `/tours/slug/${encodeURIComponent(slug)}`,
        {
            params: {
            lang,
            },
        }
    );

    return response.data.data;
  } catch (error) {
    console.log("Tour Slug API Error:", error);
    return null;
  }
};