/* eslint-disable no-unused-vars */
import Axios from 'comon/Axios/Axios';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Gatway({ setStep, data, amount, showName }) {
  const [disable, setDisable] = useState(false);
  const [token, setToken] = useState();
  const [nationalCode, setNationalCode] = useState();
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
      gatewayId: 4,
      returnUrl: `http://shahrcrowd.ir${pathname}${search}`,
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
        console.log('response', paymentRes);

        if (paymentRes) {
          setToken(paymentRes?.token);
          setNationalCode(paymentRes?.encryptedNationalCode);
          setPaymentRes(paymentRes);
          setDisable(false);
        } else {
          setDisable(true);
          setErrorText('خطا! لطفا زمانی دیگر تلاش کنید ');
          console.log('Payment was unsuccessful.', paymentRes);
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

  const handlePayment = () => {
    // if (!accessToken || !selectedFund) return;
    // console.log(' token', token, 'nationalCode', nationalCode);

    // Create the form
    const formElement = document.createElement('form');
    formElement.setAttribute('method', 'post');
    formElement.setAttribute('action', 'https://sepehr.shaparak.ir:8080/Pay');
    // formElement.setAttribute('target', '_blank');

    // TerminalID input
    const terminalInput = document.createElement('input');
    terminalInput.setAttribute('type', 'text');
    terminalInput.setAttribute('name', 'TerminalID');
    terminalInput.setAttribute('value', '99101358');

    // token input
    const tokenInput = document.createElement('input');
    tokenInput.setAttribute('type', 'text');
    tokenInput.setAttribute('name', 'token');
    tokenInput.setAttribute('value', token);

    // nationalCode input
    const nationalCodeInput = document.createElement('input');
    nationalCodeInput.setAttribute('type', 'text');
    nationalCodeInput.setAttribute('name', 'nationalCode');
    nationalCodeInput.setAttribute('value', nationalCode);

    // Append inputs to form
    formElement.appendChild(terminalInput);
    formElement.appendChild(tokenInput);
    formElement.appendChild(nationalCodeInput);
    // formElement.appendChild(nationalCodeInput);

    // Append form to body
    document.body.appendChild(formElement);

    // Submit the form
    formElement.submit();
  };

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-[400px] lg:mt-8b mt-2 gap-y-6">
      <span className=" w-full text-start  text-gray-700  text-sm font-semibold">
        {' '}
        اطلاعات سفارش{' '}
      </span>
      <div className="w-full flex flex-wrap justify-between items-center border border-gray-400 rounded-md px-3 min-h-[42px] h-auto py-2 ">
        <span className=" text-start  text-sm font-medium text-gray-700 ">نام طرح :</span>
        <span className=" text-end  text-sm font-semibold text-gray-700 ">{data?.title} </span>
      </div>
      <div className="w-full flex flex-wrap justify-between items-center border border-gray-400 rounded-md px-3 min-h-[42px] h-auto py-2 ">
        <span
          className={` text-start ${
            calculateClearAmountAsPay()?.status ? 'text-xs ' : ' text-sm'
          } font-medium text-gray-700 `}>
          {' '}
          {calculateClearAmountAsPay()?.text}
        </span>
        <span className=" text-end  text-sm font-semibold text-gray-700 ">
          {calculateClearAmountAsPay()?.data &&
            Number(calculateClearAmountAsPay()?.data).toLocaleString()}{' '}
        </span>
      </div>
      <div className="w-full flex flex-wrap justify-between items-center border border-gray-400 rounded-md px-3 h-[42px]  ">
        <span className=" text-start  text-sm font-medium text-gray-700 ">
          تعداد واحد درخواستی :
        </span>
        <span className=" text-end  font-semibold text-sm  text-gray-700 ">
          {unitCount && Number(unitCount).toLocaleString()}{' '}
        </span>
      </div>
      {/*  buttons */}
      {errorText && <span className=" text-start text-sm text-red-600 ">{errorText}</span>}
      <div className="w-full flex flex-wrap justify-between items-center       pt-16   ">
        {' '}
        <button
          onClick={handlePayment}
          disabled={disable}
          className={`w-[115px] lg:h-[48px] h-[38px] ${!isLoading && 'bg-accent-1000'} ${
            disable && ' opacity-60'
          } text-white text-sm font-medium rounded-md text-center flex justify-center items-center focus:outline-none focus:ring-0 focus:border-none`}>
          {isLoading ? <BouncingDotsLoader /> : 'پرداخت'}
        </button>
        <button
          onClick={() => setStep('paymethod')}
          className={`w-[115px] lg:h-[48px] h-[38px] text-accent-1000  border border-accent-1000 text-sm font-medium rounded-md text-center flex justify-center items-center focus:outline-none focus:ring-0 `}>
          بازگشت{' '}
        </button>
      </div>
    </div>
  );
}

export default Gatway;
