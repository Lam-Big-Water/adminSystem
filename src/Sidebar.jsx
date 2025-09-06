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
  const [barToggle, setBarToggle] = React.useState(true);
  const { isLoading, logout } = useLogout();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <>
      <div className={`flex flex-col w-full h-full  text-[var(--color-primary)] border-r border-[var(--color-border)] ${barToggle ? " max-w-72 p-6" : " max-w-10 py-6"}`}>
        <div className={`flex py-2 px-2 ${barToggle ? "justify-between" : "justify-center"}`}>
          <h2 className={`${barToggle ? "block" : "hidden"}`}>THE WILD OASIS</h2>
          <button onClick={() => setBarToggle(!barToggle)}>⍃</button>
        </div>
        <ul className={`flex flex-col gap-2 ${barToggle ? "block" : "hidden"}`}>
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
        <div className={`mt-auto ${barToggle ? "block" : "hidden"}`}>
        <Modal>
          <Menus>
            <ProfileItem>
              <Toggle className="text-xl" positionY={-122} positionX={240} />

              <List>
                <ProfileItem />

                <Button
                  icon={<HiOutlineUserCircle className="text-[1.3rem]" />}
                >
                  <Link to="/account">Account</Link>
                </Button>
                <Button
                  onClick={toggleDarkMode}
                  icon={
                    isDarkMode ? (
                      <HiOutlineSun className="text-[1.3rem]" />
                    ) : (
                      <HiOutlineMoon className="text-[1.3rem]" />
                    )
                  }
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
        </div>
      </div>
    </>
  );
};

export default Sidebar;
