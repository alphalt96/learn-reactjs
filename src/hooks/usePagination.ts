import { useMemo } from "react";

interface IPaginationOptions {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number
};

export function usePagination ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}: IPaginationOptions) {
  const paginationRange = useMemo(() => {
    let result: any[] = [];

    const totalPage = Math.ceil(totalCount / pageSize);
  
    const firstPage = 1;
    const lastPage = totalPage;
  
    const siblingLeftIndex = currentPage - siblingCount;
    const siblingRightIndex = currentPage + siblingCount;

    // if total sibling of the left side and the right side of current page greater than total page
    // include the current page, the first page and the last page
    const showAllPages = siblingCount * 2 + 3 > totalPage;
  
    if (showAllPages) {
      result = range(firstPage, totalPage);
    } else if (siblingLeftIndex <= 1) {
      result = [...range(firstPage, currentPage + siblingCount), '...', lastPage];
    } else if (siblingRightIndex >= lastPage) {
      result = [firstPage, '...', ...range(currentPage - siblingCount, lastPage)];
    } else {
      result = [firstPage, '...', ...range(currentPage - siblingCount, currentPage + siblingCount), '...', lastPage];
    }
  
    return result;
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
}

function range(start: number, end: number) {
  let length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
}
