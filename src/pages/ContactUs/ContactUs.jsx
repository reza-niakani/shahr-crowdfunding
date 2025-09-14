/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import callus from 'asset/Pictures/Icons/callUs.svg';
import location from 'asset/Pictures/Icons/location.svg';
import mail from 'asset/Pictures/Icons/mail.svg';
import socialMedia from 'asset/Pictures/Icons/socialMedia.svg';
import InlineSVG from 'react-inlinesvg';
import linkedIn from 'asset/Pictures/Icons/linkdin.svg';
import insta from 'asset/Pictures/Icons/instagram.svg';
import telegram from 'asset/Pictures/Icons/telegram.svg';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import { formatIranianMobile, handleNumberInput } from 'comon/GlobalyTools/UseAbleFunctions';
import Axios from 'comon/Axios/Axios';
import DateFunctions from 'comon/DateFunction/DateFunctions';

function ContactUs() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [fullname, setFullname] = useState();
  const [response, setResponse] = useState();
  const [isloadIng, setIsloadIng] = useState();

  const CreateConsultingRequest = async (e) => {
    e.preventDefault();

    setIsloadIng(true);
    await Axios.post('/Consultation/Create', {
      fullName: fullname,
      phoneNumber: formatIranianMobile(phoneNumber),
      approximateAmount: 1,
      date: DateFunctions.getFormattedTodayDate(),
      timeRange: 1
    })
      .then((res) => {
        console.log('response', res);

        setResponse({ text: 'ثبت شد ', color: ' text-accent-600 ' });
      })
      .catch(() => setResponse({ text: '   خطا ! ثبت ناموفق ', color: ' text-red-main' }))
      .finally(() => {
        setIsloadIng(false);
        setTimeout(() => {
          setResponse();
        }, 2000);
      });
  };

  const disable =
    !!phoneNumber && !!fullname && phoneNumber?.length > 10 && phoneNumber?.length < 13;
  const contactUsData = [
    {
      icon: location,
      title: 'آدرس دفتر مرکزی',
      data: (
        <p className="w-full text-justify text-sm text-gray-600  ">
          خیابان سید حسن نصرالله (خالد اسلامبولی) کوچه ۱۸ پلاک ۲
        </p>
      )
    },
    {
      icon: callus,
      title: 'شماره تماس',
      data: (
        <div className="w-[90%] flex flex-col   justify-start gap-y-1 items-center  text-gray-600  text-sm    ">
          <ul className="w-[90%]  list-disc flex flex-col  items-start justify-start  text-sm gap-y-1  ">
            <li>
              {' '}
              <a
                href="tel:021۵۸۱۳۷۳۰۲ "
                className="hover:text-accent-1000  w-[95%] text-start  hover:underline underline-offset-4 hover:font-medium pt-1">
                021-۵۸۱۳۷۳۰۲
              </a>
            </li>
            <li>شنبه تا چهارشنبه: 8 صبح تا 16</li>
            <li>پنجشنبه‌ها: 8 صبح تا 15</li>
          </ul>{' '}
        </div>
      )
    },
    {
      icon: mail,
      title: 'ایمیل',
      data: (
        <a
          href="mailto:info@shahrb-co.ir"
          className="hover:text-accent-1100  w-[90%] text-start  text-gray-600 hover:underline underline-offset-4 hover:font-medium">
          info@shahrb-co.ir
        </a>
      )
    },
    {
      icon: socialMedia,
      title: 'شبکه‌های اجتماعی',
      data: (
        <div className="w-[90%]  flex flex-wrap justify-start gap-x-7  text-gray-800  text-sm  font-bold ">
          <a
            // href="https://www.linkedin.com/company/parsian-lotus-investment-bank/"
            target="_blank"
            className="w-auto flex flex-nowrap items-center gap-x-1  hover:text-accent-1100 "
            rel="noreferrer">
            <InlineSVG src={linkedIn} />
            لینکدین
          </a>
          <a
            // href="https://www.instagram.com/lotusib.ir?igsh=MWYydml4b3U4dzZzZg=="
            target="_blank"
            rel="noreferrer"
            className="w-auto flex flex-nowrap items-center gap-x-1  hover:text-accent-1100 ">
            <InlineSVG src={insta} />
            اینستاگرام{' '}
          </a>
          <a
            // href="https://t.me/LotusParsian"
            target="_blank"
            rel="noreferrer"
            className="w-auto flex flex-nowrap items-center gap-x-1  hover:text-accent-1100 ">
            <InlineSVG src={telegram} />
            تلگرام{' '}
          </a>
        </div>
      )
    }
  ];
  return (
    <div className="w-full flex flex-col items-center justify-between  gap-y-20">
      {/* title  */}
      <div className="  bg-[url('asset/Pictures/BackGround/landingBg.svg')]  bg-cover w-screen  bg-no-repeat  bg-center lg:h-[800px] flex flex-col justify-center   items-center gap-y-16 lg:py-0 ">
        <div className=" lg:w-[50%] w-[95%] flex flex-col items-center justify-center h-auto gap-y-10  pt-28 ">
          {' '}
          <span className="lg:text-4xl text-lg  font-extrabold text-accent-600  w-full text-center ">
            {' '}
            تماس با ما{' '}
          </span>
          <p
            style={{ lineHeight: '35px' }}
            className="lg:w-[70%] w-[90%] text-center  lg:text-xl font-medium text-base  text-dark-700 lg:p-2">
            ما در شهرکراد مشتاق شنیدن نظرات، سوالات و پیشنهادات شما هستیم. برای ارتباط با ما
            می‌توانید از یکی از روش‌های زیر استفاده کنید:
          </p>
        </div>
        <div className="w-full flex lg:flex-wrap lg:flex-row flex-col justify-center lg:gap-12 gap-3 items-center max-w-[1440px] ">
          {contactUsData?.map((item, index) => (
            <div
              key={index}
              className="lg:w-[45%] lg:min-w-[505px] max-w-[435px] flex w-[90%]  flex-col items-center  justify-between p-5  bg-white   rounded-large drop-shadow-md h-[150px] ">
              <div className="w-[95%] justify-start items-center gap-x-2 flex ">
                <InlineSVG src={item.icon} className="w-[50px] h-[50px]" />
                <span className=" lg:text-lg text-base font-bold   ">{item?.title}</span>
              </div>
              <div className="w-[95%] justify-center items-center gap-x-2 flex  text-gray-main">
                {item?.data}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:w-[60%] w-[95%] flex lg:flex-row flex-col lg:justify-center justify-between   lg:gap-12 gap-y-5 py-5 lg:py-0 items-center max-w-[1440px] bg-accent-600 rounded-large h-auto lg:h-[380px] ">
        <div className="lg:w-[50%] flex flex-col items-center justify-center gap-y-5 text-white h-full p-5  w-full ">
          <span className="lg:w-[90%] w-full lg:text-lg text-base font-bold  text-start   ">
            فرم تماس
          </span>
          <p className="lg:w-[85%] w-[95%] text-justify lg:text-base text-sm  ">
            در صورتی که مایل به دریافت اطلاعات بیشتر یا ارسال پیام به تیم شهر هستید، می‌توانید فرم
            زیر را تکمیل کنید. کارشناسان ما در کوتاه‌ترین زمان ممکن پاسخگوی شما خواهند بود.
          </p>
          <span className="lg:w-[90%] w-full text-start   lg:text-base text-sm font-bold ">
            ساعت پاسخگویی
          </span>
          <ul className="lg:w-[78%] w-[85%] list-disc flex flex-col  items-start justify-start gap-y-2 lg:text-base text-sm font-bold ">
            <li>شنبه تا چهارشنبه: 8 صبح تا 16</li>
            <li>پنجشنبه‌ها: 8 صبح تا 15</li>
          </ul>
        </div>
        {/*  from  */}
        <form
          onSubmit={CreateConsultingRequest}
          className="lg:w-[40%] w-[95%]   flex flex-col  lg:gap-y-10 gap-y-3 items-center py-5 bg-white shadow-dropShadow2 rounded-large justify-center  ">
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
              dir="ltr"
              placeholder="شماره تماس خود را به صورت (09..)  "
              name="phoneNumber"
              className={` rounded-lg w-[60%] lg:min-w-[165px] border   focus:outline-none text-sm focus:ring-0 placeholder:text-[10px]    text-center placeholder:text-gray-300 text-gray-main  placeholder:pr-3 h-[40px] `}
              inputMode="numeric"
              onChange={(e) => handleNumberInput(e, setPhoneNumber)}
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
              className={`rounded-lg w-[60%] lg:min-w-[165px] border focus:outline-none focus:ring-0 text-sm  placeholder:text-start  placeholder:text-[10px] text-center placeholder:text-gray-300 text-gray-main  placeholder:pr-3 h-[40px] `}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          {response && (
            <span className={`${response?.color}  text-xs text-start font-medium `}>
              {response?.text}
            </span>
          )}
          <button
            type="submit"
            disabled={!disable}
            className={` w-[90%] focus:outline-none focus:ring-0 text-center rounded-lg  ${
              !disable && ' opacity-60'
            } focus:border-0 text-white font-black lg:text-base text-sm h-[40px] ${
              isloadIng ? 'border border-accent-600' : 'bg-accent-600  '
            }`}>
            {isloadIng ? <BouncingDotsLoader /> : 'درخواست مشاوره'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
