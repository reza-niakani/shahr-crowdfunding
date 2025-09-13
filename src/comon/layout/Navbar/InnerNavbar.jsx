import React, { useContext } from 'react';
import Icon from 'asset/Pictures/Icons/MenuIcon.svg';
// import bell from 'asset/Pictures/Icons/bell.svg';
// import interview from 'asset/Pictures/Icons/interview.svg';
import mainLogo from 'asset/Pictures/logo/logoalone.png';
import DataContext from 'comon/context/MainContext';
import DateFunctions from 'comon/DateFunction/DateFunctions';
import { useNavigate } from 'react-router-dom';

function InnerNavbar() {
  const { setHamburgerMenuStatus } = useContext(DataContext);
  const navigate = useNavigate();

  return (
    <div className="w-full flex  justify-center  lg:h-20   h-16  items-center bg-white">
      <div className="lg:w-[75%] w-full flex justify-between  items-center  ">
        {/*  logo */}
        <div className="lg:w-fit w-[90%] flex justify-start items-center gap-x-2 drop-shadow-lg rounded-lg p-1">
          {' '}
          <img
            onClick={() => navigate('/')}
            src={mainLogo}
            className="w-fit lg:h-[40px] h-[35px] object-contain cursor-pointer  object-right"
          />
          <span className="text-sm font-bold text-accent-main">شهر کراد</span>
        </div>{' '}
        {/* mobile Icon */}{' '}
        <img src={Icon} onClick={() => setHamburgerMenuStatus(true)} className="lg:hidden  " />
        <div className="w-auto justify-end items-center gap-x-5 flex  flex-nowrap ">
          {/* bell */}
          {/* <InlineSVG src={bell} /> */}
          {/* interview */}
          {/* <InlineSVG src={interview} className="lg:block hidden" /> */}
          {/* date  */}
          <div className="lg:flex  hidden justify-start gap-x-2 items-center  w-auto">
            <span className="text-gray-main text-sm  text-nowrap">تاریخ روز :</span>
            <span className="text-gray-main text-sm border border-[#009085]  flex justify-center items-center text-center rounded-lg py-2 px-3   ">
              {DateFunctions.getDate(new Date())}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InnerNavbar;
