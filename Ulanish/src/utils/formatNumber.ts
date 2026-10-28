import { siteConfig } from '@/data/siteConfig';
export const formatNumber = (value: number, language = 'en') =>
  new Intl.NumberFormat(language, {
    numberingSystem: siteConfig.digitStyle,
    maximumFractionDigits: 0,
  })
    .formatToParts(value)
    .map((part) => (part.type === 'group' ? ',' : part.value))
    .join('');
