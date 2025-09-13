/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import RequestForConsulting from './components/RequestForConsulting';
import { Link } from 'react-router-dom';
import InlineSVG from 'react-inlinesvg';
import chevronLeftgreen from 'asset/Pictures/Icons/chevronLeftgold.svg';
import PlanCardSlider from './components/PlanCardSlider';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import Articles from './components/Articles';
import AccordionFaqModel from 'comon/Accordion/AccordionFaqModel';
import { FAQEnum } from 'comon/DB/FAQ';
import CustomDropDown from 'comon/DropDown/CustomDropDown';
import { plansStatusForFilter, planStatusEnum } from 'comon/DB/PlanStatusEnum';
import DataContext from 'comon/context/MainContext';

function HomePage() {
  const { statisticalInformation } = useContext(DataContext);

  const isMobile = useDeviceDetection();
  const [isOpenFaq, setIsOpenFaq] = useState(false);
  const [plansStatus, setPlansStatus] = useState({
    name: ' همه',
    status: false,
    key: null,
    color: '#F36D74'
  });

  const openAccordinFaq = (id) => {
    if (isOpenFaq == id) {
      setIsOpenFaq(false);
    } else {
      setIsOpenFaq(id);
    }
  };

  const StatisticalInfo = [
    {
      title: 'طرح تامین مالی شده',
      additional: <span className="text-lg font-bold text-accent-600 w-auto ">+</span>,
      value:
        statisticalInformation?.plansCount &&
        Number(statisticalInformation?.plansCount).toLocaleString()
    },
    {
      title: 'نفر حامی طرح‌ها',
      additional: <span className="text-lg font-bold text-accent-600 w-auto ">+</span>,
      value:
        statisticalInformation?.investorsCount &&
        Number(statisticalInformation?.investorsCount).toLocaleString()
    },
    {
      title: 'میانگین نرخ بازده سالانه',
      additional: <span className="text-lg font-bold text-accent-600 w-auto ">+</span>,
      value:
        (statisticalInformation?.plansProfitRateAvg &&
          Number(statisticalInformation?.plansProfitRateAvg).toFixed()) ||
        0 + '%'
    },
    {
      title: 'سرمایه‌گذاری انجام‌شده',
      additional: <span className="text-xs text-accent-600 w-auto -mt-2">ریال</span>,
      value:
        (statisticalInformation?.goalValue &&
          Number(statisticalInformation?.goalValue).toLocaleString()) ||
        0
    }
  ];
  const CommercialPartner = [
    { name: '', pic: '', link: '' },
    { name: '', pic: '', link: '' },
    { name: '', pic: '', link: '' },
    { name: '', pic: '', link: '' },
    { name: '', pic: '', link: '' },
    { name: '', pic: '', link: '' }
  ];

  console.log(statisticalInformation);

  return (
    <div className="w-screen flex flex-col  justify-start lg:gap-y-40  gap-y-16 h-auto items-center  ">
      {/* banner part  */}
      <div className="  bg-[url('asset/Pictures/BackGround/desktopBanner.svg')] bg-cover w-screen  bg-no-repeat  bg-center lg:h-[700px] h-[80vh] flex justify-center lg:items-end items-end lg:py-0 py-6  ">
        {/* consulting form  request*/}
        <RequestForConsulting />
      </div>
      {/*  statistical data  */}
      <div className="w-full flex lg:flex-row flex-col flex-wrap lg:flex-nowrap justify-between items-center gap-y-7 h-auto max-w-[1296px] ">
        {StatisticalInfo?.map((item, index) => (
          <div
            key={index}
            className="lg:w-[300px] w-[70%]  flex flex-col items-center bg-white p-3 rounded-lg drop-shadow-md  lg:h-[110px] h-[80px]  justify-center gap-y-2 border border-accent-600">
            <div className="w-auto flex h-auto items-end justify-center gap-x-1">
              <span className="w-auto text-2xl text-accent-600">{item?.value}</span>
              {item?.additional}
            </div>
            <span className="w-auto whitespace-nowrap text-base  text-center text-[#3a3939] ">
              {item?.title}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col lg:gap-y-32 gap-y-20  justify-start h-auto items-center py-10 ">
        {/* plans */}
        <div className="w-full flex flex-col lg:gap-y-28 gap-y-5  justify-center items-center max-w-[1920px] lg:min-[1300px] bg-[url('asset/Pictures/BackGround/rectangelBackGround.svg')] bg-cover bg-inherit bg-no-repeat  ">
          <div className="lg:w-[70%] w-[95%] flex justify-between items-center   ">
            <span className=" text-sm lg:text-[32px] font-black ">لیست طرح ها </span>
            <div className="lg:w-auto hidden w-[95%] lg:min-w-[330px]  lg:flex justify-between items-center relative  gap-x-3 flex-nowrap ">
              <label htmlFor="title" className="font-medium text-xs text-nowrap">
                وضعیت طرح ها{' '}
              </label>
              <div className="w-[240px]">
                <CustomDropDown
                  placeHoolder="انتخاب کنید..."
                  options={plansStatusForFilter}
                  selectedItem={plansStatus}
                  setSelectedItem={setPlansStatus}
                />
              </div>
            </div>
            <Link
              to="/all_plans"
              className="flex justify-end items-center lg:gap-x-2 lg:text-base text-xs font-black text-[#C9B777]">
              مشاهده همه <InlineSVG src={chevronLeftgreen} />
            </Link>
          </div>{' '}
          <div className="lg:hidden w-[95%] lg:min-w-[330px]  flex justify-between items-center relative  gap-x-3 flex-nowrap ">
            <label htmlFor="title" className="font-medium text-xs text-nowrap">
              وضعیت طرح ها{' '}
            </label>
            <div className="w-[240px]">
              <CustomDropDown
                placeHoolder="انتخاب کنید..."
                options={plansStatusForFilter}
                selectedItem={plansStatus}
                setSelectedItem={setPlansStatus}
              />
            </div>
          </div>
          <div className="lg:w-[80%] w-full flex justify-center items-center  ">
            <PlanCardSlider plansStatus={plansStatus} />
          </div>
        </div>
        {/* crowdfunding introduction */}
        <div className="lg:w-[70%] w-[95%] flex lg:p-10 py-4 px-3 justify-start  gap-y-3  flex-col  items-start lg:bg-[url('asset/Pictures/BackGround/handBgDesktop.svg')] text-white lg:h-[480px] h-[700px] rounded-large bg-[url('asset/Pictures/BackGround/handBgmobile.svg')] bg-cover lg:max-w-[1400px] bg-no-repeat  bg-center  ">
          <div className="w-full lg:w-[90%] flex flex-col lg:text-3xl  text-lg font-black text-start  items-start  justify-start h-auto lg:gap-y-4 ">
            <a
              href="https://zagrosam.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-800 hover:underline underline-offset-8">
              {' '}
              سبدگردان زاگرس
            </a>
            {/* <span>مقایسه آنلاین فرصت‌های پرسود در زاگرس</span> */}
          </div>
          {/* <p
            className="w-full lg:w-[50%] flex flex-col lg:text-base   text-sm font-bold text-justify  items-start  justify-start h-auto  "
            style={{ lineHeight: isMobile ? '20px' : '30px' }}>
            کرادفاندینگ یا تامین مالی جمعی فرصتی برای شریک شدن در سود شرکت‌ها و کسب و کارهای متفاوت
            است
          </p> */}
          <p
            style={{ lineHeight: isMobile ? '25px' : '30px' }}
            className="w-full lg:w-[50%]  lg:text-sm   text-xs text-justify font-medium  items-start  justify-start h-auto gap-y-2  ">
            شرکت سبدگردان زاگرس با شناسه ملی <strong>14009145016</strong> و شماره{' '}
            <strong>558154</strong> ثبت شده در اداره ثبت تهران به عنوان یک نهاد مالی فعال در بازار
            سرمایه موفق به اخذ مجوز در تاریخ <strong dir="ltr">1399/04/25</strong> به شماره{' '}
            <strong>122/67647</strong> از سازمان بورس و اوراق بهادار تهران شد. با سرمایه ثبتی{' '}
            <strong className="px-1">1،000</strong>
            میلیارد ریالی و همراهی کارشناسان و خبرگان متخصص بازار سرمایه علاوه بر ارائه خدمات کامل
            بازار، سعی در حضور پررنگ در جمع سکوهای تامین مالی جمعی ایران به نام &quot;زاگرس
            کراد&quot; را داریم و در نظر داریم به عنوان یک سکوی تامین مالی فعال همانند رشته کوه
            زاگرس در درپهنای ایران نمایان باشیم.
            <br />
            شماره شبا سکوی تامین مالی جمعی زاگرس <strong>IR-500570029070014235627102</strong> نزد
            شعبه 290 بانک پاسارگاد می باشد.
          </p>
        </div>
        {/* benefits of investing */}
        <div className="lg:w-[70%] w-[95%]  flex flex-col  max-w-[1440px]  items-center justify-center  gap-y-16">
          <span className="w-full  text-center font-bold  text-accent-600  lg:text-3xl text-2xl ">
            چرا زاگرس کراد؟
          </span>
          <div className="w-full flex lg:flex-row  flex-col lg:justify-between lg:items-start items-center  justify-start gap-5 flex-nowrap ">
            {' '}
            <div className="lg:w-[45%]  w-full  items-start  justify-start flex flex-col h-auto gap-y-5 ">
              <span className="w-full  text-start font-medium  text-accent-600   lg:text-xl text-base  ">
                چرا برای سرمایه‌گذاری به زاگرس کراد مراجعه کنیم؟{' '}
              </span>
              <p
                style={{ lineHeight: '28px' }}
                className="w-full text-justify lg:text-base text-sm text-gray-600 ">
                {' '}
                زاگرس، نماد سرمایه‌گذاری شعار سازمانی این سکوی تامین مالی جمعی است که در تلاش است با
                استفاده از ضمانت نامه های معتبر و ارزیابی موثر بین متقاضیان واجد شرایط طرح های جذاب
                را برای سرمایه‌گذاران انتخاب نماید و از طرفی با داشتن گواهی شراکت سرمایه‌گذاری در
                طرح های زاگرس کراد کوجبات آسودگی سرمایه‌گذاران را محیا نماید.
              </p>{' '}
            </div>
            <div className="lg:w-[45%]  w-full  items-start  justify-start flex flex-col h-auto gap-y-5 ">
              <span className="w-full  text-start font-medium  text-accent-600   lg:text-xl text-base  ">
                چرا برای تامین سرمایه به زاگرس کراد مراجعه کنیم؟{' '}
              </span>
              <p
                style={{ lineHeight: '28px' }}
                className="w-full text-justify lg:text-base text-sm text-gray-600 ">
                زاگرس‌کراد با وجود شبکه ای گسترده از سرمایه‌گذاران حقیقی و حقوقی به متقاضیان سرمایه
                این اطمینان خواهد داد که سکوی مناسبی در بین سایر سکوها برای تامین نیاز های مالی خود
                انتخاب نموده اندو این تمایز در فرآیند زاگرس‌کراد مشهود است.
              </p>{' '}
            </div>
          </div>
        </div>
        {/* commercial partner */}
        {/* <div className="lg:w-[70%] w-[90%]  flex flex-col lg:gap-y-16 gap-y-4 justify-center items-center  ">
          <span className="text-lg font-black lg:text-3xl text-center ">
            شرکای تجاری تامین مالی زاگرس
          </span>
          <div className="w-full flex flex-wrap lg:gap-8 gap-4 justify-center ">
            {CommercialPartner.map((item, index) => (
              <div
                key={index}
                className="lg:w-[180px] lg:h-[100px] w-[95px] h-[53px] rounded-large bg-primary-100 "></div>
            ))}
          </div>
        </div> */}
        {/* advertisments banner */}
        {/* <InlineSVG
          src={isMobile ? advertismentsMobile : advertismentsDesktop}
          alt="تصویر در حال بارگذاری است "
          className="lg:w-[70%] w-[90%] h-fit   rounded-large   "
        /> */}
        <div className="lg:w-full w-[98%] flex flex-col items-center   gap-y-5 justify-center bg-[url('asset/Pictures/BackGround/assetBg.svg')]   bg-no-repeat  rounded-lg p-3 bg-center bg-cover max-w-[1440px]  min-h-[200px] h-auto ">
          <span className="w-[80%] text-start lg:text-2xl  text-xl font-bold  text-white ">
            {' '}
            مزایای زاگرس کراد برای سرمایه گذاران و متقاضیان سرمایه:
          </span>
          <div className="w-[90%] flex flex-col items-center  justify-start gap-y-3  text-base text-white">
            <span className="w-[90%] text-start ">1. سرمایه‌گذاری مطمئن</span>
            <span className="w-[90%] text-start ">2. مجوز فرابورس</span>
            <span className="w-[90%] text-start ">3. معافیت مالیاتی</span>
            <span className="w-[90%] text-start ">4. گواهی شراکت</span>
          </div>
        </div>
        {/* articles */}
        <div className="w-full flex flex-col lg:gap-y-16 gap-y-5  justify-center items-center max-w-[1920px] lg:min-[1300px] bg-[url('asset/Pictures/BackGround/rectangelBackGround.svg')] bg-cover bg-inherit bg-no-repeat  ">
          <div className="lg:w-[70%] w-[95%] flex justify-between items-center  ">
            <span className=" text-sm lg:text-[32px] font-black  text-center w-full  ">
              مقالات{' '}
            </span>
          </div>
          <Articles />
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
                  HeaderColor="text-[#C9B777]"
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
