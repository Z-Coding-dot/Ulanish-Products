import { siteConfig } from '@/data/siteConfig';
import { formatNumber } from './formatNumber';
export const formatPrice = (value: number, language = 'en') =>
  `${formatNumber(value, language)} ${language === 'en' ? siteConfig.currency : language === 'ps' ? 'افغانۍ' : 'افغانی'}`;
