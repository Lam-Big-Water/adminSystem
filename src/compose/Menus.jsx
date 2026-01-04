import { useState, useContext, createContext } from "react";
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
  children,
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
    <button className="p-1 rounded-sm hover:bg-primary/10" onClick={handleClick}>
      {children}
    </button>
  );
};

export const List = ({ id, children }) => {
  const { openId, position, close } = useContext(MenuContext);
  const ref = useOutsideClick(close, true);

  if (openId !== id) return null;

  return createPortal(
    <FocusLock>
      <div className="fixed z-50" style={{
            right: position?.x,
            top: position?.y,
          }}>
        <ul
          className="overflow-hidden font-medium select-none flex flex-col justify-start items-start gap-1 bg-background p-1 border border-border rounded-md"
          ref={ref}
          
        >
          {children}
        </ul>
      </div>
    </FocusLock>,
    document.querySelector("body")
  );
};

export const Button = ({ children, onClick }) => {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li className="last:border-b-0 w-full text-foreground text-sm border-b border-border">
      <button
        className="cursor-pointer w-full py-2.5 pl-2 pr-6 hover:bg-gray-200 dark:hover:bg-neutral-800/70 rounded-sm"
        onClick={handleClick}
      >
        {children}
      </button>
    </li>
  );
};
