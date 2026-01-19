import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

// import Sidebar from "./Sidebar";
import Sidebar from "./components/Sidebar";

const AppLayout = () => {
  // const [slide, setSlide] = React.useState(false);
  // const handleSlide = () => setSlide(!slide);
  // console.log(slide)

  return (
    <div className="relative w-full min-h-svh">
      <div className="flex gap-2 w-full overflow-y-hidden">
        <Sidebar />
        {/* <Sidebar slide={slide} handleSlide={handleSlide}/> */}
        <div className="flex-1 flex flex-col w-full bg-background overflow-auto h-screen rounded-2xl shadow-sm">
          <Header />
          {/* <Header handleSlide={handleSlide}/> */}
          <div className="max-w-7xl w-full m-auto px-4 py-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
