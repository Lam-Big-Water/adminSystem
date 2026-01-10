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
            <button class="flex items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground w-36 ">
              <span className="uppercase">{currentFilter}</span>
              <ChevronDown size={18} strokeWidth={1.5} />
            </button>

            <MenuList id="filter" positionX={540} positionY={500}>
              <div class="text-left p-1 h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1">
                {options.map((option) => (
                    <MenusButton key={option.value} onClick={() => handleClick(option.value)}>
                      {option.label}
                    </MenusButton>
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
