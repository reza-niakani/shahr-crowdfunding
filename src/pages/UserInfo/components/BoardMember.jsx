/* eslint-disable no-unused-vars */
import React from 'react';
import { shareHoldersEnum } from 'comon/DB/PositionTypeEnum';
import ReportNotExis from 'asset/Pictures/Images/ReportsDoesNotExist.svg';
import InlineSVG from 'react-inlinesvg';

function BoardMembers({ userInfo }) {
  const TableHeader = [
    { name: 'نام و نام‌خانوادگی', key: 'familyName' },
    { name: 'کد ملی', key: 'nationalId' },
    { name: 'سمت', key: 'post' }
  ];

  const members = userInfo?.stakeholders || [];
  const findPosition = (id) => shareHoldersEnum?.find((item) => item.key == id)?.name;

  return (
    <>
      {members?.length > 0 ? (
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
                {members?.map((item, index) => (
                  <tr
                    className="text-start w-full border-b border-dashed border-[#939393]"
                    key={index}>
                    <td className=" text-sm text-[#939393]  w-auto text-wrap whitespace-pre-line text-start items-center font-medium p-3  ">
                      {item?.firstName} {item?.lastName}
                    </td>
                    <td className=" text-sm text-[#939393]  w-auto text-wrap whitespace-pre-line text-start items-center font-medium p-3  ">
                      {item?.uniqueIdentifier}
                    </td>
                    <td className=" text-sm text-[#939393]  w-auto text-wrap whitespace-pre-line text-start items-center font-medium p-3  ">
                      {findPosition(item?.positionType) || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {members?.map((item, index) => (
            <div
              key={index}
              className="w-[90%] max-w-md mx-auto bg-white shadow-md rounded-[20px] border border-[#E0E0E0] lg:hidden    md:hidden flex flex-col items-center min-h-[150px] h-auto">
              {/* Top Part */}
              <div className="w-[90%] h-auto flex-col  flex items-center justify-between  gap-y-2  text-[#707070]">
                <div className="border-b border-dashed border-[#E0E0E0] w-full font-medium text-sm   flex flex-wrap justify-between gap-y-2 h-[42px] items-center">
                  <span className="font-bold">نام و نام‌خانوادگی</span>
                  <span>
                    {' '}
                    {item?.firstName} {item?.lastName}
                  </span>
                </div>
                <div className="border-b border-dashed border-[#E0E0E0] w-full font-medium text-sm   flex flex-wrap justify-between gap-y-2 h-[42px] items-center">
                  <span className="font-bold">کد ملی</span>
                  <span> {item?.uniqueIdentifier}</span>
                </div>
                <div className=" w-full font-medium text-sm   flex flex-wrap justify-between gap-y-2 h-[42px] items-center">
                  <span className="font-bold">سمت</span>
                  <span> {findPosition(item?.positionType) || '-'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <InlineSVG src={ReportNotExis} className="mt-10" />
      )}
    </>
  );
}

export default BoardMembers;
