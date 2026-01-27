import React from "react";
import { BadgeCheck, BadgeX } from 'lucide-react';
import { ToastContext } from "./context/Toast/ToastProvider";
import { format } from "date-fns";


const ICONS_BY_VARIANT = {
  success: BadgeCheck,
  error: BadgeX,
};

const Toast = ({ id, variant, children }) => {
  const { dismissToast } = React.useContext(ToastContext);
  const Icon = ICONS_BY_VARIANT[variant];
  const timerRef = React.useRef(null);

  function formatDateTime(date) {
    return format(date, "eeee, MMMM dd, yyyy 'at' h:mm a");
  }

  React.useEffect(() => {
    timerRef.current = setTimeout(() => {
      dismissToast(id);
    }, 5000);

    return () => clearTimeout(timerRef.current);
  }, [id, dismissToast]);

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      dismissToast(id);
    }, 5000);
  };

  return (
    <div
      className="flex gap-4 p-4 border border-border rounded-md shadow-sm items-center bg-background text-foreground font-medium text-sm toastWrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <h2 className="flex items-center gap-2">
          <Icon size={24} />
          {children}
        </h2>
        <small>{formatDateTime(new Date())}</small>
      </div>
      <button
        className="px-2 py-1.5 rounded-sm text-xs font-normal bg-primary text-primary-foreground"
        onClick={() => dismissToast(id)}
      >
        Undo
      </button>
    </div>
  );
};

export default Toast;
