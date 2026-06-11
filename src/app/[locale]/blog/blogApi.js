import api from "@/lib/api";
import axios from "axios";
import { slugify } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBlogs = async (
      page = 1,
      title = "",
      limit = ""
      ) => {
        try {

            const params = new URLSearchParams();

            params.set("page", page);

            if (title) {
                params.set("title", title);
            }

            if (limit) {
                params.set("limit", limit);
            }

            const response = await api.get(
                `/blogs?${params.toString()}`
            );

            return response.data.data;

        } catch (error) {
            console.log("Blog API Error:", error);
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