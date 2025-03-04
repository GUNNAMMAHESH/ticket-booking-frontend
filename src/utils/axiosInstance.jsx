import axios from "axios";
import { store } from "../store/Store"; 
import { logoutUser } from "../features/userSlice";

const LIVE_BACKEND = import.meta.env.VITE_APP_BACKEND_LIVE ;
const LOCAL_BACKEND = import.meta.env.VITE_APP_BACKEND_LOCAL;

let BASE_URL = LIVE_BACKEND ||  LOCAL_BACKEND;

console.log("Using backend URL:", BASE_URL);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState()?.user?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        store.dispatch(logoutUser());
      }

      if (LIVE_BACKEND && BASE_URL === LIVE_BACKEND && (error.response.status >= 500 || !error.response)) {
        console.warn("local backend is down. Switching to Live backend...");
        BASE_URL = LOCAL_BACKEND;
        axiosInstance.defaults.baseURL = BASE_URL;
      }
    } else {
      console.error("Network error or no response:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
