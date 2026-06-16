import API from "@/lib/api";

export const getHotels = async (
    page = 1,
    name = "",
    location = "",
    price = "",
    limit = "",
) => {
    try {
        const params = new URLSearchParams();
        params.set("page", page);

        // Optional parameters: only append if they have a value
        if (name) {
            params.set("name", name);
        }

        if (limit) {
            params.set("limit", limit);
        }
        if (price && price !== "all") {
            params.set("price", price);
        }

        if (location && location !== "all") {
            params.set("location", location);
        }

        const response = await API.get(`/hotels?${params.toString()}`);

        // Consistent with your car API return structure
        return response.data?.data;
    } catch (error) {
        console.error("Hotels API Error:", error);
        throw error;
    }
};
export const createHotelEnquiry = async (data) => {
    const response = await API.post(
        "/hotel-enquiries/store",
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