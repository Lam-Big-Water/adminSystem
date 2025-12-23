import React from "react";
import { Outlet } from "react-router-dom";

// import Sidebar from "./Sidebar";
import Sidebar from "./components/Sidebar"

const AppLayout = () => {
  return (
    <div className="relative w-full h-full">

      <div className="flex gap-2 w-full border border-[var(--color-border)] rounded-2xl">
        <Sidebar />
        <div className="w-full overflow-y-auto p-6">
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
