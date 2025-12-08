import axios from "axios";

// Your primary backend API
const PRIMARY_URL = "https://destination-coder.onrender.com/api";

// (Optional) backup URL if you want failover
const BACKUP_URL = "https://destination-coder-1.onrender.com/api";

// Start with the main URL
let BASE_URL = PRIMARY_URL;

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Auto failover: switch to backup only if network error occurs
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response && !originalRequest._retry) {
      originalRequest._retry = true;

      // Switch URLs
      BASE_URL = BASE_URL === PRIMARY_URL ? BACKUP_URL : PRIMARY_URL;
      api.defaults.baseURL = BASE_URL;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
