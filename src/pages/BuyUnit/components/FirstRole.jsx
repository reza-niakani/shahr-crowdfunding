import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';
import React, { useState } from 'react';

function FirstRole({ setStep }) {
  const [role, setRole] = useState({ firstRole: false, seccondRole: false });

  const handelCheck = (key) => {
    setRole((prev) => ({ ...prev, [key]: role?.[key] ? false : true }));
  };
  const isMobile = useDeviceDetection();
  const disabled = Boolean(role?.seccondRole) && Boolean(role?.firstRole);
  return (
    <div className="w-full flex flex-col justify-start items-center gap-y-2">
      <span className="w-full text-start font-bold text-base  ">قوانین و مقررات سرمایه‌گذاری</span>

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
          __html: `«تامین مالی جمعی» به‌عنوان روشی برای سرمایه‌گذاری، مشابه سایر روش‌ها، متضمن ریسک‌هایی برای تامین‌کننده است و سبد گردان بانک ملت به‌عنوان عامل مجاز، برخی از خطرات این سرمایه‌گذاری را در اجرای مواد ۲۹ و ۳۰ «دستورالعمل تامین مالی جمعی»، به شرح زیر به اطلاع تامین‌کنندگان محترم می‌رساند:<br><br>
    ۱- در تامین مالی جمعی، متقاضی با استفاده از وجوه، اقدام به راه‌اندازی و توسعه کسب‌وکار اقتصادی برای تحصیل سود می‌نماید اما سودآوری طرح، قطعی نیست. علاوه بر این از آن‌جا که متقاضیان و تامین‌کنندگان مستند به ماده ۲ «دستورالعمل تامین مالی جمعی» در سود و زیان طرح‌ها شریک هستند، در صورت شکست یا انحراف طرح، احتمال ضرر یا از بین رفتن سرمایه تامین‌کننده، وجود دارد. ضمناً در صورت انحراف برنامه کسب‌وکار متقاضی از برنامه پیش‌بینی‌شده و نکول متقاضی در پرداخت، عامل در راستای حفظ منافع تامین‌کنندگان و در چارچوب قراردادهای مربوط، اقدامات مقتضی را انجام مي‌دهد.<br><br>
    ۲- با توجه به نبود ضامن نقدشوندگی طی دوره (تا سررسید)، دسترسی به وجه سرمایه‌گذاری‌شده پیش از موعد سررسید و نقل‌وانتقال گواهی شراکت آن جز در صورت تجویز مقررات و با رعایت کلیه الزامات آن‌ها، وجود نخواهد داشت.<br><br>
    ۳- عامل در محدوده قوانین، مقررات و توافقات فی‌مابین، مسئول بررسی صحت اسناد و مدارک و ارائه خدمات مربوط به تامین مالی جمعی است. به همین دلیل، در راستای اجرای ماده ۳۲ «دستورالعمل تامین مالی جمعی» عامل توصیه به سرمایه‌گذاری در هیچ طرح خاصی نخواهد کرد.`
        }}
      />

      <div className="w-full flex lg:flex-row flex-col lg:items-center items-start h-auto gap-5 justify-between pt-3 ">
        <button
          disabled={!disabled}
          onClick={() => setStep('seccondRole')}
          className={`w-[115px] lg:h-[48px] h-[38px] bg-[#C9B777] ${
            !disabled && ' opacity-60'
          } text-white text-sm font-medium rounded-md text-center flex justify-center items-center focus:outline-none focus:ring-0 focus:border-none`}>
          ادامه
        </button>
        <div className="w-auto flex flex-col  items-start lg:h-[48px] h-[38px] justify-between gap-y-2  ">
          {/* first role */}
          <div
            className=" w-full flex justify-start items-center gap-x-2 flex-nowrap cursor-pointer "
            onClick={() => handelCheck('firstRole')}>
            <input
              onClick={() => handelCheck('firstRole')}
              type="checkbox"
              checked={role?.firstRole}
              className="w-4 h-4 focus:outline-none focus:ring-0  text-[#364A87] border border-[#364A87] rounded-sm "
            />
            <span className="text-nowrap text-gray-main text-xs">
              پذیرش قوانین و مقررات سرمایه‌گذاری{' '}
            </span>
          </div>
          {/* seccend role */}
          <div
            className=" w-full flex justify-start items-center gap-x-2 flex-nowrap cursor-pointer"
            onClick={() => handelCheck('seccondRole')}>
            <input
              onClick={() => handelCheck('seccondRole')}
              type="checkbox"
              checked={role?.seccondRole}
              className="w-4 h-4 focus:outline-none focus:ring-0  text-[#364A87] border border-[#364A87] rounded-sm "
            />
            <span className="text-nowrap text-gray-main text-xs">پذیرش مفاد قرارداد سه جانبه </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstRole;
