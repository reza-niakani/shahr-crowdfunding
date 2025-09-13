import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import Success from 'comon/Status/Success';
import CountdownTimer from 'comon/timer/Timer';
import React, { useMemo, useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import OTPInput from 'react-otp-input';
import clock from 'asset/Pictures/Icons/clock.svg';
import Axios from 'comon/Axios/Axios';

function UpdateSejami({ userInfo }) {
  const [steps, setSteps] = useState('send');
  const [isloading, setIsloading] = useState(false);
  const [status, setStatus] = useState();
  const [otp, setOtp] = useState();
  const [timer, setTimer] = useState(2 * 60);

  const IsMobile = useDeviceDetection();

  const sendOtp = async () => {
    setIsloading(true);
    try {
      const res = await Axios.post('/Accounts/CreateSejamOtp', {
        nationalId: userInfo?.username
      });
      console.log('otp response ', res);

      if (res?.meta?.code == 200) {
        setSteps('otp');
      } else {
        setStatus({
          style: ' text-red-700 ',
          text: 'خطا! مشکلی در ارسال کد رخ داده است ، کمی دیگر تلاش کنید '
        });
      }
    } catch (er) {
      console.log('err', er);

      setStatus({
        style: ' text-red-700 ',
        text:
          er?.response?.data?.title || 'خطا! مشکلی در ارسال کد رخ داده است ، کمی دیگر تلاش کنید '
      });
    } finally {
      setIsloading(false);
      setTimeout(() => {
        setStatus();
      }, 3000);
    }
  };

  const UpdateSejamDetail = async () => {
    setIsloading(true);
    try {
      const res = await Axios.post('/Accounts/UpdateSejamDetail', {
        otp: otp && String(otp)
      });
      console.log('update response ', res);

      if (res?.response?.status == 200) {
        setSteps('status');
      } else {
        setStatus({
          style: ' text-red-700 ',
          text:
            res?.response?.data?.title ||
            ' خطایی در انجام عملیات رخ داده لطفا زمان دیرگر تلاش کنید '
        });
      }
    } catch (er) {
      console.log('erros', er);
      setStatus({
        style: ' text-red-700 ',
        text:
          er?.response?.data?.title || ' خطایی در انجام عملیات رخ داده لطفا زمان دیرگر تلاش کنید '
      });
    } finally {
      setIsloading(false);
      setTimeout(() => {
        setStatus();
      }, 3000);
    }
  };

  const handleUpdateState = () => {
    switch (steps) {
      case 'sendOtp':
        return (
          <button
            onClick={sendOtp}
            className={`w-[49%] lg:h-[50px] h-[43px] shadow-dropShadow2    text-center items-center flex justify-center font-medium text-sm rounded-large   text-white   ${
              isloading ? ' border border-accent-600 ' : 'bg-accent-600'
            } `}>
            {' '}
            {isloading ? <BouncingDotsLoader /> : '  ارسال کد از سجام'}
          </button>
        );

      case 'otp':
        return (
          <div className="w-[80%] flex flex-col justify-center items-center h-auto gap-y-7">
            <span className=" w-[70%] text-start justify-start  flex  font-medium lg:text-base text-xs    text-gray-main   ">
              کد ارسال شده از طرف سجام به تلفن همراه (ثبت‌ شده در سجام) را وارد نمایید .{' '}
            </span>
            <div className="w-full justify-center items-center flex " style={{ direction: 'ltr' }}>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={5}
                renderSeparator={<span></span>}
                inputStyle={{
                  width: IsMobile ? '42px' : '70px',
                  height: IsMobile ? '42px' : '60px',
                  borderRadius: '10px',
                  margin: IsMobile ? '5px' : '10px',
                  textAlign: 'center' // Center text for better appearance
                }}
                renderInput={(props) => (
                  <input
                    inputMode="numeric"
                    {...props}
                    className={`focus:outline-none focus:none focus:border-none focus:ring-green-700  ${
                      !status
                        ? 'border-accent-600 text-accent-600 '
                        : ' border border-red-500  focus:border-red-500 text-red-500 '
                    }`}
                  />
                )}
                style={{ textAlign: 'center' }} // Center the text in each input
              />
            </div>
            {/* <TimerLoader time={timer} setTime={setTimer} /> */}

            <div
              className={`w-[90%] flex items-center  gap-x-5  lg:text-sm text-xs font-medium text-gray-main justify-center  py-2 `}
              style={{ direction: 'rtl' }}>
              {timer == 0 && (
                <span className=" cursor-pointer w-[30%] text-accent-600  " onClick={sendOtp}>
                  {' '}
                  ارسال مجدد
                </span>
              )}
              <InlineSVG src={clock} />
              <CountdownTimer time={timer} setTime={setTimer} />
            </div>
            <button
              className={`w-[49%] lg:h-[50px] h-[43px] shadow-dropShadow2    text-center items-center flex justify-center font-medium text-sm rounded-large   text-white  ${
                otp ? ' opacity-100' : ' opacity-50'
              } ${isloading ? ' border border-accent-600 ' : 'bg-accent-600'} `}
              disabled={!otp}
              onClick={UpdateSejamDetail}>
              {isloading ? <BouncingDotsLoader /> : 'ادامه'}
            </button>
          </div>
        );
      case 'status':
        return <Success text=" اطلاعات شما با موفقیت بروزرسانی شد" />;

      default:
        return (
          <button
            onClick={sendOtp}
            className=" h-[48px] rounded-lg text-center flex justify-center items-center  text-base font-medium text-white bg-accent-600   w-[200px] ">
            {' '}
            ارسال کد سجام{' '}
          </button>
        );
    }
  };

  useMemo(() => {
    setOtp();
    setStatus();
    steps == 'status' &&
      setTimeout(() => {
        setSteps();
      }, 3000);
  }, [steps]);

  return (
    <div className="w-full flex flex-col items-center gap-y-8 min-h-[200px]  justify-center  ">
      {handleUpdateState()}
      {status && (
        <span
          className={` ${status?.style} w-full text-center text-sm font-medium whitespace-normal `}>
          {status?.text}
        </span>
      )}
    </div>
  );
}

export default UpdateSejami;
