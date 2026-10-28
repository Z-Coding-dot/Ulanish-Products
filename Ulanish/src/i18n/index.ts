import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Detector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import fa from './locales/fa-AF.json';
import ps from './locales/ps.json';
i18n
  .use(Detector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, 'fa-AF': { translation: fa }, ps: { translation: ps } },
    fallbackLng: 'fa-AF',
    supportedLngs: ['en', 'fa-AF', 'ps'],
    load: 'currentOnly',
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'ulanish-language',
      caches: ['localStorage'],
    },
    saveMissing: import.meta.env.DEV,
    missingKeyHandler: (_lng, _ns, key) => {
      if (import.meta.env.DEV) console.warn(`Missing translation: ${key}`);
    },
    react: { useSuspense: false },
  });
export default i18n;
