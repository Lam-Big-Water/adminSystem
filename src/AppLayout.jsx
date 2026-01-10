import React from "react";
import { Outlet } from "react-router-dom";

// import Sidebar from "./Sidebar";
import Sidebar from "./components/Sidebar"

const AppLayout = () => {
  return (
    <div className="relative w-full h-screen">
      <div className="flex gap-2 w-full overflow-y-hidden h-screen">
        <Sidebar />
        <div className="w-full max-w-7xl m-auto overflow-auto h-screen px-4 py-6">
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
