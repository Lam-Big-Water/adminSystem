import React from "react";
import { SunMedium, Settings, Moon, PanelRightOpen } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <div className="sticky top-0 bg-background/50 p-4 text-foreground backdrop-blur-sm z-50 w-full h-16 flex gap-4 items-center justify-end">
      {/* <button onClick={handleSlide} className="mr-auto sm:hidden">
        <PanelRightOpen />
      </button> */}
      <button
        onClick={toggleDarkMode}
        className="p-1 w-10 h-10 flex justify-center items-center rounded-full hover:bg-muted"
      >
        {isDarkMode ? <Moon size={24} strokeWidth={2}/> : <SunMedium size={24} strokeWidth={2}/>}
      </button>
      <button className="p-1 w-10 h-10 flex justify-center items-center rounded-full hover:bg-muted">
        <Link to="/settings">
          <Settings size={20} strokeWidth={2}/>
        </Link>
      </button>
      <button className="bg-muted p-1 w-10 h-10 flex justify-center items-center rounded-full">
        <Link to="/settings">
          <span className="font-medium">SL</span>
        </Link>
      </button>
    </div>
  );
};

export default Header;
