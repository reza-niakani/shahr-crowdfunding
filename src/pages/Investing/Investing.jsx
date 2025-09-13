import InnerPageStructure from 'comon/pageStructures/InnerPageStructure';
import AssetSideDetails from 'comon/GlobalyComponnetsUsed/AssetSideDetails';
import React, { useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import gift from 'asset/Pictures/Icons/gift.svg';
import opportunityicon from 'asset/Pictures/Icons/Opportunity.svg';
import Orders from './components/Orders';
import Opportunity from './components/Opportunity';

function Investing() {
  const [step, setStep] = useState('orders');

  const HandleSteps = () => {
    switch (step) {
      case 'orders':
        return <Orders />;
      case 'opportunity':
        return <Opportunity />;
      default:
        return <Orders />;
    }
  };
  return (
    <InnerPageStructure>
      <div className="lg:w-full w-full flex flex-col items-center justify-start gap-y-5 ">
        {/*  step selector line */}
        <div className="lg:w-[90%] w-full flex lg:gap-x-3 justify-center items-center border border-[#E0E0E0] rounded-[20px] lg:h-[65px] h-[60px] bg-white ">
          <button
            onClick={() => setStep('orders')}
            className={`min-w-[130px] lg:min-w-[300px] h-[43px] focus:outline-none focus:ring-0 focus:border-none rounded-lg  ${
              step == 'orders'
                ? 'bg-[#F0FAFB] drop-shadow-md lg:text-sm text-[10px] '
                : 'text-xs lg:text-base'
            } flex items-center justify-start lg:gap-x-2 gap-x-1 lg:p-2 p-1 font-medium `}>
            <div
              className={`lg:w-12 w-7 lg:h-12 h-7 flex justify-center items-center ${
                step !== 'orders' && '  rounded-lg drop-shadow-md  bg-white   '
              }`}>
              <InlineSVG src={gift} />
            </div>{' '}
            سرمایه گذاری های من
          </button>
          <button
            onClick={() => setStep('opportunity')}
            className={`min-w-[130px] lg:min-w-[250px] h-[43px] focus:outline-none focus:ring-0 focus:border-none rounded-lg  ${
              step == 'opportunity'
                ? 'bg-[#F0FAFB] drop-shadow-md lg:text-sm text-[10px] '
                : 'text-xs lg:text-base'
            } flex items-center justify-start lg:gap-x-2 gap-x-1 lg:p-2 p-1  font-medium `}>
            <div
              className={`lg:w-12 w-7 lg:h-12 h-7 flex justify-center items-center ${
                step !== 'opportunity' && '  rounded-lg drop-shadow-md bg-white   '
              }`}>
              <InlineSVG src={opportunityicon} />
            </div>{' '}
            فرصت‌های سرمایه‌گذاری{' '}
          </button>
        </div>
        {/*  component handler  */}
        {HandleSteps()}
      </div>

      {/*  asster sidebar  */}
      <div className=" min-w-[280px] w-auto hidden lg:flex flex-col items-center justify-start gap-y-2 ">
        <AssetSideDetails />
      </div>
    </InnerPageStructure>
  );
}

export default Investing;
