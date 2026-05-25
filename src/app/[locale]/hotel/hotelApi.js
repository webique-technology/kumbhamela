import API from "@/lib/api";
// import API from "./axios";

// Get all hotels

// hotelApi.js
export const getHotels = async () => {
  const response = await API.get("/hotels");

  console.log("hotel get all data:", response.data?.data);


  return response.data;
};