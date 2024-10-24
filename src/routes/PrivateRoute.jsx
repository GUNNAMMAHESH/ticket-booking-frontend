import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const { token, role } = useSelector((state) => state.user); 
  console.log("token",token);
  console.log("role",role);
 
  if (!token) {
    return <Navigate to="/login" />;
  }


  if (allowedRoles && !allowedRoles.includes(role)) {
    // If the role is not allowed for this route
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
