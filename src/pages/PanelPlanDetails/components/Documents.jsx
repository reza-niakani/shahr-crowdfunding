import getBaseUrl from 'comon/Axios/getBaseUrl';
import React from 'react';
import download from 'asset/Pictures/Icons/download.svg';
import eye from 'asset/Pictures/Icons/greeneye.svg';
import InlineSVG from 'react-inlinesvg';
import { downloadFile } from 'comon/GlobalyTools/UseAbleFunctions';

function Documents({ documents }) {
  return (
    <div className="lg:w-[98%] w-full flex flex-col items-center justify-start gap-y-4">
      {documents ? (
        <>
          <span className="text-[#383C41] text-start w-full font-bold text-base ">
            مدارک و ضمانت نامه ها{' '}
          </span>
          <div className="w-full flex flex-col items-center justify-start gap-y-2 ">
            {/* national code */}
            {documents?.length > 0 ? (
              documents?.map((item, index) => (
                <div
                  key={index}
                  className={`w-full flex justify-between flex-wrap border rounded-[12px] h-[53px] border-[#CCCCCC] items-center px-5`}>
                  <span className="text-sm text-[#707070] text-start flex items-center gap-x-2 justify-start flex-nowrap">
                    {item?.description}
                  </span>
                  <div className="w-auto justify-end flex items-center gap-x-2">
                    {' '}
                    <a
                      rel="noreferrer"
                      type="download"
                      target="_blank"
                      href={getBaseUrl() + '/' + item?.path}
                      className=" lg:text-sm text-xs  font-bold text-end underline hover:text-green-1100 text-[#C9B777]  flex cursor-pointer justify-center items-center ">
                      <InlineSVG src={eye} />
                    </a>{' '}
                    <button
                      onClick={(e) =>
                        downloadFile(getBaseUrl() + '/' + item?.path, item?.description, e)
                      }
                      //   href={getBaseUrl() + '/' + item?.path}
                      className=" lg:text-sm text-xs  font-bold text-end underline hover:text-green-1100 text-[#C9B777]  flex cursor-pointer justify-center items-center ">
                      <InlineSVG src={download} />
                    </button>
                  </div>{' '}
                </div>
              ))
            ) : (
              <span className="w-[50%] text-center text-sm font-bold text-[#C9B777] bg-[#01B69B08]   border border-[#C9B777] rounded-large h-[42px]  flex items-center justify-center">
                ارزیابی قرار داده نشده است !
              </span>
            )}
          </div>
        </>
      ) : (
        <span className="w-[50%] text-center text-sm font-bold text-[#C9B777] bg-[#01B69B08]   border border-[#C9B777] rounded-large h-[42px]  flex items-center justify-center">
          !اطلاعاتی یافت نشد
        </span>
      )}
    </div>
  );
}

export default Documents;
