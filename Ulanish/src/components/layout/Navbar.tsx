import { NavLink } from 'react-router-dom';
import { Phone, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { navigation } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useAppDispatch } from '@/redux/store';
import { setSearchOpen } from '@/redux/uiSlice';
import { whatsappLink } from '@/utils/whatsapp';
import { cn } from '@/utils/cn';
import { ActionLink } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Wordmark } from './Wordmark';
export function Navbar() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const scroll = useScrollPosition();
  const dispatch = useAppDispatch();
  return (
    <div className={cn('desktop-nav', scroll > 40 && 'compact')}>
      <div className="container-site flex h-full items-center justify-between gap-4">
        <Wordmark />
        <nav aria-label={t('footer.links')} className="flex items-center gap-4 xl:gap-7">
          {navigation.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className="nav-link">
              {t(n.key)}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            className="icon-btn border-transparent"
            aria-label={t('products.searchLabel')}
            onClick={() => dispatch(setSearchOpen(true))}
          >
            <Search size={20} />
          </button>
          <ActionLink className="hidden xl:inline-flex" variant="outline" href={siteConfig.tel}>
            <Phone size={16} aria-hidden="true" />
            {t('common.call')}
          </ActionLink>
          <ActionLink
            className="hidden lg:inline-flex"
            variant="whatsapp"
            href={whatsappLink(language)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            {t('common.whatsapp')}
          </ActionLink>
        </div>
      </div>
    </div>
  );
}
