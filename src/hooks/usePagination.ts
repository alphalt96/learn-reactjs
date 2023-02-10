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
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2 // first 2 page, if the sibling of left side is 3 then shouldn't show page index 2, show dots instead;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowLeftDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(2, leftItemCount);

      return [...leftRange, '...', totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );

      return [firstPageIndex, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
}

function range(start: number, end: number) {
  let length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
}
