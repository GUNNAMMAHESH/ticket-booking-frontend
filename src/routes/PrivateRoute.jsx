import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const { token, role } = useSelector((state) => state.user); 
  console.log("token", token);
  console.log("role", role);

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Role-based access control
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />; // This renders the child routes (like Event)
};

export default PrivateRoute;
