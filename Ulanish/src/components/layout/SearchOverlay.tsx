import { useState, useEffect, useRef, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setSearchOpen } from '@/redux/uiSlice';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/hooks/useCatalog';
import { useLanguage } from '@/context/LanguageContext';
import { readStorage, writeStorage } from '@/utils/helpers';
import { formatPrice } from '@/utils/formatPrice';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
function Match({ text, query }: { text: string; query: string }) {
  const at = text.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
  return at < 0 || !query ? (
    <>{text}</>
  ) : (
    <>
      {text.slice(0, at)}
      <mark>{text.slice(at, at + query.length)}</mark>
      {text.slice(at + query.length)}
    </>
  );
}
export function SearchOverlay() {
  const { t } = useTranslation();
  const { l, language } = useLanguage();
  const open = useAppSelector((s) => s.ui.searchOpen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(-1);
  const [recent, setRecent] = useState(() => readStorage<string[]>('ulanish-recent', []));
  const debounced = useDebounce(query);
  const result = useSearch(open ? debounced : '', { pageSize: 5 });
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const items = result.data?.items ?? [];
  const close = () => dispatch(setSearchOpen(false));
  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(-1);
      const timer = setTimeout(() => input.current?.focus(), 30);
      return () => clearTimeout(timer);
    }
  }, [open]);
  useEffect(() => setActive(-1), [debounced]);
  const go = (path: string) => {
    if (query.trim()) {
      const next = [query.trim(), ...recent.filter((r) => r !== query.trim())].slice(0, 5);
      setRecent(next);
      writeStorage('ulanish-recent', next);
    }
    close();
    navigate(path);
  };
  return (
    <Modal open={open} onClose={close} title={t('search.title')}>
      <div className="search-input-wrap">
        <Search size={20} aria-hidden="true" />
        <input
          ref={input}
          className="field"
          role="combobox"
          aria-label={t('products.searchLabel')}
          aria-autocomplete="list"
          aria-expanded={items.length > 0}
          aria-controls={id}
          aria-activedescendant={active >= 0 ? `${id}-${active}` : undefined}
          placeholder={t('products.search')}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((a) => (items.length ? (a + 1) % items.length : -1));
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((a) => (items.length ? (a - 1 + items.length) % items.length : -1));
            }
            if (e.key === 'Enter') {
              e.preventDefault();
              go(
                active >= 0 && items[active]
                  ? `/products/${items[active].id}`
                  : `/search?q=${encodeURIComponent(query)}`,
              );
            }
          }}
        />
      </div>
      {query.trim() ? (
        <>
          {result.loading ? (
            <div className="mt-4 space-y-3" role="status" aria-label={t('common.loading')}>
              {[1, 2, 3].map((n) => (
                <Skeleton className="h-16" key={n} />
              ))}
            </div>
          ) : result.error ? (
            <div className="mt-5" role="alert">
              <p>{t('common.error')}</p>
              <Button onClick={result.retry}>{t('common.retry')}</Button>
            </div>
          ) : (
            <ul className="mt-4" id={id} role="listbox" aria-label={t('search.title')}>
              {items.map((p, i) => (
                <li
                  key={p.id}
                  id={`${id}-${i}`}
                  className="search-suggestion cursor-pointer"
                  role="option"
                  aria-selected={active === i}
                  onClick={() => go(`/products/${p.id}`)}
                >
                  <img src={p.images[0] ?? '/images/product.svg'} alt="" width={44} height={56} />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">
                      <Match text={l(p.name)} query={debounced} />
                    </span>
                    <span className="text-xs text-muted">{formatPrice(p.price, language)}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
          {!result.loading && !result.error && items.length === 0 && (
            <p className="mt-5 text-muted">{t('products.empty')}</p>
          )}
          <Button
            className="mt-5 w-full"
            onClick={() => go(`/search?q=${encodeURIComponent(query)}`)}
          >
            {t('search.all')}
          </Button>
        </>
      ) : (
        <>
          <p className="mt-5 text-sm text-muted">{t('search.hint')}</p>
          {recent.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base">{t('search.recent')}</h3>
                <button
                  className="text-link"
                  onClick={() => {
                    setRecent([]);
                    writeStorage('ulanish-recent', []);
                  }}
                >
                  {t('search.clearRecent')}
                </button>
              </div>
              <div className="search-recent">
                {recent.map((r) => (
                  <button key={r} onClick={() => setQuery(r)}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}
