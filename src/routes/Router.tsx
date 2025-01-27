import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import React from "react";
import { jwtDecode } from 'jwt-decode';
import { GlobalStore, user_details_value } from "@src/utils/GlobalStore";
import { getRefreshTokenFromCookie } from "@src/utils/Auth";
import axiosInstance from "@src/api";

// Layout 
import ProtectedLayout from "@src/layout/protected/Layout";
import PublicLayout from "@src/layout/public/Layout";
// Modules
import Login from "@modules/Login";
import Dashboard from "@modules/Dashboard";
import LandingPage from "@src/modules/LandingPage";
import Expenses from "@src/modules/Expenses";
import Settings from "@src/modules/Settings";
import Home from "@src/modules/Home";

const isAuthenticated = () => {
  const { set_user_details, user_details } = GlobalStore()
  // use access token if exist
  if (Boolean(sessionStorage.getItem("accessTokenFlash"))) {
    const token = sessionStorage.getItem("accessTokenFlash")
    const decodedToken = (token != null ? jwtDecode(token) : user_details_value);
    if (!user_details.name) {
      set_user_details(decodedToken);
    }
    const expirationTime = (decodedToken as any).exp * 1000;
    const currentTime = Date.now();
    if (currentTime > expirationTime) {
      sessionStorage.removeItem("accessTokenFlash");
      return false;
    }
    return true
  }
  // use refresh token if exist
  else if (Boolean(getRefreshTokenFromCookie())) {
    const payload = {
      refreshToken: getRefreshTokenFromCookie(),
    };
    (async () => {
      await axiosInstance
        .post("refreshToken", payload)
        .then((response) => {
          if (response.status === 200) {
            const { accessToken } = response.data;
            const decodedToken = jwtDecode(accessToken);
            set_user_details(decodedToken)
            sessionStorage.setItem("accessTokenFlash", accessToken);
          }
        })
        .catch((error) => {
          console.error(error)
          return false
        });
    })();
    return true
  }
  // unauthenticated
  else {
    return false
  }
};

// Authentication wrapper
const RequireAuth: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

// Redirect wrapper for public routes
const RedirectIfAuthenticated: React.FC = () => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

const router = createBrowserRouter([
  // Public routes
  {
    element: <RedirectIfAuthenticated />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            path: "",
            element: <LandingPage />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "home",
            element: <Home />,
          },
        ],
      },
    ],
  },
  // Protected routes
  {
    element: <RequireAuth />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "Expenses",
            element: <Expenses />,
          },
          {
            path: "Settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
  // Not found
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default router;
