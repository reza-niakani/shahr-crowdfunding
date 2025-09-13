/* eslint-disable no-unused-vars */
import './faildCss.css';

const Failed = ({ text, showTopBar, sejamText = false, setIsOpen, btn = false }) => {
  return (
    <div className="w-full  flex-col flex items-center gap-y-10  justify-start lg:justify-center  lg:mt-0 mt-16  lg:bg-[rgb(242, 252, 244)] relative h-full justify-center   rounded-t-large ">
      {showTopBar && <div className="bg-[#c4c2c2] w-14 h-2 rounded-large -mt-20 "></div>}
      <div className="w-full flex flex-col  h-auto justify-center items-center   ">
        <div className="flex flex-col w-full mt-0 gap-y-5   rounded-lg p-4 pt-8 lg:p-8 justify-start items-center ">
          <div className="ui-error w-28">
            <svg viewBox="0 0 87 87" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g id="Page-1" stroke="none" fill="none">
                <g id="Group-2" transform="translate(2.000000, 2.000000)">
                  <circle
                    id="Oval-2"
                    stroke="rgb(252, 191, 191)"
                    cx="41.5"
                    cy="41.5"
                    r="41.5"></circle>
                  <circle
                    className="ui-error-circle"
                    stroke="#F74444"
                    cx="41.5"
                    cy="41.5"
                    r="41.5"></circle>
                  <path
                    className="ui-error-line1"
                    d="M22.244224,22 L60.4279902,60.1837662"
                    id="Line"
                    stroke="#F74444"></path>
                  <path
                    className="ui-error-line2"
                    d="M60.755776,21 L23.244224,59.8443492"
                    id="Line"
                    stroke="#F74444"></path>
                </g>
              </g>
            </svg>
          </div>
          {/* <div className="alert-popup-message">
            {PayStatus !== '' ? PayStatus[statusData?.payStatus] : <p>ورود مشکوک</p>}
          </div> */}
          <div className={`flex justify-center text-center text-base text-red-main w-full`}>
            {text}
          </div>
          {sejamText && (
            <p className="lg:w-full w-full  text-sm text-gray-main text-justify justify-center items-center  ">
              {sejamText}
            </p>
          )}{' '}
        </div>
      </div>
      {btn && (
        <button
          onClick={() => setIsOpen(false)}
          className="border w-full border-red-main text-base text-center h-[40px] justify-center items-center flex rounded-md  bg-gray-600 text-white   ">
          تایید{' '}
        </button>
      )}
    </div>
  );
};

export default Failed;
