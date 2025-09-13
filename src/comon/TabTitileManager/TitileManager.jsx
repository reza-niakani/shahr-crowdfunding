import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const titles = {
  '/': 'شهر کراد',
  '/dashboard': 'شهر کراد | داشبورد',
  '/investing': 'شهر کراد | سرمایه‌گذاری',
  '/financial_report': 'شهر کراد | گزارش مالی',
  '/user_info': 'شهر کراد | اطلاعات کاربری',
  '/user_info/:name': 'شهر کراد | اطلاعات کاربری ',
  '/investing/plan_details/:id': 'شهر کراد | جزئیات طرح سرمایه‌گذاری ',
  '/request_for_financing': 'شهر کراد | درخواست تامین مالی',
  '/impersonate': 'شهر کراد | ورود به جای کاربر',
  '/about_us': 'شهر کراد | درباره ما',
  '/contact_us': 'شهر کراد | تماس با ما',
  '/educational_content': 'شهر کراد | محتوای آموزشی',
  '/educational_content/:id': 'شهر کراد | محتوای آموزشی ',
  '/articles/:name': 'شهر کراد | مقاله ',
  '/user_guide': 'شهر کراد | راهنمای سامانه',
  '/login': 'شهر کراد | ورود',
  '/plan_detail/:id': 'شهر کراد | جزئیات طرح ',
  '/all_plans': 'شهر کراد | تمام طرح‌ها',
  '*': 'شهر کراد | صفحه پیدا نشد'
};

function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // try exact match first
    if (titles[path]) {
      document.title = titles[path];
      return;
    }

    // try parametric matches
    for (const route in titles) {
      const regex = new RegExp('^' + route.replace(/:[^/]+/g, '([^/]+)') + '$');
      const match = path.match(regex);
      if (match) {
        let title = titles[route];

        // replace dynamic params (:id, :name) with actual values
        const params = route.match(/:([^/]+)/g) || [];
        params.forEach((param, idx) => {
          const value = match[idx + 1]; // matched part from URL
          title = title.replace(param, value);
        });

        document.title = title;
        return;
      }
    }

    // fallback
    document.title = 'شهر کراد';
  }, [location.pathname]);

  return null;
}

export default TitleManager;
