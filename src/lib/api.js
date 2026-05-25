// api/axios.js

import axios from "axios";

const API = axios.create({
  baseURL: "https://api.mahakumbhtourstravelsnashik.com/api",
});

export default API;