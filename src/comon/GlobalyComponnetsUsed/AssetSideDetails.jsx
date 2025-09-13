import React, { useContext } from 'react';
import InlineSVG from 'react-inlinesvg';
import wallet from 'asset/Pictures/Icons/wallet.svg';
import DataContext from 'comon/context/MainContext';
import { Link } from 'react-router-dom';
import dollor from 'asset/Pictures/Icons/dollor.svg';

function AssetSideDetails() {
  const { statisticalInformation } = useContext(DataContext);

  return (
    <div className="w-full flex flex-col items-center justify-start gap-y-1">
      {' '}
      <div className="w-full rounded-t-[20px] rounded-b-md  border border-[#E0E0E0]  bg-white flex  min-h-[200px] h-auto flex-col items-center justify-center  gap-y-5  ">
        {/* wallet reports */}
        <div className="w-[80%] flex justify-start gap-x-5 items-center ">
          {' '}
          <div className="w-[44px] h-[40px] rounded-lg  flex justify-center items-center bg-[#F0FAFB] drop-shadow-md  ">
            <InlineSVG src={wallet} />
          </div>
          <span className="text-sm text-gray-main font-medium ">مجموع دارایی ها</span>
        </div>
        {/* divider */}
        <div className="w-full  border-b border-[#E0E0E0] border-dashed  " />
        {/* amount   */}
        <div className="w-full flex flex-col gap-y-3 items-center justify-center ">
          <span className="w-full text-center text-gray-600 text-sm ">
            مبلغ کل سرمایه گذاری شده
          </span>
          <span className="w-full text-center text-gray-main text-base  font-bold ">
            {statisticalInformation?.raisedValue &&
              Number(statisticalInformation?.raisedValue).toLocaleString()}
            <span className="text-xs"> (ریال)</span>
          </span>
        </div>
      </div>
      {/* button */}
      <Link
        to="/all_plans"
        className="w-full bg-white drop-shadow-md text-center flex justify-center gap-x-2 items-center rounded-b-[20px] rounded-t-md  h-[40px] text-base font-bold text-[#009085] ">
        <InlineSVG src={dollor} />
        سرمایه گذاری
      </Link>{' '}
    </div>
  );
}

export default AssetSideDetails;
