import { useEffect } from 'react';
import { fetchUserInfo } from 'comon/action/userInfoAction';
import { getFromLocalStorage } from 'comon/storage/localStorage';

export const AuthCheck = ({ children }) => {
  const token = getFromLocalStorage('token');
  const OnfetchUserInfo = () => {
    return fetchUserInfo();
  };

  useEffect(() => {
    if (token) {
      OnfetchUserInfo();
    }
  }, []);

  return <>{children}</>;
};
