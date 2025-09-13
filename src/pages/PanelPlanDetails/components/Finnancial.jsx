import React from 'react';

function Finnancial({ FinnancialData }) {
  return (
    <div className="lg:w-[98%] w-full flex flex-col items-center justify-start gap-y-4">
      {FinnancialData ? (
        <>
          {' '}
          <span className="text-[#383C41] text-start w-full font-bold text-base ">
            اطلاعات مالی{' '}
          </span>
          <div className="w-full flex flex-col items-center justify-start gap-y-2 ">
            {/*  */}
            {FinnancialData?.map((item, index) => (
              <div
                key={index}
                className={`w-full flex justify-between ${
                  index < FinnancialData?.length - 1 ? 'border-b ' : ''
                } border-[#CCCCCC] items-center py-3`}>
                <span className="text-sm text-[#707070] text-start">{item?.title}</span>
                <span className="text-sm text-[#333333] text-start font-bold ">{item?.data}</span>
              </div>
            ))}
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

export default Finnancial;
