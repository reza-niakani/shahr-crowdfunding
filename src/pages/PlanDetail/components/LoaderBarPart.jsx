import DataContext from 'comon/context/MainContext';
import DateFunctions from 'comon/DateFunction/DateFunctions';
import { plansStatusFinder } from 'comon/DB/PlanStatusEnum';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import SemiCircleLoaderBar from 'comon/LoaderBar/SemicircleLoader';
import { getFromLocalStorage } from 'comon/storage/localStorage';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function LoaderBarPart({ mainData }) {
  const isMobile = useDeviceDetection();
  const navigate = useNavigate();
  const { setModal } = useContext(DataContext);
  const token = getFromLocalStorage('token');

  const TextForValidatePlanForInvesting = () => {
    if (mainData?.plandata?.state !== 7) {
      return (
        <span className=" w-full flex justify-center text-center text-orange-400   border-orange-400  items-center shadow-dropShadow2 border  h-[42px] lg:h-[46px] rounded-b-[34px] font-bold lg:text-base text-sm ">
          طرح دروضعیت سرمایه گذاری نمی باشد{' '}
        </span>
      );
    } else if (mainData?.plandata?.unitAvailable <= 0) {
      return (
        <span className=" w-full flex justify-center text-center text-yellow-400  border-yellow-400  items-center shadow-dropShadow2 border  h-[42px] lg:h-[46px] rounded-b-[34px] font-bold lg:text-base text-sm ">
          واحدهای سرمایه گذاری طرح به اتمام رسیده
        </span>
      );
    } else if (
      DateFunctions.calculateDateDifference(mainData?.plandata?.underwritingEndDate) <= 0
    ) {
      return (
        <span className=" w-full flex justify-center text-center text-purple-500  border-purple-500  items-center shadow-dropShadow2 border  h-[42px] lg:h-[46px] rounded-b-[34px] font-bold lg:text-base text-sm ">
          مدت زمان سرمایه گذاری به اتمام رسیده است
        </span>
      );
    } else return null;
  };

  return (
    <div className="w-full flex flex-col gap-y-2 items-center justify-start h-auto  ">
      <div className="w-full h-auto flex flex-col items-center justify-between gap-y-5  shadow-dropShadow2 py-5  lg:rounded-t-[24px] rounded-b-md rounded-large text-gray-700 ">
        {/* status */}
        <div className="w-[90%] flex justify-between border-b border-[#F3F3F3] items-center h-auto font-bold text-xs lg:text-sm py-5">
          <span className="w-auto flex justify-start items-center text-start text-gray-700   ">
            وضعیت طرح
          </span>
          <span
            style={{ color: plansStatusFinder(mainData?.plandata?.state)?.color }}
            className="w-auto text-end flex justify-end items-center ">
            {plansStatusFinder(mainData?.plandata?.state)?.name}
          </span>
        </div>
        {/* loader bar  */}
        <div className="w-[90%] flex flex-col  justify-center items-center h-auto gap-y-2">
          {' '}
          <SemiCircleLoaderBar
            minRequiredTotalValue={mainData?.plandata?.minRequiredTotalValue}
            goalAmount={mainData?.plandata?.goal}
            raisedAmount={mainData?.plandata?.amountRaised}
            size={isMobile ? 250 : 400}
            isMobile={isMobile}
          />
        </div>
        {/* boxes */}
        <div className="w-[90%] flex   justify-between items-center h-auto gap-y-2  ">
          <div className="w-[45%] bg-gray-100 flex flex-col items-center justify-center gap-y-5 rounded-large h-full lg:min-h-[110px] min-h-[75px]  ">
            <span className=" text-center text-base font-medium">مبلغ جمع آوری شده</span>
            <span className="text-accent-1000 text-center font-extrabold lg:text-xl text-sm   ">
              {mainData?.plandata?.amountRaised &&
                Number(mainData?.plandata?.amountRaised).toLocaleString()}{' '}
              <span className="text-sm font-bold pr-1">(ریال)</span>
            </span>
          </div>{' '}
          <div className="w-[45%] bg-gray-100 flex flex-col items-center justify-center gap-y-5 rounded-large h-full  lg:min-h-[110px] min-h-[75px] ">
            <span className=" text-center text-base font-medium">سرمایه مورد نیاز</span>
            <span className="text-accent-1000 text-center font-extrabold lg:text-xl text-sm   ">
              {mainData?.plandata?.goal && Number(mainData?.plandata?.goal).toLocaleString()}
              <span className="text-sm font-bold pr-1">(ریال)</span>
            </span>
          </div>{' '}
        </div>
      </div>
      {/* button */}
      {TextForValidatePlanForInvesting() ? (
        TextForValidatePlanForInvesting()
      ) : (
        <button
          onClick={() =>
            token
              ? setModal({ type: 'buyUnit', data: mainData?.plandata, file: mainData?.documents })
              : navigate(`/login?${mainData?.plandata?.id}`)
          }
          className="w-full flex justify-center items-center text-center  text-white shadow-dropShadow2  h-[42px] lg:h-[46px] rounded-b-[34px] bg-accent-1000 font-bold lg:text-base text-sm ">
          {token ? ' سرمایه گذاری' : 'برای سرمایه گذاری وارد شوید'}
        </button>
      )}
    </div>
  );
}

export default LoaderBarPart;
