import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSearch } from '@/hooks/useCatalog';
import { PageHeader } from '@/components/layout/PageHeader';
import { SEO } from '@/components/layout/SEO';
import { Section } from '@/components/layout/Section';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { ProductSkeletons } from '@/components/ui/Skeleton';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button, ButtonLink } from '@/components/ui/Button';
export default function Search() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const query = params.get('q')?.trim() ?? '';
  const [value, setValue] = useState(query);
  const navigate = useNavigate();
  useEffect(() => setValue(query), [query]);
  const result = useSearch(query, { page: Math.max(1, Number(params.get('page')) || 1) });
  return (
    <>
      <SEO title={t('search.title')} description={t('search.description')} />
      <PageHeader title={t('search.title')} />
      <Section>
        <form
          className="mb-10 flex gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/search?q=${encodeURIComponent(value)}`);
          }}
        >
          <label className="sr-only" htmlFor="search-page">
            {t('products.searchLabel')}
          </label>
          <input
            className="field min-w-0 flex-1"
            id="search-page"
            type="search"
            value={value}
            placeholder={t('products.search')}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button type="submit" aria-label={t('search.title')}>
            <SearchIcon size={20} />
          </Button>
        </form>
        {query && <h2 className="mb-8 text-xl">{t('search.results', { query })}</h2>}
        {result.loading ? (
          <ProductSkeletons />
        ) : result.error ? (
          <EmptyState
            title={t('common.error')}
            action={<Button onClick={result.retry}>{t('common.retry')}</Button>}
          />
        ) : result.data?.items.length ? (
          <>
            <p className="mb-7 text-sm text-muted">
              {t('products.count', { count: result.data.total })}
            </p>
            <ProductGrid products={result.data.items} />
            <Pagination
              total={result.data.total}
              page={result.data.page}
              onChange={(page) => setParams({ q: query, page: String(page) })}
            />
          </>
        ) : (
          <EmptyState
            title={t(query ? 'products.empty' : 'search.hint')}
            description={t('products.emptyText')}
            action={<ButtonLink to="/products">{t('common.browse')}</ButtonLink>}
          />
        )}
      </Section>
    </>
  );
}
