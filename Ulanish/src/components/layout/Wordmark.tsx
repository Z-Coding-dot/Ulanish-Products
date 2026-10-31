import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/data/siteConfig';
import { BrandLogo } from './BrandLogo';
export function Wordmark() {
  const { l } = useLanguage();
  return (
    <Link to="/" className="wordmark" aria-label={l(siteConfig.name)}>
      <BrandLogo />
      {l(siteConfig.wordmark)}
    </Link>
  );
}
