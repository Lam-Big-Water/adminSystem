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
  className,
  positionY = 8,
  positionX = 0,
}) => {
  const { openId, close, open, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x - positionX,
      y: rect.y + rect.height + positionY,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};

export const List = ({ id, children, className }) => {
  const { openId, position, close } = useContext(MenuContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <FocusLock>
      <div
        className="fixed z-50"
        style={{
          right: position?.x,
          top: position?.y,
        }}
      >
        <ul className={className} ref={ref}>
          {children}
        </ul>
      </div>
    </FocusLock>,
    document.getElementById('portal'),
  );
};

export const Button = ({ children, onClick, className }) => {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};
