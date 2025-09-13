export const planStatusEnum = [
  { name: ' همه', status: false, key: null, color: '#F36D74' },
  { name: ' نامشخص', status: false, key: 100, color: '#F36D74' },
  { name: ' تایید اولیه', status: false, key: 1, color: '#01B69B' },
  { name: ' در انتظار تایید نهاد مالی', status: false, key: 2, color: '#3A52A0' },
  { name: ' در انتظار تایید عامل', status: false, key: 3, color: '#3A52A0' },
  { name: ' در انتظار صدور نماد', status: false, key: 4, color: '#3A52A0' },
  { name: ' تایید شده و در انتظار انتشار', status: false, key: 5, color: '#7E7DFC' },
  { name: ' رد طرح', status: false, key: 6, color: '#F36D74' },
  { name: ' آغاز جمع آوری وجوه', status: true, key: 7, color: '#01B69B' },
  { name: ' موفقیت جمع آوری وجوه', status: true, key: 8, color: '#01B69B' },
  { name: ' عدم موفقیت جمع آوری وجوه', status: false, key: 9, color: '#7E7DFC' },
  { name: 'در حال اجرا ', status: true, key: 10, color: '#2D3983' },
  { name: 'خاتمه یافته ', status: false, key: 11, color: '#374151' }
];

export const plansStatusForFilter = [
  { name: ' همه', status: false, key: null, color: '#F36D74' },
  { name: ' آغاز جمع آوری وجوه', status: true, key: 7, color: '#01B69B' },
  { name: ' موفقیت جمع آوری وجوه', status: true, key: 8, color: '#01B69B' },
  { name: ' عدم موفقیت جمع آوری وجوه', status: false, key: 9, color: '#7E7DFC' },
  { name: 'در حال اجرا ', status: true, key: 10, color: '#2D3983' },
  { name: 'خاتمه یافته ', status: false, key: 11, color: '#374151' }
];

export const plansStatusFinder = (state) => planStatusEnum?.find((item) => item?.key == state);
