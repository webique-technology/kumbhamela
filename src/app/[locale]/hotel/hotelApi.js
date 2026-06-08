import API from "@/lib/api";
// import API from "./axios";

// Get all hotels

// hotelApi.js
export const getHotels = async () => {
  const response = await API.get("/hotels");

  console.log("hotel get all data:", response.data.data.data);


  return response.data?.data;
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