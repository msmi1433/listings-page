import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import type { Pagination as PaginationType } from "../types";

type PaginationProps = {
  pagination: PaginationType;
  currentPage: number;
  pageSize: number;
  routePath: "/$productListings" | "/";
};

function Pagination({
  pagination,
  currentPage,
  pageSize,
  routePath,
}: PaginationProps) {
  const navigate = useNavigate();
  const params = useParams({ from: routePath });
  const search = useSearch({ from: routePath });
  const totalPages = Math.ceil(pagination.total / pageSize);

  const handlePageChange = (newPage: number) => {
    navigate({
      to: routePath,
      params,
      search: {
        ...search,
        pageNumber: newPage,
      },
    });
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 disabled:hover:bg-white"
        aria-label="Previous page"
      >
        Previous
      </button>

      <p className="text-sm">
        Page {currentPage} of {totalPages} ({pagination.total} items)
      </p>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 disabled:hover:bg-white"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
