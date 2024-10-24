import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import User from "../pages/User";
import Event from "../pages/Event";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage";
import Logout from "../components/Logout";
import Profile from "../components/profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<User />} />
        <Route path="error" element={<ErrorPage />} />
        <Route path="logout" element={<Logout />} />

        {/* Private Routes with Role-based access */}
        <Route path="profile" element={<PrivateRoute allowedRoles={["admin", "user"]} />}
        >
          <Route index element={<Profile />} />
          </Route>
        {/* <Route
          path="events"
          element={<PrivateRoute allowedRoles={["admin", "user"]} />}
        >
          <Route index element={<Event />} />
        </Route> */}

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
