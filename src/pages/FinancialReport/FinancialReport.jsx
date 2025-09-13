/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import InnerPageStructure from 'comon/pageStructures/InnerPageStructure';
import InlineSVG from 'react-inlinesvg';
import opportunity from 'asset/Pictures/Icons/Opportunity.svg';
import Axios from 'comon/Axios/Axios';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import DesktopTabel from './components/DesktopTabel';
import MobileViewTabel from './components/MobileViewTabel';
import PaginationComponet from 'comon/pagination/PaginationComponent';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import { FinancialEnum } from 'comon/DB/FinancialEnum';

function FinancialReport() {
  const [transactions, setTransactions] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [allPlans, setAllPlans] = useState([]);
  const [operationTypes, setOperationTypes] = useState();
  const [planName, setPlanName] = useState();
  const [isloading, setIsloading] = useState(false);
  const isMobile = useDeviceDetection();

  useEffect(() => {
    GetWalletFlows();
    GetAllTinyPlans();
  }, []);

  const GetAllTinyPlans = async () =>
    await Axios.post('/InvestmentPlans/GetAllTiny', {
      states: []
    })
      .then((res) => {
        const InFormArray = res?.data?.map((item) => ({
          name: item?.title,
          key: item?.id
        }));
        setAllPlans(InFormArray);
      })
      .catch(() => setAllPlans([]));

  const GetWalletFlows = async () => {
    setIsloading(true);
    await Axios.post('/Wallet/GetWalletFlows', {
      //   userId: 'string',
      //   status: 1,
      operationTypes: operationTypes?.key ? [operationTypes?.key] : [],
      planId: planName?.key,
      pagination: {
        take: isMobile ? 5 : 10,
        skip: currentPage > 1 ? ((currentPage - 1) * isMobile ? 5 : 10) : 0
      }
    })
      .then((res) => setTransactions(res))
      .catch(() => false)
      .finally(() => {
        setIsloading(false);
      });
  };

  useMemo(() => {
    GetWalletFlows();
    setCurrentPage(1);
  }, [planName, operationTypes]);

  useMemo(() => {
    GetWalletFlows();
  }, [currentPage]);

  return (
    <InnerPageStructure>
      <div className=" w-full flex flex-col items-center justify-start gap-y-5 ">
        {/*  titile */}
        <div className="px-4 lg:w-[95%] w-full flex gap-x-3 justify-start items-center border border-[#E0E0E0] rounded-[20px] lg:h-[65px] h-[60px] bg-white text-base text-gray-700  ">
          {' '}
          <div
            className={`lg:w-12 w-7 lg:h-12 h-7 flex justify-center items-center rounded-lg drop-shadow-md  bg-white   }`}>
            <InlineSVG src={opportunity} />
          </div>{' '}
          <span> گزارش مالی </span>
        </div>
        {/*  table  */}
        <div className="lg:w-[95%] w-full flex flex-col justify-start items-center mt-5">
          {isloading ? (
            <BouncingDotsLoader />
          ) : (
            <>
              <div className="lg:block w-full  md:block hidden">
                <DesktopTabel
                  data={transactions}
                  allPlans={allPlans}
                  operationTypes={operationTypes}
                  setOperationTypes={setOperationTypes}
                  setPlanName={setPlanName}
                  planName={planName}
                  FinancialEnum={FinancialEnum}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
              <div className="lg:hidden w-full  md:hidden block">
                <MobileViewTabel
                  data={transactions}
                  allPlans={allPlans}
                  operationTypes={operationTypes}
                  setOperationTypes={setOperationTypes}
                  setPlanName={setPlanName}
                  planName={planName}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  FinancialEnum={FinancialEnum}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </InnerPageStructure>
  );
}

export default FinancialReport;
