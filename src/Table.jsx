import React from "react";
import { useGetCabinsByOpt } from "./query/cabins/useGet";
import Row from "./Row";
import TableSkeleton from "./TableSkeleton";
import Pagination from "./Pagination";
import AddCabin from "./AddCabin";
import Filter from "./Filter";

const Table = () => {
  const { data, count, isLoading } = useGetCabinsByOpt();

  if (isLoading)
    return (
      <div className="min-h-full flex flex-col items-center p-6">
        <TableSkeleton />
      </div>
    );

  return (
    <>
      <div className="flex justify-between items-center">
        <AddCabin />
        <Filter
          filterField="discount"
          options={[
            { value: "all", label: "All" },
            { value: "no-discount", label: "No discount" },
            { value: "with-discount", label: "With discount" },
          ]}
        />
      </div>
      <div className="min-h-full mt-6 overflow-x-hidden">
        <div className="overflow-y-auto w-full rounded-2xl border-[1.4px] border-[var(--color-border)]">
          <table className="w-full whitespace-nowrap text-left text-sm font-normal text-[var(--text-primary)] border-collapse border-spacing-0">
            <thead className="bg-[var(--color-block)]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 sticky top-0 left-0 z-10 backdrop-blur-sm"
                >
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((cabin, i) => (
                <Row i={i} key={cabin.id} cabin={cabin} />
              ))}
            </tbody>
          </table>
        </div>
        <Pagination count={count} />
      </div>
    </>
  );
};

export default Table;
