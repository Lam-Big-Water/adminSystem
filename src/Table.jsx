import React from "react";
import { useGetCabinsByOpt } from "./query/cabins/useGet";
import Row from "./Row";
import TableSkeleton from "./TableSkeleton";
import Pagination from "./Pagination";
import AddCabin from "./AddCabin";
import Filter from "./Filter";
import TableCaption from "./components/TableCaption";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

const Table = () => {
  const { data, count, isPending } = useGetCabinsByOpt();
  const [sortColumn, setSortColumn] = React.useState(null);
  const [sortDirection, setSortDirection] = React.useState(null);



const sortedData = React.useMemo(() => {
    if (!data || !sortColumn || !sortDirection) return data || [];

    return [...data].sort((a, b) => {
      const aVal = a[sortColumn] ?? "";
      const bVal = b[sortColumn] ?? "";

      if (sortColumn === "joinDate") {
        const aDate = new Date(aVal).getTime();
        const bDate = new Date(bVal).getTime();
        return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  const handleSort = (column) => {
    let newDirection = "asc";

    if (sortColumn === column) {
      if (sortDirection === "asc") {
        newDirection = "desc";
      } else if (sortDirection === "desc") {
        newDirection = null;
      }
    }
    
    setSortColumn(newDirection ? column : null);
    setSortDirection(newDirection);
  };

    const getSortIcon = (column) => {
    if (sortColumn !== column) {
        return <ArrowUpDown className="h-4 w-4" />
    }

    if (sortDirection === "asc") {
      return <ArrowUp className="h-4 w-4" />;
    }

    if (sortDirection === "desc") {
      return <ArrowDown className="h-4 w-4" />;
    }
    return <ArrowUpDown className="h-4 w-4" />;
  }

    if (isPending)
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
      <div>
        <TableCaption />
      </div>
      <div className="min-h-full mt-6 overflow-x-hidden">
        <div className="overflow-y-auto w-full rounded-2xl border-[1.4px] border-[var(--color-border)]">
          <table className="w-full whitespace-nowrap text-left text-sm font-normal text-[var(--text-primary)] border-collapse border-spacing-0">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left">
                  Image
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                  >
                    Name
                    {getSortIcon("name")}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort("maxCapacity")}
                    className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                  >
                    MaxCapacity
                    {getSortIcon("maxCapacity")}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort("regularPrice")}
                    className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                  >
                    RegularPrice
                    {getSortIcon("regularPrice")}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort("discount")}
                    className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                  >
                    discount
                    {getSortIcon("discount")}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((cabin, i) => (
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
