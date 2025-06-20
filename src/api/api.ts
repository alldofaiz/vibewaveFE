import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
