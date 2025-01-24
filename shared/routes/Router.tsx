/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { createBrowserRouter, Navigate } from "react-router-dom";

//--- Layout Modules
import App from "@/App";
import Login from "@shared/layout/auth/Login";

//--- Menu Modules
import { Leave } from "@/modules/Leave/";
import { Overtime } from "@/modules/Overtime/";
import { Offset } from "@/modules/Offset/";
import { CTO } from "@/modules/CompensantoryTimeOff/";
import { COS } from "@/modules/ChangeOfSchedule/";

import List from "@/modules/Leave/pages/List";
import Approve from "@/modules/Leave/pages/Approve";
import Review from "@/modules/Leave/pages/Review";
import Ledger from "@/modules/Leave/pages/Ledger";


//--- Menu Sub Modules
import { OTList, OTReview, OTApprove } from "@/modules/Overtime/pages/";
import { OffList, OffReview, OffApprove } from "@/modules/Offset/pages/";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <div>
            <title>Dashboard</title>Dashboard
          </div>
        ),
      },
      {
        path: "/calendar",
        errorElement: <div>NotFound</div>,
      },

      {
        path: "leave",
        element: <Leave />,
        errorElement: <div>NotFound</div>,
        children: [
          { index: true, element: <Navigate to="list" /> },
          { path: "list", element: <List /> },
          { path: "ledger", element: <Ledger /> },
          { path: "review", element: <Review /> },
          { path: "approve", element: <Approve /> },
        ],
      },
      {
        path: "overtime",
        element: <Overtime />,
        children: [
          { index: true, element: <Navigate to="list" /> },
          { path: "list", element: <OTList /> },
          { path: "review", element: <OTReview /> },
          { path: "approve", element: <OTApprove /> },
        ],
      },
      {
        path: "offset",
        element: <Offset />,
        children: [
          { index: true, element: <Navigate to="list" /> },
          { path: "list", element: <OffList /> },
          { path: "review", element: <OffReview /> },
          { path: "approve", element: <OffApprove /> },
        ],
      },
      {
        path: "cto",
        element: <CTO />,
      },
      {
        path: "change-of-schedule",
        element: <COS />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <div>NotFound</div>,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);
