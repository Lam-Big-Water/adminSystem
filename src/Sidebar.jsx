import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineBookmark,
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


const Sidebar = () => {
  const [barToggle, setBarToggle] = React.useState(true);
  const { isLoading, logout } = useLogout();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <>
      <div className={`flex flex-col w-full h-full  text-[var(--color-primary)] border-r border-[var(--color-border)] ${barToggle ? " max-w-70 p-4" : " max-w-10 py-4"}`}>
        <div className={`flex py-2 px-2 ${barToggle ? "justify-between" : "justify-center"}`}>
          <h2 className={`font-medium text-base ${barToggle ? "block" : "hidden"}`}>THE WILD OASIS</h2>
          <button className="font-medium text-base cursor-pointer" onClick={() => setBarToggle(!barToggle)}>
            <span className="p-2">⍃</span>
          </button>
        </div>
        <ul className={`flex flex-col gap-2 ${barToggle ? "block" : "hidden"}`}>
          <Link
            to="/dashboard"
            className="flex font-medium text-base items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
          >
            <HiOutlineHome className="font-medium text-lg"/>
            <span>Home</span>
          </Link>
          <Link
            to="/bookings"
            className="flex font-medium text-base items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
          >
            <HiOutlineBookmark className="font-medium text-lg"/>
            <span>Bookings</span>
          </Link>
          <Link
            to="/cabins"
            className="flex font-medium text-base items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
          >
            <HiCubeTransparent className="font-medium text-lg"/>
            <span>Cabins</span>
          </Link>
          <Link
            to="/user"
            className="flex font-medium text-base items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
          >
            <HiOutlineUsers className="font-medium text-lg"/>
            <span>User</span>
          </Link>
          <Link
            to="setting"
            className="flex font-medium text-base items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
          >
            <HiOutlineCog8Tooth className="font-medium text-lg"/>
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
