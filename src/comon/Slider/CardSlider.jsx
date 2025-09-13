/* eslint-disable no-unused-vars */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ArticlesEnum } from 'comon/EnumDb/Articles';
import ArticlesCard from 'comon/cards/ArticlesCard';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';

const CardSlider = () => {
  const isMobile = useDeviceDetection();

  return (
    <div className="w-full flex items-center justify-center py-3">
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={20}
        loop={true}
        pagination={{
          type: 'fraction',
          el: '.swiper-pagination'
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          1745: {
            slidesPerView: 3.5,
            spaceBetween: 20
          },
          // 1440: {
          //   slidesPerView: 4,
          //   spaceBetween: 20
          // },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 10
          }
        }}
        className="mySwiper p-3">
        {ArticlesEnum.map((card, index) => (
          <SwiperSlide key={index} className="p-3">
            <ArticlesCard data={card} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardSlider;
