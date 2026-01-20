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

  function handleClick(e) {
    e.stopPropagation();
    openId === "" || openId !== id ? open(id) : close();
  }

  return <div onClick={handleClick}>{children}</div>;
};

export const MenuList = ({
  id,
  children,
  positionY = 8,
  positionX = 0,
  className,
}) => {
  const context = React.useContext(MenuContext);
  const ref = useOutsideClick(() => {
    if (context) {
      context.close();
    }
  }, false);
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
      <ul className={className} ref={ref}>
        {children}
      </ul>
    </div>,
    document.body,
  );
};

export const MenusButton = ({ children, onClick, className }) => {
  const context = React.useContext(MenuContext);
  if (!context) return null;
  const { close } = context;

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
