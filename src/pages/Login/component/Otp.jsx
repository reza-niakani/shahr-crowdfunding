/* eslint-disable no-unused-vars */
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import EnteringApiCall from '../Api/EnteringApiCall';
import CountdownTimer from 'comon/timer/Timer';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import TimerLoader from 'comon/LoaderBar/TimeLoader';

function Otp({ step, setStep, otp, setOtp, nationalId, error }) {
  const [isloading, setIsloading] = useState(false);
  const [timer, setTimer] = useState(2 * 60);
  const [errorSend, setErrorSend] = useState(false);

  const IsMobile = useDeviceDetection();

  useEffect(() => {
    (step == 'OtpRegister' || step == 'OtpPassword') && SendOtpCode();
    setOtp();
  }, [step]);
  console.log(step);

  const SendOtpCode = async () => {
    let req =
      step == 'OtpRegister'
        ? EnteringApiCall.SendOtpSejamReq({
            nationalId: nationalId
          })
        : EnteringApiCall.SendOtpForgetPasswordReq({
            nationalId: nationalId
          });
    const res = await req;
    console.log('res', res);
    console.log('step', step);

    if (res) {
      setTimer(2 * 60);
    } else {
      setErrorSend(true);
      setTimer(0);
    }
  };

  const disable = Boolean(otp?.length == 5);

  return (
    <div className=" w-full flex flex-col h-full justify-center  items-center gap-y-10  ">
      <span className=" text-gray-main font-black lg:text-lg text-base w-full text-start ">
        کد ارسال شده را وارد کنید{' '}
      </span>
      <div className="w-full flex flex-col justify-start  gap-y-10  ">
        {/* password */}
        {errorSend ? (
          <div className=" w-full text-center text-sm lg:text-base  text-red-500   font-semibold  justify-center items-center  ">
            مشکلی در ارسال پیام رخ داده لطفا زمانی دیگر تلاش کنید{' '}
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-start h-auto gap-y-7">
            <span className=" w-full text-start justify-start  flex  font-medium lg:text-base text-xs    text-gray-main   ">
              کد ارسال شده{step == 'OtpPassword' ? '' : ' از طرف سجام'} به تلفن همراه (ثبت‌ شده در
              سجام) را وارد نمایید .{' '}
            </span>
            <div className="w-full justify-center items-center flex " style={{ direction: 'ltr' }}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={5}
                renderSeparator={<span></span>}
                inputStyle={{
                  width: IsMobile ? '42px' : '80px',
                  height: IsMobile ? '42px' : '70px',
                  borderRadius: '10px',
                  margin: IsMobile ? '5px' : '10px',
                  textAlign: 'center' // Center text for better appearance
                }}
                renderInput={(props) => (
                  <input
                    inputMode="numeric"
                    {...props}
                    className={`focus:outline-none focus:none focus:border-none focus:ring-green-700  ${
                      !error
                        ? 'border-[#009085] text-[#009085] '
                        : ' border border-red-500  focus:border-red-500 text-red-500 '
                    }`}
                  />
                )}
                style={{ textAlign: 'center' }} // Center the text in each input
              />
            </div>
            {/* <TimerLoader time={timer} setTime={setTimer} /> */}

            <div
              className={`w-[90%] flex items-center  gap-x-5  lg:text-sm text-xs font-medium text-gray-main justify-between py-2 `}
              style={{ direction: 'rtl' }}>
              {timer == 0 && (
                <span className=" cursor-pointer w-[30%] text-[#009085]  " onClick={SendOtpCode}>
                  {' '}
                  ارسال مجدد
                </span>
              )}
              <CountdownTimer time={timer} setTime={setTimer} />
            </div>
          </div>
        )}
        {/*  confirm password  */}

        {error && (
          <span className="w-full flex lg:justify-start justify-center  text-center lg:text-start text-xs text-red-200 items-center lg:pr-2">
            کد وارد شده اشتباه است{' '}
          </span>
        )}
        <div className="w-full flex  justify-between items-end lg:h-[150px] h-[80px] ">
          <button
            className={`w-[49%] lg:h-[50px] h-[43px] shadow-dropShadow2    text-center items-center flex justify-center font-medium text-sm rounded-large   text-white  ${
              otp ? ' opacity-100' : ' opacity-50'
            } ${isloading ? ' border border-[#009085] ' : 'bg-[#009085]'} `}
            disabled={!otp}
            onClick={() =>
              step == 'OtpRegister' ? setStep('registerPassword') : setStep('newPassword')
            }>
            {isloading ? <BouncingDotsLoader /> : 'ادامه'}
          </button>
          <button
            className="rounded-large text-sm lg:h-[50px] h-[43px] text-gray-main w-[49%] shadow-dropShadow2  "
            onClick={() => (step == 'OtpRegister' ? setStep('login') : setStep('password'))}>
            بازگشت
          </button>
        </div>
      </div>
    </div>
  );
}

export default Otp;
