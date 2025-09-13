import React, { useState, useContext, createContext } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

import FocusLock from "react-focus-lock";

const MenuContext = createContext();

export const Menus = ({ children }) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <MenuContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const Toggle = ({
  id,
  text,
  icon,
  styles,
  positionY = 8,
  positionX = 0,
}) => {
  const { openId, close, open, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x - positionX,
      y: rect.y + rect.height + positionY,
    });

    if (openId === "" || openId !== id) {
      open(id); // 如果当前无打开项或ID不匹配，则打开新项
    } else {
      close(); // 否则关闭当前项
    }
  }

  return (
    <button className={styles} onClick={handleClick}>
      <div className="flex gap-2 justify-center items-center">
        {text && <span>{text}</span>}
        {icon && <span>{icon}</span>}
      </div>
    </button>
  );
};

export const List = ({ id, children }) => {
  const { openId, position, close } = useContext(MenuContext);
  const ref = useOutsideClick(close, true);

  if (openId !== id) return null;

  return createPortal(
    <FocusLock>
      <ul
        className="flex flex-col justify-start items-start p-1 bg-[var(--color-bg)] border-[1px] border-[var(--color-border)] fixed z-100 rounded-md"
        ref={ref}
        style={{
          right: position?.x,
          top: position?.y,
        }}
      >
        {children}
      </ul>
    </FocusLock>,
    document.querySelector("body")
  );
};

export const Button = ({ styles, children, icon, onClick }) => {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li className="w-full overflow-hidden text-sm text-[var(--text-primary)] font-normal rounded-lg transition-colors">
      <button
        className={`w-full h-full flex justify-start items-center cursor-pointer p-2 gap-2 hover:bg-[var(--hover-highlight)] ${styles}`}
        onClick={handleClick}
      >
        {icon && <span className="text-base">{icon}</span>}
        {children && <span className="">{children}</span>}
      </button>
    </li>
  );
};
