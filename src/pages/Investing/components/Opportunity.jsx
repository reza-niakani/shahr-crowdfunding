import Axios from 'comon/Axios/Axios';
import PlanCard from 'comon/cards/PlanCard';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import PaginationComponet from 'comon/pagination/PaginationComponent';
import React, { useEffect, useState } from 'react';

function Opportunity() {
  const [allPlans, setAllPlans] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    GetAllCurrentPlans();
  }, [currentPage]);

  const GetAllCurrentPlans = async () => {
    setIsloading(true);
    await Axios.post('/InvestmentPlans/GetAll', {
      states: [7],
      titleQuery: '',
      pagination: {
        take: 2,
        skip: currentPage > 1 ? (currentPage - 1) * 2 : 0
      }
    })
      .then((res) => setAllPlans(res))
      .catch(() => setAllPlans(false))
      .finally(() => setIsloading(false));
  };
  return (
    <div className="w-full flex flex-col justify-start items-center lg:gap-y-16 gap-y-10 lg:pb-0 pb-20">
      {' '}
      <div className="w-full flex flex-wrap items-center justify-center gap-5  ">
        {isloading ? (
          <BouncingDotsLoader />
        ) : allPlans?.data?.length > 0 ? (
          allPlans?.data?.map((item, index) => (
            <PlanCard data={item} innerCard={true} key={index} />
          ))
        ) : (
          <span className="lg:w-[50%] w-[90%] text-center text-sm font-bold text-accent-600 bg-[#01B69B08]   border border-accent-600 rounded-large h-[42px]  flex items-center justify-center">
            هیچ طرح سرمایه گذاری فعالی یافت !
          </span>
        )}
      </div>
      {/* pagination */}
      <PaginationComponet
        pageSize={2}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={allPlans?.pagination?.total}
      />{' '}
    </div>
  );
}

export default Opportunity;
