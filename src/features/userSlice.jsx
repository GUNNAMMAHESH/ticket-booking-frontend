import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { isTokenExpired } from "../utils/Auth";
import { toast } from "react-toastify";
import { toastSettings } from "../utils/toastSettings";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ticket-booking-backend-ten.vercel.app/user/create",
        userData
      );
      console.log("Create User Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Create User Error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendOtp = createAsyncThunk(
  "user/sendOtp",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ticket-booking-backend-ten.vercel.app/user/login-send-otp",
        { email, password }
      );
      toast.info("OTP is sent to your Email", toastSettings);
      return response.data;
    } catch (error) {
      console.error("Send OTP Error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ticket-booking-backend-ten.vercel.app/user/login",
        loginData
      );

      const token = response.data.token;

      if (isTokenExpired(token)) {
        throw new Error("Token is expired");
      }

      localStorage.setItem("token", token);

      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log("Decoded JWT:", decoded);
          localStorage.setItem("user", JSON.stringify(decoded.user));
          const getUser = localStorage.getItem("user");
          console.log("user from local", getUser);

          return {
            user: decoded.user,
            token,
            role: decoded.user.role,
          };
        } catch (decodeError) {
          console.error("Error decoding token:", decodeError);
          return rejectWithValue({ message: "Failed to decode token" });
        }
      } else {
        console.error("No token found in response");
        return rejectWithValue({ message: "Login failed, no token received" });
      }
    } catch (error) {
      console.error("Login Error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const storedUser = localStorage.getItem("user");
const parsedUser = storedUser ? JSON.parse(storedUser) : {};
const initialState = {
  user: parsedUser,
  role: parsedUser.role || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginUserSuccess: (state, action) => {
      state.user = action.payload.user || {};
      state.token = action.payload.token || null;
      state.role = action.payload.role || null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.error = "your account is not signin.please signin";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log("User Logged Out");
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
