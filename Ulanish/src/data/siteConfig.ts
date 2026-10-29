import type { L } from '@/api/types';
// Store identity is authoritative; catalog and editorial content are sample data.
export const siteConfig = {
  name: { en: 'Ulanish Store', 'fa-AF': 'فروشگاه اولنیش', ps: 'د اولنیش پلورنځی' } satisfies L,
  wordmark: { en: 'Ulanish', 'fa-AF': 'اولنیش', ps: 'اولنیش' } satisfies L,
  address: {
    en: 'Kabul, Kārta-e-Chahār',
    'fa-AF': 'کابل، کارته چهار',
    ps: 'کابل، کارته چهار',
  } satisfies L,
  phone: '0789266844',
  tel: 'tel:0789266844',
  whatsapp: 'https://wa.me/93789266844',
  currency: 'AFN',
  digitStyle: 'latn' as 'latn' | 'arabext',
  platformUrl: 'https://ishanch.com/c/ulanish',
  creditUrl: 'https://ishanch.com',
  credit: { en: 'Ishanch', 'fa-AF': 'ایشانچ', ps: 'ایشانچ' } satisfies L,
  colors: {
    primary: '#2D2F7A',
    'primary-hover': '#24265F',
    'primary-active': '#1C1E4B',
    deep: '#181A47',
    accent: '#C8963E',
    ink: '#0B1220',
    body: '#1F2937',
    muted: '#4B5563',
    surface: '#F5F6FB',
    border: '#E5E7EB',
    green: '#0E7C3A',
    background: '#F8F9FD',
  },
  social: [] as { label: string; url: string }[],
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Kabul Karta-e-Chahar'),
};
