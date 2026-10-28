import { services } from '@/services';
import { useAsync } from './useAsync';
import type { ProductFilters } from '@/api/types';
export const useCompanies = () => useAsync(() => services.companies.list(), 'companies');
export const useCategories = () => useAsync(() => services.categories.list(), 'categories');
export const useSettings = () => useAsync(() => services.settings.get(), 'settings');
export const useProducts = (filters: ProductFilters = {}) =>
  useAsync(() => services.products.list(filters), JSON.stringify(filters));
export const useProduct = (id: number) =>
  useAsync(
    () => (Number.isInteger(id) && id > 0 ? services.products.get(id) : Promise.resolve(null)),
    String(id),
  );
export const useSearch = (q: string, filters: ProductFilters = {}) =>
  useAsync(
    () =>
      q
        ? services.search.search(q, filters)
        : Promise.resolve({ items: [], total: 0, page: 1, pageSize: 12 }),
    JSON.stringify([q, filters]),
  );
