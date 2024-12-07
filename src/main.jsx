import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import ContextProvider from "./utils/ContexProvider.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import LoginForm from "./pages/Login/LoginForm.jsx";
import { Toaster } from "react-hot-toast";
import ForgotPass from "./pages/Login/ForgotPass.jsx";
import NotFound from "./pages/NotFound.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import AddReview from "./pages/AddReview.jsx";
import AllReviews from "./pages/AllReviews.jsx";
import MyReviews from "./pages/MyReviews.jsx";
import ReviewDeets from "./pages/ReviewDeets.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
    children: [
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/login/forgotpass",
        element: <ForgotPass />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/reviews",
    element: <AllReviews />,
    loader: () => fetch("http://localhost:5120/reviews"),
  },
  {
    path: "/review/:id",
    element: <ReviewDeets />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/addreview",
    element: (
      <PrivateRoute>
        <AddReview />
      </PrivateRoute>
    ),
  },
  {
    path: "/myreviews",
    element: (
      <PrivateRoute>
        <MyReviews />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <Toaster />
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
