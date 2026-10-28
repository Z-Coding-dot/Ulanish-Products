import { describe, it, expect } from 'vitest';
import { products, companies, categories } from '@/data/sample';
import { services } from '@/services';
import { normalizeArabicScript } from '@/utils/normalizeArabicScript';
import { formatPrice } from '@/utils/formatPrice';
import { whatsappLink } from '@/utils/whatsapp';
import { siteConfig } from '@/data/siteConfig';
describe('sample catalog contract', () => {
  it('contains the required sample assortment', () => {
    expect(products).toHaveLength(24);
    expect(companies).toHaveLength(6);
    expect(categories).toHaveLength(5);
    expect(products.find((p) => p.id === 115)).toMatchObject({
      code: '2',
      price: 5000,
      stock: 'in',
    });
  });
  it('searches Arabic variants, codes, companies and categories through the service', async () => {
    const result = await services.search.search('دِيتَابيس سونا');
    expect(result.items.map((p) => p.id)).toContain(115);
    expect((await services.search.search('2')).items.map((p) => p.id)).toContain(115);
    expect((await services.search.search('Nava')).total).toBe(4);
    expect((await services.search.search('office essentials')).total).toBe(5);
  });
  it('normalizes letters, diacritics and digits', () => {
    expect(normalizeArabicScript('كِتاب ۱۲ هە')).toBe('کتاب 12 هه');
  });
  it('filters, sorts and paginates without changing source data', async () => {
    const result = await services.products.list({
      company: 'sona',
      inStock: true,
      sort: 'price-asc',
      pageSize: 2,
    });
    expect(result.items).toHaveLength(2);
    expect(result.total).toBe(4);
    expect(result.items.every((p) => p.companyId === 'sona' && p.stock === 'in')).toBe(true);
    expect(result.items[0].price).toBeLessThanOrEqual(result.items[1].price);
    expect((await services.products.list({ min: 100000 })).total).toBe(0);
    expect((await services.products.list({ page: 2 })).items).toHaveLength(12);
  });
});
describe('price formatting', () => {
  it('uses integer AFN with Latin digits in every language', () => {
    expect(formatPrice(5000, 'en')).toBe('5,000 AFN');
    expect(formatPrice(5000, 'fa-AF')).toBe('5,000 افغانی');
    expect(formatPrice(5000, 'ps')).toBe('5,000 افغانۍ');
  });
});
describe('WhatsApp builder', () => {
  it.each(['en', 'fa-AF', 'ps'])(
    'encodes the current language, product and URL for %s',
    (language) => {
      const url = new URL(
        whatsappLink(language, products[0], 'https://store.example/products/115?q=a&b=2'),
      );
      expect(url.origin + url.pathname).toBe(siteConfig.whatsapp);
      expect(url.searchParams.get('text')).toContain(
        products[0].name[language as 'en' | 'fa-AF' | 'ps'],
      );
      expect(url.searchParams.get('text')).toContain('https://store.example/products/115?q=a&b=2');
      expect(url.searchParams.get('text')).toContain(
        language === 'en'
          ? '— via Ishanch'
          : language === 'ps'
            ? '— د ایشانچ له لارې'
            : '— از طریق ایشانچ',
      );
    },
  );
  it('encodes a contact message without losing punctuation', () => {
    expect(
      new URL(
        whatsappLink('en', undefined, undefined, 'Hello & thank you + کابل'),
      ).searchParams.get('text'),
    ).toBe('Hello & thank you + کابل');
  });
});
