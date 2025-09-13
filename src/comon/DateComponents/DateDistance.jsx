/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const DateDistance = ({ endDate, textColor = false, textSize = false }) => {
  const [timeDifference, setTimeDifference] = useState('');

  useEffect(() => {
    // Function to calculate the time difference
    const calculateDifference = () => {
      // Current date in UTC
      const nowUtc = new Date();
      // Tehran timezone adjustment: UTC+3:30 (3 hours and 30 minutes)
      const tehranOffsetMs = 3 * 60 * 60 * 1000 + 30 * 60 * 1000;
      const startDate = new Date(nowUtc.getTime() + tehranOffsetMs);

      const end = new Date(endDate); // End date provided as prop

      // Calculate difference in milliseconds
      const differenceInMs = end - startDate;

      if (differenceInMs + 1 <= 0) {
        // If the difference is zero or negative, show "اتمام"
        setTimeDifference(<div className="lg:text-sm text-xs text-secondary-900">اتمام</div>);
        return;
      }

      // Convert the difference into days, hours, and minutes
      const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
      const differenceInHours = Math.floor(differenceInMinutes / 60);
      const differenceInDays = Math.floor(differenceInHours / 24) + 1;

      const minutes = differenceInMinutes % 60;
      const hours = differenceInHours % 24;
      const days = differenceInDays;

      // Construct the formatted string in Persian
      const formattedDifference = (
        <div
          className={`flex items-center w-auto gap-x-5  ${
            textSize ? textSize : 'lg:text-sm text-xs'
          } `}>
          {/* <div className="w-fit flex-col flex justify-start items-center text-secondary-900  gap-y-1">
            <span>{minutes}</span>
            <span>دقیقه</span>
          </div>
          <div className="w-fit flex-col flex justify-start items-center text-secondary-900  gap-y-1">
            <span>{hours}</span>
            <span>ساعت</span>
          </div> */}
          <div
            className={`w-fit flex justify-start items-center  ${
              textColor ? textColor : 'text-white'
            }   gap-x-1`}>
            <span>{days}</span>
            <span>روز</span>
          </div>
        </div>
      );
      setTimeDifference(formattedDifference);
    };

    // Run the calculation
    calculateDifference();
  }, [endDate]);

  return <div>{timeDifference}</div>;
};

export default DateDistance;
