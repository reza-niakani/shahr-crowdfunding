import Axios from 'comon/Axios/Axios';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import React, { useState } from 'react';
import { useEffect } from 'react';
import verify from 'asset/Pictures/Icons/verify.svg';
import InlineSVG from 'react-inlinesvg';
import getBaseUrl from 'comon/Axios/getBaseUrl';

function Evaluations({ id, warranty, EvaluationsDocs }) {
  const [companyData, setCompanyData] = useState();
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    GetCompanyInfo();
  }, []);

  const GetCompanyInfo = async () => {
    setIsloading(true);
    await Axios.get(`/InvestmentPlans/GetInvesteeDetails/${id}`)
      .then((res) => setCompanyData(res?.data))
      .catch(() => setCompanyData(false))
      .finally(() => setIsloading(false));
  };

  console.log('company', companyData);

  return (
    <div className="lg:w-[98%] w-full flex flex-col items-center justify-start gap-y-4">
      {isloading ? (
        <BouncingDotsLoader />
      ) : companyData ? (
        <>
          {' '}
          <span className="text-[#383C41] text-start w-full font-bold text-base ">
            اطلاعات سرمایه پذیر
          </span>
          <div className="w-full flex flex-col items-center justify-start gap-y-2 ">
            {/* national code */}
            <div className="w-full flex justify-between border-b border-[#CCCCCC] items-center py-3">
              <span className="text-sm text-[#707070] text-start">شماره ملی :</span>
              <span className="text-sm text-[#333333] text-start">{companyData?.username}</span>
            </div>
            {/* board member */}
            <div className="w-full flex justify-between border-b border-[#CCCCCC] items-center py-3">
              <span className="text-sm text-[#707070] text-start">اعضای هیئت مدیره :</span>
              <span className="text-sm text-[#333333] text-start">
                {companyData?.stakeholders?.length}نفر
              </span>
            </div>
            {/*warranty */}
            <div className="w-full flex justify-between  items-center py-3">
              <span className="text-sm text-[#707070] text-start">نوع ضمانت :</span>
              <span className="text-sm text-[#333333] text-start">{warranty || 'ضمانت ندارد'}</span>
            </div>
          </div>
          <span className="text-[#383C41] text-start w-full font-bold text-base ">
            ارزیابی سرمایه پذیر{' '}
          </span>
          <div className="w-full flex flex-col items-center justify-start gap-y-2 ">
            {/* national code */}
            {EvaluationsDocs?.length > 0 ? (
              EvaluationsDocs?.map((item, index) => (
                <div
                  key={index}
                  className={`w-full flex justify-between ${
                    index < EvaluationsDocs?.length - 1 ? 'border-b ' : ''
                  } border-[#CCCCCC] items-center py-3`}>
                  <span className="text-sm text-[#707070] text-start flex items-center gap-x-2 justify-start flex-nowrap">
                    <InlineSVG src={verify} />
                    {item?.description}
                  </span>
                  <a
                    rel="noreferrer"
                    type="download"
                    target="_blank"
                    href={getBaseUrl() + '/' + item?.path}
                    className=" lg:text-sm text-xs  font-bold text-end underline hover:text-green-1100 text-[#009085]  flex cursor-pointer justify-center items-center ">
                    دانلود
                    {/* <InlineSVG src={download} /> */}
                  </a>{' '}
                </div>
              ))
            ) : (
              <span className="w-[50%] text-center text-sm font-bold text-[#009085] bg-[#01B69B08]   border border-[#009085] rounded-large h-[42px]  flex items-center justify-center">
                ارزیابی قرار داده نشده است !
              </span>
            )}
          </div>
        </>
      ) : (
        <span className="w-[50%] text-center text-sm font-bold text-[#009085] bg-[#01B69B08]   border border-[#009085] rounded-large h-[42px]  flex items-center justify-center">
          !اطلاعاتی یافت نشد
        </span>
      )}
    </div>
  );
}

export default Evaluations;
