import axios from 'axios';
import { store } from '../store/Store'; 
import { logoutUser } from '../features/userSlice';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL || 'http://localhost:5000/',
  timeout: 5000, 
});
console.log(import.meta.env.VITE_APP_BASE_URL );


axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState()?.user?.token; 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
      
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
   
    if (error.response && error.response.status === 401) {
      store.dispatch(logoutUser()); 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
