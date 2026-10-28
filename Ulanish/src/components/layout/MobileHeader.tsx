import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/redux/store';
import { setSearchOpen } from '@/redux/uiSlice';
import { Wordmark } from './Wordmark';
import { LanguageSwitcher } from './LanguageSwitcher';
export function MobileHeader() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <div className="mobile-header px-4">
      <Wordmark />
      <div className="flex items-center gap-1">
        <button
          className="icon-btn border-transparent"
          aria-label={t('products.searchLabel')}
          onClick={() => dispatch(setSearchOpen(true))}
        >
          <Search size={20} />
        </button>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
