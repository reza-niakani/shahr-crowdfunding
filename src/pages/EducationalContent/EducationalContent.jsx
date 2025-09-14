/* eslint-disable no-unused-vars */
import React from 'react';
import Thingknow from 'asset/Pictures/Images/Thingknow.png';
import Keyword from 'asset/Pictures/Images/Keyword.png';
import ThingsToKnowAboutZagrosKrad from './components/ThingsToKnowAboutZagrosKrad';
import CrowdfundingKeywords from './components/CrowdfundingKeywords';
import { useNavigate, useParams } from 'react-router-dom';

function EducationalContent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const EducationalContentEnum = [
    {
      id: 1,
      title: 'دانستنی ها در شهرکراد',
      pic: Thingknow
    },
    {
      id: 2,
      title: 'کلید واژهای تامین مالی جمعی',
      pic: Keyword
    }
  ];

  // Convert id from URL param (string) to number
  const numericId = parseInt(id, 10);

  const handleContent = () => {
    switch (numericId) {
      case 1:
        return { status: true, component: <ThingsToKnowAboutZagrosKrad /> };
      case 2:
        return { status: true, component: <CrowdfundingKeywords /> };
      default:
        return { status: false, component: null };
    }
  };

  const content = handleContent();

  return (
    <div className="w-full flex flex-col items-center justify-between ">
      {content.status ? (
        content.component
      ) : (
        <>
          <div className="bg-[url('asset/Pictures/BackGround/landingBg.svg')] bg-cover w-screen bg-no-repeat bg-center lg:h-[500px] h-[300px] flex flex-col justify-center items-center gap-y-16 lg:py-0">
            <span className="lg:text-4xl text-lg font-extrabold text-accent-600 w-full text-center ">
              محتوای آموزشی
            </span>
          </div>
          <div className="w-[95%] max-w-[1440px] flex flex-wrap lg:flex-row flex-col items-center lg:justify-start justify-center gap-5">
            {EducationalContentEnum.map((item) => (
              <div
                onClick={() => navigate(`/educational_content/${item.id}`)}
                key={item.id}
                className="lg:w-[25%] min-h-[200px] w-[90%] rounded-lg p-5 flex flex-col items-center gap-y-5 hover:drop-shadow-md cursor-pointer bg-gray-100 hover:border-0 border border-gray-300">
                <img src={item.pic} className="w-full h-[250px]" alt={item.title} />
                <span className="w-full text-center text-sm font-bold text-accent-600">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default EducationalContent;
