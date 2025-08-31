import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SortBy = ({options}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy") || "";

    function handleChange (e) {
        searchParams.set("sortBy", e.target.value);
        setSearchParams(searchParams)
    }
  return (
    <Select 
        options={options}
        value={sortBy}
        onChange={handleChange}
    />
  )
}


const Select = ({options, value, onChange}) => {
    return (
        <select value={value} className='text-[var(--text-primary)] p-4 bg-[var(--color-block)] border-2 border-[var(--color-border)] rounded-2xl' onChange={onChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}
export default SortBy