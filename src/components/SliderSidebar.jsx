import { motion } from "motion/react";
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
import {useOutsideClick} from "../hooks/useOutsideClick";

const SliderSidebar = ({ toggle, expanded = true, onClose }) => {
  // 添加 onClose prop
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { isPending, logout } = useLogout();
  const [settingsOpen, setSettingsOpen] = React.useState(false);
const ref = useOutsideClick(onClose, false);
  

  const location = useLocation();
  const { user } = useUser();
  const { fullName = "SamLam", avatar = "default-user.jpg" } =
    user?.user_metadata || {};

  const isSettingsActive = location.pathname.startsWith("/settings");

  const handleSettingsClick = () => {
    setSettingsOpen((prev) => !prev);
  };

  

  // 阻止 sidebar 内部点击事件冒泡
//   const handleSidebarClick = (e) => {
//     e.stopPropagation();
//     onClose();
//   };

  return (
    <div
      className={`fixed inset-0 w-full h-full bg-gray-400/15 ${toggle ? "block" : "hidden"}`}
    //   onClick={handleSidebarClick} // 点击遮罩层关闭
    >
      <motion.div
        initial="hidden"
        animate={toggle ? "visible" : "hidden"}
        variants={{
          hidden: {
            left: "-100%",
            transition: { ease: "linear", duration: 0.3 },
          },

          visible: {
            left: 0,
            transition: { ease: "linear", duration: 0.3 },
          },
        }}
        className="absolute z-100 top-0 -right-full h-full"
      >
        <aside ref={ref} className="h-screen flex">
          <nav className="h-full flex flex-col bg-sidebar text-foreground font-medium border-r border-border shadow-sm p-2">
            <div className="p-4 pb-2 flex justify-between items-center">
              <div
                className={`rounded-sm overflow-hidden transition-all duration-300 ${
                  expanded ? "w-32 opacity-100" : "w-0 opacity-0"
                }`}
              >
                Admin
              </div>
            </div>

            <ul className="flex flex-col gap-0.5 flex-1 px-3">
              <SidebarItem
                icon={<LayoutDashboard size={20} strokeWidth={2} />}
                text="Dashboard"
                link="/dashboard"
                expanded={expanded}
                onClick={() => onClose?.()} // 点击菜单项也关闭
              />

              <SidebarItem
                icon={<Logs size={20} strokeWidth={2} />}
                text="Bookings"
                link="/bookings"
                expanded={expanded}
                onClick={() => onClose?.()}
              />

              <SidebarItem
                icon={<LayoutList size={20} strokeWidth={2} />}
                text="Cabins"
                link="/cabins"
                expanded={expanded}
                onClick={() => onClose?.()}
              />

              <SidebarItem
                icon={<Users size={20} strokeWidth={2} />}
                text="Users"
                link="/users"
                expanded={expanded}
                onClick={() => onClose?.()}
              />

              {/* Settings 菜单 - 根据展开状态使用不同实现 */}
              {expanded ? (
                // 展开状态：使用折叠菜单
                <li>
                  <button
                    onClick={handleSettingsClick}
                    className={`relative flex items-center py-2 px-3 my-1 text-sm font-medium rounded-md cursor-pointer transition-all duration-300 group w-full justify-start hover:bg-primary/10`}
                  >
                    <div>
                      <Settings
                        size={20}
                        strokeWidth={2}
                        className={`transition-transform duration-300 ${isSettingsActive ? "text-primary" : ""}`}
                      />
                    </div>

                    <span
                      className={`text-left overflow-hidden transition-all duration-300 w-32 ml-3 ${isSettingsActive ? "font-bold text-primary" : ""}`}
                    >
                      Settings
                    </span>

                    <div className="ml-auto transition-transform duration-500 ease-out">
                      {settingsOpen ? (
                        <ChevronDown
                          size={16}
                          className={isSettingsActive ? "text-primary" : ""}
                        />
                      ) : (
                        <ChevronRight
                          size={16}
                          className={isSettingsActive ? "text-primary" : ""}
                        />
                      )}
                    </div>
                  </button>

                  {/* 子菜单 - 展开状态 */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      settingsOpen
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-4 transition-all duration-500">
                      <li className="transform transition-all duration-500 delay-100 hover:translate-x-1">
                        <NavLink
                          to="/settings/profile"
                          className={({ isActive }) => `
                        relative flex items-center py-1.5 px-3 text-sm rounded-md cursor-pointer 
                        transition-all duration-300 group w-full
                        ${isActive ? "bg-primary/10 font-medium text-primary" : "hover:bg-primary/10"}
                      `}
                          onClick={() => {
                            setSettingsOpen(false);
                          }}
                        >
                          <User
                            size={16}
                            strokeWidth={2}
                            className="transition-transform duration-300 group-hover:scale-110"
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
                        ${isActive ? "bg-primary/10 font-medium text-primary" : "hover:bg-primary/10"}
                      `}
                          onClick={() => {
                            setSettingsOpen(false);
                          }}
                        >
                          <KeyRound
                            size={16}
                            strokeWidth={2}
                            className="transition-transform duration-300 group-hover:scale-110"
                          />
                          <span className="ml-3 transition-all duration-300">
                            Account
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                // 收起状态：使用 Menus 组件弹出菜单
                <Menus>
                  <Toggle id="settings-menu">
                    <div className="relative flex items-center py-2 px-3 my-1 text-sm font-medium rounded-md cursor-pointer transition-colors group justify-center hover:bg-primary/10">
                      <div>
                        <Settings
                          size={20}
                          strokeWidth={2}
                          className={`transition-transform duration-300 ${isSettingsActive ? "text-primary" : ""}`}
                        />
                      </div>

                      {/* 收起状态时的悬停提示 */}
                      <div
                        className={`
                      absolute left-full rounded-md px-2 py-1 ml-6
                      text-sm bg-background text-foreground shadow-lg
                      invisible opacity-20 -translate-x-3 transition-all
                      group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                      z-50
                    `}
                      >
                        Settings
                      </div>
                    </div>
                  </Toggle>

                  <MenuList id="settings-menu" positionY={460} positionX={86}>
                    <div className="flex flex-col p-1 min-w-[180px]">
                      <MenusButton>
                        <NavLink
                          to="/settings/profile"
                          className={({ isActive }) => `
                        flex gap-2 items-center w-full px-3 py-2 rounded-md
                        transition-all duration-200 hover:gap-3
                        ${isActive ? "bg-primary/10 font-medium text-primary" : "hover:bg-primary/10"}
                      `}
                          // 点击菜单项关闭
                        >
                          <User size={18} strokeWidth={1.5} />
                          <span>Profile</span>
                        </NavLink>
                      </MenusButton>
                      <MenusButton>
                        <NavLink
                          to="/settings/account"
                          className={({ isActive }) => `
                        flex gap-2 items-center w-full px-3 py-2 rounded-md
                        transition-all duration-200 hover:gap-3
                        ${isActive ? "bg-primary/10 font-medium text-primary" : "hover:bg-primary/10"}
                      `}
                          // 点击菜单项关闭
                        >
                          <KeyRound size={18} strokeWidth={1.5} />
                          <span>Account</span>
                        </NavLink>
                      </MenusButton>
                    </div>
                  </MenuList>
                </Menus>
              )}
            </ul>

            {/* 原有用户菜单代码保持不变 */}
            <Menus>
              <Toggle id="user-menu">
                <div
                  className={`w-full flex p-1 rounded-md cursor-pointer text-start items-center transition-all duration-300 ${
                    expanded ? "justify-start gap-2" : "justify-center gap-0"
                  }`}
                >
                  <div className="flex justify-center items-center w-10 h-10 rounded-md text-amber-50 font-semibold transition-transform duration-300">
                    <img
                      className="w-full h-full rounded-md"
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
                        className="transition-transform duration-300 hover:rotate-180"
                      />
                    </div>

                    <MenuList
                      id="user-menu"
                      positionY={24}
                      positionX={expanded ? 250 : 86}
                    >
                      <div className="flex flex-col">
                        <ProfileItem onClick={() => onClose?.()} />
                        <MenusButton>
                          <div
                            className="flex gap-2 items-center transition-all duration-200 hover:gap-3"
                            onClick={() => onClose?.()} // 点击菜单项关闭
                          >
                            <IdCard size={18} strokeWidth={1.5} />
                            <Link
                              to="/account"
                              className="transition-all duration-200"
                            >
                              Account
                            </Link>
                          </div>
                        </MenusButton>

                        <MenusButton onClick={toggleDarkMode}>
                          {isDarkMode ? (
                            <div className="flex gap-2 items-center transition-all duration-200 hover:gap-3">
                              <Sun size={18} strokeWidth={1.5} />
                              <span className="transition-all duration-200">
                                Light Mode
                              </span>
                            </div>
                          ) : (
                            <div className="flex gap-2 items-center transition-all duration-200 hover:gap-3">
                              <Moon size={18} strokeWidth={1.5} />
                              <span className="transition-all duration-200">
                                Dark Mode
                              </span>
                            </div>
                          )}
                        </MenusButton>

                        <MenusButton onClick={logout} disabled={isPending}>
                          <div className="text-red-500 flex gap-2 items-center transition-all duration-200 hover:gap-3">
                            <LogOut size={18} strokeWidth={1.5} />
                            <span className="transition-all duration-200">
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
      </motion.div>
    </div>
  );
};

export default SliderSidebar;
