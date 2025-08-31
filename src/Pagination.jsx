import React from "react";
import { useSearchParams } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import { PAGE_SIZE } from "./utils/constants";

const Pagination = ({ count = 45 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

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

  if (pageCount < 1) return null;
  return (
    <div className="col-span-2 row-start-3 row-end-4 flex items-center justify-end gap-8 text-[var(--text-primary)] font-medium py-4 px-1">
      <span className="mr-auto text-[var(--text-second)] text-sm font-normal">
        Total {count} row(s) results
      </span>
      <p>
        Page <span>{currentPage}</span> of <span>{pageCount}</span>{" "}
      </p>
      <div>
        <button
          className={`p-2 border-[var(--color-border)] border-1  rounded-lg mr-2 hover:bg-[var(--color-block-hover)] ${currentPage === 1 ? "cursor-not-allowed bg-[var(--color-block)] text-[var(--text-second)]" : "text-[var(--text-primary)] bg-[var(--color-bg)] cursor-pointer"}`}
          onClick={firstPage}
          disabled={currentPage === 1}
        >
          <HiChevronDoubleLeft style={{ strokeWidth: 1 }} />
        </button>
        <button
          className={`p-2 border-[var(--color-border)] border-1  rounded-lg mr-2 hover:bg-[var(--color-block-hover)] ${currentPage === 1 ? "cursor-not-allowed bg-[var(--color-block)] text-[var(--text-second)]" : "text-[var(--text-primary)] bg-[var(--color-bg)] cursor-pointer"}`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <HiChevronLeft style={{ strokeWidth: 1 }} />
        </button>

        <button
          className={`p-2 border-[var(--color-border)] border-1  rounded-lg mr-2 hover:bg-[var(--color-block-hover)] ${currentPage === pageCount ? "cursor-not-allowed bg-[var(--color-block)] text-[var(--text-second)]" : "text-[var(--text-primary)] bg-[var(--color-bg)] cursor-pointer"}`}
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <HiChevronRight style={{ strokeWidth: 1 }} />
        </button>

        <button
          className={`p-2 border-[var(--color-border)] border-1  rounded-lg mr-2 hover:bg-[var(--color-block-hover)] ${currentPage === pageCount ? "cursor-not-allowed bg-[var(--color-block)] text-[var(--text-second)]" : "text-[var(--text-primary)] bg-[var(--color-bg)] cursor-pointer"}`}
          onClick={lastPage}
          disabled={currentPage === pageCount}
        >
          <HiChevronDoubleRight style={{ strokeWidth: 1 }} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
