import React from "react";
import Filter from "./Filter";
import SearchBar from "./SearchBar";

const BookingTableOperations = () => {
  return (
    <div className="flex gap-2 items-center">
      {/* <input
        type="text"
        className="w-full max-w-32 h-8 min-w-0 px-3 py-1 text-base shadow-xs border rounded-md col-span-4  placeholder:text-zinc-400 max-sm:w-full"
      /> */}
      <SearchBar />
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
  );
};

export default BookingTableOperations;
