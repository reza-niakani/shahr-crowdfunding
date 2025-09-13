import DataContext from 'comon/context/MainContext';
import React, { useContext } from 'react';
import logo from 'asset/Pictures/logo/logoalone.png';
import failed from 'asset/Pictures/Images/failed.svg';
import PrintMainButton from 'comon/Print/PrintMainButton';
import DateFunctions from 'comon/DateFunction/DateFunctions';

function Status() {
  const { modal, setModal } = useContext(DataContext);

  const payStatusEnum = (id) =>
    [
      { key: 1, name: 'پرداخت موفق', textColor: 'text-green-500' },
      { key: 2, name: 'در انتظار پرداخت', textColor: 'text-yellow-500' },
      { key: 3, name: 'انصراف از درگاه', textColor: 'text-purple-500' },
      { key: 4, name: 'مشکوک', textColor: 'text-purple-500' },
      { key: 5, name: 'منقضی شده', textColor: 'text-orange-500' }
    ]?.find((item) => item?.key == id);

  return (
    <div
      className="w-full flex flex-col items-center justify-start rounded-large bg-white drop-shadow-lg h-auto min-h-[300px] py-8 gap-y-12 lg:max-w-[500px] "
      style={{
        backgroundImage:
          'radial-gradient(100% 100% at 100% 0%, #EFFCFD 30%, rgba(255, 255, 255, 0) 100%)'
      }}>
      <img src={modal?.type == 'success' ? logo : failed} className="mt-10" />
      <span className="w-full text-center text-gray-main font-semibold ">
        {modal?.type == 'success' ? 'پرداخت با موفقیت انجام شد' : 'پرداخت ناموفق!'}
      </span>

      {modal?.data && (
        <>
          <div className="w-full flex flex-col items-center justify-center gap-y-5  ">
            {' '}
            <span className="text-center w-full text-gray-main font-semibold ">
              کدرهگیری: {modal?.trackingCode}
            </span>
            <span className="text-center w-full text-gray-main font-semibold ">
              تاریخ تراکنش: {modal?.data?.payDate && DateFunctions.getDate(modal?.data?.payDate)}
            </span>
            <span className="text-center w-full text-gray-main font-semibold ">
              مبلغ ترکنش: {Number(modal?.data?.amount).toLocaleString() || ' نامشخص'}
            </span>
            <span className={`text-center w-full text-gray-main font-semibold `}>
              وضعیت تراکنش:{' '}
              <span className={` ${payStatusEnum(modal?.data?.payStatus)?.textColor} `}>
                {payStatusEnum(modal?.data?.payStatus)?.name || ' نامشخص'}
              </span>
            </span>
          </div>

          <PrintMainButton
            documentTitle="کدرهگیری "
            pdf={
              <div
                className="w-full flex flex-col items-center justify-center rounded-large bg-white drop-shadow-lg h-full min-h-[500px] py-8 gap-y-5 lg:max-w-[500px] "
                style={{
                  backgroundImage:
                    'radial-gradient(100% 100% at 100% 0%, #EFFCFD 30%, rgba(255, 255, 255, 0) 100%)'
                }}>
                <img src={logo} className="h-[50px]" />{' '}
                <span className="w-full text-center text-gray-main font-semibold ">
                  {modal?.type == 'success' ? 'پرداخت با موفقیت انجام شد' : 'پرداخت ناموفق!'}
                </span>
                <span className="text-center w-full text-gray-main font-semibold ">
                  کدرهگیری: {modal?.trackingCode}
                </span>
                <span className="text-center w-full text-gray-main font-semibold ">
                  تاریخ تراکنش:{' '}
                  {modal?.data?.payDate && DateFunctions.getDate(modal?.data?.payDate)}
                </span>
                <span className="text-center w-full text-gray-main font-semibold ">
                  مبلغ ترکنش: {Number(modal?.data?.amount).toLocaleString() || ' نامشخص'}
                </span>
                <span className={`text-center w-full text-gray-main font-semibold `}>
                  وضعیت تراکنش:{' '}
                  <span className={` ${payStatusEnum(modal?.data?.payStatus)?.textColor} `}>
                    {payStatusEnum(modal?.data?.payStatus)?.name || ' نامشخص'}
                  </span>
                </span>
              </div>
            }
          />
        </>
      )}
      <button
        onClick={() => setModal()}
        className="w-[80%] rounded-md border border-gray-main text-gray-main text-center focus:outline-none focus:ring-0  bg-transparent h-[40px]">
        بستن
      </button>
    </div>
  );
}

export default Status;
