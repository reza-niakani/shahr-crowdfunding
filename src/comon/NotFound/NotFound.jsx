import React from 'react';

function NotFound() {
  return (
    <div className="w-full  text-BgNight-main flex flex-col justify-center items-center gap-y-5 h-screen inset-0">
      {' '}
      <span className="font-extrabold text-[35px] w-full text-center  ">404</span>
      <p className="w -full flex text-[18px]  justify-center text-center ">
        صفحه مورد نظر یافت نشد{' '}
      </p>
    </div>
  );
}

export default NotFound;
