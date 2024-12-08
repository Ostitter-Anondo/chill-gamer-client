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
import EditReview from "./pages/EditReview.jsx";
import SuperPrivateRoute from "./utils/SuperPrivateRoute.jsx";
import Watchlist from "./pages/Watchlist.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: () => fetch(`${import.meta.env.VITE_expressApiUrl}/topreviews/6`),
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
    loader: () => fetch(`${import.meta.env.VITE_expressApiUrl}/reviews`),
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
    path: "/watchlist",
    element: (
      <PrivateRoute>
        <Watchlist />
      </PrivateRoute>
    ),
  },
  {
    path: "/edit/:id",
    element: (
      <PrivateRoute>
        <SuperPrivateRoute>
          <EditReview />
        </SuperPrivateRoute>
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
