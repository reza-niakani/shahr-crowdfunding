/* eslint-disable no-unused-vars */
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import InlineSVG from 'react-inlinesvg';
// import calnder from 'asset/Images/Icons/calendar_month.svg';
import './style.css';
const DatePickerPersian = ({
  value,
  onchange,
  height,
  label,
  width,
  icon = true,
  readOnly = false,
  placeholder,
  error = false,
  name,
  alertColor,
  onlyMonth = false,
  styleName
}) => {
  // Function to handle the date conversion correctly
  const handleDateChange = (date) => {
    const jsDate = date.toDate(); // Convert the date to a JavaScript Date object
    jsDate.setHours(12, 0, 0, 0); // Set the time to noon to avoid timezone issues
    onchange(jsDate.toISOString(), name); // Pass the ISO string to the onchange handler
  };

  return (
    <div className={`h-auto flex flex-col gap-y-1 items-end relative  w-full`}>
      {label && (
        <label className={` text-gray-main w-full justify-start text-sm font-medium `}>
          {label}
        </label>
      )}

      <DatePicker
        calendar={persian}
        locale={persian_fa}
        format={onlyMonth && 'MMMM YYYY'}
        value={value}
        onlyMonthPicker={onlyMonth}
        onChange={handleDateChange}
        name={name}
        render={
          <input
            dir="rtl"
            className={`focus:border-0 focus:outline-none placeholder:text-[9px] focus:ring-0  relative  rounded-lg
        w-full bg-gray-200 text-center pr-2 text-base  ${height ? height : 'h-[38px]'}
        ${alert && alertColor ? alertColor : 'text-gray-main  '}
        rounded-Radius`}
            readOnly={readOnly}
            placeholder={placeholder}
          />
        }
      />

      {/* <span className="text-red-50 text-sm font-light pr-5"> {alert}</span> */}
      {/* {icon && (
          <InlineSVG
            src={calnder}
            className="w-fit flex justify-start -mt-8 relative left-2 z-50 "
          />
        )} */}
    </div>
  );
};

export default DatePickerPersian;
