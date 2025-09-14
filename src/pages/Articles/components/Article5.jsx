import React from 'react';
import chartOne from 'asset/Pictures/Images/chartOne.png';
import chartTwo from 'asset/Pictures/Images/chartTwo.png';

function Article5() {
  return (
    <div className="lg:w-[80%] w-[95%] flex flex-col items-center  justify-start  gap-y-6 p-5  text-gray-main text-base  ">
      <div className="w-full flex lg:flex-row flex-col items-center justify-center gap-3 h-auto">
        {' '}
        <img src={chartOne} className="lg:w-[30%] w-[90%] rounded-lg  object-contain " />
        <img src={chartTwo} className="lg:w-[30%] w-[90%] rounded-lg  object-contain " />
      </div>
      <span className="  pt-5 w-full text-center tetx-base font-bold ">
        تامین مالی برای رشد اقتصادی
      </span>
      <span className=" text-justify  ">
        یکی از موضوعاتی که از ابتدای شکل گیری علم اقتصاد مورد توجه اقتصاددانان بوده، مسئله رشد
        اقتصادی و تامین مالی پروژه ها و طرحهای توسعه است و در این ارتباط، صنعت مالی با نقش واسطه گری
        در تخصیص منابع مالی به زیر بخش های مختلف اقتصاد می تواند ضمن حفظ شرایط فعلی مسیر را برای رشد
        بلندمدت اقتصادی هموار سازد.
      </span>
      <span className=" text-justify  ">
        در سال های اخیر روند تشکیل سرمایه ثابت به شدت نگران کننده است و باید در کنار توجه به انجام
        اصلاحاتی به منظور بهبود ثبات اقتصاد کلان، به بازسازی نظام تأمین مالی در سطح کشور پرداخت. در
        سال های اخیر هم زمان با روند نزولی نسبت تشکیل سرمایه به موجودی سرمایه، نسبت استهلاک به
        موجودی سرمایه نیز روند صعودی داشته است و در نتیجه برخی از سال ها شاهد پیشی گرفتن نرخ استهلاک
        از نرخ تشکیل سرمایه بوده ایم.
      </span>
    </div>
  );
}

export default Article5;
