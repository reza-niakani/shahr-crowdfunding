import React, { useContext } from 'react';
import InlineSVG from 'react-inlinesvg';
import Icon from 'asset/Pictures/Icons/MenuIcon.svg';
// import bell from 'asset/Pictures/Icons/bell.svg';
// import interview from 'asset/Pictures/Icons/interview.svg';
import logo from 'asset/Pictures/logo/CompanyMainLogo.svg';
import DataContext from 'comon/context/MainContext';
import DateFunctions from 'comon/DateFunction/DateFunctions';
import { useNavigate } from 'react-router-dom';

function InnerNavbar() {
  const { setHamburgerMenuStatus } = useContext(DataContext);
  const navigate = useNavigate();

  return (
    <div className="w-full flex  justify-center  lg:h-20   h-16  items-center bg-white">
      <div className="lg:w-[75%] w-[90%] flex justify-between items-center  ">
        {/* mobile Icon */}
        <InlineSVG
          src={Icon}
          onClick={() => setHamburgerMenuStatus(true)}
          className="lg:hidden block"
        />
        {/*  logo */}
        <InlineSVG
          src={logo}
          onClick={() => navigate('/')}
          className=" w-auto lg:h-[80px] h-[56px] cursor-pointer py-5"
        />
        <div className="w-auto justify-end items-center gap-x-5 flex  flex-nowrap ">
          {/* bell */}
          {/* <InlineSVG src={bell} /> */}
          {/* interview */}
          {/* <InlineSVG src={interview} className="lg:block hidden" /> */}
          {/* date  */}
          <div className="lg:flex  hidden justify-start gap-x-2 items-center  w-auto">
            <span className="text-gray-main text-sm  text-nowrap">تاریخ روز :</span>
            <span className="text-gray-main text-sm border border-[#C9B777]  flex justify-center items-center text-center rounded-lg py-2 px-3   ">
              {DateFunctions.getDate(new Date())}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InnerNavbar;
