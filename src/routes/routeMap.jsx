import { Navigate } from "react-router-dom";

import AppLayout from '../AppLayout';
import Login from "../pages/login";
import ProtectedRoute from '../ProtectedRoute';
import Dashboard from '../pages/dashboard';
import User from '../pages/user'
import Cabin from '../pages/cabin';
import Bookings from '../pages/bookings'
import Settings from '../pages/settings'
import PageNotFound from '../pages/pageNotFound';
import Booking from "../pages/booking";
import Checkin from "../pages/checkin";
import BookingDetail from "../components/BookingDetail";
import Profile from "../pages/profile";
import Account from "../pages/account";

export const routeMap = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true, 
        element: <Navigate replace to="dashboard" />
      },
      {
        path: "dashboard", 
        element: <Dashboard />
      },
      {
        path: "cabins", 
        element: <Cabin />
      },
      {
        path: "bookings", 
        element: <Bookings />
      },
      {
        path: "bookings/:bookingId",
        element: <BookingDetail/>
      },
      {
        path: "checkin/:bookingId",
        element: <Checkin/>
      },
      {
        path: "settings", 
        element: <Settings />, 
        children: [
          {
            index: true, 
            element: <Navigate replace to="profile" />
          },
          {
            path: "profile",
            element: <Profile />
          }, 
          {
            path: "account",
            element: <Account />
          }
        ]
      },
      {
        path: "users",
        element: <User />
      },
    ]
  },
  { 
    path: 'login', 
    element: <Login /> 
  },
  { 
    path: '*', 
    element: <PageNotFound /> 
  },
];