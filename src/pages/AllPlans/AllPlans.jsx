/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import searchIcon from 'asset/Pictures/Icons/searchIcon.svg';
import CustomDropDown from 'comon/DropDown/CustomDropDown';
import Axios from 'comon/Axios/Axios';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import PlanCard from 'comon/cards/PlanCard';
import PaginationComponet from 'comon/pagination/PaginationComponent';
import { debounce } from 'lodash';
import NotActicePlansCard from 'comon/cards/NotActicePlansCard';
import { plansStatusForFilter, planStatusEnum } from 'comon/DB/PlanStatusEnum';
import sort from 'asset/Pictures/Icons/sort.svg';

function AllPlans() {
  const [category, setCategory] = useState();
  const [plansStatus, setPlansStatus] = useState();
  const [status, setStatus] = useState();

  const [currentPlans, setCurrentPlans] = useState({
    data: [],
    total: 0,
    isloading: false,
    page: 1,
    showValidate: '',
    search: ''
  });

  const [otherPlans, setOtherPlans] = useState({
    data: [],
    total: 0,
    isloading: false,
    page: 1,
    showValidate: '',
    search: ''
  });

  const GetAllCurrentPlans = async (search) => {
    setCurrentPlans((prev) => ({ ...prev, isloading: true }));
    await Axios.post('/InvestmentPlans/GetAll', {
      states: status?.key ? [status?.key] : [7],
      titleQuery: search,
      pagination: {
        take: 3,
        skip: (currentPlans?.page - 1) * 3,
        ...(category?.key || [])
      }
    })
      .then((res) =>
        setCurrentPlans((prev) => ({
          ...prev,
          data: res?.data,
          total: res?.pagination?.total,
          showValidate: res?.data && res?.data?.length > 0 ? true : false
        }))
      )
      .catch(() =>
        setCurrentPlans((prev) => ({ ...prev, data: [], total: 0, showValidate: false }))
      )
      .finally(() => setCurrentPlans((prev) => ({ ...prev, isloading: false })));
  };
  useMemo(() => {
    GetAllCurrentPlans();
  }, [currentPlans?.page, category, status]);

  const GetAllOtherPlans = async (search) => {
    setOtherPlans((prev) => ({ ...prev, isloading: true }));
    await Axios.post('/InvestmentPlans/GetAll', {
      states: plansStatus?.key ? [plansStatus?.key] : [],
      titleQuery: search,
      pagination: {
        take: 3,
        skip: (otherPlans?.page - 1) * 3
      }
    })
      .then((res) =>
        setOtherPlans((prev) => ({
          ...prev,
          data: res?.data && res?.data?.filter((item) => item?.state !== 7),
          total: res?.data && res?.data?.filter((item) => item?.state !== 7)?.length,
          showValidate:
            res?.data && res?.data?.filter((item) => item?.state !== 7)?.length > 0 ? true : false
        }))
      )
      .catch(() => setOtherPlans((prev) => ({ ...prev, data: [], total: 0, showValidate: false })))
      .finally(() => setOtherPlans((prev) => ({ ...prev, isloading: false })));
  };

  useMemo(() => {
    GetAllOtherPlans();
  }, [otherPlans?.page, plansStatus]);

  console.log('other', otherPlans);

  const handleChnagePage = (setState, current) => {
    setState((prev) => ({ ...prev, page: current }));
  };

  // Correct debounced function definition
  const debouncedSearch = useCallback(
    debounce((func, search) => {
      func(search); // Call the function (which uses the latest state)
    }, 400),
    []
  );

  console.log('current', currentPlans);

  return (
    <div
      className={`w-screen flex flex-col lg:pb-28 pb-24 justify-center ${
        currentPlans?.total > 0 ? '' : 'lg:mt-[.5rem] mt-[5rem] '
      } h-full items-center  `}>
      {/* current plans */}
      <div className=" lg:w-[70%] w-[95%] lg:h-[80%] h-[92%] flex flex-col items-center justify-start gap-y-16    pb-3 lg:pb-5 ">
        {/* title and  filters  */}
        <div className=" flex w-full lg:flex-row flex-col  items-center  lg:justify-between  justify-start gap-5 lg:gap-y-0 pt-16  ">
          <span className="lg:text-2xl text-lg font-black text-start lg:w-auto w-full text-nowrap  ">
            طرح های سرمایه‌گذاری
          </span>
          <div className=" lg:w-auto w-full justify-end items-center gap-x-5  gap-y-4 flex flex-col lg:flex-row    ">
            <div className="lg:w-auto w-full lg:min-w-[280px]  flex justify-between items-center relative  gap-x-3 flex-nowrap ">
              <label htmlFor="title" className="font-medium text-xs text-nowrap">
                جستجو عنوان پروژه
              </label>
              <input
                name="title"
                placeholder="جستجو"
                className=" w-auto min-w-[240px] h-[35px] rounded-lg   border border-accent-600 focus:ring-0 focus:outline-none pr-4 placeholder:text-gray-200 text-gray-main placeholder:text-xs text-sm "
                onChange={(e) => {
                  setCurrentPlans((prev) => ({ ...prev, search: e.target.value }));
                  debouncedSearch(GetAllCurrentPlans, e.target.value);
                }}
                value={currentPlans?.search}
              />
              <InlineSVG src={searchIcon} className=" absolute left-2 " />
            </div>
            <div className="lg:w-auto w-full lg:min-w-[280px]  flex justify-between items-center relative  gap-x-3 flex-nowrap ">
              <label htmlFor="title" className="font-medium text-xs text-nowrap">
                وضعیت طرح ها{' '}
              </label>
              <div className="w-[240px]">
                <CustomDropDown
                  placeHoolder="انتخاب کنید..."
                  options={plansStatusForFilter?.filter((item) => item?.key != 100)}
                  selectedItem={status}
                  setSelectedItem={setStatus}
                />
              </div>
            </div>
            {/* <div className="w-full lg:w-auto  lg:min-w-[250px]  flex justify-between  items-center  relative  gap-x-3 flex-nowrap ">
              <label
                htmlFor="title"
                className="font-medium text-xs flex  w-auto flex-nowrap items-center justify-start gap-x-1 text-nowrap">
                به ترتیب{' '}
              </label>
              <div className="w-[240px]">
                <CustomDropDown
                  placeHoolder="مشخص نشده"
                  options={[
                    { name: 'جدیدترین طرح ', att: { createDate: 0 }, key: 'createDate' },
                    {
                      name: 'پرسودترین طرح ',
                      att: { totalProfitRate: 0 },
                      key: 'totalProfitRate'
                    }
                  ]}
                  selectedItem={category}
                  setSelectedItem={setCategory}
                />
              </div>
            </div> */}
          </div>
        </div>
        {/* current plan */}
        <div className="w-full flex justify-start lg:gap-y-20 gap-y-12  items-center flex-col lg:min-h-[600px] ">
          <div className="w-full flex flex-nowrap lg:flex-row flex-col justify-center gap-10 lg:gap-x-16 items-center  ">
            {currentPlans?.isloading ? (
              <div className="w-full flex justify-center items-center p-5">
                <BouncingDotsLoader />
              </div>
            ) : currentPlans?.showValidate ? (
              currentPlans?.data?.map((item, index) => <PlanCard key={index} data={item} />)
            ) : (
              <span className="w-full text-base font-bold text-gray-main text-center items-center">
                طرحی در این بخش یافت نشد
              </span>
            )}
          </div>
          {/* pagination */}
          <PaginationComponet
            pageSize={3}
            currentPage={currentPlans?.page}
            setCurrentPage={(current) => handleChnagePage(setCurrentPlans, current)}
            total={currentPlans?.total}
          />{' '}
        </div>
        {/* other plan */}
        {/* <div className="w-full flex justify-start lg:gap-y-20 gap-y-12  items-center flex-col lg:min-h-[600px] ">
          <div className=" flex w-full lg:flex-row flex-col  items-center  lg:justify-between justify-start gap-y-5 lg:gap-y-0    ">
            <span className="lg:text-2xl text-lg font-black text-start lg:w-auto w-full text-nowrap  ">
              مابقی طرح ها
            </span>
            <div className=" lg:w-auto w-full justify-end items-center gap-x-10  gap-y-4 flex flex-col lg:flex-row    ">
              <div className="lg:w-auto w-full lg:min-w-[330px]  flex justify-between items-center relative  gap-x-3 flex-nowrap ">
                <label htmlFor="title" className="font-medium text-xs text-nowrap">
                  جستجو عنوان پروژه
                </label>
                <input
                  name="title"
                  placeholder="جستجو"
                  className=" w-auto min-w-[240px] h-[35px] rounded-lg   border border-[#CD9F00]  focus:ring-0 focus:outline-none pr-4 placeholder:text-gray-200 text-gray-main placeholder:text-xs text-sm "
                  onChange={(e) => {
                    setOtherPlans((prev) => ({ ...prev, search: e.target.value }));
                    debouncedSearch(GetAllOtherPlans, e.target.value);
                  }}
                  value={otherPlans?.search}
                />
                <InlineSVG src={searchIcon} className=" absolute left-2 " />
              </div>
              <div className="lg:w-auto w-full lg:min-w-[330px]  flex justify-between items-center relative  gap-x-3 flex-nowrap ">
                <label htmlFor="title" className="font-medium text-xs text-nowrap">
                  وضعیت طرح ها{' '}
                </label>
                <div className="w-[240px]">
                  <CustomDropDown
                    placeHoolder="انتخاب کنید..."
                    options={planStatusEnum?.filter((item) => item?.key !== 100 && item?.key !== 7)}
                    selectedItem={plansStatus}
                    setSelectedItem={setPlansStatus}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-nowrap lg:flex-row flex-col justify-center gap-10 lg:gap-x-16 items-center  ">
            {otherPlans?.isloading ? (
              <div className="w-full flex justify-center items-center p-5">
                <BouncingDotsLoader />
              </div>
            ) : otherPlans?.showValidate ? (
              otherPlans?.data?.map((item, index) => <NotActicePlansCard key={index} data={item} />)
            ) : (
              <span className="w-full text-base font-bold text-gray-main text-center items-center">
                طرحی در این بخش یافت نشد
              </span>
            )}
          </div>
          <PaginationComponet
            pageSize={3}
            currentPage={otherPlans?.page}
            setCurrentPage={(current) => handleChnagePage(setOtherPlans, current)}
            total={otherPlans?.total}
          />{' '}
        </div> */}
      </div>
    </div>
  );
}

export default AllPlans;
