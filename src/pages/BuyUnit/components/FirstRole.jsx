/* eslint-disable no-unused-vars */
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import React, { useState } from 'react';
import getBaseUrl from 'comon/Axios/getBaseUrl';
import InlineSVG from 'react-inlinesvg';
import download from 'asset/Pictures/Icons/download.svg';

function FirstRole({ setStep, data, file = false }) {
  const [role, setRole] = useState({ firstRole: false, seccondRole: false });

  const handelCheck = (key) => {
    setRole((prev) => ({ ...prev, [key]: role?.[key] ? false : true }));
  };
  const isMobile = useDeviceDetection();
  const disabled = Boolean(role?.seccondRole) && Boolean(role?.firstRole);

  const path = file
    ? file?.find((item) => item?.type == 13)?.path
    : data?.financialStatements?.find((item) => item?.type == 13)?.path;

  console.log('file', file);

  return (
    <div className="w-full flex flex-col justify-start items-center gap-y-2">
      <span className="w-full text-start font-bold text-base  ">
        اقرارنامه و بیانیه پذیرش ریسک سرمایه‌گذاری در تامین مالی جمعی
      </span>

      <div
        dir="rtl"
        className="relative text-right leading-relaxed max-h-[400px] overflow-y-auto w-full text-sm font-light text-[#787878]  lg:pb-10"
        style={{
          WebkitMaskImage:
            !isMobile &&
            'linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 20%, #FFFFFF 100%)',
          maskImage:
            !isMobile &&
            'linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 20%, #FFFFFF 100%)'
        }}
        dangerouslySetInnerHTML={{
          __html: `
<br/>«تامین مالی جمعی» به‌عنوان روشی برای سرمایه‌گذاری، مشابه سایر روش‌ها، متضمن ریسک‌هایی برای تامین‌کننده است و سپهرکراد به‌عنوان عامل مجاز، برخی از خطرات این سرمایه‌گذاری را در اجرای مواد ۲۹ و ۳۰ «دستورالعمل تامین مالی جمعی»، به شرح زیر به اطلاع تامین‌کنندگان محترم می‌رساند:
<br/>۱- در تامین مالی جمعی، متقاضی با استفاده از وجوه، اقدام به راه‌اندازی و توسعه کسب‌وکار اقتصادی برای تحصیل سود می‌نماید اما سودآوری طرح، قطعی نیست. علاوه بر این از آن‌جا که متقاضیان و تامین‌کنندگان مستند به ماده ۲ «دستورالعمل تامین مالی جمعی» در سود و زیان طرح‌ها شریک هستند، در صورت شکست یا انحراف طرح، احتمال ضرر یا از بین رفتن سرمایه تامین‌کننده، وجود دارد. ضمناً در صورت انحراف برنامه کسب‌وکار متقاضی از برنامه پیش‌بینی‌شده و نکول متقاضی در پرداخت، عامل در راستای حفظ منافع تامین‌کنندگان و در چارچوب قراردادهای مربوط، اقدامات مقتضی را انجام مي‌دهد.
<br/>۲- با توجه به نبود ضامن نقدشوندگی طی دوره (تا سررسید)، دسترسی به وجه سرمایه‌گذاری‌شده پیش از موعد سررسید و نقل‌وانتقال گواهی شراکت آن جز در صورت تجویز مقررات و با رعایت کلیه الزامات آن‌ها، وجود نخواهد داشت.
<br/>۳- عامل در محدوده قوانین، مقررات و توافقات فی‌مابین، مسئول بررسی صحت اسناد و مدارک و ارائه خدمات مربوط به تامین مالی جمعی است. به همین دلیل، در راستای اجرای ماده ۳۲ «دستورالعمل تامین مالی جمعی» عامل توصیه به سرمایه‌گذاری در هیچ طرح خاصی نخواهد کرد. همچنین معرفی یا انتشار فراخوان طرح بدون اخذ نماد اختصاصی از فرابورس یا انجام اقدامات مربوط برای تامین مالی جمعی خارج از سکو، ممنوع و بلااثر می‌باشد.
<br/>۴- تامین مالی جمعی در بستر قوانین و مقررات مربوط انجام شده و کلیه ذی‌نفعان ملزم به اطلاع و رعایت آن‌ها هستند. تغییرات قوانین و مقررات نافی علم و آگاهی سرمایه‌گذاران نسبت به آن‌ها نبوده و نظارت کارگروه ارزیابی تامین مالی جمعی بر فرایند مربوط، سالب مسئولیت تامین‌کنندگان در کسب آگاهی‌های مربوط و تعهد آن‌ها به پذیرش ریسک‌های مطرح در سرمایه‌گذاری نخواهد بود.
<br/>۵- اعطای مجوز فعالیت به عامل توسط کارگروه ارزیابی تامین مالی جمعی و فرابورس ایران به منظور حصول اطمینان از رعایت قوانین و مقررات و شفافیت اطلاعاتی است. اعطای این مجوزها به معنی نظارت تمام عیار بر تمامی متقاضیان و تامین‌کنندگان یا تایید مزایا و تضمین سودآوری فعالیت‌های آن‌ها نبوده و هیچ‌یک از مجوزهای اعطاشده توسط فرابورس ایران مبنی بر تایید طرحی خاص یا توصیه به سرمایه‌گذاری در آن نیست. کارگروه ارزیابی تامین مالی جمعی و فرابورس ایران در خصوص ضرر و زیان ناشی از اتکا به تمام یا بخشی از مندرجات اسناد و مدارک مربوط، از خود سلب مسئولیت می‌نماید.
<br/>۶- اعلام ریسک‌های فوق به معنی سلب مسئولیت از عامل نبوده و از آن‌جا که عامل با اطلاع از قوانین و مقررات مربوط در حدود تکالیف مقرراتی، قراردادی و حرفه‌ای خود اقدام به فعالیت می‌نماید، در صورت قصور یا تقصیر از تکالیف مذکور، حسب مورد از حیث مدنی، کیفری یا انضباطی مسئول خواهد بود. به هر ترتیب، سرمایه‌گذاران می­توانند در صورت مشاهده هر گونه تخلف از مقررات حاکم بر تامین مالی جمعی مراتب را با فرابورس ایران مکاتبه نمایند.
<br/>به‌موجب این سند، این‌جانب/ این شرکت .................... اقرارنامه و بیانیه ریسک سرمایه‌گذاری در تامین مالی جمعی را دریافت و مطالعه نموده و ضمن اعلام اطلاع از کلیه قوانین، مقررات و خصوصیات این‌گونه از سرمایه‌گذاری و ریسک‌هایی که در آن متصور می‌باشد (از جمله و نه محدود به ریسک‌های مورد اشاره در این سند) مراتب را تایید نموده و با علم به آن‌ها در این زمینه فعالیت می‌نماید.`
        }}
      />

      <div className="w-full flex lg:flex-row flex-col   lg:items-center items-start h-auto gap-5 justify-between pt-3 ">
        <button
          disabled={!disabled}
          onClick={() => setStep('setamount')}
          className={`w-[115px] lg:h-[48px] h-[38px] bg-accent-1000 ${
            !disabled && ' opacity-60'
          } text-white text-sm font-medium rounded-md text-center flex justify-center items-center focus:outline-none focus:ring-0 focus:border-none`}>
          ادامه
        </button>
        <div className="lg:w-[50%] w-full flex flex-col  items-start lg:h-[48px] h-[38px] justify-between gap-y-2  ">
          {/* first role */}
          <div
            className=" w-full flex justify-start items-start gap-x-2 flex-nowrap cursor-pointer "
            onClick={() => handelCheck('firstRole')}>
            <input
              onClick={() => handelCheck('firstRole')}
              type="checkbox"
              checked={role?.firstRole}
              className="w-4 h-4 focus:outline-none focus:ring-0  text-[#364A87] border border-[#364A87] rounded-sm "
            />
            <span className="text-wrap text-gray-700 text-xs text-start ">
              اقرارنامه و بیانیه پذیرش ریسک سرمایه گذاری در تامین مالی جمعی{' '}
            </span>
          </div>
          {/* seccend role */}
          <div className=" w-full flex justify-start items-center gap-x-2 flex-nowrap cursor-pointer">
            <input
              onClick={() => handelCheck('seccondRole')}
              type="checkbox"
              checked={role?.seccondRole}
              className="w-4 h-4 focus:outline-none focus:ring-0  text-[#364A87] border border-[#364A87] rounded-sm "
            />
            <span className="text-nowrap flex justify-start items-start  flex-nowrap text-gray-700 text-xs">
              پذیرش مفاد
              <a
                rel="noreferrer"
                type="download"
                target="_blank"
                href={file && getBaseUrl() + '/' + path}
                className=" text-xs   text-end underline hover:text-accent-900 cursor-pointer ">
                قرارداد
              </a>{' '}
              با سرمایه‌گذار{' '}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstRole;
