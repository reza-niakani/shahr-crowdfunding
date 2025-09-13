import React, { useEffect, useRef, useState } from 'react';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import InlineSVG from 'react-inlinesvg';
import download from 'asset/Pictures/Icons/download.svg';
import DateFunctions from 'comon/DateFunction/DateFunctions';
import PaginationComponet from 'comon/pagination/PaginationComponent';
import ReportNotExis from 'asset/Pictures/Images/ReportsDoesNotExist.svg';
import getBaseUrl from 'comon/Axios/getBaseUrl';

function DesktopTabel({ data, currentPage, setCurrentPage, isloading, total }) {
  const [expandedRow, setExpandedRow] = useState(null); // To track the expanded row
  const contentRefs = useRef([]); // To store the ref of each row content for animation

  const TableHeader = [
    { name: 'نوع سند', key: 'bankName' },
    { name: ' تاریخ ثبت', key: 'BranchCode' },
    { name: 'وضعیت', key: 'accountNumber' },
    { name: 'فایل', key: 'documnets' },
    { name: 'توضیحات', key: 'desc' }
  ];
  // Toggle row expansion
  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index); // Expand if clicked, collapse if already expanded
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.maxHeight = expandedRow === index ? `100px` : '0px';
        ref.style.opacity = expandedRow === index ? '1' : '0';
      }
    });
  }, [expandedRow]);

  const findStatusTitle = (status) =>
    [
      { name: 'درحال بررسی', key: 1, color: '#7E7DFC' },
      { name: 'تایید شده  ', key: 2, color: '#01B69B' },
      { name: 'رد شده  ', key: 3, color: '#f86d55' }
    ].find((item) => item.key == status);

  return (
    <div className="w-full flex flex-col items-center  rounded-[20px]  justify-start min-h-[400px] max-h-[880px] h-auto  gap-y-5 py-5 bg-white ">
      {/*  table */}
      {isloading ? (
        <BouncingDotsLoader />
      ) : data?.length > 0 ? (
        <div className="w-[95%] overflow-x-auto h-auto">
          <table className="w-full min-w-[800px] h-auto ">
            <thead className="w-full text-gray-800  ">
              <tr className="w-full   border-b border-[#E0E0E0] border-dashed ">
                {TableHeader?.map((item, index) => (
                  <td
                    className=" text-start h-[40px] text-xs font-bold p-3   text-[#6F6F6F]   whitespace-pre-line   "
                    key={index}>
                    {item?.name}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <React.Fragment key={index}>
                  {/* Main Row */}
                  <tr className="text-start   " key={index}>
                    <td
                      onClick={() => toggleRow(index)}
                      className=" text-sm text-[#939393] w-auto text-wrap whitespace-pre-line text-start items-center font-medium p-2  cursor-pointer ">
                      {item?.title ? item?.title : 'ندارد '}
                    </td>
                    <td
                      className=" text-sm text-[#939393] text-wrap whitespace-pre-line text-start items-center font-medium p-2 cursor-pointer  "
                      onClick={() => toggleRow(index)}>
                      {item?.createDate && DateFunctions.getDate(item?.createDate)}
                    </td>
                    <td
                      onClick={() => toggleRow(index)}
                      className={` text-sm text-[#939393] w-auto text-wrap whitespace-pre-line text-start  p-2 `}>
                      <span
                        className={`w-auto border  text-nowrap max-w-[200px]  text-center  p-1 rounded-lg   lg:text-xs text-[8px] cursor-pointer `}
                        style={{
                          color: findStatusTitle(item?.status)?.color,
                          borderColor: findStatusTitle(item?.status)?.color
                        }}>
                        {' '}
                        {findStatusTitle(item?.status)?.name}
                      </span>{' '}
                    </td>
                    <td
                      onClick={() => toggleRow(index)}
                      className={` text-sm text-[#939393] w-auto text-wrap whitespace-pre-line text-start cursor-pointer`}>
                      مشاهده
                    </td>
                    <td className=" text-wrap whitespace-pre-line text-start flex  p-4">
                      {item?.path ? (
                        <a href={getBaseUrl() + '/' + item?.path} target="_blank" rel="noreferrer">
                          <InlineSVG src={download} className="cursor-pointer" />
                        </a>
                      ) : (
                        ' فایلی بارگذاری نشده'
                      )}
                    </td>
                  </tr>

                  {/* Expanded Row (Details) */}
                  <tr
                    className={`w-full ${
                      expandedRow === index ? 'border-b border-[#717171] ' : ''
                    }`}>
                    <td colSpan={4} className="p-0">
                      <div
                        ref={(el) => (contentRefs.current[index] = el)} // Store refs for each row content
                        className="overflow-hidden  flex flex-col  justify-center   gap-y-1 transition-all duration-500 ease-in-out  text-xs text-gray-170   w-full"
                        style={{
                          maxHeight: '0px',
                          opacity: 0
                        }}>
                        <p className="p-3">
                          {' '}
                          {item?.description
                            ? item?.description
                            : 'جزییاتی برای ابین مورد یافت نشده '}
                        </p>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <InlineSVG src={ReportNotExis} className="mt-10" />
      )}
      <PaginationComponet
        pageSize={10}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={total}
      />
    </div>
  );
}

export default DesktopTabel;
