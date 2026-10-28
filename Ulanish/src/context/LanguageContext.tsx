import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { Language } from '@/api/types';
import { localized } from '@/utils/helpers';
const Context = createContext({
  language: 'fa-AF' as Language,
  dir: 'rtl' as 'rtl' | 'ltr',
  setLanguage: (_language: Language) => {},
});
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const language = (i18n.resolvedLanguage ?? 'fa-AF') as Language;
  const dir = language === 'en' ? 'ltr' : 'rtl';
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);
  return (
    <Context.Provider
      value={{
        language,
        dir,
        setLanguage: (l) => {
          void i18n.changeLanguage(l);
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useLanguage = () => {
  const context = useContext(Context);
  return {
    ...context,
    l: (value: Parameters<typeof localized>[0]) => localized(value, context.language),
  };
};
