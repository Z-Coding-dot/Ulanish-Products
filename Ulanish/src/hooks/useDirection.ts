import { useLanguage } from '@/context/LanguageContext';
export const useDirection = () => useLanguage().dir;
