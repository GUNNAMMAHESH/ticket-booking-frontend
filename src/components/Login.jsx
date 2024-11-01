import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser,sendOtp } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/Auth"; 
import { toast } from 'react-toastify';
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "", 
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, token, user, role } = useSelector(
    (state) => state.user
  ); // Access token from Redux

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message); // Show error toast
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)); 
  };

  useEffect(() => {
    
    if (token) {
      toast.success("Login successful!"); 
      navigate("/"); 
    }
  }, [token, navigate]); 

useEffect(() => {
  const token = localStorage.getItem("token");

  const interval = setInterval(() => {
   
    
    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(logoutUser());
      navigate("/login"); 
    }
  }, 60000); 

  return () => clearInterval(interval); 
}, [dispatch, navigate]);

  const otpsend = (e) => {
    e.preventDefault();
    dispatch(sendOtp(formData.email)); 
    toast.info("OTP sent!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error.message}</p>}
      {token && <p className="text-green-500">User Login successful!</p>}{" "}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex justify-center">
          <button onClick={otpsend} className="bg-orange-400 text-white p-2 rounded">
            Send OTP
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="otp" className="block font-semibold">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full font-semibold bg-orange-400 text-white py-2 rounded hover:text-orange-600 hover:bg-white hover:border-2 hover:border-orange-400 transition ease-in-out delay-250 active:bg-orange-400 active:text-white"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      
    </div>
  );
};

export default Login;
