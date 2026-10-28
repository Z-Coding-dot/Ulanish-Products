import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '@/data/siteConfig';
import { navigation, legalNavigation } from '@/data/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { whatsappLink } from '@/utils/whatsapp';
import { formatNumber } from '@/utils/formatNumber';
import { InstallButton } from '@/components/ui/InstallButton';
import { Reveal } from '@/components/ui/motion/Reveal';
import { Wordmark } from './Wordmark';
export function Footer() {
  const { t } = useTranslation();
  const { l, language } = useLanguage();
  return (
    <footer className="footer">
      <div className="container-site">
        <Reveal className="footer-grid">
          <div>
            <Wordmark />
            <p>{t('footer.text')}</p>
            <InstallButton />
            {siteConfig.social.length > 0 && (
              <div className="mt-4 flex gap-2">
                {siteConfig.social.map((link) => (
                  <a
                    className="icon-btn"
                    key={link.url}
                    href={link.url}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h3>{t('footer.links')}</h3>
            <div className="footer-links">
              {navigation.map((n) => (
                <Link className="inline-flex items-center" to={n.to} key={n.to}>
                  {t(n.key)}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3>{t('footer.info')}</h3>
            <div className="footer-links">
              <a
                className="inline-flex items-center"
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l(siteConfig.address)}
              </a>
              <a className="inline-flex items-center" href={siteConfig.tel}>
                <bdi>{siteConfig.phone}</bdi>
              </a>
              <a
                className="inline-flex items-center"
                href={whatsappLink(language)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('common.whatsappName')}
              </a>
            </div>
          </div>
          <div>
            <h3>{t('footer.legal')}</h3>
            <div className="footer-links">
              {legalNavigation.map((n) => (
                <Link className="inline-flex items-center" key={n.to} to={n.to}>
                  {t(n.key)}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal className="footer-bottom">
          <span>
            {t('footer.copyright', {
              year: formatNumber(new Date().getFullYear(), language).replace(/,/g, ''),
              store: l(siteConfig.name),
            })}
          </span>
          <a
            className="inline-flex items-center gap-1"
            href={siteConfig.creditUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('footer.powered')} {l(siteConfig.credit)}
          </a>
        </Reveal>
      </div>
    </footer>
  );
}
