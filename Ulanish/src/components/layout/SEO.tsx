import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/data/siteConfig';
export function SEO({
  title,
  description,
  image,
  jsonLd,
}: {
  title: string;
  description: string;
  image?: string;
  jsonLd?: object;
}) {
  const { language, l } = useLanguage();
  const location = useLocation();
  const canonical = siteConfig.platformUrl + (location.pathname === '/' ? '' : location.pathname);
  return (
    <Helmet>
      <html lang={language} dir={language === 'en' ? 'ltr' : 'rtl'} />
      <title>{`${title} | ${l(siteConfig.name)}`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={language.replace('-', '_')} />
      {image && <meta property="og:image" content={new URL(image, window.location.origin).href} />}
      <link rel="canonical" href={canonical} />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd).replace(/</g, '\\u003c')}
        </script>
      )}
    </Helmet>
  );
}
