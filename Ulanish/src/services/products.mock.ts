import type { ProductsService, ProductFilters } from '@/api/types';
import { products, companies, categories } from '@/data/sample';
import { delay } from '@/utils/helpers';
import { normalizeArabicScript as normalize } from '@/utils/normalizeArabicScript';
export function filterSampleProducts(filters: ProductFilters = {}) {
  const q = normalize(filters.q ?? '');
  const items = products.filter((p) => {
    const company = companies.find((c) => c.id === p.companyId);
    const category = categories.find((c) => c.id === p.categoryId);
    const haystack = normalize(
      [
        p.code,
        ...Object.values(p.name),
        ...Object.values(company?.name ?? {}),
        ...Object.values(category?.name ?? {}),
      ].join(' '),
    );
    return (
      (!q || haystack.includes(q)) &&
      (!filters.company || p.companyId === filters.company) &&
      (!filters.category || p.categoryId === filters.category) &&
      (filters.min === undefined || p.price >= filters.min) &&
      (filters.max === undefined || p.price <= filters.max) &&
      (!filters.inStock || p.stock === 'in')
    );
  });
  items.sort((a, b) =>
    filters.sort === 'price-asc'
      ? a.price - b.price
      : filters.sort === 'price-desc'
        ? b.price - a.price
        : b.createdAt.localeCompare(a.createdAt),
  );
  const pageSize = Math.min(48, Math.max(1, filters.pageSize ?? 12));
  const page = Math.min(
    Math.max(1, filters.page ?? 1),
    Math.max(1, Math.ceil(items.length / pageSize)),
  );
  return {
    items: items.slice((page - 1) * pageSize, page * pageSize),
    total: items.length,
    page,
    pageSize,
  };
}
export const productsMock: ProductsService = {
  async list(filters) {
    await delay();
    return filterSampleProducts(filters);
  },
  async get(id) {
    await delay();
    return products.find((p) => p.id === id) ?? null;
  },
};
