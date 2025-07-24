'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 bg-[#FFDB24] hover:bg-[#caa600] text-black font-bold py-2 px-4 rounded-lg border-2 border-[#b98459] transition-all duration-300 shadow-lg"
      title={t('language')}
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">🌐</span>
        <span className="font-myriadpro">{language === 'en' ? 'ES' : 'EN'}</span>
      </div>
    </button>
  );
};

export default LanguageToggle; 