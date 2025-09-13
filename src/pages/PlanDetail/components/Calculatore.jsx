import { handleNumberInput } from 'comon/GlobalyTools/UseAbleFunctions';
import React, { useState } from 'react';

function Calculatore({ mainData, padding = true }) {
  const [money, setMoney] = useState(0);

  const calculatore = (amount) => {
    let result = amount && Number(Number(money * amount).toFixed()).toLocaleString();
    if (money >= mainData?.plandata?.unitAmount) {
      return result;
    } else {
      return 0;
    }
  };

  return (
    <div
      className={`w-full h-auto flex flex-col items-center justify-between gap-y-5  ${
        padding ? ' lg:py-8 py-5 shadow-dropShadow2 ' : ''
      }   rounded-[20px] text-gray-main `}>
      {/* title */}
      <span className="text-start w-[90%] font-semibold lg:text-base text-sm  ">
        ماشین حساب <br /> محاسبه سود پیش بینی‌شده
      </span>
      {/*  input */}
      <div className="w-[90%] flex flex-col items-center gap-y-4 justify-start  ">
        <label htmlFor="money" className=" lg:text-sm text-xs w-full text-start ">
          مبلغ سرمایه گذاری
        </label>
        <input
          type="text"
          maxLength={15}
          inputMode="numeric"
          onChange={(e) => handleNumberInput(e, setMoney)}
          value={money ? Number(money).toLocaleString() : 0}
          className="w-full flex justify-start  text-sm text-gray-main text-center focus:outline-none focus:ring-0 border border-accent-600 rounded-large h-[42px] focus:border-accent-600"
        />
      </div>
      <span
        className={`lg:text-sm text-xs w-[90%] text-start  ${
          money && (money >= mainData?.plandata?.unitAmount ? 'text-gray-main' : ' text-red-main')
        }`}>
        * حداقل مبلق سرمایه گذاری (ریال)
        {mainData?.plandata?.unitAmount &&
          Number(mainData?.plandata?.unitAmount).toLocaleString()}{' '}
      </span>
      {/* results boxs */}
      <div className="w-[90%] flex items-center justify-between">
        <div className="w-[48%] lg:h-[110px] h-[75px] flex justify-center flex-col items-center gap-y-5 bg-gray-100 rounded-large ">
          <span className="font-medium lg:text-base  text-xs text-center w-full text-gray-main">
            سود پیش‌بینی شده کل(ریال)
          </span>
          <span className="font-black lg:text-xl  text-xs text-center w-full text-[#01B69B]">
            {calculatore(mainData?.plandata?.totalProfitRate)}
          </span>
        </div>
        <div className="w-[48%] lg:h-[110px] h-[75px] flex justify-center flex-col items-center gap-y-5 bg-gray-100 rounded-large ">
          <span className="font-medium lg:text-base  text-xs text-center w-full text-gray-main">
            سود پیش‌بینی شده در هر دوره(ریال){' '}
          </span>
          <span className="font-black lg:text-xl  text-xs text-center w-full text-[#01B69B]">
            {calculatore(mainData?.plandata?.fixedProvisionalProfit)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Calculatore;
