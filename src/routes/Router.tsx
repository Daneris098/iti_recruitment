import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { GlobalStore, userDetailsValue } from "@src/utils/GlobalStore";
import { getRefreshTokenFromCookie } from "@src/utils/Auth";
import axiosInstance from "@src/api";

// Layout
import ProtectedLayout from "@src/layout/protected/Layout";
import PublicLayout from "@src/layout/public/Layout";
// Modules
import Login from "@modules/Login";
import Home from "@src/modules/Home";
import LandingPage from "@src/modules/LandingPage";
import Vacancies from "@src/modules/Vacancies";
import HomePublic from "@src/modules/HomePublic";
import Test from "@src/modules/TestModule/RichText";
import Calendar from "@src/modules/Calendar";
import Offers from "@src/modules/Offers";
import Reports from "@src/modules/Reports";
import ProfileSettings from "@src/modules/ProfileSettings";
import OrganizationSettings from "@src/modules/OrganizationSettings";
import HiringSettings from "@src/modules/HiringSettings";
import AdministratorSettings from "@src/modules/AdministratorSettings";
import AccountSetup from "@src/modules/AccountSetup";
import Applicants from "@src/modules/Applicants";
import Applied from "@src/modules/Applicants/components/pages/applied";
import ForInterview from "@src/modules/Applicants/components/pages/forInterview";
import ForOffered from "@src/modules/Applicants/components/pages/offered";
import Hired from "@src/modules/Applicants/components/pages/hired";
import ForTransferee from "@src/modules/Applicants/components/pages/forTransfer";
import Transferred from "@src/modules/Applicants/components/pages/transferred";
import Archived from "@src/modules/Applicants/components/pages/archived";

const isAuthenticated = () => {
  const { setUserDetails, userDetails } = GlobalStore();
  // use access token if exist
  if (Boolean(sessionStorage.getItem("accessTokenFlash"))) {
    const token = sessionStorage.getItem("accessTokenFlash");
    const decodedToken = token != null ? jwtDecode(token) : userDetailsValue;
    if (!userDetails.name) {
      setUserDetails(decodedToken);
    }
    const expirationTime = (decodedToken as any).exp * 1000;
    const currentTime = Date.now();
    if (currentTime > expirationTime) {
      sessionStorage.removeItem("accessTokenFlash");
      return false;
    }
    return true;
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
            setUserDetails(decodedToken);
            sessionStorage.setItem("accessTokenFlash", accessToken);
          }
        })
        .catch((error) => {
          console.error(error);
          return false;
        });
    })();
    return true;
  }
  // unauthenticated
  else {
    return false;
  }
};

// Authentication wrapper
const RequireAuth: React.FC = () => {
  // return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
  return <Outlet />;
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
        element: <PublicLayout isFullscreen={true} isShowIconLogout={false} />,
        children: [
          {
            path: "",
            element: <LandingPage />,
          },
          {
            path: "test",
            element: <Test />,
          },
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
    ],
  },
  {
    element: <RedirectIfAuthenticated />,
    children: [
      {
        element: <PublicLayout isFullscreen={false} isShowIconLogout={true} />,
        children: [
          {
            path: "vacancyList",
            element: <HomePublic />,
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
            path: "home",
            element: <Home />,
          },
          {
            path: "calendar",
            element: <Calendar />,
          },
          {
            path: "vacancies",
            element: <Vacancies />,
          },
          {
            path: "jobOffers",
            element: <Offers />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
          {
            path: "profileSettings",
            element: <ProfileSettings />,
          },
          {
            path: "organizationSettings",
            element: <OrganizationSettings />,
          },
          {
            path: "hiringSettings",
            element: <HiringSettings />,
          },
          {
            path: "administratorSettings",
            element: <AdministratorSettings />,
          },
          {
            path: "applicants",
            element: <Applicants />,
          },
          {
            path: "applied",
            element: <Applied />,
          },
          {
            path: "interview",
            element: <ForInterview />,
          },
          {
            path: "offered",
            element: <ForOffered />,
          },
          {
            path: "hired",
            element: <Hired />,
          },
          {
            path: "transferee",
            element: <ForTransferee />,
          },
          {
            path: "transferred",
            element: <Transferred />,
          },
          {
            path: "archive",
            element: <Archived />,
          },
        ],
      },
    ],
  },
  // Account Setup
  {
    element: <RequireAuth />,
    children: [
      {
        element: <PublicLayout isFullscreen={false} isShowIconLogout={false} isScreenAuto />,
        children: [
          {
            path: "accountSetup",
            element: <AccountSetup />,
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
