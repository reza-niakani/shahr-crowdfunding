// /* eslint-disable */
// import _, { set } from 'lodash';
// import InlineSVG from 'react-inlinesvg';
// import lastPage from 'asset/Icons/last_page.svg';
// import firstPage from 'asset/Icons/first_page.svg';
// import arrowRight from 'asset/Icons/keyboard_arrow_right.svg';
// import arrowLeft from 'asset/Icons/keyboard_arrow_left.svg';
// import { useEffect, useRef, useState } from 'react';
// const PaginationComponet = ({
//   itemCount,
//   pagesize,
//   setCurrentPage,
//   currentPage,
//   pageShowCount
// }) => {
//   const [number, setNumber] = useState(currentPage);
//   useEffect(() => setNumber(currentPage), [currentPage]);
//   const timeoutRef = useRef(null);

//   const pagecount = Math.ceil(itemCount / pagesize);
//   const pages = _.range(1, pagecount + 1).length;

//   if (pagecount === 1) return null;

//   const handleChange = (e) => {
//     const value = e.target.value <= 0 ? 1 : e.target.value <= pages ? e.target.value : pages;
//     setNumber(value);

//     // Clear the previous timeout
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }

//     // Set a new timeout
//     timeoutRef.current = setTimeout(() => {
//       setCurrentPage(Number(value));
//     }, 300);
//   };

//   return <div className="flex flex-col  w-full justify-center items-center gap-y-2"></div>;
// };

// export default PaginationComponet;
import _ from 'lodash';
import React from 'react';

const PaginationComponet = ({ total, currentPage, setCurrentPage, pageSize }) => {
  const createPageRange = () => {
    const pagecount = Math.ceil(total / pageSize);
    const totalPages = _.range(1, pagecount + 1).length;
    const pageRange = [];

    if (totalPages <= 7) {
      // Show all pages if less than or equal to 7
      for (let i = 1; i <= totalPages; i++) {
        pageRange.push(i);
      }
    } else {
      // Always show the first page
      pageRange.push(1);
      if (currentPage > 3) {
        pageRange.push('...');
      }

      let start = Math.max(currentPage - 1, 2); // Ensure we start from page 2
      let end = Math.min(currentPage + 1, totalPages - 1); // Ensure we end before the last page

      for (let i = start; i <= end; i++) {
        pageRange.push(i);
      }

      if (currentPage < totalPages - 2) {
        pageRange.push('...');
      }

      // Always show the last page
      pageRange.push(totalPages);
    }

    return pageRange;
  };

  const pageRange = createPageRange();

  return (
    <>
      {' '}
      {total > pageSize && (
        <div className="w-auto flex gap-x-2 items-center justify-center  h-[45px]  border border-accent-600  px-8 rounded-large  ">
          {pageRange.map((page, index) => (
            <button
              key={index}
              onClick={() => page !== '...' && setCurrentPage(page)}
              className={` h-[80%] border-0 focus:outline-none focus:border-0 hover:text-accent-1100 w-[30px] text-base  font-medium   focus:right-0 ${
                page === currentPage
                  ? '  text-accent-1100 drop-shadow-md bg-accent-100 rounded-lg   '
                  : ' text-gray-main  '
              }`}
              disabled={page === '...'}>
              {page}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default PaginationComponet;
