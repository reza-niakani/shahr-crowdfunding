import React from 'react';
import DateFunctions from 'comon/DateFunction/DateFunctions';

function DateDistancerCounter({ date }) {
  const days = [
    {
      date: DateFunctions.calculateDateDistance(
        DateFunctions.getDateFromNumber(-2),
        date?.split('T')?.[0]
      ),
      today: false
    },
    {
      date: DateFunctions.calculateDateDistance(
        DateFunctions.getDateFromNumber(-1),
        date?.split('T')?.[0]
      ),
      today: false
    },
    {
      date: DateFunctions.calculateDateDistance(
        DateFunctions.getDateFromNumber(0),
        date?.split('T')?.[0]
      ),
      today: true
    },
    {
      date: DateFunctions.calculateDateDistance(
        DateFunctions.getDateFromNumber(1),
        date?.split('T')?.[0]
      ),
      today: false
    },
    {
      date: DateFunctions.calculateDateDistance(
        DateFunctions.getDateFromNumber(2),
        date?.split('T')?.[0]
      ),
      today: false
    }
  ];

  return (
    <div className="w-full flex justify-start gap-x-6  items-center">
      {days?.map((item, index) => (
        <div
          key={index}
          className={`w-[40px] h-[50px] text-xs font-bold rounded-lg ${
            item?.date > 0 ? 'flex flex-col ' : 'hidden'
          } items-center justify-center gap-y-1 ${
            item?.today ? 'bg-[#C9B777] text-white' : ' bg-transparent text-gray-main '
          } `}>
          {item.date}
          <span>روز</span>
        </div>
      ))}
    </div>
  );
}

export default DateDistancerCounter;
