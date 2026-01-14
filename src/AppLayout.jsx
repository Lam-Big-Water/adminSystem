import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

// import Sidebar from "./Sidebar";
import Sidebar from "./components/Sidebar"

const AppLayout = () => {
  // const [slide, setSlide] = React.useState(false);
  // const handleSlide = () => setSlide(!slide);
  // console.log(slide)

  return (
    <div className="relative w-full h-screen">
      <div className="flex gap-2 w-full overflow-y-hidden h-screen">
        <Sidebar />
        {/* <Sidebar slide={slide} handleSlide={handleSlide}/> */}
        <div className="w-full m-auto overflow-auto h-screen px-4 py-6">
          <Header />
          {/* <Header handleSlide={handleSlide}/> */}
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
