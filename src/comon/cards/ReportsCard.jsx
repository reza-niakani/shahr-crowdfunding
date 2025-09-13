import React from 'react';
import reportpic from 'asset/Pictures/Images/registerReport.svg';
import InlineSVG from 'react-inlinesvg';
import { truncateDescription } from 'comon/GlobalyTools/UseAbleFunctions';
import DateFunctions from 'comon/DateFunction/DateFunctions';
import eye from 'asset/Pictures/Icons/openEye.svg';
import getBaseUrl from 'comon/Axios/getBaseUrl';

function ReportsCard({ data }) {
  const findStatusTitle = () => {
    switch (data?.status) {
      case 1:
        return (
          <div className="lg:min-w-[90px] min-w-[80px] max-w-[110px] w-auto h-[28px] rounded-md bg-[#fffde4] text-yellow-300 flex text-center justify-center items-center lg:text-sm lg:font-semibold text-xs  ">
            درحال بررسی
          </div>
        );
      case 2:
        return (
          <div className="lg:min-w-[90px] min-w-[80px] max-w-[110px] w-auto h-[28px] rounded-md bg-[#E4FFED] text-accent-600 flex text-center justify-center items-center lg:text-sm lg:font-semibold text-xs  ">
            تایید شده{' '}
          </div>
        );
      case 3:
        return (
          <div className="lg:min-w-[90px] min-w-[80px] max-w-[110px] w-auto h-[28px] rounded-md bg-[#ffe6e4] text-red-500 flex text-center justify-center items-center lg:text-sm lg:font-semibold text-xs  ">
            رد شده
          </div>
        );

      default:
        return (
          <div className="lg:min-w-[90px] min-w-[80px] max-w-[110px] w-auto h-[28px] rounded-md bg-[#e4ebff] text-purple-700 flex text-center justify-center items-center lg:text-sm lg:font-semibold text-xs  ">
            نامشخص{' '}
          </div>
        );
    }
  };
  return (
    <div className="w-full flex lg:h-[106px] h-[165px] rounded-lg drop-shadow-lg  bg-white border border-accent-600  lg:justify-center justify-center gap-y-5 items-center lg:flex-row flex-col  ">
      <div className="lg:w-[50%] w-full flex justify-start items-center gap-x-2 ">
        {' '}
        {/*  deafult pic */}
        <InlineSVG src={reportpic} className="w-[80px] h-[80px]" />
        {/*  file data  */}
        <div className=" lg:max-w-[70%] lg:min-w-[40%] lg:w-auto w-full text-sm  text-gray-main flex flex-col justify-start gap-y-2 items-start   ">
          <span>{data?.planTitle}</span>
          <span className="text-[#C0C0C0] tetx-xs">
            {data?.description && truncateDescription(data?.description, 25)}
          </span>
        </div>
      </div>
      {/*   */}
      <div className="lg:w-[50%] flex justify-center  lg:items-end items-center lg:h-[80%] lg:text-xs text-[10px] text-[#505050]   ">
        <div className="w-full flex items-center justify-center lg:gap-x-2 gap-x-1  h-auto ">
          {' '}
          {findStatusTitle()}
          <div className="w-0 h-4 border-r border-[#C0C0C0]" />
          <span>تاریخ ایجاد: {data?.createDate && DateFunctions.getDate(data?.createDate)}</span>
          <div className="w-0 h-4 border-r border-[#C0C0C0]" />
          {data?.path ? (
            <a
              href={getBaseUrl() + '/' + data?.path}
              target="_blank"
              rel="noreferrer"
              className="w-auto flex justify-start items-center lg:gap-x-2 gap-x-1 text-[#505050]">
              <InlineSVG src={eye} className="text-black w-4 h-4 lg:w-6 lg:h-6" />
              مشاهده
            </a>
          ) : (
            ' فایلی بارگذاری نشده'
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsCard;
