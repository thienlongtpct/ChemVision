import { createContext } from 'react';

export const LanguageContext = createContext({ lang: 'en', t: (k) => k, setLang: () => {} });
