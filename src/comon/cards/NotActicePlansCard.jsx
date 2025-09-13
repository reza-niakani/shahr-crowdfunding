import getBaseUrl from 'comon/Axios/getBaseUrl';
import { truncateDescription } from 'comon/GlobalyTools/UseAbleFunctions';
import React from 'react';
import verify from 'asset/Pictures/Icons/greenVerify.svg';
import InlineSVG from 'react-inlinesvg';
import { Link, useNavigate } from 'react-router-dom';
import { plansStatusFinder } from 'comon/DB/PlanStatusEnum';

function NotActicePlansCard({ data }) {
  const navigate = useNavigate();
  return (
    <div className="lg:w-[330px] w-[290px] flex flex-col items-center bg-transparent relative min-h-[450px] h-auto ">
      {/* image */}
      <img
        className="w-full h-[165px] object-cover rounded-t-[24px]"
        src={getBaseUrl() + '/' + data?.coverImagePaths?.[0]?.value}
        alt="تصویر طرح یافت نشد"
      />

      {/* main info */}
      <div
        onClick={() => navigate(`/plan_detail/${data?.id}`)}
        className="w-full bg-white rounded-t-[24px] cursor-pointer h-auto py-3 flex flex-col items-center gap-y-3 shadow-dropShadow2 relative top-[-15px] flex-grow">
        <span className="text-sm font-bold w-[90%] text-start text-gray-main">
          {truncateDescription(data?.title, 50)}
        </span>
        <span className="w-[90%] flex justify-start text-xs items-center gap-x-1">
          <InlineSVG src={verify} />
          {data?.warranty || 'ضمانت ندارد'}
        </span>
        <div className="w-[90%] flex justify-between items-center">
          <span className="text-xs text-gray-main">مبلغ کل تامین مالی (ريال) :</span>
          <span className="text-sm text-accent-600 font-black">
            {data?.goal && Number(data?.goal).toLocaleString()}
          </span>
        </div>

        {/* Stats Section */}
        <div className="w-[90%] flex justify-center gap-x-2 items-center">
          <div className="w-full rounded-Radius bg-gray-100 flex flex-col items-center justify-center gap-y-3 h-[75px]">
            <span className="text-center text-xs font-medium text-gray-main">
              پیش بینی سود پروژه
            </span>
            <span className="text-center text-xs font-black text-gray-main">
              %{data && Number(data?.annualProfiteRate * 100).toFixed()} سالانه
            </span>
          </div>
          <div className="w-full rounded-Radius bg-gray-100 flex flex-col items-center justify-center gap-y-3 h-[75px]">
            <span className="text-center text-xs font-medium text-gray-main">مدت طرح</span>
            <span className="text-center text-xs font-black text-gray-main">
              {data?.investmentPeriod} ماهه
            </span>
          </div>
        </div>
        {/* status */}
        <span
          style={{ backgroundColor: plansStatusFinder(data?.state)?.color }}
          className={`  w-[90%] text h-[26px] text-center text-xs font-extrabold rounded-large flex justify-center items-center  text-white`}>
          {plansStatusFinder(data?.state)?.name}
        </span>
      </div>

      {/* Button: Stay at the Bottom */}
      <Link
        to={`/plan_detail/${data?.id}`}
        className="w-full text-sm font-bold lg:text-base h-[43px] mt-[-5px] flex justify-center items-center text-center text-accent-600 bg-white drop-shadow-md rounded-b-[22px]">
        جزئیات طرح
      </Link>
    </div>
  );
}

export default NotActicePlansCard;
