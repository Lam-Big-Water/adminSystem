import React from "react";
import { NavLink } from "react-router-dom";
import {
  Settings,
  UserCog,
  Wrench,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Menus, Toggle, MenuList, MenusButton } from "../compose/AbsoluteMenus";

const SidebarSetting = ({ expanded = true }) => {
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const handleSettingsClick = () => {
    setSettingsOpen((prev) => !prev);
  };
  return (
    <>
      <Toggle id="settings-menu">
        <button
          className={`relative w-full flex items-center text-left p-2 my-1 text-sm font-medium rounded-md cursor-pointer transition-colors group hover:bg-muted
        ${expanded ? "justify-start" : "justify-center"}`}
          onClick={handleSettingsClick}
        >
          <Settings size={20} strokeWidth={2} />
          <div
            className={`flex items-center justify-between overflow-hidden transition-all ease-linear duration-300 ${
              expanded ? "w-32 ml-3" : "w-0"
            } `}
          >
            Settings
            <span>
              {settingsOpen ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </span>
          </div>
        </button>
      </Toggle>
      {!expanded && (
        <MenuList
          className="flex flex-col p-1 bg-background text-foreground border border-border shadow-sm rounded-lg"
          id="settings-menu"
          positionY={460}
          positionX={86}
        >
          <h3 className="flex gap-2 items-center py-1.5 ps-2 pe-8 text-sm font-bold text-left">
            Settings
          </h3>
          <div className="w-full border-b border-border mb-1"></div>

          <MenusButton>
            <NavLink
              className="flex gap-2 items-center py-1.5 ps-2 pe-8 text-sm font-medium text-left rounded-md hover:bg-muted "
              to="/settings/profile"
            >
              <UserCog size={20} strokeWidth={2} />

              <span>Profile</span>
            </NavLink>
          </MenusButton>

          <MenusButton>
            <NavLink
              className="flex gap-2 items-center py-1.5 ps-2 pe-8 text-sm font-medium text-left rounded-md hover:bg-muted "
              to="/settings/account"
            >
              <Wrench size={20} strokeWidth={2} />

              <span>Account</span>
            </NavLink>
          </MenusButton>
        </MenuList>
      )}
      {expanded && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-linear ${
            settingsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-4 transition-all duration-500">
            <li className="text-foreground">
              <NavLink
                to="/settings/profile"
                className={({ isActive }) => `
              relative flex items-center py-1.5 px-3 text-sm rounded-md cursor-pointer
              transition-all duration-300 group w-full
              ${
                isActive
                  ? "bg-muted font-medium text-primary"
                  : "hover:bg-muted"
              }
            `}
              >
                <UserCog
                  size={20}
                  strokeWidth={2}
                  className="transition-transform duration-300 ease-linear"
                />
                <span className="ml-3 transition-all duration-300">
                  Profile
                </span>
              </NavLink>
            </li>
            <li className="text-foreground">
              <NavLink
                to="/settings/account"
                className={({ isActive }) => `
              relative flex items-center py-1.5 px-3 text-sm rounded-md cursor-pointer
              transition-all duration-300 group w-full
              ${
                isActive
                  ? "bg-muted font-medium text-primary"
                  : "hover:bg-muted"
              }
            `}
              >
                <Wrench
                  size={20}
                  strokeWidth={2}
                  className="transition-transform duration-300 ease-linear"
                />
                <span className="ml-3 transition-all duration-300">
                  Account
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default SidebarSetting;
