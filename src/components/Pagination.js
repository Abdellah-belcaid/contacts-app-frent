import React from "react";

function Pagination({ currentPage, totalPages, fetchContacts }) {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchContacts(newPage - 1); // Adjusting to 0-based index for API
    }
  };

  return (
    <div className="flex justify-center">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none gap-0.5">
          <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
            <button
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-300 focus:shadow-none"
              onClick={() => handlePageChange(currentPage)}
              disabled={currentPage === 0}
            >
              Previous
            </button>
          </li>

          {[...Array(totalPages).keys()].map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button
                className={`page-link relative block py-1.5 px-3  border-0  outline-none transition-all duration-600 rounded ${
                  currentPage === page
                    ? "text-black bg-blue-500 hover:bg-blue-800"
                    : "text-gray-800 hover:text-gray-800 hover:bg-gray-300"
                } shadow-md focus:shadow-md`}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === totalPages - 1 ? "disabled" : "active"
            }`}
          >
            <button
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-300 focus:shadow-none"
              onClick={() => handlePageChange(currentPage + 2)}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
