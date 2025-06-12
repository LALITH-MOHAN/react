import React from "react";
import "../styles/Pagination.css";

const Pagination = ({ 
  totalPosts, 
  postsPerPage, 
  setCurrentPage, 
  currentPage,
  totalPages 
}) => {
  let pages = [];

  // Show limited page numbers (e.g., 1 2 3 ... 10)
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='pagination'>
      <button 
        onClick={goToPrevious} 
        disabled={currentPage === 1} 
        className="nav-button"
      >
        Prev
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => setCurrentPage(1)}>1</button>
          {startPage > 2 && <span className="ellipsis">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="ellipsis">...</span>}
          <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
        </>
      )}

      <button 
        onClick={goToNext} 
        disabled={currentPage === totalPages} 
        className="nav-button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;