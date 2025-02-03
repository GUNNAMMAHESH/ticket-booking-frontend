import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
   const { role } = useSelector((state) => state.user);
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      dispatch(logoutUser());
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
    <header className="bg-black text-white p-4 ">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Book Now</h1>
        <ul className="flex space-x-4 text-xl font-semibold transition ease-in-out delay-250 hidden md:flex">
          <NavItem to="/">Home</NavItem>
          {!token ? (
            <>
              <NavItem to="/signup">Signup</NavItem>
              <NavItem to="/login">Login</NavItem>
            </>
          ) : (
            <>
              <NavItem to="/profile">Profile</NavItem>
              <NavItem to="/events">Events</NavItem>
              <NavItem to="/tickets">Tickets</NavItem>
              <li onClick={handleLogout}>
                <span className="cursor-pointer text-white hover:text-orange-200">Logout</span>
              </li>
            </>
          )}
        </ul>

        <div className="md:hidden flex items-center">
          <button
            className="text-white"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              menu.classList.toggle("hidden");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className="hidden md:hidden bg-black text-white p-4">
        <ul className="space-y-4 text-lg">
          <NavItem to="/">Home</NavItem>
          {!token ? (
            <>
              <NavItem to="/signup">Signup</NavItem>
              <NavItem to="/login">Login</NavItem>
            </>
          ) : (
            <>
              <NavItem to="/profile">Profile</NavItem>
              <NavItem to="/events">Events</NavItem>
              <NavItem to="/tickets">Tickets</NavItem>
              <li onClick={handleLogout}>
                <span className="cursor-pointer text-white hover:text-orange-200">
                  Logout
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
