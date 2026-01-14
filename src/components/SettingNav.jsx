import {
UserRoundPen,
Wrench
} from "lucide-react";
import React from "react";
import SidebarItem from "./SidebarItem";


const SettingNav = () => {
  return (
      <nav className="flex h-full bg-transparent text-foreground font-medium p-2 lg:flex-col sm:flex-row">


        <ul className="flex gap-0.5 flex-1 lg:flex-col sm:flex-row">
          <SidebarItem
            icon={<UserRoundPen size={20} strokeWidth={2} />}
            text="Profile"
            link="./profile"
            expanded={true}
          />
          <SidebarItem
            icon={<Wrench size={20} strokeWidth={2} />}
            text="Account"
            link="./account"
            expanded={true}
          />
        </ul>
      </nav>
  );
};

export default SettingNav;