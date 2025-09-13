import getBaseUrl from 'comon/Axios/getBaseUrl';
import { truncateDescription } from 'comon/GlobalyTools/UseAbleFunctions';
import React, { useContext } from 'react';
import verify from 'asset/Pictures/Icons/greenVerify.svg';
import InlineSVG from 'react-inlinesvg';
import DateDistancerCounter from 'comon/DateComponents/DateDistancerCounter';
import { Link, useNavigate } from 'react-router-dom';
import DataContext from 'comon/context/MainContext';

function InvestinDashBoardCard({ data }) {
  const { setModal } = useContext(DataContext);
  const navigate = useNavigate();

  return (
    <div className="lg:w-[330px] w-[290px] flex flex-col items-center bg-transparent relative min-h-[440px] ">
      {/* image */}
      <img
        className="w-full h-[150px] object-cover rounded-t-[24px]"
        src={getBaseUrl() + '/' + data?.coverImagePaths?.[0]?.value}
        alt="تصویر طرح یافت نشد"
      />

      {/* main info */}
      <div
        onClick={() => navigate(`/plan_detail/${data?.id}`)}
        className="w-full bg-white rounded-t-[24px] py-3 flex flex-col justify-between items-center gap-y-3 shadow-dropShadow2 relative top-[-15px] flex-grow min-h-[200px] h-auto">
        <span className="text-sm font-bold w-[90%] text-start text-gray-main">
          {truncateDescription(data?.title, 70)}
        </span>
        <span className="w-[90%] flex justify-start text-xs items-center gap-x-1">
          <InlineSVG src={verify} />
          {data?.warranty || 'ضمانت ندارد'}
        </span>
        <div className="w-[90%]  flex-col flex justify-strta items-start gap-y-1">
          <span className="text-xs text-gray-main">مبلغ کل تامین مالی (ريال) :</span>
          <span className="text-sm text-accent-600 font-black">
            {data?.goal && Number(data?.goal).toLocaleString()}
          </span>
        </div>

        <span className="w-[90%] bg-gray-100 text-center text-gray-main text-xs font-semibold rounded-Radius h-[30px] flex justify-center items-center">
          زمان باقی مانده
        </span>
        <div className="w-[90%] flex justify-center text-sm min-h-[50px] items-center">
          {data?.endDate ? <DateDistancerCounter date={data?.endDate} /> : 'تاریخ پایان نامشخص'}
        </div>
      </div>

      {/* Buttons: Stay at the Bottom */}
      <div className="w-full flex justify-between items-center mt-[-5px]">
        <Link
          to={`/plan_detail/${data?.id}`}
          className="w-[49%] text-sm font-bold lg:text-base h-[43px] flex justify-center items-center text-center text-accent-600 bg-white  drop-shadow-md rounded-br-[22px]">
          جزئیات طرح
        </Link>
        <button
          onClick={() => setModal({ type: 'buyUnit', data: data })}
          className="w-[49%] text-sm font-bold lg:text-base h-[43px] flex justify-center items-center text-center bg-accent-600 text-white  drop-shadow-md rounded-bl-[22px]">
          سرمایه گذاری
        </button>
      </div>
    </div>
  );
}

export default InvestinDashBoardCard;
