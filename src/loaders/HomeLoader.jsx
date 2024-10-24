// src/loaders/HomeLoader.js
import { fetchData } from '../services/api';

export const homeLoader = async () => {
  const data = await fetchData('/home');  // Assuming this endpoint exists
  return { data };  // Data is passed to the Home component as a prop
};
