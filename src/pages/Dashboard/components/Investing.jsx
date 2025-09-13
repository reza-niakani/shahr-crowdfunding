import React, { useEffect, useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import { Link } from 'react-router-dom';
import flashLeft from 'asset/Pictures/Icons/arrowFlashLeft.svg';
import arrowLeft from 'asset/Pictures/Icons/chevronLeftgold.svg';
import investing from 'asset/Pictures/Icons/investing.svg';
// import InvestinDashBoardCard from 'comon/cards/InvestinDashBoardCard';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import Axios from 'comon/Axios/Axios';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'pages/home/components/sliderCss.css';
import PlanCard from 'comon/cards/PlanCard';
// import 'swiper/css/pagination';

function Investing() {
  const [plans, setPlans] = useState();
  const [isloading, setIsloading] = useState(false);

  const isMobile = useDeviceDetection();
  useEffect(() => {
    GetAllPlans();
  }, []);

  const GetAllPlans = async () => {
    setIsloading(true);
    await Axios.post('/InvestmentPlans/GetAll', {
      states: [7],
      titleQuery: '',
      pagination: {
        take: isMobile ? 4 : 2,
        skip: 0
      }
    })
      .then((res) => setPlans(res?.data))
      .catch(() => setPlans(false))
      .finally(() => setIsloading(false));
  };
  return (
    <div className="w-full flex flex-col justify-start items-center gap-y-4 pb-24 lg:pb-0">
      {/*  title  */}
      <div className="lg:w-[95%] w-full flex items-center justify-between">
        <div className="w-auto flex-nowrap items-center flex justify-start gap-x-2">
          <div className="lg:w-12 w-8 lg:h-12 h-8 flex justify-center items-center rounded-large drop-shadow-md  bg-white   ">
            <InlineSVG src={investing} />
          </div>
          <span className=" text-base text-gray-main font-medium ">آخرین طرح ها </span>
        </div>
        <Link
          to="/investing"
          className=" text-[#009085] lg:h-12 h-8  flex justify-center  items-center gap-x-2 bg-white rounded-large drop-shadow-md text-sm lg:font-bold font-semibold   px-3 ">
          همه طرح ها <InlineSVG src={arrowLeft} />
        </Link>
      </div>
      {/*  plans  */}
      <div className="w-full flex flex-wrap gap-10 items-center justify-center ">
        {isloading ? (
          <BouncingDotsLoader />
        ) : isMobile ? (
          plans?.length > 0 ? (
            <div className="w-full flex justify-start items-center flex-col  gap-y-10 ">
              {' '}
              <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={1.1}
                loop={false} // Enable infinite looping
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev'
                }}
                pagination={{
                  clickable: true,
                  el: '.custom-pagination',
                  bulletClass: 'custom-bullet',
                  bulletActiveClass: 'custom-bullet-active'
                }}
                className="mySwiper w-full h-full justify-start flex items-center px-16">
                {plans?.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    className="w-full flex justify-center h-auto items-center "
                    style={{ display: 'flex' }}>
                    {' '}
                    <PlanCard key={index} data={item} />{' '}
                  </SwiperSlide>
                ))}{' '}
              </Swiper>
              {/* Navigation Buttons and Pagination */}
              <div className=" flex items-center justify-center w-full lg:gap-x-5   ">
                <button
                  className="swiper-button-prev custom-nav-button bg-gray-200 "
                  style={{ backgroundColor: '#CCCCCC' }}>
                  <InlineSVG
                    src={flashLeft}
                    className="rotate-180    w-[8px]"
                    style={{ width: '16px' }}
                  />
                </button>
                <div className="custom-pagination flex items-center lg:space-x-1  z-[100]"></div>
                <button
                  className="swiper-button-next custom-nav-button "
                  style={{ backgroundColor: '#CCCCCC' }}>
                  {' '}
                  <InlineSVG src={flashLeft} style={{ width: '16px' }} />
                </button>
              </div>
            </div>
          ) : (
            <span className="w-[80%] text-center text-sm font-bold text-[#009085] bg-[#01B69B08]   border border-[#009085] rounded-large h-[42px]  flex items-center justify-center">
              طرحی برای سرمایه گذاری یافت نشد!
            </span>
          )
        ) : plans?.length > 0 ? (
          plans?.map((plan, index) => <PlanCard key={index} data={plan} />)
        ) : (
          <span className="w-[50%] text-center text-sm font-bold text-[#009085] bg-[#01B69B08]   border border-[#009085] rounded-large h-[42px]  flex items-center justify-center">
            طرحی برای سرمایه گذاری یافت نشد!
          </span>
        )}
      </div>
    </div>
  );
}

export default Investing;
