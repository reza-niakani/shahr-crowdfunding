import AssetSideDetails from 'comon/GlobalyComponnetsUsed/AssetSideDetails';
import InnerPageStructure from 'comon/pageStructures/InnerPageStructure';
import React, { useContext } from 'react';
import InlineSVG from 'react-inlinesvg';
import registerPlan from 'asset/Pictures/Images/registerPlan.svg';
import registerReport from 'asset/Pictures/Images/registerReport.svg';
import CompanyReportsBox from './components/CompanyReportsBox';
import DataContext from 'comon/context/MainContext';

function RequestForFinancing() {
  const { setModal } = useContext(DataContext);
  return (
    <InnerPageStructure>
      {/* main part  */}
      <div className="lg:w-[95%] w-full flex flex-col items-center justify-start lg:gap-y-5 gap-y-10 h-auto ">
        {/* operational boxes */}
        <div className="lg:w-[95%] w-full flex relative lg:justify-between  justify-start md:justify-between lg:flex-row md:flex-row flex-col  gap-y-3 items-start  h-auto  ">
          {/* register plan box  */}
          <div className="lg:w-[49%]  md:w-[49%] w-full flex flex-col  justify-center items-center min-h-[260px] h-auto rounded-[20px] lg:gap-y-7 gap-y-6 bg-white  border border-[#E0E0E0]  ">
            <InlineSVG src={registerPlan} />
            <span className="text-xs w-[60%] text-center  text-[#8C8C8C]">
              برای شروع درخواست تامین مالی و تکمیل مدارک خود اینجا کلیک کنید
            </span>
            <button
              onClick={() => setModal({ type: 'registerPlan', data: null })}
              className="w-[150px] h-[34px] rounded-lg border border-accent-1000 text-accent-1000  text-center  text-sm focus:outline-none focus:ring-0 ">
              ثبت درخواست
            </button>
          </div>
          {/* financial report box */}
          <div className="lg:w-[49%] md:w-[49%] w-full flex flex-col  justify-center items-center min-h-[260px] h-auto rounded-[20px] lg:gap-y-7 gap-y-6 bg-white  border border-[#E0E0E0] ">
            <InlineSVG src={registerReport} />
            <span className="text-xs w-[60%] text-center  text-[#8C8C8C]">
              برای آپلود گزارش های مالی دوره ای طرح های خود اینجا کلیک کنید{' '}
            </span>
            <button
              onClick={() => setModal({ type: 'registerFinancialReport', data: null })}
              className="w-[150px] h-[34px] rounded-lg border border-accent-1000 text-accent-1000  text-center  text-sm focus:outline-none focus:ring-0 ">
              ثبت گزارش مالی{' '}
            </button>
          </div>
        </div>
        {/*  main data component handler  */}
        <div className="w-full flex flex-col items-center justify-start pb-16  ">
          {' '}
          <CompanyReportsBox />
        </div>
      </div>
      {/*  asster sidebar  */}
      <div className=" min-w-[280px] w-auto hidden lg:flex flex-col items-center justify-start gap-y-2 ">
        <AssetSideDetails />
      </div>
    </InnerPageStructure>
  );
}

export default RequestForFinancing;
