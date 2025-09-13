// Import necessary packages
import React, { useEffect, useState } from 'react';
import moment from 'moment-jalaali';

// Enable Jalaali (Persian) mode in moment
moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const DailyPersianDate = () => {
  const [persianDate, setPersianDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      // Get today's date in Persian format (e.g., شنبه 1 فروردین 1402)
      const currentDate = moment().format('dddd jD jMMMM jYYYY');
      setPersianDate(currentDate);
    };

    // Set the date on component load
    updateDate();

    // Optional: If you want the date to update daily at midnight, you can add a timer.
    const interval = setInterval(updateDate, 24 * 60 * 60 * 1000); // Every 24 hours

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return <div>{persianDate}</div>;
};

export default DailyPersianDate;
