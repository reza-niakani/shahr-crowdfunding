/* eslint-disable no-unused-vars */
import React from 'react';
import InlineSVG from 'react-inlinesvg';
import TabelMobileBox from './TabelMobileBox';
import ReportNotExis from 'asset/Pictures/Images/ReportsDoesNotExist.svg';
import PaginationComponet from 'comon/pagination/PaginationComponent';
import CustomDropDown from 'comon/DropDown/CustomDropDown';

function MobileViewTabel({
  data,
  planName,
  allPlans,
  currentPage,
  setPlanName,
  FinancialEnum,
  setCurrentPage,
  operationTypes,
  setOperationTypes
}) {
  return (
    <div className="w-full flex flex-col items-center gap-y-3 pb-20 ">
      <div className="w-full flex flex-col  items-center justify-start gap-y-5">
        <CustomDropDown
          width="w-[90%]"
          options={allPlans}
          label="طرح موردنظر"
          selectedItem={planName}
          setSelectedItem={setPlanName}
        />
        <CustomDropDown
          width="w-[90%]"
          label="نوع تراکنش"
          options={FinancialEnum}
          selectedItem={operationTypes}
          setSelectedItem={setOperationTypes}
        />
        <button
          onClick={() => {
            setPlanName();
            setOperationTypes();
          }}
          className="w-[90%] flex justify-center gap-0 flex-nowrap items-center h-[38px] border border-[#E0E0E0] text-[#717171] text-sm rounded-lg ">
          حذف فیلترها
        </button>
      </div>
      {data?.data?.length > 0 ? (
        data?.data?.map((item, index) => <TabelMobileBox key={index} data={item} />)
      ) : (
        <InlineSVG src={ReportNotExis} className="mt-10" />
      )}
      <PaginationComponet
        pageSize={5}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={data?.pagination?.total}
      />
    </div>
  );
}

export default MobileViewTabel;
