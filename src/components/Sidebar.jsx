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
import { useLogout } from "../query/auth/useLogout";

const Sidebar = () => {
  const [expanded, setExpanded] = React.useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { isPending, logout } = useLogout();
  return (
    <aside className="h-screen flex">
      <nav className="h-full flex flex-col bg-stone-50 dark:bg-stone-950 text-slate-950 dark:text-slate-200 font-medium border-r border-stone-100 dark:border-stone-900 shadow-sm p-2">
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
            className="p-1.5 rounded-lg text-stone-950 dark:text-stone-50 bg-stone-50 dark:bg-stone-950  hover:bg-gray-200 dark:hover:bg-neutral-800/70 cursor-pointer "
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex flex-col gap-0.5 flex-1 px-3">
          <SidebarItem
            icon={<LayoutDashboard size={20} strokeWidth={2}/>}
            text="Dashboard"
            link="/dashboard"
            alert={false}
            expanded={expanded}
          />

          <SidebarItem
            icon={<Logs size={20} strokeWidth={2}/>}
            text="Bookings"
            link="/bookings"
            alert={false}
            expanded={expanded}
          />

          <SidebarItem
            icon={<LayoutList size={20} strokeWidth={2}/>}
            text="Cabins"
            link="/cabins"
            alert={false}
            expanded={expanded}
          />

          <SidebarItem
            icon={<Users size={20} strokeWidth={2}/>}
            text="Users"
            link="/users"
            alert={false}
            expanded={expanded}
          />

          <SidebarItem
            icon={<Settings size={20} strokeWidth={2}/>}
            text="Settings"
            link="/settings"
            alert={false}
            expanded={expanded}
          />
        </ul>

        <div
          className={`w-full flex p-1 gap-2 ${expanded ? "justify-start" : "justify-center"}`}
        >
          <div className="flex justify-center items-center w-10 h-10 p-1 rounded-md bg-indigo-300 text-amber-50 font-semibold">
            Sam
          </div>

          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-42" : "w-0"
            }`}
          >
            <div className="leading-4 text-xs">
              <h4 className="font-black">Sam Lam</h4>
              <span className="">SamLam@gmail.com</span>
            </div>
            <div>
              <Menus>
                <Toggle id="user-menu">
                  <MoreVertical size={20} />
                  <MenuList id="user-menu" positionY={24} positionX={242}>
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

                      <MenusButton onClick={logout} disabled={isPending}>
                        <div className="text-red-500 flex gap-2 items-center">
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
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
