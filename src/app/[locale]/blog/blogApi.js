import api from "@/lib/api";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


// Get all blogs
export const getBlogs = async () => {
  try {
    const response = await api.get("/blogs");

     return response.data.data.data || [];
  } catch (error) {
    console.log("Blogs API Error:", error);
    throw error;
  }
};

// Get single blog by id
export const getBlogById = async (id) => {
  try {
    const response = await api.get(`/blogs/${id}`);

    return response.data.data || response.data;
  } catch (error) {
    console.log("Single Blog API Error:", error);
    throw error;
  }
};