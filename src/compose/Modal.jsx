import { cloneElement, createContext, useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

import FocusLock from 'react-focus-lock';



import { useOutsideClick } from "../hooks/useOutsideClick";

const ModalContext = createContext(null);

export const Modal = ({ children }) => {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

export const ModalOpen = ({ children, opens: opensWindowName }) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
};

export const ModalWindow = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <FocusLock>
    <div  className="fixed top-0 left-0 w-full h-screen transition-colors backdrop-blur-sm z-100">
      <div
        className="max-h-[90vh] w-[60%] max-w-[800px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] transition-all bg-[var(--color-block)] text-sm font-medium text-[var(--text-primary)] p-6 border-[1.4px] border-[var(--color-border)] rounded-2xl overflow-y-scroll"
        ref={ref}
      >

        <div className="py-10">{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>
     </FocusLock>,
    document.querySelector("#actionList")
  );
};
