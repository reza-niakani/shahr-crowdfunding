/* eslint-disable no-unused-vars */
import React from 'react';
import InlineSVG from 'react-inlinesvg';
import ReportNotExis from 'asset/Pictures/Images/ReportsDoesNotExist.svg';
import PaginationComponet from 'comon/pagination/PaginationComponent';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import TabelMobileBoxDynamic from './TabelMobileBoxDynamic';

function MobileViewTabel({ data, isloading, currentPage, setCurrentPage, total }) {
  return (
    <div className="w-full flex flex-col items-center gap-y-3 pb-20 ">
      {isloading ? (
        <BouncingDotsLoader />
      ) : data?.length > 0 ? (
        data?.map((item, index) => <TabelMobileBoxDynamic key={index} data={item} />)
      ) : (
        <InlineSVG src={ReportNotExis} className="mt-10" />
      )}
      <PaginationComponet
        pageSize={5}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={total}
      />
    </div>
  );
}

export default MobileViewTabel;
