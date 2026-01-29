import React from "react";
import SignUp from "../SignUp";
import UsersTable from "../components/UsersTable";
import TableCaption from "../components/UsersCaption";
import Caption from "@components/Caption";
import SearchBar from "@components/SearchBar";
import Popover from "@components/Popover";
import FilterPopover from "@/components/FilterPopover";
import { Telescope } from "lucide-react";

const user = () => {
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <Telescope size={64} strokeWidth={2} />
        <h1 class="text-4xl leading-tight font-bold">Coming Soon!</h1>
        <p className="text-center text-muted-foreground max-w-64">
          This page has not been created yet. Stay tuned though!
        </p>
      </div>
    </div>

    // <div className="py-6 px-4 max-w-7xl w-full mx-auto">
    //   <Caption
    //     title="User List"
    //     description="Manage your users and their roles here."
    //   >
    //     <div className="flex items-center gap-2">
    //       <button className="flex h-9 items-center gap-1 border border-border text-sm font-medium text-foreground bg-background  py-1 px-3 rounded-md hover:bg-accent transition-colors duration-200">
    //         Invite User
    //       </button>

    //       <button className="flex h-9 items-center gap-1 border border-border text-sm font-medium text-primary-foreground bg-primary  py-1 px-3 rounded-md hover:bg-primary/90 transition-colors duration-200">
    //         Add User
    //       </button>
    //     </div>
    //   </Caption>

    //   <div className="flex gap-2 my-4 items-center">
    //     <SearchBar />

    //     <Popover />

    //     <FilterPopover />
    //   </div>

    // </div>
  );
};

export default user;
