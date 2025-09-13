/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import { forwardRef } from 'react';

const PdfDownloader = forwardRef(({ children }, ref) => {
  return (
    <div className="hidden">
      <div ref={ref} className="relative  w-[210mm] h-[297mm]">
        {/* Background Image */}
        {/* <img src={bg} className="w-full h-full absolute top-0 left-0 right-0 -z-0" /> */}

        {/* Container */}
        <div className="w-[120mm] mx-auto relative z-10">{children}</div>
      </div>
    </div>
  );
});

export default PdfDownloader;
