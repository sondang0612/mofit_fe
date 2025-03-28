"use client";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import React, { useState, useEffect } from "react";

interface Props {
  totalItems?: number;
  itemsPerPage?: number;
  onChange?: (page: any) => void;
  initialPage?: number;
}

const Pagination = (props: Props) => {
  const {
    initialPage = 1,
    itemsPerPage = ITEMS_PER_PAGE,
    onChange,
    totalItems = 100,
  } = props;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = startPage + maxPagesToShow - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (startPage > 1) {
        pageNumbers.unshift("...");
        pageNumbers.unshift(1);
      }

      if (endPage < totalPages) {
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const handlePageClick = (page: any) => {
    if (page === "...") return;

    setCurrentPage(page);
    onChange && onChange(page);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onChange && onChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onChange && onChange(currentPage + 1);
    }
  };

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage]);

  return (
    <div className="pagination-v1">
      <button
        className="pagination__btn pagination__btn--prev"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>

      <div className="pagination__pages">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`pagination__btn ${
              currentPage === page ? "pagination__btn--active" : ""
            }`}
            onClick={() => handlePageClick(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="pagination__btn pagination__btn--next"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
