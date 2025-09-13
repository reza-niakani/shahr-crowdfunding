/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import DataContext from 'comon/context/MainContext';
import { Link } from 'react-router-dom';
import InlineSVG from 'react-inlinesvg';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import mainLogo from 'asset/Pictures/logo/CompanyMainLogowhite.svg';
import alert from 'asset/Pictures/Icons/alertcircle.svg';
import AccordionFaqModel from 'comon/Accordion/AccordionFaqModel';
import enamd from 'asset/Pictures/logo/enamad.png';

function Footer() {
  const { setModal } = useContext(DataContext);
  const [phoneNumber, setPhoneNumber] = useState();
  const isMobile = useDeviceDetection();
  const [isOpenFaq, setIsOpenFaq] = useState(false);

  const handleScrollToTop = () => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      console.log('Main content not found');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const InvestingFundsLinks = [
    { title: 'صندوق درآمد ثابت آوای فردا ', rout: 'https://afzfund.ir/' },
    { title: 'صندوق سرمایه‌گذاری طلای دنا', rout: 'https://javaherfund.ir/' },
    {
      title: 'صندوق سرمایه‌گذاری سهامی آوای تاراز',
      rout: 'https://zagrosam.com/zagros-funds/'
    },
    {
      title: 'صندوق سرمایه‌گذاری درآمد ثابت شکوه بامداد',
      rout: 'https://zagrosam.com/zagros-funds/'
    },
    {
      title: 'صندوق سرمایه‌گذاری اختصاصی بازارگردانی آوا',
      rout: 'https://asemanamc.com/funds/aseman-zagros/'
    },
    { title: ' صندوق بازارگردانی آسمان', rout: 'https://asemanamc.com/funds/aseman-zagros/' }
  ];

  const shahrFinancialServices = [
    { title: 'تامین مالی', rout: '' },
    { title: 'بازارگردانی', rout: '' },
    { title: 'عرضه و پذیرش', rout: '' },
    { title: 'مشاوره سرمایه‌گذاری', rout: '' },
    { title: 'سبدگردانی اختصاصی', rout: '' }
  ];

  const QuickAccess = [
    { title: 'مقالات', rout: '/articles/article1' },
    { title: 'درباره ما', rout: '/about_us' },
    { title: 'تماس با ما', rout: '/contact_us' },
    { title: 'سنجش ریسک', type: 'riskWarining' },
    { title: 'سیاست محرمانگی', type: 'privacyPolicy' },
    { title: ' راهنمای سرمایه‌گذاری', rout: '/user_guide' }
  ];

  const openAccordinFaq = (id) => {
    if (isOpenFaq == id) {
      setIsOpenFaq(false);
    } else {
      setIsOpenFaq(id);
    }
  };

  return (
    <footer className="w-full bg-[url('asset/Pictures/BackGround/footerBackground.svg')] bg-center bg-contain  bg-[#f9fafb] flex justify-center items-center pb-10">
      <div className="lg:w-[70%] w-[95%] flex flex-col justify-start items-center ">
        {/* line 1 */}
        <div className="w-full flex justify-start py-5 ">
          <InlineSVG src={mainLogo} className="lg:w-[280px] lg:h-[80px]  w-[215px] h-[55px]" />
        </div>
        {/* line 2 */}
        <div className="w-full lg:justify-between justify-start lg:items-start items-center flex lg:flex-row flex-col flex-nowrap gap-y-3 lg:gap-x-16   h-auto lg:pb-12">
          {/* info */}
          <div className="lg:w-auto lg:max-w-[330px] w-full flex flex-col justify-start items-center  lg:gap-y-3 gap-y-2">
            <div className="w-full flex justify-start items-start gap-x-2 ">
              <span className=" lg:text-base text-sm font-bold text-white ">آدرس:</span>
              <span className=" text-gray-300 text-sm  font-bold  ">
                میدان آرژانتین خیابان بیهقی خیابان چهاردهم شرقی پلاک ۲۱
              </span>
            </div>
            <div className="w-full flex justify-start items-center gap-x-2 ">
              <span className=" lg:text-base text-sm font-bold text-white ">کد پستی:</span>
              <span className=" text-gray-300 text-base  font-bold ">۱۴۶۸۸۷۳۷۲۱ </span>
            </div>
            <div
              className="w-full flex flex-col justify-start items-start text-sm text-white  gap-x-2"
              dir="rtl">
              {/* <span className=" lg:text-base text-sm font-bold text-white">شماره تماس:</span>
              <a
                href="tel:021-52724"
                className=" text-gray-300 text-base text-nowrap  font-bold hover:text-blue-600  ">
                021-52724 <br />
                (221 داخلی)
              </a> */}{' '}
              <span className="text-nowrap w-auto"> جهت تماس با شماره گویای </span>
              <a
                href="tel:021-91007162"
                className="text-gray-300 text-nowrap font-bold hover:text-blue-600">
                <span dir="ltr">021-91007162</span>
              </a>{' '}
              داخلی 2 را شماره گیری نمایید.
            </div>
            <div className="w-full flex justify-start items-center gap-x-2 ">
              <span className=" lg:text-base text-sm font-bold text-white"> ایمیل :</span>
              <a
                href="mailto:info@zagrosam.com"
                className=" text-gray-300 text-base  font-bold hover:text-blue-600  ">
                info@zagrosam.com
              </a>
            </div>
          </div>
          {/* links  */}
          <div className="w-full flex flex-col lg:flex-row lg:justify-start  lg:gap-x-10 justify-start lg:items-start items-center gap-y-3">
            {/* Investing Funds */}
            {/* <div className="lg:w-auto w-full flex flex-col gap-y-3 items-center">
              {isMobile ? (
                <AccordionFaqModel
                  component={true}
                  setIsOpen={() => openAccordinFaq('funds')}
                  isOpen={isOpenFaq == 'funds'}
                  answer={
                    <div className="w-full flex flex-col items-start gap-y-2 text-gray-300 text-sm font-bold">
                      {' '}
                      {InvestingFundsLinks?.map((item, index) => (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          key={index}
                          href={item.rout}
                          className="w-full   text-nowrap text-start  hover:text-accent-1100">
                          {item.title}
                        </a>
                      ))}
                    </div>
                  }
                  question={'صندوق‌های سرمایه‌گذاری'}
                />
              ) : (
                <>
                  {' '}
                  <span className="w-full text-base font-bold text-start text-accent-600">
                    صندوق‌های سرمایه‌گذاری
                  </span>
                  <div className="w-full flex flex-col items-start justify-start gap-y-2 text-gray-300 text-sm  font-bold">
                    {' '}
                    {InvestingFundsLinks?.map((item, index) => (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        key={index}
                        href={item.rout}
                        className="w-full   text-nowrap text-start  hover:text-accent-1100">
                        {item.title}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div> */}
            {/* funds */}
            <div className="lg:w-auto w-full flex flex-col gap-y-3 items-center">
              {isMobile ? (
                <AccordionFaqModel
                  titleQuestionColor="text-white"
                  setIsOpen={() => openAccordinFaq('services')}
                  isOpen={isOpenFaq == 'services'}
                  component={true}
                  answer={
                    <div className="w-full flex flex-col items-start gap-y-2 text-gray-300 text-sm font-bold">
                      {' '}
                      {shahrFinancialServices?.map((item, index) => (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          key={index}
                          href={item.rout}
                          className="w-full   text-nowrap text-start  hover:text-accent-1100">
                          {item.title}
                        </a>
                      ))}
                    </div>
                  }
                  question={'خدمات مالی زاگرس'}
                />
              ) : (
                <>
                  {' '}
                  <span className="w-full text-base font-bold text-start text-accent-600">
                    خدمات مالی زاگرس{' '}
                  </span>
                  <div className="w-full flex flex-col items-start justify-start gap-y-2 text-gray-300 text-sm  font-bold">
                    {' '}
                    {shahrFinancialServices?.map((item, index) => (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        key={index}
                        href={item.rout}
                        className="w-full   text-nowrap text-start  hover:text-accent-1100">
                        {item.title}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
            {/* quick access */}
            <div className="lg:w-auto w-full flex flex-col gap-y-3 items-center">
              {isMobile ? (
                <AccordionFaqModel
                  titleQuestionColor="text-white"
                  component={true}
                  question={'دسترسی سریع'}
                  setIsOpen={() => openAccordinFaq('access')}
                  isOpen={isOpenFaq == 'access'}
                  answer={
                    <div className="w-full flex flex-col items-start gap-y-2 text-gray-300 text-sm font-bold">
                      {' '}
                      {QuickAccess?.map((item, index) =>
                        item?.rout ? (
                          <Link
                            key={index}
                            to={item.rout}
                            className="w-full   text-nowrap text-start  hover:text-accent-1100">
                            {item.title}
                          </Link>
                        ) : (
                          <button
                            key={index}
                            onClick={() => setModal({ type: item?.type })}
                            className="w-full   text-nowrap text-start  hover:text-accent-800 ">
                            {' '}
                            {item.title}
                          </button>
                        )
                      )}
                    </div>
                  }
                />
              ) : (
                <>
                  {' '}
                  <span className=" w-full text-base font-bold text-start text-accent-600">
                    دسترسی سریع
                  </span>
                  <div className="w-full flex flex-col items-start justify-start gap-y-2 text-gray-300 text-sm  font-bold">
                    {' '}
                    {QuickAccess?.map((item, index) =>
                      item?.rout ? (
                        <Link
                          key={index}
                          to={item.rout}
                          className="w-full   text-nowrap text-start  hover:text-accent-800 ">
                          {item.title}
                        </Link>
                      ) : (
                        <button
                          key={index}
                          onClick={() => setModal({ type: item?.type })}
                          className="w-full   text-nowrap text-start  hover:text-accent-800 ">
                          {' '}
                          {item.title}
                        </button>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-auto flex lg:justify-end justify-center gap-x-3  items-center  lg:order-2 order-1 ">
            <img src={enamd} className="w-[250px] object-contain h-[200px]" />
          </div>
        </div>
        {/* line 3 */}
        <div className="w-full flex lg:justify-between lg:flex-row flex-col justify-start gap-y-3 items-center py-2 lg:border-t ">
          <span className="w-auto flex lg:justify-start justify-center gap-x-1  text-xs text-white  items-center  lg:order-1 order-2 ">
            <InlineSVG src={alert} className="fill-white" /> تمامی حقوق مادی و معنوی متعلق به شرکت
            سبدگردانی زاگرس می باشد.
          </span>
          {/* <span className="w-auto flex lg:justify-start justify-center gap-x-1  text-sm text-accent-600 font-bold  items-center  lg:order-2 order-1 ">
            تحت نظارت سبدگردان زاگرس
          </span> */}

          {/* <div className="w-auto flex lg:justify-end justify-center gap-x-3  items-center  lg:order-2 order-1 ">
            <a href="https://www.instagram.com/vista.amc" target="_blank" rel="noreferrer">
              <InlineSVG src={Instagram} />
            </a>{' '}
            <a href="https://t.me/vistaamc" target="_blank" rel="noreferrer">
              <InlineSVG src={telegram} />
            </a>
            <a
              href="https://ir.linkedin.com/company/%D8%B3%D8%A8%D8%AF%DA%AF%D8%B1%D8%AF%D8%A7%D9%86-%D9%88%DB%8C%D8%B3%D8%AA%D8%A7"
              target="_blank"
              rel="noreferrer">
              <InlineSVG src={linkedin} />
            </a>
          </div> */}
        </div>
        <span className="w-[96%] flex lg:justify-start justify-center gap-x-1  text-xs text-white items-center  lg:order-1 order-2 ">
          سکوی زاگرس کراد متعلق به سبدگردان زاگرس بوده و تحت نظارت نهاد مالی سبدگردان زاگرس فعالیت
          می‌نماید.{' '}
        </span>
      </div>
    </footer>
  );
}

export default Footer;
