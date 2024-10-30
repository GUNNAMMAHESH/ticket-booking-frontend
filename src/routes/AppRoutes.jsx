import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import User from "../pages/User";
import Event from "../pages/Event";  // Event component directly here
import Login from "../components/Login";
import ErrorPage from "../pages/ErrorPage";
import Logout from "../components/Logout";
import Profile from "../components/profile";
import DebugComponent from "../components/DebugComponent";
import PrivateRoute from "./PrivateRoute"
import Tickets from "../pages/Tickets";
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

        {/* Direct Event Route for Testing */}
        {/* <Route path="events" element={<Event />} /> */}
        <Route path="profile" element={<Profile />} />
        <Route path="debug" element={<DebugComponent />} />

        <Route path="events" element={<PrivateRoute allowedRoles={["admin","user"]}></PrivateRoute>}>
        <Route index element={<Event />} />
        </Route>

        <Route path="tickets" element={<PrivateRoute allowedRoles={["admin","user"]}></PrivateRoute>}>
        <Route index element={<Tickets />} />
        </Route>
        {/* <Route path="tickets" element={<Tickets />} /> */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
