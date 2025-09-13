import Axios from 'comon/Axios/Axios';
import validatePassword from 'comon/GlobalyTools/ValidatePassword';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import React, { useMemo, useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import openEye from 'asset/Pictures/Icons/openEye.svg';
import closeEye from 'asset/Pictures/Icons/closeEye.svg';

function Changepassword({ userName }) {
  const [newPassword, setNewPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();
  const [eye, setEye] = useState([]);
  const [otpStatus, setOtpStatus] = useState();
  const [otp, setOtp] = useState();
  const [response, setResponse] = useState();
  const [isloading, setIsloading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false
  });

  const HandleShowPassword = (id) => {
    const find = eye.find((item) => item == id);
    if (find) {
      const fixArray = eye?.filter((item) => item !== id);
      return setEye(fixArray);
    } else {
      return setEye([...eye, id]);
    }
  };
  const roles = [
    { key: 'minLength', text: 'حداقل 8 کاراکتر' },
    { key: 'hasUpperCase', text: 'حداقل یک حرف بزرگ انگلیسی' },
    { key: 'hasLowerCase', text: 'حداقل یک حرف کوچک انگلیسی' },
    { key: 'hasNumber', text: 'حداقل یک عدد' },
    { key: 'hasSpecial', text: 'حداقل یک علامت خاص مانند @, #, %, &, * و ...' }
  ];

  const HandleDeteCted = (id) => {
    return eye?.find((item) => item == id) ? true : false;
  };

  useMemo(() => {
    validatePassword(newPassword, setPasswordValidation);
  }, [newPassword]);

  const sendOtpCode = async () => {
    setIsloading(true);
    await Axios.post('/Accounts/CreateOTP', { nationalId: userName })
      .then(() => setOtpStatus(true))
      .catch(() => setOtpStatus(true))
      .finally(() => setIsloading(false));
  };

  const CreateNewPassword = async () => {
    setIsloading(true);
    await Axios.post('/Accounts/ForgotPassword', {
      otp,
      nationalId: userName,
      password: newPassword
    })
      .then(() => setResponse(true))
      .catch(() => setResponse(false))
      .finally(() => {
        setIsloading(false);
        setTimeout(() => {
          sendOtpCode();
          setNewPassword();
          setConfirmedPassword();
          setResponse();
        }, 2000);
      });
  };

  const disable =
    Boolean(newPassword) &&
    Boolean(Object.values(passwordValidation).every(Boolean)) &&
    Boolean(confirmedPassword) &&
    Boolean(newPassword == confirmedPassword) &&
    Boolean(!isloading);

  return (
    <div className="w-full min-h-[400px] justify-center items-center h-auto flex flex-col gap-y-5 ">
      {' '}
      {otpStatus && (
        <>
          <div className=" flex lg:w-[40%] w-[90%]  flex-col gap-y-2 justify-start items-end ">
            <label htmlFor="otp" className="text-xs text-gray-main font-medium  text-start w-full">
              {' '}
              کد ارسالی{' '}
            </label>
            <input
              autoFocus
              name="otp"
              maxLength={5}
              inputMode="numeric"
              className="w-full text-sm text-center text-gray-main pr-2 h-[42px] rounded-lg bg-transparent focus:outline-none border border-[#E0E0E0] placeholder:text-xs placeholder:text-[#8b8b8b]  "
              value={otp}
              placeholder="کد را وارد کنید"
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, ''); // Remove commas
                if (/^\d*$/.test(value)) {
                  // Only allow digits (no other characters)
                  setOtp(value); // Set the value only if it's numeric
                }
              }}
            />
          </div>

          <div className="lg:w-[40%] w-[90%] justify-start items-center flex flex-col gap-y-5">
            {/* Password Input Section */}
            <div className="w-full flex flex-col items-center justify-start gap-y-2">
              <label htmlFor="password" className="text-sm text-gray-main font-medium w-full">
                رمز عبور
              </label>
              <div className="relative w-full">
                <input
                  type={HandleDeteCted(1) ? 'text' : 'password'}
                  id="password"
                  value={newPassword || ''}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full text-sm text-center pr-2 h-[42px] border rounded-lg  placeholder:text-xs placeholder:text-[#8b8b8b]  focus:ring-0 focus:outline-none ${
                    newPassword && confirmedPassword
                      ? newPassword == confirmedPassword
                        ? 'text-gray-main border-[#E0E0E0]'
                        : 'border-red-main focus:border-red-main  text-red-main '
                      : 'text-gray-main border-[#E0E0E0] '
                  }`}
                  placeholder="رمز عبور خود را وارد کنید"
                />
                <InlineSVG
                  src={HandleDeteCted(1) ? closeEye : openEye}
                  onClick={() => HandleShowPassword(1)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer  lg:w-[25px] lg:h-[25px] w-[20px] h-[20px]"
                />
              </div>
            </div>

            {/* Confirm Password Section */}
            <div className="w-full flex flex-col items-center justify-start gap-y-1">
              <label
                htmlFor="confirmPassword"
                className="text-sm text-gray-main font-medium w-full">
                تکرار رمز عبور
              </label>
              <div className="relative w-full">
                <input
                  type={HandleDeteCted(2) ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmedPassword || ''}
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                  className={`w-full text-sm text-center pr-2 h-[42px] rounded-lg  focus:ring-0 placeholder:text-xs placeholder:text-[#8b8b8b]  focus:outline-none ${
                    newPassword && confirmedPassword
                      ? newPassword === confirmedPassword
                        ? 'text-gray-main border border-[#E0E0E0]'
                        : 'text-red-main border border-red-main focus:border-red-main'
                      : 'text-gray-main border border-[#E0E0E0]'
                  }`}
                  placeholder="تکرار رمز عبور"
                />
                <InlineSVG
                  src={HandleDeteCted(2) ? closeEye : openEye}
                  onClick={() => HandleShowPassword(2)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer lg:w-[25px] lg:h-[25px] w-[20px] h-[20px]"
                />
              </div>
            </div>
            {(newPassword && confirmedPassword && newPassword) !== confirmedPassword && (
              <span className="w-full text-center  text-xs text-red-main">
                رمز عبور و تکرار آن متفات است
              </span>
            )}
            {/* Password Rules */}
            <div className="w-full flex flex-col items-center justify-start  gap-y-2 text-gray-main text-xs ">
              <span className="w-full text-start">رمز عبور باید شامل :</span>
              <ul className="list-disc w-full pr-5">
                {roles.map((rule) => (
                  <li
                    key={rule.key}
                    className={
                      newPassword
                        ? passwordValidation[rule.key]
                          ? 'text-green-500'
                          : 'text-red-500'
                        : 'text-gray-main'
                    }>
                    {rule.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
      {otpStatus ? (
        response !== true && response !== false ? (
          <button
            onClick={CreateNewPassword}
            disabled={!disable}
            className={` lg:w-[40%] w-[90%] flex text-center items-center justify-center text-sm text-accent-600 border border-accent-600 drop-shadow-lg bg-[#F3FAFB]  h-12 rounded-md ${
              !disable ? 'opacity-70' : ' opacity-100'
            } `}>
            {isloading ? <BouncingDotsLoader /> : 'ثبت'}{' '}
          </button>
        ) : (
          <span
            className={`w-full text-center flex justify-center text-sm ${
              response ? 'text-green-600' : 'text-red-main'
            }  items-center  py-2 `}>
            {response ? ' تغییر رمز با موفقیت انجام شد ' : ' ثبت ناموفق! لطفا کمی دیگر تلاش کنید'}
          </span>
        )
      ) : (
        <div className=" w-full flex justify-center items-center gap-y-5 flex-col ">
          <span className=" text-center   text-accent-600 font-medium   lg:text-base text-sm ">
            {' '}
            ( برای تغییر رمز کلیک کنید)
          </span>
          <button
            disabled={isloading}
            onClick={sendOtpCode}
            className={` lg:w-[40%] w-[90%] flex text-center items-center justify-center text-sm text-accent-600 border border-accent-600 drop-shadow-lg bg-[#F3FAFB]  h-12 rounded-md `}>
            {isloading ? <BouncingDotsLoader /> : 'ارسال کد '}{' '}
          </button>
        </div>
      )}
      {otpStatus == false && (
        <span className="w-full text-center flex justify-center text-sm text-red-main items-center  py-2 ">
          مشکلی در ارسال کد رخ داده کمی دیگر تلاش کنید{' '}
        </span>
      )}
    </div>
  );
}

export default Changepassword;
