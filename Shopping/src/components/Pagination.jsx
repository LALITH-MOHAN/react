import React from "react";
import "../styles/Pagination.css";

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  let pages = []; 

  for (let i = 1; i <= totalPages; i++) {
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
      <button onClick={goToPrevious} disabled={currentPage === 1} className="nav-button">
         Prev
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}

      <button onClick={goToNext} disabled={currentPage === totalPages} className="nav-button">
        Next
      </button>
    </div>
  );
};

export default Pagination;
