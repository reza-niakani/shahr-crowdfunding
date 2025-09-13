import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Article1 from './components/Article1';
import Article2 from './components/Article2';
import Article3 from './components/Article3';
import Article4 from './components/Article4';

function Articles() {
  const { name } = useParams();

  const navigate = useNavigate();

  const handelArticles = () => {
    switch (name) {
      case 'article1':
        return <Article1 />;
      case 'article2':
        return <Article2 />;
      case 'article3':
        return <Article3 />;
      case 'article4':
        return <Article4 />;
      default:
        return false;
    }
  };
  return (
    <div className="lg:w-full max-w-[1440px] lg:mt-28 bg-white rounded-lg drop-shadow-md h-auto py-16 w-full flex flex-col items-center justify-start  ">
      <div className="w-[95%] flex  justify-end items-center pt-5">
        {' '}
        <button
          onClick={() => navigate(-1)}
          className="drop-shadow-md rounded-md p-3  bg-white hover:border border-accent-300 ">
          {' '}
          بازگشت
        </button>
      </div>
      {handelArticles() || (
        <span className="w-full text-center text-base font-medium text-gray-main  ">
          {' '}
          مقاله مورد نظر یافت نشد{' '}
        </span>
      )}
    </div>
  );
}

export default Articles;
