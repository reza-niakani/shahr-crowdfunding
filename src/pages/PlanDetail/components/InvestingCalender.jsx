import Axios from 'comon/Axios/Axios';
import DateFunctions from 'comon/DateFunction/DateFunctions';
import React, { useEffect, useState } from 'react';

function InvestingCalender({ id, padding = true }) {
  const [calender, setCalender] = useState();

  useEffect(() => {
    GetTimeline();
  }, []);

  const GetTimeline = async () =>
    await Axios.get(`/InvestmentPlans/GetTimeline/${id}`)
      .then((res) => setCalender(res?.data))
      .catch(() => setCalender(false));

  return (
    <div
      className={`w-full h-auto flex flex-col items-center justify-between gap-y-5  ${
        padding ? 'lg:py-8 py-5 ' : ''
      }   text-gray-main `}>
      {' '}
      <span className="text-start w-[90%] font-semibold lg:text-lg text-base  ">
        تقویم سرمایه گذاری
      </span>
      {calender && calender?.length > 0 ? (
        <div className="lg:w-[90%] w-[95%] h-auto  lg:max-h-[320px] max-h-[170x] overflow-y-auto flex flex-col  justify-start items-start py-5  ">
          {calender?.map((item, index) => (
            <div
              key={index}
              className="lg:w-[95%] w-full h-full flex justify-start  items-start  gap-x-2 lg:gap-x-3">
              <div className="flex flex-col items-center justify-start">
                <input
                  checked={item?.status}
                  type="checkbox"
                  disabled
                  readOnly
                  className={`focus:outline-none focus:ring-0 text-accent-600 rounded-full lg:w-6 w-4 lg:h-6 h-4 border ${
                    item?.status ? ' border-accent-600' : ' border-gray-main'
                  }`}
                />

                {index !== calender?.length - 1 && (
                  <div
                    className={`h-auto min-h-6   flex flex-grow border-r ${
                      item?.status ? 'border-accent-600' : 'border-gray-main'
                    }`}
                  />
                )}
              </div>
              <div className="w-full flex justify-between items-center h-6 gap-x-2 lg:text-sm text-xs text-gray-main lg:font-medium">
                <span className={`w-auto text-start     `}>{item?.title}</span>{' '}
                <span className={`w-auto  text-start   `}>
                  {item?.date && DateFunctions.getDate(item?.date)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span className="text-base w-full font-medium text-center text-gray-main py-5">
          تقویمی مشخص نشده است!{' '}
        </span>
      )}
    </div>
  );
}

export default InvestingCalender;
