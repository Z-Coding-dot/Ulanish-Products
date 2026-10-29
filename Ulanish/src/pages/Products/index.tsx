import { useState } from 'react';
import { SlidersHorizontal, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProductFilters } from '@/hooks/useProductFilters';
import { useDebounce } from '@/hooks/useDebounce';
import { useProducts } from '@/hooks/useCatalog';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { SEO } from '@/components/layout/SEO';
import { FilterPanel } from '@/components/ui/FilterPanel';
import { SortSelect } from '@/components/ui/SortSelect';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { ProductSkeletons } from '@/components/ui/Skeleton';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { Reveal } from '@/components/ui/motion/Reveal';
export default function Products() {
  const { t } = useTranslation();
  const { filters, update, clear } = useProductFilters();
  const [drawer, setDrawer] = useState(false);
  const debounced = useDebounce(filters.q ?? '');
  const products = useProducts({ ...filters, q: debounced });
  const panel = <FilterPanel filters={filters} update={update} clear={clear} />;
  return (
    <>
      <SEO title={t('products.title')} description={t('products.description')} />
      <PageHeader
        title={t('products.title')}
        description={t('products.description')}
        image="/images/hero-discover.webp"
      />
      <Section>
        <p className="sample-note">{t('common.sample')}</p>
        <Reveal className="catalog-toolbar">
          <div className="search-input-wrap min-w-0 flex-1">
            <label className="sr-only" htmlFor="catalog-query">
              {t('products.searchLabel')}
            </label>
            <Search size={20} aria-hidden="true" />
            <input
              id="catalog-query"
              type="search"
              className="field"
              placeholder={t('products.search')}
              value={filters.q ?? ''}
              onChange={(e) => update({ q: e.target.value }, true)}
            />
          </div>
          <Button variant="outline" className="lg:hidden" onClick={() => setDrawer(true)}>
            <SlidersHorizontal size={18} aria-hidden="true" />
            {t('products.filters')}
          </Button>
        </Reveal>
        <div className="catalog-layout">
          <aside className="hidden lg:block">{panel}</aside>
          <div className="min-w-0">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted" aria-live="polite">
                {products.loading
                  ? t('common.loading')
                  : t('products.count', { count: products.data?.total ?? 0 })}
              </p>
              <SortSelect value={filters.sort ?? 'newest'} onChange={(sort) => update({ sort })} />
            </div>
            {products.loading ? (
              <ProductSkeletons count={12} />
            ) : products.error ? (
              <EmptyState
                title={t('common.error')}
                action={<Button onClick={products.retry}>{t('common.retry')}</Button>}
              />
            ) : products.data?.items.length ? (
              <>
                <ProductGrid products={products.data.items} />
                <Pagination
                  page={products.data.page}
                  total={products.data.total}
                  onChange={(page) => {
                    update({ page });
                    document.getElementById('catalog-query')?.scrollIntoView({ block: 'start' });
                  }}
                />
              </>
            ) : (
              <EmptyState
                title={t('products.empty')}
                description={t('products.emptyText')}
                action={<Button onClick={clear}>{t('common.clearFilters')}</Button>}
              />
            )}
          </div>
        </div>
      </Section>
      <Drawer open={drawer} onClose={() => setDrawer(false)} title={t('products.filters')}>
        {panel}
        <Button className="mt-8 w-full" onClick={() => setDrawer(false)}>
          {t('products.apply')}
        </Button>
      </Drawer>
    </>
  );
}
