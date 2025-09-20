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
  HiEllipsisVertical
} from "react-icons/hi2";

import { Modal } from "./compose/Modal";
import { Menus, Toggle, List, Button } from "./compose/Menus";

import { useLogout } from "./query/auth/useLogout";
import ProfileItem from "./ProfileItem";

import { useDarkMode } from "./context/DarkModeContext";


const Sidebar = () => {
  const [barToggle, setBarToggle] = React.useState(false);
  const { isLoading, logout } = useLogout();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  function handleClose () {

  }
  return (
    <>
      <div className={`flex flex-col w-full max-w-[300px] h-full p-4 text-[var(--color-primary)] border-r border-[var(--color-border)] max-lg:hidden`}>
        <div className={`flex py-2 px-2`}>
          <h2 className={`font-medium text-base`}>THE WILD OASIS</h2>

        </div>
        <ul className={`flex flex-col gap-2`}>
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
        <div className={`mt-auto`}>
        <Modal>
          <Menus>
            <ProfileItem>
            <Toggle styles="flex justify-center w-7 p-1 hover:bg-[var(--color-block)] cursor-pointer rounded-sm" icon={<HiEllipsisVertical className="text-[1.3rem]"/>} className="text-xl" positionY={-164} positionX={260} />

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

      <div className={`absolute z-100 flex flex-col w-full max-w-[300px] bg-[var(--color-bg)] h-[80%] max-h-[900px] p-4 text-[var(--color-primary)] border border-[var(--color-border)] rounded-tr-2xl rounded-r-2xl lg:hidden ${barToggle ? "bottom-6 -left-0" : "top-0 -left-[300px]"}`}>
      <div className={`flex py-2 px-2`}>
          <h2 className={`font-medium text-base`}>THE WILD OASIS</h2>

        </div>
        <ul className={`flex flex-col gap-2`}>
        <Link
    to="/dashboard"
    className="flex font-medium text-base items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
    onClick={() => setBarToggle(false)} // Added here
  >
    <HiOutlineHome className="font-medium text-lg" />
    <span>Home</span>
  </Link>
  <Link
    to="/bookings"
    className="flex font-medium text-base items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
    onClick={() => setBarToggle(false)} // Added here
  >
    <HiOutlineBookmark className="font-medium text-lg" />
    <span>Bookings</span>
  </Link>
  <Link
    to="/cabins"
    className="flex font-medium text-base items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
    onClick={() => setBarToggle(false)} // Added here
  >
    <HiCubeTransparent className="font-medium text-lg" />
    <span>Cabins</span>
  </Link>
  <Link
    to="/user"
    className="flex font-medium text-base items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
    onClick={() => setBarToggle(false)} // Added here
  >
    <HiOutlineUsers className="font-medium text-lg" />
    <span>User</span>
  </Link>
  <Link
    to="setting"
    className="flex font-medium text-base items-center gap-2 hover:bg-[var(--color-block-hover)] p-2 rounded-sm cursor-pointer"
    onClick={() => setBarToggle(false)} // Added here
  >
    <HiOutlineCog8Tooth className="font-medium text-lg" />
    <span>Setting</span>
  </Link>
        </ul>
        <div className={`mt-auto`}>
        <Modal>
          <Menus>
            <ProfileItem>
              <Toggle styles="flex justify-center w-7 p-1 hover:bg-[var(--color-block)] cursor-pointer rounded-sm" icon={<HiEllipsisVertical className="text-[1.3rem]"/>} className="text-xl" positionY={-164} positionX={260} />

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
          <button className={`text-2xl text-[var(--text-primary)] absolute cursor-pointer ${barToggle ? "top-4 right-4" : "top-1/2 -right-4"}`} onClick={() => setBarToggle(!barToggle)}>
            <span className="bg-[var(--color-bg)]">⍃</span>
          </button>
      </div>

{/* <div className='flex flex-col max-w-[300px] w-full h-full border border-gray-400 text-lg font-medium text-amber-50 max-lg:hidden'>
        <div>
            <h1>Head - Title</h1>
        </div>
        <ul className='flex flex-col gap-4'>
            <li className=''>Link</li>
            <li className=''>Link</li>
            <li className=''>Link</li>
            <li className=''>Link</li>
            <li className=''>Link</li>
        </ul>
        <div>
           <div className='flex gap-4'>
             <button>1</button>
            <button>2</button>
           </div>
            <button>3</button>
        </div>
    </div> */}

{/* <div className={`absolute max-w-[300px] w-full h-full border border-gray-400 lg:hidden ${barToggle ? "top-0 -left-0" : "top-0 -left-[300px]"}`}>
            <span onClick={() => setBarToggle(!barToggle)} className='text-2xl text-amber-50 absolute top-1/2 -right-6'>
                ⍃
            </span>
        </div> */}
    </>
  );
};

export default Sidebar;
