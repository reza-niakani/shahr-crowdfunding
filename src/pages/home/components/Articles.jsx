import React from 'react';
import ArticleCard from 'comon/cards/ArticleCard';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import InlineSVG from 'react-inlinesvg';
import arrowLeft from 'asset/Pictures/Icons/circleArrowLeft.svg';
import { ArticlesEnum } from 'comon/DB/Articles';
import 'swiper/css';
import 'swiper/css/navigation';
import './sliderCss.css';
// import 'swiper/css/pagination';

function Articles() {
  const isMobile = useDeviceDetection();
  return (
    <>
      {!isMobile ? (
        <div className="w-full flex justify-center items-center  gap-x-8 ">
          {ArticlesEnum.map((item, index) => (
            <ArticleCard key={index} data={item} />
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-start items-center flex-col lg:gap-y-10 gap-y-2">
          {' '}
          <Swiper
            modules={[Navigation]}
            spaceBetween={5}
            slidesPerView={1}
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
            className="mySwiper w-full h-full justify-end flex items-center ">
            {ArticlesEnum.map((item, index) => (
              <SwiperSlide key={index} className="w-[340px] flex justify-center  items-center ">
                {' '}
                <ArticleCard key={index} data={item} />
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
      )}
    </>
  );
}

export default Articles;
