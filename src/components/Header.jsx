import React from "react";
import { useUser } from "../query/auth/useUser";

import { SunMedium, Settings, Moon, PanelLeft } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";
import { Link } from "react-router-dom";

const Header = ({ handleClick }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user } = useUser();
  const { fullName = "Sam Lam" } = user?.user_metadata || {};
  const initials = fullName.charAt(0).toUpperCase();

  return (
    <div className="sticky top-0 bg-background/50 p-4 text-foreground backdrop-blur-sm z-50 w-full h-16 flex gap-4 items-center justify-end">
      <button
        onClick={handleClick}
        className="w-10 h-10 flex justify-center items-center mr-auto border-2 border-border rounded-lg text-foreground hover:bg-muted cursor-pointer transition-all duration-200 active:scale-95"
      >
        <PanelLeft size={20} strokeWidth={2} />
      </button>

      <button
        onClick={toggleDarkMode}
        className="p-1 w-10 h-10 flex justify-center items-center rounded-full hover:bg-muted"
      >
        {isDarkMode ? (
          <Moon size={24} strokeWidth={2} />
        ) : (
          <SunMedium size={24} strokeWidth={2} />
        )}
      </button>
      <button className="p-1 w-10 h-10 rounded-full hover:bg-muted">
        <Link
          className="w-full h-full flex justify-center items-center"
          to="/settings"
        >
          <Settings size={20} strokeWidth={2} />
        </Link>
      </button>
      <button className="bg-muted p-1 w-10 h-10 rounded-full">
        <Link
          className="w-full h-full flex justify-center items-center"
          to="/settings"
        >
          {initials}
        </Link>
      </button>
    </div>
  );
};

export default Header;
