const ErrorEnum = [
  { name: 'کاربر مسدود شده است', key: 'USER_BLOCKED' },
  { name: 'کاربر مسدود شده است', key: 'USER_LOCKEDOUT' },
  { name: 'کد امنیتی اشتباه است', key: 'INVALID_CAPTCHA' },
  { name: 'طرح یافت نشد', key: 'PLAN_NOT_FOUND' },
  { name: 'مبلغ پرداختی اشتباه است', key: 'INVALID_PAYMENT_AMOUNT' },
  { name: 'تراکنش یافت نشد', key: 'TRANSACTION_NOT_FOUND' },
  { name: 'فقط تراکنش های در دست ثبت قرار دارند', key: 'ONLY_PENDING_FLOWS' },
  { name: 'مبلغ پرداختی با مبلغ ثبت شده مطابقت ندارد', key: 'PAYMENT_AMOUNT_DISCREPANCY' },
  { name: 'تراکنش تکراری است', key: 'DUPLICATE_PAYMENT' },
  {
    name: 'ثبت سفارش خارج از بازه زمانی پذیره نویسی امکان پذیر نمی باشد',
    key: 'UNDERWRTING_PERIOD'
  },
  { name: `درخواست شما بالاتر از سقف سرمایه گذاری فرد حقوقی می باشد`, key: 'LEGAL_MAX_ORDER' },
  { name: `درخواست شما پایین تر از کف سرمایه گذاری فرد حقوقی می باشد`, key: 'LEGAL_MIN_ORDER' },
  { name: `درخواست شما بالاتر از سقف سرمایه گذاری فرد حقیقی می باشد`, key: 'INDIVIDUAL_MAX_ORDER' },
  {
    name: `درخواست شما پایین تر از کف سرمایه گذاری فرد حقیقی می باشد`,
    key: 'INDIVIDUAL_MIN_ORDER'
  },
  {
    name: `کد پیامک شده بدرستی وارد نشده`,
    key: 'not valid otp'
  },
  { name: `نام کاربری یا رمز عبور اشتباه است`, key: 'LOGIN_FAILED' }
];

export const ErrorHandler = (key) => {
  return ErrorEnum.find((item) => item.key == key)?.name ?? 'خطایی نامشخص رخ داده است';
};
