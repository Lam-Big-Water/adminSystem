import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Settings,
  User,
  KeyRound,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Menus, Toggle, MenuList, MenusButton } from "../compose/AbsoluteMenus";

const SidebarSetting = ({ expanded = true }) => {
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const isSettingsActive = location.pathname.startsWith("/settings");

  const handleSettingsClick = () => {
    setSettingsOpen((prev) => !prev);
  };
  return (
    <>
      <Menus>
        <Toggle id="settings-menu">
          <button
            className={`relative w-full flex items-center text-left p-2 my-1 text-sm font-medium rounded-md cursor-pointer transition-colors group hover:bg-primary/10
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
          <MenuList id="settings-menu" positionY={460} positionX={86}>
            <div className="flex flex-col p-1 min-w-[180px]">
              <MenusButton>
                <NavLink
                  to="/settings/profile"
                  className="flex gap-2 items-center"
                >
                  <User size={18} strokeWidth={1.5} />

                  <span>Profile</span>
                </NavLink>
              </MenusButton>

              <MenusButton>
                <NavLink
                  to="/settings/account"
                  className="flex gap-2 items-center"
                >
                  <KeyRound size={18} strokeWidth={1.5} />

                  <span>Account</span>
                </NavLink>
              </MenusButton>
            </div>
          </MenuList>
        )}
        {expanded && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-linear ${
              settingsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-4 transition-all duration-500">
              <li className="transform transition-all duration-500 delay-100 hover:translate-x-1">
                <NavLink
                  to="/settings/profile"
                  className={({ isActive }) => `
              relative flex items-center py-1.5 px-3 text-sm rounded-md cursor-pointer
              transition-all duration-300 group w-full
              ${
                isActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "hover:bg-primary/10"
              }
            `}
                >
                  <User
                    size={16}
                    strokeWidth={2}
                    className="transition-transform duration-300 ease-linear group-hover:scale-110"
                  />
                  <span className="ml-3 transition-all duration-300">
                    Profile
                  </span>
                </NavLink>
              </li>
              <li className="transform transition-all duration-500 delay-150 hover:translate-x-1">
                <NavLink
                  to="/settings/account"
                  className={({ isActive }) => `
              relative flex items-center py-1.5 px-3 text-sm rounded-md cursor-pointer
              transition-all duration-300 group w-full
              ${
                isActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "hover:bg-primary/10"
              }
            `}
                >
                  <KeyRound
                    size={16}
                    strokeWidth={2}
                    className="transition-transform duration-300 ease-linear group-hover:scale-110"
                  />
                  <span className="ml-3 transition-all duration-300">
                    Account
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </Menus>
    </>
  );
};

export default SidebarSetting;
