import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <div className="w-full h-full flex justify-center items-center p-6">

      <div className="flex gap-2 w-full max-w-[1200px] h-full max-h-[900px] border border-[var(--color-border)] rounded-2xl">
        <Sidebar />
        <div className="w-full overflow-y-auto p-6">
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
