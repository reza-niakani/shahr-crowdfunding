/* eslint-disable no-unused-vars */
import { getFromLocalStorage } from 'comon/storage/localStorage';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import getBaseUrl from 'comon/Axios/getBaseUrl';
import upload from 'asset/Pictures/Icons/upload.svg';
import InlineSVG from 'react-inlinesvg';

function FileUploadPage({
  label,
  setid = 1,
  id,
  icon = false,
  count = 1,
  typeChecking = false,
  setFileAddress,
  fileAddress,
  style,
  placeHolder = false,
  multiple = false,
  guide = false,
  requiresSigning = false,
  textDefaultColor = false,
  selectedfile,
  setSelectedfile
}) {
  const token = JSON.parse(getFromLocalStorage('token'));
  const inputRef = useRef();
  const baseUrl = getBaseUrl();
  console.log(baseUrl);
  const [error, setError] = useState('');
  useEffect(() => {
    selectedfile && Submithandler();
  }, [selectedfile]);

  console.log('selected', selectedfile);

  useEffect(() => {
    setTimeout(() => {
      selectedfile && typeChecking && selectedfile?.name?.split('.')?.pop()?.toLowerCase() == 'zip'
        ? Submithandler()
        : typeChecking && (setSelectedfile(''), setFileAddress(''));
    }, 1300);
  }, [selectedfile]);

  useEffect(() => {
    setSelectedfile();
  }, [count]);

  const onchangehandler = (event) => {
    if (multiple) {
      console.log(event.target.files);
    } else {
      setSelectedfile(event.target.files[0]);
      id && setid && setid(Number(event.target.className));
    }
  };

  const Submithandler = async () => {
    const formData = new FormData();
    formData.append('requiresSigning', requiresSigning);
    formData.append('File', selectedfile);
    await axios
      .post(getBaseUrl() + '/Blob/Upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => setFileAddress(res?.data?.data?.path))
      .catch(() => setError('خطا! در بارگذاری فایل ناموفق '))
      .finally(() =>
        setTimeout(() => {
          setError('');
        }, 1800)
      );
  };

  useMemo(() => {
    !fileAddress && selectedfile && setSelectedfile();
  }, [fileAddress, error]);
  console.log('error', error);

  return (
    <div
      onClick={() => inputRef.current.click()}
      className="w-full flex flex-col gap-y-2 justify-start items-center cursor-pointer">
      <label
        htmlFor="file"
        className={` ${
          label ? ' flex ' : ' hidden'
        }  w-full lg:justify-start items-center text-xs text-[#787878]`}>
        {' '}
        {label}
        {guide && (
          <a
            rel="noreferrer"
            // href={guideFile}
            target="_blank"
            className="text-[9px] w-full text-start flex justify-start font-medium  text-neutral-200 ">
            {guide}
          </a>
        )}
      </label>
      <form
        onSubmit={Submithandler}
        className={`w-full relative ${
          (typeChecking &&
            selectedfile &&
            selectedfile?.name?.split('.')?.pop()?.toLowerCase() !== 'zip') ||
          error
            ? '  border-red-500 text-red-500 rounded-md '
            : style
              ? style
              : ' rounded-md  bg-transparent w-full h-[42px]  '
        } text-center  border border-gray-900w  flex justify-end px-1 items-center  text-base focus:ring-0 focus:outline-none `}>
        <input
          type="file"
          name="file"
          onChange={(event) => onchangehandler(event)}
          ref={inputRef}
          hidden
          className={count && count + 'bg-bg hidden'}
          multiple={multiple}
        />
        <div
          className={`pr-2  ${
            textDefaultColor && selectedfile ? 'text-sm font-medium' : ' text-xs '
          }  text-center ${error ? ' text-red-main' : 'text-gray-main'} w-full  px-1`}>
          {error
            ? error
            : selectedfile
              ? fileAddress && selectedfile?.name
              : placeHolder
                ? placeHolder
                : ''}
        </div>
        {icon && <InlineSVG src={upload} className=" absolute top-2 left-3 " />}
        <button
          className="flex align-baseline relative  text-center -mt-0 text-accent font-medium text-sm"
          type="submit"
        />
      </form>
      <span className="text-red-500 text-base  w-full text-start flex justify-start">
        {typeChecking &&
          selectedfile &&
          selectedfile?.name?.split('.')?.pop()?.toLowerCase() !== 'zip' &&
          'فایل باید با پسوند zip باشد'}
      </span>
    </div>
  );
}

export default FileUploadPage;
