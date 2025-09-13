import React from 'react';

//  function for input that allows only numbers and empty, with optional separator and max value
export const handleAmountChange = (e, setState, useSeparator = false, maxValue = Infinity) => {
  let value = e.target.value;

  // Remove existing separators if any
  if (useSeparator) {
    value = value.replace(/,/g, '');
  }

  // Only update state if the input is a number or empty
  if (value === '' || /^[0-9]+$/.test(value)) {
    let numberValue = value === '' ? 0 : parseInt(value, 10);

    // Apply max value limit if set
    numberValue = Math.min(numberValue, maxValue);

    setState(numberValue);

    // If using separator, format the displayed value
    if (useSeparator) {
      e.target.value = numberValue.toLocaleString();
    } else {
      e.target.value = numberValue.toString();
    }
  }
};

// function for get persian ordinal
export const getPersianOrdinal = (number) => {
  if (number < 0 || !Number.isInteger(number)) {
    return 'Invalid input';
  }
  const specialCases = {
    0: 'صفرم',
    1: 'اول',
    2: 'دوم',
    3: 'سوم',
    4: 'چهارم',
    5: 'پنجم',
    6: 'ششم',
    7: 'هفتم',
    8: 'هشتم',
    9: 'نهم',
    10: 'دهم',
    11: 'یازدهم',
    12: 'دوازدهم',
    13: 'سیزدهم',
    14: 'چهاردهم',
    15: 'پانزدهم',
    16: 'شانزدهم',
    17: 'هفدهم',
    18: 'هجدهم',
    19: 'نوزدهم',
    20: 'بیستم',
    30: 'سی‌ام',
    40: 'چهلم',
    50: 'پنجاهم',
    60: 'شصتم',
    70: 'هفتادم',
    80: 'هشتادم',
    90: 'نودم',
    100: 'صدم',
    200: 'دویستم',
    300: 'سیصدم',
    400: 'چهارصدم',
    500: 'پانصدم',
    600: 'ششصدم',
    700: 'هفتصدم',
    800: 'هشتصدم',
    900: 'نهصدم',
    1000: 'هزارم'
  };

  if (number in specialCases) {
    return specialCases[number];
  }

  const units = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
  const tens = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
  const scales = ['', 'هزار', 'میلیون', 'میلیارد'];

  const convertThreeDigits = (num) => {
    if (num === 0) return '';
    let result = '';
    if (num >= 100) {
      result += units[Math.floor(num / 100)] + 'صد';
      num %= 100;
      if (num > 0) result += ' و ';
    }
    if (num >= 20) {
      result += tens[Math.floor(num / 10)];
      if (num % 10 > 0) result += ' و ' + units[num % 10];
    } else if (num > 0) {
      result += units[num];
    }
    return result;
  };

  let result = '';
  let scaleIndex = 0;

  while (number > 0) {
    const threeDigits = number % 1000;
    if (threeDigits > 0) {
      const convertedPart = convertThreeDigits(threeDigits);
      if (result !== '') result = ' و ' + result;
      result = convertedPart + (scaleIndex > 0 ? ' ' + scales[scaleIndex] : '') + result;
    }
    number = Math.floor(number / 1000);
    scaleIndex++;
  }

  return result + 'م';
};

//  for direct download file
export const downloadFile = async (path, nameOnly = null, e) => {
  e.preventDefault();
  try {
    const response = await fetch(path);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    // Extract the file extension from the original path
    const originalName = path.split('/').pop();
    const extension = originalName.includes('.') ? originalName.split('.').pop() : '';

    // Set the download filename with the new name and original extension
    link.download = nameOnly ? `${nameOnly}.${extension}` : originalName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
  }
};

export const truncateDescription = (description, maxLength = 40) => {
  if (!description) return '';
  return description.length > maxLength
    ? description.slice(0, maxLength).trim() + '...'
    : description;
};

// export const FormatTextWithLineBreaks = (text) => {
//   if (!text) return null;

//   return text.split('<br>').map((line, index) => (
//     <React.Fragment key={index}>
//       {line}
//       <br />
//     </React.Fragment>
//   ));
// };

export const FormatTextWithLineBreaks = (text) => {
  // Ensure text is a string
  if (typeof text !== 'string') return null;

  // Normalize all types of line breaks and <br> tags into one consistent split point
  const lines = text.split(/(?:<br\s*\/?>|<\/br>|\r?\n)+/i); // handles <br>, </br>, \n, \r\n

  const result = [];
  let bulletItems = [];

  const isBullet = (line) => /^\s*(•|-|\d+\.)\s+/.test(line);

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed === '') return; // Skip empty lines

    if (isBullet(trimmed)) {
      bulletItems.push(trimmed);
    } else {
      if (bulletItems.length > 0) {
        result.push(
          <ul key={`ul-${index}`} style={{ paddingLeft: '20px', margin: 0 }}>
            {bulletItems.map((item, i) => (
              <li key={`li-${i}`}>{item.replace(/^\s*(•|-|\d+\.)\s+/, '')}</li>
            ))}
          </ul>
        );
        bulletItems = [];
      }

      result.push(
        <React.Fragment key={`line-${index}`}>
          {trimmed}
          <br />
        </React.Fragment>
      );
    }
  });

  if (bulletItems.length > 0) {
    result.push(
      <ul key={`ul-end`} style={{ paddingLeft: '20px', margin: 0 }}>
        {bulletItems.map((item, i) => (
          <li key={`li-end-${i}`}>{item.replace(/^\s*(•|-|\d+\.)\s+/, '')}</li>
        ))}
      </ul>
    );
  }

  return result;
};
// number inout handler
// Global Input Handler Function
export function handleNumberInput(e, setState) {
  let value = e.target.value;

  // Convert Persian numbers to English
  value = value.replace(/[\u06F0-\u06F9]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)));

  // Remove non-digit characters
  value = value.replace(/\D/g, '');

  setState(value);
}

export const FindFromArrayById = (array, id) => array?.find((item) => item.key == id);

export const getQueryParam = (param) => {
  return new URLSearchParams(window.location.search).get(param) || null;
};

export const CheckObjectValue = (details) => {
  return Object.values(details).every((value) => {
    if (Array.isArray(value)) return value.length > 0; // Check if array is not empty
    return value !== '' && value !== null && value !== undefined; // Check for empty string, null, or undefined
  });
};

export const isValidIranianMobile = (phoneNumber) => {
  const iranianMobileRegex = /^09\d{9}$/;
  return iranianMobileRegex.test(phoneNumber);
};

export const formatIranianMobile = (phoneNumber) => {
  // Remove all non-numeric characters
  let cleanedNumber = phoneNumber.replace(/\D/g, '');

  // Check if the number already starts with "98"
  if (cleanedNumber.startsWith('98')) {
    // return `+${cleanedNumber}`;
    return cleanedNumber;
  }

  // If the number starts with "0", remove it and add "98"
  if (cleanedNumber.startsWith('0')) {
    cleanedNumber = cleanedNumber.substring(1);
  }

  // Add the country code "+98" to the beginning
  // return `+98${cleanedNumber}`;
  return `98${cleanedNumber}`;
};

export const generateColorFromNumber = (num) => {
  // Convert number to a hash
  let hash = 0;
  const str = num.toString();

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to a HEX color
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).slice(-2);
  }

  return color;
};
