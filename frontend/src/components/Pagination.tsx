type PaginationProps = {
  page: number;
  totalPages: number;
  totalProducts: number;
  limit: number;
  onPrevious: () => void;
  onNext: () => void;
};
export const Pagination = ({
  page,
  totalPages,
  onPrevious,
  onNext,
  totalProducts,
  limit,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">
        {totalProducts === 0
          ? 'No results'
          : `Showing ${(page - 1) * limit + 1}–${Math.min(page * limit, totalProducts)} of ${totalProducts}`}
      </p>
      <div className="flex gap-2">
        <button
          onClick={onPrevious}
          disabled={page <= 1}
          className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
        >
          Previous
        </button>
        <span className="px-3 py-1 text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={onNext}
          disabled={page >= totalPages}
          className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};
