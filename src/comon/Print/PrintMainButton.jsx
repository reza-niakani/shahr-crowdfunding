import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import PdfForDownload from './PdfForDownload';

function PrintMainButton({ documentTitle, pdf }) {
  const printRef = useRef();

  return (
    <div className="col-span-1 w-full flex items-center justify-center ">
      <ReactToPrint
        pageStyle={
          '@page {size: A4; margin: 0mm; background-image: url("asset/images/certificateLogo/AndokhtePaydar.jpg") no-repeat cover; content: url("asset/images/certificateLogo/AndokhtePaydar.jpg"); -webkit-print-color-adjust: exact; }'
        }
        documentTitle={documentTitle}
        trigger={() => {
          return (
            <button className="w-[180px] lg:h-[48px] h-[40px]  bg-[#009085] text-white text-center flex justify-center rounded-md  items-center text-sm font-semibold  focus:outline-none focus:ring-0 focus:border-0 ">
              چاپ گواهی
            </button>
          );
        }}
        content={() => printRef.current}
      />
      <PdfForDownload ref={printRef}>{pdf}</PdfForDownload>
    </div>
  );
}

export default PrintMainButton;
