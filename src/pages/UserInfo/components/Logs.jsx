/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ReportNotExis from 'asset/Pictures/Images/ReportsDoesNotExist.svg';
import InlineSVG from 'react-inlinesvg';
import Axios from 'comon/Axios/Axios';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import PaginationComponet from 'comon/pagination/PaginationComponent';
import DateFunctions from 'comon/DateFunction/DateFunctions';

function Logs() {
  const [data, setData] = useState();
  const [isloading, setIsloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    GetLogsData();
  }, [currentPage]);

  const GetLogsData = async () => {
    setIsloading(true);
    await Axios.post('/Accounts/GetUserLogins', {
      pagination: {
        take: 10,
        skip: currentPage > 1 ? (currentPage - 1) * 10 : 0
      }
    })
      .then((res) => setData(res))
      .catch((er) => setData(false))
      .finally(() => setIsloading(false));
  };
  const TableHeader = [
    { name: 'ip', key: 'ip' },
    { name: 'تاریخ', key: 'date' },
    { name: 'ساعت', key: 'hour' }
  ];

  return (
    <div className="lg:w-[95%] w-full flex flex-col items-center justify-start py-5 bg-white border border-[#E0E0E0] rounded-[20px]">
      {isloading ? (
        <BouncingDotsLoader />
      ) : data?.data?.length > 0 ? (
        <div className="w-full flex flex-col items-center justify-start gap-y-3 ">
          <div className="w-full lg:flex   md:block hidden  h-auto  flex-col gap-y-10 justify-start items-center ">
            <table className="lg:w-[90%] w-full lg:min-w-[400px]  min-w-[400px]  h-auto ">
              <thead className="w-full text-gray-800  top-0 left-0 sticky bg-white  border-b border-dashed border-[#939393] ">
                <tr className="w-full    ">
                  {TableHeader?.map((item, index) => (
                    <td
                      className=" text-start text-sm  font-bold  text-[#808080]   whitespace-pre-line p-3 "
                      key={index}>
                      {item?.name}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((item, index) => (
                  <tr
                    className="text-start w-full border-b border-dashed border-[#939393]"
                    key={index}>
                    <td className=" text-sm text-[#939393]  w-auto text-wrap whitespace-pre-line text-start items-center font-medium p-3  ">
                      {item?.ipAddress}
                    </td>
                    <td className=" text-sm text-[#939393]  w-auto text-wrap whitespace-pre-line text-start items-center font-medium p-3  ">
                      {item?.time && DateFunctions.getDate(item?.time)}{' '}
                    </td>
                    <td className=" text-sm text-[#939393]  w-auto text-wrap whitespace-pre-line text-start items-center font-medium p-3  ">
                      {item?.time && item?.time?.split('T')[1]}{' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data?.data?.map((item, index) => (
            <div
              key={index}
              className="w-[90%] max-w-md mx-auto bg-white shadow-md rounded-[20px] border border-[#E0E0E0] lg:hidden    md:hidden flex flex-col items-center min-h-[150px] h-auto">
              {/* Top Part */}
              <div className="w-[90%] h-auto flex-col  flex items-center justify-between  gap-y-2  text-[#707070]">
                <div className="border-b border-dashed border-[#E0E0E0] w-full font-medium text-sm   flex flex-wrap justify-between gap-y-2 h-[42px] items-center">
                  <span className="font-bold">IP</span>
                  <span> {item?.ipAddress}</span>
                </div>
                <div className="border-b border-dashed border-[#E0E0E0] w-full font-medium text-sm   flex flex-wrap justify-between gap-y-2 h-[42px] items-center">
                  <span className="font-bold">ساعت </span>
                  <span> {item?.time && DateFunctions.getDate(item?.time)}</span>
                </div>
                <div className=" w-full font-medium text-sm   flex flex-wrap justify-between gap-y-2 h-[42px] items-center">
                  <span className="font-bold">ساعت</span>
                  <span> {item?.time && item?.time?.split('T')[1]} </span>
                </div>
              </div>
            </div>
          ))}
          <PaginationComponet
            pageSize={10}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={data?.pagination?.total}
          />
        </div>
      ) : (
        <InlineSVG src={ReportNotExis} className="mt-10" />
      )}
    </div>
  );
}

export default Logs;
