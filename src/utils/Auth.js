// utils/auth.js

import {jwtDecode} from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    return decoded.exp < currentTime; // Returns true if token is expired
  } catch (error) {
    console.error("Invalid token:", error);
    return true; // Consider token invalid if decoding fails
  }
};
