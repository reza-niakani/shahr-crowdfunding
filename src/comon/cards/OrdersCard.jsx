import getBaseUrl from 'comon/Axios/getBaseUrl';
import { plansStatusFinder } from 'comon/DB/PlanStatusEnum';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import { truncateDescription } from 'comon/GlobalyTools/UseAbleFunctions';
import ProgressBar from 'comon/LoaderBar/ProgressBar';
import React from 'react';
import { Link } from 'react-router-dom';

function OrdersCard({ data, companyReport = false }) {
  const isMobile = useDeviceDetection();
  const img = companyReport
    ? data?.coverImagePaths?.[0]?.value
    : data?.investment?.coverImagePaths?.[0];

  const state = companyReport ? data?.state : data?.investment?.state;
  const title = companyReport ? data?.title : data?.investment?.title;
  const id = companyReport ? data?.id : data?.investment?.id;
  const percentageRaised = companyReport
    ? data?.percentageRaised * 100 > 0
      ? Number(data?.percentageRaised * 100).toFixed(2)
      : 0
    : data?.investment?.percentageRaised * 100
      ? Number(data?.investment?.percentageRaised * 100).toFixed(2)
      : 0;

  console.log(data);

  return (
    <div className="lg:w-[90%] w-full flex lg:flex-row md:flex-row  flex-col gap-0 lg:h-[175px] h-[195px] relative">
      {/* Image Container */}
      <div className="absolute h-full w-[98%]  md:w-[150px] lg:w-[150px] lg:top-0 lg:right-0 md:rigth-0 md:top-0 -top-10 right-1 lg:relative">
        <img
          className={`h-full w-full object-cover ${
            isMobile ? 'rounded-t-[24px]  md:rounded-r-[24px]' : 'rounded-r-[24px]'
          }`}
          src={getBaseUrl() + '/' + img}
          alt="تصویر طرح یافت نشد"
        />
      </div>

      {/* Info Part */}
      <div className="lg:w-[calc(100%_-_150px)] w-full flex items-center rounded-[20px] h-full">
        <div
          className={` w-[90%] absolute lg:left-10 md:left-10 left-9 border border-[#E0E0E0] bg-white flex flex-col justify-center ${
            companyReport ? ' gap-y-2' : ' gap-y-5'
          } items-center h-full rounded-[24px] z-[1] p-3`}>
          {/* Title */}
          <div className="w-full flex justify-between items-center">
            <span className="lg:text-sm text-xs  font-bold text-start truncate w-[70%]">
              {truncateDescription(title, isMobile ? 40 : 70)}
            </span>
            <Link
              to={`/investing/plan_details/${id}`}
              className="lg:text-sm text-xs  font-bold text-accent-600">
              جزئیات طرح
            </Link>
          </div>

          {/* investment Amount */}
          {companyReport ? (
            <div className="w-full flex justify-between text-gray-main">
              <span className="lg:text-sm text-xs ">مبلغ هدف :</span>
              <span className="lg:text-sm text-xs font-bold w-auto">
                {data?.goal && Number(data?.goal).toLocaleString()}
              </span>
            </div>
          ) : (
            <div className="w-full flex justify-between text-gray-main">
              <span className="lg:text-sm text-xs ">مبلغ سرمایه گذاری شما :</span>
              <span className="lg:text-sm text-xs font-bold w-auto">
                {data?.totalInvest && Number(data?.totalInvest).toLocaleString()}
              </span>
            </div>
          )}

          {/* Predicted Profit */}
          {companyReport ? (
            <div className="w-full flex justify-between text-gray-main">
              <span className="lg:text-sm text-xs ">سود کل تعیین شده :</span>
              <span className="lg:text-sm text-xs  font-bold">
                %{(data?.totalProfitRate && Number(data?.totalProfitRate * 100).toFixed()) || '-'}
              </span>
            </div>
          ) : (
            <div className="w-full flex justify-between text-gray-main">
              <span className="lg:text-sm text-xs ">مبلغ ســود پیش‌بینی شده :</span>
              <span className="lg:text-sm text-xs  font-bold">
                {data?.totalRefund && Number(data?.totalRefund).toLocaleString()}
              </span>
            </div>
          )}
          {/*  */}
          {companyReport && (
            <div className="w-full flex justify-between text-gray-main">
              <span className="lg:text-sm text-xs ">تعداد سرمایه‌گذاران :</span>
              <span className="lg:text-sm text-xs  font-bold">
                {data?.totalInvestors && Number(data?.totalInvestors).toLocaleString()}
              </span>
            </div>
          )}
          {/* Plan Status */}
          <div className="w-full flex justify-between items-center text-gray-main">
            <span className="lg:text-sm text-xs ">وضعیت تامین مالی :</span>
            <div dir="ltr" className="flex w-[40%] items-center gap-x-2 flex-grow justify-start">
              <span className="text-sm font-bold">{percentageRaised}%</span>
              <ProgressBar percent={percentageRaised} />
            </div>
          </div>
        </div>

        {/* Status Label */}
        <div
          className="w-[100px] h-full flex justify-start items-center rounded-l-[20px] absolute top-0 left-0 z-[0]"
          style={{ backgroundColor: plansStatusFinder(state)?.color }}>
          <span className="text-xs  font-medium text-white -rotate-90 w-full text-center lg:h-[70px] md:h-[75px] h-[80px] text-nowrap flex justify-center items-start">
            {plansStatusFinder(state)?.name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrdersCard;
