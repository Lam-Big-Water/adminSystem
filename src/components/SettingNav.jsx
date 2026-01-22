import { UserRoundPen, Wrench } from "lucide-react";
import React from "react";
import SidebarItem from "./SidebarItem";

const SettingNav = () => {
  return (
    <nav className="flex bg-transparent text-foreground font-medium lg:flex-col lg:mr-12 sm:flex-row">
      <ul className="flex gap-0.5 flex-1 lg:flex-col sm:flex-row">
        <SidebarItem
          icon={<UserRoundPen size={18} strokeWidth={2} />}
          text="Profile"
          link="./profile"
          expanded={true}
        />
        <SidebarItem
          icon={<Wrench size={18} strokeWidth={2} />}
          text="Account"
          link="./account"
          expanded={true}
        />
      </ul>
    </nav>
  );
};

export default SettingNav;
