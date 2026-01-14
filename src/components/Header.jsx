import React from "react";
import { SunMedium, Settings, Moon, PanelRightOpen } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <div className="w-full flex gap-4 items-center justify-end">
      {/* <button onClick={handleSlide} className="mr-auto sm:hidden">
        <PanelRightOpen />
      </button> */}
      <button
        onClick={toggleDarkMode}
        className="p-1 w-10 h-10 flex justify-center items-center rounded-full hover:bg-muted"
      >
        {isDarkMode ? <Moon /> : <SunMedium />}
      </button>
      <button className="p-1 w-10 h-10 flex justify-center items-center rounded-full hover:bg-muted">
        <Link to="/settings">
          <Settings />
        </Link>
      </button>
      <button className="bg-muted p-1 w-10 h-10 flex justify-center items-center rounded-full">
        <Link to="/settings">
          <span className="text-sm">SL</span>
        </Link>
      </button>
    </div>
  );
};

export default Header;
