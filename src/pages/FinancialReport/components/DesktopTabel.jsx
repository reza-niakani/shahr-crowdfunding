import React, { useEffect, useRef, useState } from 'react';
import FileUploadPage from 'comon/Input/uploadInput';
import Axios from 'comon/Axios/Axios';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import InlineSVG from 'react-inlinesvg';
import threeDots from 'asset/Pictures/Icons/dots-horizontal.svg';
import { useNavigate } from 'react-router-dom';
import DateFunctions from 'comon/DateFunction/DateFunctions';
import { FinancialEnum, FinancialEnumFinder, FinancialStatusEnum } from 'comon/DB/FinancialEnum';
import CustomDropDown from 'comon/DropDown/CustomDropDown';
import PaginationComponet from 'comon/pagination/PaginationComponent';
import ReportNotExis from 'asset/Pictures/Images/ReportsDoesNotExist.svg';

const FileUploadPageMemo = React.memo(
  ({ setFileAddress, selectedfile, setSelectedfile, fileAddress }) => {
    return (
      <FileUploadPage
        requiresSigning={true}
        fileAddress={fileAddress}
        setFileAddress={setFileAddress}
        selectedfile={selectedfile}
        setSelectedfile={setSelectedfile}
        icon={true}
        style="rounded-md  bg-transparent w-full h-[39px]"
      />
    );
  }
);
FileUploadPageMemo.displayName = 'FileUploadPageMemo';

function DesktopTabel({
  data,
  planName,
  allPlans,
  currentPage,
  setPlanName,
  setCurrentPage,
  operationTypes,
  setOperationTypes
}) {
  const [expandedRow, setExpandedRow] = useState(null); // To track the expanded row
  const [isloadingUpload, setIsloadingUpload] = useState(false);
  const [fileAddress, setFileAddress] = useState();
  const [selectedfile, setSelectedfile] = useState();
  const [response, setResponse] = useState(false);
  const contentRefs = useRef([]); // To store the ref of each row content for animation
  const navigate = useNavigate();

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
    setIsloadingUpload(false);
    setFileAddress();
  }, [expandedRow]);

  const TableHeader = [
    { name: 'نام طرح', key: 'title' },
    { name: 'تاریخ', key: 'date' },
    { name: 'ساعت', key: 'time' },
    { name: 'مبلغ (ریال)', key: 'amount' },
    { name: 'وضعیت', key: 'status' },
    { name: 'نوع تراکنش', key: 'transactionType' },
    { name: 'جزییات', key: 'details' }
  ];

  const UploadFileReceipt = async (id) => {
    setIsloadingUpload(true);
    await Axios.post('/OfflinePayment/UpdateFilePath', {
      offlinePaymentId: id,
      filePath: fileAddress
    })
      .then(() => setResponse('success'))
      .catch(() => setResponse('faield'))
      .finally(() => {
        setTimeout(() => {
          setExpandedRow();
          setResponse();
          setFileAddress();
        }, 2000);

        setIsloadingUpload(false);
      });
  };

  const FindById = (array, id) => array?.find((item) => item?.key == id);

  return (
    <div className="w-full flex flex-col items-center border border-[#E0E0E0] rounded-[20px]  justify-start min-h-[400px] max-h-[880px] h-auto  gap-y-5 py-5 bg-white ">
      <div className="w-[90%] flex  items-center justify-between">
        <CustomDropDown
          width="w-[50%]"
          options={allPlans}
          label="طرح موردنظر"
          selectedItem={planName}
          setSelectedItem={setPlanName}
        />
        <CustomDropDown
          width="w-[30%]"
          label="نوع تراکنش"
          options={FinancialEnum}
          selectedItem={operationTypes}
          setSelectedItem={setOperationTypes}
        />
        <button
          onClick={() => {
            setPlanName();
            setOperationTypes();
          }}
          className="w-[150px] flex justify-center gap-0 flex-nowrap items-center h-[38px] border border-[#E0E0E0] text-[#717171] text-sm rounded-lg ">
          حذف فیلترها
        </button>
      </div>
      {/*  table */}
      {data?.data?.length > 0 ? (
        <div className="w-full overflow-x-auto h-auto">
          <table className="w-full min-w-[800px] h-auto ">
            <thead className="w-full text-gray-800  ">
              <tr className="w-full   border-b border-t border-[#E0E0E0] border-dashed ">
                {TableHeader?.map((item, index) => (
                  <td
                    className=" text-center h-[40px] text-xs font-bold    text-[#6F6F6F]   whitespace-pre-line   "
                    key={index}>
                    {item?.name}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item, index) => (
                <React.Fragment key={index}>
                  {/* Main Row */}
                  <tr className="text-start   " key={index}>
                    <td
                      className=" text-sm text-[#939393] w-auto text-wrap whitespace-pre-line text-start items-center font-medium p-4  cursor-pointer "
                      onClick={() => navigate(`/plan_detail/${item?.orderId}`)}>
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
                    <td className=" text-wrap whitespace-pre-line text-start flex justify-start items-center p-3">
                      <InlineSVG
                        src={threeDots}
                        className={`cursor-pointer transition-transform ${
                          expandedRow === index ? 'rotate-180 ' : 'rotate-0'
                        } `}
                        onClick={() => toggleRow(index)} // Toggle the row on arrow click
                      />
                    </td>
                  </tr>

                  {/* Expanded Row (Details) */}
                  <tr
                    className={`w-full ${
                      expandedRow === index ? 'border-b border-[#717171] ' : ''
                    }`}>
                    <td colSpan={7} className="p-0">
                      <div
                        ref={(el) => (contentRefs.current[index] = el)} // Store refs for each row content
                        className="overflow-hidden  flex flex-col  justify-center   gap-y-1 transition-all duration-500 ease-in-out  text-xs text-gray-170   w-full"
                        style={{
                          maxHeight: '0px',
                          opacity: 0
                        }}>
                        <p className="p-3 text-[#383737] text-xs">
                          {' '}
                          {item?.flowDescription
                            ? item?.flowDescription
                            : 'جزییاتی برای این مورد یافت نشده '}
                        </p>

                        {item?.offlinePaymentId && item?.operationType == 2 && (
                          <div className="flex w-full gap-x-5 h-[50px] justify-start items-center">
                            <span className="w-fit text-gray-600 text-xs pr-5  text-nowrap">
                              ثبت فیش واریزی (انتخاب فایل ){' '}
                            </span>
                            <div
                              className={`min-w-[40%] w-auto items-center  flex  justify-start mt-2  `}>
                              {' '}
                              {expandedRow === index && (
                                <FileUploadPageMemo
                                  setFileAddress={setFileAddress}
                                  selectedfile={selectedfile}
                                  setSelectedfile={setSelectedfile}
                                  fileAddress={fileAddress}
                                />
                              )}
                            </div>
                            {response ? (
                              response == 'success' ? (
                                <div className="w-[10%] border border-green-600 text-green-600  h-[40px] text-sm  rounded-lg text-center flex items-center justify-center ">
                                  ثبت شد
                                </div>
                              ) : (
                                <div className="w-[10%] border border-red-600 text-red-600  h-[40px] text-sm  rounded-lg text-center flex items-center justify-center ">
                                  {' '}
                                  ثبت نشد
                                </div>
                              )
                            ) : (
                              <div className="w-full gap-x-2 flex justify-start items-center">
                                {' '}
                                <button
                                  onClick={() => UploadFileReceipt(item?.offlinePaymentId)}
                                  disabled={isloadingUpload && fileAddress}
                                  className="w-[20%] border border-green-600 h-[38px] text-sm  text-green-600 rounded-md  text-center flex items-center justify-center ">
                                  {isloadingUpload ? <BouncingDotsLoader /> : 'ثبت'}
                                </button>
                                <button
                                  onClick={() => setExpandedRow()}
                                  className="w-[20%] border border-gray-600 h-[38px] text-sm  text-gray-600 rounded-md  text-center flex items-center justify-center ">
                                  انصراف
                                </button>
                              </div>
                            )}
                          </div>
                        )}
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
        total={data?.pagination?.total}
      />
    </div>
  );
}

export default DesktopTabel;
