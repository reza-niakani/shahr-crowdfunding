/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
// /* eslint-disable */
import { useEffect, useState } from 'react';
import './animationStyling.css';
import Axios from 'comon/Axios/Axios';
import reload from 'asset/Pictures/Icons/reload.svg';
import InlineSVG from 'react-inlinesvg';

const Captcha = ({ enternigStep = false, captcha, setCaptcha }) => {
  const [isload, setIsload] = useState(false);

  useEffect(() => {
    GetCaptcha();
  }, [alert, enternigStep]);

  const GetCaptcha = async () => {
    setIsload(true); // Start loading
    try {
      const res = await Axios.post('/Captcha/Create', {});
      return setCaptcha(res?.data);
    } catch (error) {
      return setCaptcha(false);
    } finally {
      setIsload(false); // End loading
    }
  };

  return (
    <div className="w-full flex items-center justify-center  h-[45px] gap-x-2 cursor-pointer ">
      {captcha ? (
        <img
          src={`data:image/jpeg;base64,${captcha?.file}`}
          className="lg:w-[70%] w-full h-fit max-h-[50px]  rounded-large"
        />
      ) : (
        <span className="w-[70%] text-center text-xs font-medium    text-gray-600 ">
          خطا! کمی دیگر تلاش کنید{' '}
        </span>
      )}{' '}
      <InlineSVG
        src={reload}
        onClick={GetCaptcha}
        className={`cursor-pointer w-fit ${isload ? 'spin-animation' : ''}`} // Dynamically add the class
      />
    </div>
  );
};

export default Captcha;
