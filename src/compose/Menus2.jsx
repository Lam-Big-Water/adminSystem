import React from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const MenuContext = React.createContext(null);

export const Menus = ({ children }) => {
  const [openId, setOpenId] = React.useState("");

  const close = () => setOpenId("");

  const open = setOpenId;

  return (
    <MenuContext.Provider value={{ openId, close, open }}>
      {children}
    </MenuContext.Provider>
  );
};

export const Toggle = ({ id, children }) => {
  const context = React.useContext(MenuContext);
  if (!context) return null;
  const { openId, close, open } = context;

  function handleClick() {
    if (openId === "" || openId !== id) {
      open(id);
    } else {
      close();
    }
  }

  return (
    <button className="relative" onClick={handleClick}>
      {children}
    </button>
  );
};

export const MenuList = ({ id, children, positionY = 8, positionX = 0 }) => {
  console.log(positionX, positionY);
  const context = React.useContext(MenuContext);
  const ref = useOutsideClick(() => {
    if (context) {
      context.close();
    }
  }, true);
  if (!context) return null;
  const { openId } = context;

  if (openId !== id) return null;

  return createPortal(
    <div
      style={{
        bottom: `${positionY}px`,
        left: `${positionX}px`,
      }}
      className="fixed z-50"
    >
      <ul
        className="overflow-hidden last:border-b-0 font-medium bg-white text-slate-950 dark:bg-black dark:text-white border border-stone-200 dark:border-stone-900
 rounded-lg text-sm"
        ref={ref}
      >
        {children}
      </ul>
    </div>,
    document.body
  );
};

export const MenusButton = ({ children, onClick }) => {
  const context = React.useContext(MenuContext);
  if (!context) return null;
  const { close } = context;

  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li
      className="text-slate-950 dark:text-slate-200
     bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-900"
    >
      <button
        className="cursor-pointer w-full py-2.5 pl-2 pr-6 hover:bg-gray-200 dark:hover:bg-neutral-800/70"
        onClick={handleClick}
      >
        {children}
      </button>
    </li>
  );
};
