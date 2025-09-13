/* eslint-disable no-unused-vars */
import Captcha from 'comon/Captcha/Captcha';
import React, { useEffect, useMemo, useState } from 'react';
import EnteringApiCall from '../Api/EnteringApiCall';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import { verifyIranianLegalId, verifyIranianNationalId } from '@persian-tools/persian-tools';

function Login({
  sejamError,
  setSejamError,
  setStep,
  nationalId,
  setNationalId,
  step,
  captchaValue,
  setCaptchaValue,
  captcha,
  setCaptcha
}) {
  const [handlecaptcha, setHandleCaptcha] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setCaptchaValue('');
    setNationalId('');
    step == 'login' && setHandleCaptcha(handlecaptcha + 1);
  }, [step]);

  const handleCheckExisting = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const res = await EnteringApiCall.CheckUserNameReq({
      username: nationalId,
      captcha: {
        id: captcha?.id,
        value: captchaValue
      }
    });
    if (res) {
      if (res?.isRegistered) {
        setStep('password');
      } else {
        // await CheckIsSejami();
        setError('شما  قبلا در سامانه ثب نام نکرده‌اید !');
      }
    } else {
      setError('خطا! مشکلی رخ داده است دوباره تلاش کنید ');
      setHandleCaptcha(handlecaptcha + 1);
    }
    setTimeout(() => {
      setError();
    }, 2500);
    setIsloading(false);
  };

  // const CheckIsSejami = async () => {
  //   const res = await EnteringApiCall.CheckIsSejamiReq(nationalId);
  //   if (res) {
  //     // If res equals 7, set step to OtpRegister, otherwise handle errors
  //     if (res?.data?.status == 7) {
  //       setStep('OtpRegister');
  //     } else {
  //       setSejamError(res?.data?.status); // Set Sejam error
  //       setStep('failed'); // Move to the failed step
  //     }
  //   } else {
  //     setError(true); // Handle the case where the API call fails or returns false
  //   }
  // };

  const VerfyNatinalId = () => {
    if (nationalId?.length == 11) {
      return verifyIranianLegalId(nationalId);
    } else if (nationalId?.length == 10) {
      return verifyIranianNationalId(nationalId);
    } else {
      return true;
    }
  };

  const disable =
    Boolean(nationalId) &&
    Boolean(captcha) &&
    Boolean(captchaValue?.length == 6) &&
    Boolean(!isloading) &&
    VerfyNatinalId();

  return (
    <div className=" w-full  flex flex-col h-full justify-start  items-center gap-y-10  py-5 ">
      <span className=" text-gray-main font-black lg:text-lg text-base text-start w-full ">
        مشخصات کاربری خود را وارد کنید{' '}
      </span>
      <form
        className="w-full flex flex-col justify-start  items-start lg:gap-y-8 gap-y-5  "
        onSubmit={(e) => handleCheckExisting(e)}>
        <div className="w-full flex flex-col justify-start items-center h-auto gap-y-2">
          <label
            htmlFor="nationalId"
            className=" text-gray-main w-full lg:justify-start items-center lg:text-sm  text-xs font-medium">
            کد ملی | شناسه ملی{' '}
          </label>
          <input
            id="nationalId"
            autoFocus
            maxLength={13}
            value={nationalId}
            onChange={(e) => {
              const value = e.target.value.replace(/,/g, ''); // Remove commas
              if (/^\d*$/.test(value)) {
                // Only allow digits (no other characters)
                setNationalId(value); // Set the value only if it's numeric
              }
            }}
            inputMode="numeric"
            className={` w-full   rounded-large text-center   ${
              !VerfyNatinalId()
                ? ' border border-red-main text-red-main '
                : '  text-gray-main  border border-gray-500'
            } text-sm focus:ring-0 focus:outline-none    h-[42px] `}
          />
          {!VerfyNatinalId() && (
            <span className="w-full  text-center  text-sm  text-red-700 ">
              کدملی یا شناسه وارد شده صحیح نمی باشد{' '}
            </span>
          )}
        </div>
        <div className="w-full  items-end flex justify-center  gap-2 ">
          <div className="w-[50%] flex flex-col justify-start items-center h-auto gap-y-2">
            <label
              htmlFor="captcha"
              className=" text-gray-main w-full lg:justify-start items-center lg:text-sm  text-xs font-medium">
              کد امنیتی{' '}
            </label>{' '}
            <input
              id="captcha"
              maxLength={6}
              value={captchaValue}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, ''); // Remove commas
                if (/^\d*$/.test(value)) {
                  // Only allow digits (no other characters)
                  setCaptchaValue(value); // Set the value only if it's numeric
                }
              }}
              inputMode="numeric"
              className=" w-full border border-gray-500 rounded-large text-center    text-sm  focus:ring-0 focus:outline-none   text-gray-main h-[42px] "
            />
          </div>
          <div className="w-[48%] flex justify-start items-center h-auto ">
            {' '}
            <Captcha enternigStep={handlecaptcha} captcha={captcha} setCaptcha={setCaptcha} />
          </div>
        </div>
        {error && (
          <span className="w-full text-center justify-start items-center  text-red-main text-sm ">
            {error}
          </span>
        )}{' '}
        <button
          className={`lg:w-[40%] w-full mt-8  lg:h-[50px] h-[40px] text-center items-center rounded-large  flex justify-center font-medium text-sm  border-0 focus:outline-none focus:ring-0  text-white  ${
            disable ? ' opacity-100' : ' opacity-50'
          } ${isloading ? ' border border-[#009085]  ' : 'bg-[#009085] '} `}
          disabled={!disable}
          type="submit">
          {isloading ? <BouncingDotsLoader /> : 'ادامه'}
        </button>
      </form>
    </div>
  );
}

export default Login;
