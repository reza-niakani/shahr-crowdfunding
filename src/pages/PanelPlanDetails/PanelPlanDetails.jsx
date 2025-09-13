import React, { useEffect, useState } from 'react';
import opportunity from 'asset/Pictures/Icons/Opportunity.svg';
import AssetSideDetails from 'comon/GlobalyComponnetsUsed/AssetSideDetails';
import InnerPageStructure from 'comon/pageStructures/InnerPageStructure';
import InlineSVG from 'react-inlinesvg';
import arrow from 'asset/Pictures/Icons/chevronLeftgold.svg';
import { useNavigate, useParams } from 'react-router-dom';
import PlanHeader from './components/PlanHeader';
import Axios from 'comon/Axios/Axios';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import StepHandlerComponent from './components/StepHandlerComponent';

function PanelPlanDetails() {
  const [plandata, setplandata] = useState();
  const [documents, setDocuments] = useState();
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    GetPlanDetails();
    GetDocuments();
  }, [id]);

  const GetPlanDetails = async () => {
    setIsloading(true);
    await Axios.get(`/InvestmentPlans/GetById/${id}`)
      .then((res) => setplandata(res?.data))
      .catch(() => setplandata(false))
      .finally(() => setIsloading(false));
    setIsloading(false);
  };
  const GetDocuments = async () =>
    await Axios.get(`/InvestmentPlans/GetPublicReports/${id}`)
      .then((res) => setDocuments(res?.data))
      .catch(() => setDocuments(false))
      .finally(() => setIsloading(false));

  return (
    <InnerPageStructure>
      <div className="lg:w-full w-full flex flex-col items-center justify-start gap-y-5 ">
        {/*  titile */}
        <div className="lg:w-[90%] px-4 w-full flex lg:gap-x-3 justify-between items-center border border-[#E0E0E0] rounded-[20px] lg:h-[65px] h-[60px] bg-white text-base text-[#009085] ">
          <div className="w-auto flex flex-nowrap items-center justify-start gap-x-3">
            {' '}
            <div
              className={`lg:w-12 w-7 lg:h-12 h-7 flex justify-center items-center rounded-lg drop-shadow-md  bg-white   }`}>
              <InlineSVG src={opportunity} />
            </div>{' '}
            <span> جزئیات اطلاعات طرح </span>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="bg-transparent w-auto flex justify-end items-center gap-x-2 focus:outline-none focus:ring-0 focus:border-none  ">
            بازگشت
            <InlineSVG src={arrow} />
          </button>
        </div>
        {/*  main component  */}
        {isloading ? (
          <BouncingDotsLoader />
        ) : (
          <div className="w-full flex flex-col justify-start items-center lg:gap-y-3 gap-y-28 lg:pb-0 pb-20">
            <PlanHeader data={plandata} />
            {/*  plan details  */}
            <StepHandlerComponent data={plandata} id={id} documents={documents} />
          </div>
        )}
      </div>

      {/*  asster sidebar  */}
      <div className=" min-w-[280px] w-auto hidden lg:flex flex-col items-center justify-start gap-y-2 ">
        <AssetSideDetails />
      </div>
    </InnerPageStructure>
  );
}

export default PanelPlanDetails;
