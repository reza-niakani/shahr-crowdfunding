/* eslint-disable no-unused-vars */
import { Dialog, Transition } from '@headlessui/react';
import DataContext from 'comon/context/MainContext';
import Status from 'comon/GlobalyComponnetsUsed/Status';
import WorkHistory from 'pages/AboutUs/component/WorkHistory';
import BuyUnit from 'pages/BuyUnit/BuyUnit';
import RegisterFinancialReport from 'pages/RegisterFinancialReport/RegisterFinancialReport';
import RegisterPlan from 'pages/RegisterPlan/RegisterPlan';
import { Fragment, useContext } from 'react';
import mainlog from 'asset/Pictures/logo/CompanyMainLogo.svg';
import InlineSVG from 'react-inlinesvg';
import close from 'asset/Pictures/Icons/closeCircle.svg';

export default function GlobalyModal() {
  const { modal, setModal } = useContext(DataContext);

  const ComponentHandler = () => {
    switch (modal?.type) {
      case 'buyUnit':
        return <BuyUnit />;
      case 'failed':
        return <Status />;
      case 'success':
        return <Status />;
      case 'registerPlan':
        return <RegisterPlan />;
      case 'registerFinancialReport':
        return <RegisterFinancialReport />;
      case 'workHistory':
        return <WorkHistory data={modal?.data} />;
      case 'riskWarining':
        return (
          <div className=" flex flex-col justify-start items-center gap-y-8 bg-white p-5  lg:w-[50vw] w-[90vw] rounded-lg ">
            <div className="w-full flex justify-end items-center">
              <InlineSVG src={close} onClick={() => setModal()} className="cursor-pointer" />
            </div>
            <InlineSVG src={mainlog} className="w-[50%]" />
            <span className="w-full text-center font-bold text-base text-accent-600  ">
              بیانیه ریسک{' '}
            </span>
            <div
              dir="rtl"
              className="relative text-right max-h-[600px] overflow-y-auto text-sm font-light text-[#575555] w-full leading-[30px] lg:pb-10"
              style={{
                WebkitMaskImage:
                  'linear-gradient(0deg, rgba(255,255,255,0) 0%, #ffffff 14%, #ffffff 100%)',
                maskImage: 'linear-gradient(0deg, rgba(255,255,255,0) 0%, #ffffff 7%, #ffffff 100%)'
              }}>
              {/* <p className="mb-4">
                «تامین مالی جمعی» به‌عنوان روشی برای سرمایه‌گذاری، مشابه سایر روش‌ها، متضمن
                ریسک‌هایی برای تامین‌کننده است و شهرکراد به‌عنوان عامل مجاز، برخی از خطرات این
                سرمایه‌گذاری را در اجرای مواد ۲۹ و ۳۰ «دستورالعمل تامین مالی جمعی»، به شرح زیر به
                اطلاع تامین‌کنندگان محترم می‌رساند:
              </p>

              <ol className="space-y-4 list-decimal pr-5">
                <li>
                  در تامین مالی جمعی، متقاضی با استفاده از وجوه، اقدام به راه‌اندازی و توسعه
                  کسب‌وکار اقتصادی برای تحصیل سود می‌نماید اما سودآوری طرح، قطعی نیست...
                </li>

                <li>
                  با توجه به نبود ضامن نقدشوندگی طی دوره (تا سررسید)، دسترسی به وجه سرمایه‌گذاری‌شده
                  پیش از موعد سررسید و نقل‌وانتقال گواهی شراکت آن جز در صورت تجویز مقررات و با رعایت
                  کلیه الزامات آن‌ها، وجود نخواهد داشت.
                </li>

                <li>
                  عامل در محدوده قوانین، مقررات و توافقات فی‌مابین، مسئول بررسی صحت اسناد و مدارک و
                  ارائه خدمات مربوط به تامین مالی جمعی است...
                </li>

                <li>
                  تامین مالی جمعی در بستر قوانین و مقررات مربوط انجام شده و کلیه ذی‌نفعان ملزم به
                  اطلاع و رعایت آن‌ها هستند...
                </li>

                <li>
                  اعطای مجوز فعالیت به عامل توسط کارگروه ارزیابی تامین مالی جمعی و فرابورس ایران به
                  منظور حصول اطمینان از رعایت قوانین و مقررات و شفافیت اطلاعاتی است...
                </li>

                <li>
                  اعلام ریسک‌های فوق به معنی سلب مسئولیت از عامل نبوده و از آن‌جا که عامل با اطلاع
                  از قوانین و مقررات مربوط در حدود تکالیف مقرراتی، قراردادی و حرفه‌ای خود اقدام به
                  فعالیت می‌نماید، در صورت قصور یا تقصیر...
                </li>
              </ol>

              <p className="mt-6">
                به‌موجب این سند، این‌جانب/ این شرکت .................... اقرارنامه و بیانیه ریسک
                سرمایه‌گذاری در تامین مالی جمعی را دریافت و مطالعه نموده و ضمن اعلام اطلاع از کلیه
                قوانین، مقررات و خصوصیات این‌گونه از سرمایه‌گذاری و ریسک‌هایی که در آن متصور می‌باشد
                (از جمله و نه محدود به ریسک‌های مورد اشاره در این سند) مراتب را تایید نموده و با علم
                به آن‌ها در این زمینه فعالیت می‌نماید.
              </p> */}
            </div>
          </div>
        );
      case 'privacyPolicy':
        return (
          <div className=" flex flex-col justify-start items-center gap-y-8 bg-white p-5  lg:w-[50vw] w-[90vw] rounded-lg ">
            <div className="w-full flex justify-end items-center">
              <InlineSVG src={close} onClick={() => setModal()} className="cursor-pointer" />
            </div>
            <InlineSVG src={mainlog} />
            <span className="w-full text-center font-bold text-base text-accent-600  ">
              سیاست محرمانگی
            </span>{' '}
            <div
              dir="rtl"
              className="relative text-right max-h-[700px] overflow-y-auto text-sm font-light text-[#575555] w-full leading-[30px] lg:pb-10"
              style={{
                WebkitMaskImage:
                  'linear-gradient(0deg, rgba(255,255,255,0) 0%, #ffffff 14%, #ffffff 100%)',
                maskImage:
                  'linear-gradient(0deg, rgba(255,255,255,0) 0%, #ffffff 10%, #ffffff 100%)'
              }}>
              <ol className="list-decimal pr-5 space-y-4">
                <li>
                  کاربران محترم شهرکراد؛ سکو برای ارائه بهتر و رعایت الزامات کارگروه تامین مالی جمعی
                  شرکت فرابورس ایران و برحسب خدمت از اطلاعات شخصی شما همچون نام و نام خانوادگی،
                  شماره تماس، کد ملی، ایمیل و ... را درخواست نماید.
                </li>
                <li>
                  شهرکراد جهت بروز رسانی اطلاعات سجام کاربران خود، شرایطی را محیا نموده تا با بروز
                  رسانی اطلاعات هویتی ثبت شده در سجام، سود سرمایه‌گذاری‌های خود به حساب تعریف شده در
                  سجام انتقال دهند.
                </li>
                <li>
                  شهرکراد برای بهبود تجربه کاربری، از «کوکی‌ها» استفاده کند. مرورگرهای اینترنت،
                  کوکی‌ها را برای پیگیری و گاهی ردگیری اطلاعات خاصی بر روی کامپیوتر کاربر ذخیره
                  می‌کنند. کاربران می‌توانند مرورگر خود را تنظیم کنند تا کوکی‌ها را ذخیره نکند و یا
                  در هنگام ذخیره هشدار دهد. اگر کاربر از این امکان استفاده کند ممکن است بخش‌هایی از
                  سایت به درستی عمل نکند.
                </li>
                <li>
                  شهرکراد برای جلوگیری از دسترسی بدون مجوز و غیرقانونی به اطلاعات وب‌سایت و کاربران
                  آن، اقدام‌های امنیتی را تا جایی که در توانش است، برقرار کرده‌ است و همواره امنیت
                  کاربران و اطلاعات آن‌ها از اولویت‌هایش است. با این وجود شهرکراد هیچ تضمینی را در
                  خصوص نفوذ غیرقانونی به سامانه‌هایش ارائه نمی‌دهد.
                </li>
                <li>
                  شهرکراد اطلاعات شخصی کاربران و بازدیدکنندگانش را به دیگران نفروخته و اجاره
                  نمی‌دهد. شهرکراد ممکن است از نرم‌افزارها و سرویس‌دهنده‌هایی برای ارائه خدمات به
                  کاربرانش استفاده کند. در این شرایط اطلاعات کاربران تحت نظارت وب‌سایت شهرکراد توسط
                  این سرویس‌ها و نرم‌افزارها استفاده خواهد شد.
                </li>
                <li>
                  شهرکراد اطلاعات کاربران را در پاسخ به درخواست احضاریه، درخواست دادگاه یا هر فرایند
                  قانونی مشابه دیگر، و یا دفاع از حقوق قانونی خود در برابر ادعاهای وارده ممکن است به
                  اشتراک بگذارد.
                </li>
              </ol>
              <p className="mt-6">
                تیم اجرایی شهرکراد با تمام همت خود در راستای شعار سازمانی خود &rdquo;زاگرس، نماد
                سرمایه‌گذاری&rdquo; سعی در محیا نمودن محیطی شفاف جهت سرمایه‌گذاری کاربران خود بکار
                خواهد گرفت. سکوی شهرکراد هر زمان که دچار تغییر در سیاست محرمانگی خود گردید آن را در
                همین صفحه اعلام می‌دارد.
              </p>

              <p className="mt-2 text-sm text-gray-600 font-bold ">مدیریت سکو</p>
              <p className="text-sm text-gray-600 mb-10 font-bold">تاریخ: ۱۴۰۴/۰۵/۰۵</p>
            </div>
          </div>
        );
      default:
        break;
    }
  };

  const isOpen = modal ? true : false;
  const closeModal = () => setModal();

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="w-full relative z-[100000000] " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-100"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="relative inset-0 bg-black/25" />
          </Transition.Child>

          <div
            className="fixed inset-0 overflow-y-auto "
            style={{ backgroundColor: ' rgba(24, 24, 26, 0.5)' }}>
            <div className=" flex min-h-full  items-center justify-center   p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="lg:min-w-[30%] rounded-lg   max-w-[1440px] w-[95%] min-h-[500px] flex justify-start items-center flex-col transform   overflow-y-hidden  z-[10000]    align-middle  transition-all">
                  {ComponentHandler()}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
