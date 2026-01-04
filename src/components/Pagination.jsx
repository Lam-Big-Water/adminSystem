import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { PAGE_SIZE } from "../utils/constants";

import { useSearchParams } from "react-router-dom";

const Pagination = ({ count = 45 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams)
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const endIndex = startIndex + PAGE_SIZE;

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  function firstPage() {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  function lastPage() {
    searchParams.set("page", pageCount);
    setSearchParams(searchParams);
  }

    function PageByNum(page) {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (pageCount <= maxVisible) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", pageCount);
    } else if (currentPage >= pageCount - 3) {
      pages.push(
        1,
        "...",
        pageCount - 4,
        pageCount - 3,
        pageCount - 2,
        pageCount - 1,
        pageCount
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        pageCount
      );
    }

    return pages;
  };

  console.log(getPageNumbers())

  return (
    <div>
      <div className="flex items-center justify-between border-t border-border/50 px-6 py-4">
        <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{startIndex + 1}</span> to{" "}
                <span className="font-medium text-foreground">{Math.min(endIndex, count)}</span> of{" "}
                <span className="font-medium text-foreground">{count}</span> results
              </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={firstPage}
            className="w-8 h-8 p-1 flex justify-center items-center border border-border rounded-md"
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">First page</span>
          </button>

          <button
            disabled={currentPage === 1}
            onClick={prevPage}
            className="w-8 h-8 p-1 flex justify-center items-center border border-border rounded-md"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) =>
              typeof page === "number" ? (
                <button
                  key={page}
                  onClick={() => PageByNum(page)}
                  className={`w-8 h-8 p-1 flex justify-center items-center border border-border rounded-md ${currentPage === page ? "bg-accent-foreground text-accent" : ""}`}
                >
                  {page}
                </button>
              ) : (
                <span
                  className="px-2 text-muted-foreground"
                  key={`ellipsis-${index}`}
                >
                  {page}
                </span>
              )
            )}
          </div>

          <button
            disabled={currentPage === pageCount}
            onClick={nextPage}
            className="w-8 h-8 p-1 flex justify-center items-center border border-border rounded-md"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </button>

          <button
            disabled={currentPage === pageCount}
            onClick={lastPage}
            className="w-8 h-8 p-1 flex justify-center items-center border border-border rounded-md"
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Last page</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
