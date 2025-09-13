import Axios from 'comon/Axios/Axios';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import React, { useEffect, useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import { useParams } from 'react-router-dom';
import question from 'asset/Pictures/Icons/questionSquer.svg';

function AllComments() {
  const [allComments, setAllComments] = useState([]);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    GetAllComments();
  }, []);
  const { id } = useParams();

  const GetAllComments = async () => {
    setIsloading(true);
    try {
      const res = await Axios.post('/Comments/GetAll', {
        investmentPlanId: id && +id,
        // commentState: id && Number(id),
        pagination: {
          take: 100,
          skip: 0
        }
      });

      setAllComments(res?.data);
    } catch (ex) {
      setAllComments(false);
    } finally {
      setIsloading(false);
    }
  };
  const CommmentsStructure =
    allComments?.length > 0 && allComments
      ? allComments?.map((item) => ({
          user: item?.userCode,
          post: 'سرمایه‌گذار طرح',
          text: item?.content,
          answer:
            item?.childComments &&
            item?.childComments?.length > 0 &&
            item?.childComments[0] &&
            item?.childComments[0]?.content
        }))
      : [];

  return (
    <div className="w-full flex flex-col items-center gap-y-5 min-h-[100px] p-3 h-auto">
      {' '}
      {CommmentsStructure && CommmentsStructure?.length !== 0 ? (
        CommmentsStructure?.map((item, index) => (
          <div
            className="w-full justify-start flex flex-col items-center h-auto  gap-y-2  border-b border-gray-200 p-1  "
            key={index}>
            {/*  user details and response status  */}
            <div className="w-full flex justify-between items-center  ">
              <div className="w-full  flex justify-start gap-x-5 items-center  h-auto   ">
                <div className=" rounded-large  p-1 flex justify-center items-center  ">
                  <InlineSVG src={question} />
                </div>
                <div className=" flex w-auto items-center lg:flex-row flex-col  gap-x-3  justify-start ">
                  {' '}
                  <span className=" text-sm  w-fit text-gray-main ">{item?.user}</span>
                  <span className=" rounded-md lg:p-2 lg:text-sm text-xs p-1 flex justify-center items-center text-gray-600  ">
                    {item?.post}
                  </span>
                </div>
              </div>
            </div>
            {/* comment  text  */}
            <span className="w-full text-justify flex items-center whitespace-pre-line lg:text-sm text-xs text-gray-main font-medium  leading-6 ">
              {item?.text}
            </span>
            {item?.answer && (
              <div className="w-full flex justify-end items-center  ">
                <div className="lg:w-[98%] w-full flex flex-col gap-y-3 items-center bg-gray-100 rounded-md   p-3">
                  <div className="flex lg:justify-start justify-between w-full items-center">
                    {' '}
                    <span className=" w-full  text-gray-main lg:text-sm text-xs  font-semibold justify-start">
                      پاسخ{' '}
                    </span>
                  </div>
                  <div className=" w-full  lg:text-sm text-xs text-gray-170  leading-7 justify-start text-justify">
                    {item?.answer}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <span className="w-full flex h-full items-center justify-center text-center  text-sm  text-gray-600  ">
          {isloading ? <BouncingDotsLoader /> : ' نظری برای این طرح ثبت نشده'}
        </span>
      )}
    </div>
  );
}

export default AllComments;
