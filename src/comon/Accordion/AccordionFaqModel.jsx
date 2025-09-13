import React from 'react';
import chevronup from 'asset/Pictures/Icons/chevronup.svg';
import InlineSVG from 'react-inlinesvg';
import { FormatTextWithLineBreaks } from 'comon/GlobalyTools/UseAbleFunctions';

const AccordionFaqModel = ({
  question,
  answer,
  component = false,
  HeaderColor = false,
  bgColor = false,
  titleQuestionColor,
  isOpen,
  setIsOpen
}) => {
  return (
    <div
      className={`w-full flex justify-center ${
        bgColor ? bgColor : 'bg-transparent'
      } items-center flex-col`}>
      {/* Question row */}
      <div
        className={`cursor-pointer  ${
          bgColor ? '' : 'rounded-b'
        }  lg:h-[56px] h-[40px] flex justify-between items-center  text-sm  w-[95%] `}
        onClick={setIsOpen}>
        <h3
          className={`lg:text-base font-bold w-full text-sm ${
            HeaderColor
              ? isOpen && HeaderColor
              : titleQuestionColor
                ? titleQuestionColor
                : 'text-gray-main'
          } text-start `}>
          {question}
        </h3>
        <InlineSVG
          src={chevronup}
          className={` ${
            isOpen ? 'rotate-0 ' : ' rotate-180'
          }   transition-all ease-in-out duration-500 `}
        />
      </div>

      {/* Answer section */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out w-[95%]  ${
          isOpen ? (bgColor ? 'max-h-[500px] overflow-y-auto' : 'max-h-screen border-b') : 'max-h-0'
        }`}>
        <div
          style={{ lineHeight: '25px' }}
          className={`p-4  ${
            bgColor ? '' : 'rounded-b-lg'
          } lg:text-base text-xs text-gray-main   text-justify`}>
          {component ? answer : FormatTextWithLineBreaks(answer)}
        </div>
      </div>
    </div>
  );
};

export default AccordionFaqModel;
// const App = () => {
//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <Accordion
//         question="What is React?"
//         answer="React is a JavaScript library for building user interfaces. It allows developers to create large web applications that can update and render efficiently in response to data changes."
//       />
//       <Accordion
//         question="What is Tailwind CSS?"
//         answer="Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center, and rotate-90 that can be composed to build any design, directly in your markup."
//       />
//     </div>
//   );
// };
