import React from 'react';
import InlineSVG from 'react-inlinesvg';
import close from 'asset/Pictures/Icons/close.svg';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
function SortComponent({ setSort, sort, setMobileModalStatus, isloading }) {
  return (
    <div className="w-full h-auto bg-transparent flex flex-col items-center min-h-[200px] justify-start gap-y-7 pb">
      <div className="w-[90%] border-b border-gray-200 flex justify-start  gap-x-2 py-3 items-center pr-1 ">
        <InlineSVG src={close} onClick={() => setMobileModalStatus()} />
        <span className="text-sm font-medium text-gray-main">مرتب سازی بر اساس</span>
        {isloading && <BouncingDotsLoader />}{' '}
      </div>
      <div
        onClick={() => setSort('createDate')}
        className="w-[90%] flex items-center justify-between ">
        <span className="text-sm font-medium  text-gray-main text-start">جدید ترین طرح</span>
        <input
          checked={sort == 'createDate'}
          type="checkbox"
          className="rounded-full text-gray-main  focus:ring-0 focus:border-none focus:outline-none "
        />
      </div>
      <div
        onClick={() => setSort('totalProfitRate')}
        className="w-[90%] flex items-center justify-between ">
        <span className="text-sm font-medium  text-gray-main text-start">پرسود ترین طرح</span>
        <input
          checked={sort == 'totalProfitRate'}
          type="checkbox"
          className="rounded-full text-gray-main  focus:ring-0 focus:border-none focus:outline-none "
        />
      </div>
      {/* <div onClick={() => setSort()} className="w-[90%] flex items-center justify-between ">
        <span className="text-sm font-medium  text-gray-main text-start">پربازدید ترین طرح</span>
        <input
          type="checkbox"
          className="rounded-full text-gray-main  focus:ring-0 focus:border-none focus:outline-none "
        />
      </div> */}
    </div>
  );
}

export default SortComponent;
