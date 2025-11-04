import { useState, useMemo } from 'react';
import { LanguageContext } from './LanguageContext';

import en from '../locales/en';
import vi from '../locales/vi';

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  const setLangPersist = (l) => {
    setLang(l);
    localStorage.setItem('lang', l);
  };

  const translations = useMemo(() => ({ en, vi }), []);

  const t = (key) => {
    const parts = key.split('.');
    const val = parts.reduce((acc, p) => (acc && acc[p] ? acc[p] : null), translations[lang]);
    return val || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangPersist, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
