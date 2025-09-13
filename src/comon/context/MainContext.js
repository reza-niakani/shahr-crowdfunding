/* eslint-disable no-unused-vars */
import Axios from 'comon/Axios/Axios';
import { getFromLocalStorage } from 'comon/storage/localStorage';
import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useMemo, useState } from 'react';

const DataContext = createContext({});
export const DataProvider = ({ children }) => {
  const token = getFromLocalStorage('token');
  const tokenAnalyz = token && jwtDecode(getFromLocalStorage('token'));

  useEffect(() => {
    GetStatisticalInformation();
  }, []);

  const [timer, setTimer] = useState(2 * 60 * 1000);
  const [modalStatus, setModalStatus] = useState(false);
  const [footerModalStatus, setFooterModalStatus] = useState(false);
  const [fundDetail, setFundDetail] = useState();
  const [mobileModalStatus, setMobileModalStatus] = useState(false);
  const [hamburgerMenuStatus, setHamburgerMenuStatus] = useState(false);
  const [role, setRole] = useState();
  const [userInfo, setUserInfo] = useState();
  const [step, setStep] = useState();
  const [plansDitals, setPlansDitals] = useState();
  const [investingsStatistics, setInvestingsStatistics] = useState();
  const [statisticalInformation, setStatisticalInformation] = useState();
  const [modal, setModal] = useState();

  const GetStatisticalInformation = async () =>
    await Axios.get('Statistics/Get')
      .then((res) => setStatisticalInformation(res?.data))
      .catch((er) => setStatisticalInformation());

  const GetUserInfo = async () =>
    await Axios.get('Accounts/GetUserInfo')
      .then((res) => setUserInfo(res?.data))
      .catch((er) => false);

  useMemo(() => {
    token && GetUserInfo();
  }, [token]);

  useMemo(() => {
    if (tokenAnalyz) {
      if (tokenAnalyz?.nationalId?.length === 10) {
        setRole('real');
      } else if (tokenAnalyz?.nationalId?.length > 10) {
        setRole('legal');
      }
    }
  }, [token]);

  return (
    <DataContext.Provider
      value={{
        timer,
        setTimer,
        modalStatus,
        setModalStatus,
        fundDetail,
        setFundDetail,
        footerModalStatus,
        setFooterModalStatus,
        mobileModalStatus,
        setMobileModalStatus,
        hamburgerMenuStatus,
        setHamburgerMenuStatus,
        token,
        role,
        setRole,
        userInfo,
        setUserInfo,
        step,
        modal,
        setModal,
        setStep,
        plansDitals,
        setPlansDitals,
        investingsStatistics,
        setInvestingsStatistics,
        statisticalInformation,
        setStatisticalInformation
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
