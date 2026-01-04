import React from "react";
import { useSearchParams } from "react-router-dom";
import { Menus, Toggle, MenuList, MenusButton } from "../compose/Menus2";
import { ChevronDown } from "lucide-react";
const Filter = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultFilter = options[0]?.value || "";
  const currentFilter = searchParams.get(filterField) || defaultFilter;

  function handleClick(value) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(filterField, value);

    setSearchParams(newParams);
  }

  return (
    <div>
      <Menus>
        <Toggle id="filter">
          <div className="w-full flex p-1 rounded-md cursor-pointer text-start items-center">
            <div className="flex justify-between gap-2 items-center font-medium tracking-tight w-36 py-1 px-2 border border-border rounded-md">
              <span className="">{currentFilter}</span>
              <ChevronDown size={18} strokeWidth={1.5} />
            </div>

            <MenuList id="filter" positionX={460} positionY={500}>
              <div className="flex flex-col">
                {options.map((option) => (
                  <React.Fragment key={option.value}>
                    <MenusButton onClick={() => handleClick(option.value)}>
                      {option.label}
                    </MenusButton>
                  </React.Fragment>
                ))}
              </div>
            </MenuList>
          </div>
        </Toggle>
      </Menus>
    </div>
  );
};

export default Filter;
