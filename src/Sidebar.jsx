import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineViewColumns } from "react-icons/hi2";
import {
  HiOutlineHome,
  HiOutlineBuildingStorefront,
  HiCubeTransparent,
  HiOutlineUsers,
  HiOutlineCog8Tooth,
  HiOutlineUserCircle,
  HiArrowRightOnRectangle,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi2";

import { Modal } from "./compose/Modal";
import { Menus, Toggle, List, Button } from "./compose/Menus";

import { useLogout } from "./query/auth/useLogout";
import ProfileItem from "./ProfileItem";

import { useDarkMode } from "./context/DarkModeContext";

import styles from "./styles.module.css";

const Sidebar = () => {
  const { isLoading, logout } = useLogout();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <>
      <div className={`w-[300px] flex-shrink-0 `}>
        <div className="fixed h-[95%] bg-[var(--color-block)] border-[1px] border-[var(--color-border)] rounded-2xl text-[var(--text-primary)] max-md:hidden">
          <h2 className="py-2 px-4">THE WILD OASIS</h2>
          <i className="block h-[1px] bg-[var(--color-border)]"></i>
          <nav className="h-[90%] flex flex-col p-2 justify-between">
            <ul className="flex flex-col gap-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
              >
                <HiOutlineHome />
                <span>Home</span>
              </Link>
              <Link
                to="/bookings"
                className="flex items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
              >
                <HiOutlineBuildingStorefront />
                <span>Bookings</span>
              </Link>
              <Link
                to="/cabins"
                className="flex items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
              >
                <HiCubeTransparent />
                <span>Cabins</span>
              </Link>
              <Link
                to="/user"
                className="flex items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
              >
                <HiOutlineUsers />
                <span>User</span>
              </Link>
              <Link
                to="setting"
                className="flex items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
              >
                <HiOutlineCog8Tooth />
                <span>Setting</span>
              </Link>
            </ul>
            <Modal>
              <Menus>
                <ProfileItem>
                  <Toggle
                    className="text-xl"
                    
                    positionY={-122}
                    positionX={240}
                  />

                  <List >
                  <ProfileItem />

                    <Button icon={<HiOutlineUserCircle className="text-[1.3rem]" />}>
                      <Link to="/account">Account</Link>
                    </Button>
                    <Button
                      onClick={toggleDarkMode}
                      icon={isDarkMode ? < HiOutlineSun className="text-[1.3rem]"/> : <HiOutlineMoon className="text-[1.3rem]" /> }
                    >
                      {isDarkMode ? "Light Mode" : "Dark Mode"}

                    </Button>
                    <Button
                      disabled={isLoading}
                      onClick={logout}
                      icon={<HiArrowRightOnRectangle className="text-[1.3rem]" />}
                    >
                      Log out
                    </Button>
                  </List>
                </ProfileItem>
              </Menus>
            </Modal>
          </nav>
        </div>
      </div>
      <div
        className={`w-[300px] z-120 flex-shrink-0 h-[90%] bg-[var(--color-block)] border-[1px] border-[var(--color-border)] rounded-2xl text-[var(--text-primary)] ${styles.sliderBar} md:hidden`}
      >
        <h2 className="py-2 px-4">THE WILD OASIS</h2>
        <i className="block h-[1px] bg-[var(--color-border)]"></i>
        <nav className="h-[90%] p-2">
          <ul className="h-[90%] flex flex-col gap-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
            >
              <HiOutlineHome />
              <span>Home</span>
            </Link>
            <Link
              to="/bookings"
              className="flex items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
            >
              <HiOutlineBuildingStorefront />
              <span>Bookings</span>
            </Link>
            <Link
              to="/cabins"
              className="flex items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
            >
              <HiCubeTransparent />
              <span>Cabins</span>
            </Link>
            <Link
              to="/user"
              className="flex items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
            >
              <HiOutlineUsers />
              <span>User</span>
            </Link>
            <Link
              to="setting"
              className="flex items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
            >
              <HiOutlineCog8Tooth />
              <span>Setting</span>
            </Link>
          </ul>
          <Modal>
            <Menus>
              <div className="flex items-center gap-2 p-2 hover:bg-[var(--color-block-hover)] rounded-md cursor-pointer">
                <img
                  className="w-8 h-8 rounded-lg"
                  src="https://ui.shadcn.com/avatars/shadcn.jpg"
                  alt="avatars"
                />
                <div className="">
                  <h2>Sam Lam</h2>
                  <small>SamLamShowroom@.com</small>
                </div>
                <Toggle
                  className="text-xl ml-auto"
                  id={"account"}
                  positionY={-110}
                  positionX={230}
                />

                <List id={"account"}>
                  <div className="flex items-center gap-2 p-2 hover:bg-[var(--color-block-hover)] rounded-md cursor-pointer">
                    <img
                      className="w-8 h-8 rounded-lg"
                      src="https://ui.shadcn.com/avatars/shadcn.jpg"
                      alt="avatars"
                    />
                    <div className="text-amber-50">
                      <h2>Sam Lam</h2>
                      <small className="text-[var(--text-second)] text-[12px]">
                        SamLamShowroom@.com
                      </small>
                    </div>
                  </div>
                  <div className="h-[1px] bg-[var(--color-border)]"></div>

                  <Button icon={<HiOutlineUserCircle className="text-lg" />}>
                    <Link to="/account">Account</Link>
                  </Button>
                  <Button
                    disabled={isLoading}
                    onClick={logout}
                    icon={<HiArrowRightOnRectangle className="text-lg" />}
                  >
                    Log out
                  </Button>
                </List>
              </div>
            </Menus>
          </Modal>
        </nav>

        <div className={styles.sliderButton}>
          <HiOutlineViewColumns />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
