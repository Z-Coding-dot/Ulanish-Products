import { NavLink } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { navigation } from '@/data/navigation';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useAppDispatch } from '@/redux/store';
import { setSearchOpen } from '@/redux/uiSlice';
import { cn } from '@/utils/cn';
import { ButtonLink } from '@/components/ui/Button';
import { Wordmark } from './Wordmark';
import { LanguageSwitcher } from './LanguageSwitcher';
export function Navbar() {
  const { t } = useTranslation();
  const scroll = useScrollPosition();
  const dispatch = useAppDispatch();
  return (
    <div className={cn('desktop-nav', scroll > 40 && 'compact')}>
      <div className="navbar-inner">
        <Wordmark />
        <nav aria-label={t('footer.links')} className="navbar-links">
          {navigation.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className="nav-link">
              {t(n.key)}
            </NavLink>
          ))}
        </nav>
        <div className="navbar-tools">
          <button
            className="icon-btn border-transparent"
            aria-label={t('products.searchLabel')}
            onClick={() => dispatch(setSearchOpen(true))}
          >
            <Search size={20} />
          </button>
          <LanguageSwitcher />
          <ButtonLink to="/products" className="navbar-cta">
            {t('common.browse')}
            <ArrowUpRight size={16} className="rtl:-scale-x-100" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
