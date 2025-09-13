// src/comon/Routs/setting/TimeoutFallback.js
import React, { useEffect, useState } from 'react';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';

const TimeoutFallback = () => {
  const [showTimeout, setShowTimeout] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setShowTimeout(true), 7000);
    return () => clearTimeout(id);
  }, []);

  if (showTimeout) {
    return (
      <div className="text-center flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4 text-lg">
          بارگیری طول کشید! لطفا اینترنت خود را بررسی کنید یا صفحه را بازخوانی کنید.
        </p>
        <button
          onClick={this.handleReload}
          className="relative px-6 py-2 bg-accent-600 hover:bg-accent-1100 text-white font-semibold rounded-lg shadow-md transition inline-flex items-center overflow-visible">
          <span className="absolute right-0 -top-[5px] inline-flex h-[0.6rem] w-[0.6rem] rounded-full bg-accent-1100 animate-ping"></span>
          <span className="relative">تلاش مجدد</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 px-4 text-gray-800 text-center gap-y-5">
      <BouncingDotsLoader />
      <p className="text-lg">لطفاً کمی صبر کنید، در حال دریافت صفحه ...</p>
    </div>
  );
};

export default TimeoutFallback;
