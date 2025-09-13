/* eslint-disable no-unused-vars */
import { DetectUserType } from 'comon/DB/SiteGuidEnum';
import React, { useState } from 'react';
import InlineSVG from 'react-inlinesvg';

function SiteGuide() {
  const [userType, setUserType] = useState('Investor');

  return (
    <div className="w-full flex flex-col items-center justify-between  gap-y-20">
      {/* title  */}
      <div className="  bg-[url('asset/Pictures/BackGround/landingBg.svg')]  bg-cover w-screen  bg-no-repeat  bg-center lg:h-[600px] flex flex-col  justify-center   items-center gap-y-16 lg:py-0 ">
        <div className=" lg:w-[50%] w-[95%] flex flex-col items-center justify-center h-auto gap-y-10  pt-28 ">
          {' '}
          <span className="lg:text-4xl text-lg  font-extrabold text-accent-600  w-full text-center ">
            {' '}
            راهنمای سرمایه‌گذار و سرمایه‌پذیر{' '}
          </span>
          <p
            style={{ lineHeight: '35px' }}
            className="lg:w-[90%] w-[90%] text-center  lg:text-xl font-medium text-base  text-dark-700 lg:p-2">
            فرآیندهای شهرکراد به‌گونه‌ای طراحی شده‌اند که برای هر دو گروه سرمایه‌گذار و سرمایه‌پذیر،
            ساده، شفاف و قابل پیگیری باشند. چه بخواهید در طرحی اقتصادی سرمایه‌گذاری کنید و چه
            به‌دنبال جذب سرمایه برای توسعه کسب‌وکار خود باشید، مسیر مشخص و روشنی پیش روی شما قرار
            دارد. در ادامه، با مراحل کامل هر مسیر را به‌صورت گام‌به‌گام آشنا می‌شوید.
          </p>
        </div>
      </div>
      {/*  data as guid */}
      <div className=" w-full flex  flex-col  justify-start    gap-y-10 py-5 lg:py-0 items-center max-w-[1440px]  rounded-large h-auto  ">
        {/*  button selected user type  */}
        <div className="lg:w-[45%] w-[95%] h-[60px] rounded-large justify-center flex   items-center bg-[#F6F8FA] px-3  ">
          <button
            onClick={() => setUserType('Investor')}
            className={`w-[49%] h-[42px] rounded-lg  text-center border-0 focus:outline-none focus:ring-0   flex justify-center items-center text-base font-bold ${
              userType == 'Investor'
                ? ' bg-accent-600 text-white drop-shadow-lg'
                : ' text-gray-900 bg-transparent'
            } `}>
            سرمایه‌گذار{' '}
          </button>
          <button
            onClick={() => setUserType('Investee')}
            className={`w-[49%] h-[42px] rounded-lg  text-center border-0 focus:outline-none focus:ring-0   flex justify-center items-center text-base font-bold ${
              userType == 'Investee'
                ? ' bg-accent-600 text-white  drop-shadow-lg'
                : ' text-gray-900 bg-transparent'
            } `}>
            سرمایه‌پذیر{' '}
          </button>
        </div>
        {/*  guid text for each type */}
        <div className="lg:w-[90%] w-[95%] flex lg:flex-row flex-wrap flex-col lg:items-start items-center lg:justify-center justify-start gap-12 ">
          {DetectUserType(userType)?.map((item, index) => (
            <div
              style={{ boxShadow: '0px 2px 10px 0px rgba(1, 182, 155, 0.1)' }}
              key={index}
              className={` w-full bg-white rounded-large flex flex-col items-center justify-start p-5 gap-y-3  ${
                userType == 'Investee' ? ' lg:w-[30%] min-h-[260px] ' : ' lg:w-[48%]  min-h-[230px]'
              }`}>
              <div className="w-full flex justify-start items-center gap-x-5 ">
                <div className="w-14 h-[49px] border-8 border-accent-400 pt-1 bg-accent-700 text-center text-white font-bold  flex justify-center items-center text-base rounded-full  ">
                  {index + 1}
                </div>
                {/* title */}
                <span className="text-start w-full text-base font-bold text-gray-800  ">
                  {item.title}
                </span>
              </div>
              {/* description */}
              <p
                style={{ lineHeight: '28px' }}
                className="w-[95%] text-sm  text-gray-600 text-justify   ">
                {item?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SiteGuide;
