import React from "react";
import { useSearchParams } from "react-router-dom";
import { Menus, Toggle, List, Button } from "../compose/Menus";
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
        <Toggle
          className="rounded-md focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
          id="filter"
          positionX={0}
          positionY={6}
        >
          <div class="flex items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm whitespace-nowrap shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 w-36 ">
            <span className="capitalize text-sm">{currentFilter}</span>
            <ChevronDown size={18} strokeWidth={1.5} />
          </div>
        </Toggle>

        <List
          id="filter"
          className="flex flex-col p-1 bg-background text-foreground border border-border shadow-sm rounded-lg"
        >
          {options.map((option) => (
            <Button
              className="flex py-1.5 ps-2 pe-8 text-sm text-left rounded-md hover:bg-muted "
              key={option.value}
              onClick={() => handleClick(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </List>
      </Menus>
    </div>
  );
};

export default Filter;
