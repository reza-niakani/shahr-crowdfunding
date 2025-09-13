/* eslint-disable no-unused-vars */
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import { addToLocalStorage, getFromLocalStorage } from 'comon/storage/localStorage';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Impersonate() {
  const { search } = useLocation();
  // const check = getFromLocalStorage('token');

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const token = urlParams.get('token');

    if (token) {
      try {
        // Decode the token
        const decodedToken = jwtDecode(token);

        // Save the original token to localStorage
        addToLocalStorage('token', token);

        // Redirect based on nationalId length
        if (decodedToken?.nationalId?.length === 10) {
          window.location.href = '/dashboard';
        } else if (decodedToken?.nationalId?.length > 10) {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        window.location.href = '/';
      }
    } else {
      window.location.href = '/';
    }
  }, [search]);

  console.log(getFromLocalStorage('token'));

  return (
    <div className="flex h-full items-center justify-center w-full ">
      <BouncingDotsLoader />
    </div>
  );
}

export default Impersonate;
