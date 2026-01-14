import React from "react";
import Table from "../Table";
import Filter from "../Filter";
import TableCaption from "../components/TableCaption";

const cabin = () => {
  return (
    <>
      
      <div>
        <TableCaption />
      </div>
      <div className="flex justify-between items-center">
        <Filter
          filterField="discount"
          options={[
            { value: "all", label: "All" },
            { value: "no-discount", label: "No discount" },
            { value: "with-discount", label: "With discount" },
          ]}
        />
      </div>
      <Table />
    </>
  );
};

export default cabin;
