import { usePagination } from "../hooks/usePagination";

export interface IPaginationProps {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
  onPageChange: (pageIndex: number) => void
}

export function Pagination (props: IPaginationProps) {
  const paginationData = usePagination(props);

  if (paginationData.length <= 1) {
    // hide pagination if there is only one page
    return null;
  }

  const onPageChange = (event: any) => {
    const pageIndex = +event.target.value;
    if (isNaN(pageIndex)) return;
    props.onPageChange(pageIndex);
  }

  return (
    <div className="flex flex-row gap-3 pl-5">
      {paginationData.map((pageIndex, index) => {
        const isCurrentPage = pageIndex === props.currentPage;
        return (
          <button
            key={index}
            onClick={onPageChange}
            className={`rounded-lg py-2 w-50 ${isCurrentPage ? 'bg-black text-white' : ''}`}
            value={pageIndex}
          >{pageIndex}</button>
        )
      })}      
    </div>
  )
}