import React from "react";
import SettingNav from "../components/SettingNav";
import { Outlet } from "react-router-dom";
import Caption from "@/components/Caption";

const Settings = () => {
  return (
    <div className="py-6 px-4 max-w-7xl w-full mx-auto overflow-hidden">
      <Caption
        title="Settings"
        description="Manage your account settings and set e-mail preferences."
      ></Caption>
      <div className="w-full border-b border-border shadow-sm my-4"></div>

      <div className="h-full flex flex-col gap-4 lg:flex-row sm:flex-col">
        <SettingNav />
        <div className="h-full w-full bg-background overflow-auto pb-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Settings;
