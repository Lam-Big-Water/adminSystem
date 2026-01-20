import React from "react";
import Filter from "./Filter";
import SearchBar from "./SearchBar";

const BookingTableOperations = () => {
  return (
    <div className="flex gap-2 my-4 items-center">
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
