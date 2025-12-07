import axios from "axios";
const VITE_API_URL="https://destination-coder.onrender.com/api"
const VITE_BACKUP_API_URL="https://destination-coder-1.onrender.com/api"

const PRIMARY_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";
const BACKUP_URL = import.meta.env.VITE_BACKUP_API_URL || PRIMARY_URL;

let BASE_URL = PRIMARY_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

// Auto failover
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest._retry && !error.response) {
      originalRequest._retry = true;
      BASE_URL = BASE_URL === PRIMARY_URL ? BACKUP_URL : PRIMARY_URL;
      api.defaults.baseURL = BASE_URL;
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
