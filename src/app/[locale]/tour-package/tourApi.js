import api from "@/lib/api";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get all tours
export const getTours = async () => {
  try {
    const response = await api.get("/tours");
    return response.data.data.data;
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