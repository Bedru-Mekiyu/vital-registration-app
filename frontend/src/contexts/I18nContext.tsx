import React, { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

interface I18nContextType {
  language: string;
  changeLanguage: (lang: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n: i18nInstance } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18nInstance.changeLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Update document direction for RTL languages
    if (['ar', 'he'].includes(lang)) {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = lang;
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lang;
    }
  };

  const isRTL = ['ar', 'he'].includes(i18nInstance.language);

  return (
    <I18nContext.Provider value={{
      language: i18nInstance.language,
      changeLanguage,
      t,
      isRTL
    }}>
      {children}
    </I18nContext.Provider>
  );
};