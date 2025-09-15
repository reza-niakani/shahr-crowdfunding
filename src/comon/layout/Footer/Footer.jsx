/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import DataContext from 'comon/context/MainContext';
import { Link, useLocation } from 'react-router-dom';
import InlineSVG from 'react-inlinesvg';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import mainLogo from 'asset/Pictures/logo/CompanyMainLogo.svg';
import alert from 'asset/Pictures/Icons/alertcircle.svg';
import AccordionFaqModel from 'comon/Accordion/AccordionFaqModel';
import farabors from 'asset/Pictures/Images/farabors.png';

function Footer() {
  const { setModal } = useContext(DataContext);
  const [phoneNumber, setPhoneNumber] = useState();
  const [isOpenFaq, setIsOpenFaq] = useState(false);

  const isMobile = useDeviceDetection();

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
    { title: 'صندوق اختصاصی بازارگردانی شهر', rout: 'https://shahrbfund.ir/' },
    {
      title: 'صندوق سرمایه‌گذاری گنجینه زرین شهر',
      rout: 'https://ibshop.ir/funds/fixed-income/details/10919'
    },
    { title: 'صندوق سرمایه‌گذاری املاک و مستغلات امین شهر یکم', rout: 'https://reitshahr.ir/' }
  ];
  const ShahrFinancialServices = [
    { title: 'خدمات معاملات آنلاین بورس اوراق بهادار و فرابورس', rout: 'https://shahrb.ir/' },
    { title: 'خدمات معاملات بورس کالا و بازار فیزیکی کالا', rout: 'https://shahrb.ir/' },
    { title: 'ورود و ثبت‌نام غیرحضوری کارگزاری شهر', rout: 'https://shahrb.ir/' }
  ];

  const QuickAccess = [
    // { title: 'مقالات', rout: '/#article' },
    { title: 'درباره ما', rout: '/about_us' },
    { title: 'تماس با ما', rout: '/contact_us' },
    { title: 'بیانیه ریسک' }
  ];

  const openAccordinFaq = (id) => {
    if (isOpenFaq == id) {
      setIsOpenFaq(false);
    } else {
      setIsOpenFaq(id);
    }
  };

  return (
    <footer className="w-full bg-[url('asset/Pictures/BackGround/footerBackground.svg')] bg-right-top bg-contain  bg-[#f9fafb] flex justify-center items-center pb-10">
      <div className="lg:w-[70%] w-[95%] flex flex-col justify-start items-center gap-y-3">
        {/* line 1 */}
        <div className="w-full flex justify-start  py-5 ">
          <img src={mainLogo} className="lg:w-[250px] lg:h-[150px] w-[115px] h-[55px]" />
        </div>
        {/* line 2 */}
        <div className="w-full lg:justify-between justify-start lg:items-start items-center flex lg:flex-row flex-col flex-nowrap gap-y-3 lg:gap-x-16   h-auto lg:pb-12">
          {/* info */}
          <div className="lg:w-auto lg:max-w-[400px] w-full flex flex-col justify-start items-center  lg:gap-y-3 gap-y-2">
            <div className="w-full flex justify-start items-start gap-x-2 ">
              <span className="  text-sm font-bold text-gray-700 ">آدرس:</span>
              <span className=" text-gray-500 text-sm  font-medium  ">
                خیابان سید حسن نصرالله (خالد اسلامبولی) کوچه ۱۸ پلاک ۲{' '}
              </span>
            </div>
            <div className="w-full flex justify-start items-center gap-x-2 ">
              <span className="  text-sm font-bold text-gray-700  ">کد پستی:</span>
              <span className=" text-gray-500 text-sm font-Yekan text-end  font-medium ">
                1511736863
              </span>
            </div>
            <div className="w-full flex justify-start items-center gap-x-2 ">
              <span className="  text-sm font-bold text-gray-700 whitespace-nowrap">
                شماره تماس:
              </span>
              <a
                href="tel:021۵۸۱۳۷۳۰۲"
                className=" text-gray-500 text-xs  font-bold hover:text-accent-600  ">
                021-۵۸۱۳۷۳۰۲{' '}
              </a>
            </div>
            <div className="w-full flex justify-start items-center gap-x-2 ">
              <span className="  text-sm font-bold whitespace-nowrap"> ایمیل :</span>
              <a
                href="mailto:info@shahrb-co.ir"
                className=" text-gray-500 text-sm  font-medium hover:text-accent-600  ">
                info@shahrb-co.ir
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
                    <div className="w-full flex flex-col items-start gap-y-2 text-gray-500 text-sm font-bold">
                      {' '}
                      {InvestingFundsLinks?.map((item, index) => (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          key={index}
                          href={item.rout}
                          className="w-full   text-nowrap text-start  hover:text-accent-600">
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
                  <span className=" text-base w-full font-bold text-start text-gray-700">
                    صندوق‌های سرمایه‌گذاری
                  </span>
                  <div className="w-full flex flex-col items-start justify-start gap-y-2 text-gray-500 text-sm  font-bold">
                    {' '}
                    {InvestingFundsLinks?.map((item, index) => (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        key={index}
                        href={item.rout}
                        className="w-full   text-nowrap text-start  hover:text-accent-600">
                        {item.title}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div> */}
            {/* services */}
            <div className="lg:w-auto w-full flex flex-col gap-y-3 items-center">
              {isMobile ? (
                <AccordionFaqModel
                  setIsOpen={() => openAccordinFaq('services')}
                  isOpen={isOpenFaq == 'services'}
                  component={true}
                  answer={
                    <div className="w-full flex flex-col items-start gap-y-2 text-gray-500 text-sm font-bold">
                      {' '}
                      {ShahrFinancialServices?.map((item, index) => (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          key={index}
                          href={item.rout}
                          className="w-full   text-nowrap text-start  hover:text-accent-600">
                          {item.title}
                        </a>
                      ))}
                    </div>
                  }
                  question={'خدمات مالی کارگزاری شهر'}
                />
              ) : (
                <>
                  {' '}
                  <span className=" text-base font-bold w-full text-start text-gray-700">
                    خدمات مالی کارگزاری شهر{' '}
                  </span>
                  <div className="w-full flex flex-col items-start justify-start gap-y-2 text-gray-500 text-sm  font-bold">
                    {' '}
                    {ShahrFinancialServices?.map((item, index) => (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        key={index}
                        href={item.rout}
                        className="w-full   text-nowrap text-start  hover:text-accent-600">
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
                  component={true}
                  setIsOpen={() => openAccordinFaq('access')}
                  isOpen={isOpenFaq == 'access'}
                  question={'دسترسی سریع'}
                  answer={
                    <div className="w-full flex flex-col items-start gap-y-2 text-gray-500 text-sm font-bold">
                      {' '}
                      {QuickAccess?.map((item, index) =>
                        item?.rout ? (
                          <a
                            href={item.rout}
                            key={index}
                            className="w-full   text-nowrap text-start  hover:text-accent-600">
                            {item.title}
                          </a>
                        ) : (
                          <button
                            key={index}
                            onClick={() => setModal({ type: 'riskWarining' })}
                            className="w-full  cursor-pointer text-nowrap text-start  hover:text-accent-600">
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
                  <span className=" text-base font-bold text-start text-gray-700">دسترسی سریع</span>
                  <div className="w-full flex flex-col items-start justify-start gap-y-2 text-gray-500 text-sm  font-bold">
                    {' '}
                    {QuickAccess?.map((item, index) =>
                      item?.rout ? (
                        <Link
                          key={index}
                          to={item.rout}
                          className="w-full   text-nowrap text-start  hover:text-accent-600">
                          {item.title}
                        </Link>
                      ) : (
                        <button
                          key={index}
                          onClick={() => setModal({ type: 'riskWarining' })}
                          className="w-full   text-nowrap text-start  hover:text-accent-600">
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
        </div>
        <div className="w-full flex lg:justify-end justify-center  h-auto items-center ">
          {/* <a
            referrerpolicy="origin"
            target="_blank"
            href="https://trustseal.enamad.ir/?id=623298&Code=cIgA59zGrRD8AVlET4ZeBPvxNjeWwLd1">
            <img
              referrerpolicy="origin"
              src="https://trustseal.enamad.ir/logo.aspx?id=623298&Code=cIgA59zGrRD8AVlET4ZeBPvxNjeWwLd1"
              alt=""
              style={{ cursor: 'pointer' }}
              code="cIgA59zGrRD8AVlET4ZeBPvxNjeWwLd1"
            />
          </a> */}
          {/* <a target="_blank" href="https://www.ifb.ir/">
            {' '}
            <img src={farabors} />
          </a> */}
        </div>
        {/* line 3 */}
        <div className="w-full flex lg:justify-between lg:flex-row flex-col justify-start gap-y-3 items-center pt-2 lg:border-t border-gray-800 ">
          <span className="w-auto flex lg:justify-start justify-center gap-x-1  text-xs text-gray-600  items-center  lg:order-1 order-2 ">
            <InlineSVG src={alert} />
            تمامی حقوق مادی و معنوی متعلق به شرکت کارگزاری شهر می باشد.
          </span>
        </div>
        <span className="w-[96%] flex lg:justify-start justify-center gap-x-1  text-xs text-gray-600  items-center  lg:order-1 order-2 ">
          سکوی شهرکراد متعلق به کارگزاری شهر بوده و تحت نظارت نهاد مالی کارگزاری شهر فعالیت
          می‌نماید.{' '}
        </span>
      </div>
    </footer>
  );
}

export default Footer;
