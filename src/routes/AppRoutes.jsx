import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import User from "../pages/User"; 
import Event from "../pages/Event";
import Login from "../components/Login";
import ErrorPage from "../pages/ErrorPage";
import Profile from "../components/Profile";
import DebugComponent from "../components/DebugComponent";
import PrivateRoute from "./PrivateRoute";
import Tickets from "../pages/Tickets";
import CreateEvent from "../components/event/CreateEvent";
import { homeLoader } from "../loaders/HomeLoader";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Home />} loader={homeLoader} /> 
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<User />} />
        <Route path="error" element={<ErrorPage />} />

    
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="events/create" element={<CreateEvent />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["admin", "user"]} />}>
          <Route path="profile" element={<Profile />} />
          <Route path="debug" element={<DebugComponent />} />
          <Route path="events" element={<Event />} />
          <Route path="tickets" element={<Tickets />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;