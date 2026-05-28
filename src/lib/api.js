// api/axios.js

import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://laravel.mahakumbhtourstravelsnashik.com/api",
});

export default API;