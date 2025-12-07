import {axios} from "axios"
const PRIMARY_URL = "https://destination-coder.onrender.com/api";
const BACKUP_URL = "https://destination-coder-1.onrender.com/api";

let BASE_URL = PRIMARY_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

// Auto failover
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === "ERR_NETWORK" && BASE_URL !== BACKUP_URL) {
      BASE_URL = BACKUP_URL;
      api.defaults.baseURL = BACKUP_URL;
      return api(error.config);
    }
    return Promise.reject(error);
  }
);

export default api;
