/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom';
import PrivateRouts from './setting/privateRoute';
import { PreviousLocationProvider } from 'comon/context/PreviousLocationContext ';
import { lazy } from 'react';
import Impersonate from 'pages/Impersonate/Impersonate';
import EducationalContent from 'pages/EducationalContent/EducationalContent';
import Article1 from 'pages/Articles/components/Article1';
import Article2 from 'pages/Articles/components/Article2';
import Article3 from 'pages/Articles/components/Article3';
import Article4 from 'pages/Articles/components/Article4';

const HomePage = lazy(() => import('pages/home/HomePage'));
const AllPlans = lazy(() => import('pages/AllPlans/AllPlans'));
const Articles = lazy(() => import('pages/Articles/Articles'));
const PlanDetail = lazy(() => import('pages/PlanDetail/PlanDetail'));
const Dashboard = lazy(() => import('pages/Dashboard/Dashboard'));
const Investing = lazy(() => import('pages/Investing/Investing'));
const PanelPlanDetails = lazy(() => import('pages/PanelPlanDetails/PanelPlanDetails'));
const FinancialReport = lazy(() => import('pages/FinancialReport/FinancialReport'));
const UserInfo = lazy(() => import('pages/UserInfo/UserInfo'));
const RequestForFinancing = lazy(() => import('pages/RequestForFinancing/RequestForFinancing'));
const EnteringMainCompo = lazy(() => import('pages/Login/EnteringMainCompo'));
const AboutUs = lazy(() => import('pages/AboutUs/AboutUs'));
const ContactUs = lazy(() => import('pages/ContactUs/ContactUs'));
const SiteGuide = lazy(() => import('pages/SiteGuide/SiteGuide'));
const NotFound = lazy(() => import('comon/NotFound/NotFound'));

const RoutsComponent = () => {
  return (
    <PreviousLocationProvider>
      <Routes>
        {/* private routes */}
        <Route element={<PrivateRouts />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/investing" element={<Investing />} />
          <Route path="/financial_report" element={<FinancialReport />} />
          <Route path="/user_info" element={<UserInfo />} />
          <Route path="/user_info/:name" element={<UserInfo />} />
          <Route path="/investing/plan_details/:id" element={<PanelPlanDetails />} />
          <Route path="/request_for_financing" element={<RequestForFinancing />} />
        </Route>
        {/* impersonate user */}
        <Route path="/impersonate" element={<Impersonate />} />
        {/* globaly rout */}
        <Route path="/" exact element={<HomePage />} />
        <Route path="/about_us" exact element={<AboutUs />} />
        <Route path="/contact_us" exact element={<ContactUs />} />
        <Route path="/educational_content" exact element={<EducationalContent />} />
        <Route path="/educational_content/:id" exact element={<EducationalContent />} />
        <Route path="/articles/:name" exact element={<Articles />} />{' '}
        <Route path="/article1" exact element={<Article1 />} />
        <Route path="/article2" exact element={<Article2 />} />
        <Route path="/article3" exact element={<Article3 />} />
        <Route path="/article4" exact element={<Article4 />} />
        <Route path="/user_guide" exact element={<SiteGuide />} />
        <Route path="/login" exact element={<EnteringMainCompo />} />
        <Route path="/plan_detail/:id" exact element={<PlanDetail />} />
        <Route path="/all_plans" exact element={<AllPlans />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PreviousLocationProvider>
  );
};

export default RoutsComponent;

// check "/" rout when token is false
