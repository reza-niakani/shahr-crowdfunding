import React, { useEffect, useState } from 'react';
import Axios from 'comon/Axios/Axios';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import 'pages/home/components/sliderCss.css';
import InlineSVG from 'react-inlinesvg';
import arrowLeft from 'asset/Pictures/Icons/circleArrowLeft.svg';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import LittlePlanCard from 'comon/cards/LittlePlanCard';

function OtherPlansSlider() {
  const [plans, setPlans] = useState();
  const [isloading, setIsloading] = useState(false);
  const isMobile = useDeviceDetection();

  useEffect(() => {
    GetAllPlans();
  }, []);
  const screenWidth = window.innerWidth;

  const GetAllPlans = async () => {
    setIsloading(true);
    await Axios.post('/InvestmentPlans/GetAll', {
      states: [7],
      titleQuery: '',
      pagination: {
        take: 6,
        skip: 0
      }
    })
      .then((res) => setPlans(res?.data))
      .catch(() => setPlans(false))
      .finally(() => setIsloading(false));
  };

  return (
    <div className="w-full  flex justify-center gap-x-5 items-start h-auto  min-h-[300px]  py-5 z-[1]">
      {' '}
      {isloading ? (
        <BouncingDotsLoader />
      ) : plans ? (
        <div className="w-full flex justify-start items-center flex-col  lg:gap-y-10 gap-y-2">
          {' '}
          <Swiper
            modules={[Navigation]}
            spaceBetween={5}
            slidesPerView={isMobile ? 1 : screenWidth < 1600 ? 2.5 : 3}
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
            className="mySwiper lg:w-[80%] w-full h-full justify-end flex items-center ">
            {plans?.map((item, index) => (
              <SwiperSlide
                key={index}
                className="lg:w-[340px] w-[340px] flex justify-center h-auto items-center ">
                <LittlePlanCard key={index} data={item} />
              </SwiperSlide>
            ))}{' '}
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
        <span className="w-full h-full flex justify-center items-start text-center  text-gray-700 font-semibold  ">
          طرحی برای سرمایه گذاری یافت نشد
        </span>
      )}
    </div>
  );
}

export default OtherPlansSlider;
