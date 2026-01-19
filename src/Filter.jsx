import React from 'react';
import { useSearchParams } from 'react-router-dom';



const Filter = ({filterField, options}) => {
    
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultFilter = options[0]?.value || "";
    const currentFilter = searchParams.get(filterField) || defaultFilter;

    function handleClick (value) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(filterField, value);
        if (newParams.get("page")) newParams.set("page", "1");


        setSearchParams(newParams);
    }
  return (
    <div className="flex gap-2 text-sm font-medium bg-muted text-foreground rounded-lg p-1">
        {options.map((option) => (
            <button
            key={option.value}
            onClick={() => handleClick(option.value)}
            className={`rounded-md cursor-pointer py-1 px-1.5 hover:bg-card ${option.value === currentFilter ? "bg-card shadow-sm font-bold" : "text-muted-foreground"}`}
            >
                {option.label}
            </button>
        ))}


    </div>
  )
}

export default Filter