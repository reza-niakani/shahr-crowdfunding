import Axios from 'comon/Axios/Axios';
import React, { useEffect, useState } from 'react';
import DesktopTabel from './DesktopTabel';
import MobileViewTabel from './MobileViewTabel';
import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';

function MainDocuments() {
  const [documents, setDocuments] = useState([]);
  const [total, setTotal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    GetAllFinancialStatements();
  }, [currentPage]);

  const GetAllFinancialStatements = async () => {
    setIsloading(true);
    await Axios.post('/FinancialStatements/GetAll', {
      pagination: {
        take: 10,
        skip: 0
      }
    })
      .then((res) => {
        let arr = res?.data?.filter((item) => item?.type !== 6);
        console.log(arr);
        setDocuments(arr);
        setTotal(arr?.length);
      })
      .catch(() => {
        setDocuments(false);
        setTotal(0);
      })
      .finally(() => setIsloading(false));

    setIsloading(false);
  };

  return (
    <div className="lg:w-[95%] w-full flex flex-col justify-start items-center mt-5 pb-20">
      {isloading ? (
        <BouncingDotsLoader />
      ) : (
        <>
          <div className="lg:block w-full  md:block hidden">
            <DesktopTabel
              isloading={isloading}
              data={documents}
              total={total}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
          <div className="lg:hidden w-full  md:hidden block">
            <MobileViewTabel
              total={total}
              isloading={isloading}
              data={documents}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default MainDocuments;
