import React, { useEffect, useRef, useState } from 'react';
import { getFromLocalStorage } from 'comon/storage/localStorage';
import axios from 'axios';
import getBaseUrl from 'comon/Axios/getBaseUrl';
import InlineSVG from 'react-inlinesvg';
import uploadIcon from 'asset/Pictures/Icons/folderUpload.svg';

function BoxUploadFile({
  allowedTypes, // If not provided, accept all file types
  requiresSigning = false,
  setFileAddress,
  selectedfile,
  setSelectedfile
}) {
  const token = JSON.parse(getFromLocalStorage('token'));
  const inputRef = useRef();
  const baseUrl = getBaseUrl();
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedfile) validateAndSubmit();
  }, [selectedfile]);

  // Function to check file type (skips check if `allowedTypes` is undefined)
  const validateFileType = (file) => {
    if (!file || !allowedTypes) return true; // Skip check if `allowedTypes` is undefined
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const allowed = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes];
    return allowed.includes(fileExtension);
  };

  const validateAndSubmit = () => {
    if (validateFileType(selectedfile)) {
      Submithandler();
    } else {
      setError(
        `فرمت فایل باید یکی از موارد باشد: ${
          Array.isArray(allowedTypes) ? allowedTypes.join(', ') : allowedTypes
        }`
      );
      setSelectedfile('');
      setFileAddress('');
      setTimeout(() => setError(''), 2000);
    }
  };

  const Submithandler = async () => {
    const formData = new FormData();
    formData.append('requiresSigning', requiresSigning);
    formData.append('File', selectedfile);

    try {
      const res = await axios.post(`${baseUrl}/Blob/Upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setFileAddress(res?.data?.data?.path);
    } catch {
      setError('خطا! در بارگذاری فایل ناموفق ');
      setTimeout(() => setError(''), 2500);
    }
  };

  return (
    <div
      onClick={() => inputRef.current.click()}
      className="flex flex-col gap-y-5 justify-center items-center cursor-pointer w-full  h-[200px] border rounded-lg border-dashed border-[#707070]">
      <form className="hidden">
        <input
          type="file"
          name="file"
          onChange={(event) => setSelectedfile(event.target.files[0])}
          ref={inputRef}
          hidden
        />
      </form>
      <InlineSVG src={uploadIcon} />
      <span className="text-base text-black flex items-center gap-x-1 justify-center">
        <strong className="w-auto text-nowrap text-[#0070CC] text-base">انتخاب فایل</strong>
        یا در اینجا رها کنید.
      </span>
      {allowedTypes && (
        <span className="text-center text-xs text-[#F7941D]">
          فایل باید به صورت {Array.isArray(allowedTypes) ? allowedTypes.join(', ') : allowedTypes}{' '}
          باشد
        </span>
      )}
      {error && <span className="text-red-500 text-xs text-center ">{error}</span>}
    </div>
  );
}

export default BoxUploadFile;
