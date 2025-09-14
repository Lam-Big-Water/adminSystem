import React from "react";
import Filter from "./Filter";
import SortBy from "./SortBy";
import SelectPro from "./SelectPro";

import { HiOutlineClipboard, HiArrowsUpDown } from "react-icons/hi2";

const BookingTableOperations = () => {
  return (
    <div className="flex justify-between gap-4 max-lg:justify-end">
      <div className="max-lg:hidden">
        <Filter
          filterField="Status"
          options={[
            { value: "all", label: "All" },
            { value: "checked-out", label: "Checked out" },
            { value: "checked-in", label: "Checked in" },
            { value: "unconfirmed", label: "Unconfirmed" },
          ]}
        />
      </div>
      <div className="lg:hidden">
        <SelectPro
          icon={<HiOutlineClipboard className="text-xl"/>}
          filterField="Status"
          options={[
            { value: "all", label: "All" },
            { value: "checked-out", label: "Checked out" },
            { value: "checked-in", label: "Checked in" },
            { value: "unconfirmed", label: "Unconfirmed" },
          ]}
        />
      </div>

      {/* <SortBy 
      options={[
        { value: "startDate-desc", label: "Sort by date" },
        { value: "startDate-asc", label: "Sort by date (earlier first)" },
        {
          value: "totalPrice-desc",
          label: "Sort by amount (high first)",
        },
        { value: "totalPrice-asc", label: "Sort by amount (low first)" },
      ]}
      /> */}
      <SelectPro
        icon={<HiArrowsUpDown className="text-xl"/>}
        filterField="SortBy"
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
  );
};

export default BookingTableOperations;
