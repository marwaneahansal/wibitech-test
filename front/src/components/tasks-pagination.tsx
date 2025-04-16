import { useSearchParams } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type TaskPaginationProps = {
  currentPage: number;
  totalPages: number;
};

export const TasksPagination = ({ currentPage, totalPages }: TaskPaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pages = new Array(totalPages).fill(0).map((_, index) => index + 1);

  const handlePageChange = (pageNumber: number) => {
    searchParams.set("page", pageNumber.toString());
    setSearchParams(searchParams);
  };

  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>
        {pages.map((pageNumber) => {
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                type="button"
                isActive={currentPage === pageNumber}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
