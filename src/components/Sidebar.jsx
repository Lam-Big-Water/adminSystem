import {
  ChevronsUpDown,
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
  let positionX = expanded ? 250 : 86;
  let positionY = 24;
  return (
    <aside className="h-screen flex">
      <nav className="h-full flex flex-col bg-sidebar text-foreground font-medium border-r border-border shadow-sm p-2">
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
            className="p-1.5 rounded-lg text-foreground hover:bg-primary/10 cursor-pointer"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex flex-col gap-0.5 flex-1 px-3">
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

          <SidebarItem
            icon={<Settings size={20} strokeWidth={2} />}
            text="Settings"
            link="/settings"
            expanded={expanded}
          />
        </ul>

        <Menus>
          <Toggle id="user-menu">
          <div
            className={`w-full flex p-1 rounded-md cursor-pointer text-start items-center ${expanded ? "justify-start gap-2" : "justify-center gap-0"}`}
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
              <div><ChevronsUpDown size={18} strokeWidth={1.5} /></div>

              <MenuList id="user-menu" positionY={positionY} positionX={positionX}>
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
            </div>
          </div>
          </Toggle>
        </Menus>
      </nav>
    </aside>
  );
};

export default Sidebar;
