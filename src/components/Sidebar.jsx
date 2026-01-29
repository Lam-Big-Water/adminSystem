import {
  ChevronsUpDown,
  GamepadDirectional,
  LayoutDashboard,
  LayoutList,
  Logs,
  Users,
  IdCard,
  Sun,
  LogOut,
  Moon,
} from "lucide-react";
import React from "react";
import SidebarItem from "./SidebarItem";
import { Menus, Toggle, MenuList, MenusButton } from "../compose/AbsoluteMenus";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { useLogout } from "../query/auth/useLogout";
import ProfileItem from "@components/ProfileItem";
import { useUser } from "../query/auth/useUser";
import { useMobileDetection } from "../hooks/useMobileDetection";
import SidebarSetting from "./SidebarSetting";

const Sidebar = ({ expanded, handleClick }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { isPending, logout } = useLogout();
  const { user } = useUser();
  const { fullName = "Sam Lam", avatar = "default-user.jpg" } =
    user?.user_metadata || {};

  useMobileDetection(handleClick);

  return (
    <Menus>
      <div className="col-start-1 col-end-2 row-span-2">
        <aside className="h-screen flex">
          <nav className="h-full flex flex-col bg-background text-foreground font-medium p-2 shadow-sm">
            <div
              className={`p-2 flex justify-between items-center mb-4 ${expanded ? "justify-start" : "justify-center"}`}
            >
              <div className="w-8 h-8 flex justify-center items-center p-1 rounded-md bg-primary text-primary-foreground">
                <GamepadDirectional size={20} strokeWidth={2} />
              </div>

              <div
                className={`flex flex-col whitespace-nowrap overflow-hidden transition-all ease-linear duration-300 ${
                  expanded ? "w-32 ml-3" : "w-0"
                }`}
              >
                <h3 className="font-extrabold">Shadcn Admin</h3>
                <p className="text-xs">Shadcn UI Style</p>
              </div>
            </div>

            <ul className="flex flex-col gap-0.5 flex-1 px-3">
              <div
                className={`text-muted-foreground text-xs overflow-hidden transition-all ease-linear duration-300 ${
                  expanded ? "w-32" : "w-0"
                }`}
              >
                General
              </div>
              <SidebarItem
                icon={<LayoutDashboard size={20} strokeWidth={2} />}
                text="Dashboard"
                link="/dashboard"
                expanded={expanded}
              />

              <SidebarItem
                icon={<Logs size={20} strokeWidth={2} />}
                text="Bookings"
                link="/bookings"
                expanded={expanded}
              />

              <SidebarItem
                icon={<LayoutList size={20} strokeWidth={2} />}
                text="Cabins"
                link="/cabins"
                expanded={expanded}
              />

              <SidebarItem
                icon={<Users size={20} strokeWidth={2} />}
                text="Users"
                link="/users"
                expanded={expanded}
              />
              <div
                className={`text-muted-foreground text-xs overflow-hidden transition-all ease-linear duration-300 ${
                  expanded ? "w-32" : "w-0"
                }`}
              >
                Other
              </div>
              <SidebarSetting expanded={expanded} />
            </ul>

            <Toggle id="user-menu">
              <div
                className={`w-full flex p-1 rounded-md cursor-pointer text-start items-center transition-all duration-300 ${
                  expanded
                    ? "justify-start gap-2 hover:bg-muted"
                    : "justify-center gap-0"
                }`}
              >
                <div className="flex justify-center items-center w-10 h-10 rounded-md text-amber-50 font-semibold transition-transform ease-linear duration-300">
                  <img
                    className="w-full h-full rounded-md object-cover"
                    src={avatar}
                    alt="avatar"
                  />
                </div>

                <div
                  className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${
                    expanded ? "w-42 opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  <div className="leading-4 text-xs">
                    <h4 className="font-extrabold transition-all duration-300">
                      {fullName}
                    </h4>
                    <span className="transition-all duration-300">
                      SamLam@gmail.com
                    </span>
                  </div>
                  <div>
                    <ChevronsUpDown size={18} strokeWidth={1.5} />
                  </div>

                  <MenuList
                    className="flex flex-col p-1 bg-background text-foreground border border-border rounded-lg"
                    id="user-menu"
                    positionY={24}
                    positionX={expanded ? 250 : 86}
                  >
                    <div className="flex flex-col">
                      <ProfileItem />
                      <div className="w-full border-b border-border shadow-sm mb-1"></div>

                      <Link
                        className="w-full flex gap-2 items-center p-2 rounded-sm transition-all duration-300  hover:bg-muted"
                        to="/settings/account"
                      >
                        <IdCard size={18} strokeWidth={1.5} />
                        Account
                      </Link>

                      <MenusButton onClick={toggleDarkMode}>
                        {isDarkMode ? (
                          <div className="flex gap-2 items-center p-2 rounded-sm transition-all duration-300  hover:bg-muted">
                            <Moon size={18} strokeWidth={1.5} />
                            <span className="transition-all duration-300">
                              Dark Mode
                            </span>
                          </div>
                        ) : (
                          <div className="flex gap-2 items-center p-2 rounded-sm transition-all duration-300  hover:bg-muted">
                            <Sun size={18} strokeWidth={1.5} />
                            <span className="transition-all duration-300">
                              Light Mode
                            </span>
                          </div>
                        )}
                      </MenusButton>

                      <MenusButton onClick={logout} disabled={isPending}>
                        <div className="text-red-500 flex gap-2 items-center p-2 rounded-sm transition-all duration-300  hover:bg-red-300/20">
                          <LogOut size={18} strokeWidth={1.5} />
                          <span className="transition-all duration-300">
                            Log out
                          </span>
                        </div>
                      </MenusButton>
                    </div>
                  </MenuList>
                </div>
              </div>
            </Toggle>
          </nav>
        </aside>
      </div>
    </Menus>
  );
};

export default Sidebar;
