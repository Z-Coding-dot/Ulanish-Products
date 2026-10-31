import { Reveal } from '@/components/ui/motion/Reveal';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/data/siteConfig';
import { Breadcrumbs } from './Breadcrumbs';
import { BrandLogo } from './BrandLogo';
export function PageHeader({
  title,
  description,
  image = '/images/hero-home.webp',
}: {
  title: string;
  description?: string;
  image?: string;
}) {
  const { l } = useLanguage();
  return (
    <section className="page-header">
      <img
        className="page-header-image"
        src={image}
        alt=""
        width={1600}
        height={900}
        decoding="async"
      />
      <div className="page-header-overlay" />
      <div className="container-site page-header-inner">
        <Reveal className="page-header-copy">
          <span className="page-header-eyebrow">{l(siteConfig.name)}</span>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
          <Breadcrumbs title={title} />
        </Reveal>
        <span className="page-header-mark" aria-hidden="true">
          <BrandLogo />
        </span>
      </div>
    </section>
  );
}
