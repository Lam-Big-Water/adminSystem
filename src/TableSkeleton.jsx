import React from "react";

const TableSkeleton = ({ row = 5 }) => {
  return (
    <div className="w-full max-w-[50rem] border-[1.4px] border-[var(--border)] rounded-2xl overflow-auto element-with-scrollbar">
      <table className="w-full text-left text-sm font-normal border-collapse border-spacing-0">
        <thead className="bg-[var(--black)] text-gray-400">
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
          {[...Array(row)].map((_, i) => (
            <tr
              key={i}
              className="border-t-[1.4px] border-[var(--border)] bg-[var(--black)]"
            >
              <td className="px-6 py-4">
                <div className="block w-14 h-18 aspect-[3/2] object-cover rounded-sm bg-gray-700"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-700 animate-pulse rounded w-3/4"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-700 animate-pulse rounded w-3/4"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-700 animate-pulse rounded w-3/4"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-700 animate-pulse rounded w-3/4"></div>
              </td>
              <td className="min-h-30 px-6 py-4 flex items-center gap-2">
                <div className="bg-gray-700 animate-pulse rounded w-4 h-10"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
