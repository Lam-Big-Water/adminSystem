import { NavLink } from "react-router-dom";

const SidebarItem = ({ expanded, icon, text, link, alert }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `relative dark:text-amber-50 flex items-center py-2 px-3 my-1 text-sm font-medium rounded-md cursor-pointer transition-colors group 
        ${isActive ? "bg-gray-200 dark:bg-neutral-800/70" : "hover:bg-gray-200 dark:hover:bg-neutral-800/70"}
        ${expanded ? "justify-start" : "justify-center"}`
      }
      end={link === "/dashboard"} // 如果 dashboard 是根路径，需要精确匹配
    >
      {({ isActive }) => (
        <>
          <div className={`${isActive ? "font-black" : ""}`}>
            {icon}
          </div>
          
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-32 ml-3" : "w-0"
            } ${isActive ? "font-black" : ""}`}
          >
            {text}
          </span>

          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                expanded ? "" : "top-2"
              }`}
            />
          )}

          {!expanded && (
            <div
              className={`
                absolute left-full rounded-md px-2 py-1 ml-6
                bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white text-sm
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