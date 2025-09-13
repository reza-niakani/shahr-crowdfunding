import DateFunctions from 'comon/DateFunction/DateFunctions';
import React, { useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import threeDots from 'asset/Pictures/Icons/dots-horizontal.svg';
import getBaseUrl from 'comon/Axios/getBaseUrl';
import download from 'asset/Pictures/Icons/download.svg';

const TabelMobileBoxDynamic = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMiddlePart = () => {
    setIsOpen(!isOpen);
  };

  const findStatusTitle = (status) =>
    [
      { name: 'درحال بررسی', key: 1, color: '#7E7DFC' },
      { name: 'تایید شده  ', key: 2, color: '#01B69B' },
      { name: 'رد شده  ', key: 3, color: '#f86d55' }
    ].find((item) => item.key == status);

  console.log(data, 'data');

  return (
    <div className="w-[90%] max-w-md mx-auto bg-white shadow-md rounded-[20px] border border-[#E0E0E0] flex flex-col items-center min-h-[210px] h-auto">
      {/* Top Part */}
      <div className="w-[90%] h-auto flex-col  flex items-center justify-between  gap-y-2  text-[#707070]">
        <div className="border-b border-dashed border-[#E0E0E0] w-full font-medium text-sm   flex flex-wrap justify-between gap-y-2 h-[42px] items-center">
          <span className="font-bold">نام و نام‌خانوادگی</span>
          <span> {data?.title ? data?.title : 'ندارد '}</span>
        </div>
        <div className="border-b border-dashed border-[#E0E0E0] w-full font-medium text-sm   flex flex-wrap justify-between gap-y-2 h-[42px] items-center">
          <span className="font-bold">تاریخ ثبت</span>
          <span> {data?.createDate && DateFunctions.getDate(data?.createDate)}</span>
        </div>
        <div className="border-b border-dashed border-[#E0E0E0] w-full font-medium text-sm   flex flex-wrap justify-between gap-y-2 h-[42px] items-center">
          <span className="font-bold">وضعیت </span>
          <span
            className="w-auto border max-w-[200px] text-center p-1 rounded-lg justify-center items-center text-wrap text-xs"
            style={{
              color: findStatusTitle(data?.status)?.color,
              borderColor: findStatusTitle(data?.status)?.color
            }}>
            {findStatusTitle(data?.status)?.name}
          </span>{' '}
        </div>
        <div className="border-b border-dashed border-[#E0E0E0] w-full font-medium text-sm   flex flex-wrap justify-between gap-y-2 h-[42px] items-center">
          <span className="font-bold">فایل </span>
          <a href={getBaseUrl() + '/' + data?.path} target="_blank" rel="noreferrer">
            <InlineSVG src={download} className="cursor-pointer" />
          </a>{' '}
        </div>

        <div className="w-full flex justify-end  h-[36px] rounded-b  drop-shadow-lg items-center">
          <InlineSVG
            src={threeDots}
            className={`cursor-pointer transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            onClick={toggleMiddlePart} // Toggle middle section
          />
        </div>
      </div>

      {/* Middle Animated Part */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out w-[90%] flex flex-col gap-y-2 items-center ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          maxHeight: isOpen ? '400px' : '0px', // Ensure it expands
          opacity: isOpen ? 1 : 0, // Fix visibility issue
          transition: 'max-height 0.5s ease-in-out, opacity 0.3s ease-in-out' // Smooth effect
        }}>
        <p className="flex flex-col justify-center gap-y-1 text-xs text-gray-170 min-h-[42px] w-full">
          {data?.description ? data?.description : 'جزییاتی برای ابین مورد یافت نشده '}{' '}
        </p>
      </div>
    </div>
  );
};

export default TabelMobileBoxDynamic;
