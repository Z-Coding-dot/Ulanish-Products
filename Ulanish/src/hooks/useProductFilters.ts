import { useSearchParams } from 'react-router-dom';
import type { ProductFilters } from '@/api/types';
export function useProductFilters() {
  const [params, setParams] = useSearchParams();
  const number = (key: string) => {
    const raw = params.get(key);
    if (raw === null || raw === '') return undefined;
    const value = Number(raw);
    return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : undefined;
  };
  const sort = params.get('sort');
  const filters: ProductFilters = {
    q: params.get('q') ?? '',
    company: params.get('company') ?? '',
    category: params.get('category') ?? '',
    min: number('min'),
    max: number('max'),
    inStock: params.get('stock') === 'in',
    sort: sort === 'price-asc' || sort === 'price-desc' ? sort : 'newest',
    page: Math.max(1, number('page') ?? 1),
    pageSize: 12,
  };
  const update = (values: Record<string, string | number | boolean | undefined>, replace = false) =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        for (const [key, value] of Object.entries(values)) {
          if (value === undefined || value === '' || value === false) next.delete(key);
          else next.set(key, String(value));
        }
        if (!('page' in values)) next.delete('page');
        return next;
      },
      { replace },
    );
  return {
    filters,
    update,
    clear: () =>
      setParams((prev) => {
        const next = new URLSearchParams();
        if (prev.has('lng')) next.set('lng', prev.get('lng')!);
        return next;
      }),
  };
}
