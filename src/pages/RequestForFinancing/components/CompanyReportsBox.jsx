import React, { useContext, useEffect, useMemo, useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import opportunity from 'asset/Pictures/Icons/Opportunity.svg';
import folder from 'asset/Pictures/Icons/folder.svg';
import Axios from 'comon/Axios/Axios';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import PaginationComponet from 'comon/pagination/PaginationComponent';
import ReportNotExis from 'asset/Pictures/Images/ReportsDoesNotExist.svg';
import FinancalReportNotExis from 'asset/Pictures/Images/financialReportDosenotexist.svg';
import OrdersCard from 'comon/cards/OrdersCard';
import ReportsCard from 'comon/cards/ReportsCard';
import DataContext from 'comon/context/MainContext';

function CompanyReportsBox() {
  const { modal } = useContext(DataContext);
  const [step, setStep] = useState('plan');
  const [relatedPlan, setRelatedPlan] = useState();
  const [allFinancialStatements, setAllFinancialStatements] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    !modal && step == 'plan' && GetAllRealtedPlans();
    !modal && step == 'reports' && GetAllFinancialStatements();
  }, [currentPage, step, modal]);

  useMemo(() => {
    setTotal();
  }, [step]);

  const GetAllRealtedPlans = async () => {
    setIsloading(true);
    await Axios.post('/InvesteePlans/GetAllByInvesteeId', {
      pagination: {
        take: 4,
        skip: currentPage > 1 ? (currentPage - 1) * 4 : 0
      }
    })
      .then((res) => {
        setRelatedPlan(res?.data);
        setTotal(res?.pagination?.total);
      })
      .catch(() => {
        setRelatedPlan(false);
        setTotal(0);
      })
      .finally(() => setIsloading(false));
  };

  const GetAllFinancialStatements = async () => {
    setIsloading(true);
    await Axios.post('/FinancialStatements/GetAll', {
      type: 6,
      pagination: {
        take: 5,
        skip: currentPage > 1 ? (currentPage - 1) * 5 : 0
      }
    })
      .then((res) => {
        setAllFinancialStatements(res?.data);
        setTotal(res?.pagination?.total);
      })
      .catch(() => {
        setAllFinancialStatements(false);
        setTotal(0);
      })
      .finally(() => setIsloading(false));
  };

  const ComponentHandler = () => {
    switch (step) {
      case 'plan':
        return (
          <div className="lg:w-full w-[90%] lg:pt-0 pt-20 flex flex-col lg:gap-y-10 gap-y-16  items-center justify-start ">
            {isloading ? (
              <BouncingDotsLoader />
            ) : relatedPlan?.length > 0 ? (
              relatedPlan?.map((item, index) => (
                <OrdersCard data={item} key={index} companyReport={true} />
              ))
            ) : (
              <InlineSVG src={ReportNotExis} />
            )}
          </div>
        );
      case 'reports':
        return (
          <div className="w-[90%] flex flex-col items-center justify-start gap-y-3">
            {isloading ? (
              <BouncingDotsLoader />
            ) : allFinancialStatements?.length > 0 ? (
              allFinancialStatements?.map((item, index) => <ReportsCard data={item} key={index} />)
            ) : (
              <InlineSVG src={FinancalReportNotExis} />
            )}
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className="lg:w-[95%] w-full  border border-[#E0E0E0] rounded-[20px] flex flex-col justify-start items-center gap-y-5   bg-white pb-10  ">
      {/*   step handler */}
      <div className=" w-full flex lg:gap-x-3  gap-x-5 justify-center items-center border border-[#E0E0E0] rounded-[20px] lg:h-[65px] h-[60px] bg-white ">
        {/*  */}
        <button
          onClick={() => setStep('plan')}
          className={`min-w-[130px] lg:min-w-[300px] h-[43px] focus:outline-none focus:ring-0 focus:border-none rounded-lg  ${
            step == 'plan'
              ? 'bg-[#F0FAFB] drop-shadow-md lg:text-sm text-[10px] '
              : 'text-xs lg:text-base'
          } flex items-center justify-start lg:gap-x-2 gap-x-1 lg:p-2 p-1 font-medium `}>
          <div
            className={`lg:w-12 w-7 lg:h-12 h-7 flex justify-center items-center ${
              step !== 'plan' && '  rounded-lg drop-shadow-md  bg-white   '
            }`}>
            <InlineSVG src={opportunity} />
          </div>{' '}
          طرح های تامین مالی{' '}
        </button>
        {/*  */}
        <button
          onClick={() => setStep('reports')}
          className={`min-w-[130px] lg:min-w-[250px] h-[43px] focus:outline-none focus:ring-0 focus:border-none rounded-lg  ${
            step == 'reports'
              ? 'bg-[#F0FAFB] drop-shadow-md lg:text-sm text-[10px] '
              : 'text-xs lg:text-base'
          } flex items-center justify-start lg:gap-x-2 gap-x-1 lg:p-2 p-1  font-medium `}>
          <div
            className={`lg:w-12 w-7 lg:h-12 h-7 flex justify-center items-center ${
              step !== 'reports' && '  rounded-lg drop-shadow-md bg-white   '
            }`}>
            {' '}
            <InlineSVG src={folder} />
          </div>{' '}
          گزارش های مالی{' '}
        </button>
        {/*  */}
      </div>
      {isloading ? (
        <BouncingDotsLoader />
      ) : (
        <>
          {ComponentHandler()}
          <PaginationComponet
            pageSize={4}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={total}
          />{' '}
        </>
      )}
    </div>
  );
}

export default CompanyReportsBox;
