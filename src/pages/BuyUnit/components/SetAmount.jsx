import React from 'react';
import { Num2persian } from 'nums2persian';

function SetAmount({ data, role, setStep, amount, setAmount, setShowName, showName }) {
  const handleInputValidation = () => {
    const isLegal = role === 'legal';
    const minInvestment =
      (data?.[isLegal ? 'minUnitPerLegalInvestor' : 'minUnitPerIndividualInvestor'] ?? 0) *
      (data?.unitAmount ?? 0);
    const maxInvestment =
      (data?.[isLegal ? 'maxUnitPerLegalInvestor' : 'maxUnitPerIndividualInvestor'] ?? 0) *
      (data?.unitAmount ?? 0);
    return {
      text: `مبلغ سرمایه گذاری ( حداقل: ${Number(minInvestment).toLocaleString()} حداکثر: ${Number(
        maxInvestment
      ).toLocaleString()} ) ریال`,
      color: amount
        ? amount >= minInvestment && amount <= maxInvestment
          ? 'text-gray-main'
          : 'text-red-main'
        : 'text-gray-main'
    };
  };

  const unitCount = data?.unitAmount ? Math.floor(amount / data?.unitAmount) : 0;

  const disable =
    amount > 0 &&
    unitCount >=
      (role === 'legal'
        ? (data?.minUnitPerLegalInvestor ?? 0)
        : (data?.minUnitPerIndividualInvestor ?? 0)) &&
    unitCount <=
      (role === 'legal'
        ? (data?.maxUnitPerLegalInvestor ?? Infinity)
        : (data?.maxUnitPerIndividualInvestor ?? Infinity)) &&
    unitCount <= (data?.unitAvailable ?? 0) &&
    amount % data?.unitAmount == 0;

  console.log(data?.unitAvailable);

  return (
    <div className="w-[90%] flex flex-col items-center justify-between h-[400px] pt-8 gap-y-5">
      {/*  input  */}
      <div className="w-full relative flex justify-start flex-col items-end gap-y-2  ">
        <span className="text-sm text-gray-main w-full text-start ">مبلغ سرمایه گذاری</span>{' '}
        <input
          className={`w-full lg:h-[48px] h-[38px] border relative  rounded-md text-right pr-4  border-gray-800 font-light text-gray-main text-sm  focus:outline-none focus:ring-0 focus:border-[#364A87] `}
          maxLength={20}
          onChange={(e) => {
            const value = e.target.value.replace(/,/g, ''); // Remove commas
            if (/^\d*$/.test(value)) {
              // Only allow digits (no other characters)
              setAmount(value); // Set the value only if it's numeric
            }
          }}
          value={amount ? Number(amount).toLocaleString() : ''}
          inputMode="numeric"
        />
        <span className="text-gray-main text-base absolute lg:top-10 top-9 left-4 ">ریال</span>
        {/* validation info */}
        <span className="w-[95%] text-start text-xs text-[#939393]">
          {' '}
          {amount ? Num2persian(amount) : 0} ریال
        </span>
        <span
          className={`lg:text-sm  text-xs  font-medium  w-full text-start pt-10 ${
            handleInputValidation()?.color
          } `}>
          {handleInputValidation()?.text}
        </span>
        <span
          className={`lg:text-sm  text-xs  font-medium  w-full text-start  ${
            amount % data?.unitAmount == 0 ? ' text-gray-main' : ' text-red-main'
          } `}>
          ارزش هر گواهی: {data?.unitAmount && Number(data?.unitAmount).toLocaleString()} (ریال)
        </span>{' '}
        <span
          className={`w-full text-start  text-xs ${
            amount % data?.unitAmount == 0 ? ' text-gray-main' : ' text-red-main'
          }`}>
          {' '}
          ( مبلغ سرمایه گذاری باید مضربی مبلغ هرگواهی باشد )
        </span>
        <span
          className={`lg:text-sm  text-xs  font-medium  w-full text-start  ${
            unitCount <= (data?.unitAvailable ?? 0) ? ' text-gray-main' : ' text-red-main'
          } `}>
          تعداد واحد باقی مانده :{' '}
          {data?.unitAvailable && Number(data?.unitAvailable).toLocaleString()}
        </span>
      </div>

      {/* ask to show name  */}
      <div
        className=" w-full flex justify-start items-center gap-x-2 flex-nowrap cursor-pointer lg:pt-0 pt-10 "
        onClick={() => setShowName(!showName)}>
        <input
          onClick={() => setShowName(!showName)}
          type="checkbox"
          checked={showName}
          className="w-4 h-4 focus:outline-none focus:ring-0  text-[#364A87] border border-[#364A87] rounded-sm "
        />
        <span className="text-nowrap text-gray-main text-xs">
          اجازه نمایش نام شما به عنوان سرمایه گذار این طرح{' '}
        </span>
      </div>
      <div className="w-full flex justify-start items-center ">
        {' '}
        <button
          disabled={!disable}
          onClick={() => setStep('paymethod')}
          className={`w-[115px] lg:h-[48px] h-[38px] bg-[#C9B777] ${
            !disable && ' opacity-60'
          } text-white text-sm font-medium rounded-md text-center flex justify-center items-center focus:outline-none focus:ring-0 focus:border-none`}>
          ادامه
        </button>
      </div>
    </div>
  );
}

export default SetAmount;
