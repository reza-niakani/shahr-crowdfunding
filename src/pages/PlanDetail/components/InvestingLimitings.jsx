/* eslint-disable no-unused-vars */
import React from 'react';

function InvestingLimitings({ mainData }) {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-between gap-y-5  shadow-dropShadow2 lg:py-8 py-5   rounded-[20px] text-gray-700 ">
      {/* title */}
      <div className="w-[90%] flex justify-between items-center  ">
        <span className="w-[55%] text-start text-nowrap  lg:text-sm text-xs ">
          سرمایه گذاران :{' '}
        </span>{' '}
        <div className="w-[45%] flex items-center justify-end  ">
          <span className="text-start w-[47%] font-bold text-sm  "> حقیقی</span>
          <span className="text-end w-[47%] font-bold text-sm  "> حقوقی</span>
        </div>
      </div>
      {/* min */}
      <div className="w-[90%] flex  justify-between items-center  border-b border-[#01B69B1A] py-3  ">
        <span className="w-[55%] text-start text-nowrap  lg:text-sm text-xs ">
          حداقل مبلغ سرمایه‌گذاری (ریال):
        </span>
        <div className="w-[42%] justify-between flex  items-center font-bold lg:text-sm text-xs ">
          <span>
            {Number(
              mainData?.plandata?.minUnitPerIndividualInvestor * mainData?.plandata?.unitAmount
            ).toLocaleString() || 'نامشخص'}
          </span>
          <span>
            {Number(
              mainData?.plandata?.minUnitPerLegalInvestor * mainData?.plandata?.unitAmount
            ).toLocaleString() || 'نامشخص'}
          </span>
        </div>
      </div>
      {/* max  */}
      <div className="w-[90%] flex  justify-between items-center  border-b border-[#01B69B1A] py-3  ">
        <span className="w-[55%] text-start text-nowrap  lg:text-sm text-xs ">
          حداکثر مبلغ سرمایه‌گذاری (ریال):{' '}
        </span>
        <div className="w-[43%] justify-between flex  items-center font-bold lg:text-sm text-xs ">
          <span>
            {Number(
              mainData?.plandata?.maxUnitPerIndividualInvestor * mainData?.plandata?.unitAmount
            ).toLocaleString() || 'نامشخص'}
          </span>
          <span>
            {Number(
              mainData?.plandata?.maxUnitPerLegalInvestor * mainData?.plandata?.unitAmount
            ).toLocaleString() || 'نامشخص'}
          </span>
        </div>
      </div>
      {/* symbol */}
      {/* <div className="w-[90%] flex  justify-between items-center   border-b border-[#01B69B1A] py-3 ">
        <span className="w-[55%] text-start text-nowrap  lg:text-sm text-xs ">
          نماد طرح (قابل استعلام ):{' '}
        </span>
        <a
          target="_blank"
          href={mainData?.plandata?.ifbUrl}
          className="font-bold lg:text-sm text-xs  text-end underline hover:text-sky-500 "
          rel="noreferrer">
          {mainData?.plandata?.symbol}
        </a>
      </div> */}
      {/* unit amount */}
      <div className="w-[90%] flex  justify-between items-center  border-b border-[#01B69B1A] py-3 ">
        <span className="w-[55%] text-start text-nowrap  lg:text-sm text-xs ">
          تعداد گواهی‌های مشارکت:{' '}
        </span>
        <span className="font-bold lg:text-sm text-xs  text-end ">
          {Number(mainData?.plandata?.unitCount).toLocaleString() || ' --'}
        </span>
      </div>
    </div>
  );
}

export default InvestingLimitings;
