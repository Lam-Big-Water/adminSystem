import { NavLink } from "react-router-dom";

const SidebarItem = ({ expanded, icon, text, link }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `relative flex items-center py-2 px-3 my-1 text-sm font-medium rounded-md cursor-pointer transition-colors group 
        ${isActive ? "bg-primary/10" : "hover:bg-primary/10"}
        ${expanded ? "justify-start" : "justify-center"}`
      }
      end={link === "/dashboard"}
    >
      {({ isActive }) => (
        <>
          <div>
            {icon}
          </div>
          
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-32 ml-3" : "w-0"
            } ${isActive ? "font-bold" : ""}`}
          >
            {text}
          </span>

          {!expanded && (
            <div
              className={`
                absolute left-full rounded-md px-2 py-1 ml-6
                text-sm bg-background text-foreground shadow-lg
                invisible opacity-20 -translate-x-3 transition-all
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                z-50
              `}
            >
              {text}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;