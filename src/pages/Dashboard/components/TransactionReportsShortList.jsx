import React, { useEffect, useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import dollor from 'asset/Pictures/Icons/dollor.svg';
import arrowLeft from 'asset/Pictures/Icons/chevronLeftgold.svg';
import { Link } from 'react-router-dom';
import Axios from 'comon/Axios/Axios';
import { FinancialEnumFinder, FinancialStatusEnum } from 'comon/DB/FinancialEnum';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import DateFunctions from 'comon/DateFunction/DateFunctions';

function TransactionReportsShortList() {
  const [transactions, setTransactions] = useState();
  const [isloading, setIsloading] = useState();
  const isMobile = useDeviceDetection();

  useEffect(() => {
    GetLastTransactions();
  }, []);

  const GetLastTransactions = async () => {
    setIsloading(true);
    await Axios.post('/Wallet/GetWalletFlows', {
      //   userId: 'string',
      //   status: 1,
      operationTypes: [],
      planId: null,
      pagination: {
        take: 6,
        skip: 0
      }
    })
      .then((res) => setTransactions(res?.data))
      .catch(() => false)
      .finally(() => setIsloading(false));
  };
  const FindById = (array, id) => array?.find((item) => item?.key == id);

  return (
    <div className="w-full flex flex-col items-center justify-start gap-y-3 ">
      <div className="lg:w-[95%] w-full flex items-center justify-between">
        <div className="w-auto flex-nowrap items-center flex justify-start gap-x-2">
          <div className="lg:w-12 w-8 lg:h-12 h-8 flex justify-center items-center rounded-large drop-shadow-md  bg-white   ">
            <InlineSVG src={dollor} />
          </div>
          <span className=" text-base text-gray-700 font-medium ">آخرین تراکنش </span>
        </div>
        <Link
          to="/financial_report"
          className=" text-[#dfb355] lg:h-12 h-8 flex justify-center  items-center gap-x-2 bg-white rounded-large drop-shadow-md text-sm lg:font-bold font-semibold     px-3 ">
          همه تراکنش ها <InlineSVG src={arrowLeft} />
        </Link>
      </div>
      {/* tabel reports  */}
      {isloading ? (
        <BouncingDotsLoader />
      ) : transactions?.length > 0 ? (
        <div className="lg:w-[95%] w-full flex justify-start items-center border border-[#E0E0E0] rounded-[16px] border-collapse overflow-x-scroll lg:pt-3 pt-1 bg-white">
          <table className="table-auto w-full ">
            <thead className="">
              <tr className="w-full border-b border-dashed border-[#E0E0E0]">
                {/* ✅ Removed 'flex' */}
                <th className="text-start text-xs text-nowrap text-gray-500 px-4 py-3">نام طرح</th>
                <th className="text-start text-xs text-nowrap text-gray-500 px-4 py-3"> تاریخ</th>
                <th className="text-start text-xs text-nowrap text-gray-500 px-4 py-3">ساعت</th>
                <th className="text-start text-xs text-nowrap text-gray-500 px-4 py-3">
                  {isMobile ? 'مبلغ (ریال)' : 'مبلغ تراکنش (ریال)'}
                </th>
                <th className="text-start text-xs text-nowrap text-gray-500 px-4 py-3">
                  وضعیت تراکنش{' '}
                </th>
                <th className="text-start text-xs text-nowrap text-gray-500 px-4 py-3">
                  نوع تراکنش
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((item, index) => (
                <tr
                  key={index}
                  className={`  ${
                    index < transactions?.length - 1 && 'border-b'
                  } border-dashed border-[#E0E0E0]`}>
                  <td className=" text-sm text-[#939393] w-auto text-wrap whitespace-pre-line text-start items-center font-medium p-4   ">
                    {item?.planTitle}
                  </td>
                  <td className=" text-sm text-[#939393] text-wrap whitespace-pre-line text-start items-center font-medium p-4   ">
                    {item?.createDate &&
                      item?.createDate.split('T')?.[0] &&
                      DateFunctions.getDate(item?.createDate.split('T')[0])}
                  </td>
                  <td className=" text-sm text-[#939393] text-wrap whitespace-pre-line text-start items-center font-medium p-4   ">
                    {item?.createDate && item?.createDate.split('T')[1]}
                  </td>
                  <td className=" text-sm text-[#939393] text-wrap whitespace-pre-line text-start items-center font-medium p-4   ">
                    {item?.moneyAmount && Number(item?.moneyAmount).toLocaleString()}
                  </td>
                  <td
                    className={` text-sm text-[#939393] w-auto text-wrap whitespace-pre-line text-start justify-start items-center p-4 `}>
                    {FindById(FinancialStatusEnum, item?.status) ? (
                      <span
                        className={`w-auto border  text-nowrap max-w-[200px]  text-center  p-1 rounded-lg justify-center sitems-center lg:text-xs text-[8px]  `}
                        style={{
                          color: FindById(FinancialStatusEnum, item?.status)?.color,
                          borderColor: FindById(FinancialStatusEnum, item?.status)?.color
                        }}>
                        {' '}
                        {FindById(FinancialStatusEnum, item?.status)?.name}
                      </span>
                    ) : (
                      'نامشخص'
                    )}
                  </td>
                  <td
                    className={` text-sm text-[#939393] w-auto text-wrap whitespace-pre-line text-start justify-start items-center p-4 `}>
                    {FinancialEnumFinder(item?.operationType) ? (
                      <span
                        className={`w-auto border  text-nowrap max-w-[200px]  text-center  p-1 rounded-lg justify-center sitems-center lg:text-xs text-[8px]  `}
                        style={{
                          color: FinancialEnumFinder(item?.operationType)?.color,
                          borderColor: FinancialEnumFinder(item?.operationType)?.color
                        }}>
                        {' '}
                        {FinancialEnumFinder(item?.operationType)?.name}
                      </span>
                    ) : (
                      'نامشخص'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <span className="w-[80%] text-center text-sm font-bold text-[#A37F32] bg-[#01B69B08]   border border-[#A37F32] rounded-large h-[42px]  flex items-center justify-center">
          تراکنشی برای شما ثبت نشده!
        </span>
      )}
    </div>
  );
}

export default TransactionReportsShortList;
