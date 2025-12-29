import React from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";


const ModalContext = React.createContext(null);

export const Modal = ({ children }) => {
  const [openName, setOpenName] = React.useState("");

  const close = () => setOpenName("");

  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

export const Open = ({
  children,
  opensWindowName,
}) => {
  const context = React.useContext(ModalContext);
  if (!context) return null;
  if (!React.isValidElement(children)) return null;
  const { open } = context;

  return React.cloneElement(
    children,
    { onClick: () => open(opensWindowName) }
  );
};

export const Window = ({
  children,
  name,
}) => {
  const context = React.useContext(ModalContext);
  
  const handleClose = React.useCallback(() => {
    if (context) {
      context.close();
    }
  }, [context]); 

  const ref = useOutsideClick(handleClose, true);
  
  if (!context) return null;
  if (!React.isValidElement(children)) return null;

  const { openName, close } = context;

  if (openName !== name) return null;

  return createPortal(
    <div
      className="fixed inset-0 w-full h-screen bg-black/10 z-100 transition-all duration-500 backdrop-blur-xs"
    >
      <div className="" ref={ref}>
        {React.cloneElement(
          children,
          { onCloseModal: close }
        )}
      </div>
    </div>,
    document.body
  );
};