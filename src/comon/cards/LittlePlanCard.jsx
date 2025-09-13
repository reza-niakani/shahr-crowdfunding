/* eslint-disable no-unused-vars */
import getBaseUrl from 'comon/Axios/getBaseUrl';
import { truncateDescription } from 'comon/GlobalyTools/UseAbleFunctions';
import React from 'react';
import { Link } from 'react-router-dom';
import DateFunctions from 'comon/DateFunction/DateFunctions';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';

function LittlePlanCard({ data }) {
  const isMobile = useDeviceDetection();

  return (
    <div className="lg:w-[360px] w-[340px] flex flex-col items-center bg-transparent relative min-h-[230px] h-auto gap-y-3 py-5  ">
      {/* image */}
      <div className="w-full flex justify-start items-center flex-col gap-y-4 shadow-dropShadow2 py-5 rounded-t-[24px]">
        {' '}
        <div className="w-[95%] flex justify-start gap-x-2">
          <img
            className="lg:w-[75px]  h-[62px] w-[65px]  object-cover rounded-r-large rounded-l-md "
            src={getBaseUrl() + '/' + data?.coverImagePaths?.[0]?.value}
            alt="تصویر طرح یافت نشد"
          />
          <div className="w-full flex flex-col h-auto gap-y-3 items-center">
            <span className="text-sm font-bold text-gray-main w-full text-start">
              {' '}
              {truncateDescription(data?.title, isMobile ? 37 : 40)}
            </span>
            <span className="lg:text-sm text-xs   bg-[#7E7DFC] rounded-lg text-center flex justify-between p-2 text-white w-[80%]">
              تعداد روز باقی مانده :{' '}
              <strong> {DateFunctions.GetDateDistance(data?.underwritingEndDate)}روز</strong>{' '}
            </span>
          </div>
        </div>
        <div className="w-[90%] flex justify-center gap-x-2 items-center">
          <div className="w-full rounded-Radius bg-gray-100 flex flex-col items-center justify-center gap-y-3 h-[75px]">
            <span className="text-center text-xs font-medium text-gray-main">
              حداقل سرمایه گذاری:{' '}
            </span>
            <span className="text-center text-xs font-black text-gray-main">
              {data && Number(data?.minRequiredTotalValue).toLocaleString()} ریال
            </span>
          </div>
          <div className="w-full rounded-Radius bg-gray-100 flex flex-col items-center justify-center gap-y-3 h-[75px]">
            <span className="text-center text-xs font-medium text-gray-main">بازده سودآوری:</span>
            <span className="text-center text-xs font-black text-gray-main">
              %{data && Number(data?.annualProfiteRate * 100).toFixed()} سالانه{' '}
            </span>
          </div>
        </div>
      </div>
      {/* Button: Stay at the Bottom */}
      <Link
        to={`/plan_detail/${data?.id}`}
        className="w-full text-sm font-bold lg:text-base h-[43px]  flex justify-center items-center text-center text-accent-600 bg-white drop-shadow-md rounded-b-[22px]">
        جزئیات طرح
      </Link>
    </div>
  );
}

export default LittlePlanCard;
