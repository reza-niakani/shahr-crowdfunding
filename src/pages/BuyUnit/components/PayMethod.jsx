import React, { useState } from 'react';

function PayMethod({ setStep }) {
  const [selectedMethod, setSelectedMethod] = useState();

  const methods = [
    {
      key: 'gatway',
      title: 'واریز از طریق کارت بانکی',
      desc: 'با هر کارت بانکی بنام سرمایه‌گذار'
    },
    {
      key: 'reciept',
      title: 'واریز از طریق شعب بانک (فیش واریزی)',
      desc: ''
    }
  ];

  return (
    <div className="lg:w-[90%] w-full flex flex-col items-center justify-start h-[400px]  gap-y-7">
      {methods.map((item, index) => (
        <div
          onClick={() => setSelectedMethod(item.key)}
          key={index}
          className={`w-full cursor-pointer rounded-lg  min-h-[80px] flex flex-col items-center justify-center gap-y-3 ${
            item.key == selectedMethod
              ? 'border-2 border-accent-1000 drop-shadow-lg'
              : 'border border-gray-600'
          } `}>
          <div className="w-[90%] flex justify-start gap-x-2 items-center">
            <input
              onClick={() => setSelectedMethod(item.key)}
              type="radio"
              checked={selectedMethod == item.key}
              className="w-4 border border-[#C9B777] text-[#C9B777]  focus:outline-none focus:ring-0"
            />
            <span className="text-sm text-gray-main lg:font-bold font-semibold text-start">
              {item.title}
            </span>
          </div>
          <span className="text-xs text-[#787878] text-start w-[90%] pr-4">{item.desc}</span>
        </div>
      ))}
      <div className="w-full flex flex-col items-center justify-start gap-y-2 border border-gray-200  shadow-lg p-2 rounded-lg  ">
        <span className="text-accent-600"> اطلاعات حساب زاگرس کراد </span>
        <span dir="rtl" className="w-[90%] text-start  text-sm font-Yekan ">
          شبا: IR-500570029070014235627102
        </span>
        <span className="w-[90%] text-start  text-sm " dir="rtl">
          {' '}
          بانک پاسارگاد شعبه 290{' '}
        </span>
      </div>
      <div className="w-full flex justify-between items-center       ">
        {' '}
        <button
          disabled={!selectedMethod}
          onClick={() => setStep(selectedMethod)}
          className={`w-[115px] lg:h-[48px] h-[38px] bg-[#C9B777] ${
            !selectedMethod && ' opacity-60'
          } text-white text-sm font-medium rounded-md text-center flex justify-center items-center focus:outline-none focus:ring-0 focus:border-none`}>
          ادامه
        </button>
        <button
          onClick={() => setStep('setamount')}
          className={`w-[115px] lg:h-[48px] h-[38px] text-[#C9B777]  border border-[#C9B777] text-sm font-medium rounded-md text-center flex justify-center items-center focus:outline-none focus:ring-0 `}>
          ویرایش مبلغ{' '}
        </button>
      </div>
    </div>
  );
}

export default PayMethod;
