import getBaseUrl from 'comon/Axios/getBaseUrl';
import DataContext from 'comon/context/MainContext';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import React, { useContext } from 'react';

function PlanHeader({ data }) {
  const { setModal } = useContext(DataContext);

  const isMobile = useDeviceDetection();
  return (
    <div className="lg:w-[90%] w-full flex gap-0 lg:flex-row md:flex-row flex-col relative lg:h-[165px] md:h-[165px] h-[185px]">
      <img
        src={getBaseUrl() + '/' + data?.coverImagePaths?.[0]?.value}
        className={`h-full lg:w-[80%] md:w-[80%] w-full object-cover ${
          isMobile ? 'rounded-t-[24px]  md:rounded-r-[24px]' : 'rounded-r-[24px]'
        }`}
      />
      <div className="w-full lg:w-[75%] md:w-[75%]  bg-white lg:min-h-[165px] md:min-h-[165px] h-auto min-h-[185px] flex flex-col items-center justify-center gap-y-4 absolute lg:top-0 lg:left-0 md:top-0 md:left-0 top-20 left-0 rounded-[20px] border border-[#E0E0E0] ">
        <span className="w-[95%] text-start text-wrap lg:text-base text-sm font-bold">
          {data?.title}
        </span>
        <div className="w-[95%]  flex lg:flex-row md:flex-row flex-col  flex-wrap text-sm  lg:items-center md:items-center items-start  text-gray-main justify-between gap-y-2">
          <span>مبلغ کل تامین مالی (ريال) :</span>
          <span className="text-sm text-[#C9B777]">
            {data?.goal && Number(data?.goal).toLocaleString()}
          </span>{' '}
        </div>
        <div className="w-[95%] flex items-center lg:justify-end justify-start md:justify-end ">
          {' '}
          <button
            onClick={() => setModal({ type: 'buyUnit', data: data })}
            className="text-white text-center flex justify-center items-center h-[42px] rounded-md bg-[#C9B777] focus:outline-none focus:border-0 focus:ring-0 w-[150px]">
            سرمایه گذاری
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanHeader;
