import api from "@/lib/api";
import axios from "axios";
import { slugify } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


// Get all blogs
export const getBlogs = async (page = 1) => {
  try {
    const response = await api.get(`/blogs?page=${page}`);

     return response.data.data || [];
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

export const getBlogBySlug = async (slug) => {
  try {
    const response = await api.get(
      `/blogs/slug/${encodeURIComponent(slug)}`
    );

    return response.data.data;
  } catch (error) {
    console.error("Blog Slug Error:", error);
    return null;
  }
};