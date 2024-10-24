import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/userSlice'; // Adjust the import based on your file structure
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Show confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    
    // If user clicks "OK"
    if (confirmLogout) {
      dispatch(logoutUser()); // Dispatch logout action
      navigate('/login'); // Redirect to login page after logout
    }
  };

  return (
    <span
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded cursor-pointer"
    >
      Logout
    </span>
  );
};

export default Logout;
