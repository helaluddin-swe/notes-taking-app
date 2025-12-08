import axios from "axios";

// Base URL selection
// 1️⃣ Local development: http://localhost:5000/api
// 2️⃣ Production (Vercel): Render backend
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : import.meta.env.VITE_API_URL || "https://destination-coder.onrender.com/api";

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
