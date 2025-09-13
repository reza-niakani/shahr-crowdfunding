import React from 'react';
import InlineSVG from 'react-inlinesvg';
import { Link } from 'react-router-dom';
import icon from 'asset/Pictures/Icons/userInfoIcon.svg';
import chevron from 'asset/Pictures/Icons/chevronLeftgold.svg';
import support from 'asset/Pictures/Icons/support.svg';

function StartPage({ userInfo, role }) {
  return (
    <div className="lg:w-full w-full flex flex-col items-center justify-start gap-y-5 ">
      <div
        className="lg:w-[90%] w-full flex flex-col justify-center items-center gap-y-5  h-[234px] rounded-[20px]"
        style={{
          background: 'radial-gradient(circle at center,  #009085 40%,  #009085 100%)'
        }}>
        <InlineSVG src={icon} />
        {/*  name  */}
        <span className="w-full text-center text-white font-bold text-sm  ">{userInfo?.title}</span>
        {/* user name */}
        <div className="w-full text-center flex justify-center gap-x-5 text-white font-medium text-sm  ">
          <span>{role == 'legal' ? 'شناسه ملی :' : 'کدملی : '}</span>
          <span className="font-light">{userInfo?.username}</span>
        </div>
        {/* phone number  */}
        <div className="w-full text-center flex justify-center gap-x-5 text-white font-medium text-sm  ">
          <span>شماره همراه :</span>
          <span className="font-light">{userInfo?.phoneNumber}</span>
        </div>
        {/* trading codes */}
        <div className="w-full text-center flex justify-center gap-x-5 text-white font-medium text-sm  ">
          <span>کد بورسی :</span>
          <span className="font-light">{userInfo?.tradingCodes?.[0]?.code || ' نامشخص'}</span>
        </div>
      </div>
      <div className="lg:w-[90%] w-full flex flex-col justify-start py-5 items-center gap-y-5 border border-[#E0E0E0] bg-white rounded-[20px]">
        {/*  bank info */}
        {role == 'real' && (
          <div className="w-[90%] flex flex-col items-center justify-start rounded-[20px]  gap-y-5 ">
            <span className="w-full text-start text-base font-medium text-[#383C41]">
              اطلاعات بانکی
            </span>

            <div
              className="w-full rounded-[20px] flex flex-col gap-y-7 items-center justify-center min-h-[250px]"
              style={{
                background: ' linear-gradient(135deg, rgb(1, 149, 170) 0%, rgb(1, 149, 170) 100%)'
              }}>
              {/* bank name */}
              <span className="w-[90%]  text-start text-base font-light text-white   ">
                {userInfo?.accounts?.[0]?.bank?.name}
              </span>
              {/* account number  */}
              <div className="w-[90%] flex justify-between items-center text-white  ">
                <span className="text-[20px] ">شماره حساب</span>
                <span className="text-[20px] font-bold  ">
                  {userInfo?.accounts?.[0]?.accountNumber}
                </span>
              </div>
              {/* sheba number  */}
              <span className="text-[20px] text-gray-main font-Yekan">
                {' '}
                {userInfo?.accounts?.[0]?.sheba}
              </span>
              {/* barnach number  */}
              <div className="w-[90%] flex justify-between items-center  ">
                <span className="text-base  "> کد شعبه</span>
                <span className="text-base  font-bold  ">
                  {userInfo?.accounts?.[0]?.branchCode}
                </span>
              </div>{' '}
            </div>
          </div>
        )}

        {/*  links */}
        <Link
          to="/user_info/sejam_info"
          className="w-[90%] border border-[#CCCCCC] flex items-center  rounded-large px-4 text-[#707070] text-base font-medium justify-between h-[56px] mt-10">
          {role == 'legal' ? 'اطلاعات شرکت' : 'اطلاعات فردی '}
          <InlineSVG src={chevron} />
        </Link>
        {/* <Link className="w-[90%] border border-[#CCCCCC] flex items-center  rounded-large px-4 text-[#707070] text-base font-medium justify-between h-[56px] ">
          قراردادهای من
          <InlineSVG src={chevron} />
        </Link>
        <Link className="w-[90%] border border-[#CCCCCC] flex items-center  rounded-large px-4 text-[#707070] text-base font-medium justify-between h-[56px] ">
          پیام‌های من <InlineSVG src={chevron} />
        </Link> */}
        <Link
          to="/user_info/logs"
          className="w-[90%] border border-[#CCCCCC] flex items-center  rounded-large px-4 text-[#707070] text-base font-medium justify-between h-[56px] ">
          گزارش ورود و خروج <InlineSVG src={chevron} />
        </Link>
      </div>

      <a
        href="tel:۰۲۱-۵۹۱۶۱۰۰"
        className="w-full  rounded-lg border border-[#E0E0E0] lg:hidden flex items-center justify-center gap-x-5 text-sm text-[#616161] bg-white h-[42px]">
        <div className="w-auto justify-start items-center flex gap-x-2 ">
          <InlineSVG src={support} />
          پشتیبانی
        </div>
        ۰۲۱-۵۹۱۶۱۰۰
      </a>
    </div>
  );
}

export default StartPage;
