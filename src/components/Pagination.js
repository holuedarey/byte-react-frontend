import React, { useState } from "react";

export default function Pagination({
  prevPage,
  nextPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  setPageNum,
}) {
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setPageNum(page);
  };

  const PaginationButton = (props) => {
    return (
      <li className="page-link">
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: props.disabled ? "not-allowed" : "pointer",
          }}
          disabled={props.disabled}
          onClick={props.handleClick}
          aria-label={props.name}
        >
          <span aria-hidden="true">{props.symbol}</span>
          <span className="visually-hidden" aria-disabled>
            {props.name}
          </span>
        </button>
      </li>
    );
  };

  return (
    <nav className="pagination ps-2 mt-3 pb-3" aria-label="Pagination">
      <PaginationButton
        handleClick={() => handlePageChange(1)}
        symbol="&#171;"
        name="First"
        disabled={!hasPrevPage}
      />
      <PaginationButton
        handleClick={() => handlePageChange(prevPage)}
        symbol="previous"
        name="Previous"
        disabled={!hasPrevPage}
      />
      <PaginationButton
        handleClick={() => handlePageChange(nextPage)}
        symbol="next"
        name="Next"
        disabled={!hasNextPage}
      />
      <PaginationButton
        handleClick={() => handlePageChange(totalPages)}
        symbol="&#187;"
        name="Last"
        disabled={!hasNextPage}
      />
    </nav>
  );
}
