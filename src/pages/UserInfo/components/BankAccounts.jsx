import React from 'react';
import InlineSVG from 'react-inlinesvg';
import ReportNotExis from 'asset/Pictures/Images/ReportsDoesNotExist.svg';

function BankAccounts({ userInfo }) {
  const TableHeader = [
    { name: 'نام بانک', key: 'bankName' },
    { name: 'کد شعبه', key: 'BranchCode' },
    { name: 'شماره حساب', key: 'accountNumber' },
    { name: 'شماره شبا', key: 'accountNumber' }
  ];

  return (
    <>
      {userInfo?.accounts?.length > 0 ? (
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
                {userInfo?.accounts?.map((item, index) => (
                  <tr
                    className="text-start w-full border-b border-dashed border-[#939393]"
                    key={index}>
                    <td className=" text-sm text-[#939393]  w-auto text-wrap whitespace-pre-line text-start items-center font-medium p-3  ">
                      {item?.bank?.name}
                    </td>
                    <td className=" text-sm text-[#939393]  w-auto text-wrap whitespace-pre-line text-start items-center font-medium p-3  ">
                      {item?.branchCode}
                    </td>
                    <td className=" text-sm text-[#939393]  w-auto text-wrap whitespace-pre-line text-start items-center font-medium p-3  ">
                      {item?.accountNumber}
                    </td>
                    <td className=" text-sm text-[#939393]  w-auto text-wrap whitespace-pre-line text-start items-center font-medium p-3  ">
                      {item?.sheba}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {userInfo?.accounts?.map((item, index) => (
            <div
              key={index}
              className="w-[90%] max-w-md mx-auto bg-white shadow-md rounded-[20px] border border-[#E0E0E0] lg:hidden    md:hidden flex flex-col items-center min-h-[150px] h-auto">
              {/* Top Part */}
              <div className="w-[90%] h-auto flex-col  flex items-center justify-between  gap-y-2  text-[#707070]">
                <div className="border-b border-dashed border-[#E0E0E0] w-full font-medium text-sm   flex flex-wrap justify-between gap-y-2 h-[42px] items-center">
                  <span className="font-bold">نام بانک</span>
                  <span> {item?.bank?.name}</span>
                </div>
                <div className="border-b border-dashed border-[#E0E0E0] w-full font-medium text-sm   flex flex-wrap justify-between gap-y-2 h-[42px] items-center">
                  <span className="font-bold">کد شعبه</span>
                  <span> {item?.branchCode}</span>
                </div>
                <div className="border-b border-dashed border-[#E0E0E0] w-full font-medium text-sm   flex flex-wrap justify-between gap-y-2 h-[42px] items-center">
                  <span className="font-bold">شماره حساب</span>
                  <span> {item?.accountNumber}</span>
                </div>
                <div className=" border-[#E0E0E0] w-full font-medium text-sm   flex flex-wrap justify-between gap-y-2 h-[42px] items-center">
                  <span className="font-bold">شماره شبا</span>
                  <span> {item?.sheba}</span>
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

export default BankAccounts;
