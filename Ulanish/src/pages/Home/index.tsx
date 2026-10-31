import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { useCatalogMetadata } from '@/context/CatalogContext';
import { useProducts, useSettings } from '@/hooks/useCatalog';
import { siteConfig } from '@/data/siteConfig';
import { whatsappLink } from '@/utils/whatsapp';
import { HeroSlider } from '@/components/ui/Hero';
import { Section } from '@/components/layout/Section';
import { SEO } from '@/components/layout/SEO';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductSkeletons, Skeleton } from '@/components/ui/Skeleton';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { StepsList } from '@/components/ui/StepsList';
import { CTASection } from '@/components/ui/CTASection';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/motion/Reveal';
import { ImageReveal } from '@/components/ui/motion/ImageReveal';
export default function Home() {
  const { t } = useTranslation();
  const { l, language, dir } = useLanguage();
  const metadata = useCatalogMetadata();
  const featured = useProducts({ pageSize: 4, sort: 'price-desc' });
  const arrivals = useProducts({ pageSize: 8 });
  const settings = useSettings();
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ start: 0, scroll: 0, down: false, moved: false });
  const retry = (
    <Button
      onClick={() => {
        metadata.retry();
        featured.retry();
        arrivals.retry();
      }}
    >
      {t('common.retry')}
    </Button>
  );
  const viewAll = (
    <Link className="text-link" to="/products">
      {t('common.viewAll')}
      <ArrowRight size={18} className="rtl-icon" aria-hidden="true" />
    </Link>
  );
  return (
    <>
      <SEO
        title={t('home.title')}
        description={t('home.description')}
        image="/images/hero-collection.webp"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: l(siteConfig.name),
          url: siteConfig.platformUrl,
          telephone: siteConfig.phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: l(siteConfig.address),
            addressLocality: 'Kabul',
            addressCountry: 'AF',
          },
        }}
      />
      <HeroSlider />
      <div className="trust-strip">
        <a href={siteConfig.tel}>
          <Phone size={24} className="text-primary" aria-hidden="true" />
          <span>
            <strong className="text-sm font-semibold">{t('common.call')}</strong>
            <small>
              <bdi>{siteConfig.phone}</bdi>
            </small>
          </span>
        </a>
        <a href={whatsappLink(language)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon width={26} height={26} className="text-whatsapp" />
          <span>
            <strong className="text-sm font-semibold">{t('common.chat')}</strong>
            <small>{t('home.step2')}</small>
          </span>
        </a>
        <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
          <MapPin size={24} className="text-primary" aria-hidden="true" />
          <span>
            <strong className="text-sm font-semibold">{t('common.location')}</strong>
            <small>{l(siteConfig.address)}</small>
          </span>
        </a>
      </div>
      <div className="container-site pt-10">
        <p className="sample-note">
          {settings.data ? l(settings.data.announcement) : t('common.sample')}
        </p>
      </div>
      <Section>
        <SectionHeading
          eyebrow={t('home.eyebrow')}
          title={t('home.featured')}
          description={t('home.featuredSub')}
          action={
            <div className="flex gap-2 lg:hidden">
              <button
                className="icon-btn"
                aria-label={t('common.previous')}
                onClick={() =>
                  rail.current?.scrollBy({
                    left: (dir === 'rtl' ? 1 : -1) * (rail.current.clientWidth * 0.75),
                    behavior: 'smooth',
                  })
                }
              >
                <ChevronLeft size={20} className="rtl-icon" />
              </button>
              <button
                className="icon-btn"
                aria-label={t('common.next')}
                onClick={() =>
                  rail.current?.scrollBy({
                    left: (dir === 'rtl' ? -1 : 1) * (rail.current.clientWidth * 0.75),
                    behavior: 'smooth',
                  })
                }
              >
                <ChevronRight size={20} className="rtl-icon" />
              </button>
            </div>
          }
        />
        {featured.loading ? (
          <ProductSkeletons count={4} />
        ) : featured.error ? (
          <div role="alert">
            {t('common.error')}
            {retry}
          </div>
        ) : (
          <div
            ref={rail}
            className="product-carousel"
            onPointerDown={(e) => {
              drag.current.moved = false;
              if (e.pointerType !== 'mouse' || e.button !== 0) return;
              drag.current = {
                start: e.clientX,
                scroll: e.currentTarget.scrollLeft,
                down: true,
                moved: false,
              };
            }}
            onPointerMove={(e) => {
              if (!drag.current.down) return;
              if (e.buttons !== 1) {
                drag.current.down = false;
                return;
              }
              const delta = e.clientX - drag.current.start;
              if (Math.abs(delta) > 6) {
                drag.current.moved = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                e.currentTarget.scrollLeft = drag.current.scroll - delta;
              }
            }}
            onPointerUp={(e) => {
              drag.current.down = false;
              if (e.currentTarget.hasPointerCapture(e.pointerId))
                e.currentTarget.releasePointerCapture(e.pointerId);
            }}
            onPointerCancel={() => {
              drag.current.down = false;
              drag.current.moved = false;
            }}
            onLostPointerCapture={() => {
              drag.current.down = false;
            }}
            onPointerLeave={(e) => {
              if (!e.currentTarget.hasPointerCapture(e.pointerId)) drag.current.down = false;
            }}
            onClickCapture={(e) => {
              if (drag.current.moved) {
                e.preventDefault();
                e.stopPropagation();
                drag.current.moved = false;
              }
            }}
            onDragStart={(e) => e.preventDefault()}
          >
            {featured.data?.items.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
        )}
        <div className="mt-7">{viewAll}</div>
      </Section>
      <Section className="bg-surface">
        <SectionHeading eyebrow={t('home.categoriesSub')} title={t('home.categories')} />
        {metadata.loading ? (
          <Skeleton className="h-96" />
        ) : (
          <Reveal className="category-grid">
            {metadata.categories.map((c) => (
              <CategoryCard category={c} key={c.id} />
            ))}
          </Reveal>
        )}
      </Section>
      <Section>
        <SectionHeading
          title={t('home.arrivals')}
          description={t('home.arrivalsSub')}
          action={viewAll}
        />
        {arrivals.loading ? (
          <ProductSkeletons />
        ) : arrivals.error ? (
          <div role="alert">
            {t('common.error')}
            {retry}
          </div>
        ) : (
          <ProductGrid products={arrivals.data?.items ?? []} />
        )}
      </Section>
      <Section className="bg-surface">
        <SectionHeading eyebrow={t('home.orderSub')} title={t('home.order')} />
        <StepsList />
      </Section>
      <Section>
        <div className="split-story">
          <ImageReveal
            src="/images/hero-collection.webp"
            srcSet="/images/hero-collection-800.webp 800w, /images/hero-collection.webp 1600w"
            sizes="(min-width:1024px) 50vw, 100vw"
            alt={t('images.storeInterior')}
            width={1600}
            height={900}
            loading="lazy"
          />
          <Reveal mode="slideEnd">
            <span className="eyebrow">{t('nav.about')}</span>
            <h2>{t('home.aboutTitle')}</h2>
            <p className="mt-6 text-muted">{t('home.aboutText')}</p>
            <Link to="/about" className="text-link mt-6">
              {t('home.aboutLink')}
              <ArrowRight size={18} className="rtl-icon" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </Section>
      <CTASection />
    </>
  );
}
