import React, { useContext, useEffect, useState } from 'react';
import Axios from 'comon/Axios/Axios';
import OrdersCard from 'comon/cards/OrdersCard';
import DoughnutChart from 'comon/Chart/DoughnutChart';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import PaginationComponet from 'comon/pagination/PaginationComponent';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import DataContext from 'comon/context/MainContext';
import { generateColorFromNumber, truncateDescription } from 'comon/GlobalyTools/UseAbleFunctions';

function Orders() {
  const { userStatistics } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [isloading, setIsloading] = useState(false);
  const [orders, setOrders] = useState(false);
  const isMobile = useDeviceDetection();

  useEffect(() => {
    GetAllOrders();
  }, []);

  const GetAllOrders = async () => {
    setIsloading(true);
    await Axios.post('/Orders/investor/GetAll', {
      state: null,
      pagination: {
        take: 3,
        skip: currentPage > 1 ? (currentPage - 1) * 10 : 0
      }
    })
      .then((res) => setOrders(res))
      .catch(() => setOrders(false))
      .finally(() => setIsloading(false));
  };

  const chartData = {
    labels: userStatistics?.orders?.map((item) => truncateDescription(item?.planTitle, 20)),
    data: userStatistics?.orders?.map((item) => item?.percentage * 100),
    backgroundColor: userStatistics?.orders?.map((item) =>
      generateColorFromNumber(item?.percentage * 100)
    )
  };
  console.log(userStatistics);

  return (
    <div className="w-full flex flex-col items-center lg:gap-y-0 gap-y-16 justify-start lg:py-2 pb-20">
      {userStatistics?.orders?.length > 0 && (
        <div className="lg:w-[85%] w-full  flex justify-between items-start ">
          {/* all funds assets */}
          <div className=" lg:w-[70%] w-[50%] lg:flex-row flex-col gap-y-5 flex lg:items-center items-start lg:justify-between justify-start ">
            {' '}
            <span className="text-sm text-[#616161] ">مبلغ کل سرمایه‌گذاری شما (ریال):</span>
            <span className="lg:text-base text-sm   text-[#202020]  font-bold">
              {' '}
              {userStatistics?.ordersSum && Number(userStatistics?.ordersSum).toLocaleString()}
            </span>
          </div>
          {/*  chart */}
          <DoughnutChart
            data={chartData}
            percent={true}
            textLines={['ترکیب ', 'دارایی']}
            textColor="#000000"
            width={isMobile ? '130px' : '200px'}
            height={isMobile ? '130px' : '200px'}
          />
        </div>
      )}{' '}
      {isloading ? (
        <BouncingDotsLoader />
      ) : orders?.pagination?.total > 0 ? (
        <>
          {orders?.data?.map((item, index) => (
            <OrdersCard data={item} key={index} />
          ))}
          <PaginationComponet
            pageSize={3}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={orders?.pagination?.total}
          />{' '}
        </>
      ) : (
        <span className="lg:w-[50%] w-[90%] text-center text-sm font-bold text-accent-600 bg-[#01B69B08]   border border-accent-600 rounded-large h-[42px]  flex items-center justify-center">
          سفارشی برای شما یافت نشد !
        </span>
      )}
    </div>
  );
}

export default Orders;
