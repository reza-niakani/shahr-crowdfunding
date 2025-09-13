/* eslint-disable no-unused-vars */
import getBaseUrl from 'comon/Axios/getBaseUrl';
import { truncateDescription } from 'comon/GlobalyTools/UseAbleFunctions';
import React, { useContext } from 'react';
import verify from 'asset/Pictures/Icons/greenVerify.svg';
import InlineSVG from 'react-inlinesvg';
import RingLoaderBar from 'comon/LoaderBar/RingLoader ';
import { Link, useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from 'comon/storage/localStorage';
import DataContext from 'comon/context/MainContext';
import DateFunctions from 'comon/DateFunction/DateFunctions';
import { plansStatusFinder } from 'comon/DB/PlanStatusEnum';
import Tooltip from 'comon/Tooltip/Tooltip';

function PlanCard({ data, innerCard = false, isSlider = false }) {
  const navigate = useNavigate();
  const { setModal } = useContext(DataContext);
  const token = getFromLocalStorage('token');

  console.log(data);

  return (
    <div className="lg:w-[330px] w-[290px] flex flex-col items-center bg-transparent relative min-h-[570px] ">
      {/* image */}
      <div className="w-full flex h-auto items-end justify-start flex-col relative ">
        {' '}
        <img
          className="w-full h-[165px] object-cover rounded-t-[24px]"
          src={getBaseUrl() + '/' + data?.coverImagePaths?.[0]?.value}
          alt="تصویر طرح یافت نشد"
        />{' '}
        {/* <span className="w-auto text-end flex justify-end  text-xs  bg-[#fafafaec]   absolute top-3 right-2 p-2 rounded-lg items-center ">
          {data?.industryGroupTitle}
        </span>{' '} */}
      </div>

      {/* main info */}
      <div
        // onClick={() => navigate(`/plan_detail/${data?.id}`)}
        className="w-full bg-white rounded-t-[24px] py-3 flex flex-col items-center gap-y-3 shadow-dropShadow2 relative top-[-15px] flex-grow">
        <div className="w-[95%] flex items-center justify-between ">
          {' '}
          <span className="text-xs w-auto text-start text-gray-900 font-bold">
            سکوی تامین مالی زاگرس کراد
          </span>
          <span
            style={{ color: plansStatusFinder(data?.state)?.color }}
            className="w-auto text-center flex justify-end  text-xs   rounded-lg items-center ">
            {plansStatusFinder(data?.state)?.name}
          </span>
        </div>
        <div className="w-[90%] flex justify-between items-center">
          {' '}
          <span className="text-xs text-gray-700">نهاد مالی :</span>
          <span className="text-xs text-gray-900 font-bold">سبدگردان زاگرس</span>
        </div>
        <span className="text-sm font-bold w-[90%] text-start text-gray-700">
          {isSlider ? (
            truncateDescription(data?.title, 42)
          ) : (
            <Tooltip text={data?.title}> {truncateDescription(data?.title, 42)}</Tooltip>
          )}{' '}
        </span>
        <div className="w-[90%] flex justify-between items-center">
          {' '}
          <span className="text-xs text-gray-700">متقاضی:</span>
          <span className="text-xs text-gray-900 font-bold">{data?.investeeTitle}</span>
        </div>
        {/* <span className="text-sm font-bold w-[90%] text-start text-gray-700">
          {truncateDescription(data?.title, 42)}
        </span> */}
        <span className="w-[90%] flex justify-start text-xs items-strat gap-x-1">
          <InlineSVG src={verify} className="min-w-[16px] min-h-[16px]" />
          {data?.warranty || 'ضمانت ندارد'}
        </span>

        <div className="w-[90%] flex justify-between items-center">
          {' '}
          <span className="text-xs text-gray-700"> نماد طرح(قابل استعلام )</span>{' '}
          <a
            target="_blank"
            href={data?.ifbUrl}
            className="font-bold  text-xs  text-end underline hover:text-sky-500 "
            rel="noreferrer">
            {data?.symbol}
          </a>
        </div>
        <div className="w-[90%] flex justify-between items-center">
          {' '}
          <span className="text-xs text-gray-700"> نماد طرح(En)</span>{' '}
          <span className="text-xs text-gray-900 font-bold">{data?.symbolEn}</span>{' '}
        </div>

        <div className="w-[90%] flex justify-between items-center">
          <span className="text-xs text-gray-700">مبلغ کل تامین مالی (ريال) :</span>
          <span className="text-sm text-accent-1000 font-black">
            {data?.goal && Number(data?.goal).toLocaleString()}
          </span>
        </div>

        {/* <span className="text-xs w-[90%] text-start text-gray-900 font-bold">نهاد مالی </span> */}
        <div className="text-xs w-[95%] text-start text-gray-900 font-medium  rounded-md ">
          {' '}
          سود پیش‌بینی شده طرح:{' '}
          <span className="text-accent-1000 font-bold">
            {' '}
            {(data?.fixedProvisionalProfit &&
              Number(data?.fixedProvisionalProfit * 100).toFixed()) ||
              'نامشخص'}
            %
          </span>{' '}
        </div>
        <div className="text-xs w-[95%] text-start text-gray-900 font-medium  rounded-md ">
          {' '}
          مواعد پرداخت سود پیش بینی شده :{' '}
          <span className="text-accent-1000 font-bold"> {data?.installmentPeriod}</span> ماه
          یکبار{' '}
        </div>

        <div className="w-[95%] flex  items-center justify-between ">
          <div className="w-[48%] flex-wrap flex justify-between items-center bg-gray-100 drop-shadow-md rounded-md p-2 ">
            <span className="text-xs text-gray-700">نوع طرح:</span>
            <span className="text-xs text-accent-1000 font-bold">
              {data?.floatingPercentage && data?.floatingPercentage < 1
                ? 'شناور %' + Number(data?.floatingPercentage * 100)
                : ' همه یا هیچ'}
            </span>
          </div>
          <div className="w-[48%] flex-wrap flex justify-between items-center drop-shadow-md  bg-gray-100 rounded-md p-2 ">
            <span className="text-[10px] text-gray-700">مهلت سرمایه گذاری:</span>
            <span className="text-xs text-accent-1000 font-bold">
              {' '}
              {data?.underwritingEndDate
                ? `${DateFunctions.GetDateDistance(data?.underwritingEndDate)}روز`
                : 0}
            </span>
          </div>
        </div>
        {/* Stats Section */}
        <div className="w-[95%] flex justify-between gap-x-2 items-center">
          <div className="w-[48%]  flex flex-col items-center gap-y-2">
            <div className="w-full rounded-Radius bg-gray-100 flex flex-col items-center justify-center gap-y-3 h-[75px] drop-shadow-md ">
              <span className="text-center text-xs font-medium text-gray-700">
                پیش بینی سود پروژه (بدون تضمین سود)
              </span>
              <span className="text-center text-xs font-black text-gray-700">
                %{data && Number(data?.annualProfiteRate * 100).toFixed()} سالانه
              </span>
            </div>
            <div className="w-full rounded-Radius bg-gray-100 flex flex-col items-center justify-center gap-y-3 h-[75px] drop-shadow-md ">
              <span className="text-center text-xs font-medium text-gray-700">مدت طرح</span>
              <span className="text-center text-xs font-black text-gray-700">
                {data?.investmentPeriod} ماهه
              </span>
            </div>
          </div>
          <div className="w-[48%]  relative rounded-Radius bg-gray-100 flex flex-col items-center justify-center gap-y-1 h-[160px] drop-shadow-md ">
            <RingLoaderBar goalAmount={data?.goal} raisedAmount={data?.amountRaised} size={70} />
            <span className="text-xs font-medium text-center">تامین شده</span>
            <span className="text-sm font-black text-center text-gray-700">
              {data?.amountRaised && Number(data?.amountRaised).toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-center text-accent-1000">
              {data?.totalInvestors && Number(data?.totalInvestors).toLocaleString()} سرمایه گذار
            </span>
          </div>
        </div>
      </div>

      {/* Buttons: Stay at the Bottom */}
      <div className="w-full flex justify-between items-center mt-[-5px]">
        <Link
          // to={innerCard ? `/investing/plan_details/${data?.id}` : `/plan_detail/${data?.id}`}
          to={`/plan_detail/${data?.id}`}
          className="w-[49%] text-sm font-bold lg:text-base h-[43px] flex justify-center items-center text-center text-accent-1000 bg-white shadow-dropShadow2 rounded-br-[22px]">
          جزئیات طرح
        </Link>
        <button
          onClick={() =>
            token ? setModal({ type: 'buyUnit', data: data }) : navigate(`/login?${data?.id}`)
          }
          className="w-[49%] text-sm font-bold lg:text-base h-[43px] flex justify-center items-center text-center bg-accent-1000 text-white shadow-dropShadow2 rounded-bl-[22px]">
          سرمایه گذاری
        </button>
      </div>
    </div>
  );
}

export default PlanCard;
