/* eslint-disable no-unused-vars */
import Axios from 'comon/Axios/Axios';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Gatway({ setStep, data, amount, showName }) {
  const [disable, setDisable] = useState(false);
  const [token, setToken] = useState();
  const [paymentRes, setPaymentRes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    amount && CreateInvestorOrder();
  }, [amount]);

  const calculateClearAmountAsPay = () => {
    const res = amount % data?.unitAmount;
    return {
      data: amount - res || 0,
      status: res > 0 ? false : true,
      text:
        res > 0
          ? 'مبلغ سرمایه گذاری :'
          : ' مبلغ سرمایه گذاری اصلاحی ( مبلغ باید مضربی از قیمت هر واحد باشد ):'
    };
  };

  const unitCount = Number(calculateClearAmountAsPay()?.data / data?.unitAmount).toFixed() || 0;
  const { pathname, search } = useLocation();

  console.log(pathname);

  const CreatePayment = async (numberId) =>
    await Axios.post('/Payment/Create', {
      gatewayId: 3,
      returnUrl: `https://crowd.zagrosam.com${pathname}${search}`,
      amount: amount,
      walletFlowId: numberId
    })
      .then((res) => res?.data)
      .catch(() => false);

  // plan_details/1?payId=11
  const CreateInvestorOrder = async () => {
    setIsLoading(true);

    try {
      const res = await Axios.post('/Orders/investor/Create', {
        investmentPlanId: data?.id,
        unitCount: unitCount && Number(unitCount),
        useWalletBalance: false,
        isVisible: showName
      });
      if (res?.data?.walletFlowId) {
        const paymentRes = await CreatePayment(res.data.walletFlowId);

        if (paymentRes) {
          setToken(paymentRes?.token);
          setPaymentRes(paymentRes);
          setDisable(false);
        } else {
          setDisable(true);
          console.log('Payment was unsuccessful.');
        }
      }
    } catch (error) {
      setDisable(true);
      setToken(false);

      if (error.response) {
        setErrorText(error.response.data?.title);
      } else {
        setErrorText('خطا! لطفا زمانی دیگر تلاش کنید ');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    const paymentUrl = paymentRes?.paymentUrl;
    // Create the form
    const formElement = document.createElement('form');
    formElement.setAttribute('method', 'post');
    formElement.setAttribute('action', paymentUrl);

    // Create the second input field for language
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('name', 'language');
    inputElement.setAttribute('value', 'fa');

    // Create the third input field for language
    const inputElement2 = document.createElement('input');
    inputElement2.setAttribute('type', 'hidden');
    inputElement2.setAttribute('name', 'Token');
    inputElement2.setAttribute('value', token);

    // Create the forth unknow
    const inputElement3 = document.createElement('input');
    inputElement3.setAttribute('type', 'text');
    inputElement3.setAttribute('name', 'GetMethod');
    inputElement3.setAttribute('value', '');

    // Append inputs to form
    formElement.appendChild(inputElement);
    formElement.appendChild(inputElement2);
    formElement.appendChild(inputElement3);
    document.body.appendChild(formElement);

    // Submit the form
    formElement.submit();
  };
  return (
    <div className="w-full flex flex-col items-center justify-start min-h-[400px] lg:mt-8b mt-2 gap-y-6">
      <span className=" w-full text-start  text-gray-main  text-sm font-semibold">
        {' '}
        اطلاعات سفارش{' '}
      </span>
      <div className="w-full flex flex-wrap justify-between items-center border border-gray-400 rounded-md px-3 min-h-[42px] h-auto py-2 ">
        <span className=" text-start  text-sm font-medium text-gray-main ">نام طرح :</span>
        <span className=" text-end  text-sm font-semibold text-gray-main ">{data?.title} </span>
      </div>
      <div className="w-full flex flex-wrap justify-between items-center border border-gray-400 rounded-md px-3 min-h-[42px] h-auto py-2 ">
        <span
          className={` text-start ${
            calculateClearAmountAsPay()?.status ? 'text-xs ' : ' text-sm'
          } font-medium text-gray-main `}>
          {' '}
          {calculateClearAmountAsPay()?.text}
        </span>
        <span className=" text-end  text-sm font-semibold text-gray-main ">
          {calculateClearAmountAsPay()?.data &&
            Number(calculateClearAmountAsPay()?.data).toLocaleString()}{' '}
        </span>
      </div>
      <div className="w-full flex flex-wrap justify-between items-center border border-gray-400 rounded-md px-3 h-[42px]  ">
        <span className=" text-start  text-sm font-medium text-gray-main ">
          تعداد واحد درخواستی :
        </span>
        <span className=" text-end  font-semibold text-sm  text-gray-main ">
          {unitCount && Number(unitCount).toLocaleString()}{' '}
        </span>
      </div>
      {/*  buttons */}
      {errorText && <span className=" text-start text-sm text-red-main ">{errorText}</span>}
      <div className="w-full flex flex-wrap justify-between items-center       pt-16   ">
        {' '}
        <button
          onClick={handlePayment}
          disabled={disable}
          className={`w-[115px] lg:h-[48px] h-[38px] ${!isLoading && 'bg-[#C9B777]'} ${
            disable && ' opacity-60'
          } text-white text-sm font-medium rounded-md text-center flex justify-center items-center focus:outline-none focus:ring-0 focus:border-none`}>
          {isLoading ? <BouncingDotsLoader /> : 'پرداخت'}
        </button>
        <button
          onClick={() => setStep('paymethod')}
          className={`w-[115px] lg:h-[48px] h-[38px] text-[#C9B777]  border border-[#C9B777] text-sm font-medium rounded-md text-center flex justify-center items-center focus:outline-none focus:ring-0 `}>
          بازگشت{' '}
        </button>
      </div>
    </div>
  );
}

export default Gatway;
