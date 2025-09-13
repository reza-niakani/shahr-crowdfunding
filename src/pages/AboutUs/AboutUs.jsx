import React, { useContext, useEffect, useState } from 'react';
import document from 'asset/Pictures/Icons/documentcertificate.png';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import { advertismentData, BoardMember, executeMemebers, registrationInfo } from './component/Enum';
import person from 'asset/Pictures/Icons/personIcon.png';
import DataContext from 'comon/context/MainContext';
import card from 'asset/Pictures/Icons/card.png';
import handCoin from 'asset/Pictures/Images/handCoin.png';

function AboutUs() {
  const { setModal } = useContext(DataContext);
  const [copyStatus, setCopyStatus] = useState({});

  const isMobile = useDeviceDetection();

  useEffect(() => {
    setCopyStatus({});
  }, []);

  const handleCopy = (type, value) => {
    setCopyStatus((prev) => ({ ...prev, [type]: true }));
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setCopyStatus((prev) => ({ ...prev, [type]: false }));
    }, 2500);
  };

  const showHistoryFunction = (data) => {
    setModal({ type: 'workHistory', data: data });
  };

  return (
    <div className="w-full flex flex-col items-center justify-start  gap-y-20">
      {/* title  */}
      <div className="  bg-[url('asset/Pictures/BackGround/landingBg.svg')]  bg-cover w-screen  bg-no-repeat  bg-center min-h-[800px] flex flex-col justify-center   items-center gap-y-16 lg:py-0 py-6  ">
        <div className=" lg:w-[50%] w-[95%] flex flex-col items-center justify-center h-auto gap-y-10 lg:pt-28 pt-20 ">
          {' '}
          <span className="lg:text-4xl text-lg  font-extrabold text-accent-1000  w-full text-center ">
            {' '}
            درباره تامین مالی جمعی شهر کراد{' '}
          </span>
          <p
            style={{ lineHeight: '35px' }}
            className="w-[70%] text-center  lg:text-xl  text-base  text-dark-700 lg:p-2">
            شهرکراد، سکوی تامین مالی جمعی شرکت کارگزاری شهر است در پی تامین منابع مالی برای کسب و
            کارهای کوچک و متوسط و منافع مالی برای سرمایه گذاران.
          </p>
        </div>
        <div className="w-full flex flex-wrap justify-center gap-12 items-center max-w-[1440px] ">
          {advertismentData?.map((item, index) => (
            <div
              key={index}
              style={{ boxShadow: '0px 2px 10px 0px rgba(1, 182, 155, 0.1)' }}
              className="lg:w-[270px]  w-[90%] rounded-large h-[250px] flex  flex-col items-center gap-y-5 justify-center bg-white ">
              <img src={item?.icon} />
              <p className="w-[90%] lg:max-w-[270px] text-center text-base text-gray-600  whitespace-pre-wrap ">
                {item?.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* company info */}
      {/* crowdfunding introduction */}
      {/* <div className="lg:w-[70%] w-[95%] flex lg:p-10 py-10 px-3 lg:justify-center justify-start    gap-y-10  flex-col  items-start lg:bg-[url('asset/Pictures/BackGround/handBgDesktop.svg')] text-white lg:h-[480px] h-[700px] rounded-large bg-[url('asset/Pictures/BackGround/handBgmobile.svg')] bg-cover lg:max-w-[1400px] bg-no-repeat  bg-center  ">
        <span className="w-full lg:w-[90%] flex flex-col lg:text-3xl  text-lg font-black text-start  items-start  justify-start h-auto lg:gap-y-4 ">
          سپهر کراد
        </span>
        <p
          style={{ lineHeight: isMobile ? '25px' : '32px' }}
          className="w-full lg:w-[50%] flex flex-col lg:text-base    text-sm  text-justify font-medium  items-start  justify-start h-auto gap-y-2  ">
          شهرکراد، سکوی تامین مالی جمعی شرکت کارگزاری شهر
 است که با دریافت مجوز رسمی از
          فرابورس، سعی دارد در کنار تامین مالی از طریق انتشار اوراق برای شرکت های بزرگ، به تامین
          مالی شرکت های کوچک و متوسط کمک نماید و سرمایه گذاران را در ارزش افزوده ایجاد شده از تولید
          شرکت ها با نرخ هایی جذاب و اقتصادی شریک نماید. سپهر کراد در مسیر رشد و توسعه شرکت‌های کوچک
          و متوسط در کنار آن‌ها بوده و با ایجاد سابقه اعتباری از طریق تامین مالی جمعی امکان تامین
          مالی از طریق انتشار اوراق را برای آن‌ها فراهم می‌نماید.
        </p>
        {/* <div className="w-auto flex flex-col items-start gap-y-2 ">
          <div className="w-auto flex justify-start items-center  gap-x-5 lg:text-base text-sm font-medium  text-white ">
            <span className="whitespace-nowrap  ">شناسه ملی کارگزاری شهر
:</span>
            <span className="font-normal">۱۰۳۲۰۰۸۹۹۰ </span>
          </div>
          <div className="w-auto flex justify-start items-center  gap-x-5 lg:text-base text-sm font-medium  text-white ">
            <span className="whitespace-nowrap  ">شماره ثبت کارگزاری شهر
: </span>
            <span className="font-normal">۴۱۹۲۹۲ </span>
          </div>
        </div> */}

      <div
        style={{
          background:
            'radial-gradient(circle at center, #00B8AD, #00B8AD , #00B8AD ,  #00B8AD, #00B8AD, #00B8AD )'
        }}
        className="lg:w-[70%]   w-[95%] flex lg:p-10 py-4 px-3  gap-y-3   justify-between  lg:flex-row flex-col  items-start  text-white lg:h-[480px] h-[700px] rounded-large lg:max-w-[1400px]  ">
        <div className="lg:w-[45%] w-[95%] flex flex-col items-start  justify-start gap-y-3 ">
          {' '}
          <span className="w-full lg:w-[90%] flex flex-col lg:text-3xl  text-lg font-black text-start  items-start  justify-start h-auto lg:gap-y-4 ">
            شهر کراد
          </span>
          <p
            className="w-full  flex flex-col lg:text-base   text-sm font-bold text-justify  items-start  justify-start h-auto  "
            style={{ lineHeight: isMobile ? '20px' : '30px' }}>
            کرادفاندینگ یا تامین مالی جمعی فرصتی برای شریک شدن در سود شرکت‌ها و کسب و کارهای متفاوت
            است
          </p>
          <p
            style={{ lineHeight: isMobile ? '25px' : '32px' }}
            className="w-full flex flex-col lg:text-base    text-sm  text-justify font-medium  items-start  justify-start h-auto gap-y-2  ">
            شهرکراد، سکوی تامین مالی جمعی شرکت کارگزاری شهر است که با دریافت مجوز رسمی از فرابورس
            سعی دارد در کنار تامین مالی از طریق انتشار اوراق برای شرکت های بزرگ، به تامین مالی شرکت
            های کوچک و متوسط کمک نماید و سرمایه گذاران را در ارزش افزوده ایجاد شده از تولید شرکت ها
            با نرخ هایی جذاب و اقتصادی شریک نماید. سپهر کراد در مسیر رشد و توسعه شرکت‌های کوچک و
            متوسط در کنار آن‌ها بوده و با ایجاد سابقه اعتباری از طریق تامین مالی جمعی امکان تامین
            مالی از طریق انتشار اوراق را برای آن‌ها فراهم می‌نماید.
          </p>
        </div>
        {/*  picture  */}
        <img src={handCoin} className="lg:w-[45%] w-full lg:h-[420px] h-[250px] rounded-large " />
      </div>
      <div className=" w-full flex flex-col items-center justify-center h-auto gap-y-10 lg:pt-28 ">
        {' '}
        <span className="lg:text-4xl text-lg  font-extrabold text-accent-1000  w-full text-center ">
          {' '}
          اعضای هیات مدیره شرکت کارگزاری شهر
        </span>
        <div className="w-full max-w-[1440px]  flex flex-wrap items-center justify-center gap-8  ">
          {BoardMember?.map((item, index) => (
            <div
              key={index}
              onClick={() => showHistoryFunction(item?.WorkHistory)}
              className="lg:w-[500px] hover:drop-shadow-lg cursor-pointer  w-[90%]  min-h-[140px] flex items-center justify-center gap-x-5  drop-shadow-md rounded-lg  bg-white">
              <div className="w-[95%] flex items-center justify-between gap-x-3 ">
                {' '}
                <img src={item?.pic} className="w-[100px] h-[100px] rounded-full  " />
                <div className="w-[70%] flex flex-col items-start justify-center gap-y-3 h-auto ">
                  <span className="w-auto text-start lg:text-lg text-base  font-bold  text-accent-1000">
                    {item?.name}
                  </span>
                  <span className="w-auto text-start lg:text-sm text-xs font-normal text-accent-1000">
                    {item?.posotion}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" w-full flex flex-col items-center justify-center h-auto gap-y-10 lg:pt-28 ">
        {' '}
        <span className="lg:text-4xl text-lg  font-extrabold text-accent-1000  w-full text-center ">
          {' '}
          اعضای تیم اجرایی شهر کراد{' '}
        </span>
        <div className="w-full max-w-[1440px]  flex flex-wrap items-center justify-center gap-8  ">
          {executeMemebers?.map((item, index) => (
            <div
              key={index}
              onClick={() => showHistoryFunction(item?.WorkHistory)}
              className="lg:w-[400px] hover:drop-shadow-lg cursor-pointer  w-[90%]  min-h-[120px] flex items-center justify-center gap-x-5  drop-shadow-md rounded-lg  bg-white">
              <div className="w-[95%] flex items-center justify-between ">
                {' '}
                <img src={person} className="w-[70px] h-[70px] rounded-full  " />
                <div className="w-[75%] flex flex-col items-start justify-center gap-y-3 h-auto">
                  <span className="w-auto text-start lg:text-lg text-base  font-bold text-accent-1000">
                    {item?.name}
                  </span>
                  <span className="w-auto text-start lg:text-sm text-xs font-normal text-accent-1000">
                    {item?.posotion}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="  bg-[url('asset/Pictures/BackGround/registrationBg.svg')]  bg-cover w-screen  bg-no-repeat  lg:bg-center bg-top lg:h-[900px] flex flex-col lg:justify-center justify-start  items-center lg:gap-y-28 gap-y-16 lg:py-0 py-6  ">
        {' '}
        <span className="lg:text-4xl text-lg  font-extrabold text-accent-1000  w-full text-center ">
          {' '}
          مشخصات ثبتی شرکت{' '}
        </span>
        <div className="lg:w-[50%] w-full max-w-[1440px] flex flex-wrap justify-center gap-12 items-center  ">
          {registrationInfo?.map((item, index) => (
            <div
              key={index}
              style={{ boxShadow: '0px 2px 10px 0px rgba(1, 182, 155, 0.1)' }}
              className="lg:w-[270px] w-[40%] rounded-large h-[150px] flex  flex-col items-center gap-y-5 justify-center bg-white ">
              {/* <InlineSVG src={verify} /> */}
              <span className="w-[80%]  text-center whitespace-normal lg:text-base text-sm  font-bold text-gray-600  ">
                {item?.title}
              </span>
              <span className="w-[80%] whitespace-pre  text-center lg:text-[15px] text-sm   text-gray-600  ">
                {' '}
                {item?.data}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[1440px] flex flex-col justify-center lg:gap-y-28 gap-y-10 items-center  ">
        <span className="lg:text-4xl text-lg  font-extrabold text-accent-1000  w-full text-center ">
          {' '}
          مجوز تامین مالی جمعی شهر کراد
        </span>
        <div
          // onClick={(e) => downloadFile('/files/cerificate.pdf', 'مجوز فرابورس شهرکراد', e)}
          className="  w-[235px]  h-[300px] bg-[#F6F8FA] rounded-lg flex flex-col justify-center  hover:shadow-lg cursor-pointer     items-center   ">
          <img src={document} />
          {/* <span className="text-base font-bold text-gray-700 w-full text-center  ">
            مجوز فعالیت سبدگردانی
          </span> */}
          {/* <a
            href="https://ifb.ir/Finstars/AllCrowdFundingAgents.aspx"
            target="_blank"
            className="underline-offset-8 hover:underline  text-accent-1000 text-base text-center "
            rel="noreferrer"> */}{' '}
          مشاهده
          {/* </a> */}
        </div>
      </div>
      <div
        className="lg:w-[1028px]  w-[95%] rounded-[16px] lg:h-[215px] py-10 h-auto justify-center items-center  flex "
        style={{
          background:
            ' radial-gradient(106.05% 163.87% at 0% 0%, #F0F6FF 0%, #67E8D5 25.31%, #1AA1A8 55.69%, #01B69B 100%)'
        }}>
        <div className="lg:w-[87%] w-[95%] lg:min-h-[115px] flex bg-white rounded-lg  p-4 items-start justify-center gap-3  ">
          <img src={card} className="lg:block hidden" />

          <div className="lg:w-[80%] w-full flex flex-col justify-center items-start gap-y-5">
            <span className="w-auto lg:text-lg text-base font-bold">اطلاعات حساب شهر کراد</span>
            <div className="w-full flex flex-wrap items-center justify-start gap-4  font-medium text-base">
              <span>بانک: - ایران</span>
              <span>شعبه: </span>
              <span>
                شماره حساب:{' '}
                <button
                  onClick={() => handleCopy('accountNumber', '----')}
                  className="w-auto text-nowrap text-accent-1000 hover:font-bold hover:underline underline-offset-4   ">
                  {copyStatus?.accountNumber == true ? 'کپی شد !' : '----'}
                </button>
              </span>
              <span>
                شماره شبا:{' '}
                <button
                  onClick={() => handleCopy('iban', '----')}
                  className="w-auto text-nowrap text-accent-1000 hover:font-bold hover:underline underline-offset-4   ">
                  {' '}
                  {copyStatus?.iban == true ? 'کپی شد !' : '----'}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
