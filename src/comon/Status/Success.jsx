/* eslint-disable no-unused-vars */
import './successCss.css';

const Success = ({ text, showTopBar, setIsOpen, btn = false }) => {
  return (
    <div className="w-full flex flex-col  items-center justify-center gap-y-10 lg:items-center relative min-h-[300px] h-full bg-transparent rounded-t-large">
      <div className="w-full lg:mt-0 bg-transparent  ">
        <div className="flex flex-col w-full mt-0 bg-transparent  p-4 pt-8 gap-y-20 items-center  ">
          {showTopBar && <div className="bg-[#c4c2c2] w-14 h-2 rounded-large -mt-20 "></div>}
          <div className=" w-full alert-popup-container flex flex-col space-y-10 items-center ">
            <div className="w-full success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
            <div className={`flex justify-center text-center text-base text-green-600 `}>
              {text}
            </div>
          </div>
        </div>
      </div>
      {btn && (
        <button
          onClick={() => setIsOpen(false)}
          className="border w-[70%] h-[40px] border-green-600 text-green-600  text-base text-center justify-center items-center flex rounded-md  bg-transparent  ">
          تایید{' '}
        </button>
      )}
    </div>
  );
};

export default Success;
