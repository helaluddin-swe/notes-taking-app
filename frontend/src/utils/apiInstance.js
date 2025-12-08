import axios from "axios";

// Safe, deploy-friendly API URL selection:
// 1) Use build-time env var `VITE_API_URL` if provided by the host (recommended).
// 2) Fall back to an explicit production URL used by this project.
// 3) Finally fall back to localhost for local development.
const FALLBACK_PRIMARY = "https://destination-coder.onrender.com/api";
const FALLBACK_BACKUP = "https://destination-coder-1.onrender.com/api";

const PRIMARY_URL =
  import.meta.env.VITE_API_URL ||
  FALLBACK_PRIMARY ||
  "http://localhost:5000/api";
const BACKUP_URL =
  import.meta.env.VITE_BACKUP_API_URL || FALLBACK_BACKUP || PRIMARY_URL;

let BASE_URL = PRIMARY_URL;

const api = axios.create({ baseURL: BASE_URL });

// Auto failover: if a request fails with no response (network), swap URLs once and retry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};

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
