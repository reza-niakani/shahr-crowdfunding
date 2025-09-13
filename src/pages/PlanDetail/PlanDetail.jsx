/* eslint-disable no-unused-vars */
import Axios from 'comon/Axios/Axios';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FixedGlobalyDetailsBlock from './components/FixedGlobalyDetailsBlock';
import PlanRelatedDetails from './components/PlanRelatedDetails';
import chevronLeftgreen from 'asset/Pictures/Icons/chevronLeftgreen.svg';
import InlineSVG from 'react-inlinesvg';
import OtherPlansSlider from './components/OtherPlansSlider';
import { formatIranianMobile, handleNumberInput } from 'comon/GlobalyTools/UseAbleFunctions';
import { getFromLocalStorage } from 'comon/storage/localStorage';
import DateFunctions from 'comon/DateFunction/DateFunctions';

function PlanDetail() {
  const [isloading, setIsloading] = useState(false);
  const [isloadingConsulting, setIsloadingConsulting] = useState();
  const [fullName, setFullName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [response, setResponse] = useState();
  const [mainData, setMainData] = useState({
    plandata: false,
    companyInfo: false,
    comments: false,
    documents: false,
    Investors: false
  });

  const token = getFromLocalStorage('token');
  const { id } = useParams();

  useEffect(() => {
    GetPlanDetails();
    GetCompanyInfo();
    token && GetDocuments();
    GetAllInvestor();
    GetAllComments();
    PlanAssessments();
  }, [id]);

  const GetPlanDetails = async () => {
    setIsloading(true);
    await Axios.get(`/InvestmentPlans/GetById/${id}`)
      .then((res) => setMainData((prev) => ({ ...prev, plandata: res?.data })))
      .catch((re) => setMainData((prev) => ({ ...prev, plandata: false })));
    setIsloading(false);
  };

  const GetCompanyInfo = async () =>
    await Axios.get(`/InvestmentPlans/GetInvesteeDetails/${id}`)
      .then((res) => setMainData((prev) => ({ ...prev, companyInfo: res?.data })))
      .catch((re) => setMainData((prev) => ({ ...prev, companyInfo: false })));

  const PlanAssessments = async () =>
    await Axios.post('/PlanAssessments/GetByPlanId', {
      planId: id
    })
      .then((res) => setMainData((prev) => ({ ...prev, PlanAssessments: res?.data })))
      .catch((re) => setMainData((prev) => ({ ...prev, PlanAssessments: false })));

  const GetDocuments = async () =>
    await Axios.get(`/InvestmentPlans/GetPublicReports/${id}`)
      .then((res) => setMainData((prev) => ({ ...prev, documents: res?.data })))
      .catch((re) => setMainData((prev) => ({ ...prev, documents: false })));

  const GetAllInvestor = async () =>
    await Axios.get(`/InvestmentPlans/Investors/${id}`)
      .then((res) => setMainData((prev) => ({ ...prev, Investors: res?.data })))
      .catch((re) => setMainData((prev) => ({ ...prev, Investors: false })));

  const GetAllComments = async () =>
    await Axios.post('/Comments/GetAll', {
      investmentPlanId: id && Number(id),
      // commentState: id && Number(id),
      pagination: {
        take: 100,
        skip: 0
      }
    })
      .then((res) => setMainData((prev) => ({ ...prev, comments: res?.data })))
      .catch((re) => setMainData((prev) => ({ ...prev, comments: false })));

  const CreateConsultingRequest = async (e) => {
    e.preventDefault();
    setIsloadingConsulting(true);
    await Axios.post('/Consultation/Create', {
      fullName: fullName,
      phoneNumber: formatIranianMobile(phoneNumber),
      approximateAmount: 1,
      date: DateFunctions.getFormattedTodayDate(),
      timeRange: 1
    })
      .then((res) => {
        setResponse({ text: 'ثبت شد ', color: ' text-accent-1000 ' });
      })
      .catch(() => setResponse({ text: '   خطا ! ثبت ناموفق ', color: ' text-red-600' }))
      .finally(() => {
        setIsloadingConsulting(false);

        setTimeout(() => {
          setResponse();
          setFullName('');
          setPhoneNumber('');
        }, 2000);
      });
  };
  return (
    <div
      className={`w-screen flex flex-col lg:pb-28 pb-24 justify-center  items-center h-full py-[8rem] `}>
      {isloading ? (
        <BouncingDotsLoader />
      ) : mainData?.plandata ? (
        <div className="w-full h-auto flex flex-col justify-start items-center gap-y-16">
          {' '}
          <div className="lg:w-[85%] w-[95%] flex lg:flex-row flex-col justify-between items-start  ">
            {/* fixed block */}
            <FixedGlobalyDetailsBlock mainData={mainData} token={token} />
            {/* detail part  */}
            <PlanRelatedDetails mainData={mainData} id={id} />
          </div>
          {/* other plans slider  */}
          {/* <div className="lg:w-[80%] w-[95%] flex  flex-col  justify-start items-center lg:border-t border-gray-100 ">
            <div className="w-full flex justify-between items-center ">
              <span className="lg:text-xl text-base font-black text-start">سایر طرح ها</span>
              <Link
                to="/all_plans"
                className="flex justify-end items-center lg:gap-x-2 lg:text-base text-xs font-black text-accent-1000">
                مشاهده همه <InlineSVG src={chevronLeftgreen} />
              </Link>
            </div>
            <OtherPlansSlider />
          </div> */}
          {/* consulting request */}
          <div className="lg:w-[70%] w-[95%] flex flex-col justify-start lg:gap-y-10 gap-y-7 items-center text-gray-700 ">
            <span className="lg:text-lg text-sm text-center w-full ">
              نیاز به راهنمایی بیشتر دارید؟
            </span>
            <span className="lg:text-lg text-sm text-center font-extrabold w-[90%] ">
              کافی است اطلاعات خود را وارد کنید تا کارشناسان ما با شما تماس بگیرند.{' '}
            </span>
            {/* input field */}
            <form
              onSubmit={CreateConsultingRequest}
              className="w-full flex flex-nowrap lg:flex-row flex-col justify-between h-auto items-center  gap-y-7  shadow-dropShadow2 rounded-large p-5">
              <div className="lg:w-[70%] w-full   flex  justify-start items-center lg:flex-row flex-col gap-3 ">
                {' '}
                <input
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  placeholder="نام‌ونام‌خانوادگی"
                  className="w-[95%] lg:w-[48%] flex justify-start  text-sm text-gray-700 pr-4 text-start placeholder:text-gray-400 focus:outline-none focus:ring-0 border border-accent-1000 rounded-large h-[42px] focus:border-accent-1000"
                />
                <input
                  type="text"
                  onChange={(e) => handleNumberInput(e, setPhoneNumber)}
                  value={phoneNumber}
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="شماره همراه  (** ** *** **۰۹)"
                  className="w-[95%] lg:w-[48%] flex justify-start  text-sm text-gray-700 pr-4 text-start placeholder:text-gray-400 focus:outline-none focus:ring-0 border border-accent-1000 rounded-large h-[42px] focus:border-accent-1000"
                />
              </div>
              {/* <div className="lg:w-auto w-[90%] justify-between items-center gap-x-5 flex">
                <span className="lg:text-lg text-sm font-medium">کد بورسی دارم</span>
                <div className="w-auto flex items-center justify-start gap-x-2">
                  <label htmlFor="yes" className="w-auto flex items-center justify-start gap-x-2">
                    بله
                  </label>
                  <input
                    checked={borseCode}
                    type="checkbox"
                    onClick={() => setBorseCode(!borseCode)}
                    className={`focus:outline-none focus:ring-0 text-accent-1000 lg:rounded-lg rounded-md lg:w-6 w-4 lg:h-6 h-4 border border-gray-700
                    `}
                  />
                </div>
                <div className="w-auto flex items-center justify-start gap-x-2">
                  <label htmlFor="yes" className="w-auto flex items-center justify-start gap-x-2">
                    خیر
                  </label>
                  <input
                    checked={!borseCode}
                    type="checkbox"
                    onClick={() => setBorseCode(!borseCode)}
                    className={`focus:outline-none focus:ring-0 text-accent-1000 lg:rounded-lg rounded-md lg:w-6 w-4 lg:h-6 h-4 border border-gray-700
                    `}
                  />
                </div>
              </div> */}
              {response && (
                <span className={`${response?.color}  text-base  text-start font-medium `}>
                  {response?.text}
                </span>
              )}
              {isloadingConsulting ? (
                <BouncingDotsLoader />
              ) : (
                <button
                  type="submit"
                  disabled={!phoneNumber && !fullName}
                  className={`w-[95%] lg:w-[15%] h-[42px] bg-accent-1000 rounded-md focus:outline-none focus:border-0 focus:ring-0 flex justify-center items-center text-sm font-medium text-white  ${
                    !phoneNumber && 'opacity-60'
                  }`}>
                  ثبت اطلاعات
                </button>
              )}
            </form>
          </div>
        </div>
      ) : (
        <span className="w-full flex justify-center items-center text-base font-extrabold text-center h-full mt-10">
          خطا! مشکلی در دریافت اطلاعات رخ داده زمانی دیگر تلاش کنید
        </span>
      )}
    </div>
  );
}

export default PlanDetail;
