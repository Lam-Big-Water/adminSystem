import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  LayoutDashboard,
  LayoutList,
  Logs,
  Settings,
  Users,
} from "lucide-react";
import React from "react";
import SidebarItem from "./SidebarItem";
import { Modal } from "../compose/Modal";
import { Menus, Toggle, List, Button } from "../compose/Menus";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <div>
      <aside className="h-full flex">
        <nav className="h-full flex flex-col bg-amber-50 dark:bg-black text-black dark:text-amber-50 font-medium border-r shadow-sm p-2">
          <div className="p-4 pb-2 flex justify-between items-center">
            <div
              className={`rounded-sm overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
            >
              Admin
            </div>

            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg text-black cursor-pointer dark:text-amber-50 bg-gray-50 dark:bg-black hover:bg-gray-100 dark:hover:bg-gary-100/10 dark:hover:text-black"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <ul className="flex flex-col gap-0.5 flex-1 px-3">
            <SidebarItem
              icon={<LayoutDashboard />}
              text="Dashboard"
              link="/dashboard"
              alert={false}
              active={true}
              expanded={expanded}
            />

            <SidebarItem
              icon={<Logs />}
              text="Bookings"
              link="/bookings"
              alert={false}
              active={false}
              expanded={expanded}
            />

            <SidebarItem
              icon={<LayoutList />}
              text="Cabins"
              link="/cabins"
              alert={false}
              active={false}
              expanded={expanded}
            />

            <SidebarItem
              icon={<Users />}
              text="Users"
              link="/users"
              alert={false}
              active={false}
              expanded={expanded}
            />

            <SidebarItem
              icon={<Settings />}
              text="Settings"
              link="/settings"
              alert={false}
              active={false}
              expanded={expanded}
            />
          </ul>

          <div
            className={`flex p-3 ${expanded ? "justify-between" : "justify-center"}`}
          >
            <div className="flex justify-center items-center w-10 h-10 p-1 rounded-md bg-indigo-300 text-amber-50 font-semibold">
              Sam
            </div>

            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Sam Lam</h4>
                <span className="text-xs">SamLam@gmail.com</span>
              </div>
              <Modal>
                <Menus>
                  <Toggle
                    styles="flex justify-center w-7 p-1 hover:bg-[var(--color-block)] cursor-pointer rounded-sm"
                    positionY={-164}
                    positionX={260}
                    icon={<MoreVertical size={20} />}
                    className="p-1.5 rounded-lg text-black cursor-pointer dark:text-amber-50 bg-gray-50 dark:bg-black hover:bg-gray-100 dark:hover:bg-gary-100/10 dark:hover:text-black"
                    
                  />
                    <List>
                      <Button>Logout</Button>
                    </List>
                </Menus>
              </Modal>
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
