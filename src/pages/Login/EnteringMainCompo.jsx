/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Login from './component/Login';
import Password from './component/Password';
import Otp from './component/Otp';
import Failed from 'comon/Status/Failed';
import Success from 'comon/Status/Success';
import { sejamStatus } from 'comon/DB/SejamStatusEnum';
import InlineSVG from 'react-inlinesvg';
import banner from 'asset/Pictures/Images/loginBanner.svg';
import mainLogo from 'asset/Pictures/logo/CompanyMainLogo.svg';
import Register from './component/Register';
import { useNavigate } from 'react-router-dom';

function EnteringMainCompo() {
  const [step, setStep] = useState();
  const [nationalId, setNationalId] = useState();
  const [otp, setOtp] = useState();
  const [error, setError] = useState(false);
  const [sejamError, setSejamError] = useState(false);
  const [captchaValue, setCaptchaValue] = useState();
  const [captcha, setCaptcha] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setStep();
  }, []);

  const HandleEnterignStep = () => {
    switch (step) {
      case 'login':
        return (
          <Login
            captchaValue={captchaValue}
            setCaptchaValue={setCaptchaValue}
            captcha={captcha}
            setCaptcha={setCaptcha}
            step={step}
            setStep={setStep}
            nationalId={nationalId}
            setNationalId={setNationalId}
            sejamError={sejamError}
            setSejamError={setSejamError}
          />
        );
      case 'register':
        return (
          <Register
            captchaValue={captchaValue}
            setCaptchaValue={setCaptchaValue}
            captcha={captcha}
            setCaptcha={setCaptcha}
            step={step}
            setStep={setStep}
            nationalId={nationalId}
            setNationalId={setNationalId}
            sejamError={sejamError}
            setSejamError={setSejamError}
          />
        );

      case 'password':
        return (
          <Password
            captchaValue={captchaValue}
            setCaptchaValue={setCaptchaValue}
            captcha={captcha}
            setCaptcha={setCaptcha}
            step={step}
            setStep={setStep}
            nationalId={nationalId}
            setNationalId={setNationalId}
            otp={otp}
          />
        );

      case 'newPassword':
        return (
          <Password
            error={error}
            setError={setError}
            step={step}
            setStep={setStep}
            nationalId={nationalId}
            setNationalId={setNationalId}
            otp={otp}
          />
        );
      case 'registerPassword':
        return (
          <Password
            error={error}
            setError={setError}
            step={step}
            setStep={setStep}
            nationalId={nationalId}
            setNationalId={setNationalId}
            otp={otp}
          />
        );

      case 'OtpRegister':
        return (
          <Otp
            step={step}
            setStep={setStep}
            otp={otp}
            setOtp={setOtp}
            nationalId={nationalId}
            error={error}
            setError={setError}
          />
        );
      case 'OtpPassword':
        return (
          <Otp
            step={step}
            setStep={setStep}
            otp={otp}
            setOtp={setOtp}
            nationalId={nationalId}
            error={error}
            setError={setError}
          />
        );
      case 'failed':
        return (
          <div className="w-full flex  flex-col justify-start items-center h-full gap-y-5 ">
            {' '}
            <Failed
              text={sejamError && `خطا سجام :${sejamStatus?.[1]}`}
              sejamText="ابتدا به سایت سجام مراجعه و اقدامات لازم جهت تکمیل روند سجامی شدن را انجام دهید و سپس مجدد برای ثبت‌نام اقدام نمایید."
            />
            <a
              target="_blank"
              rel="noreferrer"
              className=" lg:h-12 h-10 rounded-md text-center items-center flex justify-center text-sm  border-gray-main border w-full text-gray-main   lg:pt-0  bg-gray-150 "
              href="https://profilesejam.csdiran.ir/session">
              رفتن به سایت سجام
            </a>
            <button
              className="rounded-large text-sm lg:h-[50px] h-[43px] text-[#009085] w-full   shadow-dropShadow2  "
              onClick={() => setStep('login')}>
              بازگشت
            </button>
          </div>
        );
      case 'success':
        return (
          <div className="w-full flex flex-col items-center   justify-between  h-full ">
            <Success text="ثبت نام شما با موفقیت انجام شد." />
            <button
              className="rounded-large text-sm lg:h-[50px] h-[43px] text-[#009085] w-full   shadow-dropShadow2  "
              onClick={() => setStep('login')}>
              بازگشت
            </button>
          </div>
        );

      default:
        return (
          <Login
            captchaValue={captchaValue}
            setCaptchaValue={setCaptchaValue}
            captcha={captcha}
            setCaptcha={setCaptcha}
            step={step}
            setStep={setStep}
            nationalId={nationalId}
            setNationalId={setNationalId}
            sejamError={sejamError}
            setSejamError={setSejamError}
          />
        );
    }
  };

  const controlStep = () => {
    switch (step) {
      case 'login':
        return { name: 'ورود یا ثبت نام', key: 'login' };
      case 'password':
        return { name: 'رمز عبور خود را وارد کنید', key: 'login' };
      case 'newPassword':
        return { name: 'ایجاد رمز عبور ', key: 'login' };
      case 'registerPassword':
        return { name: 'ایجاد رمز عبور ', key: 'register' };
      case 'register':
        return { name: 'ثبت نام در سامانه', key: 'register' };
      case 'OtpRegister':
        return { name: 'کد تایید سجام ', key: 'register' };
      case 'OtpPassword':
        return { name: 'کدفراموشی رمز', key: 'login' };
      case 'failed':
        return { name: 'وضعیت درخواست', key: false };
      case 'success':
        return { name: 'وضعیت درخواست', key: false };

      default:
        return { name: 'ورود یا ثبت نام', key: 'login' };
    }
  };
  console.log(step);

  return (
    <div className="w-full lg:min-w-[1440px] lg:max-w-[1920px]  flex lg:flex-row flex-col lg:justify-center justify-start   items-center h-auto   gap-y-10 ">
      <div className="w-full   flex lg:flex-row lg:min-h-[828px] flex-col lg:justify-center justify-start gap-3  items-center h-auto lg:py-0 py-5 ">
        {/* forms side  */}
        <div className="lg:w-[50%] w-[95%] h-full flex flex-col  justify-start items-center lg:gap-y-10  gap-y-3 ">
          <div className="w-full flex justify-center items-center  lg:bg-white bg-gray-50 p-2 lg:h-[20%] rounded-large">
            <InlineSVG
              src={mainLogo}
              className="lg:w-[270px] lg:h-[165px] w-[125px] h-[100px] cursor-pointer"
              onClick={() => navigate('/')}
            />
          </div>
          {/* form by step */}
          <div className="lg:w-[70%] w-[95%]  lg:shadow-none shadow-dropShadow2  flex flex-col  items-center justify-start gap-y-5 rounded-md p-3 py-8 lg:min-h-[590px] ">
            {/* steper */}
            <div className="w-[90%] flex flex-col gap-y-3  justify-center items-center gap-0 ">
              <div className="w-full flex justify-center items-center gap-0 flex-nowrap">
                {' '}
                <button
                  onClick={() => setStep('login')}
                  className={`w-[50%] lg:text-base text-sm  text-center items-start flex justify-center ${
                    controlStep()?.key == 'login' ? 'text-[#009085]' : ' text-[#D9D9D9]'
                  } `}>
                  ورود
                </button>
                <button
                  onClick={() => setStep('register')}
                  className={`w-[50%] lg:text-base text-sm  text-center items-start flex justify-center ${
                    controlStep()?.key == 'register' ? 'text-[#009085]' : ' text-[#D9D9D9]'
                  } `}>
                  ثبت‌نام
                </button>
              </div>
              <div className="w-full flex justify-center items-center gap-0 flex-nowrap">
                <div
                  className={`w-[50%] text-center items-start flex justify-center ${
                    controlStep()?.key == 'login'
                      ? 'border-[#009085] border-b-4 rounded-full '
                      : ' text-[#D9D9D9]  border-b border-[#D9D9D9]'
                  } `}
                />
                <div
                  className={`w-[50%] text-center items-start flex justify-center ${
                    controlStep()?.key == 'register'
                      ? 'border-[#009085] border-b-4 rounded-full '
                      : ' text-[#D9D9D9]  border-b border-[#D9D9D9]'
                  } `}
                />
              </div>
            </div>
            {/* main Form */}
            <div className="w-[95%] flex flex-col gap-y-3  justify-start   items-center gap-0 h-full lg:min-h-[540px]">
              {HandleEnterignStep()}
            </div>
          </div>
        </div>
        {/* banner for desktop and bottom text for mobile */}
        <div className="lg:w-[60%] w-[87%] h-full flex flex-col items-center justify-center lg:py-0 py-6 lg:bg-white bg-gray-100 rounded-large">
          {/* desktop */}
          <InlineSVG
            src={banner}
            className="w-[1000px] h-[90%] max-h-[1430px] min-h-[320px] object-contain rounded-Radius  lg:block hidden"
          />
          <ul className="w-[85%] justify-start items-center gap-y-3 list-disc lg:hidden flex flex-col">
            <li className="text-[#B1B1B1] text-xs text-justify w-full ">
              سرمایه‌گذار گرامی، در صورتی که در در این سامانه حساب کاربری دارید می‌توانید با استفاده
              از همان کدملی و کلمه عبور وارد شوید.
            </li>
            <li className="text-[#B1B1B1] text-xs text-justify ">
              هرگز اطلاعات حساب‌کاربری (کدملی و رمز عبور) خود را در اختیار دیگران قرار ندهید.
            </li>
            <li className="text-[#B1B1B1] text-xs text-justify ">
              پس‌از اتمام کار با سامانه، حتما بر روی دکمه خروج از سامانه کلیک نمایید.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EnteringMainCompo;
