/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DataContext from 'comon/context/MainContext';
import { getFromLocalStorage } from 'comon/storage/localStorage';
import InlineSVG from 'react-inlinesvg';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import mainLogo from 'asset/Pictures/logo/CompanyMainLogo.svg';
import HamburgerMenuIcon from 'asset/Pictures/Icons/HamburgerMenuIcon.svg';
// import arrowDown from 'asset/Pictures/Icons/arrowDown.svg';

function OutNavbar() {
  const { userInfo, setHamburgerMenuStatus, token } = useContext(DataContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navbarItem = [
    // { name: 'صفحه اصلی', rout: '/', key: 'home' },
    // { name: 'صندوق های سرمایه گذاری', rout: '', key: 'investing_funds' },
    // {
    //   name: 'خدمات مالی زاگرس',
    //   rout: '/Financial services',
    //   key: 'financial_services'
    // },
    // { name: 'آخرین اخبار و آموزش ها', rout: '/contact_us', key: 'contact_us' },\

    { name: 'صفحه اصلی ', rout: '/', key: 'home' },
    { name: 'طرح های سرمایه گذاری', rout: '/all_plans', key: 'all_plans' },
    // { name: 'راهنمای سرمایه گذاری', rout: '/user_guide', key: 'user_guide' },
    { name: 'درباره ما', rout: '/about_us', key: 'about_us' },
    { name: 'محتوای آموزشی', rout: '/educational_content', key: 'educational_content' },
    { name: 'تماس باما', rout: '/contact_us', key: 'contact_us' }
  ];

  const handleActivity = () => {
    if (pathname?.length == 1 && pathname?.trim()?.includes('/')) {
      return 'home';
    } else if (pathname?.trim()?.includes('/all_plans')) {
      return 'all_plans';
    } else if (pathname?.trim()?.includes('/contact_us')) {
      return 'contact_us';
    } else if (pathname?.trim()?.includes('/about_us')) {
      return 'about_us';
    } else if (pathname?.trim()?.includes('/user_guide')) {
      return 'user_guide';
    } else if (pathname?.trim()?.includes('/educational_content')) {
      return 'educational_content';
    } else return false;
  };

  console.log(userInfo);

  return (
    <div className="lg:w-[70%] w-[90%] lg:h-[52px] h-[42px] lg:rounded-large rounded-lg bg-gray-100 flex justify-center items-center z-[100000]">
      <div className="h-full w-[95%] flex flex-nowrap justify-between items-center  ">
        <div className=" flex w-auto lg:gap-x-4 items-center h-full">
          {/*  logo */}
          <InlineSVG
            onClick={() => navigate('/')}
            src={mainLogo}
            className="lg:w-[192px]  w-[125px] h-[35px] object-contain cursor-pointer "
          />
          {navbarItem.map((item, index) => (
            <Link
              to={item.rout}
              key={index}
              className={` w-auto text-nowrap gap-x-1 lg:flex  hidden items-center text-sm  cursor-pointer ${
                handleActivity() == item?.key
                  ? ' text-[#C9B777] font-bold '
                  : 'text-gray-main font-medium '
              }`}>
              {item.name}
              {/* <InlineSVG src={arrowDown} /> */}
            </Link>
          ))}
        </div>
        <Link
          to={token ? '/dashboard' : '/login'}
          className="lg:flex hidden items-center text-center justify-center  text-white  bg-accent-600 w-[125px] h-[38px] text-sm font-black rounded-lg  ">
          {token ? 'داشبورد' : 'ثبت نام/ورود'}
        </Link>
        <InlineSVG
          onClick={() => setHamburgerMenuStatus(true)}
          src={HamburgerMenuIcon}
          className=" lg:hidden block"
        />
      </div>
    </div>
  );
}

export default OutNavbar;
