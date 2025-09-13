import Axios from 'comon/Axios/Axios';
import { CheckObjectValue } from 'comon/GlobalyTools/UseAbleFunctions';
import BoxUploadFile from 'comon/Input/BoxUploadFile';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import React, { useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import file from 'asset/Pictures/Images/fileImg.svg';
import trash from 'asset/Pictures/Icons/trash.svg';

function LastStep({ selectedfile, setSelectedfile, details, setDetails, setModal }) {
  const [isloading, setIsloading] = useState(false);

  const disable = CheckObjectValue(details);

  const CreateReport = async () => {
    setIsloading(true);
    await Axios.post('/FinancialStatements/Craete', {
      path: details?.path,
      title: details?.title,
      description: details?.description,
      type: 6,
      investmentPlanId: details?.investmentPlanId?.key,
      date: details?.data?.split('T')?.[0]
    })
      .then(() => setModal({ type: 'success', data: null }))
      .catch(() => setModal({ type: 'failed', data: null }))
      .finaly(() => setIsloading(false));
  };

  return (
    <div className="w-full flex flex-col justify-between items-center gap-y-10  min-h-[400px] h-auto">
      <div className=" w-full flex flex-col items-center gap-y-5 ">
        <span className="text-xs font-bold text-gray-main text-start w-full justify-start items-center  ">
          تصویری از طرح خود را بارگذاری کنید :
        </span>
        <BoxUploadFile
          requiresSigning={true}
          allowedTypes={['zip', 'rar']}
          fileAddress={details?.path?.[0]}
          selectedfile={selectedfile}
          setFileAddress={(e) => setDetails((prev) => ({ ...prev, path: e }))}
          setSelectedfile={setSelectedfile}
          typeChecking={false}
        />
      </div>
      {selectedfile && (
        <div className=" w-full min-h-[96px] h-auto border border-accent-600 rounded-large  justify-center items-center flex drop-shadow-md    ">
          <div className="w-[70%] flex flex-col items-start gap-y-2 justify-center  ">
            <span className="text-xs font-medium text-gray-main text-start ">
              {selectedfile?.name}
            </span>
            <div className=" text-xs flex items-center gap-x-1 text-[#98A2B3]">
              <span className="text-xs"> {selectedfile?.type}</span>
              <div className="border-r-2 border-[#C0C0C0] h-4 " />
              <span> {Number(selectedfile?.size / 1000000).toFixed(2) + 'MB'} </span>
            </div>
            <div className="w-auto flex items-center gap-x-2">
              <span className="bg-[#E4FFED] p-1 rounded-md  text-accent-600 text-xs text-center  ">
                بارگذاری موفق
              </span>
              <div className="border-r-2 border-[#C0C0C0] h-4 " />
              <button
                onClick={() => {
                  setSelectedfile();
                  setDetails((prev) => ({ ...prev, coverImagePaths: [] }));
                }}
                className="font-medium text-red-main text-xs focus:outline-none focus:ring-0 focus:border-0 flex justify-start flex-nowrap gap-x-1 items-center ">
                <InlineSVG src={trash} />
                حذف
              </button>
            </div>
          </div>
          <InlineSVG src={file} />
        </div>
      )}
      <button
        onClick={CreateReport}
        disabled={!disable}
        className={` ${
          isloading ? 'border border-accent-600' : 'bg-accent-600 '
        } rounded-md text-white font-medium text-sm flex justify-center items-center text-center w-full h-[44px] ${
          !disable && 'opacity-50'
        } `}>
        {isloading ? <BouncingDotsLoader /> : 'ثبت گزارش'}
      </button>
    </div>
  );
}

export default LastStep;
