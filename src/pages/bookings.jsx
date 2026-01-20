import React from "react";
import BookingTable from "../components/BookingTable";
import BookingTableOperations from "../components/BookingTableOperations";
import Caption from "@/components/Caption";

const bookings = () => {
  return (
    <div className="py-6 px-4 max-w-7xl w-full mx-auto">
      <Caption
        title="Bookings"
        description="Manage your team members and their roles. Click column headers to sort."
      ></Caption>
      <BookingTableOperations />
      <div className="w-full border-b border-border shadow-sm"></div>

      <BookingTable />
    </div>
  );
};

export default bookings;
