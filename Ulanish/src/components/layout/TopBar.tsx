import { Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '@/data/siteConfig';
import { useLanguage } from '@/context/LanguageContext';
import { whatsappLink } from '@/utils/whatsapp';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { LanguageSwitcher } from './LanguageSwitcher';
export function TopBar() {
  const { t } = useTranslation();
  const { language, l } = useLanguage();
  return (
    <div className="topbar">
      <div className="container-site flex min-h-10 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <a className="inline-flex min-h-11 items-center gap-2" href={siteConfig.tel}>
            <Phone size={14} aria-hidden="true" />
            <bdi>{siteConfig.phone}</bdi>
          </a>
          <a
            className="inline-flex min-h-11 items-center gap-2"
            href={whatsappLink(language)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon width={16} height={16} />
            {t('common.whatsappName')}
          </a>
          <span className="hidden text-xs lg:inline">{l(siteConfig.address)}</span>
        </div>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
