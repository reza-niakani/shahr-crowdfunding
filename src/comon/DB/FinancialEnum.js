export const FinancialEnum = [
  { name: 'پرداخت وجه از درگاه', key: 1, color: '#01B69B' },
  { name: 'پرداخت وجه با رسید بانکی', key: 2, color: '#D9A421' },
  { name: ' ثبت سفارش', key: 3, color: '#D22630' },
  { name: 'برگشت وجه به دلیل پرداخت ناموفق', key: 4, color: '#D22630' },
  { name: 'استرداد وجه با درخواست کاربر', key: 5, color: '#D22630' },
  { name: 'پرداخت سود', key: 6, color: '#01B69B' },
  { name: 'برگشت وجه به دلیل عدم موفقیت طرح', key: 7, color: '#D22630' }
];
export const FinancialStatusEnum = [
  { name: 'در انتظار تایید', key: 1, color: '#01B69B' },
  { name: 'تایید شده', key: 2, color: '#01B69B' },
  { name: 'رد شده', key: 3, color: '#D22630' }
];
export const FinancialEnumFinder = (state) => FinancialEnum?.find((item) => item?.key == state);
