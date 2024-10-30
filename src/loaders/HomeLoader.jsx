import axiosInstance from '../utils/axiosInstance';

export const homeLoader = async () => {
  try {
    const response = await axiosInstance.get('/home'); // Call API through axiosInstance
    return { data: response.data }; // Pass the fetched data to Home component
  } catch (error) {
    console.error("Error loading home data:", error);
    throw error; // This will trigger ErrorPage if you have errorElement in routesConfig
  }
};
