/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react';
import Footer from 'comon/layout/Footer/Footer';
import './mainPageStyle.css';
import DataContext from 'comon/context/MainContext';
import HamburgerMenu from 'comon/HamburgerMenu/HamburgerMenu';
import OutNavbar from 'comon/layout/Navbar/OutNavbar';
import { useLocation } from 'react-router-dom';
import InnerNavbar from 'comon/layout/Navbar/InnerNavbar';
import GlobalyModal from 'comon/Modal/GlobalyModal';
import Axios from 'comon/Axios/Axios';
import { getQueryParam } from 'comon/GlobalyTools/UseAbleFunctions';

function MainStructurePages({ children }) {
  const { hamburgerMenuStatus, setModal } = useContext(DataContext);
  const { pathname } = useLocation();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const mainContentRef = useRef(null);

  const payId = getQueryParam('payId');

  console.log(payId);

  useEffect(() => {
    payId && PaymentStatus();
  }, [payId]);

  const PaymentStatus = async () =>
    await Axios.get(`/Payment/GetById/${payId}`)
      .then((res) => {
        console.log('payment', res);

        if (res?.data?.payStatus == 1) {
          setModal({ type: 'success', data: res?.data, trackingCode: payId });
        } else {
          setModal({ type: 'failed', data: res?.data, trackingCode: payId });
        }
      })
      .catch((er) => setModal({ type: 'failed', data: null, trackingCode: payId }));

  useEffect(() => {
    const handleScroll = () => {
      if (mainContentRef.current) {
        const currentScrollPos = mainContentRef.current.scrollTop;
        setIsNavbarVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
      }
    };

    const mainContent = mainContentRef.current;
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, [prevScrollPos]);

  const DetectOutAndInnerPage = () => {
    if (pathname?.includes('/dashboard')) {
      return true;
    } else if (pathname?.includes('/investing')) {
      return true;
    } else if (pathname?.includes('/financial_report')) {
      return true;
    } else if (pathname?.includes('/user_info')) {
      return true;
    } else if (pathname?.includes('/request_for_financing')) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      ref={mainContentRef}
      className={`main-content flex w-screen h-screen overflow-y-auto flex-col items-center gap-y-20 justify-between overflow-x-hidden ${
        hamburgerMenuStatus ? 'fixed inset-0' : ''
      }`}>
      <HamburgerMenu isOpen={hamburgerMenuStatus} />
      <GlobalyModal />
      <div className="flex flex-col h-auto w-full flex-grow justify-between items-center">
        {!pathname?.includes('login') &&
          (DetectOutAndInnerPage() ? (
            <div className=" w-full flex justify-center items-center h-auto">
              <InnerNavbar />
            </div>
          ) : (
            <div
              className={`flex items-center fixed top-10 w-screen justify-center h-auto transition-all duration-300 z-[1000] ${
                isNavbarVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-10 pointer-events-none'
              }`}>
              <OutNavbar />
            </div>
          ))}

        <div className="w-full relative flex-grow flex items-center justify-center">{children}</div>
      </div>

      {!pathname?.includes('login') && !DetectOutAndInnerPage() && (
        <div className="w-full">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default MainStructurePages;
