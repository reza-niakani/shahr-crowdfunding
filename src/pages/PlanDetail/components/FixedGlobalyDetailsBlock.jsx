/* eslint-disable no-unused-vars */
import AccordionFaqModel from 'comon/Accordion/AccordionFaqModel';
import getBaseUrl from 'comon/Axios/getBaseUrl';
import DateFunctions from 'comon/DateFunction/DateFunctions';
import { shareHoldersEnum } from 'comon/DB/PositionTypeEnum';
import { FindFromArrayById, FormatTextWithLineBreaks } from 'comon/GlobalyTools/UseAbleFunctions';
import React, { useState } from 'react';
import SendComplainAndComments from './SendComplainAndComments';
import AllComments from './AllComments';
import download from 'asset/Pictures/Icons/downloadIcon.svg';
import InlineSVG from 'react-inlinesvg';

function FixedGlobalyDetailsBlock({ mainData, token }) {
  console.log(mainData);
  const [isOpenFaq, setIsOpenFaq] = useState(false);

  const openAccordinFaq = (id) => {
    if (isOpenFaq == id) {
      setIsOpenFaq();
    } else {
      setIsOpenFaq(id);
    }
  };
  const CompanyInfo = [
    { title: 'نام شرکت:', data: mainData?.companyInfo?.legalPerson?.companyName },
    {
      title: 'استان محل ثبت:',
      data: mainData?.companyInfo?.legalPerson?.registerPlace || 'نامشخص'
    },
    { title: 'وب‌سایت:', data: mainData?.companyInfo?.legalPerson?.website || 'ندارد' },
    { title: 'شناسه ملی شرکت:', data: mainData?.companyInfo?.username },
    {
      title: 'تاریخ ثبت:',
      data:
        mainData?.companyInfo?.legalPerson?.registerDate &&
        DateFunctions.getDate(mainData?.companyInfo?.legalPerson?.registerDate)
    },
    { title: 'شماره ثبت:', data: mainData?.companyInfo?.legalPerson?.registerNumber }
  ];

  const ValidDocuments =
    mainData?.documents && mainData?.documents?.filter((item) => item?.type !== 6);

  const ValidPeriodictReports =
    mainData?.documents && mainData?.documents?.filter((item) => item?.type == 6);

  const filterrequierData = (type, array) => array?.find((item) => item?.id == type);

  return (
    <div className="lg:w-[48%] w-full flex flex-col lg:min-w-[660px] min-w-[320px] items-center justify-start gap-y-5 lg:sticky lg:top-5  h-[80%]">
      {/* image */}
      <img
        src={getBaseUrl() + '/' + mainData?.plandata?.coverImagePaths?.[0]?.value}
        className="w-full rounded-large h-[240px] lg:h-[360px]"
      />
      <span className="text-start w-full font-bold lg:text-2xl text-base ">
        {mainData?.plandata?.title}
      </span>
      <AccordionFaqModel
        isOpen={isOpenFaq == 'description'}
        setIsOpen={() => openAccordinFaq('description')}
        component={true}
        answer={
          <div className="w-full flex flex-col items-center justify-start gap-y-5 ">
            {FormatTextWithLineBreaks(mainData?.plandata?.description)}
            <span className="text-start sticky top-0 bg-gray-100  w-full border-b-2 border-[#01b69b91] py-2 font-semibold lg:text-base text-sm  ">
              فایل ارزیابی طرح{' '}
            </span>
            <div className="w-[98%] flex  items-center justify-between ">
              <span className="w-auto text-sm font-semibold text-accent-900 "> فایل ارزیابی </span>{' '}
              {mainData?.documents && filterrequierData(10, mainData?.documents) ? (
                <a
                  rel="noreferrer"
                  type="download"
                  target="_blank"
                  href={(getBaseUrl() + '/', filterrequierData(1, mainData?.documents)?.path)}
                  className=" lg:text-sm text-xs  font-bold text-end underline hover:text-accent-900  flex cursor-pointer justify-center items-center ">
                  دانلود
                  <InlineSVG src={download} />
                </a>
              ) : (
                <span className=" w-auto text-sm  text-gray-600  "> فایلی بارگذاری نشده </span>
              )}
            </div>
          </div>
        }
        question="معرفی طرح"
        bgColor="bg-gray-200 rounded-large"
      />
      <AccordionFaqModel
        component={true}
        isOpen={isOpenFaq == 'baseInfo'}
        setIsOpen={() => openAccordinFaq('baseInfo')}
        answer={
          <div className="w-full h-auto flex flex-col items-center justify-between gap-y-5 text-gray-main ">
            {/* base info */}
            {CompanyInfo?.map((item, index) => (
              <div
                key={index}
                className={`w-full flex justify-between items-center py-3 ${
                  index != 5 && 'border-b'
                } border-[#01B69B1A] text-gray-main `}>
                <span className="lg:text-sm text-xs text-start ">{item?.title}</span>
                <span className="lg:text-sm text-xs  font-bold text-end">{item?.data}</span>
              </div>
            ))}
            {/* stock holder */}
            <span className="text-start sticky top-0 bg-gray-100  w-full border-b-2 border-[#01b69b91] py-2 font-semibold lg:text-base text-sm  ">
              هیات مدیره و مدیر عامل
            </span>
            {mainData?.companyInfo?.stakeholders?.map((item, index) => (
              <div
                key={index}
                className={`w-full flex justify-between items-center py-3 ${
                  index !== mainData?.companyInfo?.stakeholders?.length - 1 && 'border-b'
                } border-[#01B69B1A] text-gray-main `}>
                <span className="lg:text-sm text-xs text-start ">
                  {item?.firstName}
                  {'  '} {item?.lastName}
                </span>
                <span className="lg:text-sm text-xs  font-bold text-end">
                  {' '}
                  {item?.positionType
                    ? FindFromArrayById(shareHoldersEnum, item?.positionType)?.name
                    : ' --- '}
                </span>
              </div>
            ))}
            {/* share holder */}
            <span className="text-start sticky top-0 bg-gray-100  w-full border-b-2 border-[#01b69b91] py-2 font-semibold lg:text-base text-sm  ">
              سهامداران
            </span>
            {mainData?.companyInfo?.shareHolders?.length > 0 ? (
              mainData?.companyInfo?.shareHolders?.map((item, index) => (
                <div
                  key={index}
                  className={`w-full flex justify-between items-center py-3 ${
                    index !== mainData?.companyInfo?.shareHolders?.length - 1 && 'border-b'
                  } border-[#01B69B1A] text-gray-main `}>
                  <span className="lg:text-sm text-xs text-start ">
                    {item?.firstName}
                    {'  '} {item?.lastName}
                  </span>
                  <span className="lg:text-sm text-xs text-start ">
                    %{item?.percentageVotingRight}
                  </span>
                  <span className="lg:text-sm text-xs  font-bold text-end">
                    {' '}
                    {item?.positionType
                      ? FindFromArrayById(shareHoldersEnum, item?.positionType)?.name
                      : ' --- '}
                  </span>
                </div>
              ))
            ) : (
              <span className="w-full text-center py-4 text-base font-semibold text-gray-main">
                موردی یافت نشد !
              </span>
            )}
          </div>
        }
        question="اطلاعات شرکت"
        bgColor="bg-gray-200 rounded-large"
      />

      <AccordionFaqModel
        component={true}
        isOpen={isOpenFaq == 'documents'}
        setIsOpen={() => openAccordinFaq('documents')}
        answer={
          <div className="w-full h-auto flex flex-col items-center justify-between gap-y-5 text-gray-main ">
            {/* base info */}
            {token ? (
              ValidDocuments && ValidDocuments?.length > 0 ? (
                ValidDocuments?.map((item, index) => (
                  <div
                    key={index}
                    className={`w-full flex justify-between items-center py-2 ${
                      index !== ValidDocuments?.length - 1 && 'border-b'
                    } border-[#01B69B1A] text-gray-main `}>
                    <span className="lg:text-sm text-xs text-start "> {item?.description}</span>
                    <a
                      rel="noreferrer"
                      type="download"
                      target="_blank"
                      href={getBaseUrl() + '/' + item?.path}
                      className=" lg:text-sm text-xs  font-bold text-end underline hover:text-accent-900  flex cursor-pointer justify-center items-center ">
                      دانلود
                      <InlineSVG src={download} />
                    </a>
                  </div>
                ))
              ) : (
                <span className="w-full text-center py-4 text-base font-semibold text-gray-main">
                  مدارک و مستنداتی برای این طرح بارگذاری نشده است!
                </span>
              )
            ) : (
              <span className="w-full text-center py-4 text-base font-semibold text-gray-main">
                برای مشاهده این قسمت لطفا وارد شوید!
              </span>
            )}
          </div>
        }
        question="مدارک و مستندات"
        bgColor="bg-gray-200 rounded-large"
      />
      <AccordionFaqModel
        component={true}
        isOpen={isOpenFaq == 'ValidPeriodictReports'}
        setIsOpen={() => openAccordinFaq('ValidPeriodictReports')}
        answer={
          <div className="w-full h-auto flex flex-col items-center justify-between gap-y-5 text-gray-main ">
            {/* base info */}
            {token ? (
              ValidPeriodictReports && ValidPeriodictReports?.length > 0 ? (
                ValidPeriodictReports?.map((item, index) => (
                  <div
                    key={index}
                    className={`w-full flex justify-between items-center py-2 ${
                      index !== ValidPeriodictReports?.length - 1 && 'border-b'
                    } border-[#01B69B1A] text-gray-main `}>
                    <span className="lg:text-sm text-xs text-start "> {item?.description}</span>
                    <a
                      rel="noreferrer"
                      type="download"
                      target="_blank"
                      href={getBaseUrl() + '/' + item?.path}
                      className=" lg:text-sm text-xs  font-bold text-end underline hover:text-accent-900  flex cursor-pointer justify-center items-center ">
                      دانلود
                      <InlineSVG src={download} />
                    </a>
                  </div>
                ))
              ) : (
                <span className="w-full text-center py-4 text-base font-semibold text-gray-main">
                  گزارش دور‌ای برای این طرح بارگذاری نشده است!
                </span>
              )
            ) : (
              <span className="w-full text-center py-4 text-base font-semibold text-gray-main">
                برای مشاهده این قسمت لطفا وارد شوید!
              </span>
            )}
          </div>
        }
        question="گزارش های دوره ای"
        bgColor="bg-gray-200 rounded-large"
      />
      <AccordionFaqModel
        component={true}
        isOpen={isOpenFaq == 'valueSum'}
        setIsOpen={() => openAccordinFaq('valueSum')}
        answer={
          <div className="w-full h-auto flex flex-col items-center justify-between gap-y-5 text-gray-main ">
            <div className="w-full flex  justify-between items-center text-gray-main text-sm font-medium">
              <span>جمع مبلغ سرمایه‌گذاری حقیقی (ریال)</span>
              <span>
                {' '}
                {Number(mainData?.plandata?.individualInvestorValueSum).toLocaleString() || 0}{' '}
              </span>
            </div>
            <div className="w-full flex  justify-between items-center text-gray-main text-sm font-medium">
              <span>جمع مبلغ سرمایه‌گذاری حقوقی (ریال)</span>
              <span>
                {' '}
                {Number(mainData?.plandata?.legalInvestorValueSum).toLocaleString() || 0}{' '}
              </span>
            </div>

            <span className="text-start sticky top-0 bg-gray-100  w-full border-b-2 border-[#01b69b91] py-2 font-semibold lg:text-base text-sm  ">
              اسامی سرمایه گذاران قابل مشاهده{' '}
            </span>
            <div className="w-full h-auto gap-4 flex flex-wrap items-center justify-between ">
              {' '}
              {mainData?.Investors?.length > 0 && mainData?.Investors ? (
                mainData?.Investors?.map((item, index) => (
                  <span
                    key={index}
                    className={`lg:text-sm text-xs text-start  w-auto text-nowrap  text-gray-main `}>
                    {item}{' '}
                  </span>
                ))
              ) : (
                <span className="w-full text-center py-4 text-base font-semibold text-gray-main">
                  سرمایه گذار قابل مشاهده‌ایی یافت نشد{' '}
                </span>
              )}
            </div>
          </div>
        }
        question="سرمایه گذاران"
        bgColor="bg-gray-200 rounded-large"
      />
      <AccordionFaqModel
        component={true}
        isOpen={isOpenFaq == 'evalueationInvestee'}
        setIsOpen={() => openAccordinFaq('evalueationInvestee')}
        answer={
          <div className="w-full h-auto flex flex-col items-center justify-between gap-y-5 text-gray-main ">
            {mainData?.companyInfo?.investeeAssessments &&
            mainData?.companyInfo?.investeeAssessments?.length > 0 ? (
              mainData?.companyInfo?.investeeAssessments?.map((item, index) => (
                <span
                  key={index}
                  className="w-full  text-start text-sm  text-gray-600 border-t border-accent-300 pt-3   ">
                  {item}{' '}
                </span>
              ))
            ) : (
              <span> موردی یافت نشد</span>
            )}{' '}
            <div className="w-[98%] flex  border-t border-accent-600 pt-5 items-center justify-between ">
              <span className="w-auto text-sm font-semibold text-accent-900   ">
                {' '}
                فایل ارزیابی{' '}
              </span>
              {mainData?.documents && filterrequierData(14, mainData?.documents) ? (
                <a
                  rel="noreferrer"
                  type="download"
                  target="_blank"
                  href={(getBaseUrl() + '/', filterrequierData(14, mainData?.documents)?.path)}
                  className=" lg:text-sm text-xs  font-bold text-end underline hover:text-accent-900  flex cursor-pointer justify-center items-center ">
                  دانلود
                  <InlineSVG src={download} />
                </a>
              ) : (
                <span className=" w-auto text-sm  text-gray-600  "> فایلی بارگذاری نشده </span>
              )}{' '}
            </div>
          </div>
        }
        question=" اعتبارسنجی و حسن سابقه متقاضی "
        bgColor="bg-gray-200 rounded-large"
      />
      <AccordionFaqModel
        isOpen={isOpenFaq == 'evalueationPlan'}
        setIsOpen={() => openAccordinFaq('evalueationPlan')}
        component={true}
        answer={
          <div className="w-full h-auto flex flex-col items-center justify-between gap-y-5 text-gray-main ">
            {mainData?.PlanAssessments && mainData?.PlanAssessments?.length > 0 ? (
              mainData?.PlanAssessments?.map((item, index) => (
                <span
                  key={index}
                  className="w-[98%]  border-t border-accent-600 pt-3 text-start text-sm  text-gray-600   ">
                  {item}{' '}
                </span>
              ))
            ) : (
              <span> موردی یافت نشد</span>
            )}{' '}
            <div className="w-[98%] flex  border-t border-accent-600 pt-5 items-center justify-between ">
              <span className="w-auto text-sm font-semibold text-accent-900 "> فایل ارزیابی </span>
              {mainData?.documents && filterrequierData(15, mainData?.documents) ? (
                <a
                  rel="noreferrer"
                  type="download"
                  target="_blank"
                  href={(getBaseUrl() + '/', filterrequierData(15, mainData?.documents)?.path)}
                  className=" lg:text-sm text-xs  font-bold text-end underline hover:text-accent-900  flex cursor-pointer justify-center items-center ">
                  دانلود
                  <InlineSVG src={download} />
                </a>
              ) : (
                <span className=" w-auto text-sm  text-gray-600  "> فایلی بارگذاری نشده </span>
              )}{' '}
            </div>
          </div>
        }
        question=" ارزیابی ریسک طرح "
        bgColor="bg-gray-200 rounded-large"
      />
      <AccordionFaqModel
        component={true}
        isOpen={isOpenFaq == 'registerComplain'}
        setIsOpen={() => openAccordinFaq('registerComplain')}
        answer={<SendComplainAndComments />}
        question="ثبت نظر و شکایت "
        bgColor="bg-gray-200 rounded-large"
      />
      <AccordionFaqModel
        isOpen={isOpenFaq == 'comments'}
        setIsOpen={() => openAccordinFaq('comments')}
        component={true}
        answer={<AllComments />}
        question="نظرات طرح"
        bgColor="bg-gray-200 rounded-large"
      />
    </div>
  );
}

export default FixedGlobalyDetailsBlock;
