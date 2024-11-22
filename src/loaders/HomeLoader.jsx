import axiosInstance from '../utils/axiosInstance';

export const homeLoader = async () => {
  try {
    const response = await axiosInstance.get('/home');
    return { data: response.data }; 
  } catch (error) {
    console.error("Error loading home data:", error);
    throw error; 
  }
};
