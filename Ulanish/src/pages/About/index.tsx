import { MapPin, ArrowUpRight, Languages, MessagesSquare, LayoutGrid } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/data/siteConfig';
import { formatNumber } from '@/utils/formatNumber';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { SEO } from '@/components/layout/SEO';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/ui/CTASection';
import { ActionLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/motion/Reveal';
import { Stagger } from '@/components/ui/motion/Stagger';
import { ImageReveal } from '@/components/ui/motion/ImageReveal';
export default function About() {
  const { t } = useTranslation();
  const { l, language } = useLanguage();
  return (
    <>
      <SEO title={t('about.title')} description={t('about.description')} />
      <PageHeader
        title={t('about.title')}
        description={t('about.description')}
        image="/images/hero-office.webp"
      />
      <Section>
        <p className="sample-note">{t('common.sample')}</p>
        <div className="split-story">
          <Reveal>
            <span className="eyebrow">{t('home.aboutLink')}</span>
            <h2>{t('about.story')}</h2>
            <p className="mt-6 text-muted">{t('home.aboutText')}</p>
            <h3 className="mt-8">{t('about.offer')}</h3>
            <p className="mt-4 text-muted">{t('about.offerText')}</p>
          </Reveal>
          <ImageReveal
            src="/images/hero-office.webp"
            srcSet="/images/hero-office-800.webp 800w, /images/hero-office.webp 1600w"
            sizes="(min-width:1024px) 50vw, 100vw"
            alt={t('images.workspace')}
            width={1600}
            height={900}
            loading="lazy"
          />
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeading title={t('about.why')} />
        <Stagger className="divide-y divide-border">
          {[Languages, MessagesSquare, LayoutGrid].map((Icon, index) => (
            <div key={index} className="flex items-center gap-4 py-7 md:gap-6">
              <span className="text-2xl tabular-nums text-primary">
                {formatNumber(index + 1, language).padStart(2, '0')}
              </span>
              <h3 className="flex-1">{t(`about.reason${index + 1}`)}</h3>
              <Icon
                size={28}
                className="shrink-0 text-primary"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          ))}
        </Stagger>
      </Section>
      <Section>
        <Reveal className="map-block">
          <MapPin size={32} className="text-primary" aria-hidden="true" />
          <h2>{t('about.visit')}</h2>
          <p>{l(siteConfig.address)}</p>
          <ActionLink
            variant="outline"
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('common.maps')}
            <ArrowUpRight size={18} aria-hidden="true" />
          </ActionLink>
        </Reveal>
      </Section>
      <CTASection />
    </>
  );
}
