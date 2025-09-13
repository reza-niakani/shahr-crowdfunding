import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import React, { useState } from 'react';

function RequestForConsulting() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [fullname, setFullname] = useState();
  const isMobile = useDeviceDetection();

  return (
    <div className="lg:w-[70%] w-full h-[80%] flex lg:justify-start gap-y-5 justify-center  items-center">
      {/* form  */}
      <div className="lg:w-[28%] w-[90%] h-full flex flex-col lg:justify-center lg:gap-y-16 gap-y-4 justify-end  items-center">
        <span className=" lg:text-[40px] text-2xl font-black text-gray-main  text-center whitespace-nowrap  ">
          شهر،
          <br />
          {!isMobile && <br />} نماد سرمایه گذاری{' '}
        </span>
        {/* <span className="lg:w-full w-[80%] lg:text-justify text-center lg:text-xl text-sm  font-medium  text-gray-main  ">
          فرصتی برای سرمایه گذاری پر سود پیش بینی سود بیش از ۴۰٪
        </span> */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('submit test');
          }}
          className="w-[95%] lg:min-w-[290px] flex flex-col  lg:gap-y-5 gap-y-3 items-center py-5 bg-white shadow-dropShadow2 rounded-large justify-center  ">
          {/* phone number  */}
          <div className="w-[90%] flex items-center justify-between   ">
            <label
              htmlFor="phoneNumber"
              className="lg:text-xs text-[10px] text-gray-main  font-bold w-auto text-nowrap  ">
              شماره تماس
            </label>
            <input
              maxLength={13}
              value={phoneNumber}
              placeholder="شماره تماس خودرا وارد کنید"
              name="phoneNumber"
              className=" rounded-lg w-[60%] lg:min-w-[165px] border focus:outline-none text-sm focus:ring-0 placeholder:text-[10px] placeholder:text-start   text-center placeholder:text-gray-300 text-gray-main  placeholder:pr-3 h-[33px] "
              inputMode="numeric"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          {/*  full name  */}
          <div className="w-[90%] flex items-center justify-between   ">
            <label
              htmlFor="fullName"
              className="lg:text-xs text-[10px] text-gray-main  font-bold w-auto text-nowrap  ">
              نام و نام خانوادگی{' '}
            </label>
            <input
              placeholder="نام و نام خانوادگی خودرا وارد کنید"
              value={fullname}
              name="fullName"
              className=" rounded-lg w-[60%] lg:min-w-[165px] border focus:outline-none focus:ring-0 text-sm  placeholder:text-start  placeholder:text-[10px] text-center placeholder:text-gray-300 text-gray-main  placeholder:pr-3 h-[33px] "
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`w-[90%] focus:outline-none focus:ring-0 text-center rounded-lg  focus:border-0 text-white font-black lg:text-base text-sm h-[33px]  ${fullname && phoneNumber ? 'bg-accent-600' : 'bg-gray-800'}  `}>
            درخواست مشاوره
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestForConsulting;
