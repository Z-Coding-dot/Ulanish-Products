import { WifiOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/layout/PageHeader';
import { SEO } from '@/components/layout/SEO';
import { Section } from '@/components/layout/Section';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/motion/Reveal';
export default function Offline() {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t('offline.title')} description={t('offline.description')} />
      <PageHeader title={t('offline.title')} />
      <Section>
        <Reveal className="flex flex-col items-center gap-7 text-center">
          <WifiOff size={40} className="text-primary" aria-hidden="true" />
          <p>{t('offline.description')}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => window.location.reload()}>{t('common.retry')}</Button>
            <ButtonLink to="/products" variant="outline">
              {t('common.browse')}
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
