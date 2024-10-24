// src/components/Layout/Header.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom'; 
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // Show confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    
    // If user clicks "OK"
    if (confirmLogout) {
      dispatch(logoutUser()); // Dispatch logout action
      navigate('/login'); 
    }
  };

  const NavItem = ({ to, children }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "text-orange-400 font-bold border-b-2 border-orange-400"
            : "text-white hover:text-orange-200"
        }
      >
        {children}
      </NavLink>
    </li>
  );

  return (
    <header className="bg-black text-white p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Book Now</h1>
        <ul className="flex space-x-4 text-xl font-semibold transition ease-in-out delay-250">
          <NavItem to="/signup">Signup</NavItem>
          <NavItem to="/login">Login</NavItem>
          <NavItem to="/profile">Profile</NavItem>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/events">Events</NavItem>

          <li onClick={handleLogout}>
            <span className="cursor-pointer text-white hover:text-orange-200">Logout</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
