import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";

const AppLayout = () => {

    const [expanded, setExpanded] = React.useState(true);
    const handleClick = () => setExpanded(!expanded);


  return (
    <div className="relative w-full min-h-svh">
      <div className="flex gap-2 w-full overflow-y-hidden">
        <Sidebar expanded={expanded} handleClick={setExpanded}/>
        <div className="flex-1 flex flex-col w-full bg-background overflow-auto h-screen">
          <Header handleClick={handleClick}/>
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
