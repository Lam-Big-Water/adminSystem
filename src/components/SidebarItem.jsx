import {Link} from "react-router-dom";

const SidebarItem = ({ expanded, icon, text, link, active, alert }) => {
  return (
    <li
      className={`relative dark:text-amber-50 flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group 
    ${
      active
        ? "justify-center bg-zinc-600"
        : "justify-center hover:bg-zinc-600"
    }`}
    >
      {icon}

      <Link
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}

        to={link}
      >
        {text}
      </Link>

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
                text-zinc-600 bg-gray-100 text-sm
                invisible opacity-20 -translate-x-3 transition-all
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export default SidebarItem;