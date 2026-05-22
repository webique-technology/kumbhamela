import api from "@/lib/api";

// Get all hotels
export const getHotels = async () => {
  try {
    const response = await api.get("/hotels");
    return response.data.data.data;
  } catch (error) {
    console.log("Hotel API Error:", error);
    throw error;
  }
};