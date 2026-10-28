import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/data/siteConfig';
export function Wordmark() {
  const { l } = useLanguage();
  return (
    <Link to="/" className="wordmark" aria-label={l(siteConfig.name)}>
      <span className="brand-mark" aria-hidden="true" />
      {l(siteConfig.wordmark)}
    </Link>
  );
}
