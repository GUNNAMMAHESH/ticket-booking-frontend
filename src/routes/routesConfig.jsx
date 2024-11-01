import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home";

import NotFound from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage";
import { homeLoader } from "../loaders/HomeLoader";
import Event from "../pages/Event";
import Login from "../components/Login";
// import PrivateRoute from "./PrivateRoute";

const routesConfig = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />, // Custom error page
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader, // Fetch data before rendering Home
      },
      // {
      //   path: "events",
      //   element: <PrivateRoute allowedRoles={["admin", "user"]} />,  // PrivateRoute applied here
      //   children: [
      //     {
      //       index: true, // Matches "/events" directly
      //       element: <Event />,
      //     },
      //   ],
      // },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default routesConfig;
  