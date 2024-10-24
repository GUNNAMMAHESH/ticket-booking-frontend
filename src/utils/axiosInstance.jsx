import axios from 'axios';
import { store } from '../store/Store'; // Access Redux store if needed (e.g., for auth tokens)
import { logoutUser } from '../features/userSlice'; // Example action to handle token expiration

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL || 'http://localhost:5000/',
  timeout: 5000, // Adjust the timeout if necessary
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().user.token; // Access token from Redux state
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to headers
      
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific status codes globally
    if (error.response && error.response.status === 401) {
      store.dispatch(logoutUser()); // Dispatch logout on 401 Unauthorized
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
