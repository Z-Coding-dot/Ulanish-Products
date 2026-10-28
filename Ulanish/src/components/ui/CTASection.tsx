import { Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '@/data/siteConfig';
import { useLanguage } from '@/context/LanguageContext';
import { whatsappLink } from '@/utils/whatsapp';
import { ActionLink } from './Button';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Reveal } from './motion/Reveal';
export function CTASection() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  return (
    <section className="cta-band">
      <Reveal className="container-site cta-inner">
        <div>
          <h2>{t('cta.title')}</h2>
          <p className="mt-4">{t('cta.text')}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <ActionLink variant="white" href={siteConfig.tel}>
            <Phone size={18} aria-hidden="true" />
            {t('common.call')}
          </ActionLink>
          <ActionLink
            variant="whatsapp"
            href={whatsappLink(language)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            {t('common.whatsapp')}
          </ActionLink>
        </div>
      </Reveal>
    </section>
  );
}
