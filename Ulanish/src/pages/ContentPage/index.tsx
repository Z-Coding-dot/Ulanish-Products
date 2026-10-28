import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { policies } from '@/data/policies';
import { PageHeader } from '@/components/layout/PageHeader';
import { SEO } from '@/components/layout/SEO';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/motion/Reveal';
export default function ContentPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const key = location.pathname.slice(1) as keyof typeof policies;
  const content = policies[key] ?? policies.terms;
  return (
    <>
      <SEO title={t(content.title)} description={t(content.intro)} />
      <PageHeader title={t(content.title)} />
      <Section>
        <Reveal className="content-prose">
          <p className="sample-note">{t('legal.sample')}</p>
          <p>{t(content.intro)}</p>
          <section>
            <h2>{t(content.heading)}</h2>
            <p>{t(content.body)}</p>
          </section>
        </Reveal>
      </Section>
    </>
  );
}
