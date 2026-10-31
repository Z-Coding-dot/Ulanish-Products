import { useTranslation } from 'react-i18next';
import { useId } from 'react';
import type { ProductFilters } from '@/api/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCatalogMetadata } from '@/context/CatalogContext';
import { Listbox } from './Select';
import { Input } from './Input';
import { Button } from './Button';
import { Skeleton } from './Skeleton';
export function FilterPanel({
  filters,
  update,
  clear,
}: {
  filters: ProductFilters;
  update: (
    values: Record<string, string | number | boolean | undefined>,
    replace?: boolean,
  ) => void;
  clear: () => void;
}) {
  const { t } = useTranslation();
  const { l } = useLanguage();
  const { categories, loading, error, retry } = useCatalogMetadata();
  const id = useId();
  return (
    <div className="filter-panel">
      <h3>{t('products.filters')}</h3>
      {error && (
        <div role="alert">
          <p>{t('common.error')}</p>
          <Button onClick={retry}>{t('common.retry')}</Button>
        </div>
      )}
      {loading ? (
        <>
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </>
      ) : (
        <>
          <Listbox
            label={t('common.category')}
            value={filters.category ?? ''}
            onChange={(v) => update({ category: v })}
            options={[
              { value: '', label: t('products.allCategories') },
              ...categories.map((c) => ({ value: c.id, label: l(c.name) })),
            ]}
          />
        </>
      )}
      <Input
        id={`${id}-min`}
        label={t('products.min')}
        type="number"
        min={0}
        value={filters.min ?? ''}
        inputMode="numeric"
        onChange={(e) =>
          update(
            {
              min:
                e.target.value === '' ? undefined : Math.max(0, Math.floor(Number(e.target.value))),
            },
            true,
          )
        }
      />
      <Input
        id={`${id}-max`}
        label={t('products.max')}
        type="number"
        min={0}
        value={filters.max ?? ''}
        inputMode="numeric"
        onChange={(e) =>
          update(
            {
              max:
                e.target.value === '' ? undefined : Math.max(0, Math.floor(Number(e.target.value))),
            },
            true,
          )
        }
      />
      <label className="check-label">
        <input
          type="checkbox"
          checked={filters.inStock ?? false}
          onChange={(e) => update({ stock: e.target.checked ? 'in' : '' })}
        />
        {t('products.stockOnly')}
      </label>
      <button className="text-link" onClick={clear}>
        {t('common.clearFilters')}
      </button>
    </div>
  );
}
