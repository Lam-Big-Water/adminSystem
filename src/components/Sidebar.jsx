import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  LayoutDashboard,
  LayoutList,
  Logs,
  Settings,
  Users,
  IdCard,
  Sun,
  LogOut,
  Moon,
} from "lucide-react";
import React from "react";
import SidebarItem from "./SidebarItem";
import { Menus, Toggle, MenuList, MenusButton } from "../compose/Menus2";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

const Sidebar = () => {
  const [expanded, setExpanded] = React.useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
      <aside className="h-screen flex">
        <nav className="h-full flex flex-col bg-white dark:bg-black text-slate-950 dark:text-white font-medium border-r border-slate-200 shadow-sm p-2">
          <div className="p-4 pb-2 flex justify-between items-center">
            <div
              className={`rounded-sm overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
            >
              Admin
            </div>

            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg text-black cursor-pointer dark:text-amber-50 bg-gray-50 dark:bg-black hover:bg-gray-100 dark:hover:bg-gary-100/10 dark:hover:text-black"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <ul className="flex flex-col gap-0.5 flex-1 px-3">
            <SidebarItem
              icon={<LayoutDashboard />}
              text="Dashboard"
              link="/dashboard"
              alert={false}
              expanded={expanded}
            />

            <SidebarItem
              icon={<Logs />}
              text="Bookings"
              link="/bookings"
              alert={false}
              expanded={expanded}
            />

            <SidebarItem
              icon={<LayoutList />}
              text="Cabins"
              link="/cabins"
              alert={false}
              expanded={expanded}
            />

            <SidebarItem
              icon={<Users />}
              text="Users"
              link="/users"
              alert={false}
              expanded={expanded}
            />

            <SidebarItem
              icon={<Settings />}
              text="Settings"
              link="/settings"
              alert={false}
              expanded={expanded}
            />
          </ul>

          <div
            className={`flex p-3 ${expanded ? "justify-between" : "justify-center"}`}
          >
            <div className="flex justify-center items-center w-10 h-10 p-1 rounded-md bg-indigo-300 text-amber-50 font-semibold">
              Sam
            </div>

            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Sam Lam</h4>
                <span className="text-xs">SamLam@gmail.com</span>
              </div>
              <Menus>
                <Toggle id="user-menu">
                  <MoreVertical size={20} />
                  <MenuList id="user-menu" positionY={24} positionX={310}>
                    <div className="flex flex-col">
                      <MenusButton>
                        <div className="flex gap-2 items-center">
                          <IdCard size={18} strokeWidth={1.5} />
                          <Link to="/account">Account</Link>
                        </div>
                      </MenusButton>

                      <MenusButton onClick={toggleDarkMode}>
                        {isDarkMode ? (
                          <div className="flex gap-2 items-center">
                            <Sun size={18} strokeWidth={1.5} />
                            <span>Light Mode</span>
                          </div>
                        ) : (
                          <div className="flex gap-2 items-center">
                            <Moon size={18} strokeWidth={1.5} />
                            <span>Dark Mode</span>
                          </div>
                        )}
                      </MenusButton>

                      <MenusButton>
                        <div className="flex gap-2 items-center">
                          <LogOut size={18} strokeWidth={1.5} />
                          <span>Log out</span>
                        </div>
                      </MenusButton>
                    </div>
                  </MenuList>
                </Toggle>
              </Menus>
            </div>
          </div>
        </nav>
      </aside>
  );
};

export default Sidebar;
