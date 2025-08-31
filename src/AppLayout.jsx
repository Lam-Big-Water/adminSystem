import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <div className="max-w-7xl m-auto p-6 font-bold">
      <div id="actionList"></div>

      <div className="grid grid-cols-[300px_1fr] grid-rows-[60px_1fr_60px] items-start gap-6 max-md:grid-cols-1">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
