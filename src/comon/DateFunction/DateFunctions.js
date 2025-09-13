/* eslint-disable no-unused-vars */
import moment from 'moment';
import 'moment-jalaali';
import jalaali from 'jalaali-js';

function getOneYearAgoAndToday() {
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return {
    today: formatDate(today),
    oneYearAgo: formatDate(oneYearAgo)
  };
}

const getDate = (data) =>
  new Date(data).toLocaleString('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    formatMatcher: 'basic',
    numberingSystem: 'latn'
  });

const ConvertDate = (persianDate) => {
  // Map of Persian month names
  const persianMonths = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند'
  ];

  const [year, month, day] = persianDate.split('/');

  const persianMonthName = persianMonths[parseInt(month) - 1];

  return `${year} ${persianMonthName} ${day}`;
};
const getFormattedTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based month
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getFormattedDateOneYearAgo = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 1);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based month
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const getFormattedDate = (monthsAgo = 12) => {
  const today = new Date();
  today.setMonth(today.getMonth() - monthsAgo);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based month
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
function addOneDay(dateStr) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export const convertToGregorianForJalaloDash = (jalaliDate) => {
  const [jy, jm, jd] = jalaliDate.split('-').map(Number);
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
  return `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`;
};

const ConvertJlaliToNormalDate = (date) => moment(date, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');

function GetDateDistance(inputDate) {
  // input date must be have this format '2024-12-31'
  // Convert input to Date object if it's not already
  const date = inputDate instanceof Date ? inputDate : new Date(inputDate);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error('Invalid date input');
    return 0;
  }
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

//  only return distance between now and date that prop
function calculateDateDifference(dateString) {
  // Convert the input string to a Date object
  const inputDate = new Date(dateString);

  // Add one day to the input date
  inputDate.setDate(inputDate.getDate() + 1);

  // Get the current date and time
  const currentDate = new Date();

  // Calculate the difference in time (in milliseconds)
  const timeDifference = inputDate - currentDate;

  // Convert the time difference from milliseconds to days
  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return dayDifference;
}

function getJalaliDateAfterDays(days) {
  // Get today's date
  const today = new Date();

  // Calculate the target date by adding the given number of days
  const targetDate = new Date();
  targetDate.setDate(today.getDate() + days);

  // Convert the target date to Jalali format
  const jalaliDate = jalaali.toJalaali(targetDate);

  // Format the Jalali date as YYYY-MM-DD
  const formattedDate = `${jalaliDate.jy}-${String(jalaliDate.jm).padStart(2, '0')}-${String(
    jalaliDate.jd
  ).padStart(2, '0')}`;

  return formattedDate;
}

const calculateDateDistance = (date1, date2) => {
  //  date format:   '2024-02-10';
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Calculate the difference in milliseconds
  const diffTime = Math.abs(d2 - d1);

  // Convert milliseconds to days
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

//  get number and depends of number and is posetive and negetive or be zero return requierd date
const getDateFromNumber = (n) => {
  const today = new Date();
  today.setDate(today.getDate() + n); // Add or subtract days
  return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

export default {
  addOneDay,
  getFormattedTodayDate,
  getOneYearAgoAndToday,
  getFormattedDateOneYearAgo,
  getDate,
  ConvertDate,
  GetDateDistance,
  calculateDateDifference,
  getFormattedDate,
  ConvertJlaliToNormalDate,
  convertToGregorianForJalaloDash,
  getJalaliDateAfterDays,
  calculateDateDistance,
  getDateFromNumber
};
