/* eslint-disable no-unused-vars */
import React from 'react';
import MobileBottomBar from 'comon/MobileBottomBar/MobileBottomBar';
import SideBar from 'comon/layout/SideBar/SideBar';

function InnerPageStructure({ children }) {
  return (
    <div className="w-screen flex justify-center p-5 items-start lg:py-16  lg:max-w-[1920px]  min-h-screen h-auto bg-gray-100 ">
      <div className="lg:w-[77%] w-full flex  justify-between   items-start h-full ">
        {/* sidebar  */}
        <div className="w-[20%]  min-w-[225px] lg:flex  hidden flex-col h-full  justify-start items-start ">
          <SideBar />
        </div>
        <div className="lg:w-full w-full flex justify-start items-start h-full max-w-[1440px]">
          {' '}
          {children}
        </div>
      </div>
      {/* Always available here */}
      <MobileBottomBar />
    </div>
  );
}

export default InnerPageStructure;
