import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.user); 

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/error" replace />;
};

export default PrivateRoute;
