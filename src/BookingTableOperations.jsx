import React from 'react'
import Filter from "./Filter";
import SortBy from "./SortBy";
import SelectPro from './SelectPro';

const BookingTableOperations = () => {
  return (
    <div className='flex justify-between gap-4'>
      <div className="max-lg:hidden"><Filter filterField="status"
      options={[
        { value: "all", label: "All" },
        { value: "checked-out", label: "Checked out" },
        { value: "checked-in", label: "Checked in" },
        { value: "unconfirmed", label: "Unconfirmed" },
      ]}/></div>
      <div className="lg:hidden"><SelectPro
      filterField="status"
      options={[
        { value: "all", label: "All" },
        { value: "checked-out", label: "Checked out" },
        { value: "checked-in", label: "Checked in" },
        { value: "unconfirmed", label: "Unconfirmed" },
      ]}
      /></div>
      
      
      <SortBy 
      options={[
        { value: "startDate-desc", label: "Sort by date" },
        { value: "startDate-asc", label: "Sort by date (earlier first)" },
        {
          value: "totalPrice-desc",
          label: "Sort by amount (high first)",
        },
        { value: "totalPrice-asc", label: "Sort by amount (low first)" },
      ]}
      />
    </div>
  )
}

export default BookingTableOperations