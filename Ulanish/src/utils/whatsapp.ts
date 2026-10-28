import type { Product } from '@/api/types';
import { siteConfig } from '@/data/siteConfig';
import { localized } from './helpers';
const templates = {
  en: {
    greeting: 'Hello! I would like to know more.',
    product: 'Hello! I am interested in {{name}}.',
    via: '— via Ishanch',
  },
  'fa-AF': {
    greeting: 'سلام! می‌خواهم معلومات بیشتر بگیرم.',
    product: 'سلام! دربارهٔ {{name}} معلومات می‌خواهم.',
    via: '— از طریق ایشانچ',
  },
  ps: {
    greeting: 'سلام! غواړم نور معلومات ترلاسه کړم.',
    product: 'سلام! د {{name}} په اړه معلومات غواړم.',
    via: '— د ایشانچ له لارې',
  },
};
export function whatsappLink(
  language: string,
  product?: Product,
  pageUrl?: string,
  message?: string,
) {
  const template = templates[language as keyof typeof templates] ?? templates.en;
  const body =
    message ??
    (product
      ? `${template.product.replace('{{name}}', localized(product.name, language))}\n${pageUrl ?? `${siteConfig.platformUrl}/products/${product.id}`}\n${template.via}`
      : template.greeting);
  return `${siteConfig.whatsapp}?text=${encodeURIComponent(body)}`;
}
