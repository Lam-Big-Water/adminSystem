import React from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { motion, AnimatePresence } from "motion/react";

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

export const Open = ({ children, id }) => {
  const context = React.useContext(ModalContext);
  const { open } = context;

  if (!React.isValidElement(children)) return null;

  return React.cloneElement(children, { onClick: () => open(id) });
};

export const Window = ({ children, id }) => {
  const context = React.useContext(ModalContext);
  const { close, openName } = context;
  const ref = useOutsideClick(close);

  if (!React.isValidElement(children)) return null;

  if (openName !== id) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="fixed inset-0 w-full h-screen bg-black/50 z-100"
      >
        <div className="" ref={ref}>
          {React.cloneElement(children, { onCloseModal: close })}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
