/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import RequestForConsulting from './components/RequestForConsulting';
import { Link } from 'react-router-dom';
import InlineSVG from 'react-inlinesvg';
import chevronLeftgreen from 'asset/Pictures/Icons/chevronLeftgreen.svg';
import PlanCardSlider from './components/PlanCardSlider';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import chart from 'asset/Pictures/Images/upChart.svg';
import advertismentsMobile from 'asset/Pictures/Images/advertismentsMobile.svg';
import advertismentsDesktop from 'asset/Pictures/Images/advertismentsDesktop.svg';
import Articles from './components/Articles';
import AccordionFaqModel from 'comon/Accordion/AccordionFaqModel';
import { FAQEnum } from 'comon/DB/FAQ';
import handCoin from 'asset/Pictures/Images/handCoin.png';
import chevron from 'asset/Pictures/Icons/chevronLeftgreen.svg';

function HomePage() {
  const isMobile = useDeviceDetection();
  const [isOpenFaq, setIsOpenFaq] = useState(false);

  const openAccordinFaq = (id) => {
    if (isOpenFaq == id) {
      setIsOpenFaq(false);
    } else {
      setIsOpenFaq(id);
    }
  };

  // const CommercialPartner = [
  //   { name: '', pic: saderat, link: '' },
  //   { name: '', pic: sepehr, link: '' },
  //   { name: '', pic: brokrage, link: '' },
  //   { name: '', pic: sarmad, link: '' },
  //   { name: '', pic: sazman, link: '' },
  //   { name: '', pic: farabors, link: '' }
  // ];

  return (
    <div className="w-screen flex flex-col  justify-start lg:gap-y-40  gap-y-16 h-auto items-center  ">
      {/* banner part  */}
      <div className="  lg:bg-[url('asset/Pictures/BackGround/desktopBanner.svg')] bg-[url('asset/Pictures/BackGround/mobileBanner.svg')] bg-cover w-screen  bg-no-repeat  bg-center h-[600px] flex justify-center lg:items-end items-end lg:py-0 py-6  ">
        {/* consulting form  request*/}
        <RequestForConsulting />
      </div>
      <div className="w-full flex flex-col lg:gap-y-32 gap-y-20  justify-start h-auto items-center py-10 ">
        {/* plans */}
        <div className="w-full flex flex-col lg:gap-y-28 gap-y-5  justify-center items-center max-w-[1920px] lg:min-[1300px] bg-[url('asset/Pictures/BackGround/rectangelBackGround.svg')] bg-cover bg-inherit bg-no-repeat  ">
          <div className="lg:w-[70%] w-[95%] flex justify-between items-center  ">
            <span className=" text-sm lg:text-[32px] font-black ">
              فرصت های سرمایه گذاری در جریان{' '}
            </span>
            <Link
              to="/all_plans"
              className="flex justify-end items-center lg:gap-x-2 lg:text-base text-xs font-black text-accent-1000">
              مشاهده همه <InlineSVG src={chevronLeftgreen} />
            </Link>
          </div>
          <div className="lg:w-[80%] w-full flex justify-center items-center  ">
            <PlanCardSlider />
          </div>
        </div>
        {/* crowdfunding introduction */}
        <div
          style={{
            background:
              'radial-gradient(circle at center, #00B8AD, #00B8AD , #00B8AD ,  #00B8AD, #00B8AD )'
          }}
          className="lg:w-[70%]   w-[95%] flex lg:p-10 py-4 px-3  gap-y-3   justify-between  lg:flex-row flex-col  items-start  text-white lg:h-[480px] h-[700px] rounded-large lg:max-w-[1400px]  ">
          <div className="lg:w-[45%] w-[95%] flex flex-col items-start  justify-start gap-y-3 ">
            {' '}
            <div className="w-full lg:w-[90%] flex flex-col lg:text-3xl  text-lg font-black text-start  items-start  justify-start h-auto lg:gap-y-4 ">
              <span>تامین مالی جمعی </span>
              <span className=" lg:text-xl  text-base font-bold">
                مقایسه آنلاین فرصت‌های سرمایه‌گذاری در سپهر کراد
              </span>
            </div>
            <p
              className="w-full  flex flex-col lg:text-base   text-sm font-bold text-justify  items-start  justify-start h-auto  "
              style={{ lineHeight: isMobile ? '20px' : '30px' }}>
              راهی برای سهیم شدن در موفقیت‌های بزرگ
            </p>
            <p
              style={{ lineHeight: isMobile ? '25px' : '30px' }}
              className="w-full  flex flex-col lg:text-base    text-sm text-justify font-medium  items-start  justify-start h-auto gap-y-2  ">
              در تأمین مالی جمعی (crowdfunding)، افراد با سرمایه‌های کوچک و بزرگ در کنار هم قرار
              می‌گیرند تا منابع مورد نیاز یک طرح را تأمین کنند. هر سرمایه‌گذار می‌تواند حتی با
              مبالغی اندک، در پروژه‌های اقتصادی بزرگ مشارکت کند. شهرکراد، سکوی تأمین مالی جمعی، این
              امکان را فراهم کرده تا سرمایه‌گذاران در طرح‌های سودآور کسب‌وکارهای کوچک و متوسط مشارکت
              کنند؛ طرح‌هایی که پس از ارزیابی دقیق و دریافت مجوز از فرابورس، با شفافیت و نظارت کامل
              عرضه می‌شوند.
              <br /> با شهرکراد، حتی با سرمایه‌ای اندک می‌توانید وارد مسیر سرمایه‌گذاری پربازده و
              حرفه‌ای شوید
            </p>
          </div>
          {/*  picture  */}
          <img src={handCoin} className="lg:w-[45%] w-full lg:h-[420px] h-[250px] rounded-large " />
        </div>
        {/* benefits of investing */}
        <div className="lg:w-[70%] w-[90%]  flex lg:flex-row flex-col  lg:items-start items-center justify-center lg:gap-x-32 gap-y-3">
          <div className="lg:w-auto w-full lg:max-w-[760px] flex flex-grow  flex-col justify-start items-start lg:gap-y-10 gap-y-6">
            <span className="lg:w-[90%] w-full text-start font-black text-gray-700 lg:text-3xl text-lg ">
              مزایای سرمایه‌گذاری در تامین مالی جمعی{' '}
            </span>
            <ul className="w-[90%] flex flex-col lg:gap-y-5 gap-y-3 items-start  justify-start h-auto list-disc pr-5 lg:text-base text-xs  ">
              <li> امکان سرمایه‌گذاری با حداقل سرمایه</li>
              <li> امکان کسب بازدهی بالاتر از سود بانکی، در چارچوبی قانونی</li>
              <li>امکان مشارکت در طرح‌های اعتبارسنجی‌شده و دارای پشتوانه ضمانت‌ اصل سرمایه</li>
              <li>دسترسی شفاف به اطلاعات کامل هر طرح پیش از تصمیم‌گیری</li>
              <li>پشتیبانی کامل و مشاوره تخصصی در تمام مراحل سرمایه‌گذاری</li>
              <li>فرآیند سرمایه‌گذاری سریع، آنلاین و شفاف</li>
            </ul>
          </div>
          <InlineSVG src={chart} className="lg:w-[540px] lg:h-[500px] w-[240px] h-[240px]  " />
        </div>
        {/* commercial partner */}
        {/* <div className="lg:w-[70%] w-[90%]  flex flex-col lg:gap-y-16 gap-y-4 justify-center items-center  ">
          <span className="text-lg font-black lg:text-3xl text-center ">همراهان شهرکراد </span>
          <div className="w-full flex flex-wrap lg:gap-8 gap-4 justify-center ">
            {CommercialPartner.map((item, index) => (
              <img
                key={index}
                src={item.pic}
                className="lg:w-[180px] lg:h-[100px] w-[95px] h-[53px] rounded-large bg-primary-100 "
              />
            ))}
          </div>
        </div> */}
        {/* advertisments banner */}
        {/* <InlineSVG
          src={isMobile ? advertismentsMobile : advertismentsDesktop}
          alt="تصویر در حال بارگذاری است "
          className="lg:w-[70%] w-[90%] h-fit   rounded-large   "
        /> */}
        <div
          style={{
            background: 'radial-gradient(circle at center, #00B8AD, #00B8AD ,  #00B8AD , #00b8ac83)'
          }}
          className="lg:w-[70%] w-[90%] min-h-[210px] h-auto rounded-lg drop-shadow-md    flex flex-col items-center justify-center gap-y-5  text-white  ">
          <span className="text-center lg:text-3xl text-2xl font-extrabold  animate-pulse">
            شهرکراد
          </span>{' '}
          <span className="text-center lg:text-2xl text-xl font-extrabold ">
            اعتبار پشت سر، فرصت پیش‌رو
          </span>{' '}
          <span className="text-center lg:text-2xl text-base font-medium ">
            با تمام اعتبارمان، پشت اعتماد شما ایستاده‌ایم
          </span>{' '}
        </div>
        {/* articles */}
        <div
          id="article"
          className="lg:w-[70%] w-full flex flex-col items-center justify-start gap-y-8  ">
          <div className="w-full flex justify-between items-center">
            <span className="w-auto  lg:text-start text-center lg:text-2xl text-base  font-bold text-gray-600   ">
              محتوای آموزشی برای تصمیم‌گیری آگاهانه
            </span>
            <Link
              to="/educational_content"
              className=" w-auto flex flex-nowrap  gap-x-1 items-center text-sm font-medium hover:font-bold  text-accent-1000    ">
              مشاهده همه
              <InlineSVG src={chevron} />
            </Link>
          </div>
          {/* <Articles /> */}
        </div>
        {/* frequently questions */}
        <div className="lg:w-[70%] w-[90%]  flex flex-col lg:gap-y-16 gap-y-8 justify-center items-center lg:pb-20 pb-10">
          <span className="text-lg font-black lg:text-3xl text-center ">سوالات متداول </span>
          <div className="w-full flex flex-wrap lg:gap-3 gap-y-5 items-start h-auto justify-between rounded-large ">
            {FAQEnum?.map((item, index) => (
              <div key={index} className="lg:w-[48%] w-full flex justify-center items-center">
                <AccordionFaqModel
                  isOpen={isOpenFaq == index + 1}
                  setIsOpen={() => openAccordinFaq(index + 1)}
                  answer={item.answer}
                  question={item.question}
                  HeaderColor="text-accent-1000"
                  bgColor="bg-primary-100 rounded-large p-4"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
