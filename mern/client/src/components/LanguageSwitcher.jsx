import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className='language-switcher'>
      <button onClick={() => changeLanguage('en')}>🇬🇧</button>
      <button onClick={() => changeLanguage('ar')}>🇸🇦</button>
    </div>
  );
};

export default LanguageSwitcher;
