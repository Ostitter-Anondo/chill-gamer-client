import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router';
import ContextProvider from './utils/ContexProvider.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import LoginForm from './pages/Login/LoginForm.jsx';
import { Toaster } from 'react-hot-toast';
import SignupForm from './pages/Login/SignupForm.jsx';
import ForgotPass from './pages/Login/ForgotPass.jsx';

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
        path: "/login/signup",
        element: <SignupForm />,
      },
      {
        path: "/login/forgotpass",
        element: <ForgotPass />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <Toaster />
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
)
