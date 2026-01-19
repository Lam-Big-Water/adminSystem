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
  User,
  KeyRound,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import React from "react";
import SidebarItem from "./SidebarItem";
import { Menus, Toggle, MenuList, MenusButton } from "../compose/Menus2";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { useLogout } from "../query/auth/useLogout";
import ProfileItem from "../ProfileItem";
import { useUser } from "../query/auth/useUser";
// import SliderSidebar from "./SliderSidebar";
import { useMobileDetection } from "../hooks/useMobileDetection";
import SidebarSetting from "./SidebarSetting";
import Uploader from "../Uploader";
const Sidebar = () => {
  const [expanded, setExpanded] = React.useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { isPending, logout } = useLogout();
  const location = useLocation();
  const { user } = useUser();
  const { fullName = "SamLam", avatar = "default-user.jpg" } =
    user?.user_metadata || {};

  useMobileDetection(setExpanded);

  return (
    <div className="col-start-1 col-end-2 row-span-2">
      <aside className="h-screen flex">
        <nav className="h-full flex flex-col bg-background text-foreground font-medium p-2">
          <div className="p-4 pb-2 flex justify-between items-center">
            <div
              className={`rounded-sm overflow-hidden transition-all ease-linear duration-300 ${
                expanded ? "w-32 opacity-100" : "w-0 opacity-0"
              }`}
            >
              Admin
            </div>

            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-2 rounded-lg text-foreground hover:bg-primary/10 cursor-pointer transition-all duration-200 active:scale-95"
            >
              {expanded ? (
                <ChevronFirst className="transition-transform duration-300" />
              ) : (
                <ChevronLast className="transition-transform duration-300" />
              )}
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
            {/* <Uploader /> */}

            <SidebarSetting expanded={expanded} />
          </ul>

          {/* 原有用户菜单代码保持不变 */}
          <Menus>
            <Toggle id="user-menu">
              <div
                className={`w-full flex p-1 rounded-md cursor-pointer text-start items-center transition-all duration-300 ${
                  expanded
                    ? "justify-start gap-2 hover:bg-primary/10"
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
                  className={`flex justify-between items-center overflow-hidden transition-all duration-500 ${
                    expanded ? "w-42 opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  <div className="leading-4 text-xs">
                    <h4 className="font-black transition-all duration-300">
                      {fullName}
                    </h4>
                    <span className="transition-all duration-300">
                      SamLam@gmail.com
                    </span>
                  </div>
                  <div>
                    <ChevronsUpDown
                      size={18}
                      strokeWidth={1.5}
                      className="transition-transform ease-linear duration-300 hover:rotate-180"
                    />
                  </div>

                  <MenuList
                    id="user-menu"
                    positionY={24}
                    positionX={expanded ? 250 : 86}
                  >
                    <div className="flex flex-col">
                      <ProfileItem />
                      <MenusButton>
                        <div className="flex gap-2 items-center p-2 rounded-sm transition-all duration-300 hover:gap-3 hover:bg-primary/10">
                          <IdCard size={18} strokeWidth={1.5} />
                          <Link
                            to="/account"
                            className="transition-all duration-300"
                          >
                            Account
                          </Link>
                        </div>
                      </MenusButton>

                      <MenusButton onClick={toggleDarkMode}>
                        {isDarkMode ? (
                          <div className="flex gap-2 items-center p-2 rounded-sm transition-all duration-300 hover:gap-3 hover:bg-primary/10">
                            <Moon size={18} strokeWidth={1.5} />
                            <span className="transition-all duration-300">
                              Dark Mode
                            </span>
                          </div>
                        ) : (
                          <div className="flex gap-2 items-center p-2 rounded-sm transition-all duration-300 hover:gap-3 hover:bg-primary/10">
                            <Sun size={18} strokeWidth={1.5} />
                            <span className="transition-all duration-300">
                              Light Mode
                            </span>
                          </div>
                        )}
                      </MenusButton>

                      <MenusButton onClick={logout} disabled={isPending}>
                        <div className="text-red-500 flex gap-2 items-center p-2 rounded-sm transition-all duration-200 hover:gap-3 hover:bg-red-500/10">
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
          </Menus>
        </nav>
      </aside>
      {/* <SliderSidebar toggle={slide} onClose={handleSlide}/> */}
    </div>
  );
};

export default Sidebar;
