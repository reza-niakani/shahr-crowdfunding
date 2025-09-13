/* eslint-disable no-unused-vars */
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import React, { useEffect, useMemo, useState } from 'react';
import EnteringApiCall from '../Api/EnteringApiCall';
import openEye from 'asset/Pictures/Icons/openEye.svg';
import closeEye from 'asset/Pictures/Icons/closeEye.svg';
import { useLocation } from 'react-router-dom';
import { addToLocalStorage } from 'comon/storage/localStorage';
import InlineSVG from 'react-inlinesvg';
import { ErrorHandler } from 'comon/GlobalyTools/ErrorHandler';
import validatePassword from 'comon/GlobalyTools/ValidatePassword';

function Password({ step, setStep, nationalId, otp, captchaValue, captcha }) {
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState();
  const [status, setStatus] = useState();
  const [eye, setEye] = useState([]);
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false
  });

  useEffect(() => {
    setPassword();
    setPasswordConfirm();
    setError(false);
    setStatus();
  }, []);

  useEffect(() => {
    status &&
      setTimeout(() => {
        setStatus();
      }, 2000);
  }, [status]);

  useMemo(() => {
    validatePassword(password, setPasswordValidation);
  }, [password]);

  const { search } = useLocation();
  const planId = search?.split('?')?.[1];

  const RequestDetection = (e) => {
    switch (step) {
      case 'password':
        return handleLogin(e);
      case 'newPassword':
        return ForgetPassword(e);
      case 'registerPassword':
        return Register(e);

      default:
        break;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const res = await EnteringApiCall.LoginReq({
      username: nationalId,
      password: password,
      captcha: {
        id: captcha?.id,
        value: captchaValue
      }
    });

    if (res?.status == 200) {
      addToLocalStorage('token', res?.data?.token);
      planId ? (window.location = `/plan_detail/${planId}`) : (window.location = '/dashboard');

      // : token?.nationalId?.length == 10
      //   ? (window.location = '/dashboard')
      //   : (window.location = '/User_Panel');
    } else {
      res?.data == 'INVALID_CAPTCHA' && setStep();
      setError(ErrorHandler(res?.data));
    }
    setIsloading(false);
  };

  const ForgetPassword = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const res = await EnteringApiCall.ForgetPasswordSetReq({
      otp: otp,
      nationalId: nationalId,
      password: password
    });
    if (res?.status == 200) {
      setStatus('success');
      setTimeout(() => {
        setStep();
      }, 3000);
    } else {
      console.log('res', res);

      setError(ErrorHandler(res?.data));
      setStatus('failed');
    }
    setIsloading(false);
  };

  const Register = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const res = await EnteringApiCall.RegisterSetReq({
      otp: otp,
      nationalId: nationalId,
      password: password
    });
    if (res) {
      setStep('success');
      // setTimeout(() => {
      //   setStep();
      // }, 3000);
    } else {
      setStep('failed');
    }
    setIsloading(false);
  };

  const disable =
    step == 'password'
      ? Boolean(password) && Boolean(!isloading) && Boolean(nationalId)
      : Boolean(password) &&
        Boolean(Object.values(passwordValidation).every(Boolean)) &&
        Boolean(passwordConfirm) &&
        Boolean(password == passwordConfirm) &&
        Boolean(!isloading);

  const HandleShowPassword = (id) => {
    const find = eye.find((item) => item == id);
    if (find) {
      const fixArray = eye?.filter((item) => item !== id);
      return setEye(fixArray);
    } else {
      return setEye([...eye, id]);
    }
  };

  const HandleDeteCted = (id) => {
    return eye?.find((item) => item == id) ? true : false;
  };
  console.log(step);

  return (
    <div className=" w-full flex flex-col h-full justify-center  items-center gap-y-10  ">
      <span className=" text-gray-main font-black lg:text-lg text-lg text-start w-full ">
        {step == 'password' ? 'رمز عبور خود را وارد کنید ' : 'ایجاد رمز عبور جدید'}{' '}
      </span>
      <form
        className="w-full flex flex-col justify-between items-center  gap-y-5 h-full  "
        onSubmit={(e) => RequestDetection(e)}>
        {/* password */}
        <div className="w-full flex flex-col justify-start items-end h-auto gap-y-2">
          <div className="w-full justify-start flex items-center ">
            {' '}
            <label
              htmlFor="password"
              className=" text-gray-main w-fit text-nowrap  text-start  items-center lg:text-sm text-xs ">
              {step == 'password' ? 'رمز عبور ' : 'ایجاد رمز عبور'}{' '}
            </label>
            {step == 'password' && (
              <span
                className="w-full flex justify-end   text-end  lg:text-sm text-xs text-[#C9B777] items-center  cursor-pointer "
                onClick={() => setStep('OtpPassword')}>
                فراموشی رمز عبور{' '}
              </span>
            )}
          </div>
          <input
            autoFocus
            type={HandleDeteCted(1) ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full   ${
              step == 'password'
                ? 'text-gray-main text-center border border-gray-500 '
                : password && passwordConfirm
                  ? password == passwordConfirm
                    ? 'text-gray-main border border-gray-500'
                    : 'border-red-main focus:border-red-main  text-red-main '
                  : 'text-gray-main border border-gray-500 '
            } rounded-lg text-center  pr-2 text-sm  focus:border-gray-500  focus:ring-0 focus:outline-none placeholder:text-gray-main  lg:h-[42px] h-[40px]  `}
          />
          <InlineSVG
            src={HandleDeteCted(1) ? openEye : closeEye}
            onClick={() => HandleShowPassword(1)}
            className="   pl-2 cursor-pointer -mt-[2.7rem]  z-[10] w-[30px] h-[30px]"
          />
        </div>
        {/*  confirm password  */}
        {(step == 'newPassword' || step == 'registerPassword') && (
          <div className="w-full flex flex-col justify-start items-end h-auto gap-y-1">
            <label
              htmlFor="confirmPassword"
              className="text-sm text-gray-main w-full font-medium text-start items-center lg:pr-3">
              تکرار رمز عبور{' '}
            </label>
            <input
              type={HandleDeteCted(2) ? 'text' : 'password'}
              name="confirmPassword"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className={`w-full   ${
                password && passwordConfirm
                  ? password == passwordConfirm
                    ? ' text-gray-main border border-gray-500 '
                    : 'border-red-main focus:border-red-main  text-red-main'
                  : '   text-gray-main border border-gray-500 '
              } rounded-lg   text-center   pr-2 text-sm focus:border-gray-500  focus:ring-0 focus:outline-none placeholder:text-gray-main  lg:h-[42px] h-[40px] `}
            />
            <InlineSVG
              src={HandleDeteCted(2) ? openEye : closeEye}
              onClick={() => HandleShowPassword(2)}
              className="   pl-2 cursor-pointer -mt-[2.5rem]  z-[10] w-[30px] h-[30px]"
            />
          </div>
        )}
        {passwordConfirm && password && password !== passwordConfirm && (
          <span className="w-full flex lg:justify-start justify-center  text-center lg:text-start text-xs text-red-main items-center lg:pr-2">
            رمز عبور و تکرار آن باید یکسان باشند
          </span>
        )}
        {error && (
          <span className="w-full flex lg:justify-start justify-center  text-center lg:text-start text-xs text-red-main items-center lg:pr-2">
            {error}
          </span>
        )}
        {/* password roles  */}
        {step !== 'password' && (
          <div className="w-full flex flex-col items-center  justify-start gap-y-2 text-gray-main  text-xs pt-2  ">
            <span className="w-full flex justify-start items-center gap-x-1">
              رمز عبور باید شامل :
            </span>
            <ul
              className={`w-[90%] flex flex-col justify-start items-start gap-y-1 list-disc text-xs  `}>
              <li
                className={
                  password
                    ? passwordValidation.minLength
                      ? 'text-green-500'
                      : 'text-red-500'
                    : 'text-gray-main'
                }>
                حداقل 8 کاراکتر
              </li>
              <li
                className={
                  password
                    ? passwordValidation.hasUpperCase
                      ? 'text-green-500'
                      : 'text-red-500'
                    : 'text-gray-main'
                }>
                حداقل یک حرف بزرگ انگلیسی
              </li>
              <li
                className={
                  password
                    ? passwordValidation.hasLowerCase
                      ? 'text-green-500'
                      : 'text-red-500'
                    : 'text-gray-main'
                }>
                حداقل یک حرف کوچک انگلیسی
              </li>
              <li
                className={
                  password
                    ? passwordValidation.hasNumber
                      ? 'text-green-500'
                      : 'text-red-500'
                    : 'text-gray-main'
                }>
                حداقل یک عدد
              </li>
              <li
                className={
                  password
                    ? passwordValidation.hasSpecial
                      ? 'text-green-500'
                      : 'text-red-500'
                    : 'text-gray-main'
                }>
                حداقل یک علامت خاص مانند @, #, %, &, * و ...
              </li>
            </ul>
          </div>
        )}

        <div className="w-full flex  justify-between  items-end h-[120px] gap-y-2 pt-2">
          {status ? (
            <span
              className={`w-full h-10 text-sm border  rounded-md flex justify-center text-center items-center ${
                status == 'success' && ' border-green-600 text-green-600 '
              } ${status == 'failed' && ' border-red-main text-red-main '}`}>
              {status == 'success' && 'درخواست با موفقیت ثبت شد '}
              {status == 'failed' && ' ثبت نشد'}
            </span>
          ) : (
            <button
              className={`w-[49%] lg:h-[50px] h-[43px] shadow-dropShadow2    text-center items-center flex justify-center font-medium text-sm rounded-large   text-white  ${
                disable ? ' opacity-100' : ' opacity-50'
              } ${isloading ? ' border border-[#C9B777] ' : 'bg-[#C9B777] '} `}
              disabled={!disable}
              type="submit">
              {isloading ? <BouncingDotsLoader /> : step == 'password' ? 'ورود ' : 'ثبت '}
            </button>
          )}
          <button
            className="rounded-large text-sm lg:h-[50px] h-[43px] text-gray-main w-[49%] shadow-dropShadow2  "
            onClick={() => (step == 'password' ? setStep('login') : setStep('otp'))}>
            بازگشت
          </button>
        </div>
      </form>
    </div>
  );
}

export default Password;
