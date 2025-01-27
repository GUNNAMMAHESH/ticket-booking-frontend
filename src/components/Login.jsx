import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, sendOtp } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/Auth";
import { toast } from "react-toastify";
import { toastSettings } from "../utils/toastSettings";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [otp, setOtp] = useState("Sent OTP");
  const [captchaValue, setCaptchaValue] = useState(null); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if CAPTCHA is completed (only if CAPTCHA is enabled in production)
    if (import.meta.env.VITE_ENABLE_CAPTCHA === "true" && !captchaValue) {
      toast.error("Please complete the CAPTCHA.");
      return;
    }

    // Send CAPTCHA value to the server for verification (if applicable)
    try {
      if (import.meta.env.VITE_ENABLE_CAPTCHA === "true") {
        const response = await fetch('http://localhost:5000/api/verify-captcha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ captchaValue }),
        });

        const data = await response.json();
        if (data.success) {
          // If CAPTCHA is valid, proceed with login
          dispatch(loginUser(formData));
        } else {
          toast.error("CAPTCHA verification failed.");
        }
      } else {
        // If no CAPTCHA is enabled, proceed with login directly
        dispatch(loginUser(formData));
      }
    } catch (error) {
      toast.error("Error verifying CAPTCHA.");
    }
  };

  useEffect(() => {
    if (token) {
      toast.success("Login successful!", toastSettings);
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
    dispatch(sendOtp({ email: formData.email, password: formData.password }));
    setOtp("Resent OTP");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error.message}</p>}
      {token && <p className="text-green-500">User Login successful!</p>}
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
        <div className="flex justify-center items-start">
          <button
            onClick={otpsend}
            className={`bg-orange-400 text-white p-2 rounded`}
          >
            {otp ? `${otp}` : "Send OTP"}
          </button>
        </div>
        {otp && (
          <>
            <div className="mb-4">
              <label htmlFor="otp" className="block font-semibold">
                Enter OTP
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
             {/* Render CAPTCHA only if it's enabled in production */}
        {import.meta.env.VITE_ENABLE_CAPTCHA === "true" && (
          <div className="mt-4">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} // Access site key from environment variable
              onChange={(value) => setCaptchaValue(value)} // Store the value when CAPTCHA is completed
            />
          </div>
        )}
        
            <button
              type="submit"
              className="w-full font-semibold bg-orange-400 text-white py-2 rounded hover:text-orange-600 hover:bg-white hover:border-2 hover:border-orange-400 transition ease-in-out delay-250 active:bg-orange-400 active:text-white"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
