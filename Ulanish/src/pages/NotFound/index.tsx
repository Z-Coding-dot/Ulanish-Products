import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/layout/PageHeader';
import { SEO } from '@/components/layout/SEO';
import { Section } from '@/components/layout/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/motion/Reveal';
import { Compass } from 'lucide-react';
export default function NotFound() {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t('notFound.title')} description={t('notFound.description')} />
      <PageHeader title={t('notFound.title')} />
      <Section>
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <Compass size={64} strokeWidth={1.25} className="text-primary" aria-hidden="true" />
          <p>{t('notFound.description')}</p>
          <ButtonLink to="/">{t('notFound.home')}</ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
