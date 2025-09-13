import React from 'react';

function TabButtons({ step, setStep }) {
  const TabItem = [
    { name: 'شرح طرح', key: 'description' },
    { name: 'اطلاعات و ارزیابی', key: 'evaluations' },
    { name: 'اطلاعات مالی', key: 'finnancial' },
    { name: 'برنامه', key: 'program' },
    { name: 'مدارک', key: 'documents' }
  ];
  return (
    <div className="flex items-center justify-between gap-x-9 w-[97%] overflow-x-auto border-b border-[#D9D9D9] px-2">
      {TabItem?.map((item, index) => (
        <button
          key={index}
          onClick={() => setStep(item?.key)}
          className={`${
            step == item.key
              ? ' border-b-2 border-green-1100 font-bold text-green-1100'
              : 'text-[#999999]'
          }  w-auto lg:h-[35px] h-[28px]  text-sm   flex text-center text-nowrap  items-start justify-center focus:outline-none focus:ring-0`}>
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default TabButtons;
