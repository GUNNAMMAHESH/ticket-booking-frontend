import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Async thunk to create a new user
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/create",
        userData
      );
      console.log("Create User Response:", response.data); // Log response data
      return response.data;
    } catch (error) {
      console.error("Create User Error:", error.response.data); // Log error
      return rejectWithValue(error.response.data);
    }
  }
);

// In userSlice.js

// Async thunk to send OTP
export const sendOtp = createAsyncThunk(
  "user/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/user/login-send-otp", { email });
      return response.data; // Return the response data
    } catch (error) {
      console.error("Send OTP Error:", error.response.data); // Log error
      return rejectWithValue(error.response.data); // Return error for Redux
    }
  }
);


// Async thunk to handle user login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/user/login", loginData);
      localStorage.setItem("token", response.data.token);

      const token = response.data.token;

      if (token) {
        // Attempt to decode the token
        try {
          const decoded = jwtDecode(token);
          console.log("Decoded JWT:", decoded); // Log the decoded value

          // Return decoded user and role along with response data
          return {
            user: decoded.user,
            token,
            role: decoded.user.role,
          };
        } catch (decodeError) {
          console.error("Error decoding token:", decodeError); // Log decode errors
          return rejectWithValue({ message: "Failed to decode token" });
        }
      } else {
        console.error("No token found in response"); // Log error if token is missing
        return rejectWithValue({ message: "Login failed, no token received" });
      }
    } catch (error) {
      console.error("Login Error:", error.response.data); // Log response error
      return rejectWithValue(error.response.data); // Return error for Redux
    }
  }
);


// Initial state for the user
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    role: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  // In your reducers
reducers: {
  loginUserSuccess: (state, action) => {
    state.user = action.payload.user  || {};;
    state.token = action.payload.token || null;;
    state.role = action.payload.role || null;;
    console.log("User Login Success:", state); // Log updated state
  },
  logoutUser: (state) => {
    state.user = null;
    localStorage.removeItem("token");
    state.token = null;
    state.role = null;
    console.log("User Logged Out:", state); // Log state after logout
  },
},
extraReducers: (builder) => {
  builder
    .addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
    });
},


});

export const { loginUserSuccess, logoutUser } = userSlice.actions;
export default userSlice.reducer;
