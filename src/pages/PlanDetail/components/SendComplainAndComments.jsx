import Axios from 'comon/Axios/Axios';
import Captcha from 'comon/Captcha/Captcha';
import DataContext from 'comon/context/MainContext';
import { handleNumberInput } from 'comon/GlobalyTools/UseAbleFunctions';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import { getFromLocalStorage } from 'comon/storage/localStorage';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SendComplainAndComments() {
  const { userInfo } = useContext(DataContext);
  const [requestType, setRequestType] = useState('comment');
  const [data, setData] = useState({});
  const [response, setResponse] = useState();
  const [captchaValue, setCaptchaValue] = useState();
  const [captcha, setCaptcha] = useState();
  const [changeCaptcha, setChangeCaptcha] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const token = getFromLocalStorage('token');
  const { id } = useParams();

  useEffect(() => {
    setData({});
  }, []);

  useEffect(() => {
    setChangeCaptcha(!changeCaptcha);
  }, [requestType]);

  const SendRequest = async () => {
    setIsloading(true);
    const apiAddress = requestType == 'complain' ? '/Complaints/Create' : '/Comments/Create';
    const apiBody =
      requestType == 'complain'
        ? {
            userId: userInfo?.id,
            planId: +id,
            subject: data?.title,
            content: data?.text,
            captcha: {
              id: captcha?.id,
              value: captchaValue
            }
          }
        : {
            investmentPlanId: +id,
            content: data?.text,
            parentCommentId: null,
            captcha: {
              id: captcha?.id,
              value: captchaValue
            }
          };

    try {
      const res = await Axios.post(apiAddress, apiBody);
      console.log(res?.code);
      setResponse({ status: 'success', text: 'درخواست شما با موفقیت ثبت شد' });
    } catch (ex) {
      setResponse({ status: 'failed', text: 'خطا!  ثبت ناموفق دوباره تلاش کنید' });
    } finally {
      setIsloading(false);
      setTimeout(() => {
        setData({ title: '', text: '' });
        setCaptchaValue('');
        setChangeCaptcha(!changeCaptcha);
        setResponse();
      }, 3000);
    }
  };

  const disabled =
    requestType == 'complain'
      ? !!userInfo?.id && !!id && !!data?.title && !!data?.text && !!captchaValue
      : !!userInfo?.id && !!id && !!data?.text && !!captchaValue;

  return (
    <div className="w-full flex flex-col min-h-[100px] items-center justify-start p-3 ">
      {' '}
      {token ? (
        <div className="w-full h-auto flex flex-col items-center justify-start gap-y-5 ">
          <div className="w-[70%] flex justify-center gap-x-5  items-center p-3 bg-white drop-shadow-md rounded-md  ">
            <button
              className={` w-[150px] h-[40px]  text-center flex justify-center items-start hover:drop-shadow-md hover:text-accent-600  font-bold text-sm hover:bg-gray-200  hover:rounded-lg p-3 ${
                requestType == 'comment'
                  ? ' border-b border-accent-600 drop-shadow-md text-accent-600   '
                  : 'text-gray-600'
              } `}
              onClick={() => setRequestType('comment')}>
              {' '}
              ثبت نظرات{' '}
            </button>
            <button
              className={` w-[150px] h-[40px]  text-center flex justify-center items-start hover:drop-shadow-md hover:text-accent-600  font-bold  text-sm hover:bg-gray-300  hover:rounded-lg p-3  ${
                requestType == 'complain'
                  ? ' border-b border-accent-600 drop-shadow-md text-accent-600  '
                  : 'text-gray-600'
              } `}
              onClick={() => setRequestType('complain')}>
              {' '}
              ثبت شکایات{' '}
            </button>
          </div>
          {requestType == 'complain' && (
            <div className="w-[90%] flex flex-col items-center justify-start gap-y-1 ">
              <label htmlFor="title" className="w-full text-start text-xs text-gray-main ">
                موضوع شکایت{' '}
              </label>
              <input
                placeholder="عنوان خود را بنویسید"
                value={data?.title}
                onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full  text-start pr-3 bg-gray-200 shadow-inner  text-sm text-gray-main h-[42px] rounded-lg  placeholder:text-gray-800  placeholder:text-xs   border-none focus:outline-none focus:ring-0 "
              />
            </div>
          )}
          <div className="w-[90%] flex flex-col items-center justify-start gap-y-1 ">
            <label htmlFor="title" className="w-full text-start text-xs text-gray-main ">
              {requestType == 'complain' ? 'متن شکایت ' : 'افزدون نظر'}{' '}
            </label>
            <textarea
              placeholder="متن خود را بنویسید"
              value={data?.text}
              onChange={(e) => setData((prev) => ({ ...prev, text: e.target.value }))}
              className="w-full  resize-y h-[200px] text-start   text-sm text-gray-main bg-gray-200 shadow-inner   rounded-lg  placeholder:text-gray-400 p-4 placeholder:text-xs  border-none focus:outline-none focus:ring-0 "
            />
          </div>
          <div className="w-[90%] flex  lg:justify-between lg:flex-row flex-col items-end gap-y-3  justify-start h-auto  ">
            {/* capcha */}
            <div className="lg:w-[70%] w-[90%] flex justify-between items-end ">
              <div className="w-[48%]  flex flex-col gap-y-1 items-center">
                <label htmlFor="captcha" className="text-xs  text-gray-main w-full text-start ">
                  کد امنیتی
                </label>
                <input
                  name="captcha"
                  inputMode="numeric"
                  className="w-full rounded-lg border-0 bg-gray-200 shadow-inner  h-[42px]  text-sm text-center focus:outline-none focus:border-none focus:ring-0"
                  value={captchaValue}
                  onChange={(e) => handleNumberInput(e, setCaptchaValue)}
                />
              </div>
              <div className="w-[48%]  h-[42px] flex justify-center items-center ">
                {' '}
                <Captcha
                  captcha={captcha}
                  setCaptcha={setCaptcha}
                  enternigStep={changeCaptcha}
                />{' '}
              </div>
            </div>
            {/*  button */}
            {isloading ? (
              <div className="w-[30%] h-[42px] flex justify-center  items-center ">
                {' '}
                <BouncingDotsLoader />
              </div>
            ) : response ? (
              <span
                className={`  text-center text-sm  font-medium  ${
                  response?.status == 'success' ? ' text-green-1000 ' : 'text-red-special '
                }`}>
                {response?.text}
              </span>
            ) : (
              <button
                onClick={SendRequest}
                disabled={!disabled}
                className={`w-[30%] h-[42px] text-white  rounded-md focus:border-none focus:outline-none focus:ring-0 border-none ${
                  !disabled ? '   bg-gray-400  cursor-not-allowed ' : 'bg-green-1000'
                } `}>
                ارسال
              </button>
            )}{' '}
          </div>
        </div>
      ) : (
        <span className="w-full text-center  text-sm  text-gray-main ">
          {' '}
          برای ثبت نظرات و شکایات لطفا وارد شوید{' '}
        </span>
      )}
    </div>
  );
}

export default SendComplainAndComments;
