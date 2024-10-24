import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../features/userSlice";

const signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    role: "", // Default role value set to 'user'
    email: "",
    phone: "",
    password: "",
    ConfirmPassword: "",
  });

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, ConfirmPassword } = formData;

    if (ConfirmPassword !== password) {
      // Display an error or notification about mismatching passwords
      console.error("Passwords do not match!");
      
      return;
    }

    dispatch(createUser(formData)); // Dispatch the createUser action

    setFormData({
          username: "",
          role: "user",
          email: "",
          phone: "",
          password: "",
          ConfirmPassword: "",
        });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Create New User</h1>
      {error && <p className="text-red-500">{error.message}</p>}
      {/* {user && <p className="text-green-500">User created successfully!</p>} */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block font-semibold">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange} // Handle role change
            className="w-full p-2 border rounded"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block font-semibold">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
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
        <div className="mb-4">
          <label htmlFor="ConfirmPassword" className="block font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            id="ConfirmPassword"
            name="ConfirmPassword"
            value={formData.ConfirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full font-semibold  bg-orange-400 text-white py-2 rounded hover:text-orange-600 hover:bg-white hover:border-2 hover:border-orange-400 transition ease-in-out delay-250 active:bg-orange-400 active:text-white"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default signup;
