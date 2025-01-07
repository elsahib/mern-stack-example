import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SAFlag = `flags/sa.svg`;
const GBFlag = `flags/gb.svg`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const currentFlag = i18n.language === 'ar' ? SAFlag : GBFlag;

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center p-2 border border-gray-300 rounded-md bg-white cursor-pointer'
      >
        <img src={currentFlag} className='w-6 h-6' />
        <svg className='w-4 h-4 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
        </svg>
      </button>
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg'>
          <button
            onClick={() => changeLanguage('en')}
            className='flex items-center w-full p-2 hover:bg-gray-100'
          >
            <img src={GBFlag} className='w-6 h-6 mr-2' />
            English
          </button>
          <button
            onClick={() => changeLanguage('ar')}
            className='flex items-center w-full p-2 hover:bg-gray-100'
          >
            <img src={SAFlag} alt="SA Flag" className='w-6 h-6 mr-2' />
            العربية
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
