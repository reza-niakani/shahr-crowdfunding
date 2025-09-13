import DateFunctions from 'comon/DateFunction/DateFunctions';
import { FinancialEnumFinder } from 'comon/DB/FinancialEnum';
import React, { useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import { useNavigate } from 'react-router-dom';
import threeDots from 'asset/Pictures/Icons/dots-horizontal.svg';
import { truncateDescription } from 'comon/GlobalyTools/UseAbleFunctions';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import Axios from 'comon/Axios/Axios';
import FileUploadPage from 'comon/Input/uploadInput';

const TabelMobileBox = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isloadingUpload, setIsloadingUpload] = useState(false);
  const [fileAddress, setFileAddress] = useState();
  const [selectedfile, setSelectedfile] = useState();
  const [response, setResponse] = useState(false);
  const navigate = useNavigate();
  const toggleMiddlePart = () => {
    setIsOpen(!isOpen);
  };
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
          toggleMiddlePart();
          setResponse();
          setFileAddress();
        }, 2000);

        setIsloadingUpload(false);
      });
  };

  return (
    <div className="w-[90%] max-w-md mx-auto bg-white shadow-md rounded-[20px] border border-[#E0E0E0] flex flex-col items-center min-h-[210px] h-auto">
      {/* Top Part */}
      <div className="w-[90%] h-[62px] flex items-center justify-between border-b border-dashed border-[#E0E0E0]">
        <span className="text-[#6F6F6F] text-sm">
          تاریخ {data?.createDate && DateFunctions.getDate(data?.createDate)}
        </span>
        <span
          className="w-auto border max-w-[200px] text-center p-2 rounded-large justify-center items-center text-wrap text-[8px]"
          style={{
            color: FinancialEnumFinder(data?.operationType)?.color,
            borderColor: FinancialEnumFinder(data?.operationType)?.color
          }}>
          {FinancialEnumFinder(data?.operationType)?.name}
        </span>
        <InlineSVG
          src={threeDots}
          className={`cursor-pointer transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          onClick={toggleMiddlePart} // Toggle middle section
        />
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
        <div className="flex flex-col justify-center gap-y-1 text-xs text-gray-170 w-full">
          <p className="p-3 text-[#383737] text-xs">
            {data?.flowDescription ? data?.flowDescription : 'جزییاتی برای این مورد یافت نشده '}
          </p>

          {data?.offlinePaymentId && data?.status == 1 && (
            <div className="flex flex-col items-center  w-full gap-y-5 h-full justify-start ">
              <span className="w-full text-start text-gray-600 text-xs pr-2 text-nowrap">
                ثبت فیش واریزی (انتخاب فایل)
              </span>
              <div className="w-full  items-center flex justify-start mt-2">
                <FileUploadPage
                  requiresSigning={true}
                  fileAddress={fileAddress}
                  setFileAddress={setFileAddress}
                  selectedfile={selectedfile}
                  setSelectedfile={setSelectedfile}
                  icon={true}
                  style="rounded-md bg-transparent w-full h-[39px]"
                />
              </div>
              {response ? (
                response === 'success' ? (
                  <div className="w-full border border-green-600 text-green-600 h-[40px] text-sm rounded-lg text-center flex items-center justify-center">
                    ثبت شد
                  </div>
                ) : (
                  <div className="w-full border border-red-600 text-red-600 h-[40px] text-sm rounded-lg text-center flex items-center justify-center">
                    ثبت نشد
                  </div>
                )
              ) : (
                <div className="w-full gap-x-2 flex justify-between items-center">
                  <button
                    onClick={() => UploadFileReceipt(data?.offlinePaymentId)}
                    disabled={isloadingUpload && fileAddress}
                    className="w-[45%] border border-green-600 h-[32px] text-sm text-green-600 rounded-md text-center flex items-center justify-center">
                    {isloadingUpload ? <BouncingDotsLoader /> : 'ثبت'}
                  </button>
                  <button
                    onClick={() => {
                      toggleMiddlePart();
                      setFileAddress();
                    }}
                    className="w-[45%] border border-gray-600 h-[32px] text-sm text-gray-600 rounded-md text-center flex items-center justify-center">
                    انصراف
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Part */}
      <div className="p-3 w-[90%] flex flex-col items-center justify-center gap-y-3 min-h-[130px]">
        <span
          className="text-[#707070] text-start w-full"
          onClick={() => navigate(`/investing/plan_details/${data?.orderId}`)}>
          {data?.planTitle && truncateDescription(data?.planTitle, 50)}
        </span>
        <div className="w-full flex justify-between items-center">
          <span className="text-sm text-accent-1000">مبلغ (ریال)</span>
          <span className="text-sm text-[#6F6F6F]">
            {data?.moneyAmount && Number(data?.moneyAmount).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TabelMobileBox;
