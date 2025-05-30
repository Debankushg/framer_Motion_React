import React from "react";

function Pagination({ limit, offset, total, onPageChange, onLimitChange }) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange((page - 1) * limit);
  };

  // Render page numbers (simple version: show all pages)
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex py-10 justify-center gap-8">
      <select
        value={limit}
        onChange={(e) => {
          onLimitChange(Number(e.target.value));
          onPageChange(0); // reset to first page on limit change
        }}
        className="border border-amber-300 hover:bg-yellow-800 text-white font-bold py-1 px-4 rounded cursor-pointer "
      >
        {[4, 10, 20, 50].map((size) => (
          <option
            key={size}
            value={size}
            className=" cursor-pointer bg-amber-500"
          >
            Show {size}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-amber-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded cursor-pointer"
        >
          Prev
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              fontWeight: page === currentPage ? "bold" : "normal",
              backgroundColor: page === currentPage ? "" : "transparent",
            }}
            className={`${
              page === currentPage ? "bg-amber-500" : "bg-transparent"
            } hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded-3xl cursor-pointer`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-amber-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
