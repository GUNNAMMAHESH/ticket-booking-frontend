// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.user); // Fetch user data from Redux

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user role is within the allowed roles
  return allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/error" replace />;
};

export default PrivateRoute;
