import React, { useEffect, useState } from 'react';
import Axios from 'comon/Axios/Axios';
import PlanCard from 'comon/cards/PlanCard';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import './sliderCss.css';
import InlineSVG from 'react-inlinesvg';
import arrowLeft from 'asset/Pictures/Icons/circleArrowLeft.svg';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';

function PlanCardSlider({ plansStatus }) {
  const [plans, setPlans] = useState();
  const [isloading, setIsloading] = useState(false);
  const isMobile = useDeviceDetection();

  useEffect(() => {
    GetAllPlans();
  }, [plansStatus]);

  const screenWidth = window.innerWidth;

  const GetAllPlans = async () => {
    setIsloading(true);
    await Axios.post('/InvestmentPlans/GetAll', {
      states: plansStatus?.key ? [plansStatus?.key] : [],
      pagination: {
        take: 3,
        skip: 0
      }
    })
      .then((res) => setPlans(res?.data))
      .catch(() => setPlans(false))
      .finally(() => setIsloading(false));
  };

  return (
    <div className="w-full  flex justify-center gap-x-5 items-start h-auto  min-h-[700px]  py-5 z-[1]">
      {' '}
      {isloading ? (
        <BouncingDotsLoader />
      ) : plans && plans?.length > 0 ? (
        <div className="w-full flex justify-start items-center flex-col  lg:gap-y-10 gap-y-2">
          {' '}
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={isMobile ? 1 : screenWidth < 1600 ? 2 : 3}
            loop={false}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }}
            centerInsufficientSlides={true} // 👈 Ensures centering when fewer slides
            pagination={{
              clickable: true,
              el: '.custom-pagination',
              bulletClass: 'custom-bullet',
              bulletActiveClass: 'custom-bullet-active'
            }}
            className="mySwiper w-[80%] h-full flex justify-center items-center">
            {plans?.map((item, index) => (
              <SwiperSlide
                key={index}
                className="lg:w-[340px] w-[300px] flex justify-center h-auto items-center">
                <PlanCard key={index} data={item} isSlider={true} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Navigation Buttons and Pagination */}
          <div className=" flex items-center justify-center w-full lg:gap-x-5   ">
            <button className="swiper-button-prev custom-nav-button ">
              <InlineSVG src={arrowLeft} className="rotate-180   lg:scale-[1.7]" />
            </button>
            <div className="custom-pagination flex items-center lg:space-x-1  z-[100]"></div>
            <button className="swiper-button-next custom-nav-button ">
              {' '}
              <InlineSVG src={arrowLeft} className="  lg:scale-[1.7]" />
            </button>
          </div>
        </div>
      ) : (
        <span className="w-full h-full flex justify-center items-start text-center  text-gray-main font-semibold  ">
          طرحی برای سرمایه گذاری یافت نشد
        </span>
      )}
    </div>
  );
}

export default PlanCardSlider;
